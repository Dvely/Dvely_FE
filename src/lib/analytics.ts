import { GA_MEASUREMENT_ID } from '@/constants/analytics';

/*
  Google Analytics 4 연동. 화면 전환(page_view)과 버튼·링크 클릭(ui_click) 두 가지만 보낸다.

  **켜지는 조건은 셋이 모두 맞을 때뿐이다** — 운영 빌드, 로컬 호스트가 아님, 측정 ID 있음.
  하나라도 아니면 gtag.js 를 내려받지도 않고, 아래 track·클릭 처리는 아무 일도 하지 않는다.
  개발 서버나 `vite preview` 에서 누른 것이 운영 보고서에 섞이지 않게 하려는 것이다.

  새 의존성 없이 gtag 스니펫을 직접 옮겼다. 하는 일이 "큐에 명령을 넣고 스크립트를 붙인다"
  가 전부라, 래퍼 라이브러리는 번들만 키운다.

  개인정보 원칙 — 고칠 때 이것부터 지킨다:
  - 주소는 origin + pathname 만 보낸다. query·hash 는 버린다. `/callback?code=…&state=…` 의
    OAuth 코드가 GA 로 넘어가면 안 된다. 자동 수집되는 주소(dl)와 리퍼러(dr)도 같은 값으로
    덮어쓴다 — 덮지 않으면 gtag.js 가 document.location 을 query 째로 싣는다.
  - 클릭 이름은 `data-ga-label` → `aria-label` → 보이는 글자 순으로 정한다. 사용자가 쓴 글
    (대화·프로젝트 이름·저장소 이름·도메인 등)이 보이는 영역에는 `data-ga-ignore` 를 단다.
  - Google 신호·광고 개인화는 끈다.

  GA 관리 화면의 "향상된 측정"도 일부 꺼야 이 원칙이 지켜진다. 무엇을 끄는지는
  `src/constants/analytics.ts` 에 적어 두었다.
*/

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    /** gtag.js 가 읽어 가는 명령 큐. 스크립트가 늦게 와도 먼저 쌓인 명령을 차례로 처리한다 */
    dataLayer?: unknown[];
  }
}

const GTAG_SCRIPT_URL = 'https://www.googletagmanager.com/gtag/js';
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;
/** 실제 사용자가 들어올 수 없는 호스트. 빈 값은 file: 로 연 경우다 */
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '']);

const CLICKABLE_SELECTOR = 'button, a, [role="button"]';
const IGNORE_SELECTOR = '[data-ga-ignore]';

/** GA 매개변수 값은 100자까지 받는다. 보고서 표에서 한눈에 읽히는 길이로 더 줄인다 */
export const MAX_CLICK_LABEL_LENGTH = 40;
export const IGNORED_CLICK_LABEL = '(ignored)';
export const UNLABELED_CLICK_LABEL = '(no label)';

// ---------------------------------------------------------------------------
// 설정 판단
// ---------------------------------------------------------------------------

/**
 * 빌드 환경 변수 → 상수 순으로 측정 ID 를 고른다.
 *
 * 형식이 틀리면 빈 값(= 꺼짐)으로 돌려준다. 잘못된 ID 로 스크립트 주소를 만들면 GA 는 받지도
 * 않는 요청만 나가고, 화면에서는 아무 차이가 없어 틀린 줄 모른다 — 그래서 콘솔에 한 줄 남긴다.
 */
export function resolveMeasurementId(
  envValue: unknown = import.meta.env.VITE_GA_MEASUREMENT_ID,
  fallback: string = GA_MEASUREMENT_ID,
): string {
  const fromEnv = typeof envValue === 'string' ? envValue.trim() : '';
  const candidate = fromEnv || fallback.trim();
  if (!candidate) return '';
  if (MEASUREMENT_ID_PATTERN.test(candidate)) return candidate;

  console.warn(`[analytics] GA 측정 ID 형식(G-XXXXXXXXXX)이 아니라 분석을 끕니다: ${candidate}`);
  return '';
}

export function isAnalyticsEnvironment(isProd: boolean, hostname: string): boolean {
  return isProd && !LOCAL_HOSTNAMES.has(hostname);
}

// ---------------------------------------------------------------------------
// 주소 정리
// ---------------------------------------------------------------------------

/**
 * GA 에 실을 경로. query·hash 를 버리고 끝의 / 를 하나로 맞춘다.
 *
 * 끝의 / 규칙은 SeoHead 의 canonical 과 같다 — "/template/" 와 "/template" 가 보고서에서
 * 두 페이지로 갈리지 않게 한다. 호출자가 pathname 대신 href 조각을 넘겨도 query 가 새지
 * 않도록 여기서 한 번 더 자른다.
 *
 *   normalizePagePath('/auth/callback?code=abc') // '/auth/callback'
 *   normalizePagePath('/template/')              // '/template'
 *   normalizePagePath('/')                       // '/'
 */
