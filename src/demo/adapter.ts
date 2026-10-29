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
import awsDeployPolicy from '@/demo/aws-deploy-policy.json';
import demoTemplates from '@/demo/templates.json';
import {
  DEMO,
  addApproval,
  addMessage,
  advanceDemoClock,
  answerClarification,
  cancelTask,
  clarificationFor,
  createCloudConnection,
  createDatabase,
  createDeployment,
  createDomain,
  createServer,
  createTask,
  decideApproval,
  deleteAiCredential,
  demoPreviewUrl,
  ensureBackendEnvVars,
  findApproval,
  getTask,
  expiresIso,
  iso,
  markGithubAppInstalled,
  activeTask,
  putAiCredential,
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

/* -------------------------------------------------------------------------- */
/* 고정 응답 조각                                                              */
/* -------------------------------------------------------------------------- */

function demoUser() {
  return {
    id: DEMO.userId,
    username: DEMO.username,
    avatarUrl: DEMO.avatarUrl,
    githubAppInstalled: state.githubAppInstalled,
    githubAppTokenLinked: state.githubAppInstalled,
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
    message: 'feat: 할 일 카드(마감일·우선순위·카테고리)와 진행률 추가',
    author: DEMO.username,
    committedAt: state.repositoryBoundAt ?? iso(),
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
      expiresAt: '',
      failureReason: '',
    };
  }
  return {
    sessionId: DEMO.previewSessionId,
    projectId: DEMO.projectId,
    taskId: null,
    status: 'ACTIVE',
    expiresAt: expiresIso(1000 * 60 * 55),
    failureReason: '',
  };
}

/**
 * 활동 로그. 문구는 실제 서버(ProjectQueryService)가 만드는 모양 그대로다 — 원시 유형·상태
 * 값이 문장에 들어간다. 시연에서만 다듬으면 화면이 제품과 다르게 읽힌다.
 */
