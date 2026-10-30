/**
 * 시연 자동 재생.
 *
 * 랜딩의 "GitHub로 연결하기" 를 누르면 여기부터 끝까지 혼자 흐른다. 편집 없이 한
 * 번에 담을 수 있도록 자막을 화면에 얹고, 오래 걸리는 구간은 배속으로 접는다.
 *
 * 이야기의 중심은 채팅이다 — 개발·인프라·배포·도메인이 전부 같은 대화 한 줄에서
 * 일어난다는 것이 이 제품의 요지이고, 화면을 직접 만지는 방법은 그 뒤에 "이렇게도
 * 됩니다" 로 짧게 붙인다.
 *
 * 상태를 몰래 바꾸지 않는다. 화면의 컨트롤을 실제로 찾아 누른다(dom.ts 참고).
 */
import { setClockRate, setSceneSpeed } from '@/demo/config';
import { resetDemoState } from '@/demo/scenario';
import { hideCursor, showCursor } from '@/demo/cursor';
import { clearAppLocalStorage } from '@/lib/clearAppStorage';
import {
  click,
  find,
  findAll,
  pageHasText,
  pause,
  show,
  type,
  waitForPreviewDocument,
  waitUntil,
} from '@/demo/dom';

export type Caption = {
  /** 화면 아래 큰 글씨 */
  title: string;
  /** 한 줄 설명. 없으면 제목만 */
  sub?: string;
  /** 재현 화면이 떠 있는 동안만 보이는 표시. 장면 내내 자리는 잡아 둔다 */
  note?: string;
};

export type Scene = {
  caption: Caption;
  /**
   * 에이전트를 기다리는 동안의 화면 시계 배속. 그동안 화면에 찍히는 시각이 이만큼 빨리 가고,
   * 자막에도 같은 ×N 이 뜬다(config.ts 의 화면 시계 참고).
   *
   * **에이전트가 일하는 동안에만 건다(agentWorks).** 사람이 읽고 적고 누르는 동안은 같은
   * 장면 안에서도 실시간이고 ×N 도 내린다 — 사람 손이 열 배로 빨라 보이면 안 된다.
   *
   * 실제로 걸리는 시간에 맞춘다: 코드 생성 수 분, RDS·EC2 5~10분, 배포 수 분.
   */
  timeScale?: number;
  /**
   * 시나리오 타이머를 줄이는 정도. 화면에 약속하는 값이 아니라 장면 길이를 맞추는 내부
   * 장치다 — 보는 사람에게 드러나는 시간은 timeScale 이 정한다.
   */
  pace?: number;
  run: () => Promise<void>;
};

const PROMPT_APP =
  '팀이 같이 쓰는 할 일 관리 앱을 만들어줘. 회원가입·로그인, 마감일·우선순위·카테고리, 진행률이 보이게. 차분한 남색 카드형으로.';
const PROMPT_SHIP = '배포하고 todo-together.qeploy.com 도메인 붙여줘.';

/** 읽을 시간. 승인 문구처럼 사람이 읽어야 하는 자리에 둔다 */
function read(ms = 1000) {
  return pause(ms);
}

/**
 * 지금 떠 있는 승인을 차례로 결정한다. 하나 누르면 다음 것이 올라온다.
 *
 * `firstReadMs` 는 첫 장을 읽는 시간이다. 바로 앞에서 그 승인의 설명을 이미 읽었으면 줄인다.
 */
async function approve(count: number, firstReadMs = 1700) {
  for (let index = 0; index < count; index += 1) {
    await agentWorks('승인 카드', () => findAll('approve').length > 0, 30000);
    await show('approval-card');
    /*
      승인 문구를 읽을 시간. 배속을 걸어도 이 대기는 줄지 않는다 — 접는 것은 시나리오
      시간이지 사람이 읽는 시간이 아니다. 다만 같은 장면의 두 번째부터는 무엇을 묻는
      화면인지 이미 봤으므로 짧게 지나간다.

      승인이 여섯 번 나오므로(계획·저장소·DB·서버·배포·도메인) 첫 장보다 조금 줄였다.
      카드 모양은 앞에서 이미 읽혔고, 다른 것은 요약 한 줄뿐이다.
    */
    await read(index === 0 ? firstReadMs : 850);
    /*
      누른 카드가 화면에서 걷힐 때까지 기다린다. 결정이 서버에 반영되기 전까지는 같은 카드가
      남아 있어서, 바로 다음 승인을 찾으면 방금 누른 버튼을 다시 집는다 — 그러면 정작 다음
      승인(저장소 연결 등)은 누르지 않은 채 지나간다.
    */
    /*
      대화가 아직 "응답 중" 이면 승인 버튼을 눌러도 화면이 조용히 무시한다
      (AgentConversationPanel.handleDecideApproval 의 isAssistantReplying). 되묻기에 답한
      직후처럼 승인 카드가 응답 표시보다 먼저 뜨는 순간이 있어서, 응답 표시(맥박 막대)가
      걷힐 때까지 기다린 뒤 누른다.
    */
    await waitUntil(
      '응답 끝',
      () => document.querySelector('[role="tabpanel"] .animate-pulse') == null,
      15000,
    );
    const decided = find('approval-card');
    await click('approve');
    await waitUntil('승인 반영', () => decided == null || !decided.isConnected, 15000);
    await pause(420);
  }
}

