/**
 * 서버 프리뷰에서 짚기(Dvely_FE #211, BE #575 · 설계 docs/device-preview-share-design.md §16).
 *
 * 프리뷰 문서에는 게이트웨이가 넣은 짚기 브리지가 있다. 부모(이 화면)가 postMessage 로 물으면 브리지가 그 자리의 요소를
 * 읽어 답한다. 프리뷰 문서는 CSP sandbox 라 오리진이 "null" 이고, 그 안의 코드(사용자의 앱)도 같은 창에서 메시지를 보낼 수
 * 있다 — 그래서 답은 **데이터로만** 다룬다. 칩 이름을 그리는 데 쓰고, 서버로는 받은 그대로 보내 서버가 다시 검사한다.
 */

export const PIN_PROTOCOL = 'pin';
export const PIN_VERSION = 1;
/** 한 메시지에 붙일 수 있는 곳(①~⑤). 서버 상한과 같다 */
export const MAX_PREVIEW_PINS = 5;
/** 이 거리(px)보다 많이 끌면 영역이다(§15.4 뷰어와 같다) */
export const DRAG_THRESHOLD_PX = 10;
/** 브리지가 이 안에 `ready` 를 보내지 않으면 짚을 수 없는 프리뷰로 본다 */
export const BRIDGE_READY_TIMEOUT_MS = 1500;

const CIRCLED = ['①', '②', '③', '④', '⑤'];

export function circled(position: number): string {
  return CIRCLED[position - 1] ?? `(${position})`;
}

/** 0~1 비율의 사각형 */
export type PinBounds = { x: number; y: number; w: number; h: number };

export type PinScope = {
  kind: string;
  type?: string;
  text?: string;
  id?: string;
  selector?: string;
  component?: string;
  members?: number;
  bounds?: PinBounds;
};

/** 브리지가 낸 짚기 결과 중 화면이 읽는 부분. 나머지 필드는 그대로 서버로 간다 */
export type PinResult = {
  probeId: string;
  ok: boolean;
  reason?: string;
  element?: { type?: string; text?: string; id?: string; selector?: string; bounds?: PinBounds };
  scopes?: PinScope[];
  defaultScope?: number;
  [key: string]: unknown;
};

export type PreviewPinMark = {
  /** 짚기 id(`p1`…). 브리지의 답을 이 곳에 짝짓는다 */
  ref: string;
  result: PinResult | null;
  /** 고른 사다리 칸 */
  scope: number;
  /** 답을 기다리는 중 */
  waiting: boolean;
  /** 짚은 뒤 프리뷰가 스크롤·새로고침돼 테두리가 그 자리를 가리키지 않는다 */
  stale: boolean;
};

export type BridgeMessage =
  | { type: 'ready'; caps: string[] }
  | { type: 'hit'; x: number; y: number; bounds?: PinBounds }
  | { type: 'result'; id: string; result: PinResult };

const isRatio = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1;

export function cleanBounds(value: unknown): PinBounds | null {
  if (!value || typeof value !== 'object') return null;
  const b = value as Record<string, unknown>;
  if (!isRatio(b.x) || !isRatio(b.y) || !isRatio(b.w) || !isRatio(b.h)) return null;
  if (b.w <= 0 || b.h <= 0) return null;
  return { x: b.x, y: b.y, w: Math.min(b.w, 1 - b.x), h: Math.min(b.h, 1 - b.y) };
}

/**
 * 브리지의 답인지 본다. 보낸 창은 부르는 쪽이 `event.source === iframe.contentWindow` 로 이미 확인했다 — 여기서는
 * 모양만 본다. 모르는 모양은 버린다.
 */
export function parseBridgeMessage(data: unknown): BridgeMessage | null {
  if (!data || typeof data !== 'object') return null;
  const message = data as Record<string, unknown>;
  if (message.qeploy !== PIN_PROTOCOL || message.v !== PIN_VERSION) return null;
  switch (message.type) {
    case 'ready':
      return {
        type: 'ready',
        caps: Array.isArray(message.caps) ? message.caps.filter((c): c is string => typeof c === 'string') : [],
      };
    case 'hit': {
      if (!isRatio(message.x) || !isRatio(message.y)) return null;
      const bounds = cleanBounds(message.bounds);
      return bounds ? { type: 'hit', x: message.x, y: message.y, bounds } : { type: 'hit', x: message.x, y: message.y };
    }
    case 'result': {
      const result = message.result;
      if (typeof message.id !== 'string' || !result || typeof result !== 'object') return null;
      const pin = result as PinResult;
      if (pin.probeId !== message.id || typeof pin.ok !== 'boolean') return null;
      return { type: 'result', id: message.id, result: pin };
    }
    default:
      return null;
  }
}

