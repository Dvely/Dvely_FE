import { useEffect } from 'react';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import NotFoundPage from '@/components/layout/NotFoundPage';
import AppSidebar from '@/components/common/AppSidebar';
import HeaderContainer from '@/components/layout/header/HeaderContainer';
import { GITHUB_OAUTH_SUCCESS_MESSAGE } from '@/constants/githubOAuth';
import { isAuthLayoutPath } from '@/lib/appRoutes';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
});

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showAppChrome = !isAuthLayoutPath(pathname);

  useEffect(() => {
    const handleOAuthSuccess = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== GITHUB_OAUTH_SUCCESS_MESSAGE) return;
      window.location.assign('/');
    };

    window.addEventListener('message', handleOAuthSuccess);
    return () => window.removeEventListener('message', handleOAuthSuccess);
  }, []);

  if (!showAppChrome) {
    return (
      <div className="min-h-screen w-full bg-[#f8fafc] text-[#0f172a]">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-[#0f172a]">
      <AppSidebar />
      <main id="app-main-scroll" className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <HeaderContainer />
        <Outlet />
      </main>
    </div>
  );
}
