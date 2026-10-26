/*
  로그아웃·세션 만료 때 **지울 것만 지운다.**

  예전에는 `localStorage.clear()` 였다. 오리진 전체를 비우므로 토큰뿐 아니라 언어 설정,
  내 템플릿 목록, 배너를 닫아 둔 상태까지 같이 날아갔다. 더 나쁜 건 **다른 탭이다** —
  한쪽 탭의 refresh 가 경쟁에서 져 401 을 받으면, 그 자리에서 clear() 가 돌아 방금 다른
  탭이 받아 둔 새 토큰까지 지웠다. 한 탭의 실패가 멀쩡한 탭을 로그아웃시켰다.

  그래서 목록을 명시한다. **여기에 없는 키는 건드리지 않는다.**

  다만 "토큰만" 은 아니다. `userInfo`·`userProjects`·`qeploy.my-templates` 는 로그인한
  사람의 것이라, 남겨 두면 같은 브라우저를 쓰는 다음 사람이 앞사람의 프로필·프로젝트
  목록·템플릿 이름을 본다.

  내 템플릿은 **키가 사용자별로 나뉘어 있지 않아서** 지운다. 한동안은 `clear()` 가 매번
  지워 와서 이 문제가 드러나지 않았는데, 지울 키를 좁히는 순간 드러난다 — 좁히면서 같이
  닫는다. 사용자별로 나누는 것(키에 userId 접두사)이 제대로 된 해결이고, 그렇게 되면
  이 목록에서 빼면 된다.

  남기는 것: 언어 설정(`dvely.locale`), 배너를 닫아 둔 상태. 누구의 것도 아니고
  로그아웃으로 사라질 이유가 없다.
*/
const CLEARED_ON_LOGOUT = [
  'accessToken',
  'refreshToken',
  'userInfo',
  'userProjects',
  'qeploy.my-templates',
] as const;

export function clearAppLocalStorage() {
  for (const key of CLEARED_ON_LOGOUT) {
    localStorage.removeItem(key);
  }
}
