import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

/*
  GitHub Pages 에는 SPA fallback 이 없어서, 모르는 경로는 404.html(= index.html 사본)을 **상태
  코드 404 로** 내준다. 화면은 뜨지만 검색엔진은 그 페이지를 없는 페이지로 본다.

  Pages 는 /terms 요청에 terms.html 이 있으면 그것을 200 으로 준다. 그래서 공개 페이지마다
  index.html 사본을 그 이름으로 둔다. /template 은 deploy-pages.yml 의 "Add SPA fallback"
  단계가 이미 같은 일을 한다 — 워크플로는 BATHOS freeze-guard 대상이라 거기를 고치는 대신
  빌드 단계에서 만든다. 결과물이 같으므로 두 곳이 겹쳐도 해가 없다.

  새 공개 페이지를 만들면 여기, src/routes/__root.tsx 의 isPublicPage, public/sitemap.xml 에
  같이 넣는다.
*/
const PUBLIC_SPA_PAGES = ['template', 'terms', 'privacy'] as const;

function publicSpaPages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'qeploy-public-spa-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html');
      if (!fs.existsSync(index)) return;
      for (const page of PUBLIC_SPA_PAGES) {
        fs.copyFileSync(index, path.join(outDir, `${page}.html`));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 라우트마다 청크를 쪼갠다. 안 그러면 홈만 열어도 프로젝트 상세·설정·에이전트
    // 화면 코드까지 한 덩어리로 내려받는다
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    babel({
      plugins: [['@locator/babel-jsx/dist', { env: 'development' }]],
    }),
    tailwindcss(),
    publicSpaPages(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    /*
      폰트는 작아도 CSS 에 base64 로 넣지 않는다.

      Pretendard 는 unicode-range 조각으로 나뉘어 있어(src/styles/pretendard.css) 4KB 미만
      조각이 몇 개 생긴다. 기본값대로 인라인하면 그 조각들이 화면에 그 글자가 없어도
      렌더링을 막는 첫 CSS 에 실려 내려간다 — 조각으로 나눈 이유가 거꾸로 된다.
      나머지 자산은 vite 기본(4KB)을 따른다.
    */
    assetsInlineLimit: (filePath) => (/\.woff2?$/.test(filePath) ? false : undefined),
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
