/**
 * 시연 모드 axios 어댑터.
 *
 * axios 인스턴스의 adapter 를 통째로 갈아끼워 네트워크로 나가지 않게 한다. API 모듈을
 * 하나도 고치지 않고 끼울 수 있는 유일한 자리다 — 화면·훅·스키마 검증은 평소와 똑같이
 * 돌고, 응답만 여기서 만들어 준다.
 *
 * 응답은 전부 서버와 같은 봉투(`{status, code, message, data}`)로 돌려준다. 그래야
 * `succesResponse` → `body.data` → zod 파싱까지 실제 경로를 그대로 탄다.
 */
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { DemoTask } from '@/demo/scenario';
import { AxiosError, AxiosHeaders } from 'axios';
import { demoMs } from '@/demo/config';
import {
  DEMO,
  addApproval,
  addMessage,
  advanceDemoClock,
  answerClarification,
  createCloudConnection,
  createDatabase,
  createDeployment,
  createDomain,
  createServer,
  createTask,
  decideApproval,
  demoPreviewUrl,
  ensureBackendEnvVars,
  findApproval,
  getTask,
  activeTask,
  state,
  terminateServer,
} from '@/demo/scenario';

type Ctx = {
  method: string;
  path: string;
  query: URLSearchParams;
  body: Record<string, unknown>;
  params: string[];
};

type Handler = (ctx: Ctx) => unknown;

/** 봉투를 씌우지 않고 그대로 내보낼 때 감싸는 표식 */
const NO_CONTENT = Symbol('no-content');

const iso = (offsetMs = 0) => new Date(Date.now() + offsetMs).toISOString();

/* -------------------------------------------------------------------------- */
/* 고정 응답 조각                                                              */
/* -------------------------------------------------------------------------- */

function demoUser() {
  return {
    id: DEMO.userId,
    username: DEMO.username,
    avatarUrl: DEMO.avatarUrl,
    githubAppInstalled: true,
    githubAppTokenLinked: true,
    githubAppTokenExpired: false,
    githubAppReauthorizationRequired: false,
    githubAppAccessTokenExpiresAt: iso(1000 * 60 * 60 * 8),
    githubAppRefreshTokenExpiresAt: iso(1000 * 60 * 60 * 24 * 30),
  };
}

function projectListItem() {
  const live = state.deployments.find((item) => item.status === 'SUCCESS');
  const connected = state.domains.find((item) => item.status === 'CONNECTED');
  return {
    projectId: DEMO.projectId,
    name: DEMO.projectName,
    deployStatus: deployStatus(),
    currentUrl: connected ? DEMO.domainUrl : (live?.deployedUrl ?? null),
    updatedAt: iso(),
    updatedAtRelativeText: '방금 전',
    templateType: null,
    startMode: 'blank',
  };
}

function deployStatus() {
  if (state.deployments.some((item) => item.status === 'IN_PROGRESS')) return 'IN_PROGRESS';
  if (state.deployments.some((item) => item.status === 'PENDING')) return 'PENDING';
  if (state.deployments.some((item) => item.status === 'SUCCESS')) return 'LIVE';
  if (state.previewReady) return 'PREVIEW_READY';
  return 'DRAFT';
}

function latestCommit() {
  if (!state.repositoryBound) return null;
  return {
    sha: '4f2c91ae8d3b7',
    message: 'feat: 회원가입·로그인 화면과 할 일 목록 추가',
    author: DEMO.username,
    committedAt: iso(-1000 * 60 * 3),
  };
}

function domainSummary() {
  const connected = state.domains.find((item) => item.status === 'CONNECTED');
  if (!connected) return null;
  return {
    domainId: connected.domainId,
    hostname: connected.hostname,
    url: DEMO.domainUrl,
    type: 'MANAGED_SUBDOMAIN',
    hostingTarget: connected.hostingTarget,
    status: 'CONNECTED',
    httpsEnforced: true,
    certificateStatus: 'ACTIVE',
    certificateExpiresAt: connected.certificateExpiresAt,
    lastCheckedAt: connected.lastCheckedAt,
  };
}

function previewSession() {
  if (!state.previewReady) {
    return {
      sessionId: '',
      projectId: DEMO.projectId,
      taskId: null,
      status: null,
      previewUrl: '',
      expiresAt: '',
      failureReason: '',
    };
  }
  return {
    sessionId: 'demo-preview-session',
    projectId: DEMO.projectId,
    taskId: null,
    status: 'ACTIVE',
    previewUrl: demoPreviewUrl(),
    expiresAt: iso(1000 * 60 * 55),
    failureReason: '',
  };
}

function activityLogs() {
  const logs: { type: string; message: string; occurredAt: string }[] = [
    { type: 'PROJECT_CREATED', message: '프로젝트를 만들었습니다', occurredAt: iso(-1000 * 60 * 12) },
  ];
  for (const approval of [...state.approvals].reverse()) {
    if (approval.status === 'PENDING') continue;
    logs.push({
      type: `APPROVAL_${approval.status}`,
      message: `${approval.type} — ${approval.summary ?? ''}`,
      occurredAt: approval.decidedAt ?? approval.createdAt,
    });
  }
  for (const deployment of [...state.deployments].reverse()) {
    if (deployment.status !== 'SUCCESS') continue;
    logs.push({
      type: 'DEPLOYMENT_SUCCESS',
      message: `${deployment.frontendHostingType} 배포가 끝났습니다`,
      occurredAt: deployment.updatedAt,
    });
  }
  return logs.reverse();
}

