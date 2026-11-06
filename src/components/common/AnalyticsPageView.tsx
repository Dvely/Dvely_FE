import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { trackPageView } from '@/lib/analytics';

/*
  라우터가 이동을 끝낼 때마다 GA 에 page_view 를 하나 보낸다. 첫 화면도 같은 길로 한 번 나간다.

  SPA 라 gtag 의 기본 page_view 는 첫 문서만 센다. 그래서 기본 전송은 끄고
  (`send_page_view: false`, src/lib/analytics.ts) 여기서 직접 보낸다.

  **`location` 이 아니라 `resolvedLocation` 을 본다.** 라우터는 `onResolved` 이벤트를 낸 바로
  그 자리에서 이 값을 갱신한다 — beforeLoad·로더·나눠 받는 조각이 다 끝나 실제로 화면에 선
  주소다. `location` 은 이동을 시작할 때 바뀌어서, beforeLoad 가 되돌려 보낸 주소(로그인 전의
  /home → /)까지 한 번씩 센다.

  `router.subscribe('onResolved')` 와 같은 신호인데 컴포넌트 효과로 받는 이유는 제목이다.
  그 이벤트는 Transitioner 의 layout effect 안에서 나가므로, SeoHead 가 useEffect 로 바꾼
  document.title 이 그때 이미 바뀌어 있는지는 "위치 변경이 앞 커밋에서 동기로 끝났다" 는 라우터
  내부 사정에 달려 있다. 이 효과는 resolvedLocation 이 바뀐 **다음 렌더**에서 돌고, React 는
  새 렌더 전에 앞 커밋의 효과를 모두 끝내 둔다 — 그래서 라우터 구현과 상관없이 바뀐 제목을
  읽는다. __root 에서 SeoHead 뒤에 둔 것은 둘이 한 커밋에 같이 바뀌는 경우를 위한 덧댐이다
  (효과는 형제 순서대로 돈다).

  분석이 꺼져 있으면 trackPageView 가 아무 일도 하지 않는다.
*/
export default function AnalyticsPageView() {
  const pathname = useRouterState({ select: (state) => state.resolvedLocation?.pathname });

  useEffect(() => {
    if (pathname === undefined) return;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
