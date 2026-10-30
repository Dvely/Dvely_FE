import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import './index.css';
import '@/lib/i18n';
import { listenForAssetLoadFailure } from '@/lib/assetLoadFailure';
import { queryClient } from '@/lib/queryClient';
import { router } from './router';
import { IS_DEMO } from '@/demo/config';
import { startDemoHeartbeat } from '@/demo/heartbeat';

// 시연 중에는 개발 도구를 띄우지 않는다 — 화면 위에 뜨는 오버레이가 영상에 그대로 찍힌다
if (import.meta.env.DEV && !IS_DEMO) {
  void import('@locator/runtime').then(({ default: setupLocatorUI }) => {
    setupLocatorUI();
  });
}

/*
  나눠 받는 조각을 못 받는 일은 어느 화면에서든 난다. 그래서 신호도 앱 시작 때 한 번
  걸고 앱 전체가 하나를 본다 — 화면마다 따로 잡으면 그 화면에서만 알리게 된다.
*/
listenForAssetLoadFailure();

// 스스로 다시 읽지 않는 화면도 시연에서는 상태가 넘어가는 것이 보여야 한다
if (IS_DEMO) {
  startDemoHeartbeat(queryClient);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && !IS_DEMO ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      ) : null}
    </QueryClientProvider>
  </StrictMode>,
);