const DEMO_DIFF = `diff --git a/src/pages/SignUp.tsx b/src/pages/SignUp.tsx
new file mode 100644
--- /dev/null
+++ b/src/pages/SignUp.tsx
@@ -0,0 +1,24 @@
+import { useState } from 'react';
+import { signUp } from '../api/auth';
+
+export function SignUp() {
+  const [email, setEmail] = useState('');
+  const [password, setPassword] = useState('');
+
+  const handleSubmit = async (event) => {
+    event.preventDefault();
+    await signUp({ email, password });
+  };
+
+  return (
+    <form onSubmit={handleSubmit}>
+      <input value={email} onChange={(e) => setEmail(e.target.value)} />
+      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
+      <button type="submit">가입하기</button>
+    </form>
+  );
+}
`;

const SERVER_LOG = `[boot] cloud-init finished in 41s
[app] npm ci --omit=dev
[app] added 214 packages in 18s
[app] > todo-together@1.0.0 start
[app] > node dist/server.js
[app] listening on 0.0.0.0:8080
[app] database pool connected (postgres)
[caddy] certificate obtained for ${DEMO.domainHostname}
[app] GET /health 200 2ms
[app] POST /api/auth/signup 201 34ms
[app] POST /api/auth/login 200 21ms`;

const DEPLOY_LOG = `Run actions/checkout@v4
Run actions/setup-node@v4
  node-version: 20
Run npm ci
  added 214 packages in 12s
Run npm run build
  vite v8.0.2 building for production...
  ✓ 138 modules transformed.
  dist/index.html                  0.46 kB
  dist/assets/index-9c2f1a4e.js  184.21 kB
  ✓ built in 6.42s
Run deploy
  Published to ${DEMO.pagesUrl}`;

/* -------------------------------------------------------------------------- */
/* 라우트                                                                      */
/* -------------------------------------------------------------------------- */

