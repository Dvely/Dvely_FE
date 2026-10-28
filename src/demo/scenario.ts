/**
 * 시연 시나리오의 상태와 시간 진행.
 *
 * 서버가 하는 일을 화면 안에서 대신한다 — 실제 백엔드처럼 "요청을 받고, 잠시 뒤 다음
 * 상태로 넘어간다". 타이머로 밀지 않고 **읽을 때마다 경과 시간으로 현재 상태를
 * 계산한다.** 화면이 이미 폴링하고 있으므로 그 폴링이 그대로 진행 표시가 된다.
 *
 * 순서는 실제 서버의 게이트를 그대로 따른다(BE FRONTEND_API_GUIDE §3.5). 실행 전에
 * 계획 승인을 받고, 코드를 만든 뒤에는 저장소가 없으니 저장소 연결 승인을 받는다.
 * 과금 자원(DB·서버)은 정책으로 끌 수 없어서 항상 따로 묻는다. 시간을 줄이려고 이
 * 순서를 바꾸면 화면이 제품에 없는 흐름을 보여주게 된다.
 *
 * 상태는 sessionStorage 에 남긴다. 예전에는 메모리에만 뒀는데, 새로고침 한 번에
 * 대화 이력과 프리뷰가 통째로 사라져서 시연 뒤에 화면을 둘러볼 수가 없었다.
 */
import { demoMs } from '@/demo/config';
import type { Approval } from '@/types/approval.type';
import type { AgentTaskEvent, AnsweredClarification, TaskClarification } from '@/types/agent.type';
import type { AiCredential } from '@/types/aiCredential.type';
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
  s3WebsiteUrl: 'http://qeploy-todo-together.s3-website.ap-northeast-2.amazonaws.com',
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
 * 회원가입이 실패하는 화면과 성공하는 화면이 갈린다 — 런타임을 서버형으로 바꾸기
 * 전과 후를 말이 아니라 동작으로 보여주는 유일한 방법이다.
 */
const BACKEND_READY_KEY = 'demo-backend-ready';

/** 프리뷰 앱이 쓰는 저장소. 본편 시작 때 비운다 */
const PREVIEW_KEYS = ['demo-app-users', 'demo-app-session', 'demo-app-todos'];

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
  agentThink: 1400,
  agentPlan: 700,
  agentBuild: 2800,
  agentFinish: 900,
  infraPlan: 1300,
  runtimeSetup: 1300,
  shipPlan: 1200,
  deployRun: 3000,
  dbProvision: 4000,
  serverQueued: 800,
  serverBuilding: 3000,
  serverProvisioning: 3000,
  domainVerify: 2500,
  cloudVerify: 1500,
} as const;

const now = () => Date.now();

/**
 * 서버가 보내는 모양의 시각 — 오프셋 없는 벽시계 시각(`2026-10-28T22:06:12`).
 *
 * `toISOString()` 은 UTC 라 화면이 그 문자열에서 시:분을 그대로 읽으면(AgentTaskTimeline)
 * 서울 기준 아홉 시간 앞선 시각이 찍힌다.
 */
