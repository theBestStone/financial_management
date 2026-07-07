import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pcweb-cdn': {
        target: 'https://pcweb.shanghuiyidisk.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pcweb-cdn/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Referer', 'https://www.efmac.net/');
            proxyReq.setHeader('Origin', 'https://www.efmac.net');
          });
        },
      },
    },
  },
  preview: {
    proxy: {
      '/pcweb-cdn': {
        target: 'https://pcweb.shanghuiyidisk.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pcweb-cdn/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Referer', 'https://www.efmac.net/');
            proxyReq.setHeader('Origin', 'https://www.efmac.net');
          });
        },
      },
    },
  },
});
