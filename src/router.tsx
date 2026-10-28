import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import RouteErrorComponent from '@/components/common/RouteErrorComponent';

export const router = createRouter({
  routeTree,
  // 배포로 사라진 라우트 조각을 만나면 한 번 새로고침한다. 그 밖의 오류는 그대로 둔다
  defaultErrorComponent: RouteErrorComponent,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
