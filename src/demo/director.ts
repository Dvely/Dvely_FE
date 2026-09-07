/**
 * 시연 자동 재생.
 *
 * 버튼 하나로 전체 흐름을 끝까지 돌린다. 손으로 누르면 매번 타이밍이 달라지고 한 번
 * 삐끗하면 처음부터 다시 찍어야 하는데, 90초짜리 영상에서는 그 차이가 크다.
 *
 * 상태를 몰래 바꾸지 않는다 — 화면의 컨트롤을 실제로 찾아 누른다(dom.ts 참고).
 * 그래서 자동 재생으로 찍은 화면과 사람이 조작한 화면이 다르지 않다.
 */
import { router } from '@/router';
import { resetDemoState } from '@/demo/scenario';
import { clearAppLocalStorage } from '@/lib/clearAppStorage';
import { click, fill, find, findAll, pageHasText, pause, select, type, waitUntil } from '@/demo/dom';

export type Scene = {
  /** HUD 에 뜨는 이름. 편집할 때 구간을 찾는 표지이기도 하다 */
  title: string;
  run: () => Promise<void>;
};

const PROMPT_APP =
  '회원가입과 로그인이 되는 할 일 관리 웹앱을 만들어줘. 로그인하면 내 할 일 목록만 보이게 해줘.';
const PROMPT_BACKEND =
  '지금은 화면만 있고 회원가입이 실제로 되지 않아. 백엔드 API랑 데이터베이스를 붙여서 진짜로 가입되게 해줘.';

/** 라우터로 옮긴다. 시연 경로는 고정이라 문자열로 넘긴다 */
async function goto(path: string) {
  await router.navigate({ to: path } as Parameters<typeof router.navigate>[0]);
  await pause(700);
}

/** 읽을 시간. 승인 문구처럼 사람이 읽어야 하는 자리에 둔다 */
function read(ms = 1400) {
  return pause(ms);
}

/** 지금 떠 있는 승인을 전부 결정한다. 하나 누르면 다음 것이 올라온다 */
async function approveAll(expected: number) {
  for (let index = 0; index < expected; index += 1) {
    await waitUntil('승인 카드 등장', () => findAll('approve').length > 0);
    await read(1600);
    await click('approve');
    await pause(900);
  }
}

