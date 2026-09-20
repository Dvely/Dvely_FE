import { useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useGitHubLogin } from '@/hooks/useGitHubLogin';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

/*
  CTA 가 아무 데도 가지 않고 있었다 — onClick 이 없는 버튼이다.

  본문도 "로그인 없이 해시만으로 이동해 볼 수 있어요" 라고 적혀 있었는데, 실제로는
  워크스페이스가 accessToken 을 요구한다(requireAuth). 헤더·히어로와 같은 로그인
  흐름을 붙이고 문구도 실제 동작에 맞춘다.
*/
function StartNowSection() {
  const navigate = useNavigate();
  const { startGitHubLogin, isLoading: isLoggingIn } = useGitHubLogin();
  const [isLoggedIn] = useIsLoggedIn();

  const handleStart = useCallback(() => {
    if (isLoggingIn) return;
    if (isLoggedIn) {
      void navigate({ to: '/home' });
      return;
    }
    void startGitHubLogin();
  }, [isLoggedIn, isLoggingIn, navigate, startGitHubLogin]);

  return (
    <section className="relative py-12 px-5 w-full overflow-hidden bg-[linear-gradient(90deg,#9360E369_41%,#F8FAFC_70%,#FFFFFF_100%)] flex justify-center xl:overflow-visible xl:px-0">
      <div
        className="flex flex-col gap-4 rounded-3xl bg-white py-5 px-5 w-full max-w-[1024px] md:flex-row md:items-center md:justify-between md:py-3.5 md:px-8"
        style={{ boxShadow: '0 20px 50px 0 rgba(124, 58, 237, 0.10)' }}
      >
        <div className="flex flex-col justify-between">
          <p className="typo-h4-bd">지금 바로 워크스페이스에 들어가 보세요</p>
          <p className="typo-b2-md text-[#64748B]">
            대시보드·프로젝트 목록·에이전트 화면까지 이어져 있습니다.{' '}
            <br className="hidden xl:inline" />
            GitHub 계정으로 연결하면 바로 시작할 수 있어요.
          </p>
        </div>
        <Button
          onClick={handleStart}
          disabled={isLoggingIn}
          className="w-full shrink-0 rounded-xl border-[#7C3AED] bg-[#7C3AED] bg-none text-white hover:bg-[#6D28D9] hover:opacity-100 md:w-auto md:border-[#C084FC]/45 md:bg-gradient-to-b md:from-[#C084FC]/22 md:to-[#C084FC]/10 md:text-[#0B0C12] md:hover:bg-transparent md:hover:opacity-80"
        >
          <p className="typo-b1-eb">{isLoggedIn ? '워크스페이스로 이동' : '무료로 시작하기'}</p>
        </Button>
      </div>
    </section>
  );
}

export default StartNowSection;
