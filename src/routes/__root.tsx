import * as React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import NotFoundPage from '@/components/layout/NotFoundPage';
import HeaderContainer from '@/components/layout/header/HeaderContainer';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
});

function RootComponent() {
  return (
    <React.Fragment>
      <HeaderContainer />
      <Outlet />
    </React.Fragment>
  );
}
