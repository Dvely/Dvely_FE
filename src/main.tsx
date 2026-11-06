import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import './index.css';
import '@/lib/i18n';
import { initAnalytics } from '@/lib/analytics';
import { listenForAssetLoadFailure } from '@/lib/assetLoadFailure';
import { queryClient } from '@/lib/queryClient';
import { router } from './router';

if (import.meta.env.DEV) {
  void import('@locator/runtime').then(({ default: setupLocatorUI }) => {
    setupLocatorUI();
  });
}

/*
  나눠 받는 조각을 못 받는 일은 어느 화면에서든 난다. 그래서 신호도 앱 시작 때 한 번
  걸고 앱 전체가 하나를 본다 — 화면마다 따로 잡으면 그 화면에서만 알리게 된다.
*/
listenForAssetLoadFailure();

/*
  분석도 앱 시작 때 한 번 건다. 클릭 리스너는 문서에 하나만 두고, 화면 전환은 __root 의
  AnalyticsPageView 가 보낸다. 운영 빌드·실제 호스트·측정 ID 중 하나라도 아니면 아무것도 붙지
  않는다(src/lib/analytics.ts).
*/
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      ) : null}
    </QueryClientProvider>
  </StrictMode>,
);
