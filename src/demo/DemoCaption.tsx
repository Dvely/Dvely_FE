/**
 * 시연 자막.
 *
 * 편집 없이 영상 하나로 끝내려면 지금 무엇을 보고 있는지가 화면 안에 있어야 한다.
 * 조작판은 두지 않는다 — 진행 표시나 버튼이 남으면 그것부터 눈에 들어온다.
 *
 * 장면이 바뀔 때 글자가 툭 갈리면 화면 요소처럼 보인다. 앞 자막을 먼저 접고 잠깐
 * 비운 뒤 다음 자막을 올린다 — 영상 자막이 그렇게 넘어간다.
 */
import { useEffect, useState } from 'react';
import {
  resumeDirectorIfRequested,
  subscribeDirector,
  type Caption,
} from '@/demo/director';

/** 접고 올리는 데 걸리는 시간. 너무 짧으면 깜빡임이고 길면 굼뜨다 */
const FADE_MS = 260;

function DemoCaption() {
  /** 지금 그리고 있는 자막. 다음 것이 와도 접히는 동안은 이쪽이 남는다 */
  const [shown, setShown] = useState<{ caption: Caption; speed: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer = 0;
    let currentTitle: string | null = null;
    let currentError: string | null = null;

    const unsubscribe = subscribeDirector((next) => {
      if (next.error !== currentError) {
        currentError = next.error;
        setError(next.error);
      }

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
        setShown(next.caption ? { caption: next.caption, speed: next.speed } : null);
        setVisible(next.caption != null);
      }, FADE_MS);
    });

    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  // 시작 버튼이 새로고침을 끼우고 떠났다면 돌아온 뒤 여기서 이어받는다
  useEffect(() => {
    resumeDirectorIfRequested();
  }, []);

  if (error) {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-6 z-[200] flex justify-center px-6">
        <p className="rounded bg-[#7f1d1d]/95 px-4 py-2.5 text-[13px] font-medium text-white shadow-lg">
          {error}
        </p>
      </div>
    );
  }

  if (!shown) return null;

  return (
    <div
      data-demo-caption
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-center"
      /*
        위쪽을 살짝 어둡게 깔아 흰 화면 위에서도 글자가 뜬다. 테두리 있는 상자를 얹으면
        제품 UI 의 일부처럼 읽히는데, 스크림은 영상 위에 올린 자막으로 읽힌다.
      */
      style={{
        paddingTop: 30,
        paddingBottom: 58,
        background:
          'linear-gradient(to bottom, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.7) 34%, rgba(2,6,23,0.28) 72%, rgba(2,6,23,0) 100%)',
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <div
        className="flex max-w-[720px] flex-col items-center px-8 text-center"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
          transition: `transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <p
          className="text-[25px] font-semibold leading-[1.25] tracking-[-0.018em] text-white"
          style={{ textShadow: '0 2px 20px rgba(2,6,23,0.9), 0 1px 3px rgba(2,6,23,0.8)' }}
        >
          {shown.caption.title}
        </p>
        {shown.caption.sub ? (
          <p
            className="mt-2 text-[14.5px] font-normal leading-snug text-white/85"
            style={{ textShadow: '0 1px 14px rgba(2,6,23,0.85)' }}
          >
            {shown.caption.sub}
          </p>
        ) : null}
        {shown.speed > 1 ? (
          <span
            className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/60"
            style={{ textShadow: '0 1px 10px rgba(2,6,23,0.7)' }}
          >
            ×{shown.speed} speed
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default DemoCaption;
