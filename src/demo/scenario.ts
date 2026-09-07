/**
 * 시연 시나리오의 상태와 시간 진행.
 *
 * 서버가 하는 일을 화면 안에서 대신한다 — 실제 백엔드처럼 "요청을 받고, 잠시 뒤 다음
 * 상태로 넘어간다". 타이머로 밀지 않고 **읽을 때마다 경과 시간으로 현재 상태를
 * 계산한다.** 화면이 이미 폴링하고 있으므로 그 폴링이 그대로 진행 표시가 된다.
 *
 * 상태는 sessionStorage 에 남긴다. 예전에는 메모리에만 뒀는데, 새로고침 한 번에
 * 대화 이력과 프리뷰가 통째로 사라져서 시연 뒤에 화면을 둘러볼 수가 없었다.
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

/**
 * 프리뷰 안의 앱이 "백엔드가 붙었는지"를 읽는 자리.
 *
 * 프리뷰는 같은 오리진의 iframe 이라 localStorage 를 공유한다. 이 값 하나로
 * 회원가입이 실패하는 화면과 성공하는 화면이 갈린다 — 인프라를 붙이기 전과 후를
 * 말이 아니라 동작으로 보여주는 유일한 방법이다.
 */
const BACKEND_READY_KEY = 'demo-backend-ready';

function setBackendReady(ready: boolean) {
  try {
    if (ready) localStorage.setItem(BACKEND_READY_KEY, '1');
    else localStorage.removeItem(BACKEND_READY_KEY);
  } catch {
    // 저장이 막힌 환경이면 프리뷰는 계속 "백엔드 없음"으로 보인다
  }
}

/* -------------------------------------------------------------------------- */
/* 진행에 걸리는 시간                                                          */
/* -------------------------------------------------------------------------- */

const T = {
  agentThink: 1600,
  agentBuild: 3000,
  agentFinish: 1500,
  infraPlan: 1800,
  shipPlan: 1500,
  deployRun: 3000,
  dbProvision: 4000,
  serverQueued: 800,
  serverBuilding: 3000,
  serverProvisioning: 3000,
  domainVerify: 2500,
} as const;

const now = () => Date.now();
const iso = (offsetMs = 0) => new Date(now() + offsetMs).toISOString();

function elapsed(startedAt: number, base: number) {
  return now() - startedAt >= demoMs(base);
}

/**
 * 상태가 바뀔 때마다 올린다. 화면 갱신을 이 값으로 판단한다 —
 * 매 박동마다 조회를 무효화하면 아무 일도 없는데 화면이 계속 다시 그려진다.
 */
let revision = 0;
const touch = () => {
  revision += 1;
};

/* -------------------------------------------------------------------------- */
/* 상태                                                                        */
/* -------------------------------------------------------------------------- */

/** 에이전트 태스크 한 건 */
export type DemoTask = {
  taskId: string;
  /** 무엇을 하는 태스크인지. 되묻기 여부와 만드는 승인이 갈린다 */
  kind: 'code' | 'infra' | 'ship' | 'generic';
  status: string;
  /** 현재 국면이 시작된 시각. 국면이 바뀔 때마다 다시 찍는다 */
  phaseStartedAt: number;
  askedClarification: boolean;
  /** 이 태스크가 만든 승인들. 전부 결정돼야 다음 국면으로 간다 */
  approvalIds: number[];
  approvalsCreated: boolean;
  previewUrl: string | null;
  summary: string | null;
  events: AgentTaskEvent[];
  pendingEvents: { afterMs: number; type: string; message: string }[];
};

type DemoDeployment = {
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
  deployments: DemoDeployment[];
  domains: (Domain & { startedAt: number | null })[];
  servers: (ProvisionedServer & { startedAt: number | null; stage: string })[];
  databases: (ProvisionedDatabase & { startedAt: number | null })[];
  envVars: EnvironmentVariable[];
  cloudConnections: (CloudConnection & { startedAt: number | null })[];
  previewReady: boolean;
};

