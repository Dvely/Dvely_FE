import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import AppRouterEffects from '@/components/auth/AppRouterEffects';
import GitHubAppInstallPromptDialog from '@/components/auth/GitHubAppInstallPromptDialog';
import NotFoundPage from '@/components/layout/NotFoundPage';
import AppSidebar from '@/components/common/AppSidebar';
import { AssetLoadFailureNotice } from '@/components/common/AssetLoadFailureNotice';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
});

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showAppChrome = pathname !== '/' && !pathname.startsWith('/template');

  return (
    <>
      <AppRouterEffects />
      <AssetLoadFailureNotice />
      <GitHubAppInstallPromptDialog />

      {!showAppChrome ? (
        <div className="min-h-screen w-full bg-white text-[#0f172a]">
          <Outlet />
        </div>
      ) : (
        /*
          lg 미만에서는 사이드바가 하단 탭바가 되므로 축을 세로로 눕히고, 본문이 먼저
          오도록 order 를 뒤집는다. lg 이상은 기존 가로 배치 그대로다.
        */
        <div className="flex h-dvh w-full flex-col overflow-hidden bg-white text-[#0f172a] lg:flex-row">
          <AppSidebar />
          <main
            id="app-main-scroll"
            className="order-first min-h-0 min-w-0 flex-1 overflow-y-auto lg:order-none"
          >
            {/* <HeaderContainer /> */}
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
