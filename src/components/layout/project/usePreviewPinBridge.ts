import { useCallback, useEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import {
  BRIDGE_READY_TIMEOUT_MS,
  MAX_PREVIEW_PINS,
  bridgeRequest,
  parseBridgeMessage,
  scopesOf,
  type PinBounds,
  type PreviewPinMark,
} from '@/lib/previewPin';

export type PinBridgeStatus = 'pending' | 'ready' | 'unavailable';

/**
 * 프리뷰 문서의 짚기 브리지와 이야기한다(설계 §16.4·§16.5).
 *
 * - iframe 이 새로 뜰 때마다 `hello` 를 보내고 1.5초 안에 `ready` 가 오는지 본다. 상태는 프레임마다 따로다 — 앞 프레임의
 *   `ready` 가 새 프레임의 것으로 읽히면 브리지가 없는 문서에서 짚기 버튼이 켜진다.
 * - 답은 그 iframe 의 창에서 온 것만 받는다(`event.source`). 오리진은 "null" 이라 보지 않는다.
 * - 보낼 때 targetOrigin 은 `'*'` 다. 불투명 오리진에는 이름이 없고, 보내는 것은 좌표뿐이다.
 */
export function usePreviewPinBridge({
  iframeRef,
  frameKey,
  previewUrl,
  setMarks,
}: {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  frameKey: number;
  previewUrl: string;
  setMarks: Dispatch<SetStateAction<PreviewPinMark[]>>;
}) {
  const frame = `${frameKey}|${previewUrl}`;
  const frameRef = useRef(frame);
  const [readyFor, setReadyFor] = useState<string | null>(null);
  const [silentFor, setSilentFor] = useState<string | null>(null);
  const [hoverState, setHoverState] = useState<{ frame: string; bounds: PinBounds | null }>({ frame, bounds: null });
  const hoverInFlight = useRef(false);
  const nextHover = useRef<{ x: number; y: number } | null>(null);
  const counter = useRef(0);

  const status: PinBridgeStatus = readyFor === frame ? 'ready' : silentFor === frame ? 'unavailable' : 'pending';
  const hover = hoverState.frame === frame ? hoverState.bounds : null;

  const post = useCallback(
    (body: Record<string, unknown>) => {
      const target = iframeRef.current?.contentWindow;
      if (!target) return false;
      target.postMessage(bridgeRequest(body), '*');
      return true;
    },
    [iframeRef],
  );

  useEffect(() => {
    frameRef.current = frame;
    hoverInFlight.current = false;
    nextHover.current = null;
    const node = iframeRef.current;
    let timer = 0;
    const greet = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setSilentFor(frame), BRIDGE_READY_TIMEOUT_MS);
      post({ type: 'hello' });
    };
    // 문서가 새로 뜨면(새로고침·앱 안의 이동) 짚어 둔 곳의 테두리는 그 자리를 더는 가리키지 않는다. 칩은 남는다
    const onLoad = () => {
      setMarks((marks) => (marks.some((mark) => !mark.stale) ? marks.map((mark) => ({ ...mark, stale: true })) : marks));
      greet();
    };
    greet();
    node?.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(timer);
      node?.removeEventListener('load', onLoad);
    };
  }, [frame, iframeRef, post, setMarks]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const frameWindow = iframeRef.current?.contentWindow;
      if (!frameWindow || event.source !== frameWindow) return;
      const message = parseBridgeMessage(event.data);
      if (!message) return;
      if (message.type === 'ready') {
        setReadyFor(frameRef.current);
        return;
      }
      if (message.type === 'hit') {
        hoverInFlight.current = false;
        setHoverState({ frame: frameRef.current, bounds: message.bounds ?? null });
        const queued = nextHover.current;
        if (queued) {
          nextHover.current = null;
          hoverInFlight.current = post({ type: 'hover', ...queued });
        }
        return;
      }
      setMarks((marks) =>
        marks.map((mark) =>
          mark.ref === message.id
            ? {
                ...mark,
                result: message.result,
                waiting: false,
                stale: false,
                scope: Math.max(0, Math.min(scopesOf(message.result).length - 1, message.result.defaultScope ?? 0)),
              }
            : mark,
        ),
      );
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [iframeRef, post, setMarks]);

  /** 포인터가 지나는 자리의 요소 테두리. 한 번에 하나만 묻고, 그동안 온 마지막 자리는 다음에 묻는다 */
  const requestHover = useCallback(
    (x: number, y: number) => {
      if (hoverInFlight.current) {
        nextHover.current = { x, y };
        return;
      }
      hoverInFlight.current = post({ type: 'hover', x, y });
    },
    [post],
  );

  const clearHover = useCallback(() => setHoverState({ frame: frameRef.current, bounds: null }), []);

  /**
   * 짚는다. 더 짚기(add)면 새 곳을 더하고, 아니면 마지막 곳을 바꾼다. 5곳이 찼으면 더하지 않고 마지막 곳을 바꾼다.
   * 답이 오기 전에 같은 곳을 다시 짚으면 앞의 답은 짝이 없어 버려진다(곳마다 새 id).
   */
  const probe = useCallback(
    (where: { x: number; y: number } | { rect: PinBounds }, add: boolean) => {
      counter.current += 1;
      const ref = `p${counter.current}`;
      const fresh: PreviewPinMark = { ref, result: null, scope: 0, waiting: true, stale: false };
      setMarks((marks) =>
        (add || marks.length === 0) && marks.length < MAX_PREVIEW_PINS
          ? [...marks, fresh]
          : [...marks.slice(0, -1), fresh],
      );
      post('rect' in where ? { type: 'probe', id: ref, rect: where.rect } : { type: 'probe', id: ref, ...where });
    },
    [post, setMarks],
  );

  /** 휠을 프리뷰 스크롤로. 스크롤하면 짚어 둔 곳의 테두리는 그 자리를 더는 가리키지 않는다 */
  const scroll = useCallback(
    (dx: number, dy: number) => {
      if (post({ type: 'scroll', dx, dy })) {
        clearHover();
        setMarks((marks) => (marks.some((mark) => !mark.stale) ? marks.map((mark) => ({ ...mark, stale: true })) : marks));
      }
    },
    [clearHover, post, setMarks],
  );

  return { status, hover, clearHover, requestHover, probe, scroll };
}

export type PreviewPinBridge = ReturnType<typeof usePreviewPinBridge>;
