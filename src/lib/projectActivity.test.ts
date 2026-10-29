import { describe, expect, it } from 'vitest';
import { formatActivityTime } from '@/lib/projectActivity';

/*
  개요의 "가장 최근 커밋", 승인 이력, 배포 이력, 환경 변수 변경 이력이 이 함수로 시각을
  적는다. 예전에는 서버 값을 그대로 찍어서 `2026-10-29T14:04:48` 같은 원문이 화면에 남았다.

  오전·오후 표기는 실행 환경의 ICU 에 따라 `오후`·`PM` 으로 갈려서 숫자만 본다.
*/
const AT_1404 = /^10\. 29\. \S+ 02:04$/;

describe('formatActivityTime', () => {
  it('서버 값을 서울 기준 월·일·시각으로 적는다', () => {
    expect(formatActivityTime('2026-10-29T14:04:48+09:00')).toMatch(AT_1404);
  });

  it('UTC 로 와도 서울 시각으로 옮긴다', () => {
    expect(formatActivityTime('2026-10-29T05:04:48Z')).toMatch(AT_1404);
  });

  it('오프셋이 없으면 KST 로 간주한다', () => {
    expect(formatActivityTime('2026-10-29T14:04:48')).toMatch(AT_1404);
  });

  it('빈 값은 빈 문자열로 둔다', () => {
    expect(formatActivityTime('')).toBe('');
  });

  it('읽을 수 없는 값은 원문을 그대로 돌려준다', () => {
    expect(formatActivityTime('어제쯤')).toBe('어제쯤');
  });
});