export function iso(offsetMs = 0) {
  const date = new Date(now() + offsetMs);
  const pad = (value: number) => String(value).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

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

type PendingEvent = {
  afterMs: number;
  type: string;
  message: string;
  step?: { index: number; total: number; agentType: string };
};

/**
 * 태스크가 지금 어디에 서 있는지.
 *
 * status 하나로는 부족하다 — 같은 WAITING_APPROVAL 이라도 실행 전 계획 승인인지,
 * 과금 자원 승인인지에 따라 결정 뒤에 갈 곳이 다르다. 서버가 plan 의 몇 번째 step 에
 * 있는지 아는 것과 같은 자리다.
 */
type TaskStage =
  | 'think'
  | 'ask'
  | 'plan'
  | 'planApproval'
  | 'build'
  | 'repoApproval'
  | 'finish'
  | 'needCloud'
  | 'runtime'
  | 'backendDeploy'
  | 'deploy'
  | 'done';

/** 에이전트 태스크 한 건 */
export type DemoTask = {
  taskId: string;
  /** 무엇을 하는 태스크인지. 되묻기 여부와 만드는 승인이 갈린다 */
  kind: 'code' | 'infra' | 'ship' | 'generic';
  status: string;
  stage: TaskStage;
  /** 현재 국면이 시작된 시각. 국면이 바뀔 때마다 다시 찍는다 */
  phaseStartedAt: number;
  /** 이 태스크가 지금 기다리는 승인들. 전부 결정돼야 다음 국면으로 간다 */
  approvalIds: number[];
  previewCreated: boolean;
  summary: string | null;
  /** 답이 끝난 되묻기. 폼이 사라진 자리에 "이렇게 정했습니다" 로 남는다 */
  answered: AnsweredClarification | null;
  events: AgentTaskEvent[];
  pendingEvents: PendingEvent[];
};

type DemoDeployment = {
  historyId: number;
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
  /** 본인 AI 키. 서버 키가 없으므로 이게 비어 있으면 에이전트를 부를 수 없다 */
  aiCredentials: AiCredential[];
  previewReady: boolean;
  /** GitHub App 설치 여부. 로그인 직후에는 아직 안 되어 있다 */
  githubAppInstalled: boolean;
};

/** 등록 폼이 만들어 낼 연결의 틀 */
function blankCloudConnection(): DemoState['cloudConnections'][number] {
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
    aiCredentials: [],
    previewReady: false,
    githubAppInstalled: false,
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
    return { ...freshState(), ...parsed, tasks: new Map(parsed.tasks) };
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
    for (const key of PREVIEW_KEYS) localStorage.removeItem(key);
  } catch {
    // 지우지 못하면 프리뷰가 이미 가입된 상태로 열린다 — 흐름은 이어진다
  }
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

/**
 * 대화에 한 줄 남긴다.
 *
 * `kind` 는 서버가 이 줄을 왜 남겼는지다(BE #310). 화면은 이 값으로 줄의 무게를
 * 정하고, 되묻기 답 줄은 "이렇게 정했습니다" 카드가 떠 있는 동안 접는다.
 */
export function addMessage(
  role: 'user' | 'assistant',
  content: string,
  taskId: string | null,
  kind: string | null = null,
) {
  const message: ConversationMessage = {
    messageId: nextId(),
    conversationId: DEMO.conversationId,
    role,
    content,
    tokenCount: role === 'user' ? 0 : Math.round(content.length / 2),
    createdAt: iso(),
    taskId,
    kind,
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

/** 처음 받는 이벤트. 무엇을 할지 정하기 전이라 종류와 상관없이 같다 */
const OPENING_EVENTS: PendingEvent[] = [
  { afterMs: 150, type: 'QUEUED', message: '요청을 받았습니다' },
  { afterMs: 400, type: 'STARTED', message: '요청을 분석하고 있습니다' },
];

const CODE_BUILD_EVENTS: PendingEvent[] = [
  {
    afterMs: 200,
    type: 'STEP_STARTED',
    message: '프로젝트 구조를 만들고 있습니다',
    step: { index: 1, total: 1, agentType: 'CODE' },
  },
  { afterMs: 900, type: 'PROGRESS', message: '회원가입·로그인 화면을 작성했습니다' },
  { afterMs: 1600, type: 'PROGRESS', message: '할 일 목록 화면을 작성했습니다' },
  { afterMs: 2200, type: 'PROGRESS', message: '의존성을 설치하고 빌드합니다' },
];

const RUNTIME_EVENTS: PendingEvent[] = [
  {
    afterMs: 200,
    type: 'STEP_STARTED',
    message: '프리뷰를 Node 서버 런타임으로 바꿉니다',
    step: { index: 1, total: 2, agentType: 'RUNTIME_SETUP' },
  },
  { afterMs: 600, type: 'PROGRESS', message: '프리뷰용 PostgreSQL 을 붙였습니다' },
  {
    afterMs: 1100,
    type: 'STEP_COMPLETED',
    message: '프리뷰가 서버로 다시 떴습니다',
    step: { index: 1, total: 2, agentType: 'RUNTIME_SETUP' },
  },
];

const SHIP_EVENTS: PendingEvent[] = [
  {
    afterMs: 200,
    type: 'STEP_STARTED',
    message: 'S3 에 올릴 빌드를 만들고 있습니다',
    step: { index: 1, total: 2, agentType: 'DEPLOY' },
  },
  {
    afterMs: 1500,
    type: 'STEP_STARTED',
    message: `${DEMO.domainHostname} 인증서를 발급하고 있습니다`,
    step: { index: 2, total: 2, agentType: 'DOMAIN_BIND' },
  },
];

export function createTask(kind: DemoTask['kind']) {
  const taskId = `demo-task-${nextId()}`;
  const task: DemoTask = {
    taskId,
    kind,
    status: 'RUNNING',
    stage: kind === 'code' ? 'think' : 'plan',
    phaseStartedAt: now(),
    approvalIds: [],
    previewCreated: false,
    summary: null,
    answered: null,
    events: [],
    pendingEvents: [...OPENING_EVENTS],
  };
  state.tasks.set(taskId, task);
  touch();
  return task;
}

/** 이 태스크가 지금 사용자에게 묻고 있는 것 */
export function clarificationFor(task: DemoTask): TaskClarification | null {
  if (task.status !== 'WAITING_INPUT') return null;

  /*
    인프라는 답을 받을 수 있는 질문이 아니다 — 자격 증명은 다른 화면에서 사용자만
    넣을 수 있으므로, 입력창 대신 안내를 펴라는 신호(CONNECT_CLOUD)를 보낸다.
  */
  if (task.kind === 'infra') {
    return {
      question: '연결된 클라우드 계정이 없습니다. AWS 계정을 연결한 뒤 다시 시도해 주세요.',
      inputType: 'TEXT',
      options: [],
      allowOther: false,
      actionType: 'CONNECT_CLOUD',
    };
  }
  return CODE_CLARIFICATION;
}

const CODE_CLARIFICATION: TaskClarification = {
  question: '어떤 화면 구성으로 만들까요?',
  inputType: 'SINGLE_SELECT',
  options: [
    { value: 'minimal', label: '깔끔한 단일 페이지', recommended: true },
    { value: 'dashboard', label: '사이드바가 있는 대시보드', recommended: false },
  ],
  allowOther: true,
  actionType: null,
};

/** 되묻기에 답한 뒤 — 다음 국면으로 넘어간다 */
export function answerClarification(task: DemoTask, value: string) {
  if (task.status !== 'WAITING_INPUT') return;

  task.status = 'RUNNING';
  task.phaseStartedAt = now();

  // 인프라는 "연결하고 왔다" 는 재시도 신호다. 연결이 아직이면 다시 멈추고, 있으면 바로 잇는다
  if (task.kind === 'infra') {
    pushEvent(task, 'INPUT_RECEIVED', '클라우드 연결을 확인했습니다');
    if (state.cloudConnectionId == null) {
      task.stage = 'plan';
    } else {
      task.stage = 'runtime';
      task.pendingEvents = [...RUNTIME_EVENTS];
    }
    touch();
    return;
  }

  const chosen = CODE_CLARIFICATION.options.find((option) => option.value === value);
  const answer = chosen?.label ?? value;
  task.answered = {
    question: CODE_CLARIFICATION.question,
    inputType: CODE_CLARIFICATION.inputType,
    options: CODE_CLARIFICATION.options,
    allowOther: CODE_CLARIFICATION.allowOther,
    answer,
  };
  task.stage = 'plan';
  pushEvent(task, 'INPUT_RECEIVED', `답을 받았습니다 — ${answer}`);
  addMessage('user', answer, task.taskId, 'CLARIFICATION_ANSWER');
  touch();
}

function pushEvent(task: DemoTask, type: string, message: string, step?: PendingEvent['step']) {
  task.events.push({
    eventId: task.events.length + 1,
    taskId: task.taskId,
    type,
    status: task.status,
    message,
    stepIndex: step?.index ?? null,
    stepTotal: step?.total ?? null,
    agentType: step?.agentType ?? null,
    createdAt: iso(),
  });
}

function allApprovalsDecided(task: DemoTask) {
  return task.approvalIds.every((id) => findApproval(id)?.status !== 'PENDING');
}

/** 국면을 옮긴다. 시간은 새 국면 기준으로 다시 잰다 */
function enter(task: DemoTask, stage: TaskStage, status = 'RUNNING') {
  task.stage = stage;
  task.status = status;
  task.phaseStartedAt = now();
  touch();
}

function waitForApprovals(task: DemoTask, stage: TaskStage, status: string, approvals: Approval[]) {
  task.approvalIds = approvals.map((approval) => approval.approvalId);
  enter(task, stage, status);
}

function finishTask(task: DemoTask, summary: string) {
  task.status = 'DONE';
  task.stage = 'done';
  task.summary = summary;
  pushEvent(task, 'COMPLETED', '작업을 마쳤습니다');
  addMessage('assistant', summary, task.taskId, 'AGENT_RESULT');
  touch();
}

function advanceCodeTask(task: DemoTask) {
  switch (task.stage) {
    case 'think':
      if (!elapsed(task.phaseStartedAt, T.agentThink)) return;
      // 무엇을 만들지 정하기 전에 모르는 것을 먼저 되묻는다
      enter(task, 'ask', 'WAITING_INPUT');
      pushEvent(task, 'WAITING_INPUT', '화면 구성을 확인하고 있습니다');
      return;

    case 'plan': {
      if (!elapsed(task.phaseStartedAt, T.agentPlan)) return;
      /*
        실행 전 계획 승인. 프로젝트를 만들면 승인 정책 다섯 개가 모두 켜져 있으므로
        (BE §3.5①) 첫 코드 작업은 여기서 한 번 멈춘다.
      */
      const approval = addApproval(
        'CHANGE',
        '회원가입·로그인 화면과 할 일 목록 화면을 새로 만듭니다. 내 할 일만 보이도록 로그인한 사용자 기준으로 거릅니다.',
        task.taskId,
      );
      waitForApprovals(task, 'planApproval', 'WAITING_APPROVAL', [approval]);
      pushEvent(task, 'WAITING_APPROVAL', '실행 계획 승인을 기다립니다');
      return;
    }

    case 'planApproval':
      if (!allApprovalsDecided(task)) return;
      enter(task, 'build');
      task.pendingEvents = [...CODE_BUILD_EVENTS];
      return;

    case 'build': {
      if (!elapsed(task.phaseStartedAt, T.agentBuild)) return;
      task.previewCreated = true;
      state.previewReady = true;
      pushEvent(task, 'STEP_COMPLETED', '프리뷰를 띄웠습니다', {
        index: 1,
        total: 1,
        agentType: 'CODE',
      });
      /*
        저장소가 아직 없다. 프리뷰 컨테이너는 시간이 지나면 지워지므로, 작업물을 남길
        저장소를 만들지 묻는다(BE §3.5③). 정책으로 끌 수 없는 유일한 게이트다.
      */
      const approval = addApproval(
        'REPOSITORY_BINDING',
        `[저장소 연결] ${DEMO.repositoryName}`,
        task.taskId,
        {
          field: 'repositoryName',
          defaultValue: DEMO.repositoryName,
          required: false,
          pattern: '^[a-z0-9-]+$',
          maxLength: 100,
        },
      );
      waitForApprovals(task, 'repoApproval', 'WAITING_RESULT_APPROVAL', [approval]);
      pushEvent(task, 'WAITING_RESULT_APPROVAL', '저장소 연결 승인을 기다립니다');
      return;
    }

    case 'repoApproval':
      if (!allApprovalsDecided(task)) return;
      enter(task, 'finish');
      pushEvent(task, 'RESULT_APPROVED', `${DEMO.repositoryFullName} 저장소에 올렸습니다`);
      return;

    case 'finish':
      if (!elapsed(task.phaseStartedAt, T.agentFinish)) return;
      finishTask(
        task,
        '회원가입·로그인 화면과 할 일 목록을 만들었습니다. 오른쪽 프리뷰에서 바로 써 볼 수 있습니다.',
      );
      return;

    default:
  }
}

function advanceInfraTask(task: DemoTask) {
  switch (task.stage) {
    case 'plan':
      if (!elapsed(task.phaseStartedAt, T.infraPlan)) return;
      /*
        연결된 클라우드 계정이 없으면 여기서 멈춘다.

        에이전트가 대신 만들 수 있는 것이 아니다 — 자격 증명은 사용자만 넣을 수 있고,
        그 화면은 다른 곳에 있다. 그래서 답을 받는 되묻기가 아니라 "가서 연결하고
        오라" 는 신호(CONNECT_CLOUD)를 보내고 화면이 안내를 편다.
      */
      if (state.cloudConnectionId == null) {
        enter(task, 'needCloud', 'WAITING_INPUT');
        pushEvent(task, 'WAITING_INPUT', '연결된 클라우드 계정이 없습니다');
        return;
      }
      enter(task, 'runtime');
      task.pendingEvents = [...RUNTIME_EVENTS];
      return;

    case 'runtime':
      if (!elapsed(task.phaseStartedAt, T.runtimeSetup)) return;
      /*
        프리뷰를 서버형으로 다시 띄운다. 프리뷰용 DB 는 서버가 알아서 붙인다
        (PREVIEW_AUTO). 회원가입이 실제로 되기 시작하는 것은 이 순간부터다 —
        아래 운영 자원 승인과는 별개다.
      */
      state.runtimeType = 'NODE_SERVER';
      createDatabase('DOCKER', 'POSTGRESQL', 'PREVIEW_AUTO');
      ensureBackendEnvVars();
      setBackendReady(true);
      enter(task, 'backendDeploy');
      pushEvent(task, 'STEP_STARTED', '운영용 DB 와 서버를 내 AWS 계정에 요청합니다', {
        index: 2,
        total: 2,
        agentType: 'BACKEND_DEPLOY',
      });
      return;

    case 'backendDeploy': {
      if (!elapsed(task.phaseStartedAt, T.agentFinish)) return;
      /*
        과금 자원은 직접 만들지 않고 승인을 만든다(BE §19). 승인 카드는 이 대화에
        뜨고, 태스크는 요청까지만 하고 끝난다 — 만드는 것은 승인 뒤 워커다.
      */
      createDatabase('RDS', 'POSTGRESQL');
      createServer('t3.micro');
      addApproval(
        'DATABASE_PROVISION',
        'RDS PostgreSQL (db.t4g.micro) 을 ap-northeast-2 에 만듭니다.',
        null,
      );
      addApproval(
        'SERVER_PROVISION',
        'EC2 t3.micro 백엔드 서버를 ap-northeast-2 에 만듭니다.',
        null,
      );
      finishTask(
        task,
        '프리뷰를 Node 서버로 다시 띄웠습니다. 이제 프리뷰에서 실제로 가입됩니다. 운영용 DB 와 백엔드 서버는 아래에서 승인하면 내 AWS 계정에 만들어집니다.',
      );
      return;
    }

    default:
  }
}

function advanceShipTask(task: DemoTask) {
  switch (task.stage) {
    case 'plan': {
      if (!elapsed(task.phaseStartedAt, T.shipPlan)) return;
      const deployment = createDeployment('S3', false);
      createDomain('managed_subdomain', DEMO.domainHostname, 'AWS_S3_FRONTEND');
      const deployApproval = addApproval(
        'DEPLOYMENT',
        '최신 버전을 내 AWS 계정의 S3 정적 호스팅으로 배포합니다.',
        task.taskId,
      );
      deployment.approvalId = deployApproval.approvalId;
      const domainApproval = addApproval(
        'DOMAIN_BINDING',
        `${DEMO.domainHostname} 을 이 프로젝트에 연결하고 HTTPS 인증서를 발급합니다.`,
        task.taskId,
      );
      waitForApprovals(task, 'planApproval', 'WAITING_APPROVAL', [deployApproval, domainApproval]);
      pushEvent(task, 'WAITING_APPROVAL', '배포·도메인 승인을 기다립니다');
      return;
    }

    case 'planApproval':
      if (!allApprovalsDecided(task)) return;
      enter(task, 'deploy');
      task.pendingEvents = [...SHIP_EVENTS];
      return;

    case 'deploy': {
      const deployed = state.deployments.some((item) => item.status === 'SUCCESS');
      const bound = state.domains.some((item) => item.status === 'CONNECTED');
      if (!deployed || !bound) return;
      finishTask(task, `배포를 마쳤습니다. ${DEMO.domainUrl} 에서 열립니다.`);
      return;
    }

    default:
  }
}

function advanceTask(task: DemoTask) {
  while (
    task.pendingEvents.length > 0 &&
    elapsed(task.phaseStartedAt, task.pendingEvents[0].afterMs)
  ) {
    const next = task.pendingEvents.shift()!;
    pushEvent(task, next.type, next.message, next.step);
    touch();
  }

  if (task.status === 'DONE' || task.status === 'CANCELLED' || task.status === 'FAILED') return;

  if (task.kind === 'code') advanceCodeTask(task);
  else if (task.kind === 'infra') advanceInfraTask(task);
  else if (task.kind === 'ship') advanceShipTask(task);
  else if (elapsed(task.phaseStartedAt, T.agentFinish)) finishTask(task, '요청을 처리했습니다.');
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

export function cancelTask(taskId: string) {
  const task = getTask(taskId);
  if (!task || task.status === 'DONE') return;
  task.status = 'CANCELLED';
  task.stage = 'done';
  task.pendingEvents = [];
  pushEvent(task, 'CANCELLED', '작업을 중단했습니다');
  touch();
}

/* -------------------------------------------------------------------------- */
/* 본인 AI 키                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * 키를 등록한다. 등록과 교체가 같은 호출이다(벤더당 하나).
 *
 * 서버는 키를 돌려주지 않고 앞 몇 글자만 남긴 값을 준다. 시연도 받은 키를 어디에도
 * 남기지 않는다 — 가린 값만 만든다.
 */
export function putAiCredential(provider: string, apiKey: string, label: string | null) {
  const masked = `${apiKey.slice(0, 6)}${'•'.repeat(8)}`;
  const existing = state.aiCredentials.find((item) => item.provider === provider);
  if (existing) {
    existing.maskedApiKey = masked;
    existing.label = label;
    existing.updatedAt = iso();
    touch();
    return existing;
  }
  const credential: AiCredential = {
    aiProviderCredentialId: nextId(),
    provider,
    maskedApiKey: masked,
    label,
    createdAt: iso(),
    updatedAt: iso(),
  };
  state.aiCredentials.push(credential);
  touch();
  return credential;
}

export function deleteAiCredential(provider: string) {
  state.aiCredentials = state.aiCredentials.filter((item) => item.provider !== provider);
  touch();
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

export function createDatabase(method: string, engine: string, origin = 'MANUAL') {
  // 과금 자원(RDS·DOCKER)은 승인 뒤에 만든다. 프리뷰가 스스로 마련한 것은 묻지 않는다
  const requiresApproval = method !== 'LOCAL' && origin !== 'PREVIEW_AUTO';
  const database = {
    databaseId: nextId(),
    projectId: DEMO.projectId,
    method: method as ProvisionedDatabase['method'],
    engine: engine as ProvisionedDatabase['engine'],
    status: requiresApproval ? 'PENDING' : 'READY',
    origin,
    host: requiresApproval ? null : 'preview-db.internal',
    port: requiresApproval ? null : engine === 'MYSQL' ? 3306 : 5432,
    database: requiresApproval ? null : 'todo_app',
    username: requiresApproval ? null : 'qeploy',
    expiresAt: method === 'LOCAL' ? iso(3600000) : null,
    errorCode: null,
    errorMessage: null,
    createdAt: iso(),
    updatedAt: iso(),
    startedAt: null,
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
  deployment.deployedUrl = deployment.frontendHostingType === 'S3' ? DEMO.s3WebsiteUrl : null;
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
  touch();
}

export function createCloudConnection(
  displayName: string,
  region: string,
  accessKeyId: string,
  accountId: string | null,
) {
  const connection = {
    ...blankCloudConnection(),
    cloudConnectionId: nextId(),
    displayName,
    region: region || DEMO.awsRegion,
    accountId: accountId || blankCloudConnection().accountId,
    // 서버도 앞 네 글자만 남기고 가린다. 받은 키를 그대로 들고 있지 않는다
    accessKeyId: `${accessKeyId.slice(0, 4)}${'*'.repeat(16)}`,
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
  if (!elapsed(connection.startedAt, T.cloudVerify)) return;

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

/** GitHub App 설치를 마쳤다고 표시한다 */
export function markGithubAppInstalled() {
  state.githubAppInstalled = true;
  persistDemoState();
  touch();
}