const routes: [string, RegExp, Handler][] = [
  /* ----- auth ----- */
  [
    'GET',
    /^\/auth\/github\/url$/,
    () => {
      // 우리 콜백 라우트를 그대로 팝업에 띄운다. GitHub 을 흉내 내는 화면은 만들지 않는다
      const demoState = `demo-state-${Date.now()}`;
      return { url: `${window.location.origin}/auth/callback?code=demo-code&state=${demoState}`, state: demoState };
    },
  ],
  ['GET', /^\/auth\/github\/callback$/, () => ({ accessToken: 'demo-access-token', refreshToken: 'demo-refresh-token', githubAppInstalled: true })],
  ['POST', /^\/auth\/refresh$/, () => ({ accessToken: 'demo-access-token', refreshToken: 'demo-refresh-token', githubAppInstalled: true })],
  ['GET', /^\/auth\/github\/app\/install-url$/, () => ({ url: `${window.location.origin}/auth/app-callback?setup_action=install`, state: null })],
  ['GET', /^\/auth\/github\/app\/reauthorize-url$/, () => ({ url: `${window.location.origin}/auth/app-callback?setup_action=reauthorize`, state: null })],
  ['GET', /^\/auth\/github\/app\/callback$/, () => ({})],
  ['DELETE', /^\/auth\/logout$/, () => null],

  /* ----- user ----- */
  ['GET', /^\/users\/me$/, () => demoUser()],

  /* ----- projects ----- */
  ['GET', /^\/projects$/, () => (state.projectCreated ? [projectListItem()] : [])],
  [
    'POST',
    /^\/projects$/,
    (ctx) => {
      state.projectCreated = true;
      const name = typeof ctx.body.name === 'string' && ctx.body.name ? ctx.body.name : DEMO.projectName;
      return { projectId: DEMO.projectId, name, status: 'ACTIVE' };
    },
  ],
  ['GET', /^\/projects\/github\/repositories$/, () => [
    {
      fullName: DEMO.repositoryFullName,
      name: DEMO.repositoryName,
      owner: DEMO.repositoryOwner,
      description: '말로 만든 할 일 관리 앱',
      visibility: 'PRIVATE',
      defaultBranch: 'main',
      updatedAt: iso(-1000 * 60 * 5),
    },
  ]],
  ['GET', /^\/projects\/\d+$/, () => ({
    projectId: DEMO.projectId,
    name: DEMO.projectName,
    status: 'ACTIVE',
    startMode: 'blank',
    templateType: null,
    draftMode: 'fast',
    createdAt: iso(-1000 * 60 * 12),
    updatedAt: iso(),
  })],
  ['PATCH', /^\/projects\/\d+$/, () => ({ projectId: DEMO.projectId, name: DEMO.projectName, status: 'ACTIVE' })],
  ['DELETE', /^\/projects\/\d+$/, () => null],
  ['GET', /^\/projects\/\d+\/overview$/, () => ({
    currentUrl: domainSummary() ? DEMO.domainUrl : (state.deployments.find((item) => item.status === 'SUCCESS')?.deployedUrl ?? null),
    deployStatus: deployStatus(),
    currentVersion: state.deployments.find((item) => item.status === 'SUCCESS')?.versionLabel ?? null,
    latestCommit: latestCommit(),
    repositoryHealth: { health: 'HEALTHY' },
    domainSummary: domainSummary(),
  })],
  ['GET', /^\/projects\/\d+\/commits$/, () => (latestCommit() ? [latestCommit()] : [])],
  ['GET', /^\/projects\/\d+\/activity-logs$/, () => activityLogs()],
  ['GET', /^\/projects\/\d+\/repository-health$/, () => ({ health: 'HEALTHY' })],
  [
    'POST',
    /^\/projects\/\d+\/repository$/,
    (ctx) => {
      const name = typeof ctx.body.repositoryName === 'string' ? ctx.body.repositoryName : DEMO.repositoryName;
      addApproval('REPOSITORY_BINDING', `${DEMO.repositoryOwner}/${name} 저장소를 만들고 이 프로젝트에 연결합니다.`, null);
      return {
        projectId: DEMO.projectId,
        repositoryFullName: `${DEMO.repositoryOwner}/${name}`,
        repositoryVisibility: ctx.body.repositoryVisibility === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE',
        bindingStatus: 'NOT_BOUND',
        repositoryHealth: 'HEALTHY',
      };
    },
  ],
  ['DELETE', /^\/projects\/\d+\/repository$/, () => { state.repositoryBound = false; return null; }],
  ['GET', /^\/projects\/\d+\/settings\/repository$/, () => ({
    projectId: DEMO.projectId,
    connected: state.repositoryBound,
    repositoryFullName: state.repositoryBound ? DEMO.repositoryFullName : null,
    repositoryUrl: state.repositoryBound ? `https://github.com/${DEMO.repositoryFullName}` : null,
    defaultBranch: 'main',
    repositoryVisibility: 'PRIVATE',
    bindingStatus: state.repositoryBound ? 'BOUND' : 'NOT_BOUND',
    repositoryHealth: 'HEALTHY',
    connectedAt: state.repositoryBound ? iso(-1000 * 60 * 4) : null,
    lastSyncedAt: state.repositoryBound ? iso(-1000 * 60 * 3) : null,
  })],
  ['GET', /^\/projects\/\d+\/settings\/chat$/, () => ({
    projectId: DEMO.projectId,
    changeApprovalRequired: true,
    deploymentApprovalRequired: true,
    domainApprovalRequired: true,
    infraApprovalRequired: true,
    resultApprovalRequired: false,
  })],
  ['PATCH', /^\/projects\/\d+\/settings\/chat$/, (ctx) => ({ projectId: DEMO.projectId, ...ctx.body })],
  ['GET', /^\/projects\/\d+\/settings\/infrastructure$/, () => infraSettings()],
  [
    'PUT',
    /^\/projects\/\d+\/settings\/infrastructure$/,
    (ctx) => {
      const id = Number(ctx.body.cloudConnectionId);
      state.cloudConnectionId = Number.isFinite(id) ? id : null;
      // 호출부가 응답을 설정 스키마로 파싱한다. null 을 주면 선택이 실패로 떨어진다
      return infraSettings();
    },
  ],
  ['DELETE', /^\/projects\/\d+\/settings\/infrastructure$/, () => { state.cloudConnectionId = null; return null; }],
  ['GET', /^\/projects\/\d+\/settings\/infrastructure\/configuration$/, () => ({
    projectId: DEMO.projectId,
    configurable: state.cloudConnectionId != null,
    settings: {
      deploymentArchitecture: 'SERVER',
      computeTier: 'MICRO',
      storageType: 'OBJECT_STORAGE',
      networkAccess: 'PUBLIC',
      updatedAt: iso(),
    },
    pendingChange: null,
  })],
  ['PUT', /^\/projects\/\d+\/settings\/infrastructure\/configuration$/, (ctx) => ({
    projectId: DEMO.projectId,
    configurable: true,
    settings: { ...ctx.body, updatedAt: iso() },
    pendingChange: null,
  })],
  ['GET', /^\/projects\/\d+\/settings\/infrastructure\/configuration\/history$/, () => []],
  ['GET', /^\/projects\/\d+\/settings\/cost-budget$/, () => costBudget()],
  ['PUT', /^\/projects\/\d+\/settings\/cost-budget$/, () => costBudget()],
  ['DELETE', /^\/projects\/\d+\/settings\/cost-budget$/, () => null],

  /* ----- conversations ----- */
  ['GET', /^\/projects\/\d+\/conversations$/, () => [conversation()]],
  ['POST', /^\/projects\/\d+\/conversations$/, () => conversation()],
  ['GET', /^\/conversations\/\d+$/, () => conversation()],
  ['DELETE', /^\/conversations\/\d+$/, () => null],
  ['GET', /^\/conversations\/\d+\/messages$/, () => state.messages],
  [
    'POST',
    /^\/conversations\/\d+\/messages$/,
    (ctx) => {
      /*
        태스크는 여기서 시작된다. `/agent/decision` 이 아니다 —
        화면은 이 응답의 taskId 로 폴링을 걸고, 값이 없으면 "작업이 시작되지 않았다" 로
        떨어져 대화가 그 자리에서 멈춘다.
      */
      const content = String(ctx.body.content ?? '');
      const task = createTask(taskKindFor(content));
      state.projectCreated = true;
      return addMessage('user', content, task.taskId);
    },
  ],
  ['GET', /^\/trash\/conversations$/, () => []],
  ['POST', /^\/trash\/conversations\/\d+\/restore$/, () => conversation()],
  ['DELETE', /^\/trash\/conversations\/\d+$/, () => null],

  /* ----- agent ----- */
  ['GET', /^\/agent\/ai-providers$/, () => ({
    providers: [
      { provider: 'ANTHROPIC', defaultModel: 'claude-opus-5', models: ['claude-opus-5'], thinkingModels: ['claude-opus-5'] },
      { provider: 'OPENAI', defaultModel: 'gpt-5', models: ['gpt-5'], thinkingModels: [] },
    ],
  })],
  [
    'POST',
    /^\/agent\/decision$/,
    (ctx) => {
      state.projectCreated = true;
      const content = String(ctx.body.content ?? '');
      const kind = taskKindFor(content);
      const task = createTask(kind);
      return {
        steps: [{ agentType: kind === 'code' ? 'CODE' : 'RUNTIME_SETUP', parameters: {} }],
        reasoning: null,
        aiProvider: String(ctx.body.aiProvider ?? 'ANTHROPIC'),
        taskId: task.taskId,
        status: task.status,
        approvalIds: [],
      };
    },
  ],
  [
    'GET',
    /^\/agent\/tasks\/([^/]+)$/,
    (ctx) => {
      const task = getTask(ctx.params[0]);
      if (!task) throw notFound('태스크를 찾을 수 없습니다.');
      return {
        taskId: task.taskId,
        status: task.status,
        previewUrl: task.previewUrl,
        summary: task.summary,
        error: null,
        question: task.status === 'WAITING_INPUT' ? '어떤 화면 구성으로 만들까요?' : null,
        clarification:
          task.status === 'WAITING_INPUT'
            ? {
                question: '어떤 화면 구성으로 만들까요?',
                inputType: 'SINGLE_SELECT',
                options: [
                  { value: 'minimal', label: '깔끔한 단일 페이지', recommended: true },
                  { value: 'dashboard', label: '사이드바가 있는 대시보드', recommended: false },
                ],
                allowOther: true,
                actionType: null,
              }
            : null,
        failureLog: null,
        suggestedFix: null,
        attempt: 1,
        maxAttempts: 3,
        retryable: true,
        pendingApprovalId:
          task.status === 'WAITING_APPROVAL'
            ? (task.approvalIds.find((id) => findApproval(id)?.status === 'PENDING') ?? null)
            : null,
      };
    },
  ],
  [
    'GET',
    /^\/agent\/tasks\/([^/]+)\/events$/,
    (ctx) => {
      const task = getTask(ctx.params[0]);
      if (!task) return [];
      const after = Number(ctx.query.get('afterEventId') ?? 0);
      return task.events.filter((event) => event.eventId > after);
    },
  ],
  [
    'POST',
    /^\/agent\/tasks\/([^/]+)\/input$/,
    (ctx) => {
      const task = getTask(ctx.params[0]);
      if (task) answerClarification(task);
      return null;
    },
  ],
  ['POST', /^\/agent\/tasks\/([^/]+)\/retry$/, () => null],
  ['DELETE', /^\/agent\/tasks\/([^/]+)$/, () => null],
  ['DELETE', /^\/agent\/session$/, () => null],
  [
    'GET',
    /^\/agent\/conversations\/\d+\/active-task$/,
    () => {
      const task = activeTask();
      if (!task) return NO_CONTENT;
      return { taskId: task.taskId, status: task.status };
    },
  ],

  /* ----- approvals ----- */
  ['GET', /^\/projects\/\d+\/approvals$/, () => state.approvals],
  [
    'GET',
    /^\/approvals\/(\d+)$/,
    (ctx) => {
      const approval = findApproval(Number(ctx.params[0]));
      if (!approval) throw notFound('승인을 찾을 수 없습니다.');
      return approval;
    },
  ],
  ['POST', /^\/approvals\/(\d+)\/approve$/, (ctx) => decideApproval(Number(ctx.params[0]), true)],
  ['POST', /^\/approvals\/(\d+)\/reject$/, (ctx) => decideApproval(Number(ctx.params[0]), false)],

  /* ----- preview ----- */
  ['GET', /^\/projects\/\d+\/preview-session$/, () => previewSession()],
  ['POST', /^\/projects\/\d+\/preview-session$/, () => { state.previewReady = true; return previewSession(); }],
  ['POST', /^\/preview-sessions\/[^/]+\/access$/, () => ({
    sessionId: 'demo-preview-session',
    previewUrl: demoPreviewUrl(),
    expiresAt: iso(1000 * 60 * 55),
  })],
  ['GET', /^\/preview-sessions\/[^/]+\/status$/, () => ({
    sessionId: 'demo-preview-session',
    projectId: DEMO.projectId,
    taskId: null,
    sessionStatus: 'ACTIVE',
    containerRunning: true,
    oomKilled: false,
    exitCode: null,
    startedAt: iso(-1000 * 60 * 2),
    expiresAt: iso(1000 * 60 * 55),
    resources: { memoryUsageBytes: 214958080, memoryLimitBytes: 536870912, memoryUsagePercent: 40.0, cpuPercent: 3.2 },
  })],
  ['GET', /^\/preview-sessions\/[^/]+\/logs$/, () => ({ sessionId: 'demo-preview-session', containerRunning: true, logText: SERVER_LOG })],
  ['DELETE', /^\/preview-sessions\/[^/]+$/, () => { state.previewReady = false; return null; }],

  /* ----- preview runtime ----- */
  ['GET', /^\/projects\/\d+\/preview\/runtime$/, () => ({
    projectId: DEMO.projectId,
    runtimeType: state.runtimeType,
    startCommand: state.runtimeType === 'NODE_SERVER' ? 'npm start' : null,
    apiPathPrefix: null,
    healthPath: state.runtimeType === 'NODE_SERVER' ? '/health' : null,
    dbEngine: state.runtimeType === 'NODE_SERVER' ? 'POSTGRESQL' : null,
    source: state.runtimeType === 'STATIC' ? 'DEFAULT' : 'STORED',
  })],
  [
    'PUT',
    /^\/projects\/\d+\/preview\/runtime$/,
    (ctx) => {
      state.runtimeType = String(ctx.body.runtimeType ?? 'STATIC');
      // 서버형으로 옮기면 접속 정보가 환경변수로 들어온다
      if (state.runtimeType === 'NODE_SERVER') ensureBackendEnvVars();
      return {
        projectId: DEMO.projectId,
        runtimeType: state.runtimeType,
        startCommand: (ctx.body.startCommand as string | null) ?? (state.runtimeType === 'NODE_SERVER' ? 'npm start' : null),
        apiPathPrefix: null,
        healthPath: state.runtimeType === 'NODE_SERVER' ? '/health' : null,
        dbEngine: state.runtimeType === 'NODE_SERVER' ? 'POSTGRESQL' : null,
        source: 'STORED',
      };
    },
  ],

  /* ----- deployments ----- */
  ['GET', /^\/projects\/\d+\/deployments$/, () => state.deployments.map(toDeploymentHistory)],
  [
    'POST',
    /^\/projects\/\d+\/deployments$/,
    (ctx) => {
      const hosting = String(ctx.body.frontendHostingType ?? 'GITHUB_PAGES');
      // EC2·S3 만 승인을 거친다 — 과금 자원을 띄우기 때문이다. 실제 서버와 같은 규칙이다
      const requiresApproval = hosting.startsWith('AWS');
      const deployment = createDeployment(hosting, !requiresApproval);
      if (requiresApproval) {
        const approval = addApproval(
          'DEPLOYMENT',
          `${hosting} 로 배포합니다. 인스턴스가 켜져 있는 동안 과금됩니다.`,
          null,
        );
        deployment.approvalId = approval.approvalId;
      }
      return {
        deploymentId: deployment.historyId,
        projectId: DEMO.projectId,
        deployTargetType: 'LATEST',
        versionName: deployment.versionLabel,
        status: deployment.status,
        pagesUrl: null,
        createdAt: deployment.triggeredAt,
        approvalIds: deployment.approvalId != null ? [deployment.approvalId] : [],
      };
    },
  ],
  ['GET', /^\/projects\/\d+\/versions$/, () => state.deployments.filter((item) => item.status === 'SUCCESS').map((item) => ({
    versionId: item.historyId,
    versionName: item.versionLabel,
    commitSha: '4f2c91ae8d3b7',
    title: '회원가입·로그인 화면 추가',
    deployStatus: 'SUCCESS',
    mergedAt: item.updatedAt,
  }))],
  ['GET', /^\/projects\/\d+\/deployment-candidates$/, () => []],
  ['GET', /^\/deployments\/(\d+)$/, (ctx) => {
    const deployment = state.deployments.find((item) => item.historyId === Number(ctx.params[0]));
    if (!deployment) throw notFound('배포를 찾을 수 없습니다.');
    return {
      historyId: deployment.historyId,
      projectId: DEMO.projectId,
      deployTargetType: 'LATEST',
      versionLabel: deployment.versionLabel,
      deployedUrl: deployment.deployedUrl,
      status: deployment.status,
      buildStatus: deployment.status === 'SUCCESS' ? 'completed' : 'in_progress',
      buildConclusion: deployment.status === 'SUCCESS' ? 'success' : null,
      triggeredAt: deployment.triggeredAt,
      updatedAt: deployment.updatedAt,
    };
  }],
  ['GET', /^\/deployments\/(\d+)\/logs$/, (ctx) => ({
    historyId: Number(ctx.params[0]),
    workflowRunId: 88412031,
    jobs: [
      {
        jobId: 1,
        name: 'build-and-deploy',
        status: 'completed',
        conclusion: 'success',
        steps: [
          { number: 1, name: 'Checkout', status: 'completed', conclusion: 'success' },
          { number: 2, name: 'Setup Node', status: 'completed', conclusion: 'success' },
          { number: 3, name: 'Install', status: 'completed', conclusion: 'success' },
          { number: 4, name: 'Build', status: 'completed', conclusion: 'success' },
          { number: 5, name: 'Deploy', status: 'completed', conclusion: 'success' },
        ],
      },
    ],
    logText: DEPLOY_LOG,
  })],
  ['GET', /^\/deployments\/(\d+)\/failure-analysis$/, () => NO_CONTENT],
  ['POST', /^\/deployments\/(\d+)\/failure-analysis$/, () => NO_CONTENT],
  ['POST', /^\/deployments\/(\d+)\/retry$/, () => {
    const deployment = createDeployment('GITHUB_PAGES', true);
    return {
      deploymentId: deployment.historyId,
      projectId: DEMO.projectId,
      deployTargetType: 'LATEST',
      versionName: deployment.versionLabel,
      status: deployment.status,
      pagesUrl: null,
      createdAt: deployment.triggeredAt,
      approvalIds: [],
    };
  }],
  ['GET', /^\/versions\/(\d+)$/, (ctx) => ({
    versionId: Number(ctx.params[0]),
    versionName: 'v1',
    commitSha: '4f2c91ae8d3b7',
    title: '회원가입·로그인 화면 추가',
    description: null,
    deployStatus: 'SUCCESS',
    deployedUrl: DEMO.pagesUrl,
    mergedBy: DEMO.username,
    mergedByAvatarUrl: DEMO.avatarUrl,
    prNumber: 1,
    mergedAt: iso(-1000 * 60 * 2),
  })],

  /* ----- domains ----- */
  ['GET', /^\/domains\/hosting-targets$/, () => ({ hostingTargets: ['GITHUB_PAGES', 'AWS', 'AWS_EC2_FRONTEND', 'AWS_S3_FRONTEND'] })],
  ['GET', /^\/projects\/\d+\/domains$/, () => state.domains],
  [
    'POST',
    /^\/projects\/\d+\/domains$/,
    (ctx) => {
      const type = String(ctx.body.type ?? 'managed_subdomain');
      const label = String(ctx.body.label ?? '');
      const hostname = type === 'managed_subdomain' ? `${label || 'todo-together'}.qeploy.com` : String(ctx.body.hostname ?? DEMO.domainHostname);
      const hostingTarget = String(ctx.body.hostingTarget ?? 'GITHUB_PAGES');
      createDomain(type, hostname, hostingTarget);
      const approval = addApproval('DOMAIN_BINDING', `${hostname} 을 이 프로젝트에 연결합니다.`, null);
      return { taskId: `demo-domain-${approval.approvalId}`, status: 'WAITING_APPROVAL', approvalIds: [approval.approvalId] };
    },
  ],
  ['GET', /^\/domains\/(\d+)$/, (ctx) => {
    const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
    if (!domain) throw notFound('도메인을 찾을 수 없습니다.');
    return domain;
  }],
  ['GET', /^\/domains\/(\d+)\/verification-guide$/, (ctx) => {
    const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
    return {
      hostname: domain?.hostname ?? DEMO.domainHostname,
      verificationMethod: 'CNAME',
      records: [{ type: 'CNAME', host: domain?.hostname ?? DEMO.domainHostname, value: 'edge.qeploy.com' }],
    };
  }],
  ['POST', /^\/domains\/(\d+)\/verification-checks$/, (ctx) => {
    const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
    if (!domain) throw notFound('도메인을 찾을 수 없습니다.');
    return domain;
  }],
  ['DELETE', /^\/domains\/(\d+)$/, (ctx) => {
    const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
    const approval = addApproval('DOMAIN_UNBIND', `${domain?.hostname ?? ''} 연결을 해제합니다.`, null);
    return { accepted: true, approvalIds: [approval.approvalId] };
  }],
  ['GET', /^\/domain-search$/, (ctx) => ({
    keyword: ctx.query.get('keyword') ?? '',
    results: [{ type: 'managed_subdomain', hostname: DEMO.domainHostname, available: true, price: null, currency: null }],
  })],

  /* ----- servers ----- */
  ['GET', /^\/projects\/\d+\/servers$/, () => state.servers],
  [
    'POST',
    /^\/projects\/\d+\/servers$/,
    (ctx) => {
      const instanceType = String(ctx.body.instanceType ?? 't3.micro');
      const server = createServer(instanceType);
      const approval = addApproval('SERVER_PROVISION', `${instanceType} 인스턴스를 당신의 AWS 계정에 만듭니다. 켜져 있는 동안 과금됩니다.`, null);
      return { requiresApproval: true, serverId: server.serverId, approvalIds: [approval.approvalId] };
    },
  ],
  ['POST', /^\/servers\/(\d+)\/terminate$/, (ctx) => { terminateServer(Number(ctx.params[0])); return null; }],
  ['GET', /^\/servers\/(\d+)\/logs$/, (ctx) => ({ serverId: Number(ctx.params[0]), source: ctx.query.get('source') ?? 'APP', content: SERVER_LOG })],

  /* ----- databases ----- */
  ['GET', /^\/projects\/\d+\/databases$/, () => state.databases],
  [
    'POST',
    /^\/projects\/\d+\/databases$/,
    (ctx) => {
      const method = String(ctx.body.method ?? 'LOCAL');
      const engine = String(ctx.body.engine ?? 'POSTGRESQL');
      const database = createDatabase(method, engine);
      if (method === 'LOCAL') {
        return { requiresApproval: false, database: { ...database, password: 'demo-local-password' }, taskId: null, approvalIds: [] };
      }
      const approval = addApproval('DATABASE_PROVISION', `${engine} 데이터베이스를 당신의 AWS 계정에 만듭니다. 켜져 있는 동안 과금됩니다.`, null);
      return { requiresApproval: true, database: null, taskId: `demo-db-${database.databaseId}`, approvalIds: [approval.approvalId] };
    },
  ],
  ['DELETE', /^\/databases\/(\d+)$/, (ctx) => {
    const id = Number(ctx.params[0]);
    state.databases = state.databases.filter((item) => item.databaseId !== id);
    return null;
  }],

  /* ----- environment variables ----- */
  ['GET', /^\/projects\/\d+\/environment-variables$/, () => state.envVars],
  [
    'POST',
    /^\/projects\/\d+\/environment-variables$/,
    (ctx) => {
      const variable = {
        environmentVariableId: Date.now(),
        scope: (ctx.body.scope as 'PREVIEW' | 'PRODUCTION') ?? 'PREVIEW',
        key: String(ctx.body.key ?? ''),
        value: ctx.body.secret ? null : String(ctx.body.value ?? ''),
        secret: Boolean(ctx.body.secret),
        createdAt: iso(),
        updatedAt: iso(),
      };
      state.envVars.push(variable);
      return variable;
    },
  ],
  ['PATCH', /^\/projects\/\d+\/environment-variables\/(\d+)$/, (ctx) => {
    const variable = state.envVars.find((item) => item.environmentVariableId === Number(ctx.params[0]));
    if (!variable) throw notFound('환경변수를 찾을 수 없습니다.');
    if (typeof ctx.body.value === 'string') variable.value = variable.secret ? null : ctx.body.value;
    if (typeof ctx.body.secret === 'boolean') variable.secret = ctx.body.secret;
    variable.updatedAt = iso();
    return variable;
  }],
  ['DELETE', /^\/projects\/\d+\/environment-variables\/(\d+)$/, (ctx) => {
    state.envVars = state.envVars.filter((item) => item.environmentVariableId !== Number(ctx.params[0]));
    return null;
  }],
  ['GET', /^\/projects\/\d+\/environment-variables\/history$/, () => state.envVars.map((variable, index) => ({
    historyId: index + 1,
    environmentVariableId: variable.environmentVariableId,
    scope: variable.scope,
    key: variable.key,
    action: 'CREATED',
    secret: variable.secret,
    valueChanged: true,
    actorUserId: DEMO.userId,
    createdAt: variable.createdAt,
  }))],

  /* ----- cloud connections ----- */
  ['GET', /^\/cloud-connections$/, () => state.cloudConnections],
  [
    'POST',
    /^\/cloud-connections$/,
    (ctx) => {
      const connection = createCloudConnection(
        String(ctx.body.displayName ?? '내 AWS 계정'),
        String(ctx.body.region ?? DEMO.awsRegion),
        String(ctx.body.accessKeyId ?? 'AKIA****************'),
      );
      return { cloudConnectionId: connection.cloudConnectionId, provider: 'AWS', status: connection.status, jobId: `demo-job-${connection.cloudConnectionId}` };
    },
  ],
  ['GET', /^\/cloud-connections\/requirements$/, () => cloudRequirements()],
  ['GET', /^\/cloud-connections\/(\d+)$/, (ctx) => {
    const connection = state.cloudConnections.find((item) => item.cloudConnectionId === Number(ctx.params[0]));
    if (!connection) throw notFound('클라우드 연결을 찾을 수 없습니다.');
    return connection;
  }],
  ['DELETE', /^\/cloud-connections\/(\d+)$/, (ctx) => {
    const id = Number(ctx.params[0]);
    state.cloudConnections = state.cloudConnections.filter((item) => item.cloudConnectionId !== id);
    if (state.cloudConnectionId === id) state.cloudConnectionId = null;
    return null;
  }],
  ['GET', /^\/cloud-connections\/(\d+)\/health$/, (ctx) => ({
    cloudConnectionId: Number(ctx.params[0]),
    provider: 'AWS',
    status: 'CONNECTED',
    message: '필요한 권한을 모두 확인했습니다.',
    checkedAt: iso(),
  })],
  ['POST', /^\/cloud-connections\/(\d+)\/verification-jobs$/, (ctx) => ({ jobId: `demo-job-${ctx.params[0]}`, status: 'PENDING' })],
  ['GET', /^\/cloud-connection-verification-jobs\/([^/]+)$/, (ctx) => ({
    jobId: ctx.params[0],
    cloudConnectionId: state.cloudConnections[0]?.cloudConnectionId ?? 1,
    status: 'SUCCEEDED',
    connectionStatus: 'CONNECTED',
    message: '연결을 확인했습니다.',
    attempt: 1,
    createdAt: iso(-3000),
    startedAt: iso(-2500),
    completedAt: iso(),
  })],

  /* ----- changes ----- */
  ['GET', /^\/projects\/\d+\/changes$/, () => []],
  ['GET', /^\/changes\/(\d+)$/, (ctx) => ({
    changeId: Number(ctx.params[0]),
    projectId: DEMO.projectId,
    conversationId: DEMO.conversationId,
    taskId: null,
    previewSessionId: 'demo-preview-session',
    status: 'PREVIEW_READY',
    summary: '회원가입·로그인 화면 추가',
    approvalId: null,
    prNumber: null,
    mergeCommitSha: null,
    mergedAt: null,
    createdAt: iso(-60000),
    updatedAt: iso(),
  })],
  ['GET', /^\/changes\/(\d+)\/diff$/, (ctx) => ({ changeId: Number(ctx.params[0]), diff: DEMO_DIFF })],
];

