import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import AppRouterEffects from '@/components/auth/AppRouterEffects';
import GitHubAppInstallPromptDialog from '@/components/auth/GitHubAppInstallPromptDialog';
import NotFoundPage from '@/components/layout/NotFoundPage';
import RouteErrorComponent from '@/components/common/RouteErrorComponent';
import AnalyticsPageView from '@/components/common/AnalyticsPageView';
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

/**
 * 로그인 없이 보는 공개 페이지. 앱 사이드바 없이 랜딩과 같은 틀로 띄운다.
 * 여기 넣는 경로는 public/sitemap.xml 과 vite.config.ts 의 PUBLIC_SPA_PAGES 에도 있어야 한다.
 */
function isPublicPage(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname.startsWith('/template') ||
    pathname === '/terms' ||
    pathname === '/privacy'
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showAppChrome = !isPublicPage(pathname);

  return (
    <>
      <AppRouterEffects />
      <SeoHead />
      {/* SeoHead 뒤에 둔다 — 바뀐 제목을 읽어야 한다(AnalyticsPageView 주석 참고) */}
      <AnalyticsPageView />
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