function seedCloudConnection(): DemoState['cloudConnections'][number] {
  /*
    연결은 이미 등록돼 있는 것으로 둔다.

    BYOC 등록은 액세스 키를 붙여넣는 설정 화면 작업이라 채팅 흐름을 끊는다. 90초
    안에 개발·인프라·배포·도메인을 보여주려면 그 자리는 접어야 한다 — 대신 마지막
    "직접 조작" 구간에서 이 연결이 어디에 있는지 화면으로 보여준다.
  */
  return {
    cloudConnectionId: 7,
    provider: 'AWS',
    displayName: '내 AWS 계정',
    accountId: '481019284412',
    region: DEMO.awsRegion,
    roleArn: null,
    awsCredentialType: 'ACCESS_KEY',
    accessKeyId: 'AKIA****************',
    secretAccessKeyConfigured: true,
    sessionTokenConfigured: false,
    gcpCredentialType: null,
    serviceAccountKeyConfigured: false,
    projectId: null,
    serviceAccountEmail: null,
    status: 'CONNECTED',
    lastCheckedAt: iso(-60000),
    createdAt: iso(-86400000),
    updatedAt: iso(-60000),
    startedAt: null,
  };
}

function freshState(): DemoState {
  return {
    seq: 100,
    projectCreated: false,
    repositoryBound: false,
    runtimeType: 'STATIC',
    cloudConnectionId: 7,
    tasks: new Map(),
    messages: [],
    approvals: [],
    deployments: [],
    domains: [],
    servers: [],
    databases: [],
    envVars: [],
    cloudConnections: [seedCloudConnection()],
    previewReady: false,
  };
}

/* -------------------------------------------------------------------------- */
/* 저장                                                                        */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'demo-scenario-state';

function restore(): DemoState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw) as Omit<DemoState, 'tasks'> & { tasks: [string, DemoTask][] };
    return { ...parsed, tasks: new Map(parsed.tasks) };
  } catch {
    return freshState();
  }
}

export function persistDemoState() {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, tasks: Array.from(state.tasks.entries()) }),
    );
  } catch {
    // 저장이 막혀도 이번 세션 안에서는 메모리로 계속 돈다
  }
}

export const state: DemoState = restore();

function nextId() {
  state.seq += 1;
  return state.seq;
}

/**
 * 시나리오를 처음으로 되돌린다. 자동 재생을 다시 돌릴 때 앞 회차가 남아 있으면
 * "이미 다 되어 있는" 화면에서 시작하게 된다.
 */
export function resetDemoState() {
  Object.assign(state, freshState());
  setBackendReady(false);
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // 지우지 못해도 위에서 메모리를 이미 비웠다
  }
  touch();
}