export const scenes: Scene[] = [
  {
    title: 'GitHub 하나로 시작',
    run: async () => {
      await goto('/');
      await read(1200);
      await click('login');
      await waitUntil('홈 진입', () => window.location.pathname.startsWith('/home'), 20000);
      await read();
    },
  },
  {
    title: '프로젝트를 하나 만든다',
    run: async () => {
      /*
        홈의 프롬프트는 붙일 프로젝트가 있어야 보낸다(없으면 "먼저 프로젝트를
        생성해 주세요"에서 멈춘다). 실제 제품 흐름이 그렇고, 시연도 그 순서를 따른다.
      */
      await goto('/project');
      await read(900);
      await click('project-new');
      await type('project-name', '할 일 관리 앱', 34);
      await read(700);
      await click('project-create');
      await waitUntil('프로젝트 생성됨', () => pageHasText('할 일 관리 앱'), 20000);
      await read(1200);
      await goto('/home');
    },
  },
  {
    title: '말 한 줄로 앱을 만든다',
    run: async () => {
      await type('home-prompt', PROMPT_APP, 24);
      await read(600);
      await click('home-send');
      await waitUntil('채팅 진입', () => find('chat-input') != null, 20000);
    },
  },
  {
    title: '에이전트가 되묻는다',
    run: async () => {
      await waitUntil('되묻기 등장', () => findAll('clarify-option').length > 0, 25000);
      await read(1600);
      const first = findAll<HTMLInputElement>('clarify-option')[0];
      first.click();
      await pause(500);
      await click('clarify-submit');
    },
  },
  {
    title: '변경 사항을 승인한다',
    run: async () => {
      await approveAll(1);
      await waitUntil('프리뷰 등장', () => document.querySelector('iframe') != null, 30000);
      await read(2600);
    },
  },
  {
    title: '내 GitHub에 남긴다',
    run: async () => {
      await goto('/project/1/agent');
      await click('repo-picker');
      await click('repo-tab-create');
      await type('repo-name', 'todo-together', 30);
      await read(700);
      await click('repo-create');
      await goto('/project/1/approvals');
      await approveAll(1);
      await goto('/project/1');
      await waitUntil('커밋 표시됨', () => pageHasText('feat:'), 25000);
      await read(2000);
    },
  },
  {
    title: '무료로 먼저 공개한다',
    run: async () => {
      await goto('/project/1/deployments');
      await select('deploy-hosting', 'GITHUB_PAGES');
      await read(900);
      await click('deploy-submit');
      await waitUntil('배포 완료', () => pageHasText('SUCCESS'), 30000);
      await read(1800);
    },
  },
  {
    title: '내 AWS 계정을 연결한다',
    run: async () => {
      // 연결이 없어 막히는 화면을 먼저 보여준다 — 왜 설정으로 가는지가 이 장면에 있다
      await goto('/project/1/infra');
      await read(1800);

      await goto('/settings');
      // 설정은 한 화면이 아니다 — 왼쪽에서 클라우드 연결 항목을 골라야 폼이 나온다
      await click('settings-cloud-browser');
      await waitUntil('클라우드 연결 폼', () => find('cloud-name') != null, 20000);
      await type('cloud-name', '내 AWS 계정', 30);
      await fill('cloud-region', 'ap-northeast-2');
      await fill('cloud-key', 'AKIAIOSFODNN7EXAMPLE');
      await fill('cloud-secret', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
      await read(800);
      await click('cloud-create');
      await waitUntil('연결 확인됨', () => pageHasText('CONNECTED'), 25000);
      await read(1200);

      await goto('/project/1/infra');
      await click('cloud-select');
      await waitUntil('선택됨', () => pageHasText('선택됨'), 20000);
      await read(1400);
    },
  },
  {
    title: '목업을 진짜 앱으로',
    run: async () => {
      await goto('/project/1/agent');
      await type('chat-input', PROMPT_BACKEND, 22);
      await read(500);
      await click('chat-send');
      await approveAll(1);
      await read(2200);
    },
  },
  {
    title: '내 계정에 데이터베이스를 만든다',
    run: async () => {
      await goto('/project/1/infra');
      await select('db-method', 'RDS');
      await read(1200);
      await click('db-create');
      await goto('/project/1/approvals');
      await approveAll(1);
      await goto('/project/1/infra');
      await waitUntil('DB 준비됨', () => pageHasText('사용 가능'), 40000);
      await read(1600);
    },
  },
  {
    title: '런타임을 서버형으로 바꾼다',
    run: async () => {
      /*
        런타임을 바꾸는 것은 DB 를 만든 다음이다.

        서버형으로 두면 프리뷰가 DB 를 알아서 마련하므로 화면이 수동 생성 폼을 감춘다.
        먼저 바꿔 버리면 RDS 를 고를 자리가 사라진다.
      */
      await goto('/project/1/infra');
      await select('runtime-type', 'NODE_SERVER');
      await read(1600);
      await click('runtime-save');
      await read(1400);
    },
  },
  {
    title: '과금되는 것은 사람이 누른다',
    run: async () => {
      await select('server-tier', 't3.micro');
      await read(1200);
      await click('server-create');
      await goto('/project/1/approvals');
      await approveAll(1);
      await goto('/project/1/infra');
      await waitUntil('서버 실행 중', () => pageHasText('실행 중'), 45000);
      await read(2400);
    },
  },
  {
    title: '주소를 붙인다',
    run: async () => {
      await goto('/project/1/domains');
      await select('domain-target', 'AWS');
      await select('domain-type', 'managed_subdomain');
      await type('domain-label', 'todo-together', 30);
      await read(700);
      await click('domain-submit');
      await goto('/project/1/approvals');
      await approveAll(1);
      await goto('/project/1/domains');
      await waitUntil('도메인 확정', () => pageHasText('연결됨'), 40000);
      await read(2200);
    },
  },
  {
    title: '말 한 줄에서 여기까지',
    run: async () => {
      await goto('/project/1');
      await read(4000);
    },
  },
];

type Listener = (snapshot: DirectorSnapshot) => void;

export type DirectorSnapshot = {
  running: boolean;
  index: number;
  total: number;
  title: string;
  error: string | null;
};

/** 새로고침을 건너 자동 재생을 이어받게 하는 표식 */
const AUTORUN_KEY = 'demo-autorun';

let running = false;
let stopRequested = false;
let index = 0;
let error: string | null = null;
const listeners = new Set<Listener>();

function snapshot(): DirectorSnapshot {
  return {
    running,
    index,
    total: scenes.length,
    title: scenes[index]?.title ?? '',
    error,
  };
}

function emit() {
  const current = snapshot();
  for (const listener of listeners) listener(current);
}

export function subscribeDirector(listener: Listener) {
  listeners.add(listener);
  listener(snapshot());
  return () => {
    listeners.delete(listener);
  };
}

export function stopDirector() {
  stopRequested = true;
}

/**
 * 자동 재생을 시작한다 — 새로고침을 한 번 끼운다.
 *
 * 토큰만 지우고 그 자리에서 시작하면 화면은 아직 로그인된 상태를 들고 있다. 그러면
 * 랜딩의 버튼이 로그인 대신 워크스페이스 이동으로 동작하고, 이동한 곳에서는 토큰이
 * 없어 다시 랜딩으로 되돌려진다 — 첫 장면에서 무한히 제자리다.
 *
 * 새로고침이 그 전부를 한 번에 지운다. 시나리오 상태도 모듈째로 초기화되므로 몇
 * 번을 다시 찍어도 늘 같은 자리에서 시작한다.
 */
export function startDirector() {
  if (running) return;

  sessionStorage.setItem(AUTORUN_KEY, '1');
  clearAppLocalStorage();
  window.location.replace('/');
}

/** 새로고침 뒤 표식이 있으면 이어서 돌린다. 패널이 뜰 때 한 번 부른다 */
export function resumeDirectorIfRequested() {
  if (sessionStorage.getItem(AUTORUN_KEY) !== '1') return;
  sessionStorage.removeItem(AUTORUN_KEY);
  void runScenes();
}

async function runScenes() {
  if (running) return;

  resetDemoState();

  running = true;
  stopRequested = false;
  error = null;
  index = 0;
  emit();

  try {
    for (let cursor = 0; cursor < scenes.length; cursor += 1) {
      if (stopRequested) break;
      index = cursor;
      emit();
      await scenes[cursor].run();
    }
  } catch (thrown) {
    error = thrown instanceof Error ? thrown.message : String(thrown);
  } finally {
    running = false;
    emit();
  }
}
