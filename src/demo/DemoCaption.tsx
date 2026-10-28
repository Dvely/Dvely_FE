/**
 * 시연 자막.
 *
 * 편집 없이 영상 하나로 끝내려면 지금 무엇을 보고 있는지가 화면 안에 있어야 한다.
 * 조작판은 두지 않는다 — 진행 표시나 버튼이 남으면 그것부터 눈에 들어온다.
 *
 * 영화 자막이 아니라 화면 구석에 붙는 라벨이다. 가운데에 스크림을 깔고 큰 글씨를
 * 얹으면 그게 화면의 주인공이 되고 제품이 뒤로 밀린다. 좌상단에 알약 하나만 띄운다 —
 * 지금 무엇을 보고 있는지 알려 주면 그걸로 끝이다.
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
      <div className="pointer-events-none fixed left-6 top-6 z-[200]">
        <p className="rounded-full bg-[#7f1d1d] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg">
          {error}
        </p>
      </div>
    );
  }

  if (!shown) return null;

  return (
    <div
      data-demo-caption
      className="pointer-events-none fixed left-6 top-6 z-[200]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <p className="flex max-w-[560px] items-baseline gap-2.5 rounded-full bg-white px-6 py-3 shadow-[0_4px_20px_rgba(15,23,42,0.16),0_1px_3px_rgba(15,23,42,0.1)]">
        <span className="whitespace-nowrap text-[17px] font-bold tracking-[-0.01em] text-[#0f172a]">
          {shown.caption.title}
        </span>
        {shown.caption.sub ? (
          <span className="text-[13.5px] font-medium text-[#64748b]">{shown.caption.sub}</span>
        ) : null}
        {shown.speed > 1 ? (
          <span className="whitespace-nowrap font-mono text-[11px] font-semibold text-[#94a3b8]">
            ×{shown.speed}
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default DemoCaption;
