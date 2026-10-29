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
import { setSceneSpeed } from '@/demo/config';
import { resetDemoState } from '@/demo/scenario';
import { hideCursor, showCursor } from '@/demo/cursor';
import { clearAppLocalStorage } from '@/lib/clearAppStorage';
import {
  click,
  fill,
  find,
  findAll,
  pageHasText,
  pause,
  previewClick,
  previewHasText,
  previewType,
  select,
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
};

export type Scene = {
  caption: Caption;
  /** 시나리오 시간을 이만큼 접는다. 1이면 실시간 */
  speed?: number;
  run: () => Promise<void>;
};

const PROMPT_APP =
  '회원가입과 로그인이 되는 할 일 관리 웹앱을 만들어줘. 로그인하면 내 할 일만 보이게.';
const PROMPT_INFRA = '내 AWS 계정에 백엔드 서버랑 데이터베이스를 만들어서 진짜로 가입되게 해줘.';
const PROMPT_SHIP = '배포하고 todo-together.qeploy.com 도메인 붙여줘.';

/** 읽을 시간. 승인 문구처럼 사람이 읽어야 하는 자리에 둔다 */
function read(ms = 1000) {
  return pause(ms);
}

/** 지금 떠 있는 승인을 차례로 결정한다. 하나 누르면 다음 것이 올라온다 */
async function approve(count: number) {
  for (let index = 0; index < count; index += 1) {
    await waitUntil('승인 카드', () => findAll('approve').length > 0, 30000);
    await show('approval-card');
    /*
      승인 문구를 읽을 시간. 배속을 걸어도 이 대기는 줄지 않는다 — 접는 것은 시나리오
      시간이지 사람이 읽는 시간이 아니다. 다만 같은 장면의 두 번째부터는 무엇을 묻는
      화면인지 이미 봤으므로 짧게 지나간다.

      승인이 여섯 번 나오므로(계획·저장소·DB·서버·배포·도메인) 첫 장보다 조금 줄였다.
      카드 모양은 앞에서 이미 읽혔고, 다른 것은 요약 한 줄뿐이다.
    */
    await read(index === 0 ? 1700 : 1000);
    await click('approve');
    await pause(420);
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

export const scenes: Scene[] = [
  {
    /*
      로그인과 권한 연결을 한 장면으로 둔다.

      시연에는 GitHub 로그인 화면이 없다 — 남의 서비스 화면을 흉내 내 찍을 수는 없어서,
      누르면 로그인을 마친 뒤로 바로 넘어간다. 그래서 자막을 둘로 나누면 "로그인" 자막이
      권한 안내 위에 떴다가 같은 안내 위에서 "권한 연결" 로 바뀌었다. 화면은 하나인데
      자막만 두 번 바뀌는 셈이라, 누르는 순간부터 권한을 허용할 때까지를 한 이름으로 묶는다.
    */
    caption: { title: 'GitHub 로그인 기능', sub: '가입 없이 시작하고 저장소 권한을 허용합니다' },
    run: async () => {
      if (!loginPressed) {
        // 자막이 올라오는 동안 한 박자 두고 커서가 화면 밖에서 들어와 시작 버튼을 누른다
        await read(320);
        await click('login', { glideMs: 760 });
      }
      await waitUntil('홈 진입', () => window.location.pathname.startsWith('/home'), 20000);
      // 로그인 직후 App 이 아직 설치되지 않아 안내가 뜬다. 실제 첫 로그인이 그렇다
      await waitUntil('권한 안내', () => find('github-app-confirm') != null, 20000);
      await read(1300);
      await click('github-app-confirm');
      await waitUntil('안내 닫힘', () => find('github-app-confirm') == null, 15000);
      await read(400);
    },
  },
  {
    caption: { title: '프로젝트 생성 기능', sub: '이름만 정하면 바로 시작합니다' },
    run: async () => {
      await click('nav-project');
      await read(550);
      await click('project-new');
      await read(450);
      await type('project-name', '할 일 관리 앱', 20);
      await read(400);
      await click('project-create');
      await waitUntil('프로젝트 생성됨', () => find('project-card') != null, 20000);
      await read(700);
    },
  },
  {
    caption: { title: '내 AI 키 연결 기능', sub: 'AI 사용량은 내 계정으로 청구됩니다' },
    run: async () => {
      /*
        운영자 키는 없다. 본인 키를 넣기 전에는 에이전트를 부를 수 없고, 채팅이 그
        자리에서 등록하러 가라고 안내한다 — 처음 쓰는 사람이 실제로 밟는 길이다.
      */
      await click('project-card');
      await read(500);
      await click('open-agent');
      await waitUntil('키 안내', () => find('ai-key-register-link') != null, 20000);
      await read(1000);
      await click('ai-key-register-link');
      await click('ai-key-open-ANTHROPIC');
      await read(350);
      await type('ai-key-input', DEMO_AI_KEY, 9);
      await read(300);
      await click('ai-key-save');
      await waitUntil('키 저장', () => pageHasText('키를 저장했습니다'), 15000);
      /*
        여기서 아무것도 누르지 않는다. 설정은 떠나온 대화를 기억하고 있다가 저장이
        끝나면 그리로 돌려보낸다 — 프로젝트를 다시 찾아 들어가지 않는 것이 이 장면이다.
      */
      await waitUntil(
        '대화로 복귀',
        () => window.location.pathname.endsWith('/agent') && find('chat-input') != null,
        15000,
      );
      // 돌아온 대화에서 안내가 걷히고 제공자(Claude Code)가 잡힌 것을 보여 준다
      await read(950);
    },
  },
  {
    caption: { title: 'AI 코드 생성 기능', sub: '말로 적으면 앱이 만들어집니다' },
    run: async () => {
      await type('chat-input', PROMPT_APP, 13);
      await read(380);
      await click('chat-send');
    },
  },
  {
    caption: { title: '요구사항 확인 기능', sub: '모르는 것은 먼저 되묻습니다' },
    run: async () => {
      await waitUntil('되묻기', () => findAll('clarify-option').length > 0, 25000);
      await read(1000);
      findAll<HTMLInputElement>('clarify-option')[0].click();
      await pause(350);
      await click('clarify-submit');
    },
  },
  {
    caption: { title: '변경 승인 기능', sub: '실행 전에 무엇을 할지 확인합니다' },
    run: async () => {
      await approve(1);
    },
  },
  {
    caption: { title: '저장소 연결 기능', sub: '만든 결과를 내 GitHub 저장소에 남깁니다' },
    run: async () => {
      await approve(1);
      await waitUntil('프리뷰', () => document.querySelector('iframe') != null, 30000);
      await read(800);
    },
  },
  {
    caption: { title: '실시간 프리뷰 기능', sub: '아직 서버가 없어 가입이 실패합니다' },
    run: async () => {
      const preview = await waitForPreviewDocument();
      await previewType(preview, '#email', 'danto@qeploy.com');
      await previewType(preview, '#password', 'qeploy1234', 12);
      await read(250);
      await previewClick(preview, '#authSubmit');
      await waitUntil('503 표시', () => previewHasText(preview, '503'), 10000);
      await read(1400);
    },
  },
  {
    caption: { title: '인프라 자동 구성 기능', sub: '채팅으로 서버와 DB를 요청합니다' },
    run: async () => {
      await sendChat(PROMPT_INFRA);
      // 연결된 AWS 계정이 없으면 에이전트가 여기서 멈추고 안내를 편다
      await waitUntil('클라우드 안내', () => find('cloud-guide-register') != null, 25000);
      await read(1400);
    },
  },
  {
    caption: { title: 'BYOC 연결 기능', sub: '자원은 내 AWS 계정에 만들어집니다' },
    run: async () => {
      // 안내에서 바로 등록 화면으로 간다. 떠나온 대화는 설정이 기억한다
      await click('cloud-guide-register');
      await waitUntil('등록 폼', () => find('cloud-name') != null, 20000);
      await read(500);
      await type('cloud-name', '내 AWS 계정', 16);
      await fill('cloud-region', 'ap-northeast-2');
      await fill('cloud-key', 'AKIAIOSFODNN7EXAMPLE');
      await fill('cloud-secret', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
      await fill('cloud-account', '481019284412');
      await read(450);
      await click('cloud-create');
      // 권한 검증이 끝나 쓸 수 있는 연결이 되면 설정이 알아서 대화로 돌려보낸다
      await waitUntil('검증 끝', () => pageHasText('권한 확인까지 마쳤습니다'), 25000);
      await waitUntil(
        '대화로 복귀',
        () => window.location.pathname.endsWith('/agent') && find('cloud-guide-use') != null,
        15000,
      );
    },
  },
  {
    caption: { title: '프로젝트 연결 기능', sub: '어느 계정에 만들지 프로젝트마다 고릅니다' },
    run: async () => {
      // 돌아온 자리의 안내에서 그대로 고르고 이어간다. 인프라 탭에 다녀오지 않는다
      await read(900);
      await click('cloud-guide-use');
      await waitUntil('연결됨', () => pageHasText('이 프로젝트에 연결됨'), 20000);
      await read(800);
      await click('cloud-guide-retry');
    },
  },
  {
    caption: { title: '백엔드 연동 기능', sub: '프리뷰가 서버로 바뀌어 실제로 가입됩니다' },
    run: async () => {
      await waitUntil('서버형 프리뷰', () => pageHasText('프리뷰에서 실제로 가입'), 30000);
      await read(700);
      const preview = await waitForPreviewDocument();
      /*
        값을 다시 넣는다. 클라우드를 연결하는 동안 화면을 떠났다 돌아오면 프리뷰가 새로
        로드되어 아까 친 것이 남아 있지 않다 — 빈 폼으로 누르면 아무 일도 안 일어난다.
      */
      await previewType(preview, '#email', 'danto@qeploy.com', 11);
      await previewType(preview, '#password', 'qeploy1234', 11);
      await read(240);
      await previewClick(preview, '#authSubmit');
      await waitUntil('가입 성공', () => previewHasText(preview, '로그아웃'), 15000);
      await read(500);
      await previewType(preview, '#newTodo', '시연 영상 편집하기', 18);
      await previewClick(preview, '#addForm button');
      await read(1000);
    },
  },
  {
    caption: { title: '과금 자원 승인 기능', sub: '내 AWS에 만들기 전 확인합니다' },
    speed: 5,
    run: async () => {
      await approve(2);
      await read(500);
    },
  },
  {
    caption: { title: '배포·도메인 연결 기능', sub: '내 AWS에 올리고 내 주소를 붙입니다' },
    speed: 5,
    run: async () => {
      await sendChat(PROMPT_SHIP);
      await approve(2);
      await waitUntil('배포 완료', () => pageHasText('에서 열립니다'), 40000);
      await read(900);
    },
  },
  {
    caption: { title: '프로젝트 개요 기능', sub: '주소·커밋·승인 이력을 한 화면에' },
    run: async () => {
      // 목록에서 프로젝트를 골라 들어간다 — 사람이 다음에 할 일이 그것이다
      await click('nav-project');
      await read(500);
      await click('project-card');
      await waitUntil('개요', () => pageHasText('현재 URL'), 20000);
      await read(1500);
    },
  },
  {
    caption: { title: '직접 조작 기능', sub: '채팅 없이 화면에서도 됩니다' },
    run: async () => {
      /*
        라우터로 건너뛰지 않고 탭을 하나씩 누른다.

        "화면에서도 됩니다" 라고 말하면서 화면이 저절로 넘어가면 자막과 화면이 어긋난다.
        조작하는 장면이 이 장면의 내용이므로 커서가 가서 눌러야 한다.

        배속도 걸지 않는다 — 여기서 접을 시나리오 시간이 없는데 배속을 표시하면
        보는 사람에게 없는 압축을 있다고 말하는 셈이다.
      */
      for (const tab of ['tab-approvals', 'tab-deployments', 'tab-domains']) {
        /*
          움직임은 빠르게, 머무는 것은 읽을 만큼. 커서가 굼뜬 것과 화면을 알아볼
          시간이 없는 것은 다른 문제다 — 탭당 1초는 있어야 무슨 화면인지 읽힌다.
        */
        await click(tab);
        await read(760);
      }
      await click('tab-infra');
      await read(550);
      await select('server-tier', 't3.small');
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
  speed: number;
  error: string | null;
};

type Listener = (snapshot: DirectorSnapshot) => void;

const AUTORUN_KEY = 'demo-autorun';

let running = false;
let caption: Caption | null = null;
let speed = 1;
let error: string | null = null;
const listeners = new Set<Listener>();

function snapshot(): DirectorSnapshot {
  return { running, caption, speed, error };
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
      speed = scene.speed ?? 1;
      setSceneSpeed(speed);
      emit();
      await scene.run();
    }
    // 마지막 자막은 잠깐 더 두고 접는다
    await pause(1500);
  } catch (thrown) {
    error = thrown instanceof Error ? thrown.message : String(thrown);
  } finally {
    hideCursor();
    setSceneSpeed(1);
    running = false;
    caption = null;
    speed = 1;
    emit();
  }
}
