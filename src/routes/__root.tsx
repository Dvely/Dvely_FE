import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import AppRouterEffects from '@/components/auth/AppRouterEffects';
import GitHubAppInstallPromptDialog from '@/components/auth/GitHubAppInstallPromptDialog';
import NotFoundPage from '@/components/layout/NotFoundPage';
import AppSidebar from '@/components/common/AppSidebar';
import { IS_DEMO } from '@/demo/config';
import DemoDirectorPanel from '@/demo/DemoDirectorPanel';

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
      <GitHubAppInstallPromptDialog />
      {IS_DEMO ? <DemoDirectorPanel /> : null}

      {!showAppChrome ? (
        <div className="min-h-screen w-full bg-[#f8fafc] text-[#0f172a]">
          <Outlet />
        </div>
      ) : (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-[#0f172a]">
          <AppSidebar />
          <main id="app-main-scroll" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            {/* <HeaderContainer /> */}
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
