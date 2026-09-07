import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useGitHubLogin } from '@/hooks/useGitHubLogin';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

const MAIN_SCROLL_ID = 'app-main-scroll';

const NAV_ITEMS = [
  { label: '프로그램', id: 'intro' },
  { label: '고민', id: 'pain' },
  { label: '추천', id: 'roles' },
  { label: '기능', id: 'intro' },
  { label: '혜택', id: 'pricing' },
  { label: '진행 과정', id: 'process' },
  { label: '결과물', id: 'showcase' },
  { label: '후기', id: 'reviews' },
  { label: '요금', id: 'pricing' },
  { label: 'FAQ', id: 'footer' },
] as const;

function getScrollTop() {
  const scrollElement = document.getElementById(MAIN_SCROLL_ID);
  return scrollElement ? scrollElement.scrollTop : window.scrollY;
}

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function HeaderContainer() {
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { startGitHubLogin, isLoading: isLoggingIn } = useGitHubLogin();
  const [isLoggedIn] = useIsLoggedIn();

  const handleScroll = useCallback(() => {
    const currentScrollY = getScrollTop();

    if (currentScrollY <= 8) {
      setIsVisible(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY.current) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  const handleAuth = useCallback(() => {
    if (isLoggingIn) return;
    if (isLoggedIn) {
      void navigate({ to: '/home' });
      return;
    }
    void startGitHubLogin();
  }, [isLoggedIn, isLoggingIn, navigate, startGitHubLogin]);

  useEffect(() => {
    const scrollElement = document.getElementById(MAIN_SCROLL_ID);
    const target: EventTarget = scrollElement ?? window;

    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-3.5 lg:px-40">
        <Link to="/" className="text-sm font-bold tracking-[0.08em] text-slate-900">
          Qeploy
        </Link>
        <nav className="hidden items-center gap-0.5 text-[#64748B] xl:flex">
          {NAV_ITEMS.map((item) => (
            <Button
              key={`${item.label}-${item.id}`}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <nav className="flex items-center gap-2">
          <Button type="button" variant="outline" disabled={isLoggingIn} onClick={handleAuth}>
            {isLoggedIn ? '워크스페이스' : '도입 문의'}
          </Button>
          <Button type="button" disabled={isLoggingIn} onClick={handleAuth}>
            무료로 시작
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default HeaderContainer;
