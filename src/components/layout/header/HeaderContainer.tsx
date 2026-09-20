import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { ArrowRight, Menu, X } from 'lucide-react';
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

/*
  헤더는 fixed 라 화면 위쪽을 계속 차지한다. 데스크탑에서는 72px 바 + 배너라
  1080px 높이의 6% 정도지만, 390x844 화면에서는 같은 구성이 162px — 뷰포트의
  19% 를 콘텐츠와 무관하게 먹고 있었다. 스크롤할 때마다 본문 두 줄이 그 밑으로
  들어가 잘렸다.

  좁은 화면에서는 바를 56px 로 줄이고, 배너는 한 줄로 접어 30px 로 만든다(총 86px,
  10%). 대신 데스크탑에서 가로로 펼쳐지던 내비 6개는 햄버거 메뉴로 옮긴다 — 지금은
  md 미만에서 통째로 사라져서 섹션으로 갈 방법이 아예 없었다.

  md 이상은 기존 구성 그대로다.
*/
function HeaderContainer() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleNavSelect = useCallback(
    async (sectionId: string) => {
      setMenuOpen(false);
      if (isTemplatePage) await navigate({ to: '/' });
      /*
        메뉴가 접힌 뒤에 재야 한다.

        scrollToSection 은 header.offsetHeight 만큼 빼서 목적지를 잡는데, setMenuOpen
        직후에는 아직 펼친 높이(바+배너+메뉴 ~380px)가 잡힌다. 그 값으로 계산하면
        섹션이 화면 한참 아래에 걸린 채로 멈춘다. 두 프레임 뒤면 React 가 DOM 을
        반영한 뒤라 접힌 높이로 재게 된다.
      */
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(sectionId)));
    },
    [isTemplatePage, navigate],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white">
        <div className="relative mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between px-4 md:h-[72px] md:px-6">
          <Link to="/" className="relative z-10 flex items-center" aria-label="Qeploy 홈">
            <img
              src={qeployLogo}
              alt="Qeploy"
              width={110}
              height={30}
              className="h-[26px] w-auto md:h-[30px]"
            />
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
                  onClick={() => void handleNavSelect(item.id)}
                  className="whitespace-nowrap transition hover:text-black"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>

          <div className="relative z-10 flex items-center gap-1 md:gap-5">
            <button
              type="button"
              disabled={isLoggingIn}
              onClick={handleAuth}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 text-[13px] font-semibold text-white shadow-[0_6px_16px_rgba(124,58,237,0.28)] transition hover:bg-[#6D28D9] disabled:opacity-60 md:h-10 md:px-5 md:text-[14px]"
            >
              시작하기
              <ArrowRight className="size-4" />
            </button>
            {/* 좁은 화면에서 가로 내비가 들어갈 자리가 없다. 같은 항목을 이 안에 담는다 */}
            <button
              type="button"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="-mr-2 flex size-11 items-center justify-center rounded-lg text-[#334155] transition hover:bg-[#f1f5f9] md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {bannerOpen && !isTemplatePage ? (
          <div className="relative flex w-full items-center justify-center bg-[#1e1b4b] px-10 py-1.5 text-white md:px-12 md:py-2.5">
            <p className="truncate text-[12px] md:text-[13px]">
              <b>쓰던 GitHub에 Qeploy를 연결하세요.</b>
              {/* 한 줄에 담기지 않으므로 좁은 화면에서는 핵심 문장만 남긴다 */}
              <span className="hidden md:inline"> 말로 설명하면 홈페이지가 만들어집니다.</span>
            </p>
            <button
              type="button"
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="ml-3 hidden shrink-0 rounded-md border border-white/70 px-3 py-1 text-[12px] font-semibold disabled:opacity-60 md:inline-flex"
            >
              GitHub 연결하기
            </button>
            <button
              type="button"
              aria-label="안내 닫기"
              onClick={() => setBannerOpen(false)}
              className="absolute right-3 text-white/80 hover:text-white md:right-4"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : null}

        {menuOpen ? (
          <nav
            aria-label="모바일 메뉴"
            className="border-t border-[#e5e7eb] bg-white px-4 pt-1 pb-3 shadow-[0_12px_24px_rgba(15,23,42,0.08)] md:hidden"
          >
            {NAV_ITEMS.map((item) =>
              item.id === 'templates' ? (
                <Link
                  key={item.id}
                  to="/template"
                  onClick={() => setMenuOpen(false)}
                  aria-current={isTemplatePage ? 'page' : undefined}
                  className={`flex h-12 items-center rounded-lg px-2 text-[15px] font-medium transition active:bg-[#f1f5f9] ${
                    isTemplatePage ? 'text-[#7C3AED]' : 'text-[#334155]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => void handleNavSelect(item.id)}
                  className="flex h-12 w-full items-center rounded-lg px-2 text-left text-[15px] font-medium text-[#334155] transition active:bg-[#f1f5f9]"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>
        ) : null}
      </header>

      {menuOpen ? (
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#0f172a]/25 md:hidden"
        />
      ) : null}
    </>
  );
}

export default HeaderContainer;
