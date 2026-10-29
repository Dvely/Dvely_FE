/*
  이름은 `qeploy.` 접두사로 통일한다(#146).

  여기 셋은 **같은 문서 안에서만** 오가는 CustomEvent 다 — `window.dispatchEvent` 로
  발행하고 같은 페이지의 리스너가 받는다. 저장소에 남지도, 창 밖으로 나가지도 않으므로
  이름을 바꿔도 잃을 것이 없다.

  `src/constants/githubOAuth.ts` 의 두 이름은 **바꾸지 않았다.** 그쪽은 팝업이
  `postMessage` 로 opener 에 보내는 값이라, 팝업과 열어 둔 탭이 서로 다른 배포본일 때
  (배포 직후가 정확히 그 상황이다) 이름이 어긋나면 **OAuth 를 마쳤는데도 앱이 모른다.**
  오류도 나지 않고 그냥 아무 일도 일어나지 않는다.
*/

/** Http 인터셉터 등 라우터 컨텍스트 밖에서 홈(/) 이동이 필요할 때 발행 */
export const AUTH_REDIRECT_HOME_EVENT = 'qeploy.auth-redirect-home';

export function dispatchAuthRedirectHome() {
  window.dispatchEvent(new Event(AUTH_REDIRECT_HOME_EVENT));
}

/** GitHub App이 설치되지 않은 채로 로그인했을 때 발행 */
export const GITHUB_APP_INSTALL_REQUIRED_EVENT = 'qeploy.github-app-install-required';

export function dispatchGitHubAppInstallRequired() {
  window.dispatchEvent(new Event(GITHUB_APP_INSTALL_REQUIRED_EVENT));
}

/**
 * 설치는 돼 있는데 User Token 이 끊겨 재인증이 필요할 때 발행.
 * 설치 요구와 다르다 — 권한은 그대로고 토큰만 다시 받으면 된다.
 */
export const GITHUB_APP_REAUTHORIZATION_REQUIRED_EVENT =
  'qeploy.github-app-reauthorization-required';

export function dispatchGitHubAppReauthorizationRequired() {
  window.dispatchEvent(new Event(GITHUB_APP_REAUTHORIZATION_REQUIRED_EVENT));
}
