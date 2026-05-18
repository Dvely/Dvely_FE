import * as React from 'react';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import NotFoundPage from '@/components/layout/NotFoundPage';
import HeaderContainer from '@/components/layout/header/HeaderContainer';
import { isAppShellPath, isAuthPath } from '@/lib/appRoutes';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
});

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showMarketingHeader = !isAppShellPath(pathname) && !isAuthPath(pathname);

  return (
    <React.Fragment>
      {showMarketingHeader ? <HeaderContainer /> : null}
      <Outlet />
    </React.Fragment>
  );
}
