/**
 * 시연 자막.
 *
 * 편집 없이 영상 하나로 끝내려면 지금 무엇을 보고 있는지가 화면 안에 있어야 한다.
 * 조작판은 두지 않는다 — 진행 표시나 버튼이 남으면 그것부터 눈에 들어온다.
 *
 * 시간을 접은 구간은 배속을 밝힌다. 조용히 빠르게 만들면 보는 사람이 실제 소요
 * 시간을 오해한다.
 */
import { useEffect, useState } from 'react';
import { resumeDirectorIfRequested, subscribeDirector, type DirectorSnapshot } from '@/demo/director';

function DemoCaption() {
  const [snapshot, setSnapshot] = useState<DirectorSnapshot | null>(null);

  useEffect(() => subscribeDirector(setSnapshot), []);

  // 시작 버튼이 새로고침을 끼우고 떠났다면 돌아온 뒤 여기서 이어받는다
  useEffect(() => {
    resumeDirectorIfRequested();
  }, []);

  if (!snapshot) return null;

  const { caption, speed, error } = snapshot;

  if (error) {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-5 z-[200] flex justify-center px-4">
        <p className="max-w-[520px] rounded-xl bg-[#7f1d1d]/95 px-4 py-2.5 text-[13px] font-medium text-white shadow-lg backdrop-blur">
          {error}
        </p>
      </div>
    );
  }

  if (!caption) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-[200] flex justify-center px-4">
      <div
        // 자막이 바뀔 때마다 새로 마운트해 페이드가 다시 돈다
        key={caption.title}
        className="flex max-w-[640px] animate-[demoCaptionIn_320ms_ease-out] items-center gap-4 rounded-2xl bg-[#0b1220]/92 px-6 py-3.5 shadow-[0_12px_40px_rgba(2,6,23,0.45)] backdrop-blur-md"
      >
        <div className="min-w-0">
          <p className="text-[19px] font-semibold leading-tight tracking-[-0.01em] text-white">
            {caption.title}
          </p>
          {caption.sub ? (
            <p className="mt-1 text-[13.5px] leading-snug text-white/60">{caption.sub}</p>
          ) : null}
        </div>
        {speed > 1 ? (
          <span className="shrink-0 rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white/75">
            ×{speed} 배속
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default DemoCaption;