/**
 * 이 요청이 시나리오의 몇 번째 장면인지 고른다.
 *
 * 문구로만 판단하지 않는다 — 시연 중에 문장을 조금 바꿔 말해도 흐름이 어긋나면 안 되므로
 * **순서를 먼저 본다**. 첫 요청은 화면 만들기, 그다음 요청은 백엔드 붙이기다.
 * 문구에 백엔드 신호가 뚜렷하면 순서보다 그쪽을 따른다.
 */
function taskKindFor(content: string): DemoTask['kind'] {
  /*
    문구를 먼저 보되 순서로 받쳐 둔다.

    시연 중에 문장을 조금 바꿔 말해도 흐름이 어긋나면 안 되고, 반대로 순서만 보면
    사용자가 직접 다른 요청을 넣었을 때 엉뚱한 장면이 돈다.
  */
  if (/배포|도메인|주소|공개|런칭/i.test(content)) return 'ship';
  if (/백엔드|서버|데이터베이스|\bdb\b|aws|인프라|가입.*되게|진짜/i.test(content)) return 'infra';

  const done = state.tasks.size;
  if (done === 0) return 'code';
  if (done === 1) return 'infra';
  if (done === 2) return 'ship';
  return 'generic';
}

function infraSettings() {
  const connection = state.cloudConnections.find(
    (item) => item.cloudConnectionId === state.cloudConnectionId,
  );
  return {
    projectId: DEMO.projectId,
    cloudConnectionId: state.cloudConnectionId,
    provider: connection ? 'AWS' : null,
    displayName: connection?.displayName ?? null,
    region: connection?.region ?? null,
    status: connection?.status ?? null,
    lastCheckedAt: connection?.lastCheckedAt ?? null,
    updatedAt: iso(),
  };
}

