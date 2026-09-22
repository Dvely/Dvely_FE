import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import './index.css';
import '@/lib/i18n';
import { router } from './router';

if (import.meta.env.DEV) {
  void import('@locator/runtime').then(({ default: setupLocatorUI }) => {
    setupLocatorUI();
  });
}

/*
  받아온 것을 잠시 들고 있는다.

  예전에는 쿼리마다 `gcTime: 0` 이 박혀 있었다. 그러면 화면을 떠나는 순간 캐시가
  버려져서, **목록 → 상세 → 뒤로가기 때마다 빈 화면과 스켈레톤을 다시 본다.** 방금
  보고 있던 목록인데 처음 들어온 것처럼 그려진다. 뒤로가기는 "아까 그 자리로 돌아간다"
  는 약속인데 그 약속이 깨지고, 목록이 없으니 스크롤 위치도 복원할 대상이 없어 맨 위로
  튄다.

  **`staleTime` 은 건드리지 않는다(기본 0).** 낡은 데이터를 막는 것은 `staleTime` 과
  invalidate 의 일이지 `gcTime` 의 일이 아니다. 그래서 이 변경으로 재요청 동작은 지금과
  똑같다 — 마운트할 때마다 여전히 서버에 다시 묻는다. 달라지는 것은 **묻는 동안 빈
  화면이 아니라 직전 내용을 보여준다**는 것뿐이다.

  토큰이 회전하는 프리뷰 열람 권한만 예외로 `gcTime: 0` 을 남겼다(usePreviewAccessQuery).
  그건 캐시가 남으면 이미 무효가 된 주소를 다시 쓰게 된다.
*/
const CACHE_RETENTION_MS = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_RETENTION_MS,
    },
  },
});

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
