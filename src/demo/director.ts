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
import { router } from '@/router';
import { setSceneSpeed } from '@/demo/config';
import { resetDemoState } from '@/demo/scenario';
import { clearAppLocalStorage } from '@/lib/clearAppStorage';
import {
  click,
  find,
  findAll,
  pageHasText,
  pause,
  previewClick,
  previewHasText,
  previewType,
  select,
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

async function goto(path: string) {
  await router.navigate({ to: path } as Parameters<typeof router.navigate>[0]);
  await pause(500);
}

/** 읽을 시간. 승인 문구처럼 사람이 읽어야 하는 자리에 둔다 */
function read(ms = 1000) {
  return pause(ms);
}

/** 지금 떠 있는 승인을 차례로 결정한다. 하나 누르면 다음 것이 올라온다 */
async function approve(count: number) {
  for (let index = 0; index < count; index += 1) {
    await waitUntil('승인 카드', () => findAll('approve').length > 0, 30000);
    // 과금 문구를 읽을 시간. 배속을 걸어도 이 대기는 줄지 않는다 — 시나리오 시간만 접는다
    await read(2200);
    await click('approve');
    await pause(700);
  }
}

/** 채팅에 한 줄 보내고 태스크가 붙을 때까지 기다린다 */
async function sendChat(prompt: string) {
  await type('chat-input', prompt, 20);
  await read(400);
  await click('chat-send');
}

export const scenes: Scene[] = [
  {
    caption: { title: 'GitHub 계정 하나로 시작', sub: '따로 가입할 것이 없습니다' },
    run: async () => {
      await waitUntil('홈 진입', () => window.location.pathname.startsWith('/home'), 20000);
      await read(1200);
    },
  },
  {
    caption: { title: '만들고 싶은 것을 말로 적습니다', sub: '기획서도 설정 파일도 없습니다' },
    run: async () => {
      await goto('/project');
      await click('project-new');
      await type('project-name', '할 일 관리 앱', 28);
      await click('project-create');
      await waitUntil('프로젝트 생성됨', () => pageHasText('할 일 관리 앱'), 20000);
      await goto('/home');
      await type('home-prompt', PROMPT_APP, 20);
      await read(400);
      await click('home-send');
      await waitUntil('채팅 진입', () => find('chat-input') != null, 20000);
    },
  },
  {
    caption: { title: '모르는 것은 되묻습니다', sub: '멋대로 정하고 만들지 않습니다' },
    run: async () => {
      await waitUntil('되묻기', () => findAll('clarify-option').length > 0, 25000);
      await read(1600);
      findAll<HTMLInputElement>('clarify-option')[0].click();
      await pause(400);
      await click('clarify-submit');
    },
  },
  {
    caption: { title: '코드 변경은 사람이 승인합니다', sub: '무엇이 바뀌는지 먼저 보여줍니다' },
    run: async () => {
      await approve(1);
      await waitUntil('프리뷰', () => document.querySelector('iframe') != null, 30000);
      await read(2000);
    },
  },
  {
    caption: { title: '아직은 화면뿐입니다', sub: '가입을 눌러도 받아 줄 서버가 없습니다' },
    run: async () => {
      const preview = await waitForPreviewDocument();
      await previewType(preview, '#email', 'danto@qeploy.com');
      await previewType(preview, '#password', 'qeploy1234', 18);
      await read(400);
      await previewClick(preview, '#authSubmit');
      await waitUntil('503 표시', () => previewHasText(preview, '503'), 10000);
      await read(2400);
    },
  },
  {
    caption: { title: '인프라도 같은 채팅에서', sub: '콘솔을 열지 않습니다' },
    run: async () => {
      await sendChat(PROMPT_INFRA);
      await read(1200);
    },
  },
  {
    caption: { title: '돈이 나가는 자원은 반드시 승인', sub: '무엇을 어디에 만드는지 말하고 멈춥니다' },
    speed: 3,
    run: async () => {
      await approve(2);
      await waitUntil('백엔드 준비', () => pageHasText('프리뷰에서 실제로 가입'), 40000);
      await read(1500);
    },
  },
  {
    caption: { title: '이제 진짜로 가입됩니다', sub: '데이터는 내 AWS의 RDS로 들어갑니다' },
    run: async () => {
      const preview = await waitForPreviewDocument();
      await previewClick(preview, '#authSubmit');
      await waitUntil('가입 성공', () => previewHasText(preview, '로그아웃'), 15000);
      await read(700);
      await previewType(preview, '#newTodo', '시연 영상 편집하기', 24);
      await previewClick(preview, '#addForm button');
      await read(1800);
    },
  },
  {
    caption: { title: '배포와 도메인도 채팅으로', sub: '내 계정에 올리고 내 주소를 붙입니다' },
    speed: 3,
    run: async () => {
      await goto('/project/1/agent');
      await sendChat(PROMPT_SHIP);
      await approve(2);
      await waitUntil('배포 완료', () => pageHasText('에서 열립니다'), 40000);
      await read(1600);
    },
  },
  {
    caption: { title: '말 한 줄에서 실제 주소까지', sub: '코드·서버·DB·도메인이 전부 내 것입니다' },
    run: async () => {
      await goto('/project/1');
      await waitUntil('개요', () => pageHasText('현재 URL'), 20000);
      await read(3000);
    },
  },
  {
    caption: { title: '화면에서 직접 조작할 수도 있습니다', sub: '승인 이력·인프라·도메인이 전부 남습니다' },
    speed: 2,
    run: async () => {
      await goto('/project/1/approvals');
      await read(1800);
      await goto('/project/1/infra');
      await read(1800);
      await select('server-tier', 't3.small');
      await read(1200);
      await goto('/project/1/domains');
      await read(1800);
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
export function startDirector() {
  if (running) return;

  if (localStorage.getItem('accessToken')) {
    sessionStorage.setItem(AUTORUN_KEY, '1');
    clearAppLocalStorage();
    window.location.replace('/');
    return;
  }

  resetDemoState();
  void runScenes();
}

/** 새로고침 뒤 표식이 있으면 이어서 돌린다 */
export function resumeDirectorIfRequested() {
  if (sessionStorage.getItem(AUTORUN_KEY) !== '1') return;
  sessionStorage.removeItem(AUTORUN_KEY);
  resetDemoState();
  void runScenes();
}

async function runScenes() {
  if (running) return;

  running = true;
  error = null;
  emit();

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
    setSceneSpeed(1);
    running = false;
    caption = null;
    speed = 1;
    emit();
  }
}
