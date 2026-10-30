import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
