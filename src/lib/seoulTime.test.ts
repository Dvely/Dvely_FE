import { describe, expect, it } from 'vitest';
import { formatSeoulHourMinute, withSeoulOffsetIfMissing } from '@/lib/seoulTime';

/*
  이 테스트의 핵심은 **보는 사람의 시간대와 무관하게 같은 숫자가 나오는가** 다.

  예전 구현은 문자열에서 `T` 뒤 두 덩어리를 정규식으로 뽑아 그대로 적었다. 서버가 KST
  오프셋을 붙여 보내는 동안에는 그 값이 맞지만, **오프셋을 아예 보지 않으므로** 서버가
  다른 오프셋(UTC 등)으로 보내기 시작하면 화면이 조용히 몇 시간 어긋난다. 오류도 안 난다.

  그래서 대조군이 통과하지 못하는 입력을 골라 둔다 — 오프셋이 +09:00 이 아닌 값이다.
  +09:00 입력만으로 테스트하면 옛 구현도 통과해서 아무것도 증명하지 못한다.
*/
describe('formatSeoulHourMinute', () => {
  it('서버가 지금 보내는 KST 오프셋 값을 그대로 적는다', () => {
    expect(formatSeoulHourMinute('2026-10-29T09:33:00+09:00')).toBe('09:33');
  });

  /** 옛 구현은 "00:33" 을 적었다 — 9시간 어긋난다 */
  it('UTC 로 와도 서울 시각으로 옮긴다', () => {
    expect(formatSeoulHourMinute('2026-10-29T00:33:00Z')).toBe('09:33');
  });

  /** 옛 구현은 "22:33" 을 적었다 */
  it('다른 오프셋으로 와도 서울 시각으로 옮긴다', () => {
    expect(formatSeoulHourMinute('2026-10-28T22:33:00-02:00')).toBe('09:33');
  });

  /*
    오프셋이 없는 값은 KST 로 간주한다. 보정하지 않으면 `new Date` 가 보는 사람의 로컬
    시각으로 읽어서, **서울 밖에서 보는 사람만** 어긋난다.
  */
  it('오프셋이 없으면 KST 로 간주한다', () => {
    expect(formatSeoulHourMinute('2026-10-29T09:33:00')).toBe('09:33');
  });

  it('자정을 24:00 이 아니라 00:00 으로 적는다', () => {
    expect(formatSeoulHourMinute('2026-10-29T00:00:00+09:00')).toBe('00:00');
  });

  it('날짜가 넘어가는 경계를 서울 기준으로 가른다', () => {
    // 서울 09:00 = 전날 UTC 00:00
    expect(formatSeoulHourMinute('2026-10-28T15:00:00Z')).toBe('00:00');
    expect(formatSeoulHourMinute('2026-10-28T14:59:00Z')).toBe('23:59');
  });

  /*
    시각은 곁들이는 정보다. 하나 못 읽었다고 진행 상황 줄이 사라지거나 `Invalid Date` 가
    찍히면 그게 더 나쁘다 — 빈 문자열이면 호출부가 시각만 생략한다.
  */
  it('읽을 수 없는 값은 빈 문자열로 돌려준다', () => {
    expect(formatSeoulHourMinute('')).toBe('');
    expect(formatSeoulHourMinute(null)).toBe('');
    expect(formatSeoulHourMinute(undefined)).toBe('');
    expect(formatSeoulHourMinute('어제')).toBe('');
    expect(formatSeoulHourMinute('2026-13-45T99:99:00+09:00')).toBe('');
  });
});

describe('withSeoulOffsetIfMissing', () => {
  it('오프셋이 있으면 건드리지 않는다', () => {
    expect(withSeoulOffsetIfMissing('2026-10-29T09:33:00+09:00')).toBe('2026-10-29T09:33:00+09:00');
    expect(withSeoulOffsetIfMissing('2026-10-29T00:33:00Z')).toBe('2026-10-29T00:33:00Z');
    expect(withSeoulOffsetIfMissing('2026-10-29T00:33:00+0900')).toBe('2026-10-29T00:33:00+0900');
    expect(withSeoulOffsetIfMissing('2026-10-28T22:33:00-02:00')).toBe('2026-10-28T22:33:00-02:00');
  });

  it('없으면 KST 를 붙인다', () => {
    expect(withSeoulOffsetIfMissing('2026-10-29T09:33:00')).toBe('2026-10-29T09:33:00+09:00');
  });
});