/* -------------------------------------------------------------------------- */
/* 메시지 · 승인                                                               */
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
  touch();
  return message;
}

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
  touch();
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
  touch();
  if (!approved) return approval;

  if (approval.type === 'REPOSITORY_BINDING') state.repositoryBound = true;

  if (approval.type === 'DEPLOYMENT') {
    const deployment =
      state.deployments.find((item) => item.approvalId === approvalId) ??
      state.deployments.find((item) => item.status === 'PENDING');
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
      server.stage = 'QUEUED';
      server.startedAt = now();
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

const EVENTS: Record<DemoTask['kind'], { afterMs: number; type: string; message: string }[]> = {
  code: [
    { afterMs: 200, type: 'STARTED', message: '요청을 분석하고 있습니다' },
    { afterMs: 900, type: 'PROGRESS', message: '실행 계획을 세웠습니다 — CODE → PREVIEW' },
  ],
  infra: [
    { afterMs: 200, type: 'STARTED', message: '요청을 분석하고 있습니다' },
    { afterMs: 700, type: 'PROGRESS', message: '실행 계획 — INFRA_OPERATE → RUNTIME_SETUP' },
    { afterMs: 1200, type: 'PROGRESS', message: '연결된 AWS 계정에서 만들 자원을 정했습니다' },
  ],
  ship: [
    { afterMs: 200, type: 'STARTED', message: '요청을 분석하고 있습니다' },
    { afterMs: 700, type: 'PROGRESS', message: '실행 계획 — DEPLOY → DOMAIN_BIND' },
  ],
  generic: [{ afterMs: 200, type: 'STARTED', message: '요청을 분석하고 있습니다' }],
};

const CODE_EVENTS_AFTER_ASK = [
  { afterMs: 300, type: 'PROGRESS', message: '프로젝트 구조를 만드는 중입니다' },
  { afterMs: 1100, type: 'PROGRESS', message: '회원가입·로그인 화면을 작성했습니다' },
  { afterMs: 1900, type: 'PROGRESS', message: '할 일 목록 화면을 작성했습니다' },
  { afterMs: 2600, type: 'PROGRESS', message: '의존성을 설치하고 빌드합니다' },
];

export function createTask(kind: DemoTask['kind']) {
  const taskId = `demo-task-${nextId()}`;
  const task: DemoTask = {
    taskId,
    kind,
    status: 'RUNNING',
    phaseStartedAt: now(),
    askedClarification: false,
    approvalIds: [],
    approvalsCreated: false,
    previewUrl: null,
    summary: null,
    events: [],
    pendingEvents: [...EVENTS[kind]],
  };
  state.tasks.set(taskId, task);
  touch();
  return task;
}

/** 되묻기에 답한 뒤 — 실제 빌드 국면으로 넘어간다 */
export function answerClarification(task: DemoTask) {
  task.askedClarification = true;
  task.status = 'RUNNING';
  task.phaseStartedAt = now();
  task.pendingEvents = [...CODE_EVENTS_AFTER_ASK];
  touch();
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

function allApprovalsDecided(task: DemoTask) {
  return task.approvalIds.every((id) => findApproval(id)?.status !== 'PENDING');
}

/** 이 태스크가 만든 자원이 전부 자리를 잡았는가 */
function taskResourcesReady(task: DemoTask) {
  if (task.kind === 'infra') {
    return (
      state.databases.some((item) => item.status === 'READY') &&
      state.servers.some((item) => item.status === 'RUNNING')
    );
  }
  if (task.kind === 'ship') {
    return (
      state.deployments.some((item) => item.status === 'SUCCESS') &&
      state.domains.some((item) => item.status === 'CONNECTED')
    );
  }
  return true;
}

function finishTask(task: DemoTask, summary: string) {
  task.status = 'DONE';
  task.summary = summary;
  pushEvent(task, 'COMPLETED', '작업을 마쳤습니다');
  addMessage('assistant', summary, task.taskId);
  touch();
}

function advanceTask(task: DemoTask) {
  while (
    task.pendingEvents.length > 0 &&
    elapsed(task.phaseStartedAt, task.pendingEvents[0].afterMs)
  ) {
    const next = task.pendingEvents.shift()!;
    pushEvent(task, next.type, next.message);
    touch();
  }

  if (task.status === 'WAITING_INPUT') return;

  // 승인을 기다리는 중 — 전부 결정되면 다음 국면으로
  if (task.status === 'WAITING_APPROVAL') {
    if (!allApprovalsDecided(task)) return;
    task.status = 'RUNNING';
    task.phaseStartedAt = now();
    if (task.kind === 'code') {
      task.pendingEvents = [
        { afterMs: 300, type: 'PROGRESS', message: '변경 사항을 적용했습니다' },
        { afterMs: 900, type: 'PROGRESS', message: '프리뷰 컨테이너를 띄웠습니다' },
      ];
    }
    touch();
    return;
  }

  if (task.status !== 'RUNNING') return;

  if (task.kind === 'code') {
    if (!task.askedClarification) {
      if (elapsed(task.phaseStartedAt, T.agentThink)) {
        task.status = 'WAITING_INPUT';
        pushEvent(task, 'WAITING_INPUT', '진행 방식을 확인하고 있습니다');
        touch();
      }
      return;
    }

    if (!task.approvalsCreated) {
      if (!elapsed(task.phaseStartedAt, T.agentBuild)) return;
      const approval = addApproval(
        'CHANGE',
        '회원가입·로그인 화면과 할 일 목록 화면을 추가합니다. 파일 14개 생성.',
        task.taskId,
      );
      task.approvalIds = [approval.approvalId];
      task.approvalsCreated = true;
      task.status = 'WAITING_APPROVAL';
      pushEvent(task, 'WAITING_APPROVAL', '변경 사항 승인을 기다립니다');
      touch();
      return;
    }

    if (elapsed(task.phaseStartedAt, T.agentFinish)) {
      task.previewUrl = demoPreviewUrl();
      state.previewReady = true;
      finishTask(task, '회원가입·로그인 화면과 할 일 목록을 만들었습니다. 프리뷰에서 확인해 보세요.');
    }
    return;
  }

  if (task.kind === 'infra') {
    if (!task.approvalsCreated) {
      if (!elapsed(task.phaseStartedAt, T.infraPlan)) return;
      createDatabase('RDS', 'POSTGRESQL');
      createServer('t3.micro');
      const dbApproval = addApproval(
        'DATABASE_PROVISION',
        'PostgreSQL 데이터베이스를 당신의 AWS 계정에 만듭니다. 켜져 있는 동안 과금됩니다.',
        task.taskId,
      );
      const serverApproval = addApproval(
        'SERVER_PROVISION',
        't3.micro 인스턴스를 당신의 AWS 계정에 만듭니다. 켜져 있는 동안 과금됩니다.',
        task.taskId,
      );
      task.approvalIds = [dbApproval.approvalId, serverApproval.approvalId];
      task.approvalsCreated = true;
      task.status = 'WAITING_APPROVAL';
      pushEvent(task, 'WAITING_APPROVAL', '과금 자원 승인을 기다립니다');
      touch();
      return;
    }

    if (taskResourcesReady(task)) {
      state.runtimeType = 'NODE_SERVER';
      ensureBackendEnvVars();
      setBackendReady(true);
      finishTask(
        task,
        `백엔드 서버와 데이터베이스를 마련했습니다. ${DEMO.ec2InstanceId} · ${DEMO.rdsHost.split('.')[0]}. 프리뷰에서 실제로 가입할 수 있습니다.`,
      );
    }
    return;
  }

  if (task.kind === 'ship') {
    if (!task.approvalsCreated) {
      if (!elapsed(task.phaseStartedAt, T.shipPlan)) return;
      createDeployment('AWS_EC2_FRONTEND', false);
      createDomain('managed_subdomain', DEMO.domainHostname, 'AWS');
      const deployApproval = addApproval(
        'DEPLOYMENT',
        '현재 버전을 당신의 AWS 계정으로 배포합니다.',
        task.taskId,
      );
      const domainApproval = addApproval(
        'DOMAIN_BINDING',
        `${DEMO.domainHostname} 을 이 프로젝트에 연결하고 HTTPS 인증서를 발급합니다.`,
        task.taskId,
      );
      task.approvalIds = [deployApproval.approvalId, domainApproval.approvalId];
      task.approvalsCreated = true;
      task.status = 'WAITING_APPROVAL';
      pushEvent(task, 'WAITING_APPROVAL', '배포·도메인 승인을 기다립니다');
      touch();
      return;
    }

    if (taskResourcesReady(task)) {
      state.repositoryBound = true;
      finishTask(task, `배포를 마쳤습니다. ${DEMO.domainUrl} 에서 열립니다.`);
    }
    return;
  }

  if (elapsed(task.phaseStartedAt, T.agentFinish)) {
    finishTask(task, '요청을 처리했습니다.');
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

export function ensureBackendEnvVars() {
  const seeds: [string, string | null, boolean][] = [
    ['DATABASE_URL', null, true],
    ['JWT_SECRET', null, true],
    ['NODE_ENV', 'production', false],
  ];
  for (const [key, value, secret] of seeds) {
    if (state.envVars.some((item) => item.key === key)) continue;
    state.envVars.push({
      environmentVariableId: nextId(),
      scope: 'PREVIEW',
      key,
      value,
      secret,
      createdAt: iso(),
      updatedAt: iso(),
    });
  }
  touch();
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
    expiresAt: method === 'LOCAL' ? iso(3600000) : null,
    errorCode: null,
    errorMessage: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: requiresApproval ? null : now(),
  };
  state.databases.push(database);
  touch();
  return database;
}

function advanceDatabase(database: DemoState['databases'][number]) {
  if (database.startedAt == null || database.status !== 'PROVISIONING') return;
  if (!elapsed(database.startedAt, T.dbProvision)) return;

  database.status = 'READY';
  database.host = database.method === 'RDS' ? DEMO.rdsHost : 'preview-db.internal';
  database.port = database.engine === 'MYSQL' ? 3306 : 5432;
  database.database = 'todo_app';
  database.username = 'qeploy';
  database.updatedAt = iso();
  database.startedAt = null;
  ensureBackendEnvVars();
  touch();
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
  touch();
  return server;
}

function advanceServer(server: DemoState['servers'][number]) {
  if (server.startedAt == null) return;

  if (server.stage === 'QUEUED' && elapsed(server.startedAt, T.serverQueued)) {
    server.stage = 'BUILDING';
    server.status = 'BUILDING';
    server.startedAt = now();
    server.updatedAt = iso();
    touch();
    return;
  }

  if (server.stage === 'BUILDING' && elapsed(server.startedAt, T.serverBuilding)) {
    server.stage = 'PROVISIONING';
    server.status = 'PROVISIONING';
    server.instanceId = DEMO.ec2InstanceId;
    server.startedAt = now();
    server.updatedAt = iso();
    touch();
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
    if (state.domains.some((item) => item.status === 'CONNECTED')) {
      server.domainUrl = DEMO.domainUrl;
    }
    touch();
  }
}

export function terminateServer(serverId: number) {
  const server = state.servers.find((item) => item.serverId === serverId);
  if (!server) return;
  server.status = 'TERMINATED';
  server.stage = 'TERMINATED';
  server.healthy = null;
  server.url = null;
  server.domainUrl = null;
  server.startedAt = null;
  server.updatedAt = iso();
  touch();
}

export function createDeployment(frontendHostingType: string, autoStart: boolean) {
  const deployment: DemoDeployment = {
    historyId: nextId(),
    deployTargetType: 'LATEST',
    frontendHostingType,
    versionLabel: `v${state.deployments.length + 1}`,
    deployedUrl: null,
    status: autoStart ? 'IN_PROGRESS' : 'PENDING',
    triggeredAt: iso(),
    updatedAt: iso(),
    startedAt: autoStart ? now() : null,
    approvalId: null,
  };
  state.deployments.unshift(deployment);
  touch();
  return deployment;
}

function advanceDeployment(deployment: DemoDeployment) {
  if (deployment.startedAt == null || deployment.status !== 'IN_PROGRESS') return;
  if (!elapsed(deployment.startedAt, T.deployRun)) return;

  deployment.status = 'SUCCESS';
  deployment.deployedUrl = deployment.frontendHostingType.startsWith('AWS')
    ? `http://${DEMO.ec2Host}`
    : DEMO.pagesUrl;
  deployment.updatedAt = iso();
  deployment.startedAt = null;
  touch();
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
  touch();
  return domain;
}

function advanceDomain(domain: DemoState['domains'][number]) {
  if (domain.startedAt == null || domain.status !== 'VERIFYING') return;
  if (!elapsed(domain.startedAt, T.domainVerify)) return;

  domain.status = 'CONNECTED';
  domain.certificateStatus = 'ACTIVE';
  domain.certificateExpiresAt = iso(7776000000);
  domain.lastCheckedAt = iso();
  domain.updatedAt = iso();
  domain.startedAt = null;

  const running = state.servers.find((item) => item.status === 'RUNNING');
  if (running) {
    domain.serverId = running.serverId;
    running.domainUrl = DEMO.domainUrl;
  }
  touch();
}

export function createCloudConnection(displayName: string, region: string, accessKeyId: string) {
  const connection = {
    ...seedCloudConnection(),
    cloudConnectionId: nextId(),
    displayName,
    region: region || DEMO.awsRegion,
    accessKeyId,
    status: 'VERIFYING',
    lastCheckedAt: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: now(),
  };
  state.cloudConnections.push(connection);
  touch();
  return connection;
}

function advanceCloudConnection(connection: DemoState['cloudConnections'][number]) {
  if (connection.startedAt == null) return;
  if (!elapsed(connection.startedAt, 1500)) return;

  connection.status = 'CONNECTED';
  connection.lastCheckedAt = iso();
  connection.updatedAt = iso();
  connection.startedAt = null;
  touch();
}

/* -------------------------------------------------------------------------- */
/* 진행                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * 마지막 호출 이후 지난 시간만큼 시나리오를 밀어 준다.
 * 바뀐 것이 있으면 true — 호출부는 그때만 화면 조회를 무효화한다.
 */
export function advanceDemoClock(): boolean {
  const before = revision;
  for (const task of state.tasks.values()) advanceTask(task);
  for (const deployment of state.deployments) advanceDeployment(deployment);
  for (const domain of state.domains) advanceDomain(domain);
  for (const server of state.servers) advanceServer(server);
  for (const database of state.databases) advanceDatabase(database);
  for (const connection of state.cloudConnections) advanceCloudConnection(connection);

  const changed = revision !== before;
  if (changed) persistDemoState();
  return changed;
}
