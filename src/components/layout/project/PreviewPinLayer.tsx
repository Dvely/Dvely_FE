import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { PreviewPinBridge } from '@/components/layout/project/usePreviewPinBridge';
import {
  DRAG_THRESHOLD_PX,
  MAX_PREVIEW_PINS,
  circled,
  markBounds,
  markLabel,
  scopeLabel,
  scopesOf,
  type PinBounds,
  type PreviewPinMark,
} from '@/lib/previewPin';

type PreviewPinOverlayProps = {
  bridge: PreviewPinBridge;
  marks: PreviewPinMark[];
  setMarks: Dispatch<SetStateAction<PreviewPinMark[]>>;
  onExit: () => void;
};

type Point = { x: number; y: number; px: number; py: number };

const pct = (v: number) => `${v * 100}%`;
const boxStyle = (b: PinBounds) => ({ left: pct(b.x), top: pct(b.y), width: pct(b.w), height: pct(b.h) });

/**
 * 짚기 모드의 iframe 위 투명 덮개. 이 동안 앱은 클릭을 받지 않는다 — 누름은 짚기가 되고, 휠은 프리뷰 스크롤로 넘긴다.
 * 탭하면 요소, 10px 넘게 끌면 영역, Shift 로 더 짚기(5곳까지), Alt+↑↓ 로 범위를 넓히고 좁힌다, Esc 로 끝낸다.
 */
export function PreviewPinOverlay({ bridge, marks, setMarks, onExit }: PreviewPinOverlayProps) {
  const surface = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<{ start: Point; now: Point; add: boolean } | null>(null);
  const active = marks.length - 1;
  const activeMark = marks[active];
  const ladder = activeMark ? scopesOf(activeMark.result) : [];

  const at = (event: { clientX: number; clientY: number }): Point | null => {
    const rect = surface.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return null;
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    return { px, py, x: Math.min(1, Math.max(0, px / rect.width)), y: Math.min(1, Math.max(0, py / rect.height)) };
  };

  const setScope = useCallback(
    (index: number) => {
      setMarks((list) =>
        list.map((mark, i) => {
          if (i !== list.length - 1) return mark;
          const size = scopesOf(mark.result).length;
          return size ? { ...mark, scope: Math.max(0, Math.min(size - 1, index)) } : mark;
        }),
      );
    },
    [setMarks],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onExit();
        return;
      }
      if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown') && activeMark) {
        event.preventDefault();
        setScope(activeMark.scope + (event.key === 'ArrowUp' ? 1 : -1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMark, onExit, setScope]);

  // 휠은 프리뷰 스크롤로 넘긴다. React 의 onWheel 은 수동(passive)이라 기본 동작을 막지 못해 직접 단다
  const { scroll } = bridge;
  useEffect(() => {
    const node = surface.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scroll(event.deltaX, event.deltaY);
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [scroll]);

  const dragRect = drag
    ? {
        x: Math.min(drag.start.x, drag.now.x),
        y: Math.min(drag.start.y, drag.now.y),
        w: Math.abs(drag.now.x - drag.start.x),
        h: Math.abs(drag.now.y - drag.start.y),
      }
    : null;
  const isDragging = drag !== null && Math.hypot(drag.now.px - drag.start.px, drag.now.py - drag.start.py) > DRAG_THRESHOLD_PX;
  const full = marks.length >= MAX_PREVIEW_PINS;

  return (
    <div className="absolute inset-0 z-10" data-testid="preview-pin-overlay">
      <div
        ref={surface}
        role="application"
        aria-label="프리뷰 짚기 — 고칠 곳을 누르거나 끌어서 고르세요"
        className="absolute inset-0 cursor-crosshair"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          const point = at(event);
          if (!point) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDrag({ start: point, now: point, add: event.shiftKey });
        }}
        onPointerMove={(event) => {
          const point = at(event);
          if (!point) return;
          if (drag) {
            setDrag({ ...drag, now: point });
            return;
          }
          bridge.requestHover(point.x, point.y);
        }}
        onPointerUp={(event) => {
          const point = at(event);
          const started = drag;
          setDrag(null);
          if (!point || !started) return;
          const add = started.add || event.shiftKey;
          if (Math.hypot(point.px - started.start.px, point.py - started.start.py) > DRAG_THRESHOLD_PX) {
            const rect = {
              x: Math.min(started.start.x, point.x),
              y: Math.min(started.start.y, point.y),
              w: Math.abs(point.x - started.start.x),
              h: Math.abs(point.y - started.start.y),
            };
            if (rect.w > 0 && rect.h > 0) bridge.probe({ rect }, add);
            return;
          }
          bridge.probe({ x: point.x, y: point.y }, add);
        }}
        onPointerLeave={() => {
          if (!drag) bridge.clearHover();
        }}
      />

      {bridge.hover && !isDragging ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-[3px] border-2 border-dashed border-[#7c3aed] bg-[#7c3aed]/5"
          style={boxStyle(bridge.hover)}
        />
      ) : null}

      {marks.map((mark, index) => {
        const bounds = mark.stale ? null : markBounds(mark);
        if (!bounds) return null;
        return (
          <div
            key={mark.ref}
            aria-hidden="true"
            className={`pointer-events-none absolute rounded-[3px] border-2 ${
              index === active ? 'border-[#7c3aed] bg-[#7c3aed]/10' : 'border-[#a78bfa] bg-[#a78bfa]/5'
            }`}
            style={boxStyle(bounds)}
          >
            {/* 배지는 이미 원이라 안에는 숫자만 쓴다(①을 넣으면 원이 겹친다) */}
            <span className="absolute -top-3 -left-3 flex size-6 items-center justify-center rounded-full bg-[#7c3aed] text-[12px] font-bold text-white shadow">
              {index + 1}
            </span>
          </div>
        );
      })}

      {isDragging && dragRect ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute border-2 border-[#7c3aed] bg-[#7c3aed]/10"
          style={boxStyle(dragRect)}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-3">
        {activeMark && ladder.length > 1 && !activeMark.waiting ? (
          <div
            role="radiogroup"
            aria-label={`${circled(active + 1)} 범위 — Alt+위·아래로 넓히고 좁힙니다`}
            className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1 rounded-xl border border-[#e2e8f0] bg-white/95 p-1 shadow-md"
          >
            <span className="px-1.5 text-[12px] font-semibold text-[#7c3aed]">{circled(active + 1)}</span>
            {ladder.map((scope, index) => (
              <button
                key={`${scope.kind}-${index}`}
                type="button"
                role="radio"
                aria-checked={index === activeMark.scope}
                onClick={() => setScope(index)}
                className={`max-w-[220px] cursor-pointer truncate rounded-lg px-2.5 py-1 text-[12px] transition ${
                  index === activeMark.scope
                    ? 'bg-[#7c3aed] font-semibold text-white'
                    : 'text-[#334155] hover:bg-[#f1f5f9]'
                }`}
              >
                {scopeLabel(scope)}
              </button>
            ))}
          </div>
        ) : null}
        <p className="rounded-full bg-[#0f172a]/85 px-3 py-1.5 text-center text-[12px] text-white">
          {full
            ? `${MAX_PREVIEW_PINS}곳을 모두 짚었습니다 · 누르면 마지막 곳을 바꿉니다 · Esc 끝내기`
            : activeMark
              ? `${circled(active + 1)} ${markLabel(activeMark)} · Shift+누르기로 더 짚기 · Esc 끝내기`
              : '고칠 곳을 누르세요 · 끌면 영역 · Shift+누르기로 더 짚기 · Esc 끝내기'}
        </p>
      </div>
    </div>
  );
}
