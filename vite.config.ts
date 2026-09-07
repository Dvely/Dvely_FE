import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    TanStackRouterVite(),
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
    /*
      시연 모드는 백엔드를 부르지 않으므로 어느 오리진에서 열어도 된다.
      원격(ssh)에서 다른 기기 브라우저로 열어야 해서 모든 인터페이스에 붙이고,
      프록시가 호스트명을 씌워도 막지 않는다.

      평소 개발에서는 그대로 loopback 이다 — DNS 리바인딩 보호를 시연 때만 내려놓는다.
    */
    ...(mode === 'demo' ? { host: true, allowedHosts: true } : {}),
  },
}));
