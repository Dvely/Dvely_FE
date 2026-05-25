import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchGitHubAuthUrl } from '@/api/auth';
import {
  clearOAuthCodeProcessed,
  extractStateFromOAuthUrl,
  saveOAuthState,
} from '@/services/auth/oauthState';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data } = await fetchGitHubAuthUrl();
      const url = data?.url;

      if (!url) {
        throw new Error('GitHub 로그인 URL을 받지 못했습니다.');
      }

      clearOAuthCodeProcessed();

      const state = extractStateFromOAuthUrl(url);
      if (state) saveOAuthState(state);

      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'GitHub 로그인을 시작하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl gap-8 px-6 py-14 text-left">
      <header className="grid gap-4">
        <p className="w-fit rounded-full border border-slate-300 px-3 py-1 text-xs font-bold tracking-[0.08em] text-slate-700">
          DVELY
        </p>
        <h1 className="text-3xl font-bold text-slate-900">AI 웹서비스 수정·배포 에이전트</h1>
        <p className="max-w-3xl text-slate-600">
          자연어 요청만으로 웹서비스를 만들고 수정하고 배포까지 이어지는 경험을 제공합니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" size="lg" disabled={isLoading} onClick={handleGitHubLogin}>
            {isLoading ? 'GitHub 로그인 준비 중...' : 'GitHub로 로그인'}
          </Button>
          {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        </div>

      </header>
    </main>
  );
}

export default LoginPage;
