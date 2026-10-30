import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import AppRouterEffects from '@/components/auth/AppRouterEffects';
import GitHubAppInstallPromptDialog from '@/components/auth/GitHubAppInstallPromptDialog';
import NotFoundPage from '@/components/layout/NotFoundPage';
import RouteErrorComponent from '@/components/common/RouteErrorComponent';
import AppSidebar from '@/components/common/AppSidebar';
import { AssetLoadFailureNotice } from '@/components/common/AssetLoadFailureNotice';
import SeoHead from '@/components/common/SeoHead';
import ServiceSuspendedDialog from '@/components/common/ServiceSuspendedDialog';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
  /*
    라우터 설정의 `defaultErrorComponent` 는 **자식 라우트**가 던진 것을 받는다. 루트
    자신이 던지면 거기까지 안 가므로 여기에도 같은 것을 건다. 둘 다 걸어 두면 어느
    높이에서 터져도 한국어 화면이 선다.
  */
  errorComponent: RouteErrorComponent,
});

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showAppChrome = pathname !== '/' && !pathname.startsWith('/template');

  return (
    <>
      <AppRouterEffects />
      <SeoHead />
      <AssetLoadFailureNotice />
      <GitHubAppInstallPromptDialog />
      <ServiceSuspendedDialog />

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