/**
 * 에이전트가 일을 마칠 때까지 기다린다. 그동안만 화면 시계를 장면 배속으로 흘리고 자막에
 * ×N 을 띄운다 — 사람이 읽고 누르는 나머지 시간은 실시간이다.
 */
async function agentWorks(label: string, probe: () => boolean, timeoutMs?: number) {
  setLiveScale(sceneScale);
  try {
    await waitUntil(label, probe, timeoutMs);
  } finally {
    setLiveScale(1);
  }
}

/** 채팅에 한 줄 보내고 태스크가 붙을 때까지 기다린다 */
async function sendChat(prompt: string) {
  await type('chat-input', prompt, 13);
  await read(280);
  await click('chat-send');
}

/** 시연용 키. 형식만 맞춘 가짜 값이고, 화면에서는 비밀번호 칸이라 점으로만 보인다 */
const DEMO_AI_KEY = 'sk-ant-api03-qeploy-demo-0000000000000000';

/**
 * 랜딩이 다 올라왔는지. 문구와 버튼은 시차를 두고 떠오르므로, 버튼이 보이기 시작한 때가
 * 아니라 **조상까지 다 불투명해진 때**를 본다 — 반쯤 투명한 버튼을 누르면 떠오르는
 * 도중에 화면이 넘어간다.
 */
function isLandingSettled() {
  let element: HTMLElement | null = find('login');
  if (!element) return false;
  while (element && element !== document.body) {
    if (getComputedStyle(element).opacity !== '1') return false;
    element = element.parentElement;
  }
  return true;
}

/** 시작 버튼이 이미 눌렸는지. 사람이 눌러 시작했으면 첫 장면이 다시 누르지 않는다 */
let loginPressed = false;