function costBudget() {
  return {
    projectId: DEMO.projectId,
    costAvailable: state.cloudConnectionId != null,
    provider: state.cloudConnectionId != null ? 'AWS' : null,
    currency: 'USD',
    estimatedMonthlyCost: 18.4,
    resourceCosts: [
      { resourceType: 'COMPUTE', description: 'EC2 t3.micro (730h)', monthlyCost: 8.5 },
      { resourceType: 'STORAGE', description: 'RDS PostgreSQL db.t4g.micro + 20GB', monthlyCost: 9.1 },
      { resourceType: 'NETWORK', description: '데이터 전송 (예상 20GB)', monthlyCost: 0.8 },
    ],
    assumptions: [
      '서울 리전(ap-northeast-2) 온디맨드 요금 기준',
      '프리티어 할인은 반영하지 않았습니다',
    ],
    priceTableVersion: '2026-09',
    budget: { monthlyBudgetAmount: 50, currency: 'USD', updatedAt: iso() },
    budgetStatus: 'WITHIN_BUDGET',
    budgetUsagePercent: 36.8,
  };
}

function conversation() {
  return {
    conversationId: DEMO.conversationId,
    projectId: DEMO.projectId,
    deleted: false,
    deletedAt: null,
    createdAt: iso(-1000 * 60 * 12),
    updatedAt: iso(),
  };
}

