import {
  BarChart2,
  FolderKanban,
  SquarePen,
  LayoutTemplate,
  PanelLeft,
  PanelRight,
  Settings,
} from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import type { AppShellPath } from '@/lib/appRoutes';

const navItems: {
  to: AppShellPath;
  label: string;
  icon: typeof SquarePen;
}[] = [
  { to: '/tasks', label: '작업', icon: SquarePen },
  { to: '/project', label: '프로젝트', icon: FolderKanban },
  { to: '/templates', label: '템플릿', icon: LayoutTemplate },
  { to: '/analytics', label: '분석', icon: BarChart2 },
  { to: '/settings', label: '설정', icon: Settings },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <aside
      className={`flex flex-col border-r border-[#0F172A]/8 bg-white transition-[width] duration-200 ease-out ${
        collapsed ? 'w-[76px]' : 'w-[260px]'
      }`}
    >
      <div
        className={`flex items-center py-5 ${collapsed ? 'flex-col gap-3 px-2' : 'justify-between px-4'}`}
      >
        <div className={`flex items-center ${collapsed ? 'flex-col gap-1' : 'gap-3'}`}>
          <div className="size-9 rounded-xl border border-[#7C3AED]/20 bg-[linear-gradient(135deg,rgba(192,132,252,0.95)_0%,rgba(109,40,217,0.75)_100%)] shadow-[0_8px_20px_rgba(124,58,237,0.2)]" />
          {!collapsed ? (
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[15px] font-semibold tracking-tight text-[#0B0C12]">
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

      <nav className={`flex flex-1 flex-col gap-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;

          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={`flex w-full items-center rounded-xl text-[13px] font-medium transition ${
                collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5 text-left'
              } ${
                active
                  ? 'bg-[linear-gradient(135deg,rgba(192,132,252,0.95)_0%,rgba(109,40,217,0.75)_100%)] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[linear-gradient(135deg,rgba(192,132,252,0.95)_0%,rgba(109,40,217,0.75)_100%)] hover:text-[#0B0C12]'
              }`}
            >
              <Icon className="size-[18px] shrink-0 opacity-90" strokeWidth={active ? 2 : 1.75} />
              {!collapsed ? <span>{label}</span> : <span className="sr-only">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
