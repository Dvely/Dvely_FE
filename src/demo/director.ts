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
const PROMPT_INFRA = '내 AWS 계정에 백엔드 서버랑 데이터베이스를 만들어서 진짜로 가입되게 해줘.';
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
    await click('approve');
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

export const scenes: Scene[] = [
  {
    /*
      첫 로그인은 GitHub 화면 두 개를 거친다 — 계정 접근 승인(OAuth)과 GitHub App 설치.
      실제로는 둘 다 팝업이고, 시연은 github.com 에 나갈 수 없어 그 화면을 시연 빌드
      안에서 재현한다(DemoGitHubWindow). 재현 화면이 떠 있는 동안 자막에 재현이라고 붙는다.

      이 장면은 계정 접근 승인까지다. 팝업이 우리 콜백 주소를 거쳐 닫히고 홈으로 간다.
    */
    caption: {
      title: 'GitHub 로그인 기능',
      sub: '가입 없이 GitHub 계정으로 시작합니다',
      note: 'GitHub 화면(재현)',
    },
    run: async () => {
      if (!loginPressed) {
        // 자막이 올라오는 동안 한 박자 두고 커서가 화면 밖에서 들어와 시작 버튼을 누른다
        await read(320);
        await click('login', { glideMs: 760 });
      }
      await waitUntil('계정 접근 승인 화면', () => find('github-authorize') != null, 15000);
      // 무엇을 읽어 가는지(계정 정보 읽기만) 읽을 시간
      await read(1700);
      await click('github-authorize');
      await waitUntil('홈 진입', () => window.location.pathname.startsWith('/home'), 20000);
    },
  },
  {
    /*
      로그인 직후에는 App 이 아직 설치되지 않아 안내가 뜬다. 실제 첫 로그인이 그렇다.
      허용하면 App 설치 화면이 뜨고, 저장소 범위와 권한을 보고 설치한다.
    */
    caption: {
      title: '저장소 권한 연결 기능',
      sub: 'Qeploy가 쓸 저장소 권한을 허용합니다',
      note: 'GitHub 화면(재현)',
    },
    run: async () => {
      await waitUntil('권한 안내', () => find('github-app-confirm') != null, 20000);
      await read(1400);
      await click('github-app-confirm');
      await waitUntil('App 설치 화면', () => find('github-install') != null, 15000);
      // 저장소 범위와 권한 목록을 읽을 시간. 이 화면에서 가장 중요한 내용이다
      await read(2600);
      await click('github-install');
      await waitUntil(
        '안내 닫힘',
        () => find('github-window') == null && find('github-app-confirm') == null,
        15000,
      );
      await read(300);
    },
  },
  {
    /*
      홈의 시작하기. GitHub 를 연결했으니 첫 단계가 채워져 있고, 다음 할 일(프로젝트
      만들기)이 펼쳐져 있다. 그 버튼을 눌러 다음 장면으로 간다 — 가이드가 실제로 길을
      여는 모습이 이 장면의 내용이다.
    */
    caption: { title: '시작 가이드 기능', sub: '무엇부터 할지 화면이 알려 줍니다' },
    run: async () => {
      await waitUntil(
        '첫 단계 완료',
        () => find('guide-card')?.querySelector('[data-step="github"][data-done]') != null,
        15000,
      );
      await show('guide-card');
      await read(1300);
      await click('guide-next');
      await waitUntil('프로젝트 목록', () => window.location.pathname === '/project', 15000);
      await read(300);
    },
  },
  {
    caption: { title: '프로젝트 생성 기능', sub: '이름만 정하면 바로 시작합니다' },
    run: async () => {
      await click('project-new');
      await read(400);
      await type('project-name', '함께 할 일', 20);
      await read(350);
      await click('project-create');
      await waitUntil('프로젝트 생성됨', () => find('project-card') != null, 20000);
      await read(500);
    },
  },
  {
    caption: {
      title: '내 AI 키 연결 기능',
      sub: '대화 옆에서 등록하고, 사용량은 내 계정으로 청구됩니다',
    },
    run: async () => {
      /*
        운영자 키는 없다. 본인 키를 넣기 전에는 에이전트를 부를 수 없고, 채팅이 그
        자리에서 등록하라고 안내한다 — 처음 쓰는 사람이 실제로 밟는 길이다.

        등록은 대화 옆 시트에서 끝난다. 화면을 옮기지 않으므로 저장하면 시트가 닫히고 그
        자리의 안내가 "등록했습니다" 로 바뀐다.
      */
      await click('project-card');
      await read(400);
      await click('open-agent');
      await waitUntil('키 안내', () => find('ai-key-register-link') != null, 20000);
      // 처음 들어온 대화에는 무엇을 적으면 되는지가 먼저 보인다
      await read(950);
      await click('ai-key-register-link');
      await click('ai-key-open-ANTHROPIC');
      await read(300);
      await type('ai-key-input', DEMO_AI_KEY, 9);
      await read(250);
      await click('ai-key-save');
      await waitUntil('키 등록 반영', () => pageHasText('키를 등록했습니다'), 15000);
      await read(850);
    },
  },
  {
    caption: { title: 'AI 코드 생성 기능', sub: '말로 적으면 앱이 만들어집니다' },
    // 요청을 읽고 되물을 것을 고르는 30초 남짓
    timeScale: 20,
    run: async () => {
      await type('chat-input', PROMPT_APP, 11);
      await read(380);
      await click('chat-send');
      await agentWorks('되묻기', () => findAll('clarify-option').length > 0, 25000);
    },
  },
  {
    caption: { title: '요구사항 확인 기능', sub: '모르는 것은 먼저 되묻습니다' },
    run: async () => {
      await read(1000);
      findAll<HTMLInputElement>('clarify-option')[0].click();
      await pause(350);
      await click('clarify-submit');
    },
  },
  {
    caption: { title: '변경 승인 기능', sub: '실행 전에 무엇을 할지 확인합니다' },
    // 계획을 세우는 1분 남짓
    timeScale: 60,
    run: async () => {
      await approve(1);
    },
  },
  {
    caption: { title: '저장소 연결 기능', sub: '만든 결과를 내 GitHub 저장소에 남깁니다' },
    // 코드를 쓰고 프리뷰를 띄우는 몇 분
    timeScale: 100,
    run: async () => {
      await approve(1);
      await agentWorks('프리뷰', () => document.querySelector('iframe') != null, 30000);
      await read(700);
    },
  },
  {
    caption: { title: '작업 내역 기능', sub: '지난 작업이 어떻게 진행됐는지 다시 봅니다' },
    run: async () => {
      /*
        작업이 도는 동안 대화 끝에 보이던 진행 기록은 작업이 끝나면 사라지고 결과 줄만
        남는다. 그 줄의 "작업 내역 보기" 로 다시 펼친다 — 되묻기와 계획 승인부터 코드
        작성, 저장소 연결까지 시각과 함께 남아 있다.
      */
      await waitUntil('작업 내역 보기', () => find('task-log-toggle') != null, 15000);
      // 접혀 있는 모양을 먼저 보여 준다
      await show('task-log-toggle');
      await read(550);
      await click('task-log-toggle');
      await waitUntil(
        '작업 내역',
        () => find('task-log-panel')?.querySelector('ol') != null,
        10000,
      );
      /*
        결과 줄을 대화 위쪽으로 올린다. 펼친 기록이 그 아래로 길게 내려오므로, 그대로 두면
        기록 끝이 입력창 뒤로 들어간다. 사람이 펼치고 나서 조금 내려 읽는 것과 같다.
      */
      find('task-log-toggle')?.parentElement?.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      await read(1500);
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
      await read(1300);
    },
  },
  {
    caption: { title: '인프라 자동 구성 기능', sub: '채팅으로 서버와 DB를 요청합니다' },
    timeScale: 20,
    run: async () => {
      await sendChat(PROMPT_INFRA);
      // 연결된 AWS 계정이 없으면 에이전트가 여기서 멈추고 안내를 편다
      await agentWorks('클라우드 안내', () => find('cloud-guide-register') != null, 25000);
      await read(1200);
    },
  },
  {
    caption: { title: 'BYOC 연결 기능', sub: '내 AWS 계정을 대화 옆에서 등록합니다' },
    run: async () => {
      // 안내에서 바로 시트를 연다. 대화와 안내는 그대로 왼쪽에 남는다
      await click('cloud-guide-register');
      await waitUntil('등록 폼', () => find('cloud-name') != null, 20000);
      await read(400);
      await type('cloud-name', '내 AWS 계정', 16);
      await fill('cloud-region', 'ap-northeast-2');
      await fill('cloud-key', 'AKIAIOSFODNN7EXAMPLE');
      await fill('cloud-secret', 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY');
      await fill('cloud-account', '481019284412');
      await read(400);
      await click('cloud-create');
      // 등록은 형식만 본 것이다. 권한 검증이 끝나야 이 프로젝트에 붙일 수 있다
      await waitUntil('검증 끝', () => find('cloud-sheet-use') != null, 25000);
    },
  },
  {
    caption: { title: '프로젝트 연결 기능', sub: '어느 계정에 만들지 프로젝트마다 고릅니다' },
    run: async () => {
      await show('cloud-sheet-use');
      await read(800);
      await click('cloud-sheet-use');
      // 시트가 닫히면 안내에 연결이 붙어 있고, 남은 일은 다시 시도뿐이다
      await waitUntil('연결됨', () => pageHasText('이 프로젝트에 연결됨'), 20000);
      await read(700);
      await click('cloud-guide-retry');
    },
  },
  {
    caption: { title: '백엔드 연동 기능', sub: '프리뷰가 서버로 바뀌어 실제로 가입됩니다' },
    // 서버를 붙여 프리뷰를 다시 띄우는 1~2분
    timeScale: 40,
    run: async () => {
      await agentWorks('서버형 프리뷰', () => pageHasText('프리뷰에서 실제로 가입'), 30000);
      await read(600);
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
      await read(450);
      await previewType(preview, '#newTodo', '시연 영상 편집하기', 14);
      await previewClick(preview, '#addForm button');
      await read(800);
    },
  },
  {
    caption: { title: '과금 자원 승인 기능', sub: '내 AWS에 만들기 전 확인합니다' },
    /*
      배속을 걸지 않는다. 이 장면은 사람이 승인 두 장을 읽고 누르는 것이 전부이고, 승인 뒤
      RDS·EC2 를 만드는 일은 대화 화면에 드러나지 않은 채 뒤에서 이어진다 — 기다리는 모습이
      없는데 ×N 을 띄우면 접지 않은 시간을 접었다고 말하는 셈이다.

      시나리오만 당겨 둔다. 마지막 장면의 인프라 탭에서 서버가 다 떠 있어야 한다.
    */
    pace: 5,
    run: async () => {
      /*
        처음 보는 승인에는 무엇이 되는지 설명이 붙어 있다. 과금이 걸린 첫 승인에서 한 번
        펼쳐 읽는다.
      */
      await agentWorks('승인 카드', () => find('approval-help') != null, 30000);
      await show('approval-card');
      await click('approval-help');
      await read(1500);
      // 첫 장은 방금 펼친 설명과 함께 읽었다
      await approve(2, 900);
      await read(400);
    },
  },
  {
    caption: { title: '배포·도메인 연결 기능', sub: '내 AWS에 올리고 내 주소를 붙입니다' },
    // 배포 계획과 빌드·업로드·인증서 발급을 기다리는 몇 분
    timeScale: 120,
    pace: 2,
    run: async () => {
      await sendChat(PROMPT_SHIP);
      await approve(2, 1300);
      await agentWorks('배포 완료', () => pageHasText('에서 열립니다'), 40000);
      await read(900);
    },
  },
  {
    caption: { title: '프로젝트 개요 기능', sub: '주소·커밋·승인 이력을 한 화면에' },
    run: async () => {
      // 목록에서 프로젝트를 골라 들어간다 — 사람이 다음에 할 일이 그것이다
      await click('nav-project');
      await read(400);
      await click('project-card');
      await waitUntil('개요', () => pageHasText('현재 URL'), 20000);
      await read(1200);
      // 시작하기를 열면 일곱 단계가 다 채워져 있다
      await click('guide-open');
      await waitUntil('시작하기 완료', () => pageHasText('모두 마쳤습니다'), 15000);
      await read(1200);
      await click('guide-open');
      await read(250);
    },
  },
  {
    caption: { title: '직접 조작 기능', sub: '채팅 없이 화면에서도 됩니다' },
    run: async () => {
      /*
        라우터로 건너뛰지 않고 탭을 누른다. "화면에서도 됩니다" 라고 말하면서 화면이
        저절로 넘어가면 자막과 화면이 어긋난다.

        승인 이력을 한 번 보고, 인프라 탭에서 서버 사양을 직접 바꾼다. 탭을 다 도는 것보다
        화면에서 무언가를 실제로 바꾸는 한 번이 이 장면의 내용이다.
      */
      await click('tab-approvals');
      await read(700);
      await click('tab-infra');
      await read(450);
      await select('server-tier', 't3.small');
      await read(700);
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