function toDeploymentHistory(deployment: (typeof state.deployments)[number]) {
  return {
    historyId: deployment.historyId,
    projectId: DEMO.projectId,
    deployTargetType: deployment.frontendHostingType,
    versionLabel: deployment.versionLabel,
    deployedUrl: deployment.deployedUrl,
    status: deployment.status,
    triggeredAt: deployment.triggeredAt,
    updatedAt: deployment.updatedAt,
    retriedFromHistoryId: null,
    errorCode: null,
    errorMessage: null,
  };
}

function cloudRequirements() {
  return {
    provider: 'AWS',
    credentialType: 'ACCESS_KEY',
    recommendedCredentialType: 'ACCESS_KEY',
    credentialOptions: [
      { type: 'ACCESS_KEY', label: '액세스 키', recommended: true, summary: 'IAM 사용자의 액세스 키를 붙여넣습니다.' },
      { type: 'ROLE_ARN', label: '역할 위임', recommended: false, summary: '교차 계정 역할을 만들어 위임합니다.' },
    ],
    fields: [
      { key: 'accessKeyId', label: 'Access Key ID', description: 'IAM 사용자 액세스 키', whereToFind: 'IAM > 사용자 > 보안 자격 증명', example: 'AKIAIOSFODNN7EXAMPLE', required: true, secret: false },
      { key: 'secretAccessKey', label: 'Secret Access Key', description: '키 생성 시 한 번만 보입니다', whereToFind: '키 생성 화면', example: null, required: true, secret: true },
      { key: 'region', label: '리전', description: '자원을 만들 리전', whereToFind: null, example: 'ap-northeast-2', required: true, secret: false },
    ],
    steps: [
      { order: 1, title: 'IAM 사용자를 만듭니다', detail: '프로그래밍 방식 액세스를 켭니다.' },
      { order: 2, title: '아래 정책을 붙입니다', detail: 'EC2·RDS·S3·Route53 생성 권한이 필요합니다.' },
      { order: 3, title: '액세스 키를 이 화면에 붙여넣습니다', detail: null },
    ],
    policyName: 'QeployDeployPolicy',
    roleName: 'QeployDeployRole',
    recommendedPolicy: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: ['ec2:*', 'rds:*', 's3:*', 'route53:*'], Resource: '*' }] },
    trustPolicy: null,
    notes: ['시연용 값입니다. 실제 자격 증명이 아닙니다.'],
  };
}

