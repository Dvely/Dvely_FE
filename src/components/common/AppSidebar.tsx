import {
  BarChart2,
  FolderKanban,
  Home,
  LayoutTemplate,
  PanelLeft,
  PanelRight,
  Settings,
} from 'lucide-react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import type { AppShellPath } from '@/lib/appRoutes';
import { logoutSession } from '@/lib/logout';

const navItems: {
  to: AppShellPath;
  label: string;
  icon: typeof Home;
}[] = [
  { to: '/home', label: '홈', icon: Home },
  { to: '/project', label: '프로젝트', icon: FolderKanban },
  { to: '/templates', label: '템플릿', icon: LayoutTemplate },
  { to: '/analytics', label: '분석', icon: BarChart2 },
  { to: '/settings', label: '설정', icon: Settings },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [isLoggedIn, syncAuthState] = useIsLoggedIn();

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logoutSession();
    } finally {
      setIsLoggingOut(false);
      syncAuthState();
      void navigate({ to: '/', replace: true });
    }
  }, [isLoggingOut, navigate, syncAuthState]);

  const logoutButtonLabel = isLoggingOut ? '로그아웃 중...' : '로그아웃';

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggingOut(false);
    }
  }, [isLoggedIn]);

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-[#0F172A]/8 bg-[#EBEBEB] transition-[width] duration-200 ease-out ${
        collapsed ? 'w-[76px]' : 'w-[260px]'
      }`}
    >
      <div
        className={`flex items-center py-5 ${collapsed ? 'flex-col gap-3 px-2' : 'justify-between px-4'}`}
      >
        <div className={`flex items-center ${collapsed ? 'flex-col gap-1' : 'gap-3'}`}>
          {!collapsed ? (
            <div className="flex min-w-0 flex-col">
              <span
                className="truncate text-[15px] font-semibold tracking-tight text-[#0B0C12] cursor-pointer"
                onClick={() => navigate({ to: '/', replace: true })}
              >
                Devely
              </span>
              <span className="truncate text-[12px] text-[#64748B]">AI 웹 자동 생성</span>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex size-8 items-center justify-center transition cursor-pointer"
          aria-expanded={!collapsed}
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {collapsed ? (
            <PanelRight className="size-[18px]" strokeWidth={1.75} />
          ) : (
            <PanelLeft className="size-[18px]" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <nav
        className={`flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto ${collapsed ? 'px-2' : 'px-3'}`}
      >
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);

          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={`flex w-full items-center rounded-xl text-[13px] font-medium transition ${
                collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5 text-left'
              } ${active ? 'bg-[#E4E4E4] text-[#34322D]' : ' hover:bg-[#E4E4E4]'}`}
            >
              <Icon className="size-[18px] shrink-0 opacity-90" strokeWidth={active ? 2 : 1.75} />
              {!collapsed ? <span>{label}</span> : <span className="sr-only">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {isLoggedIn ? (
        <div className={`shrink-0 border-t border-[#0F172A]/8 py-3 ${collapsed ? 'px-2' : 'px-3'}`}>
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
            title={collapsed ? logoutButtonLabel : undefined}
            className={`flex w-full items-center rounded-xl text-[13px] font-medium text-[#64748B] transition hover:bg-[#E4E4E4] hover:text-[#34322D] disabled:cursor-not-allowed disabled:opacity-50 ${
              collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5 text-left'
            }`}
          >
            <span className={collapsed ? 'text-center text-[11px] leading-tight' : undefined}>
              {logoutButtonLabel}
            </span>
          </button>
        </div>
      ) : null}
    </aside>
  );
}
