/**
 * 시연 시나리오의 상태와 시간 진행.
 *
 * 서버가 하는 일을 화면 안에서 대신한다 — 실제 백엔드처럼 "요청을 받고, 잠시 뒤 다음
 * 상태로 넘어간다". 타이머를 돌리지 않고 **읽을 때마다 경과 시간으로 현재 상태를
 * 계산한다.** 화면이 이미 폴링하고 있으므로 그 폴링이 그대로 진행 표시가 된다.
 *
 * 이 파일은 시연 모드에서만 로딩된다(adapter 경유). 운영 번들에는 들어가지 않는다.
 */
import { demoMs } from '@/demo/config';
import type { Approval } from '@/types/approval.type';
import type { AgentTaskEvent } from '@/types/agent.type';
import type { ConversationMessage } from '@/types/chat.type';
import type { CloudConnection } from '@/types/cloudConnection.type';
import type { EnvironmentVariable } from '@/types/environment.type';
import type { ProvisionedDatabase } from '@/types/database.type';
import type { ProvisionedServer } from '@/types/server.type';
import type { Domain } from '@/types/domain.type';

/* -------------------------------------------------------------------------- */
/* 시연에 쓰는 고정값                                                          */
/* -------------------------------------------------------------------------- */

export const DEMO = {
  userId: 1,
  username: 'danto',
  avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
  projectId: 1,
  projectName: '할 일 관리 앱',
  conversationId: 1,
  repositoryOwner: 'danto',
  repositoryName: 'todo-together',
  get repositoryFullName() {
    return `${this.repositoryOwner}/${this.repositoryName}`;
  },
  pagesUrl: 'https://danto.github.io/todo-together/',
  domainHostname: 'todo-together.qeploy.com',
  domainUrl: 'https://todo-together.qeploy.com',
  ec2InstanceId: 'i-0a3f9c2b7d4e51f88',
  ec2Host: '13.125.44.201',
  rdsHost: 'qeploy-todo-8f21.cvv1kqz2lmnp.ap-northeast-2.rds.amazonaws.com',
  awsRegion: 'ap-northeast-2',
} as const;

/** 프리뷰 iframe 이 가리킬 주소. 같은 오리진이라 CORS·X-Frame 문제가 없다 */
export function demoPreviewUrl() {
  return `${window.location.origin}/demo-preview/index.html`;
}

/* -------------------------------------------------------------------------- */
/* 진행에 걸리는 시간                                                          */
/* -------------------------------------------------------------------------- */

const T = {
  agentThink: 2200,
  agentBuild: 5000,
  agentFinish: 2200,
  deployRun: 4000,
  cloudVerify: 1800,
  dbLocalReady: 1500,
  dbRdsProvision: 6000,
  serverQueued: 1200,
  serverBuilding: 4000,
  serverProvisioning: 4000,
  domainVerify: 3000,
} as const;

const now = () => Date.now();
const iso = (offsetMs = 0) => new Date(now() + offsetMs).toISOString();

/** 시작 시각으로부터 base(ms) 가 지났는지 */
function elapsed(startedAt: number, base: number) {
  return now() - startedAt >= demoMs(base);
}

/* -------------------------------------------------------------------------- */
/* 상태                                                                        */
/* -------------------------------------------------------------------------- */

/** 에이전트 태스크 한 건 */
type DemoTask = {
  taskId: string;
  /** 이 태스크가 무엇을 하는 중인지. 되묻기 여부가 갈린다 */
  kind: 'code' | 'backend' | 'generic';
  status: string;
  /** 현재 국면이 시작된 시각. 국면이 바뀔 때마다 다시 찍는다 */
  phaseStartedAt: number;
  askedClarification: boolean;
  approvalId: number | null;
  previewUrl: string | null;
  summary: string | null;
  events: AgentTaskEvent[];
  /** 다음에 붙일 이벤트들 */
  pendingEvents: { afterMs: number; type: string; message: string }[];
};

