import { describe, expect, it } from 'vitest';
import { NEAR_BOTTOM_PX, distanceFromBottom, isNearBottom } from '@/lib/scrollAnchor';

/*
  #153 이 고친 것: AI 가 일하는 동안 위로 스크롤하면 리렌더마다 바닥으로 끌려 내려갔다.
  이제는 **바닥 근처일 때만** 따라 내려간다. 그 "근처" 판정이 아래다.
*/
describe('distanceFromBottom', () => {
  it('바닥에 붙어 있으면 0', () => {
    expect(distanceFromBottom({ scrollHeight: 1000, scrollTop: 800, clientHeight: 200 })).toBe(0);
  });

  it('맨 위면 볼 수 없는 만큼이 거리다', () => {
    expect(distanceFromBottom({ scrollHeight: 1000, scrollTop: 0, clientHeight: 200 })).toBe(800);
  });

  it('고무줄 스크롤로 넘어가면 음수가 나온다', () => {
    // 터치 기기에서 바닥을 넘겨 당기면 scrollTop 이 최대값보다 커진다
    expect(distanceFromBottom({ scrollHeight: 1000, scrollTop: 830, clientHeight: 200 })).toBe(-30);
  });
});

describe('isNearBottom', () => {
  it('바닥이면 참', () => {
    expect(isNearBottom({ scrollHeight: 1000, scrollTop: 800, clientHeight: 200 })).toBe(true);
  });

  it(`경계값 ${NEAR_BOTTOM_PX}px 까지는 참, 한 칸 넘으면 거짓`, () => {
    const at = { scrollHeight: 1000, scrollTop: 800 - NEAR_BOTTOM_PX, clientHeight: 200 };
    const past = { scrollHeight: 1000, scrollTop: 800 - NEAR_BOTTOM_PX - 1, clientHeight: 200 };

    expect(isNearBottom(at)).toBe(true);
    expect(isNearBottom(past)).toBe(false);
  });

  it('위로 올려 읽는 중이면 거짓 — 이게 #153 의 핵심이다', () => {
    expect(isNearBottom({ scrollHeight: 5960, scrollTop: 0, clientHeight: 735 })).toBe(false);
  });

  it('고무줄로 넘어가도 참', () => {
    expect(isNearBottom({ scrollHeight: 1000, scrollTop: 830, clientHeight: 200 })).toBe(true);
  });

  it('내용이 화면보다 짧아 스크롤이 없으면 참', () => {
    // 모든 내용을 보고 있으므로 새 내용을 따라가는 게 맞다
    expect(isNearBottom({ scrollHeight: 300, scrollTop: 0, clientHeight: 735 })).toBe(true);
  });

  it('기준값을 좁히면 같은 위치도 거짓이 된다', () => {
    const metrics = { scrollHeight: 1000, scrollTop: 750, clientHeight: 200 };
    expect(isNearBottom(metrics)).toBe(true);
    expect(isNearBottom(metrics, 10)).toBe(false);
  });
});
