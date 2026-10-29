/**
 * 서버가 준 시각을 **서울 시각**으로 적는다.
 *
 * 이 서비스의 시각은 전부 서울 기준이다. 사용자가 어디서 보든 "작업이 09:33 에 시작했다"
 * 는 말은 서울의 09:33 이어야 한다 — 보는 사람의 시계에 따라 숫자가 달라지면, 같은 화면을
 * 보며 이야기하는 두 사람이 다른 시각을 읽는다.
 *
 * ## 오프셋이 없는 값을 받을 때
 *
 * 서버는 응답 직렬화 때 모든 `LocalDateTime` 에 KST 오프셋을 붙인다(BE `JacksonDateTimeConfig`).
 * 그래서 지금 들어오는 값은 `2026-10-29T09:33:00+09:00` 처럼 오프셋이 있다.
 *
 * 그래도 오프셋이 없는 값을 **KST 로 간주해** 보정한다. 그게 없으면 `new Date` 가 그 문자열을
 * **보는 사람의 로컬 시각**으로 읽어버리기 때문이다(ECMA-262 가 오프셋 없는 날짜·시각 형식을
 * 로컬로 규정한다). 그러면 서울에서 보는 사람은 맞게 보이고 **다른 시간대에서 보는 사람만
 * 몇 시간 어긋난다** — 가장 찾기 어려운 종류의 버그다. 실제로 UTC 브라우저에서 09:33 이
 * 18:33 로 나오는 것을 확인했다.
 *
 * 오프셋이 붙어 오는 동안에는 이 보정이 아무 일도 하지 않는다. 서버가 되돌아가도 화면이
 * 조용히 틀리지 않게 두는 안전장치다.
 */

/** 이 서비스가 시각을 적는 기준 */
const SEOUL_TIME_ZONE = 'Asia/Seoul';

/** 오프셋이 없는 값에 붙일 기준 오프셋 */
const KST_OFFSET = '+09:00';

/** 끝에 `Z` 나 `+09:00`·`+0900` 이 붙어 있는지 */
const HAS_OFFSET = /(?:Z|[+-]\d{2}:?\d{2})$/i;

/**
 * 만든 포매터를 모아 둔다. 목록의 줄마다 불리는 자리들이라, 매번 새로 만들면 그 비용이
 * 목록 길이에 비례한다. `Intl.DateTimeFormat` 생성은 포맷 한 번보다 훨씬 비싸다.
 */
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function seoulFormatter(locale: string, options: Intl.DateTimeFormatOptions) {
  const key = `${locale}|${JSON.stringify(options)}`;
  const cached = formatterCache.get(key);
  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat(locale, { timeZone: SEOUL_TIME_ZONE, ...options });
  formatterCache.set(key, formatter);
  return formatter;
}

/** 읽을 수 있으면 Date, 아니면 null. 오프셋 보정을 거친다 */
function toSeoulDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(withSeoulOffsetIfMissing(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * 서울 시각으로 적는다. **형식은 호출부가 정한다.**
 *
 * 자리마다 쓰는 형식이 달라서(`10월 29일` · `10. 29. 오전 09:33` · `2026년 10월 29일`)
 * 함수를 그만큼 만들면 거의 같은 코드가 여섯 벌이 된다. 바뀌어야 하는 건 **시간대 하나**
 * 뿐이므로 옵션은 그대로 받고 시간대만 여기서 못박는다 — 화면 문구는 한 글자도 안 바뀐다.
 */
function formatInSeoul(
  value: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions,
  locale = 'ko-KR',
): string {
  const date = toSeoulDate(value);
  if (!date) return '';

  return seoulFormatter(locale, options).format(date);
}

/**
 * 서울 기준 날짜 하나를 `YYYY-MM-DD` 로. **날짜 비교에만 쓴다.**
 *
 * `en-CA` 를 쓰는 이유는 그 로케일이 `YYYY-MM-DD` 를 주기 때문이다 — 화면에 보여줄 값이
 * 아니라 **같은 날인지 가릴 열쇠**다. `Date` 끼리 비교하면 보는 사람의 자정을 기준으로
 * 갈라져서, 서울 00:30 의 대화가 UTC 브라우저에서는 "어제" 가 된다.
 */
function seoulDayKey(value: string | Date | null | undefined): string {
  const date = toSeoulDate(value);
  if (!date) return '';

  return seoulFormatter('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(
    date,
  );
}

/** 하루를 밀리초로. 서울은 서머타임이 없어 하루가 늘 24시간이다 */
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 서울 기준으로 `오늘`·`어제` 인지. 둘 다 아니면 null — 호출부가 날짜를 적는다.
 *
 * `now` 를 받는 이유는 테스트에서 시각을 고정해야 하기 때문이다. 기본값은 지금이다.
 */
function seoulRelativeDayLabel(
  value: string | Date | null | undefined,
  now: Date = new Date(),
): '오늘' | '어제' | null {
  const key = seoulDayKey(value);
  if (!key) return null;

  if (key === seoulDayKey(now)) return '오늘';
  if (key === seoulDayKey(new Date(now.getTime() - ONE_DAY_MS))) return '어제';
  return null;
}

/**
 * 오프셋이 없으면 KST 로 간주해 붙인다. 있으면 그대로 둔다.
 */
function withSeoulOffsetIfMissing(value: string): string {
  const trimmed = value.trim();
  return HAS_OFFSET.test(trimmed) ? trimmed : `${trimmed}${KST_OFFSET}`;
}

/**
 * `HH:MM` (서울 시각). 읽을 수 없는 값이면 빈 문자열 — 호출부는 그때 시각을 적지 않는다.
 *
 * 빈 문자열로 돌려주는 이유는 이 값이 **곁들이는 정보**라서다. 시각 하나를 못 읽었다고
 * 진행 상황 줄 자체가 사라지거나 `Invalid Date` 가 찍히면 그게 더 나쁘다.
 */
function formatSeoulHourMinute(value: string | null | undefined): string {
  if (!value) return '';

  return formatInSeoul(value, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
}

export {
  SEOUL_TIME_ZONE,
  formatInSeoul,
  formatSeoulHourMinute,
  seoulDayKey,
  seoulRelativeDayLabel,
  withSeoulOffsetIfMissing,
};
