/**
 * 시연용 마우스 커서.
 *
 * 자동 재생은 컨트롤을 코드로 누른다. 그러면 화면에서는 원인 없이 버튼이 눌리는데,
 * 보는 사람에게는 그게 "편집으로 이어붙인 화면" 으로 읽힌다. 커서가 그 자리로 움직여
 * 누르는 것을 보여 주면 인과가 눈에 보인다.
 *
 * 진짜 커서는 재생 중에 감춘다 — 두 개가 동시에 보이면 그게 더 이상하다.
 */

const SIZE = 24;

const HIDE_RULE = '*, *::before, *::after { cursor: none !important; }';
const HIDE_MARK = 'data-demo-hide-cursor';

let root: HTMLDivElement | null = null;
let ring: HTMLDivElement | null = null;
let hideTimer = 0;
let pointerX = 0;
let pointerY = 0;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** macOS 화살표. 흰 테두리가 있어야 어두운 화면에서도 형태가 남는다 */
const ARROW = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 2.5L18 14.2h-6.3l-1 6.6-5.2-18.3z"
        fill="#0f172a" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round"/>
</svg>`;

function ensure() {
  if (root) return;

  root = document.createElement('div');
  root.setAttribute('data-demo-cursor', '');
  Object.assign(root.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: `${SIZE}px`,
    height: `${SIZE}px`,
    zIndex: '300',
    pointerEvents: 'none',
    opacity: '0',
    // 화살표 끝이 좌표를 가리키도록 왼쪽 위를 기준으로 둔다
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity 200ms ease',
    filter: 'drop-shadow(0 2px 5px rgba(15,23,42,0.35))',
  } satisfies Partial<CSSStyleDeclaration>);
  root.innerHTML = ARROW;

  ring = document.createElement('div');
  Object.assign(ring.style, {
    position: 'absolute',
    left: '-9px',
    top: '-9px',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '2px solid rgba(124,58,237,0.85)',
    opacity: '0',
    transform: 'scale(0.35)',
    pointerEvents: 'none',
  } satisfies Partial<CSSStyleDeclaration>);
  root.appendChild(ring);

  document.body.appendChild(root);
}

export function showCursor() {
  ensure();
  if (!root) return;
  // 첫 등장은 화면 가운데 아래쯤에서 시작한다 — 갑자기 버튼 위에 나타나면 순간이동처럼 보인다
  if (pointerX === 0 && pointerY === 0) {
    pointerX = window.innerWidth * 0.5;
    pointerY = window.innerHeight * 0.72;
    root.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
  }
  root.style.opacity = '1';

  applyHideRule();
  /*
    한 번 넣고 끝낼 수 없다.

    프리뷰는 iframe 이고 그 안은 별개의 문서라 부모에 넣은 규칙이 닿지 않는다 —
    프리뷰가 뜨는 구간에서만 진짜 커서가 되살아났다. 게다가 프리뷰는 주소가 회전할
    때마다 다시 로드되어 넣어 둔 규칙이 사라진다. 그래서 주기적으로 다시 확인한다.
  */
  window.clearInterval(hideTimer);
  hideTimer = window.setInterval(applyHideRule, 400);
}

/** 이 문서와, 접근할 수 있는 모든 iframe 문서에 규칙을 심는다 */
function applyHideRule() {
  injectInto(document);

  for (const frame of Array.from(document.querySelectorAll('iframe'))) {
    try {
      // 다른 오리진이면 접근 자체가 막힌다. 그때는 손댈 방법이 없으므로 넘어간다
      const doc = frame.contentDocument;
      if (doc) injectInto(doc);
    } catch {
      // 교차 오리진 프레임 — 무시한다
    }
  }
}

function injectInto(doc: Document) {
  const head = doc.head ?? doc.documentElement;
  if (!head || head.querySelector(`style[${HIDE_MARK}]`)) return;

  const style = doc.createElement('style');
  style.setAttribute(HIDE_MARK, '');
  style.textContent = HIDE_RULE;
  head.appendChild(style);
}

function removeHideRule() {
  const docs: Document[] = [document];
  for (const frame of Array.from(document.querySelectorAll('iframe'))) {
    try {
      if (frame.contentDocument) docs.push(frame.contentDocument);
    } catch {
      // 교차 오리진 프레임 — 무시한다
    }
  }
  for (const doc of docs) {
    doc.querySelectorAll(`style[${HIDE_MARK}]`).forEach((node) => node.remove());
  }
}

export function hideCursor() {
  if (root) root.style.opacity = '0';
  window.clearInterval(hideTimer);
  hideTimer = 0;
  removeHideRule();
}

/**
 * 좌표로 옮긴다.
 *
 * 거리에 따라 시간을 달리한다 — 가까운 곳까지 늘 같은 시간을 쓰면 굼떠 보이고,
 * 먼 곳을 짧게 가면 순간이동으로 읽힌다.
 */
export async function moveCursorTo(x: number, y: number) {
  ensure();
  if (!root) return;

  const distance = Math.hypot(x - pointerX, y - pointerY);
  const duration = Math.min(400, Math.max(130, Math.round(distance * 0.5)));

  root.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.15, 1), opacity 160ms ease`;
  root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  pointerX = x;
  pointerY = y;

  await sleep(duration + 20);
}

/** 누르는 시늉. 화살표가 살짝 눌리고 고리가 한 번 퍼진다 */
export async function pressCursor() {
  ensure();
  if (!root || !ring) return;

  const arrow = root.querySelector('svg');
  if (arrow) {
    arrow.style.transition = 'transform 60ms ease';
    arrow.style.transform = 'scale(0.82)';
  }

  ring.style.transition = 'none';
  ring.style.opacity = '0.9';
  ring.style.transform = 'scale(0.35)';
  // 값을 강제로 적용해야 아래 전환이 시작점부터 돈다
  void ring.getBoundingClientRect();
  ring.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms ease';
  ring.style.transform = 'scale(1)';
  ring.style.opacity = '0';

  await sleep(70);
  if (arrow) arrow.style.transform = 'scale(1)';
  await sleep(55);
}

/** 요소 위로 옮긴다. iframe 안쪽이면 프레임 위치만큼 더한다 */
export async function moveCursorToElement(element: Element, frame?: Element | null) {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return;

  const offset = frame?.getBoundingClientRect();
  const x = (offset?.left ?? 0) + rect.left + rect.width / 2;
  const y = (offset?.top ?? 0) + rect.top + rect.height / 2;

  await moveCursorTo(x, y);
}
