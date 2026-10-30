/**
 * 시연 자막.
 *
 * 편집 없이 영상 하나로 끝내려면 지금 무엇을 보고 있는지가 화면 안에 있어야 한다.
 * 조작판은 두지 않는다 — 진행 표시나 버튼이 남으면 그것부터 눈에 들어온다.
 *
 * 스크림을 깔고 큰 글씨를 얹지 않는다 — 그게 화면의 주인공이 되고 제품이 뒤로 밀린다.
 * 화면 아래 가운데에 알약 하나만 띄운다. 지금 무엇을 보고 있는지 알려 주면 그걸로 끝이다.
 *
 * **영상 내내 한 자리에 붙박는다.** 시트가 열릴 때 그 왼쪽으로 비켜서게 했더니 자막이
 * 화면을 따라 움직여서 화면 요소로 읽혔다. 위치·크기는 바뀌지 않고, 바뀌는 것은 투명도와
 * 문구뿐이다. 장면 화면이 자막에 가리면 자막이 아니라 그 장면의 화면을 옮긴다.
 *
 * **무엇보다 위에 그린다.** body 바로 아래에 포털로 붙이고 z-index 를 거의 끝까지 올린다
 * — 앱 안에 두면 모달·시트(Radix 포털)·재현 창의 쌓임 맥락에 갇힐 수 있다. 시연 커서만
 * 그보다 한 칸 위다(cursor.ts). 자막 위를 지나가는 커서가 자막 밑으로 사라지면 어색하다.
 */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { subscribeDemoGitHubWindow } from '@/demo/githubWindow';
import { DEMO_START_EVENT } from '@/demo/config';
import {
  resumeDirectorIfRequested,
  startDirector,
  startDirectorOnAutoplay,
  subscribeDirector,
  type Caption,
} from '@/demo/director';

/** 접고 올리는 데 걸리는 시간. 너무 짧으면 깜빡임이고 길면 굼뜨다 */
const FADE_MS = 240;

/** 자막의 쌓임 순서. 시연 커서(cursor.ts 의 CURSOR_Z_INDEX)만 이보다 위다 */
const CAPTION_Z_INDEX = 2147483646;

/**
 * 붙박는 자리. 화면 가로 가운데, 바닥에서 76px.
 *
 * 장면마다 누르고 적는 대상(63곳)의 위치를 재서 가장 덜 가리는 자리로 골랐다. 오른쪽
 * 아래는 시트의 버튼(연결 등록·이 프로젝트에 쓰기)을 덮었고, 더 낮추면 연결 안내의 버튼과
 * 채팅 보내기 버튼에 걸렸다. 가운데 아래는 누르는 대상을 하나도 가리지 않는다.
 */
const CAPTION_BOTTOM = 76;

/*
  자막은 언제나 한 줄이다. 두 줄로 접히면 알약이 아니라 상자가 되고, 장면마다 높이가 달라져
  붙박은 자리가 흔들린다. 그래서 폭을 막지 않고 글자 길이대로 둔다 — 줄여야 하는 것은 폭이
  아니라 문구다. 가장 긴 것(GitHub 로그인 장면, 재현 표시 포함)이 약 550px 이다.
*/