type DemoState = {
  seq: number;
  projectCreated: boolean;
  repositoryBound: boolean;
  runtimeType: string;
  cloudConnectionId: number | null;
  tasks: Map<string, DemoTask>;
  messages: ConversationMessage[];
  approvals: Approval[];
  deployments: {
    historyId: number;
    deployTargetType: string;
    frontendHostingType: string;
    versionLabel: string;
    deployedUrl: string | null;
    status: string;
    triggeredAt: string;
    updatedAt: string;
    startedAt: number | null;
    approvalId: number | null;
  }[];
  domains: (Domain & { startedAt: number | null })[];
  servers: (ProvisionedServer & { startedAt: number | null; stage: string })[];
  databases: (ProvisionedDatabase & { startedAt: number | null })[];
  envVars: EnvironmentVariable[];
  cloudConnections: (CloudConnection & { startedAt: number | null })[];
  previewReady: boolean;
};

function nextId() {
  state.seq += 1;
  return state.seq;
}

export const state: DemoState = {
  seq: 100,
  projectCreated: false,
  repositoryBound: false,
  runtimeType: 'STATIC',
  cloudConnectionId: null,
  tasks: new Map(),
  messages: [],
  approvals: [],
  deployments: [],
  domains: [],
  servers: [],
  databases: [],
  envVars: [],
  cloudConnections: [],
  previewReady: false,
};

/* -------------------------------------------------------------------------- */
/* 메시지                                                                      */
/* -------------------------------------------------------------------------- */

export function addMessage(role: 'user' | 'assistant', content: string, taskId: string | null) {
  const message: ConversationMessage = {
    messageId: nextId(),
    conversationId: DEMO.conversationId,
    role,
    content,
    tokenCount: role === 'user' ? 0 : Math.round(content.length / 2),
    createdAt: iso(),
    taskId,
  };
  state.messages.push(message);
  return message;
}

/* -------------------------------------------------------------------------- */
/* 승인                                                                        */
/* -------------------------------------------------------------------------- */

export function addApproval(
  type: string,
  summary: string,
  taskId: string | null,
  input: Approval['input'] = null,
) {
  const approval: Approval = {
    approvalId: nextId(),
    projectId: DEMO.projectId,
    conversationId: DEMO.conversationId,
    taskId,
    type,
    status: 'PENDING',
    summary,
    createdAt: iso(),
    decidedAt: null,
    input,
  };
  state.approvals.unshift(approval);
  return approval;
}

export function findApproval(approvalId: number) {
  return state.approvals.find((item) => item.approvalId === approvalId) ?? null;
}

/**
 * 승인 결정. 승인된 건이 무엇이었는지에 따라 뒤따르는 자원이 움직이기 시작한다 —
 * 실제 서버에서 승인이 워커를 깨우는 것과 같은 자리다.
 */
export function decideApproval(approvalId: number, approved: boolean) {
  const approval = findApproval(approvalId);
  if (!approval) return null;

  approval.status = approved ? 'APPROVED' : 'REJECTED';
  approval.decidedAt = iso();
  if (!approved) return approval;

  if (approval.type === 'CHANGE' || approval.type === 'RESULT') {
    const task = approval.taskId ? state.tasks.get(approval.taskId) : null;
    if (task) startTaskFinish(task);
  }

  if (approval.type === 'REPOSITORY_BINDING') {
    state.repositoryBound = true;
  }

  if (approval.type === 'DEPLOYMENT') {
    const deployment = state.deployments.find((item) => item.approvalId === approvalId);
    if (deployment) {
      deployment.status = 'IN_PROGRESS';
      deployment.startedAt = now();
    }
  }

  if (approval.type === 'DOMAIN_BINDING') {
    const domain = state.domains.find((item) => item.status === 'REQUESTED');
    if (domain) {
      domain.status = 'VERIFYING';
      domain.startedAt = now();
    }
  }

  if (approval.type === 'SERVER_PROVISION') {
    const server = state.servers.find((item) => item.status === 'PENDING');
    if (server) {
      server.status = 'QUEUED';
      server.startedAt = now();
      server.stage = 'QUEUED';
    }
  }

  if (approval.type === 'DATABASE_PROVISION') {
    const database = state.databases.find((item) => item.status === 'PENDING');
    if (database) {
      database.status = 'PROVISIONING';
      database.startedAt = now();
    }
  }

  return approval;
}

