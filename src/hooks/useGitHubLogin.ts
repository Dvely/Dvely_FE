import { useCallback, useState } from 'react';
import { completeGitHubCallback, fetchGitHubAuthUrl } from '@/api/auth';
import { fetchAndPersistUserInfo } from '@/api/user';
import { persistAuthTokens } from '@/lib/persistAuthTokens';
import { IS_DEMO } from '@/demo/config';
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
        시연 모드는 팝업을 열지 않는다.

        팝업은 차단당할 수 있고(그러면 시연이 그 자리에서 멈춘다), 열려도 창이 떴다
        사라지는 장면이 영상에 그대로 남는다. 어차피 교환할 code 가 우리 것이므로
        같은 처리를 이 창에서 그대로 한다 — 뒤따르는 흐름(사용자 정보 조회 → 홈 이동)은
        팝업이 보내던 메시지를 그대로 쏘아 이어붙인다.
      */
      if (IS_DEMO) {
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
