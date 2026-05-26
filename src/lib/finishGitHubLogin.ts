import { GITHUB_OAUTH_SUCCESS_MESSAGE } from '@/constants/githubOAuth';

/** 팝업을 닫고 부모 창에서 로그인 완료 처리 */
export function finishGitHubLogin() {
  const payload = { type: GITHUB_OAUTH_SUCCESS_MESSAGE };

  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(payload, window.location.origin);
    window.opener.focus();
    window.opener.location.assign('/');
    window.close();
    return;
  }

  window.postMessage(payload, window.location.origin);
  window.close();
}