/* -------------------------------------------------------------------------- */
/* 에이전트 태스크                                                             */
/* -------------------------------------------------------------------------- */

const CODE_EVENTS_BEFORE_ASK = [
  { afterMs: 300, type: 'STARTED', message: '요청을 분석하고 있습니다' },
  { afterMs: 1300, type: 'PROGRESS', message: '실행 계획을 세웠습니다 — CODE → PREVIEW' },
];

const CODE_EVENTS_AFTER_ASK = [
  { afterMs: 400, type: 'PROGRESS', message: '프로젝트 구조를 만드는 중입니다' },
  { afterMs: 1600, type: 'PROGRESS', message: '회원가입·로그인 화면을 작성했습니다' },
  { afterMs: 2800, type: 'PROGRESS', message: '할 일 목록 화면을 작성했습니다' },
  { afterMs: 3900, type: 'PROGRESS', message: '의존성을 설치하고 빌드합니다' },
];

const BACKEND_EVENTS = [
  { afterMs: 300, type: 'STARTED', message: '요청을 분석하고 있습니다' },
  { afterMs: 1200, type: 'PROGRESS', message: '실행 계획을 세웠습니다 — CODE → RUNTIME_SETUP' },
  { afterMs: 2200, type: 'PROGRESS', message: '회원가입·로그인 API를 작성했습니다' },
  { afterMs: 3300, type: 'PROGRESS', message: '세션 토큰 발급과 검증을 붙였습니다' },
  { afterMs: 4200, type: 'PROGRESS', message: '데이터베이스 스키마를 준비했습니다' },
];

export function createTask(kind: DemoTask['kind']) {
  const taskId = `demo-task-${nextId()}`;
  const task: DemoTask = {
    taskId,
    kind,
    status: 'RUNNING',
    phaseStartedAt: now(),
    askedClarification: false,
    approvalId: null,
    previewUrl: null,
    summary: null,
    events: [],
    pendingEvents: kind === 'code' ? [...CODE_EVENTS_BEFORE_ASK] : [...BACKEND_EVENTS],
  };
  state.tasks.set(taskId, task);
  return task;
}

/** 되묻기에 답한 뒤 — 실제 빌드 국면으로 넘어간다 */
export function answerClarification(task: DemoTask) {
  task.askedClarification = true;
  task.status = 'RUNNING';
  task.phaseStartedAt = now();
  task.pendingEvents = [...CODE_EVENTS_AFTER_ASK];
}

/** 승인이 떨어진 뒤 — 마무리 국면 */
function startTaskFinish(task: DemoTask) {
  task.status = 'RUNNING';
  task.phaseStartedAt = now();
  task.pendingEvents = [
    { afterMs: 400, type: 'PROGRESS', message: '변경 사항을 적용했습니다' },
    { afterMs: 1400, type: 'PROGRESS', message: '프리뷰 컨테이너를 띄웠습니다' },
  ];
}

function pushEvent(task: DemoTask, type: string, message: string) {
  task.events.push({
    eventId: task.events.length + 1,
    taskId: task.taskId,
    type,
    status: task.status,
    message,
    createdAt: iso(),
  });
}

