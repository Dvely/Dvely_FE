/**
 * 시연 자막.
 *
 * 편집 없이 영상 하나로 끝내려면 지금 무엇을 보고 있는지가 화면 안에 있어야 한다.
 * 조작판은 두지 않는다 — 진행 표시나 버튼이 남으면 그것부터 눈에 들어온다.
 *
 * 화면 맨 위 한 줄로만 쓴다. 앞서 제목·부제를 두 줄로 크게 깔았더니 자막이 아니라
 * 그게 화면의 주인공이 됐다. 자막은 무엇을 보는지 알려 주면 되고, 보여 줄 것은
 * 그 아래 제품이다.
 */
import { useEffect, useState } from 'react';
import { resumeDirectorIfRequested, subscribeDirector, type Caption } from '@/demo/director';

/** 접고 올리는 데 걸리는 시간. 너무 짧으면 깜빡임이고 길면 굼뜨다 */
const FADE_MS = 240;

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
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] flex justify-center px-6">
        <p className="rounded bg-[#7f1d1d]/95 px-3.5 py-2 text-[12.5px] font-medium text-white shadow-lg">
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
        얕은 스크림 한 겹만 깐다. 밝은 UI 위에서 흰 글자가 읽힐 만큼이면 되고,
        그보다 진하면 가리는 쪽이 커진다.
      */
      style={{
        paddingTop: 13,
        paddingBottom: 22,
        background:
          'linear-gradient(to bottom, rgba(2,6,23,0.62) 0%, rgba(2,6,23,0.34) 55%, rgba(2,6,23,0) 100%)',
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <p
        className="flex max-w-[860px] flex-wrap items-baseline justify-center gap-x-2.5 px-6 text-center"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-4px)',
          transition: `transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          textShadow: '0 1px 10px rgba(2,6,23,0.9), 0 1px 2px rgba(2,6,23,0.8)',
        }}
      >
        <span className="text-[16px] font-semibold tracking-[-0.01em] text-white">
          {shown.caption.title}
        </span>
        {shown.caption.sub ? (
          <>
            <span className="text-[13px] text-white/35" aria-hidden>
              ·
            </span>
            <span className="text-[13.5px] font-normal text-white/80">{shown.caption.sub}</span>
          </>
        ) : null}
        {shown.speed > 1 ? (
          <span className="font-mono text-[10.5px] font-medium tracking-[0.14em] text-white/50">
            ×{shown.speed}
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default DemoCaption;