function activityLogs() {
  const logs: { type: string; message: string; occurredAt: string }[] = [
    {
      type: 'PROJECT_CREATED',
      message: `프로젝트가 생성되었습니다: ${DEMO.projectName}`,
      occurredAt: state.projectCreatedAt ?? iso(),
    },
  ];
  for (const approval of [...state.approvals].reverse()) {
    if (approval.status === 'PENDING') continue;
    logs.push({
      type: `APPROVAL_${approval.status}`,
      message: `${approval.type} 승인 상태가 ${approval.status}로 변경되었습니다`,
      occurredAt: approval.decidedAt ?? approval.createdAt,
    });
  }
  for (const deployment of [...state.deployments].reverse()) {
    if (deployment.status !== 'SUCCESS') continue;
    logs.push({
      type: `DEPLOYMENT_${deployment.status}`,
      message: `배포 상태가 ${deployment.status}로 변경되었습니다`,
      occurredAt: deployment.updatedAt,
    });
  }
  for (const domain of state.domains) {
    if (domain.status !== 'CONNECTED') continue;
    logs.push({
      type: `DOMAIN_${domain.status}`,
      message: `도메인 ${domain.hostname} 상태가 ${domain.status}로 변경되었습니다`,
      occurredAt: domain.updatedAt,
    });
  }
  return logs.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
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

const DEPLOY_LOG = `Run npm ci
  added 214 packages in 12s
Run npm run build
  vite v8.0.2 building for production...
  ✓ 138 modules transformed.
  dist/index.html                  0.46 kB
  dist/assets/index-9c2f1a4e.js  184.21 kB
  ✓ built in 6.42s
Upload to S3
  upload: dist/index.html to s3://qeploy-todo-together/index.html
  upload: dist/assets/index-9c2f1a4e.js to s3://qeploy-todo-together/assets/index-9c2f1a4e.js
  Published to ${DEMO.s3WebsiteUrl}`;

/* -------------------------------------------------------------------------- */
/* 라우트                                                                      */
/* -------------------------------------------------------------------------- */

const routes: [string, RegExp, Handler][] = [
  /* ----- auth ----- */
  [
    'GET',
    /^\/auth\/github\/url$/,
    () => {
      // 시연은 이 주소로 나가지 않는다. 승인 화면은 시연 빌드 안에서 재현한다(demo/githubWindow)
      const demoState = `demo-state-${Date.now()}`;
      return {
        url: `${window.location.origin}/auth/callback?code=demo-code&state=${demoState}`,
        state: demoState,
      };
    },
  ],
  [
    'GET',
    /^\/auth\/github\/callback$/,
    () => ({
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      githubAppInstalled: true,
    }),
  ],
  [
    'POST',
    /^\/auth\/refresh$/,
    () => ({
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      githubAppInstalled: true,
    }),
  ],
  [
    'GET',
    /^\/auth\/github\/app\/install-url$/,
    () => ({
      // 설치는 재현 화면에서 Install 을 눌러 콜백이 올 때 끝난다
      url: `${window.location.origin}/auth/app-callback?setup_action=install`,
      state: null,
    }),
  ],
  [
    'GET',
    /^\/auth\/github\/app\/reauthorize-url$/,
    () => ({
      url: `${window.location.origin}/auth/app-callback?setup_action=reauthorize`,
      state: null,
    }),
  ],
  [
    'GET',
    /^\/auth\/github\/app\/callback$/,
    () => {
      markGithubAppInstalled();
      return {};
    },
  ],
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
      state.projectCreatedAt ??= iso();
      const name =
        typeof ctx.body.name === 'string' && ctx.body.name ? ctx.body.name : DEMO.projectName;
      return { projectId: DEMO.projectId, name, status: 'ACTIVE' };
    },
  ],
  [
    'GET',
    /^\/projects\/github\/repositories$/,
    () => [
      {
        fullName: DEMO.repositoryFullName,
        name: DEMO.repositoryName,
        owner: DEMO.repositoryOwner,
        description: '말로 만든 팀 할 일 앱',
        visibility: 'PRIVATE',
        defaultBranch: 'main',
        updatedAt: iso(-1000 * 60 * 5),
      },
    ],
  ],
  [
    'GET',
    /^\/projects\/\d+$/,
    () => ({
      projectId: DEMO.projectId,
      name: DEMO.projectName,
      status: 'ACTIVE',
      startMode: 'blank',
      templateType: null,
      draftMode: 'fast',
      createdAt: state.projectCreatedAt ?? iso(),
      updatedAt: iso(),
    }),
  ],
  [
    'PATCH',
    /^\/projects\/\d+$/,
    () => ({ projectId: DEMO.projectId, name: DEMO.projectName, status: 'ACTIVE' }),
  ],
  ['DELETE', /^\/projects\/\d+$/, () => null],
  [
    'GET',
    /^\/projects\/\d+\/overview$/,
    () => ({
      currentUrl: domainSummary()
        ? DEMO.domainUrl
        : (state.deployments.find((item) => item.status === 'SUCCESS')?.deployedUrl ?? null),
      deployStatus: deployStatus(),
      currentVersion:
        state.deployments.find((item) => item.status === 'SUCCESS')?.versionLabel ?? null,
      latestCommit: latestCommit(),
      repositoryHealth: { health: 'HEALTHY' },
      domainSummary: domainSummary(),
    }),
  ],
  ['GET', /^\/projects\/\d+\/commits$/, () => (latestCommit() ? [latestCommit()] : [])],
  ['GET', /^\/projects\/\d+\/activity-logs$/, () => activityLogs()],
  ['GET', /^\/projects\/\d+\/repository-health$/, () => ({ health: 'HEALTHY' })],
  [
    'POST',
    /^\/projects\/\d+\/repository$/,
    (ctx) => {
      const name =
        typeof ctx.body.repositoryName === 'string' ? ctx.body.repositoryName : DEMO.repositoryName;
      addApproval(
        'REPOSITORY_BINDING',
        `${DEMO.repositoryOwner}/${name} 저장소를 만들고 이 프로젝트에 연결합니다.`,
        null,
      );
      return {
        projectId: DEMO.projectId,
        repositoryFullName: `${DEMO.repositoryOwner}/${name}`,
        repositoryVisibility: ctx.body.repositoryVisibility === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE',
        bindingStatus: 'NOT_BOUND',
        repositoryHealth: 'HEALTHY',
      };
    },
  ],
  [
    'DELETE',
    /^\/projects\/\d+\/repository$/,
    () => {
      state.repositoryBound = false;
      return null;
    },
  ],
  [
    'GET',
    /^\/projects\/\d+\/settings\/repository$/,
    () => ({
      projectId: DEMO.projectId,
      connected: state.repositoryBound,
      repositoryFullName: state.repositoryBound ? DEMO.repositoryFullName : null,
      repositoryUrl: state.repositoryBound ? `https://github.com/${DEMO.repositoryFullName}` : null,
      defaultBranch: 'main',
      repositoryVisibility: 'PRIVATE',
      bindingStatus: state.repositoryBound ? 'BOUND' : 'NOT_BOUND',
      repositoryHealth: 'HEALTHY',
      connectedAt: state.repositoryBoundAt,
      lastSyncedAt: state.repositoryBoundAt,
    }),
  ],
  [
    'GET',
    /^\/projects\/\d+\/settings\/chat$/,
    () => ({
      projectId: DEMO.projectId,
      changeApprovalRequired: true,
      deploymentApprovalRequired: true,
      domainApprovalRequired: true,
      infraApprovalRequired: true,
      resultApprovalRequired: false,
    }),
  ],
  [
    'PATCH',
    /^\/projects\/\d+\/settings\/chat$/,
    (ctx) => ({ projectId: DEMO.projectId, ...ctx.body }),
  ],
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
  [
    'DELETE',
    /^\/projects\/\d+\/settings\/infrastructure$/,
    () => {
      state.cloudConnectionId = null;
      return null;
    },
  ],
  [
    'GET',
    /^\/projects\/\d+\/settings\/infrastructure\/configuration$/,
    () => ({
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
    }),
  ],
  [
    'PUT',
    /^\/projects\/\d+\/settings\/infrastructure\/configuration$/,
    (ctx) => ({
      projectId: DEMO.projectId,
      configurable: true,
      settings: { ...ctx.body, updatedAt: iso() },
      pendingChange: null,
    }),
  ],
  ['GET', /^\/projects\/\d+\/settings\/infrastructure\/configuration\/history$/, () => []],
  ['GET', /^\/projects\/\d+\/settings\/cost-budget$/, () => costBudget()],
  ['PUT', /^\/projects\/\d+\/settings\/cost-budget$/, () => costBudget()],
  ['DELETE', /^\/projects\/\d+\/settings\/cost-budget$/, () => null],

  /* ----- conversations ----- */
  /*
    대화는 첫 요청을 보낼 때 생긴다. 프로젝트를 만들자마자 대화가 하나 있는 것처럼 굴면
    채팅 첫 화면(작성 팁)이 안 뜨고, 시작하기의 "첫 요청" 단계가 저절로 끝난다.
  */
  [
    'GET',
    /^\/projects\/\d+\/conversations$/,
    () => (state.conversationCreatedAt ? [conversation()] : []),
  ],
  [
    'POST',
    /^\/projects\/\d+\/conversations$/,
    () => {
      state.conversationCreatedAt ??= iso();
      return conversation();
    },
  ],
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
      /*
        서버 키는 없다. 제공자를 비우거나 키를 등록하지 않은 제공자를 고르면 서버가
        거절한다(BE #364) — 화면이 막아 주지만 여기서도 같은 규칙으로 판정한다.
      */
      const provider = String(ctx.body.aiProvider ?? '');
      if (!availableProviders().some((item) => item.provider === provider)) {
        throw badRequest('본인 AI API 키를 먼저 등록해 주세요.');
      }
      const task = createTask(taskKindFor(content));
      state.projectCreated = true;
      state.projectCreatedAt ??= iso();
      return addMessage('user', content, task.taskId);
    },
  ],
  ['GET', /^\/trash\/conversations$/, () => []],
  ['POST', /^\/trash\/conversations\/\d+\/restore$/, () => conversation()],
  ['DELETE', /^\/trash\/conversations\/\d+$/, () => null],

  /* ----- agent ----- */
  ['GET', /^\/agent\/ai-providers$/, () => ({ providers: availableProviders() })],
  [
    'POST',
    /^\/agent\/decision$/,
    (ctx) => {
      if (
        !availableProviders().some((item) => item.provider === String(ctx.body.aiProvider ?? ''))
      ) {
        throw badRequest('본인 AI API 키를 먼저 등록해 주세요.');
      }
      state.projectCreated = true;
      state.projectCreatedAt ??= iso();
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
      const clarification = clarificationFor(task);
      return {
        taskId: task.taskId,
        status: task.status,
        previewCreated: task.previewCreated,
        summary: task.summary,
        error: null,
        question: clarification?.question ?? null,
        clarification,
        failureLog: null,
        suggestedFix: null,
        attempt: 1,
        maxAttempts: 3,
        retryable: true,
        // 서버와 같은 기준 — 이 태스크에 걸린 PENDING 승인 중 가장 오래된 것
        pendingApprovalId:
          task.approvalIds.find((id) => findApproval(id)?.status === 'PENDING') ?? null,
        answeredClarification: task.answered,
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
      if (task) answerClarification(task, String(ctx.body.value ?? ''));
      return null;
    },
  ],
  ['POST', /^\/agent\/tasks\/([^/]+)\/retry$/, () => null],
  [
    'DELETE',
    /^\/agent\/tasks\/([^/]+)$/,
    (ctx) => {
      cancelTask(ctx.params[0]);
      return null;
    },
  ],
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
  [
    'POST',
    /^\/projects\/\d+\/preview-session$/,
    () => {
      state.previewReady = true;
      return previewSession();
    },
  ],
  [
    'POST',
    /^\/preview-sessions\/[^/]+\/access$/,
    () => ({
      sessionId: DEMO.previewSessionId,
      previewUrl: demoPreviewUrl(),
      expiresAt: expiresIso(1000 * 60 * 55),
    }),
  ],
  [
    'GET',
    /^\/preview-sessions\/[^/]+\/status$/,
    () => ({
      sessionId: DEMO.previewSessionId,
      projectId: DEMO.projectId,
      taskId: null,
      sessionStatus: 'ACTIVE',
      containerRunning: true,
      oomKilled: false,
      exitCode: null,
      startedAt: iso(-1000 * 60 * 2),
      expiresAt: expiresIso(1000 * 60 * 55),
      resources: {
        memoryUsageBytes: 214958080,
        memoryLimitBytes: 536870912,
        memoryUsagePercent: 40.0,
        cpuPercent: 3.2,
      },
    }),
  ],
  [
    'GET',
    /^\/preview-sessions\/[^/]+\/logs$/,
    () => ({ sessionId: DEMO.previewSessionId, containerRunning: true, logText: SERVER_LOG }),
  ],
  [
    'DELETE',
    /^\/preview-sessions\/[^/]+$/,
    () => {
      state.previewReady = false;
      return null;
    },
  ],

  /* ----- preview runtime ----- */
  [
    'GET',
    /^\/projects\/\d+\/preview\/runtime$/,
    () => ({
      projectId: DEMO.projectId,
      runtimeType: state.runtimeType,
      startCommand: state.runtimeType === 'NODE_SERVER' ? 'npm start' : null,
      apiPathPrefix: null,
      healthPath: state.runtimeType === 'NODE_SERVER' ? '/health' : null,
      dbEngine: state.runtimeType === 'NODE_SERVER' ? 'POSTGRESQL' : null,
      source: state.runtimeType === 'STATIC' ? 'DEFAULT' : 'STORED',
    }),
  ],
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
        startCommand:
          (ctx.body.startCommand as string | null) ??
          (state.runtimeType === 'NODE_SERVER' ? 'npm start' : null),
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
      const hosting = String(ctx.body.frontendHostingType ?? 'S3');
      /*
        EC2 만 승인을 거친다 — 과금 서버를 띄우는 일이라 서버 프로비저닝으로 넘어간다.
        Pages·S3 는 바로 시작한다. 실제 서버와 같은 규칙이다.
      */
      if (hosting === 'EC2') {
        const server = createServer('t3.micro');
        const approval = addApproval(
          'SERVER_PROVISION',
          '웹 전용 EC2 t3.micro 서버를 만듭니다.',
          null,
        );
        return {
          deploymentId: server.serverId,
          projectId: DEMO.projectId,
          deployTargetType: 'LATEST',
          versionName: null,
          status: 'PENDING',
          pagesUrl: null,
          createdAt: server.createdAt,
          approvalIds: [approval.approvalId],
        };
      }
      const deployment = createDeployment(hosting, true);
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
  [
    'GET',
    /^\/projects\/\d+\/versions$/,
    () =>
      state.deployments
        .filter((item) => item.status === 'SUCCESS')
        .map((item) => ({
          versionId: item.historyId,
          versionName: item.versionLabel,
          commitSha: '4f2c91ae8d3b7',
          title: '회원가입·로그인 화면 추가',
          deployStatus: 'SUCCESS',
          mergedAt: item.updatedAt,
        })),
  ],
  ['GET', /^\/projects\/\d+\/deployment-candidates$/, () => []],
  [
    'GET',
    /^\/deployments\/(\d+)$/,
    (ctx) => {
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
    },
  ],
  [
    'GET',
    /^\/deployments\/(\d+)\/logs$/,
    (ctx) => ({
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
    }),
  ],
  ['GET', /^\/deployments\/(\d+)\/failure-analysis$/, () => NO_CONTENT],
  ['POST', /^\/deployments\/(\d+)\/failure-analysis$/, () => NO_CONTENT],
  [
    'POST',
    /^\/deployments\/(\d+)\/retry$/,
    () => {
      const deployment = createDeployment('S3', true);
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
    },
  ],
  [
    'GET',
    /^\/versions\/(\d+)$/,
    (ctx) => ({
      versionId: Number(ctx.params[0]),
      versionName: 'v1',
      commitSha: '4f2c91ae8d3b7',
      title: '회원가입·로그인 화면 추가',
      description: null,
      deployStatus: 'SUCCESS',
      deployedUrl: DEMO.s3WebsiteUrl,
      mergedBy: DEMO.username,
      mergedByAvatarUrl: DEMO.avatarUrl,
      prNumber: 1,
      mergedAt: iso(-1000 * 60 * 2),
    }),
  ],

  /* ----- domains ----- */
  [
    'GET',
    /^\/domains\/hosting-targets$/,
    () => ({ hostingTargets: ['GITHUB_PAGES', 'AWS', 'AWS_EC2_FRONTEND', 'AWS_S3_FRONTEND'] }),
  ],
  ['GET', /^\/projects\/\d+\/domains$/, () => state.domains],
  [
    'POST',
    /^\/projects\/\d+\/domains$/,
    (ctx) => {
      const type = String(ctx.body.type ?? 'managed_subdomain');
      const label = String(ctx.body.label ?? '');
      const hostname =
        type === 'managed_subdomain'
          ? `${label || 'todo-together'}.qeploy.com`
          : String(ctx.body.hostname ?? DEMO.domainHostname);
      const hostingTarget = String(ctx.body.hostingTarget ?? 'AWS_S3_FRONTEND');
      createDomain(type, hostname, hostingTarget);
      const approval = addApproval(
        'DOMAIN_BINDING',
        `${hostname} 을 이 프로젝트에 연결합니다.`,
        null,
      );
      return {
        taskId: `demo-domain-${approval.approvalId}`,
        status: 'WAITING_APPROVAL',
        approvalIds: [approval.approvalId],
      };
    },
  ],
  [
    'GET',
    /^\/domains\/(\d+)$/,
    (ctx) => {
      const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
      if (!domain) throw notFound('도메인을 찾을 수 없습니다.');
      return domain;
    },
  ],
  [
    'GET',
    /^\/domains\/(\d+)\/verification-guide$/,
    (ctx) => {
      const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
      return {
        hostname: domain?.hostname ?? DEMO.domainHostname,
        verificationMethod: 'CNAME',
        records: [
          {
            type: 'CNAME',
            host: domain?.hostname ?? DEMO.domainHostname,
            value: 'edge.qeploy.com',
          },
        ],
      };
    },
  ],
  [
    'POST',
    /^\/domains\/(\d+)\/verification-checks$/,
    (ctx) => {
      const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
      if (!domain) throw notFound('도메인을 찾을 수 없습니다.');
      return domain;
    },
  ],
  [
    'DELETE',
    /^\/domains\/(\d+)$/,
    (ctx) => {
      const domain = state.domains.find((item) => item.domainId === Number(ctx.params[0]));
      const approval = addApproval(
        'DOMAIN_UNBIND',
        `${domain?.hostname ?? ''} 연결을 해제합니다.`,
        null,
      );
      return { accepted: true, approvalIds: [approval.approvalId] };
    },
  ],
  [
    'GET',
    /^\/domain-search$/,
    (ctx) => ({
      keyword: ctx.query.get('keyword') ?? '',
      results: [
        {
          type: 'managed_subdomain',
          hostname: DEMO.domainHostname,
          available: true,
          price: null,
          currency: null,
        },
      ],
    }),
  ],

  /* ----- servers ----- */
  ['GET', /^\/projects\/\d+\/servers$/, () => state.servers],
  [
    'POST',
    /^\/projects\/\d+\/servers$/,
    (ctx) => {
      const instanceType = String(ctx.body.instanceType ?? 't3.micro');
      const server = createServer(instanceType);
      const approval = addApproval(
        'SERVER_PROVISION',
        `${instanceType} 인스턴스를 당신의 AWS 계정에 만듭니다. 켜져 있는 동안 과금됩니다.`,
        null,
      );
      return {
        requiresApproval: true,
        serverId: server.serverId,
        approvalIds: [approval.approvalId],
      };
    },
  ],
  [
    'POST',
    /^\/servers\/(\d+)\/terminate$/,
    (ctx) => {
      terminateServer(Number(ctx.params[0]));
      return null;
    },
  ],
  [
    'GET',
    /^\/servers\/(\d+)\/logs$/,
    (ctx) => ({
      serverId: Number(ctx.params[0]),
      source: ctx.query.get('source') ?? 'APP',
      content: SERVER_LOG,
    }),
  ],

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
        return {
          requiresApproval: false,
          database: { ...database, password: 'demo-local-password' },
          taskId: null,
          approvalIds: [],
        };
      }
      const approval = addApproval(
        'DATABASE_PROVISION',
        `${engine} 데이터베이스를 당신의 AWS 계정에 만듭니다. 켜져 있는 동안 과금됩니다.`,
        null,
      );
      return {
        requiresApproval: true,
        database: null,
        taskId: `demo-db-${database.databaseId}`,
        approvalIds: [approval.approvalId],
      };
    },
  ],
  [
    'DELETE',
    /^\/databases\/(\d+)$/,
    (ctx) => {
      const id = Number(ctx.params[0]);
      state.databases = state.databases.filter((item) => item.databaseId !== id);
      return null;
    },
  ],

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
  [
    'PATCH',
    /^\/projects\/\d+\/environment-variables\/(\d+)$/,
    (ctx) => {
      const variable = state.envVars.find(
        (item) => item.environmentVariableId === Number(ctx.params[0]),
      );
      if (!variable) throw notFound('환경변수를 찾을 수 없습니다.');
      if (typeof ctx.body.value === 'string')
        variable.value = variable.secret ? null : ctx.body.value;
      if (typeof ctx.body.secret === 'boolean') variable.secret = ctx.body.secret;
      variable.updatedAt = iso();
      return variable;
    },
  ],
  [
    'DELETE',
    /^\/projects\/\d+\/environment-variables\/(\d+)$/,
    (ctx) => {
      state.envVars = state.envVars.filter(
        (item) => item.environmentVariableId !== Number(ctx.params[0]),
      );
      return null;
    },
  ],
  [
    'GET',
    /^\/projects\/\d+\/environment-variables\/history$/,
    () =>
      state.envVars.map((variable, index) => ({
        historyId: index + 1,
        environmentVariableId: variable.environmentVariableId,
        scope: variable.scope,
        key: variable.key,
        action: 'CREATED',
        secret: variable.secret,
        valueChanged: true,
        actorUserId: DEMO.userId,
        createdAt: variable.createdAt,
      })),
  ],

  /* ----- cloud connections ----- */
  ['GET', /^\/cloud-connections$/, () => state.cloudConnections],
  [
    'POST',
    /^\/cloud-connections$/,
    (ctx) => {
      const connection = createCloudConnection(
        String(ctx.body.displayName || '내 AWS 계정'),
        String(ctx.body.region || DEMO.awsRegion),
        String(ctx.body.accessKeyId || 'AKIA'),
        typeof ctx.body.accountId === 'string' ? ctx.body.accountId : null,
      );
      return {
        cloudConnectionId: connection.cloudConnectionId,
        provider: 'AWS',
        status: connection.status,
        jobId: `demo-job-${connection.cloudConnectionId}`,
      };
    },
  ],
  ['GET', /^\/cloud-connections\/requirements$/, () => cloudRequirements()],
  [
    'GET',
    /^\/cloud-connections\/(\d+)$/,
    (ctx) => {
      const connection = state.cloudConnections.find(
        (item) => item.cloudConnectionId === Number(ctx.params[0]),
      );
      if (!connection) throw notFound('클라우드 연결을 찾을 수 없습니다.');
      return connection;
    },
  ],
  [
    'DELETE',
    /^\/cloud-connections\/(\d+)$/,
    (ctx) => {
      const id = Number(ctx.params[0]);
      state.cloudConnections = state.cloudConnections.filter(
        (item) => item.cloudConnectionId !== id,
      );
      if (state.cloudConnectionId === id) state.cloudConnectionId = null;
      return null;
    },
  ],
  [
    'GET',
    /^\/cloud-connections\/(\d+)\/health$/,
    (ctx) => ({
      cloudConnectionId: Number(ctx.params[0]),
      provider: 'AWS',
      status: 'CONNECTED',
      message: '필요한 권한을 모두 확인했습니다.',
      checkedAt: iso(),
    }),
  ],
  [
    'POST',
    /^\/cloud-connections\/(\d+)\/verification-jobs$/,
    (ctx) => ({ jobId: `demo-job-${ctx.params[0]}`, status: 'PENDING' }),
  ],
  [
    'GET',
    /^\/cloud-connection-verification-jobs\/([^/]+)$/,
    (ctx) => {
      const id = Number(ctx.params[0].replace('demo-job-', ''));
      const connection =
        state.cloudConnections.find((item) => item.cloudConnectionId === id) ??
        state.cloudConnections[0];
      const done = connection?.status === 'CONNECTED';
      return {
        jobId: ctx.params[0],
        cloudConnectionId: connection?.cloudConnectionId ?? id,
        status: done ? 'SUCCEEDED' : 'RUNNING',
        connectionStatus: connection?.status ?? 'VERIFYING',
        message: done ? '연결을 확인했습니다.' : null,
        attempt: 1,
        createdAt: connection?.createdAt ?? iso(-3000),
        startedAt: connection?.createdAt ?? iso(-2500),
        completedAt: done ? (connection?.lastCheckedAt ?? iso()) : null,
      };
    },
  ],
  [
    'PUT',
    /^\/cloud-connections\/(\d+)\/credentials$/,
    (ctx) => ({
      jobId: `demo-job-${ctx.params[0]}`,
      cloudConnectionId: Number(ctx.params[0]),
      status: 'SUCCEEDED',
      connectionStatus: 'CONNECTED',
      message: '새 자격으로 연결을 확인했습니다.',
      attempt: 1,
      createdAt: iso(-1500),
      startedAt: iso(-1200),
      completedAt: iso(),
    }),
  ],

  /* ----- 본인 AI 키 (BYOK) ----- */
  ['GET', /^\/ai-credentials$/, () => state.aiCredentials],
  [
    'PUT',
    /^\/ai-credentials\/([A-Z_]+)$/,
    (ctx) => {
      const apiKey = String(ctx.body.apiKey ?? '');
      if (!apiKey) throw badRequest('API 키를 입력해 주세요.');
      const label = typeof ctx.body.label === 'string' && ctx.body.label ? ctx.body.label : null;
      return putAiCredential(ctx.params[0], apiKey, label);
    },
  ],
  [
    'DELETE',
    /^\/ai-credentials\/([A-Z_]+)$/,
    (ctx) => {
      deleteAiCredential(ctx.params[0]);
      return null;
    },
  ],

  /* ----- MCP 토큰 ----- */
  ['GET', /^\/api-tokens$/, () => []],

  /* ----- 템플릿 카탈로그 ----- */
  ['GET', /^\/templates$/, () => demoTemplates],
  [
    'GET',
    /^\/templates\/([^/]+)$/,
    (ctx) => {
      const template = demoTemplates.find((item) => item.templateId === ctx.params[0]);
      if (!template) throw notFound('템플릿을 찾을 수 없습니다.');
      return template;
    },
  ],

  /* ----- changes ----- */
  ['GET', /^\/projects\/\d+\/changes$/, () => []],
  [
    'GET',
    /^\/changes\/(\d+)$/,
    (ctx) => ({
      changeId: Number(ctx.params[0]),
      projectId: DEMO.projectId,
      conversationId: DEMO.conversationId,
      taskId: null,
      previewSessionId: DEMO.previewSessionId,
      status: 'PREVIEW_READY',
      summary: '회원가입·로그인 화면 추가',
      approvalId: null,
      prNumber: null,
      mergeCommitSha: null,
      mergedAt: null,
      createdAt: iso(-60000),
      updatedAt: iso(),
    }),
  ],
  [
    'GET',
    /^\/changes\/(\d+)\/diff$/,
    (ctx) => ({ changeId: Number(ctx.params[0]), diff: DEMO_DIFF }),
  ],
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
      {
        resourceType: 'STORAGE',
        description: 'RDS PostgreSQL db.t4g.micro + 20GB',
        monthlyCost: 9.1,
      },
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
    createdAt: state.conversationCreatedAt ?? iso(),
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