/** 태스크 하나를 현재 시각까지 진행시킨다 */
function advanceTask(task: DemoTask) {
  // 예정된 진행 이벤트 중 시각이 지난 것을 붙인다
  while (task.pendingEvents.length > 0 && elapsed(task.phaseStartedAt, task.pendingEvents[0].afterMs)) {
    const next = task.pendingEvents.shift()!;
    pushEvent(task, next.type, next.message);
  }

  if (task.status !== 'RUNNING') return;

  // 되묻기 국면 — 아직 안 물었으면 묻는다
  if (task.kind === 'code' && !task.askedClarification) {
    if (elapsed(task.phaseStartedAt, T.agentThink)) {
      task.status = 'WAITING_INPUT';
      pushEvent(task, 'WAITING_INPUT', '진행 방식을 확인하고 있습니다');
    }
    return;
  }

  // 빌드가 끝나면 승인을 만든다 (승인이 아직 없을 때만)
  if (task.approvalId == null) {
    if (elapsed(task.phaseStartedAt, T.agentBuild)) {
      const approval = addApproval(
        'CHANGE',
        task.kind === 'backend'
          ? '회원가입·로그인 API와 데이터베이스 스키마를 추가합니다. 파일 9개 변경.'
          : '회원가입·로그인 화면과 할 일 목록 화면을 추가합니다. 파일 14개 생성.',
        task.taskId,
      );
      task.approvalId = approval.approvalId;
      task.status = 'WAITING_APPROVAL';
      pushEvent(task, 'WAITING_APPROVAL', '변경 사항 승인을 기다립니다');
    }
    return;
  }

  // 마무리
  if (elapsed(task.phaseStartedAt, T.agentFinish)) {
    task.status = 'DONE';
    task.previewUrl = demoPreviewUrl();
    task.summary =
      task.kind === 'backend'
        ? '백엔드 API와 데이터베이스를 붙였습니다. 프리뷰에서 실제로 가입할 수 있습니다.'
        : '회원가입·로그인 화면과 할 일 목록을 만들었습니다. 프리뷰에서 확인해 보세요.';
    state.previewReady = true;
    pushEvent(task, 'COMPLETED', '작업을 마쳤습니다');
    addMessage('assistant', task.summary, task.taskId);

    if (task.kind === 'backend') {
      state.runtimeType = 'NODE_SERVER';
      ensureAutoDatabase();
      ensureBackendEnvVars();
    }
  }
}

export function getTask(taskId: string) {
  return state.tasks.get(taskId) ?? null;
}