export function bridgeRequest(body: Record<string, unknown>): Record<string, unknown> {
  return { qeploy: PIN_PROTOCOL, v: PIN_VERSION, ...body };
}

// ── 이름(서버 PinResultSanitizer 의 viewerLabel · scopeLabel · placeLabel 과 같은 뜻) ──────────────

const MAX_LABEL = 80;

function cut(value: string, max: number): string {
  const points = Array.from(value);
  return points.length > max ? points.slice(0, max).join('') : value;
}

const GROUP_WORDS: Record<string, string> = {
  form: '폼',
  nav: '메뉴',
  navigation: '메뉴',
  menu: '메뉴',
  menubar: '메뉴',
  header: '머리글',
  banner: '머리글',
  toolbar: '머리글',
  footer: '바닥글',
  contentinfo: '바닥글',
  main: '본문',
  section: '구역',
  region: '구역',
  article: '글 묶음',
  aside: '곁 내용',
  complementary: '곁 내용',
  dialog: '대화 상자',
  alertdialog: '대화 상자',
  alert: '대화 상자',
  ul: '목록',
  ol: '목록',
  list: '목록',
  table: '목록',
  tablist: '목록',
  grid: '목록',
  li: '항목',
  listitem: '항목',
  row: '항목',
  cell: '항목',
  fieldset: '입력 묶음',
  group: '묶음',
};

export function groupWord(type: string | undefined): string {
  const key = (type ?? '').toLowerCase();
  if (!key) return '덩어리';
  return GROUP_WORDS[key] ?? `<${type}>`;
}

/** 요소의 짧은 이름: `<button> "저장"` · `<input> #email` */
export function elementLabel(element: { type?: string; text?: string; id?: string } | undefined): string | null {
  if (!element) return null;
  let out = element.type ? `<${element.type}>` : '';
  if (element.text) out += `${out ? ' ' : ''}"${element.text}"`;
  else if (element.id) out += `${out ? ' ' : ''}#${element.id}`;
  return out ? cut(out, MAX_LABEL) : null;
}

function named(word: string, scope: PinScope): string {
  if (scope.id) return `${word} #${scope.id}`;
  if (scope.text) return `${word} "${cut(scope.text, 20)}"`;
  return word;
}

/** 사다리 칸 하나의 이름: `폼 #profile` · `컴포넌트 ProfileForm` · `화면 전체` */
export function scopeLabel(scope: PinScope): string {
  let label: string;
  switch (scope.kind) {
    case 'screen':
      label = '화면 전체';
      break;
    case 'region':
      label =
        typeof scope.members !== 'number' ? '영역' : scope.members === 0 ? '빈 자리' : `영역 · 요소 ${scope.members}개`;
      break;
    case 'element':
      label = elementLabel(scope) ?? '요소';
      break;
    case 'component':
      label = scope.component ? `컴포넌트 ${scope.component}` : named(groupWord(scope.type), scope);
      break;
    default:
      label = named(groupWord(scope.type), scope);
  }
  if (scope.component && scope.kind !== 'component' && scope.kind !== 'screen') label += ` · ${scope.component}`;
  return cut(label, MAX_LABEL);
}

export function scopesOf(result: PinResult | null): PinScope[] {
  if (!result || !Array.isArray(result.scopes)) return [];
  return result.scopes.filter((scope): scope is PinScope => Boolean(scope) && typeof scope.kind === 'string');
}

/** 고른 범위의 이름(서버 placeLabel 과 같은 뜻). 칩·말풍선에 보인다 */
export function markLabel(mark: PreviewPinMark): string {
  if (mark.waiting) return '찾는 중…';
  if (!mark.result) return '짚지 못함';
  const scopes = scopesOf(mark.result);
  const chosen = scopes[mark.scope];
  if (chosen && chosen.kind !== 'element') return scopeLabel(chosen);
  return elementLabel(mark.result.element) ?? '빈 곳';
}

/** 지금 고른 칸의 테두리. 칸에 테두리가 없으면 요소의 것 */
export function markBounds(mark: PreviewPinMark): PinBounds | null {
  const chosen = scopesOf(mark.result)[mark.scope];
  return cleanBounds(chosen?.bounds) ?? cleanBounds(mark.result?.element?.bounds);
}

/** 서버로 보낼 모양. 답을 못 받은 곳은 보내지 않는다 */
export function toPinPayload(marks: PreviewPinMark[]): { result: Record<string, unknown>; scope?: number }[] {
  return marks
    .filter((mark) => mark.result && mark.result.ok !== undefined)
    .map((mark) => ({ result: mark.result as Record<string, unknown>, scope: mark.scope }));
}
