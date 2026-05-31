import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { PORTFOLIO_NAV_ITEMS, PORTFOLIO_SITE_TITLE } from './portfolioContent';

type PortfolioHeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function PortfolioHeader({ isDark, onToggleTheme }: PortfolioHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e8f0] bg-[#f9f9f9]/80 backdrop-blur-sm dark:border-[#2f2f2f] dark:bg-[#121212]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-wide text-[#1e293b] dark:text-[#f8f8f8]"
        >
          {PORTFOLIO_SITE_TITLE}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {PORTFOLIO_NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative text-sm font-medium text-[#64748b] transition-colors hover:text-[#1e293b] dark:text-[#9ca3af] dark:hover:text-[#f8f8f8]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#3b82f6] transition-all duration-300 group-hover:w-full dark:bg-[#c6a664]" />
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#64748b] transition hover:text-[#1e293b] dark:border-[#2f2f2f] dark:text-[#9ca3af] dark:hover:text-[#f8f8f8]"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#64748b] dark:border-[#2f2f2f] dark:text-[#9ca3af]"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#64748b] dark:border-[#2f2f2f] dark:text-[#9ca3af]"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-[#e2e8f0] bg-[#f9f9f9] px-4 py-4 dark:border-[#2f2f2f] dark:bg-[#121212] md:hidden">
          <ul className="flex flex-col gap-3">
            {PORTFOLIO_NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-[#64748b] dark:text-[#9ca3af]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export default PortfolioHeader;