/* -------------------------------------------------------------------------- */
/* 어댑터                                                                      */
/* -------------------------------------------------------------------------- */

function notFound(message: string) {
  return { __demoStatus: 404, message };
}

function envelope(data: unknown) {
  return { status: 200, code: 'SUCCESS', message: '요청이 성공적으로 처리되었습니다', data };
}

function respond(config: InternalAxiosRequestConfig, status: number, data: unknown): AxiosResponse {
  return {
    data,
    status,
    statusText: status === 204 ? 'No Content' : 'OK',
    headers: new AxiosHeaders({ 'content-type': 'application/json' }),
    config,
  };
}

/** 응답이 오기까지의 짧은 지연. 즉시 돌아오면 화면이 로딩 상태를 못 그려 부자연스럽다 */
function latency() {
  return new Promise((resolve) => setTimeout(resolve, demoMs(70 + Math.random() * 80)));
}

export const demoAdapter: AxiosAdapter = async (config) => {
  advanceDemoClock();

  const method = (config.method ?? 'get').toUpperCase();
  const raw = config.url ?? '';
  // baseURL 이 붙기 전 상대 경로다. 쿼리를 떼어 경로만 남긴다
  const [pathPart, queryPart] = raw.split('?');
  const path = pathPart.replace(/\/+$/, '') || '/';
  const query = new URLSearchParams(queryPart ?? '');
  for (const [key, value] of Object.entries((config.params ?? {}) as Record<string, unknown>)) {
    if (value != null) query.set(key, String(value));
  }

  let body: Record<string, unknown> = {};
  if (typeof config.data === 'string') {
    try {
      body = JSON.parse(config.data) as Record<string, unknown>;
    } catch {
      body = {};
    }
  } else if (config.data && typeof config.data === 'object') {
    body = config.data as Record<string, unknown>;
  }

  await latency();

  for (const [routeMethod, pattern, handler] of routes) {
    if (routeMethod !== method) continue;
    const match = pattern.exec(path);
    if (!match) continue;

    try {
      const result = handler({ method, path, query, body, params: match.slice(1) });
      if (result === NO_CONTENT) return respond(config, 204, '');
      return respond(config, 200, envelope(result));
    } catch (thrown) {
      const failure = thrown as { __demoStatus?: number; message?: string };
      const status = failure.__demoStatus ?? 500;
      const payload = { status, code: 'DEMO_ERROR', message: failure.message ?? '시연 데이터를 찾을 수 없습니다.', data: null };
      throw new AxiosError(payload.message, String(status), config, null, respond(config, status, payload));
    }
  }

  // 시나리오에 없는 엔드포인트는 조용히 빈 성공으로 넘긴다 — 화면을 막지 않는 게 우선이다
  if (import.meta.env.DEV) {
    console.debug('[demo] 처리되지 않은 요청', method, path);
  }
  return respond(config, 200, envelope(null));
};
