import { FolderKanban, Home, PanelLeft, PanelRight, Trash2 } from 'lucide-react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { Fragment, useState } from 'react';

import qeployLogo from '@/assets/images/qeploy-logo-primary.svg';
import qeploySymbol from '@/assets/images/qeploy-symbol-violet.svg';
import type { AppShellPath } from '@/lib/appRoutes';

const navItems: {
  to: AppShellPath;
  label: string;
  icon: typeof Home;
}[] = [
  { to: '/home', label: '홈', icon: Home },
  { to: '/project', label: '프로젝트', icon: FolderKanban },
  { to: '/trash', label: '휴지통', icon: Trash2 },
];

/*
  lg(1024px) 이상은 기존 좌측 사이드바 그대로다 — 접기/펼치기 폭도 건드리지 않는다.
  그 아래에서는 같은 항목을 화면 하단 탭바로 눕힌다. 좁은 화면에서 76px 짜리 세로
  레일은 가로 폭의 20% 를 먹는 데다, 접기 버튼도 누를 이유가 없는 자리다.
*/
export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <aside
      className={`flex w-full shrink-0 flex-row border-t border-[#0F172A]/8 bg-[#EBEBEB] pb-[env(safe-area-inset-bottom,0px)] lg:h-full lg:flex-col lg:border-t-0 lg:border-r lg:pb-0 lg:transition-[width] lg:duration-200 lg:ease-out ${
        collapsed ? 'lg:w-[76px]' : 'lg:w-[260px]'
      }`}
    >
      <div
        className={`hidden items-center py-5 lg:flex ${collapsed ? 'flex-col gap-3 px-2' : 'justify-between px-4'}`}
      >
        <div className={`flex items-center ${collapsed ? 'flex-col gap-1' : 'gap-3'}`}>
          {!collapsed ? (
            <button
              type="button"
              onClick={() => navigate({ to: '/', replace: true })}
              className="flex min-w-0 cursor-pointer flex-col items-start gap-1"
              aria-label="Qeploy 홈"
            >
              <img
                src={qeployLogo}
                alt="Qeploy"
                width={92}
                height={25}
                className="h-[25px] w-auto"
              />
              <span className="truncate text-[12px] text-[#64748B]">AI 웹 자동 생성</span>
            </button>
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

      {collapsed ? (
        <button
          type="button"
          onClick={() => navigate({ to: '/', replace: true })}
          className="hidden cursor-pointer items-center justify-center pb-2 lg:flex"
          aria-label="Qeploy 홈"
        >
          <img src={qeploySymbol} alt="Qeploy" width={22} height={22} className="size-[22px]" />
        </button>
      ) : null}

      <nav
        className={`flex flex-1 flex-row items-stretch gap-1 px-2 py-1.5 lg:min-h-0 lg:flex-col lg:overflow-y-auto lg:py-0 ${
          collapsed ? 'lg:px-2' : 'lg:px-3'
        }`}
      >
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);

          return (
            <Fragment key={to}>
              {to === '/trash' ? (
                <div
                  className="my-1 hidden border-t border-[#0F172A]/8 lg:block"
                  role="separator"
                  aria-hidden="true"
                />
              ) : null}
              <Link
                to={to}
                title={collapsed ? label : undefined}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[13px] font-medium transition lg:w-full lg:flex-none lg:flex-row lg:gap-0 ${
                  collapsed
                    ? 'lg:justify-center lg:px-0 lg:py-2.5'
                    : 'lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 lg:text-left'
                } ${active ? 'bg-[#E4E4E4] text-[#34322D]' : ' hover:bg-[#E4E4E4]'}`}
              >
                <Icon className="size-[18px] shrink-0 opacity-90" strokeWidth={active ? 2 : 1.75} />
                <span
                  className={`text-[10px] leading-none lg:text-[13px] ${collapsed ? 'lg:sr-only' : ''}`}
                >
                  {label}
                </span>
              </Link>
            </Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
