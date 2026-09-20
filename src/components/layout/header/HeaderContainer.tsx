import { useCallback, useState } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ArrowRight, X } from 'lucide-react';
import qeployLogo from '@/assets/images/qeploy-logo-primary.svg';
import { useGitHubLogin } from '@/hooks/useGitHubLogin';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

const NAV_ITEMS = [
  { label: '서비스 소개', id: 'intro' },
  { label: '템플릿', id: 'templates' },
  { label: '제작 사례', id: 'showcase' },
  { label: '이용 후기', id: 'reviews' },
  { label: '진행 과정', id: 'process' },
  { label: '요금제', id: 'pricing' },
] as const;

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const header = document.querySelector('header');
  const offset = header instanceof HTMLElement ? header.offsetHeight + 12 : 84;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function HeaderContainer() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const isTemplatePage = useRouterState({
    select: (state) => state.location.pathname === '/template',
  });

  const navigate = useNavigate();
  const { startGitHubLogin, isLoading: isLoggingIn } = useGitHubLogin();
  const [isLoggedIn] = useIsLoggedIn();

  const handleAuth = useCallback(() => {
    if (isLoggingIn) return;
    if (isLoggedIn) {
      void navigate({ to: '/home' });
      return;
    }
    void startGitHubLogin();
  }, [isLoggedIn, isLoggingIn, navigate, startGitHubLogin]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <div className="relative mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 md:px-6">
        <Link to="/" className="relative z-10 flex items-center" aria-label="Qeploy 홈">
          <img src={qeployLogo} alt="Qeploy" width={110} height={30} className="h-[30px] w-auto" />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[14px] font-medium text-[#4B5563] md:flex">
          {NAV_ITEMS.map((item) =>
            item.id === 'templates' ? (
              <Link
                key={item.id}
                to="/template"
                aria-current={isTemplatePage ? 'page' : undefined}
                className={`whitespace-nowrap transition hover:text-black ${isTemplatePage ? 'text-[#7C3AED]' : ''}`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={async () => {
                  if (isTemplatePage) await navigate({ to: '/' });
                  scrollToSection(item.id);
                }}
                className="whitespace-nowrap transition hover:text-black"
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="relative z-10 flex items-center gap-3 md:gap-5">
          <Link
            to="/template"
            aria-current={isTemplatePage ? 'page' : undefined}
            className="text-sm font-medium text-[#7C3AED] md:hidden"
          >
            템플릿
          </Link>
          <button
            type="button"
            disabled={isLoggingIn}
            onClick={handleAuth}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(124,58,237,0.28)] transition hover:bg-[#6D28D9] disabled:opacity-60 md:h-10 md:px-5 md:text-[14px]"
          >
            시작하기
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {bannerOpen && !isTemplatePage ? (
        <div className="relative flex w-full flex-col items-center justify-center gap-1.5 bg-[#1e1b4b] px-10 py-2.5 text-white md:flex-row md:gap-0 md:px-12">
          <p className="text-center text-[12px] md:truncate md:text-[13px]">
            <b>쓰던 GitHub에 Qeploy를 연결하세요.</b> 말로 설명하면 홈페이지가 만들어집니다.
          </p>
          <button
            type="button"
            onClick={handleAuth}
            disabled={isLoggingIn}
            className="shrink-0 rounded-md border border-white/70 px-3 py-1 text-[12px] font-semibold disabled:opacity-60 md:ml-3"
          >
            GitHub 연결하기
          </button>
          <button
            type="button"
            aria-label="안내 닫기"
            onClick={() => setBannerOpen(false)}
            className="absolute top-2.5 right-3 text-white/80 hover:text-white md:top-auto md:right-4"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}
    </header>
  );
}

export default HeaderContainer;