export function activeTask() {
  for (const task of state.tasks.values()) {
    if (task.status !== 'DONE' && task.status !== 'CANCELLED' && task.status !== 'FAILED') {
      return task;
    }
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/* 자원                                                                        */
/* -------------------------------------------------------------------------- */

/** 서버형 런타임으로 바꾸면 프리뷰용 DB 가 자동으로 딸려 온다 */
function ensureAutoDatabase() {
  if (state.databases.some((item) => item.origin === 'PREVIEW_AUTO')) return;
  state.databases.push({
    databaseId: nextId(),
    projectId: DEMO.projectId,
    method: 'LOCAL',
    engine: 'POSTGRESQL',
    status: 'READY',
    origin: 'PREVIEW_AUTO',
    host: 'preview-db.internal',
    port: 5432,
    database: 'todo_preview',
    username: 'preview',
    expiresAt: iso(1000 * 60 * 55),
    errorCode: null,
    errorMessage: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: null,
  });
}

function ensureBackendEnvVars() {
  const keys = ['DATABASE_URL', 'JWT_SECRET', 'NODE_ENV'];
  for (const key of keys) {
    if (state.envVars.some((item) => item.key === key)) continue;
    state.envVars.push({
      environmentVariableId: nextId(),
      scope: 'PREVIEW',
      key,
      value: key === 'NODE_ENV' ? 'production' : null,
      secret: key !== 'NODE_ENV',
      createdAt: iso(),
      updatedAt: iso(),
    });
  }
}

export function createDatabase(method: string, engine: string) {
  const requiresApproval = method !== 'LOCAL';
  const database = {
    databaseId: nextId(),
    projectId: DEMO.projectId,
    method: method as ProvisionedDatabase['method'],
    engine: engine as ProvisionedDatabase['engine'],
    status: requiresApproval ? 'PENDING' : 'PROVISIONING',
    origin: 'MANUAL',
    host: null,
    port: null,
    database: null,
    username: null,
    expiresAt: method === 'LOCAL' ? iso(1000 * 60 * 60) : null,
    errorCode: null,
    errorMessage: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: requiresApproval ? null : now(),
  };
  state.databases.push(database);
  return database;
}

function advanceDatabase(database: DemoState['databases'][number]) {
  if (database.startedAt == null || database.status !== 'PROVISIONING') return;
  const budget = database.method === 'LOCAL' ? T.dbLocalReady : T.dbRdsProvision;
  if (!elapsed(database.startedAt, budget)) return;

  database.status = 'READY';
  database.host = database.method === 'RDS' ? DEMO.rdsHost : 'preview-db.internal';
  database.port = database.engine === 'MYSQL' ? 3306 : 5432;
  database.database = 'todo_app';
  database.username = 'qeploy';
  database.updatedAt = iso();
  database.startedAt = null;
  ensureBackendEnvVars();
}

export function createServer(instanceType: string) {
  const server = {
    serverId: nextId(),
    projectId: DEMO.projectId,
    status: 'PENDING',
    webOnly: false,
    instanceType,
    host: null,
    port: 8080,
    url: null,
    domainUrl: null,
    instanceId: null,
    errorCode: null,
    errorMessage: null,
    healthy: null,
    lastHealthCheckAt: null,
    recoveryAttemptedAt: null,
    hasBootDiagnostics: false,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: null,
    stage: 'PENDING',
  };
  state.servers.push(server);
  return server;
}

function advanceServer(server: DemoState['servers'][number]) {
  if (server.startedAt == null) return;

  if (server.stage === 'QUEUED' && elapsed(server.startedAt, T.serverQueued)) {
    server.stage = 'BUILDING';
    server.status = 'BUILDING';
    server.startedAt = now();
    server.updatedAt = iso();
    return;
  }

  if (server.stage === 'BUILDING' && elapsed(server.startedAt, T.serverBuilding)) {
    server.stage = 'PROVISIONING';
    server.status = 'PROVISIONING';
    server.instanceId = DEMO.ec2InstanceId;
    server.startedAt = now();
    server.updatedAt = iso();
    return;
  }

  if (server.stage === 'PROVISIONING' && elapsed(server.startedAt, T.serverProvisioning)) {
    server.stage = 'RUNNING';
    server.status = 'RUNNING';
    server.host = DEMO.ec2Host;
    server.url = `http://${DEMO.ec2Host}:8080`;
    server.healthy = true;
    server.lastHealthCheckAt = iso();
    server.updatedAt = iso();
    server.startedAt = null;

    const connected = state.domains.find((item) => item.status === 'CONNECTED');
    if (connected) server.domainUrl = DEMO.domainUrl;
  }
}

export function terminateServer(serverId: number) {
  const server = state.servers.find((item) => item.serverId === serverId);
  if (!server) return;
  server.status = 'TERMINATED';
  server.healthy = null;
  server.url = null;
  server.domainUrl = null;
  server.startedAt = null;
  server.stage = 'TERMINATED';
  server.updatedAt = iso();
}

export function createDeployment(frontendHostingType: string) {
  // EC2 만 승인을 거친다 — 과금 인스턴스를 띄우기 때문이다. 실제 서버와 같은 규칙이다
  const requiresApproval = frontendHostingType.startsWith('AWS');
  const deployment = {
    historyId: nextId(),
    deployTargetType: 'LATEST',
    frontendHostingType,
    versionLabel: `v${state.deployments.length + 1}`,
    deployedUrl: null as string | null,
    status: requiresApproval ? 'PENDING' : 'IN_PROGRESS',
    triggeredAt: iso(),
    updatedAt: iso(),
    startedAt: requiresApproval ? null : now(),
    approvalId: null as number | null,
  };

  if (requiresApproval) {
    const approval = addApproval(
      'DEPLOYMENT',
      `${frontendHostingType} 로 배포합니다. 인스턴스가 켜져 있는 동안 과금됩니다.`,
      null,
    );
    deployment.approvalId = approval.approvalId;
  }

  state.deployments.unshift(deployment);
  return deployment;
}

function advanceDeployment(deployment: DemoState['deployments'][number]) {
  if (deployment.startedAt == null || deployment.status !== 'IN_PROGRESS') return;
  if (!elapsed(deployment.startedAt, T.deployRun)) return;

  deployment.status = 'SUCCESS';
  deployment.deployedUrl = deployment.frontendHostingType.startsWith('AWS')
    ? `http://${DEMO.ec2Host}`
    : DEMO.pagesUrl;
  deployment.updatedAt = iso();
  deployment.startedAt = null;
}

export function createDomain(type: string, hostname: string, hostingTarget: string) {
  const domain = {
    domainId: nextId(),
    projectId: DEMO.projectId,
    type: type as Domain['type'],
    hostingTarget: hostingTarget as Domain['hostingTarget'],
    hostname,
    status: 'REQUESTED' as Domain['status'],
    verificationMethod: 'CNAME' as Domain['verificationMethod'],
    dnsTarget: 'edge.qeploy.com',
    httpsEnforced: true,
    serverId: null,
    certificateStatus: 'PENDING' as Domain['certificateStatus'],
    certificateExpiresAt: null,
    lastCheckedAt: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: null as number | null,
  };
  state.domains.push(domain);
  return domain;
}

function advanceDomain(domain: DemoState['domains'][number]) {
  if (domain.startedAt == null || domain.status !== 'VERIFYING') return;
  if (!elapsed(domain.startedAt, T.domainVerify)) return;

  domain.status = 'CONNECTED';
  domain.certificateStatus = 'ACTIVE';
  domain.certificateExpiresAt = iso(1000 * 60 * 60 * 24 * 90);
  domain.lastCheckedAt = iso();
  domain.updatedAt = iso();
  domain.startedAt = null;

  const running = state.servers.find((item) => item.status === 'RUNNING');
  if (running) {
    domain.serverId = running.serverId;
    running.domainUrl = DEMO.domainUrl;
  }
}

export function createCloudConnection(displayName: string, region: string, accessKeyId: string) {
  const connection = {
    cloudConnectionId: nextId(),
    provider: 'AWS' as const,
    displayName,
    accountId: '481019284412',
    region: region || DEMO.awsRegion,
    roleArn: null,
    awsCredentialType: 'ACCESS_KEY' as const,
    accessKeyId,
    secretAccessKeyConfigured: true,
    sessionTokenConfigured: false,
    gcpCredentialType: null,
    serviceAccountKeyConfigured: false,
    projectId: null,
    serviceAccountEmail: null,
    status: 'VERIFYING',
    lastCheckedAt: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: now(),
  };
  state.cloudConnections.push(connection);
  return connection;
}

function advanceCloudConnection(connection: DemoState['cloudConnections'][number]) {
  if (connection.startedAt == null) return;
  if (!elapsed(connection.startedAt, T.cloudVerify)) return;

  connection.status = 'CONNECTED';
  connection.lastCheckedAt = iso();
  connection.updatedAt = iso();
  connection.startedAt = null;
}

/* -------------------------------------------------------------------------- */
/* 진행                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * 모든 요청 직전에 한 번 부른다. 마지막 호출 이후 지난 시간만큼 시나리오를 밀어 준다.
 *
 * 타이머가 아니라 요청 시점 계산인 이유는, 화면이 이미 폴링을 하고 있어서다 —
 * 폴링이 곧 진행이고, 탭이 백그라운드로 내려가도 어긋나지 않는다.
 */
export function advanceDemoClock() {
  for (const task of state.tasks.values()) advanceTask(task);
  for (const deployment of state.deployments) advanceDeployment(deployment);
  for (const domain of state.domains) advanceDomain(domain);
  for (const server of state.servers) advanceServer(server);
  for (const database of state.databases) advanceDatabase(database);
  for (const connection of state.cloudConnections) advanceCloudConnection(connection);
}
