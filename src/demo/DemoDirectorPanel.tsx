/**
 * 자동 재생 조작판.
 *
 * 시연 모드에서만 뜬다. 촬영 중에는 화면에 남으면 안 되므로 `H` 로 통째로 감출 수
 * 있고, 감춰도 재생은 계속 돈다 — 시작만 누르고 숨긴 뒤 찍으면 된다.
 */
import { useEffect, useState } from 'react';
import {
  resumeDirectorIfRequested,
  startDirector,
  stopDirector,
  subscribeDirector,
  type DirectorSnapshot,
} from '@/demo/director';

function DemoDirectorPanel() {
  const [snapshot, setSnapshot] = useState<DirectorSnapshot | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => subscribeDirector(setSnapshot), []);

  // 시작 버튼은 새로고침을 끼우고 떠난다. 돌아온 뒤 이어받는 자리가 여기다
  useEffect(() => {
    resumeDirectorIfRequested();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // 입력 중에 눌린 H 까지 잡으면 글자를 못 친다
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'h' || event.key === 'H' || event.key === 'ㅗ') {
        setHidden((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!snapshot || hidden) return null;

  const { running, index, total, title, error } = snapshot;

  return (
    <div className="fixed bottom-5 right-5 z-[100] select-none font-sans">
      {running ? (
        <div className="flex w-[260px] flex-col gap-2 rounded-xl bg-[#0f172a]/95 px-4 py-3 text-white shadow-[0_8px_30px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a5b4fc]">
              자동 재생 {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={stopDirector}
              className="rounded-md border border-white/20 px-2 py-0.5 text-[10px] font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              정지
            </button>
          </div>
          <p className="text-[13px] font-semibold leading-snug">{title}</p>
          <div className="flex gap-1">
            {Array.from({ length: total }, (_, position) => (
              <span
                key={position}
                className={
                  position <= index
                    ? 'h-1 flex-1 rounded-full bg-[#a5b4fc]'
                    : 'h-1 flex-1 rounded-full bg-white/15'
                }
              />
            ))}
          </div>
          <p className="text-[10px] text-white/40">H 키로 이 패널을 감춥니다</p>
        </div>
      ) : (
        <div className="flex flex-col items-end gap-2">
          {error ? (
            <p className="max-w-[280px] rounded-lg bg-[#7f1d1d] px-3 py-2 text-[11px] leading-relaxed text-white shadow-lg">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={startDirector}
            className="flex items-center gap-2 rounded-full bg-[#0f172a] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_30px_rgba(15,23,42,0.3)] transition hover:bg-[#1e293b]"
          >
            <span aria-hidden>▶</span>
            시연 자동 재생
          </button>
        </div>
      )}
    </div>
  );
}

export default DemoDirectorPanel;
