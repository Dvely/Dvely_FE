import { defineConfig, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

/**
 * 시연 전용 정적 파일. 시연 프리뷰(todo 앱)는 public 에 있어야 같은 오리진으로 열리지만,
 * public 은 빌드마다 통째로 복사되므로 운영 산출물에서는 걷어낸다.
 */
const DEMO_ONLY_PUBLIC = ['demo-preview'];

/**
 * 시연 프리뷰를 실제 프리뷰 게이트웨이 주소로 연다.
 *
 * 운영의 프리뷰는 `/api/v1/previews/{세션}/{토큰}/` 로 같은 오리진에서 열리고, 저장소를
 * 잇기 전에는 그 주소가 프리뷰 주소창에 그대로 찍힌다. 시연도 같은 주소를 쓰고, 그 경로를
 * 여기서 시연용 정적 파일로 돌려준다. 이 미들웨어가 없으면 SPA 폴백이 앱을 프리뷰 안에
 * 한 번 더 띄운다.
 */
const DEMO_PREVIEW_GATEWAY = '/api/v1/previews/';
const rewriteDemoPreview: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url?.startsWith(DEMO_PREVIEW_GATEWAY)) req.url = '/demo-preview/index.html';
  next();
};
const demoPreviewGateway: Plugin = {
  name: 'demo-preview-gateway',
  configureServer(server) {
    server.middlewares.use(rewriteDemoPreview);
  },
  configurePreviewServer(server) {
    server.middlewares.use(rewriteDemoPreview);
  },
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    // 라우트마다 청크를 쪼갠다. 안 그러면 홈만 열어도 프로젝트 상세·설정·에이전트
    // 화면 코드까지 한 덩어리로 내려받는다
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    babel({
      plugins: [['@locator/babel-jsx/dist', { env: 'development' }]],
    }),
    tailwindcss(),
    ...(mode === 'demo' ? [demoPreviewGateway] : []),
    {
      name: 'drop-demo-only-public',
      apply: 'build',
      closeBundle() {
        if (mode === 'demo') return;
        for (const dir of DEMO_ONLY_PUBLIC) {
          fs.rmSync(path.resolve(__dirname, 'dist', dir), { recursive: true, force: true });
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    /*
      시연 모드는 백엔드를 부르지 않으므로 어느 오리진에서 열어도 된다.
      원격(ssh)에서 다른 기기 브라우저로 열어야 해서 모든 인터페이스에 붙이고,
      프록시가 호스트명을 씌워도 막지 않는다.

      평소 개발에서는 그대로 loopback 이다 — DNS 리바인딩 보호를 시연 때만 내려놓는다.
    */
    ...(mode === 'demo' ? { host: true, allowedHosts: true } : {}),
  },
}));
