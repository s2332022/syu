import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Built for GitHub Pages under the repository `s2332022/syu`.
// Set `base` so asset URLs resolve when served from https://s2332022.github.io/syu/
export default defineConfig(({ mode }) => ({
  // Use root base in development so the dev server serves at `/`.
  // Use '/syu/' for production builds (GitHub Pages repository name).
  base: mode === 'development' ? '/' : '/syu/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
}));
