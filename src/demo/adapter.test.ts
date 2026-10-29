// @vitest-environment happy-dom
/**
 * 시연 어댑터가 내는 응답이 **실제 API 함수의 zod 파싱을 그대로 통과하는지** 본다.
 *
 * 어댑터를 따로 검증하는 스키마를 만들지 않는다. 화면이 쓰는 API 함수를 그대로 불러
 * 그 안의 `schema.parse` 가 돌게 한다 — 서버 계약이 바뀌어 스키마가 바뀌면 여기가 먼저
 * 깨지고, 시연 영상을 다 찍고 나서야 빈 화면을 발견하는 일이 없다.
 *
 * 순서도 시연과 같다. 상태가 앞 단계에 기대므로(키 없이 보내면 거절 등) 하나의
 * 흐름으로 이어서 돈다.
 */
import { beforeAll, describe, expect, it, vi } from 'vitest';

async function load() {
  return {
    agent: await import('@/api/agent'),
    aiCredentials: await import('@/api/aiCredentials'),
    apiTokens: await import('@/api/apiTokens'),
    approvals: await import('@/api/approvals'),
    auth: await import('@/api/auth'),
    changes: await import('@/api/changes'),
    chat: await import('@/api/chat'),
    cloud: await import('@/api/cloudConnections'),
    databases: await import('@/api/databases'),
    deployments: await import('@/api/deployments'),
    domains: await import('@/api/domains'),
    environment: await import('@/api/environment'),
    preview: await import('@/api/preview'),
    previewRuntime: await import('@/api/previewRuntime'),
    projects: await import('@/api/projects'),
    servers: await import('@/api/servers'),
    templates: await import('@/api/templates'),
    user: await import('@/api/user'),
    scenario: await import('@/demo/scenario'),
  };
}

let api: Awaited<ReturnType<typeof load>>;

