import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { completeGitHubCallback } from '@/api/auth';
import type { GitHubCallbackResult } from '@/types/auth.type';
import {
  clearOAuthState,
  getOAuthState,
  isOAuthCodeProcessed,
  markOAuthCodeProcessed,
} from '@/services/auth/oauthState';

type CallbackSearch = {
  code: string;
  state: string;
};

/** React StrictMode 개발 환경에서 callback API 중복 호출 방지 */
let exchangingOAuthCode: string | null = null;

export const Route = createFileRoute('/auth/callback')({
  validateSearch: (search: Record<string, unknown>): CallbackSearch => ({
    code: typeof search.code === 'string' ? search.code : '',
    state: typeof search.state === 'string' ? search.state : '',
  }),
  component: RouteComponent,
});

function persistAuthTokens(data?: GitHubCallbackResult) {
  if (!data) return;

  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }
  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }
}

function goHome() {
  if (window.opener && !window.opener.closed) {
    window.opener.location.assign('/');
    window.close();
    return;
  }

  window.location.assign('/');
}

function RouteComponent() {
  const navigate = useNavigate();
  const { code, state } = Route.useSearch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      if (!code || !state) {
        setErrorMessage('인증 정보(code/state)가 없습니다.');
        return;
      }

      if (isOAuthCodeProcessed(code)) {
        goHome();
        return;
      }

      if (exchangingOAuthCode === code) {
        return;
      }

      exchangingOAuthCode = code;

      const savedState = getOAuthState();
      if (savedState && savedState !== state) {
        exchangingOAuthCode = null;
        clearOAuthState();
        setErrorMessage('로그인 요청이 유효하지 않습니다. 다시 시도해 주세요.');
        return;
      }

      try {
        const response = await completeGitHubCallback({ code, state });

        persistAuthTokens(response.data);
        markOAuthCodeProcessed(code);
        clearOAuthState();
        goHome();
      } catch (error) {
        exchangingOAuthCode = null;
        setErrorMessage(
          error instanceof Error ? error.message : '로그인 처리에 실패했습니다.',
        );
      }
    }

    void handleCallback();
  }, [code, state]);

  if (errorMessage) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-base font-medium text-red-600">{errorMessage}</p>
        <p className="text-sm text-slate-500">
          로그인을 처음부터 다시 시도해 주세요. callback 주소를 새로고침하면 code가 만료됩니다.
        </p>
        <button
          type="button"
          className="text-sm text-slate-600 underline"
          onClick={() => navigate({ to: '/auth/login' })}
        >
          로그인 화면으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#A8B88C]/20 border-t-[#A8B88C]" />
      <p className="text-base font-medium">로그인 처리 중입니다...</p>
      <p className="text-sm text-gray-500">잠시만 기다려 주세요</p>
    </div>
  );
}