/*
  웹 서비스 → MCP·CLI 창구 → 터미널로 이어지는 통합 영상의 웹 부분이다(약 50초). 그래서
  핵심만 남긴다 — 로그인, 프로젝트, 말로 만들기(되묻기·계획 승인), 프리뷰, 배포·도메인, 그리고
  터미널로 넘어가는 창구. 클라우드 연결·서버·DB·작업 내역·직접 조작은 이 영상에서 뺐다.

  클라우드 연결이 없으므로 배포는 GitHub Pages 로 나간다(서버의 기본 호스팅).
*/
export const scenes: Scene[] = [
  {
    /*
      첫 로그인은 GitHub 화면 두 개를 거친다 — 계정 접근 승인(OAuth)과 GitHub App 설치.
      시연은 github.com 에 나갈 수 없어 그 화면을 시연 빌드 안에서 재현한다. 여기서는 한
      장면으로 짧게 지난다.
    */
    caption: {
      title: 'GitHub 로그인 기능',
      // 제목에 GitHub 이 있으니 설명에서는 되풀이하지 않는다 — 자막을 한 줄에 담는다
      sub: '계정으로 시작하고 저장소 권한을 허용합니다',
      note: 'GitHub 화면(재현)',
    },
    run: async () => {
      if (!loginPressed) {
        await read(300);
        await click('login', { glideMs: 700 });
      }
      await waitUntil('계정 접근 승인 화면', () => find('github-authorize') != null, 15000);
      await read(900);
      await click('github-authorize');
      await waitUntil('권한 안내', () => find('github-app-confirm') != null, 20000);
      await read(600);
      await click('github-app-confirm');
      await waitUntil('App 설치 화면', () => find('github-install') != null, 15000);
      await read(1300);
      await click('github-install');
      await waitUntil(
        '안내 닫힘',
        () => find('github-window') == null && find('github-app-confirm') == null,
        15000,
      );
      await read(250);
    },
  },
  {
    caption: { title: '프로젝트 생성 기능', sub: '이름만 정하면 바로 시작합니다' },
    run: async () => {
      /*
        시작하기가 다음 할 일로 펼쳐 둔 "프로젝트 만들기" 로 간다. 그 버튼은 앞 장면의 로그인
        자막 밑에 걸쳐 있다 — 자막이 다 접힌 뒤(DemoCaption 의 FADE_MS) 커서를 옮긴다.
      */
      await read(260);
      await click('guide-next');
      await waitUntil('프로젝트 목록', () => window.location.pathname === '/project', 15000);
      await click('project-new');
      await read(300);
      await type('project-name', '함께 할 일', 18);
      await read(250);
      await click('project-create');
      await waitUntil('프로젝트 생성됨', () => find('project-card') != null, 20000);
      await read(350);
    },
  },
  {
    caption: {
      title: '내 AI 키 연결 기능',
      sub: '내 키로 실행되고, 사용량은 내 계정으로 청구됩니다',
    },
    run: async () => {
      // 운영자 키는 없다. 처음 쓰는 사람이 실제로 밟는 단계라 한 컷으로 지난다
      await click('project-card');
      await read(250);
      await click('open-agent');
      await waitUntil('키 안내', () => find('ai-key-register-link') != null, 20000);
      await read(450);
      await click('ai-key-register-link');
      await click('ai-key-open-ANTHROPIC');
      await type('ai-key-input', DEMO_AI_KEY, 6);
      await click('ai-key-save');
      await waitUntil('키 등록 반영', () => pageHasText('키를 등록했습니다'), 15000);
      await read(450);
    },
  },
  {
    caption: { title: 'AI 코드 생성 기능', sub: '말로 적으면 앱이 만들어집니다' },
    // 요청을 읽고 되물을 것을 고르는 1분 남짓
    timeScale: 30,
    pace: 2,
    run: async () => {
      await type('chat-input', PROMPT_APP, 9);
      await read(250);
      await click('chat-send');
      await agentWorks('되묻기', () => findAll('clarify-option').length > 0, 25000);
    },
  },
  {
    caption: { title: '변경 승인 기능', sub: '모르는 것은 되묻고, 실행 전에 계획을 확인받습니다' },
    // 계획을 세우고 코드를 쓰는 몇 분
    timeScale: 100,
    pace: 2,
    run: async () => {
      await read(650);
      findAll<HTMLInputElement>('clarify-option')[0].click();
      await pause(250);
      await click('clarify-submit');
      // 실행 전 계획 승인
      await approve(1, 1100);
      // 만든 결과를 남길 저장소. 정책으로 끌 수 없는 게이트라 짧게라도 지난다
      await approve(1, 600);
      await agentWorks('프리뷰', () => document.querySelector('iframe') != null, 30000);
    },
  },
  {
    caption: { title: '실시간 프리뷰 기능', sub: '만든 앱을 그 자리에서 확인합니다' },
    run: async () => {
      await waitForPreviewDocument();
      await read(1300);
    },
  },
  {
    caption: { title: '배포·도메인 연결 기능', sub: 'GitHub Pages에 올리고 내 주소를 붙입니다' },
    // 빌드·업로드와 인증서 발급을 기다리는 몇 분
    timeScale: 120,
    pace: 2,
    run: async () => {
      await sendChat(PROMPT_SHIP);
      await approve(2, 1000);
      await agentWorks('배포 완료', () => pageHasText('에서 열립니다'), 40000);
      await read(1000);
    },
  },
  {
    /*
      터미널로 넘어가는 창구. 프로젝트 개요의 "터미널·코딩 에이전트에서 이어서 하기" 에서
      연결 안내를 열고, 배포까지 맡기도록 WRITE 토큰을 발급해 토큰과 명령을 복사한다. 영상은
      여기서 터미널 부분으로 이어진다 — 거기서 이 토큰과 명령을 그대로 붙여넣는다.
    */
    /*
      자막이 짧아야 한다. 가운데 붙박은 자막이 길면 오른쪽 끝이 시트 안 명령 블록의 첫 글자를
      덮는다(시트는 x 820 부터, 명령은 866 부터).
    */
    caption: { title: 'MCP·CLI 연결 기능', sub: '터미널에서 이어서 다룹니다' },
    run: async () => {
      await click('nav-project');
      await read(250);
      await click('project-card');
      await waitUntil('개요', () => find('agent-connect-card') != null, 20000);
      await show('agent-connect-card');
      await read(1000);
      await click('agent-connect-open');
      await waitUntil('연결 안내', () => find('agent-connect-sheet') != null, 15000);
      await read(1100);
      // 켜면 토큰이 WRITE 로 바뀌고 등록 명령에 쓰기 도구를 켜는 환경변수가 붙는다
      await click('agent-connect-writes');
      await read(600);
      await type('api-token-label', '터미널', 40);
      await type('api-token-expiry', '90', 60);
      await read(200);
      await click('api-token-issue');
      await waitUntil('토큰 발급', () => find('api-token-value') != null, 15000);
      await read(1200);
      await click('api-token-copy');
      await read(300);
      await click('agent-connect-copy-login');
      await read(250);
      await click('agent-connect-copy-register');
      await read(800);
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 실행                                                                        */
/* -------------------------------------------------------------------------- */

export type DirectorSnapshot = {
  running: boolean;
  caption: Caption | null;
  /** 지금 장면이 에이전트를 기다릴 때 거는 배속. 자막은 이 자리를 잡아 둔다 */
  sceneTimeScale: number;
  /** 지금 화면 시계 배속. 1보다 크면 자막에 ×N 이 보인다 */
  timeScale: number;
  error: string | null;
};

type Listener = (snapshot: DirectorSnapshot) => void;

const AUTORUN_KEY = 'demo-autorun';

let running = false;
let caption: Caption | null = null;
let sceneScale = 1;
let timeScale = 1;
let error: string | null = null;
const listeners = new Set<Listener>();

function snapshot(): DirectorSnapshot {
  return { running, caption, sceneTimeScale: sceneScale, timeScale, error };
}

function setLiveScale(rate: number) {
  timeScale = rate;
  setClockRate(rate);
  emit();
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

export function isDirectorRunning() {
  return running;
}

/**
 * 자동 재생 시작.
 *
 * 앞 회차의 로그인 상태가 남아 있으면 랜딩의 버튼이 로그인 대신 워크스페이스 이동으로
 * 동작하고, 이동한 곳에서는 토큰이 없어 다시 랜딩으로 되돌려진다 — 첫 장면에서
 * 제자리를 돈다. 그때만 새로고침을 끼워 화면째로 지운다.
 */
export function startDirector({ loginPressed: pressed = false }: { loginPressed?: boolean } = {}) {
  if (running) return;
  loginPressed = pressed;

  if (localStorage.getItem('accessToken')) {
    sessionStorage.setItem(AUTORUN_KEY, '1');
    clearAppLocalStorage();
    window.location.replace('/');
    return;
  }

  resetDemoState();
  void runScenes();
}

/**
 * 새로고침 뒤 표식이 있으면 이어서 돌린다. 이어받았으면 true.
 *
 * 새로고침으로 랜딩부터 다시 뜨므로 시작 버튼은 아직 안 눌린 것이다 — 첫 장면이 누른다.
 */
export function resumeDirectorIfRequested() {
  if (sessionStorage.getItem(AUTORUN_KEY) !== '1') return false;
  sessionStorage.removeItem(AUTORUN_KEY);
  resetDemoState();
  loginPressed = false;
  void runScenes({ cursorOffscreen: true });
  return true;
}

/**
 * 랜딩 주소에 `?autoplay` 가 있으면 혼자 시작한다.
 *
 * 녹화가 이 길로 들어온다. 시작 버튼을 녹화 도구가 누르면 첫 장면 전에 커서 없이 버튼이
 * 눌려 버린다 — 커서는 재생이 시작돼야 생기기 때문이다. 재생이 먼저 시작하면 커서가
 * 화면 밖에서 들어와 그 버튼을 누르는 것부터 담을 수 있다.
 *
 * 랜딩 문구가 다 올라온 뒤에 시작한다. 그 전에 자막을 띄우면 떠오르는 문구와 겹친다.
 */
export function startDirectorOnAutoplay() {
  if (running || window.location.pathname !== '/') return;
  if (!new URLSearchParams(window.location.search).has('autoplay')) return;

  void (async () => {
    await waitUntil('랜딩', isLandingSettled, 30000);
    if (running) return;
    resetDemoState();
    loginPressed = false;
    await runScenes({ cursorOffscreen: true });
  })();
}

async function runScenes({ cursorOffscreen = false }: { cursorOffscreen?: boolean } = {}) {
  if (running) return;

  running = true;
  error = null;
  emit();
  showCursor({ offscreen: cursorOffscreen });

  try {
    for (const scene of scenes) {
      caption = scene.caption;
      sceneScale = scene.timeScale ?? 1;
      setSceneSpeed(scene.pace ?? 1);
      setLiveScale(1);
      await scene.run();
    }
    // 마지막 자막은 잠깐 더 두고 접는다
    await pause(1200);
  } catch (thrown) {
    error = thrown instanceof Error ? thrown.message : String(thrown);
  } finally {
    hideCursor();
    setSceneSpeed(1);
    setClockRate(1);
    running = false;
    caption = null;
    sceneScale = 1;
    timeScale = 1;
    emit();
  }
}