/**
 * 클라우드 연결 가이드. 실제 서버(CloudConnectionRequirementsService)의 액세스 키 안내와
 * 같은 필드·단계·주의 문구를 쓰고, 정책은 서버가 내려주는 원문
 * (`resources/aws/qeploy-aws-deploy-policy.json`)을 그대로 싣는다.
 *
 * 환경마다 달라지는 안내(역할 위임 준비 여부)는 뺐다. 시연 환경에서 고를 수 있는 것은
 * 액세스 키 하나라 선택지도 하나만 둔다 — 서버도 그럴 때 하나만 보낸다.
 */
function cloudRequirements() {
  const field = (
    key: string,
    label: string,
    description: string,
    whereToFind: string,
    example: string,
    required: boolean,
    secret: boolean,
  ) => ({ key, label, description, whereToFind, example, required, secret });
  return {
    provider: 'AWS',
    credentialType: 'ACCESS_KEY',
    recommendedCredentialType: 'ACCESS_KEY',
    credentialOptions: [
      {
        type: 'ACCESS_KEY',
        label: '액세스 키',
        recommended: true,
        summary:
          '설정이 더 간단하지만 장기 키를 암호화해 저장합니다. 임시 자격(STS)을 쓸 수도 있습니다.',
      },
    ],
    fields: [
      field(
        'displayName',
        '연결 이름',
        '이 연결을 화면에서 구분할 이름입니다.',
        '자유롭게 입력',
        'AWS 서울 계정',
        true,
        false,
      ),
      field(
        'region',
        '리전',
        '리소스를 배포할 AWS 리전입니다.',
        '리소스를 만들 리전을 선택 (서울=ap-northeast-2)',
        'ap-northeast-2',
        true,
        false,
      ),
      field(
        'accountId',
        'AWS 계정 ID',
        '12자리 계정 번호. 키가 이 계정의 것인지 확인하는 데 씁니다.',
        'AWS 콘솔 우측 상단 계정 메뉴 > 계정 ID',
        '123456789012',
        false,
        false,
      ),
      field(
        'accessKeyId',
        '액세스 키 ID',
        "아래 '추천 권한 정책'을 붙인 IAM 사용자의 액세스 키입니다.",
        'IAM > 사용자 > 보안 자격 증명 > 액세스 키 만들기',
        'AKIA...',
        true,
        false,
      ),
      field(
        'secretAccessKey',
        '시크릿 액세스 키',
        '액세스 키를 만들 때 한 번만 보이는 비밀값입니다. AES 로 암호화 저장되며 응답에 노출되지 않습니다.',
        '액세스 키 생성 시 함께 발급 (그때만 확인 가능)',
        '****',
        true,
        true,
      ),
    ],
    steps: [
      {
        order: 1,
        title: '권한 정책 생성',
        detail:
          "IAM 콘솔 > 정책 > 정책 생성 > JSON 탭에 아래 '추천 권한 정책'을 붙여넣고 이름 'QeployDeployPolicy' 로 저장합니다.",
      },
      {
        order: 2,
        title: 'IAM 사용자에 정책 연결',
        detail: '그 정책을 연결할 IAM 사용자를 만들거나 고릅니다(프로그래밍 방식 액세스).',
      },
      {
        order: 3,
        title: '액세스 키 발급',
        detail:
          'IAM > 사용자 > 보안 자격 증명 > 액세스 키 만들기 로 키를 발급합니다. 시크릿은 이때만 보이므로 바로 복사합니다.',
      },
      {
        order: 4,
        title: '키 입력',
        detail: '발급한 액세스 키 ID·시크릿과 리전을 입력한 뒤 연결합니다.',
      },
    ],
    policyName: 'QeployDeployPolicy',
    roleName: 'QeployDeployRole',
    recommendedPolicy: awsDeployPolicy,
    trustPolicy: null,
    notes: [
      '연결 검증은 자격 유효성(STS GetCallerIdentity)만 확인합니다. 위 권한 정책이 빠지면 연결은 성공해도 실제 배포에서 권한 부족으로 실패합니다 — 그래서 정책을 먼저 붙여야 합니다.',
      '권한 정책은 S3(qeploy-* 버킷)·SSM 파라미터(/qeploy/*)·IAM 인스턴스 역할(qeploy-instance-*)로 리소스를 좁혀 최소권한을 지향합니다.',
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* 어댑터                                                                      */
/* -------------------------------------------------------------------------- */

function notFound(message: string) {
  return { __demoStatus: 404, message };
}

function badRequest(message: string) {
  return { __demoStatus: 400, message };
}

/**
 * 쓸 수 있는 AI 제공자 — **본인이 키를 등록한 것만**(BE #364).
 *
 * 벤더 키 하나를 넣으면 벤더와 그 코딩 에이전트가 함께 온다(ANTHROPIC → ANTHROPIC +
 * CLAUDE_CODE). 코딩 에이전트는 모델을 CLI 가 정하므로 목록이 비어 있다.
 */
function availableProviders() {
  const providers: {
    provider: string;
    defaultModel: string | null;
    models: string[];
    thinkingModels: string[];
  }[] = [];
  for (const credential of state.aiCredentials) {
    if (credential.provider === 'ANTHROPIC') {
      providers.push(
        {
          provider: 'ANTHROPIC',
          defaultModel: 'claude-opus-5-5',
          models: ['claude-opus-5-5', 'claude-sonnet-5-5'],
          thinkingModels: ['claude-opus-5-5'],
        },
        { provider: 'CLAUDE_CODE', defaultModel: null, models: [], thinkingModels: [] },
      );
    } else if (credential.provider === 'OPENAI') {
      providers.push(
        { provider: 'OPENAI', defaultModel: 'gpt-5', models: ['gpt-5'], thinkingModels: [] },
        { provider: 'CODEX', defaultModel: null, models: [], thinkingModels: [] },
      );
    } else {
      providers.push({
        provider: credential.provider,
        defaultModel: 'glm-5',
        models: ['glm-5'],
        thinkingModels: [],
      });
    }
  }
  return providers;
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
  return new Promise((resolve) => setTimeout(resolve, demoMs(55 + Math.random() * 60)));
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
      const payload = {
        status,
        code: 'DEMO_ERROR',
        message: failure.message ?? '시연 데이터를 찾을 수 없습니다.',
        data: null,
      };
      throw new AxiosError(
        payload.message,
        String(status),
        config,
        null,
        respond(config, status, payload),
      );
    }
  }

  // 시나리오에 없는 엔드포인트는 조용히 빈 성공으로 넘긴다 — 화면을 막지 않는 게 우선이다
  if (import.meta.env.DEV) {
    console.debug('[demo] 처리되지 않은 요청', method, path);
  }
  return respond(config, 200, envelope(null));
};
