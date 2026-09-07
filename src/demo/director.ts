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
import { hideCursor, showCursor } from '@/demo/cursor';
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
    /*
      승인 문구를 읽을 시간. 배속을 걸어도 이 대기는 줄지 않는다 — 접는 것은 시나리오
      시간이지 사람이 읽는 시간이 아니다. 다만 같은 장면의 두 번째부터는 무엇을 묻는
      화면인지 이미 봤으므로 짧게 지나간다.
    */
    await read(index === 0 ? 2200 : 1400);
    await click('approve');
    await pause(600);
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
    caption: { title: 'GitHub 로그인 기능', sub: '계정을 따로 만들지 않습니다' },
    run: async () => {
      await waitUntil('홈 진입', () => window.location.pathname.startsWith('/home'), 20000);
      await read(1200);
    },
  },
  {
    caption: { title: 'AI 코드 생성 기능', sub: '말로 적으면 앱이 만들어집니다' },
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
    caption: { title: '요구사항 확인 기능', sub: '모르는 것은 먼저 되묻습니다' },
    run: async () => {
      await waitUntil('되묻기', () => findAll('clarify-option').length > 0, 25000);
      await read(1600);
      findAll<HTMLInputElement>('clarify-option')[0].click();
      await pause(400);
      await click('clarify-submit');
    },
  },
  {
    caption: { title: '변경 승인 기능', sub: '적용 전에 무엇이 바뀌는지 봅니다' },
    run: async () => {
      await approve(1);
      await waitUntil('프리뷰', () => document.querySelector('iframe') != null, 30000);
      await read(1500);
    },
  },
  {
    caption: { title: '실시간 프리뷰 기능', sub: '백엔드가 없어 가입이 실패합니다' },
    run: async () => {
      const preview = await waitForPreviewDocument();
      await previewType(preview, '#email', 'danto@qeploy.com');
      await previewType(preview, '#password', 'qeploy1234', 18);
      await read(400);
      await previewClick(preview, '#authSubmit');
      await waitUntil('503 표시', () => previewHasText(preview, '503'), 10000);
      await read(1800);
    },
  },
  {
    caption: { title: '인프라 자동 구성 기능', sub: '채팅으로 서버와 DB를 요청합니다' },
    run: async () => {
      await sendChat(PROMPT_INFRA);
      await read(1200);
    },
  },
  {
    caption: { title: '과금 자원 승인 기능', sub: '내 AWS에 만들기 전 확인합니다' },
    speed: 3,
    run: async () => {
      await approve(2);
      await waitUntil('백엔드 준비', () => pageHasText('프리뷰에서 실제로 가입'), 40000);
      await read(1100);
    },
  },
  {
    caption: { title: '백엔드 연동 기능', sub: '실제로 가입되고 데이터가 남습니다' },
    run: async () => {
      const preview = await waitForPreviewDocument();
      await previewClick(preview, '#authSubmit');
      await waitUntil('가입 성공', () => previewHasText(preview, '로그아웃'), 15000);
      await read(700);
      await previewType(preview, '#newTodo', '시연 영상 편집하기', 24);
      await previewClick(preview, '#addForm button');
      await read(1300);
    },
  },
  {
    caption: { title: '배포·도메인 연결 기능', sub: '내 계정에 올리고 내 주소를 붙입니다' },
    speed: 3,
    run: async () => {
      await goto('/project/1/agent');
      await sendChat(PROMPT_SHIP);
      await approve(2);
      await waitUntil('배포 완료', () => pageHasText('에서 열립니다'), 40000);
      await read(1200);
    },
  },
  {
    caption: { title: '프로젝트 개요 기능', sub: '주소·커밋·승인 이력을 한 화면에' },
    run: async () => {
      await goto('/project/1');
      await waitUntil('개요', () => pageHasText('현재 URL'), 20000);
      await read(2400);
    },
  },
  {
    caption: { title: '직접 조작 기능', sub: '채팅 없이 화면에서도 됩니다' },
    speed: 2,
    run: async () => {
      /*
        여기서는 라우터로 건너뛰지 않고 탭을 실제로 누른다.

        "화면에서도 됩니다" 라고 말하면서 화면이 저절로 넘어가면 자막과 화면이 어긋난다.
        조작하는 장면이 이 장면의 내용이므로 커서가 가서 눌러야 한다.
      */
      await click('tab-approvals');
      await read(1600);
      await click('tab-infra');
      await read(1400);
      await select('server-tier', 't3.small');
      await read(1200);
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
  showCursor();

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
