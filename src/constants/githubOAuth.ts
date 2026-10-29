/*
  이 두 이름은 `dvely:` 로 둔다(#146 의 이름 통일에서 일부러 제외).

  팝업이 `postMessage` 로 opener 에 보내는 값이다. 배포 직후에는 **팝업과 열어 둔 탭이
  서로 다른 배포본**일 수 있어서, 이름을 바꾸면 한쪽은 새 이름으로 보내고 다른 쪽은 옛
  이름을 기다린다 — 사용자가 GitHub 인증을 마쳤는데도 앱이 그것을 모르고, 오류도 나지
  않은 채 아무 일도 일어나지 않는다.

  바꾸려면 받는 쪽이 두 이름을 한동안 모두 받아 주는 단계를 먼저 배포해야 한다. 이름
  통일만으로 그 단계를 들일 이유는 없다고 보고 그대로 두었다.
*/

export const GITHUB_OAUTH_POPUP_NAME = 'dvely-github-oauth';
export const GITHUB_OAUTH_SUCCESS_MESSAGE = 'dvely:github-oauth-success';
export const GITHUB_OAUTH_POPUP_FEATURES = 'width=520,height=720,scrollbars=yes,resizable=yes';

export const GITHUB_APP_INSTALL_POPUP_NAME = 'dvely-github-app-install';
export const GITHUB_APP_INSTALL_SUCCESS_MESSAGE = 'dvely:github-app-install-success';
