// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  RouterProvider,
} from '@tanstack/react-router';
import AnalyticsPageView from '@/components/common/AnalyticsPageView';
import SeoHead from '@/components/common/SeoHead';
import { initAnalytics } from '@/lib/analytics';

/*
  실제 라우터로 화면을 옮겨 가며 page_view 가 **이동마다 한 번씩** 나가는지 본다.

  순수 함수 테스트(src/lib/analytics.test.ts)로는 못 보는 것이 셋 있다 — 라우터가 정착한
  뒤에야 세는지(beforeLoad 리다이렉트로 거쳐 간 주소를 세지 않는지), 첫 화면을 한 번 세는지,
  그리고 SeoHead 가 바꾼 제목을 읽는지. 루트는 __root 와 같은 순서(SeoHead → AnalyticsPageView)로
  둔다.

  라우트는 앱 것을 그대로 쓰지 않고 같은 모양으로 작게 다시 만든다. 앱 라우트 트리는 화면마다
  API 와 저장소를 건드려 테스트가 그 준비에 묻힌다.
*/

function buildRouter(initialEntry: string) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <SeoHead />
        <AnalyticsPageView />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <p>랜딩</p>,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/template',
      component: () => <p>템플릿 갤러리</p>,
    }),
    // 앱의 /callback 과 같다 — OAuth 코드를 들고 /auth/callback 으로 넘긴다
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/callback',
      beforeLoad: ({ search }) => {
        throw redirect({ to: '/auth/callback', search, replace: true });
      },
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/auth/callback',
      component: () => <p>로그인 처리 중</p>,
    }),
    // 로그인 전 requireAuth 처럼 랜딩으로 되돌려 보낸다
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/home',
      beforeLoad: () => {
        throw redirect({ to: '/' });
      },
    }),
    // 나눠 받는 조각을 기다리는 화면을 흉내 낸다 — 정착하기 전에는 세면 안 된다
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/project',
      loader: () => new Promise<void>((resolve) => setTimeout(resolve, 20)),
      component: () => <p>프로젝트</p>,
    }),
  ]);

  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
  });
}

function pageViews() {
  return (window.dataLayer ?? [])
    .map((entry) => Array.from(entry as ArrayLike<unknown>))
    .filter(([command, name]) => command === 'event' && name === 'page_view')
    .map(([, , params]) => params as { page_location: string; page_title: string });
}

const at = (path: string) => `${window.location.origin}${path}`;

let dispose: () => void = () => {};

beforeEach(() => {
  // gtag.js 는 받지 않는다. 쌓이는 명령만 본다
  const { settings } = (
    window as unknown as {
      happyDOM: {
        settings: {
          disableJavaScriptFileLoading: boolean;
          handleDisabledFileLoadingAsSuccess: boolean;
        };
      };
    }
  ).happyDOM;
  settings.disableJavaScriptFileLoading = true;
  settings.handleDisabledFileLoadingAsSuccess = true;

  dispose = initAnalytics({ measurementId: 'G-TEST123', enabled: true });
});

afterEach(() => {
  cleanup();
  dispose();
  delete window.dataLayer;
  document.title = '';
});

describe('AnalyticsPageView', () => {
  it('첫 화면을 한 번, 이후 이동마다 한 번씩 보낸다', async () => {
    const router = buildRouter('/');
    render(<RouterProvider router={router} />);
    await screen.findByText('랜딩');

    await act(() => router.navigate({ to: '/template' }));
    await screen.findByText('템플릿 갤러리');

    await act(() => router.navigate({ to: '/' }));
    await screen.findByText('랜딩');

    expect(pageViews().map((view) => view.page_location)).toEqual([
      at('/'),
      at('/template'),
      at('/'),
    ]);
  });

  it('SeoHead 가 바꾼 제목을 읽는다', async () => {
    const router = buildRouter('/template');
    render(<RouterProvider router={router} />);
    await screen.findByText('템플릿 갤러리');

    expect(pageViews()).toEqual([
      { page_location: at('/template'), page_title: '템플릿 갤러리 | Qeploy' },
    ]);
  });

  it('OAuth 콜백의 code·state 는 GA 로 가지 않고, 거쳐 간 /callback 은 세지 않는다', async () => {
    const router = buildRouter('/callback?code=oauth-secret&state=state-secret');
    render(<RouterProvider router={router} />);
    await screen.findByText('로그인 처리 중');

    // 라우터에는 code 가 그대로 있다 — 지운 것은 GA 로 보내는 쪽이다
    expect(router.state.location.searchStr).toContain('oauth-secret');
    expect(pageViews()).toEqual([
      { page_location: at('/auth/callback'), page_title: expect.any(String) },
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/oauth-secret|state-secret/);
  });

  it('beforeLoad 가 되돌려 보낸 주소는 세지 않는다', async () => {
    const router = buildRouter('/template');
    render(<RouterProvider router={router} />);
    await screen.findByText('템플릿 갤러리');

    await act(() => router.navigate({ to: '/home' }));
    await screen.findByText('랜딩');

    expect(pageViews().map((view) => view.page_location)).toEqual([at('/template'), at('/')]);
  });

  it('로더를 기다리는 동안이 아니라 화면이 선 뒤에 한 번 센다', async () => {
    const router = buildRouter('/');
    render(<RouterProvider router={router} />);
    await screen.findByText('랜딩');

    const navigation = act(() => router.navigate({ to: '/project' }));
    expect(pageViews().map((view) => view.page_location)).toEqual([at('/')]);

    await navigation;
    await screen.findByText('프로젝트');
    expect(pageViews().map((view) => view.page_location)).toEqual([at('/'), at('/project')]);
  });

  it('같은 화면에서 query·hash 만 바뀌면 다시 세지 않는다', async () => {
    const router = buildRouter('/template');
    render(<RouterProvider router={router} />);
    await screen.findByText('템플릿 갤러리');

    await act(() => router.navigate({ to: '/template', search: { type: 'landing' } as never }));
    await act(() => router.navigate({ to: '/template', hash: 'gallery' }));

    expect(pageViews()).toHaveLength(1);
  });
});
