/**
 * 처음 쓰는 사람의 "시작하기" 단계.
 *
 * 무엇을 어떤 순서로 해야 하는지 화면 안에서 보이게 한다. 단계는 **실제로 있는 기능만**
 * 담고, 끝났는지는 사용자가 누른 체크가 아니라 **서버 데이터에서 계산한다** — 체크를
 * 손으로 하면 해 놓고도 안 한 것처럼, 안 해 놓고도 한 것처럼 보일 수 있다.
 *
 * 프로젝트에 매인 단계(첫 요청·저장소)는 가장 최근에 손댄 프로젝트를 기준으로 본다.
 * 프로젝트마다 따로 세면 목록이 길어지고, 처음 쓰는 사람에게는 프로젝트가 하나뿐이다.
 */

type GettingStartedStepId =
  | 'github'
  | 'ai-key'
  | 'project'
  | 'first-request'
  | 'repository'
  | 'cloud'
  | 'deploy';

type GettingStartedStep = {
  id: GettingStartedStepId;
  title: string;
  /** 왜 하는지, 어디서 하는지. 한 줄 */
  detail: string;
  done: boolean;
};

/** 계산에 쓰는 사실들. 아직 모르면(불러오는 중) undefined */
type GettingStartedFacts = {
  githubAppInstalled?: boolean;
  aiCredentialCount?: number;
  projectCount?: number;
  /** 가장 최근 프로젝트의 대화 수(지운 것 제외) */
  latestProjectConversationCount?: number;
  /** 가장 최근 프로젝트에 GitHub 저장소가 연결됐는지 */
  latestProjectRepositoryConnected?: boolean;
  /** 권한 검증까지 마친(CONNECTED) 클라우드 연결 수 */
  verifiedCloudConnectionCount?: number;
  /** 배포 주소가 있는 프로젝트 수 */
  deployedProjectCount?: number;
};

/*
  문구는 지금 제품이 하는 일만 적는다. 비용은 숫자를 적지 않는다 — 숫자는 연결 안내
  (처음 쓰는 사람용 안내)가 서버 기준으로 들고 있고, 두 곳에 적으면 한쪽만 낡는다.
*/
const STEP_COPY: Record<GettingStartedStepId, { title: string; detail: string }> = {
  github: {
    title: 'GitHub 연결하기',
    detail: '만든 코드를 내 GitHub 저장소에 남기려면 Qeploy 앱에 저장소 권한을 허용합니다.',
  },
  'ai-key': {
    title: 'AI API 키 등록하기',
    detail: '코딩 에이전트는 내 키로 실행되고, 사용량은 내 계정으로 청구됩니다.',
  },
  project: {
    title: '프로젝트 만들기',
    detail: '이름만 정하면 바로 대화를 시작할 수 있습니다.',
  },
  'first-request': {
    title: '첫 요청 보내기',
    detail: '만들고 싶은 것을 말로 적으면 에이전트가 계획을 세우고 승인을 받은 뒤 만듭니다.',
  },
  repository: {
    title: '결과 확인하고 저장소에 남기기',
    detail: '프리뷰에서 결과를 확인하고, 저장소 연결을 승인하면 코드가 GitHub에 남습니다.',
  },
  cloud: {
    title: 'AWS 계정 연결하기',
    detail:
      '백엔드 서버와 데이터베이스는 내 AWS 계정에 만들어집니다. 정적 사이트만이면 건너뛰어도 됩니다.',
  },
  deploy: {
    title: '배포하기',
    detail: '채팅으로 배포를 요청하고 승인하면 공개 주소가 생깁니다.',
  },
};

/*
  프로젝트를 키보다 먼저 둔다. 프로젝트는 키 없이도 만들 수 있고, 키는 첫 요청을 보낼 때
  필요하다 — 그때 대화가 그 자리에서 키 등록 시트를 연다. 키를 먼저 두면 프로젝트도 없는
  사람을 설정 화면으로 먼저 보내게 된다.
*/
const STEP_ORDER: GettingStartedStepId[] = [
  'github',
  'project',
  'ai-key',
  'first-request',
  'repository',
  'cloud',
  'deploy',
];

function isDone(id: GettingStartedStepId, facts: GettingStartedFacts): boolean {
  switch (id) {
    case 'github':
      return facts.githubAppInstalled === true;
    case 'ai-key':
      return (facts.aiCredentialCount ?? 0) > 0;
    case 'project':
      return (facts.projectCount ?? 0) > 0;
    case 'first-request':
      return (facts.latestProjectConversationCount ?? 0) > 0;
    case 'repository':
      return facts.latestProjectRepositoryConnected === true;
    case 'cloud':
      return (facts.verifiedCloudConnectionCount ?? 0) > 0;
    case 'deploy':
      return (facts.deployedProjectCount ?? 0) > 0;
  }
}

/** 단계마다 끝났는지와, 다음에 할 단계(아직 안 끝난 첫 단계) */
function computeGettingStarted(facts: GettingStartedFacts) {
  const steps: GettingStartedStep[] = STEP_ORDER.map((id) => ({
    id,
    ...STEP_COPY[id],
    done: isDone(id, facts),
  }));
  const doneCount = steps.filter((step) => step.done).length;
  const next = steps.find((step) => !step.done) ?? null;

  return { steps, doneCount, total: steps.length, next, allDone: next == null };
}

/*
  숨김 여부. 사람마다 다르게 두고 기기 사이에서는 따로다 — 서버에 둘 만큼의 상태가 아니다.
  같은 탭의 다른 자리(홈 카드 · 사이드바)가 함께 바뀌도록 이벤트로도 알린다.
*/
const HIDDEN_KEY = 'qeploy.getting-started-hidden';
const HIDDEN_EVENT = 'qeploy.getting-started-hidden-change';

function isGettingStartedHidden(): boolean {
  try {
    return localStorage.getItem(HIDDEN_KEY) === '1';
  } catch {
    return false;
  }
}

function setGettingStartedHidden(hidden: boolean): void {
  try {
    if (hidden) localStorage.setItem(HIDDEN_KEY, '1');
    else localStorage.removeItem(HIDDEN_KEY);
  } catch {
    // 저장이 막힌 브라우저면 이번 화면에서만 숨겨진다
  }
  window.dispatchEvent(new Event(HIDDEN_EVENT));
}

function subscribeGettingStartedHidden(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === HIDDEN_KEY) onChange();
  };
  window.addEventListener(HIDDEN_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(HIDDEN_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export {
  HIDDEN_KEY as GETTING_STARTED_HIDDEN_KEY,
  computeGettingStarted,
  isGettingStartedHidden,
  setGettingStartedHidden,
  subscribeGettingStartedHidden,
  type GettingStartedFacts,
  type GettingStartedStep,
  type GettingStartedStepId,
};