/** 조건이 맞을 때까지 다시 묻는다. 시나리오는 읽을 때마다 시간을 민다 */
async function until<T>(label: string, read: () => Promise<T>, done: (value: T) => boolean) {
  const started = Date.now();
  for (;;) {
    const value = await read();
    if (done(value)) return value;
    if (Date.now() - started > 8000) throw new Error(`시간 초과: ${label}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

beforeAll(async () => {
  vi.stubEnv('VITE_DEMO_MODE', 'true');
  vi.stubEnv('VITE_API_URL', '/api/v1');
  // 진행 시간을 접는다. 순서와 응답 모양만 보면 되므로 기다릴 이유가 없다
  vi.stubEnv('VITE_DEMO_SPEED', '40');
  api = await load();
  api.scenario.resetDemoState();
});

describe('시연 어댑터', () => {
  const projectId = 1;
  let conversationId = 0;

  it('로그인 뒤 GitHub App 권한을 허용하면 사용자 정보에 반영된다', async () => {
    const tokens = await api.auth.completeGitHubCallback({
      code: 'demo-code',
      state: 'demo-state',
    });
    expect(tokens).toBeTruthy();

    // 봉투째 돌려준다(parseUserMeResponse)
    expect((await api.user.getUserInfo()).data?.githubAppInstalled).toBe(false);
    // 설치 주소를 받아 가는 것만으로는 설치되지 않는다. 재현 화면에서 Install 을 눌러 콜백이 와야 한다
    await api.auth.fetchGitHubAppInstallUrl();
    expect((await api.user.getUserInfo()).data?.githubAppInstalled).toBe(false);
    await api.auth.completeGitHubAppCallback({ installation_id: 'demo', setup_action: 'install' });
    expect((await api.user.getUserInfo()).data?.githubAppInstalled).toBe(true);

    expect((await api.templates.getTemplateList()).length).toBeGreaterThan(0);
  });

  it('프로젝트를 만들면 목록과 개요가 읽힌다', async () => {
    expect(await api.projects.getProjectList()).toEqual([]);
    const created = await api.projects.postProjectCreate({
      name: '함께 할 일',
      startMode: 'blank',
      templateType: null,
      draftMode: 'fast',
    });
    expect(created.projectId).toBe(projectId);
    expect(await api.projects.getProjectList()).toHaveLength(1);
    expect((await api.projects.getProjectOverview(projectId)).currentUrl).toBeNull();
  });

  it('본인 AI 키가 없으면 보낼 수 없고, 등록하면 제공자가 생긴다', async () => {
    expect((await api.agent.getAiProviderList()).providers).toEqual([]);
    conversationId = (await api.chat.postProjectConversationCreate(projectId)).conversationId;

    await expect(
      api.chat.postConversationMessageCreate(conversationId, {
        content: '할 일 앱을 만들어줘',
        aiProvider: 'CLAUDE_CODE',
      }),
    ).rejects.toBeTruthy();

    const key = 'sk-ant-api03-qeploy-demo-0000000000000000';
    const saved = await api.aiCredentials.putAiCredential('ANTHROPIC', {
      apiKey: key,
      label: null,
    });
    // 받은 키를 그대로 돌려주지 않는다
    expect(saved.maskedApiKey).not.toContain(key.slice(8));

    const providers = (await api.agent.getAiProviderList()).providers.map((item) => item.provider);
    expect(providers).toEqual(['ANTHROPIC', 'CLAUDE_CODE']);
  });

  it('코드 작업은 되묻기 → 계획 승인 → 저장소 연결 승인 순서로 간다', async () => {
    const message = await api.chat.postConversationMessageCreate(conversationId, {
      content: '회원가입과 로그인이 되는 할 일 관리 웹앱을 만들어줘.',
      aiProvider: 'CLAUDE_CODE',
    });
    const taskId = message.taskId ?? '';
    expect(taskId).not.toBe('');

    const asking = await until(
      '되묻기',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'WAITING_INPUT',
    );
    expect(asking.clarification?.inputType).toBe('SINGLE_SELECT');
    await api.agent.postAgentTaskInput(taskId, { value: 'cards' });

    const planned = await until(
      '계획 승인',
      () => api.agent.getAgentTask(taskId),
      (task) => task.pendingApprovalId != null,
    );
    expect(planned.status).toBe('WAITING_APPROVAL');
    expect(planned.answeredClarification?.answer).toBe('카테고리 필터가 있는 카드 목록');
    const change = await api.approvals.getApprovalDetail(planned.pendingApprovalId!);
    expect(change.type).toBe('CHANGE');
    await api.approvals.postApprovalApprove(change.approvalId);

    const built = await until(
      '저장소 연결 승인',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'WAITING_RESULT_APPROVAL',
    );
    expect(built.previewCreated).toBe(true);
    const binding = await api.approvals.getApprovalDetail(built.pendingApprovalId!);
    expect(binding.type).toBe('REPOSITORY_BINDING');
    expect(binding.input?.field).toBe('repositoryName');
    await api.approvals.postApprovalApprove(binding.approvalId, {
      repositoryName: 'todo-together',
    });

    await until(
      '완료',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'DONE',
    );

    const messages = await api.chat.getConversationMessageList(conversationId);
    expect(messages.some((item) => item.kind === 'AGENT_RESULT')).toBe(true);
    const events = await api.agent.getAgentTaskEventList(taskId);
    expect(events.some((event) => event.agentType === 'CODE' && event.stepIndex === 1)).toBe(true);

    const session = await api.preview.getProjectPreviewSession(projectId);
    expect(session.status).toBe('ACTIVE');
    const access = await api.preview.postPreviewSessionAccess(session.sessionId ?? '');
    // 운영 게이트웨이와 같은 모양이어야 주소창에 찍힐 때 실제와 어긋나지 않는다
    expect(new URL(access.previewUrl).pathname).toMatch(/^\/api\/v1\/previews\/[^/]+\/[^/]+\/$/);
  });

  it('인프라 요청은 클라우드 연결을 기다렸다가 과금 자원 승인을 만든다', async () => {
    const message = await api.chat.postConversationMessageCreate(conversationId, {
      content: '내 AWS 계정에 백엔드 서버랑 데이터베이스를 만들어서 진짜로 가입되게 해줘.',
      aiProvider: 'CLAUDE_CODE',
    });
    const taskId = message.taskId ?? '';

    const waiting = await until(
      '클라우드 안내',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'WAITING_INPUT',
    );
    expect(waiting.clarification?.actionType).toBe('CONNECT_CLOUD');

    await api.cloud.getCloudRequirements('AWS');
    const created = await api.cloud.postCloudConnectionCreate({
      provider: 'AWS',
      displayName: '내 AWS 계정',
      accountId: '481019284412',
      region: 'ap-northeast-2',
      roleArn: '',
      awsCredentialType: 'ACCESS_KEY',
      accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
      secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      sessionToken: '',
      gcpCredentialType: null,
      serviceAccountKeyJson: '',
      projectId: '',
      serviceAccountEmail: '',
    });
    const job = await until(
      '검증',
      () => api.cloud.getCloudConnectionVerificationJob(created.jobId ?? ''),
      (value) => value.status === 'SUCCEEDED',
    );
    expect(job.connectionStatus).toBe('CONNECTED');

    await api.projects.putProjectInfrastructureSettings(projectId, {
      cloudConnectionId: created.cloudConnectionId,
    });
    await api.agent.postAgentTaskInput(taskId, { value: '연결 완료' });
    await until(
      '완료',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'DONE',
    );

    const pending = (await api.approvals.getProjectApprovalList(projectId)).filter(
      (approval) => approval.status === 'PENDING',
    );
    expect(pending.map((approval) => approval.type).sort()).toEqual([
      'DATABASE_PROVISION',
      'SERVER_PROVISION',
    ]);
    for (const approval of pending) await api.approvals.postApprovalApprove(approval.approvalId);

    expect((await api.previewRuntime.getPreviewRuntimeConfig(projectId)).runtimeType).toBe(
      'NODE_SERVER',
    );
    await until(
      '서버 기동',
      () => api.servers.getProjectServerList(projectId),
      (servers) => servers.some((server) => server.status === 'RUNNING'),
    );
  });

  it('배포·도메인 요청은 승인 뒤 주소가 개요에 붙는다', async () => {
    const message = await api.chat.postConversationMessageCreate(conversationId, {
      content: '배포하고 todo-together.qeploy.com 도메인 붙여줘.',
      aiProvider: 'CLAUDE_CODE',
    });
    const taskId = message.taskId ?? '';

    await until(
      '승인 대기',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'WAITING_APPROVAL',
    );
    const pending = (await api.approvals.getProjectApprovalList(projectId)).filter(
      (approval) => approval.status === 'PENDING',
    );
    expect(pending.map((approval) => approval.type).sort()).toEqual([
      'DEPLOYMENT',
      'DOMAIN_BINDING',
    ]);
    for (const approval of pending) await api.approvals.postApprovalApprove(approval.approvalId);

    await until(
      '완료',
      () => api.agent.getAgentTask(taskId),
      (task) => task.status === 'DONE',
    );
    const overview = await api.projects.getProjectOverview(projectId);
    expect(overview.currentUrl).toBe('https://todo-together.qeploy.com');
  });

  it('화면이 부르는 나머지 조회도 전부 스키마를 통과한다', async () => {
    const [deployment] = await api.deployments.getProjectDeploymentList(projectId);
    const [domain] = await api.domains.getProjectDomainList(projectId);
    const [server] = await api.servers.getProjectServerList(projectId);
    const [connection] = await api.cloud.getCloudConnectionList();
    const [version] = await api.deployments.getProjectVersionList(projectId);

    const calls: [string, () => Promise<unknown>][] = [
      ['project detail', () => api.projects.getProjectDetail(projectId)],
      ['activity logs', () => api.projects.getProjectActivityLogList(projectId)],
      ['commits', () => api.projects.getProjectCommitList(projectId)],
      ['repository health', () => api.projects.getProjectRepositoryHealth(projectId)],
      ['repository settings', () => api.projects.getProjectRepositorySettings(projectId)],
      ['chat settings', () => api.projects.getProjectChatSettings(projectId)],
      ['infra settings', () => api.projects.getProjectInfrastructureSettings(projectId)],
      ['infra configuration', () => api.projects.getProjectInfrastructureConfiguration(projectId)],
      ['infra history', () => api.projects.getProjectInfrastructureConfigurationHistory(projectId)],
      ['cost budget', () => api.projects.getProjectCostBudget(projectId)],
      ['github repositories', () => api.projects.getGithubRepositoryList()],
      ['conversation', () => api.chat.getConversationDetail(conversationId)],
      ['conversations', () => api.chat.getProjectConversationList(projectId)],
      ['trash', () => api.chat.getTrashConversationList()],
      ['active task', () => api.agent.getConversationActiveTask(conversationId)],
      ['hosting targets', () => api.domains.getHostingTargets()],
      ['domain detail', () => api.domains.getDomainDetail(domain.domainId)],
      ['domain guide', () => api.domains.getDomainVerificationGuide(domain.domainId)],
      ['domain search', () => api.domains.getDomainSearch('todo-together')],
      ['deployment status', () => api.deployments.getDeploymentStatus(deployment.historyId)],
      ['deployment logs', () => api.deployments.getDeploymentLogs(deployment.historyId)],
      ['version detail', () => api.deployments.getVersionDetail(version.versionId)],
      ['candidates', () => api.deployments.getProjectDeploymentCandidateList(projectId)],
      ['env', () => api.environment.getEnvironmentVariableList(projectId)],
      ['env history', () => api.environment.getEnvironmentVariableHistoryList(projectId)],
      ['databases', () => api.databases.getProjectDatabaseList(projectId)],
      ['server logs', () => api.servers.getServerLogs(server.serverId, 'APP')],
      /*
        프리뷰 세션 status·logs 는 넣지 않는다. 서버는 이 둘도 공통 봉투로 감싸는데
        (ApiResponseAdvice), getPreviewSessionStatus·getPreviewSessionLogs 는 봉투를
        벗기지 않고 파싱한다 — 시연이 아니라 그 함수 쪽 문제라 어댑터를 거기에 맞추지
        않는다. 시연 흐름은 이 둘을 부르지 않는다.
      */
      ['cloud detail', () => api.cloud.getCloudConnectionDetail(connection.cloudConnectionId)],
      ['cloud health', () => api.cloud.getCloudConnectionHealth(connection.cloudConnectionId)],
      ['ai credentials', () => api.aiCredentials.getAiCredentialList()],
      ['api tokens', () => api.apiTokens.getApiTokenList()],
      ['changes', () => api.changes.getProjectChangeList(projectId)],
      ['template detail', () => api.templates.getTemplateDetail('aquafolio')],
    ];

    const failures: string[] = [];
    for (const [label, call] of calls) {
      try {
        await call();
      } catch (error) {
        failures.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