function DemoCaption() {
  /** 지금 그리고 있는 자막. 다음 것이 와도 접히는 동안은 이쪽이 남는다 */
  const [shown, setShown] = useState<{ caption: Caption; sceneTimeScale: number } | null>(null);
  /** 지금 시계를 접고 있는지. 같은 장면 안에서도 사람이 읽고 누르는 동안은 내려간다 */
  const [fastForward, setFastForward] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /*
    GitHub 화면은 시연 빌드 안에서 재현한 것이다(DemoGitHubWindow). 그 화면이 떠 있는
    동안만 자막에 재현이라고 보인다 — 장면 전체에 보이면 우리 화면까지 재현처럼 읽히고,
    승인 뒤 우리 콜백 주소로 바뀐 창은 재현이 아니다.
  */
  const [reproducing, setReproducing] = useState(false);
  useEffect(
    () => subscribeDemoGitHubWindow((next) => setReproducing(next?.phase === 'github')),
    [],
  );

  useEffect(() => {
    let timer = 0;
    let currentTitle: string | null = null;
    let currentError: string | null = null;

    const unsubscribe = subscribeDirector((next) => {
      if (next.error !== currentError) {
        currentError = next.error;
        setError(next.error);
      }

      setFastForward(next.timeScale > 1);

      const title = next.caption?.title ?? null;
      if (title === currentTitle) return;
      currentTitle = title;

      /*
        접었다가 올린다.

        상태 두 개(무엇을 그릴지 · 보일지)를 시차를 두고 바꿔야 앞 자막이 사라지고
        나서 다음 자막이 올라온다. 한 번에 바꾸면 글자만 툭 갈려서 영상 자막이 아니라
        화면 요소로 읽힌다.
      */
      setVisible(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setShown(
          next.caption ? { caption: next.caption, sceneTimeScale: next.sceneTimeScale } : null,
        );
        setVisible(next.caption != null);
      }, FADE_MS);
    });

    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  /*
    시작 버튼이 새로고침을 끼우고 떠났다면 돌아온 뒤 여기서 이어받는다. 아니면 주소에
    `?autoplay` 가 있을 때 혼자 시작한다 — 녹화가 그 길로 들어온다.
  */
  useEffect(() => {
    if (resumeDirectorIfRequested()) return;
    startDirectorOnAutoplay();
  }, []);

  /*
    사람이 랜딩의 시작 버튼을 누르면 여기서 재생을 시작한다(config 의 DEMO_START_EVENT).
    재생이 이미 돌고 있으면(첫 장면이 그 버튼을 누른 경우) 그대로 넘어간다.
  */
  useEffect(() => {
    const start = () => startDirector({ loginPressed: true });
    window.addEventListener(DEMO_START_EVENT, start);
    return () => window.removeEventListener(DEMO_START_EVENT, start);
  }, []);

  if (error) {
    return createPortal(
      <div className="pointer-events-none fixed left-6 top-6" style={{ zIndex: CAPTION_Z_INDEX }}>
        <p className="rounded-full bg-[#7f1d1d] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          {error}
        </p>
      </div>,
      document.body,
    );
  }

  if (!shown) return null;

  /*
    올라오고 접히는 것은 투명도로만 한다. 예전에는 6px 미끄러지며 올라왔는데, 그것도
    위치가 바뀌는 것이라 붙박은 자막과 맞지 않는다.
  */
  return createPortal(
    <div
      data-demo-caption
      className="pointer-events-none fixed"
      style={{
        left: '50%',
        bottom: CAPTION_BOTTOM,
        transform: 'translateX(-50%)',
        zIndex: CAPTION_Z_INDEX,
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <p className="flex items-baseline gap-2.5 whitespace-nowrap rounded-full bg-white px-6 py-3 shadow-[0_4px_20px_rgba(15,23,42,0.16),0_1px_3px_rgba(15,23,42,0.1)]">
        <span className="whitespace-nowrap text-[17px] font-bold tracking-[-0.01em] text-[#0f172a]">
          {shown.caption.title}
        </span>
        {shown.caption.sub ? (
          <span className="whitespace-nowrap text-[13.5px] font-medium text-[#64748b]">
            {shown.caption.sub}
          </span>
        ) : null}
        {/*
          재현 표시도 배속 표시처럼 장면 내내 자리를 잡아 두고 켜고 끈다. 재현 창이 뜨고 닫힐
          때마다 자막 폭이 바뀌면 붙박은 자막의 왼쪽 끝이 움직인다.
        */}
        {shown.caption.note ? (
          <span
            className="self-center whitespace-nowrap rounded-full bg-[#eef2f6] px-2 py-0.5 text-[12px] font-semibold text-[#475569] transition-opacity duration-200"
            style={{ opacity: reproducing ? 1 : 0 }}
          >
            {shown.caption.note}
          </span>
        ) : null}
        {/*
          배속 표시는 자리를 잡아 두고 켜고 끈다. 에이전트를 기다리는 동안만 켜지는데, 그때마다
          자막 폭이 바뀌면 알약이 출렁인다.
        */}
        {shown.sceneTimeScale > 1 ? (
          <span
            className="whitespace-nowrap font-mono text-[11px] font-semibold text-[#94a3b8] transition-opacity duration-200"
            style={{ opacity: fastForward ? 1 : 0 }}
          >
            ×{shown.sceneTimeScale}
          </span>
        ) : null}
      </p>
    </div>,
    document.body,
  );
}

export default DemoCaption;
