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
 * 한 번만 만든다. 이벤트 줄마다 불리는 자리라 매번 만들면 그 비용이 목록 길이에 비례한다.
 *
 * `hourCycle: 'h23'` 을 명시한다. `hour12: false` 만 두면 로케일에 따라 자정이 `24:00` 으로
 * 나오는 경우가 있어서다 — 이 런타임에서는 `00:00` 이지만, 그 차이를 로케일 구현에 맡기지
 * 않는다.
 */
const seoulHourMinute = new Intl.DateTimeFormat('ko-KR', {
  timeZone: SEOUL_TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

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

  const date = new Date(withSeoulOffsetIfMissing(value));
  if (Number.isNaN(date.getTime())) return '';

  return seoulHourMinute.format(date);
}

export { SEOUL_TIME_ZONE, formatSeoulHourMinute, withSeoulOffsetIfMissing };
