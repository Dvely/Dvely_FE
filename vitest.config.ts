import { defineConfig } from 'vitest/config';
import path from 'node:path';

/*
  vite.config.ts 를 그대로 쓰지 않는다.

  거기에는 라우트 생성 플러그인과 개발용 babel 변환(@locator)이 걸려 있다. 테스트에는
  쓸 일이 없는데 매 실행마다 돌고, 라우트 트리를 건드리는 플러그인은 테스트 실행 중에
  파일을 다시 쓰기도 한다. 필요한 것은 `@` 별칭 하나뿐이라 따로 둔다.
*/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    /*
      기본은 node 다. DOM 이 필요한 파일만 파일 상단 주석으로 happy-dom 을 고른다
      (`@vitest-environment happy-dom`). 전부 DOM 으로 돌리면 순수 함수 테스트까지
      브라우저 흉내 비용을 내고, CI 가 느려지는 만큼 사람들이 덜 돌리게 된다.
    */
    environment: 'node',
    /*
      `.tsx` 도 모은다. 컴포넌트 안에서만 벌어지는 배선(오류 분기·효과)은 순수 함수로
      꺼낼 수 없는 부분이 남고, 그 자리가 정확히 리팩터링에서 깨지기 쉬운 곳이다.

      DOM 이 필요한 파일은 지금까지처럼 파일 상단 주석으로 고른다
      (`// @vitest-environment happy-dom`). 전부 DOM 으로 돌리면 순수 함수 테스트까지
      브라우저 흉내 비용을 낸다.
    */
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    /** 테스트가 저장소를 건드려 서로 영향을 주지 않도록 */
    restoreMocks: true,
    unstubGlobals: true,
  },
});
