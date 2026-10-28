import { describe, expect, it } from 'vitest';
import { canReuseStoredToken, readBearerToken } from '@/lib/authTokenReuse';

/*
  #150 이 고친 것: 두 탭이 동시에 401 을 받으면 둘 다 같은 refresh 토큰으로 서버를
  부르고, 진 쪽이 로그인으로 가면서 **이긴 탭이 저장한 새 토큰까지 지웠다.**

  자물쇠로 줄을 세우는 것만으로는 모자라다. 기다리던 탭이 제 차례에 그대로 refresh 를
  부르면 이미 회전된 토큰으로 부르는 꼴이다. 그래서 자물쇠를 잡은 뒤 저장소를 다시 읽고,
  **내가 쓰다 실패한 토큰**과 비교한다. 아래가 그 비교다.
*/
describe('canReuseStoredToken', () => {
  it('다른 탭이 이미 갱신해 뒀으면 그 값을 쓴다 — 서버를 부르지 않는다', () => {
    expect(canReuseStoredToken('new-token', 'stale-token')).toBe(true);
  });

  it('저장소 값이 내가 실패한 그 토큰이면 다시 받아야 한다', () => {
    // 이걸 true 로 두면 방금 401 을 받은 토큰으로 그대로 재시도한다
    expect(canReuseStoredToken('same-token', 'same-token')).toBe(false);
  });

  it('저장소가 비었으면 쓸 것이 없다', () => {
    expect(canReuseStoredToken(null, 'stale-token')).toBe(false);
    expect(canReuseStoredToken('', 'stale-token')).toBe(false);
  });

  it('내가 쓴 토큰을 모르면(헤더 없음) 저장소 값을 쓴다 — 운영 동작 그대로', () => {
    /*
      요청에 Authorization 헤더가 없었다는 뜻이라 사실상 닿지 않는 길이다.
      "모르면 서버에 묻자" 가 더 안전해 보이지만, 그건 배포된 판단을 바꾸는 것이라
      따로 근거를 들고 나와야 한다. 지금 동작을 그대로 고정해 둔다.
    */
    expect(canReuseStoredToken('some-token', null)).toBe(true);
  });
});

describe('readBearerToken', () => {
  it('Bearer 뒤의 값만 떼어낸다', () => {
    expect(readBearerToken('Bearer abc.def.ghi')).toBe('abc.def.ghi');
  });

  it('토큰 안의 공백은 자르지 않는다', () => {
    // 첫 공백에서 끊으면 안 된다. Bearer 접두만 떼고 나머지는 그대로다
    expect(readBearerToken('Bearer a b')).toBe('a b');
  });

  it.each([
    ['접두가 없으면', 'abc.def.ghi'],
    ['소문자 bearer 는', 'bearer abc'],
    ['Basic 은', 'Basic dXNlcjpwYXNz'],
    ['Bearer 만 있고 값이 없으면', 'Bearer '],
    ['빈 문자열은', ''],
  ])('%s null', (_label, raw) => {
    expect(readBearerToken(raw)).toBeNull();
  });

  it.each([
    ['undefined', undefined],
    ['null', null],
    ['숫자', 123],
    ['배열', ['Bearer abc']],
  ])('문자열이 아니면 null — %s', (_label, raw) => {
    // AxiosHeaders.get 은 문자열이 아닌 것을 돌려줄 수 있다
    expect(readBearerToken(raw)).toBeNull();
  });
});