export function normalizePagePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, '');
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function toPageLocation(path: string, origin: string = window.location.origin): string {
  return `${origin}${normalizePagePath(path)}`;
}

/** http(s) 주소만 받는다. mailto:·blob: 같은 스킴과 깨진 주소는 null — 그런 주소는 보내지 않는다 */
function parseHttpUrl(href: string, base?: string): URL | null {
  try {
    const url = new URL(href, base);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

/**
 * 리퍼러도 query 를 버린다.
 *
 * 같은 오리진 안에서 전체 새로고침으로 넘어오면 브라우저는 리퍼러에 이전 주소를 query 째로
 * 넣는다. 덮어쓰지 않으면 gtag.js 가 그것을 그대로 싣는다.
 */
export function toSafeReferrer(referrer: string): string | undefined {
  const url = referrer ? parseHttpUrl(referrer) : null;
  return url ? `${url.origin}${url.pathname}` : undefined;
}

// ---------------------------------------------------------------------------
// 클릭 해석
// ---------------------------------------------------------------------------

export type UiClickParams = {
  click_label: string;
  click_type: 'button' | 'link';
  /** 다른 사이트로 나가는 링크일 때만. origin + pathname */
  link_url?: string;
  page_path: string;
};

type ClickLocation = Pick<Location, 'origin' | 'href' | 'pathname'>;

/** 공백을 한 칸으로 접고 자른다. 글자 단위(코드 포인트)로 잘라 이모지가 반으로 갈리지 않게 한다 */
function cleanLabel(value: string | null | undefined): string {
  if (!value) return '';
  const collapsed = value.replace(/\s+/g, ' ').trim();
  return Array.from(collapsed).slice(0, MAX_CLICK_LABEL_LENGTH).join('');
}

/**
 * 클릭 이름. `data-ga-label` → `aria-label` → 보이는 글자 순이다.
 *
 * `data-ga-label` 은 ignore 영역 안에서도 쓴다. 개발자가 코드에 적은 고정 문자열이라 사용자 글이
 * 섞이지 않기 때문이다 — **그러니 여기에 사용자 데이터를 바인딩하면 안 된다.** ignore 영역 안에서
 * 의미 있는 이름이 필요한 버튼(프로젝트 열기 등)은 이것으로 이름을 준다.
 *
 * 보이는 글자는 innerText 가 아니라 textContent 로 읽는다. innerText 는 클릭마다 레이아웃을
 * 강제로 계산시키고, 차이는 화면에서 감춘 글자(sr-only 등)가 끼느냐 정도라 이름으로는 오히려 낫다.
 */
export function resolveClickLabel(control: Element, ignored: boolean): string {
  const explicit = cleanLabel(control.getAttribute('data-ga-label'));
  if (explicit) return explicit;
  if (ignored) return IGNORED_CLICK_LABEL;

  return (
    cleanLabel(control.getAttribute('aria-label')) ||
    cleanLabel(control.textContent) ||
    UNLABELED_CLICK_LABEL
  );
}

function isDisabled(control: Element): boolean {
  return control.matches(':disabled') || control.getAttribute('aria-disabled') === 'true';
}

/**
 * 클릭 대상에서 보낼 매개변수를 만든다. 보낼 것이 아니면 null.
 *
 * 아이콘(svg)이나 안쪽 span 을 눌러도 가장 가까운 버튼·링크까지 올라가서 그것을 기준으로 삼는다.
 * 비활성 버튼은 건너뛴다 — 눌러도 아무 일도 일어나지 않았으므로 클릭으로 세면 거짓이 된다.
 *
 * **ignore 영역 안의 클릭도 버리지 않는다.** 이름만 `(ignored)` 로 바꾸고 링크 주소를 빼고 보낸다.
 * "프로젝트 카드를 몇 번 눌렀나" 같은 수 자체는 누구의 글도 담지 않으면서 쓸모 있는 신호이고,
 * 이벤트를 통째로 빼면 "아무도 안 누른다" 와 "누르지만 이름을 못 본다" 가 구별되지 않는다.
 * 링크 주소를 빼는 이유는 대화 속 링크·배포 주소가 곧 사용자가 쓴 글이기 때문이다.
 */
export function describeClick(
  target: EventTarget | null,
  location: ClickLocation = window.location,
): UiClickParams | null {
  if (!(target instanceof Element)) return null;

  const control = target.closest(CLICKABLE_SELECTOR);
  if (!control || isDisabled(control)) return null;

  const ignored = control.closest(IGNORE_SELECTOR) !== null;
  // svg 안의 <a> 도 잡히도록 tagName 대신 localName 을 본다(svg 요소는 소문자로 남는다)
  const isAnchor = control.localName === 'a';
  const clickType = isAnchor && control.getAttribute('role') !== 'button' ? 'link' : 'button';

  const params: UiClickParams = {
    click_label: resolveClickLabel(control, ignored),
    click_type: clickType,
    page_path: normalizePagePath(location.pathname),
  };

  if (isAnchor && !ignored) {
    const href = control.getAttribute('href');
    const url = href ? parseHttpUrl(href, location.href) : null;
    if (url && url.origin !== location.origin) params.link_url = `${url.origin}${url.pathname}`;
  }

  return params;
}

// ---------------------------------------------------------------------------
// 실행
// ---------------------------------------------------------------------------

/** 꺼져 있으면 null. track 함수들은 이것 하나로 no-op 여부를 가른다 */
let gtag: Gtag | null = null;
/** 같은 경로를 연달아 세지 않는다. 같은 화면에서 query·hash 만 바뀐 이동이 여기에 걸린다 */
let lastPagePath: string | null = null;

function handleClick(event: MouseEvent) {
  if (!gtag) return;

  const params = describeClick(event.target);
  if (!params) return;

  gtag('event', 'ui_click', { ...params, page_location: toPageLocation(params.page_path) });
}

export type InitAnalyticsOptions = {
  measurementId?: string;
  /** 기본은 운영 빌드이면서 로컬 호스트가 아닐 때. 테스트는 직접 켠다 */
  enabled?: boolean;
};

/**
 * 앱 시작 때 한 번 부른다. 꺼져 있으면 아무것도 붙이지 않는다.
 *
 * 돌려주는 함수는 붙인 것을 모두 뗀다. 앱에서는 부를 일이 없고, 테스트와 스크립트 로드
 * 실패 때 쓴다.
 */
export function initAnalytics({
  measurementId = resolveMeasurementId(),
  enabled = isAnalyticsEnvironment(import.meta.env.PROD, window.location.hostname),
}: InitAnalyticsOptions = {}): () => void {
  if (!enabled || !measurementId || gtag) return () => {};

  const dataLayer = (window.dataLayer = window.dataLayer ?? []);
  const push: Gtag = function () {
    // gtag.js 는 `arguments` 객체만 명령으로 읽는다. 배열로 바꿔 넣으면 GTM 형식의 메시지로
    // 보고 건너뛰어서, 오류 없이 아무것도 안 나간다
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  gtag = push;

  const referrer = toSafeReferrer(document.referrer);
  push('js', new Date());
  push('config', measurementId, {
    // 첫 화면도 라우터가 정착한 뒤 AnalyticsPageView 가 보낸다. 켜 두면 첫 화면을 두 번 센다
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: toPageLocation(window.location.pathname),
    ...(referrer ? { page_referrer: referrer } : {}),
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `${GTAG_SCRIPT_URL}?id=${encodeURIComponent(measurementId)}`;
  /*
    광고 차단기나 네트워크 때문에 스크립트를 못 받으면, 큐에 쌓기만 하고 영영 보내지 못한다.
    그 자리에서 멈춰 클릭마다 일을 하지 않게 한다.
  */
  script.addEventListener('error', dispose);
  document.head.appendChild(script);

  // capture 로 건다. 화면 쪽 핸들러가 stopPropagation 해도 클릭은 센다
  document.addEventListener('click', handleClick, true);

  function dispose() {
    document.removeEventListener('click', handleClick, true);
    script.removeEventListener('error', dispose);
    script.remove();
    gtag = null;
    lastPagePath = null;
  }

  return dispose;
}

/**
 * 화면 하나를 page_view 로 보낸다. 꺼져 있으면 아무 일도 하지 않는다.
 *
 * 제목은 부르는 순간의 document.title 이다 — 그래서 부르는 쪽(AnalyticsPageView)이 SeoHead 가
 * 제목을 바꾼 뒤에 부르도록 자리를 잡는다.
 */
export function trackPageView(pathname: string, title: string = document.title): void {
  if (!gtag) return;

  const pagePath = normalizePagePath(pathname);
  if (pagePath === lastPagePath) return;
  lastPagePath = pagePath;

  const pageView = { page_location: toPageLocation(pagePath), page_title: title };
  /*
    기본값도 함께 옮긴다. GA 가 알아서 보내는 이벤트(user_engagement 등)는 마지막으로 set 한
    주소에 묶이는데, 옮기지 않으면 첫 화면 주소에 계속 묶인다.
  */
  gtag('set', pageView);
  gtag('event', 'page_view', pageView);
}
