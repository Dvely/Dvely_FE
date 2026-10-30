import { useCallback, useState } from 'react';
import { completeGitHubCallback, fetchGitHubAuthUrl } from '@/api/auth';
import { fetchAndPersistUserInfo } from '@/api/user';
import { persistAuthTokens } from '@/lib/persistAuthTokens';
import { IS_DEMO } from '@/demo/config';
import { runDemoGitHubWindow } from '@/demo/githubWindow';
import {
  GITHUB_OAUTH_POPUP_FEATURES,
  GITHUB_OAUTH_POPUP_NAME,
  GITHUB_OAUTH_SUCCESS_MESSAGE,
} from '@/constants/githubOAuth';
import {
  clearOAuthCodeProcessed,
  extractStateFromOAuthUrl,
  saveOAuthState,
} from '@/services/auth/oauthState';

export function useGitHubLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startGitHubLogin = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      /*
        시연 모드는 브라우저 팝업을 열지 않는다. github.com 에 나갈 수 없으므로 승인 화면을
        시연 빌드 안에서 재현해 띄우고(demo/githubWindow), 승인하면 같은 처리를 이 창에서
        그대로 한다 — 뒤따르는 흐름(사용자 정보 조회 → 홈 이동)은 팝업이 보내던 메시지를
        그대로 쏘아 이어붙인다.
      */
      if (IS_DEMO) {
        if (!(await runDemoGitHubWindow('oauth'))) return;
        const response = await completeGitHubCallback({ code: 'demo-code', state: 'demo-state' });
        persistAuthTokens(response);
        await fetchAndPersistUserInfo();
        window.postMessage({ type: GITHUB_OAUTH_SUCCESS_MESSAGE }, window.location.origin);
        return;
      }

      const { data } = await fetchGitHubAuthUrl();
      const url = data?.url;

      if (!url) {
        throw new Error('GitHub 로그인 URL을 받지 못했습니다.');
      }

      clearOAuthCodeProcessed();

      const state = extractStateFromOAuthUrl(url);
      if (state) saveOAuthState(state);

      const popup = window.open(url, GITHUB_OAUTH_POPUP_NAME, GITHUB_OAUTH_POPUP_FEATURES);
      if (!popup) {
        throw new Error('팝업이 차단되었습니다. 팝업 허용 후 다시 시도해 주세요.');
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'GitHub 로그인을 시작하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { startGitHubLogin, isLoading, errorMessage };
}
