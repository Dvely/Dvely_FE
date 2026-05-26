import { Fragment, useEffect } from 'react';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import NotFoundPage from '@/components/layout/NotFoundPage';
import HeaderContainer from '@/components/layout/header/HeaderContainer';
import { GITHUB_OAUTH_SUCCESS_MESSAGE } from '@/constants/githubOAuth';
import { isAppShellPath, isAuthPath } from '@/lib/appRoutes';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
});

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showMarketingHeader = !isAppShellPath(pathname) && !isAuthPath(pathname);

  useEffect(() => {
    const handleOAuthSuccess = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== GITHUB_OAUTH_SUCCESS_MESSAGE) return;
      window.location.assign('/');
    };

    window.addEventListener('message', handleOAuthSuccess);
    return () => window.removeEventListener('message', handleOAuthSuccess);
  }, []);

  return (
    <Fragment>
      {showMarketingHeader ? <HeaderContainer /> : null}
      <Outlet />
    </Fragment>
  );
}
