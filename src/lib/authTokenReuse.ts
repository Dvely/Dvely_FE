/**
 * 401 을 받은 뒤 refresh 를 **실제로 불러야 하는지** 판단한다.
 *
 * 탭이 여럿이면 자물쇠(`navigator.locks`)로 줄을 세우는데, 줄만 세우면 모자라다.
 * 기다리던 탭이 제 차례에 그대로 refresh 를 부르면 이미 회전돼 무효가 된 토큰으로
 * 부르는 꼴이라 결국 같은 401 이다. 그래서 **자물쇠를 잡은 뒤 저장소를 다시 읽고**,
 * 내가 쓰다 실패한 토큰과 다르면 다른 탭이 갱신해 둔 것이므로 그걸 쓴다.
 *
 * 그 판단을 인터셉터 안에 두면 테스트할 수가 없다 — axios 와 자물쇠와 저장소를 모두
 * 세워야 한다. 여기서는 문자열 두 개만 비교한다.
 */

/**
 * 저장소에 있는 토큰을 그대로 써도 되는가.
 *
 * @param current 자물쇠를 잡은 뒤 저장소에서 다시 읽은 값
 * @param stale 이 요청이 실제로 써서 401 을 받은 값. 저장소의 현재 값과 다를 수 있다
 */
function canReuseStoredToken(current: string | null, stale: string | null): boolean {
  /*
    #150 이 운영에서 돌고 있는 그대로다. 이 PR 은 테스트를 들이는 것이지 동작을 바꾸는
    것이 아니므로, 옮기면서 조건을 한 줄도 더하지 않는다.

    처음 옮길 때 "내가 쓴 토큰을 모르면(stale === null) 재사용하지 않는다"를 보탰다가
    되돌렸다. 그럴듯해 보였지만 **배포된 판단을 테스트 PR 에서 조용히 바꾸는 것**이고,
    그런 변경은 따로 근거를 들고 나와야 한다. 지금은 그 경우에도 저장소 값을 쓴다 —
    요청에 Authorization 헤더가 없었다는 뜻이라 사실상 닿지 않는 길이기도 하다.
  */
  return Boolean(current) && current !== stale;
}

/** `Authorization` 헤더에서 Bearer 토큰만 떼어낸다. 아니면 null */
function readBearerToken(rawHeader: unknown): string | null {
  if (typeof rawHeader !== 'string') return null;

  const prefix = 'Bearer ';
  if (!rawHeader.startsWith(prefix)) return null;

  const token = rawHeader.slice(prefix.length);
  return token.length > 0 ? token : null;
}

export { canReuseStoredToken, readBearerToken };
