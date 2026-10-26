import { QueryClient } from '@tanstack/react-query';

/*
  받아온 것을 잠시 들고 있는다.

  예전에는 쿼리마다 `gcTime: 0` 이 박혀 있었다. 그러면 화면을 떠나는 순간 캐시가
  버려져서, **목록 → 상세 → 뒤로가기 때마다 빈 화면과 스켈레톤을 다시 본다.** 방금
  보고 있던 목록인데 처음 들어온 것처럼 그려진다. 뒤로가기는 "아까 그 자리로 돌아간다"
  는 약속인데 그 약속이 깨지고, 목록이 없으니 스크롤 위치도 복원할 대상이 없어 맨 위로
  튄다.

  **`staleTime` 은 건드리지 않는다(기본 0).** 낡은 데이터를 막는 것은 `staleTime` 과
  invalidate 의 일이지 `gcTime` 의 일이 아니다. 그래서 이 설정으로 재요청 동작은 달라지지
  않는다 — 마운트할 때마다 여전히 서버에 다시 묻는다. 달라지는 것은 **묻는 동안 빈
  화면이 아니라 직전 내용을 보여준다**는 것뿐이다.

  토큰이 회전하는 프리뷰 열람 권한만 예외로 `gcTime: 0` 을 남겼다(usePreviewAccessQuery).
  그건 캐시가 남으면 이미 무효가 된 주소를 다시 쓰게 된다.

  **main.tsx 가 아니라 여기에 둔다.** 로그아웃이 이 캐시를 비워야 하는데(`logoutSession`),
  main.tsx 는 앱 전체를 끌고 들어오는 진입점이라 거기서 가져오면 순환 참조가 된다.
*/
const CACHE_RETENTION_MS = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_RETENTION_MS,
    },
  },
});
