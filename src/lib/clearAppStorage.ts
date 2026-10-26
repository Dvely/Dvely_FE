/*
  로그아웃·세션 만료 때 **지울 것만 지운다.**

  예전에는 `localStorage.clear()` 였다. 오리진 전체를 비우므로 토큰뿐 아니라 언어 설정,
  내 템플릿 목록, 배너를 닫아 둔 상태까지 같이 날아갔다. 더 나쁜 건 **다른 탭이다** —
  한쪽 탭의 refresh 가 경쟁에서 져 401 을 받으면, 그 자리에서 clear() 가 돌아 방금 다른
  탭이 받아 둔 새 토큰까지 지웠다. 한 탭의 실패가 멀쩡한 탭을 로그아웃시켰다.

  그래서 목록을 명시한다. **여기에 없는 키는 건드리지 않는다.**

  다만 "토큰만" 은 아니다. `userInfo`·`userProjects` 는 로그인한 사람의 것이라, 남겨 두면
  같은 브라우저를 쓰는 다음 사람이 앞사람의 프로필과 프로젝트 목록을 본다.

  남기는 것: 언어 설정(`dvely.locale`), 내 템플릿(`qeploy.my-templates`), 배너를 닫아 둔
  상태. 로그아웃으로 사라질 이유가 없는 것들이다.
*/
const CLEARED_ON_LOGOUT = ['accessToken', 'refreshToken', 'userInfo', 'userProjects'] as const;

export function clearAppLocalStorage() {
  for (const key of CLEARED_ON_LOGOUT) {
    localStorage.removeItem(key);
  }
}
