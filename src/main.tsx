import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import './index.css';
import '@/lib/i18n';
import { router } from './router';
import { IS_DEMO } from '@/demo/config';
import { startDemoHeartbeat } from '@/demo/heartbeat';

// 시연 중에는 개발 도구를 띄우지 않는다 — 화면 위에 뜨는 오버레이가 영상에 그대로 찍힌다
if (import.meta.env.DEV && !IS_DEMO) {
  void import('@locator/runtime').then(({ default: setupLocatorUI }) => {
    setupLocatorUI();
  });
}

const queryClient = new QueryClient();

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
