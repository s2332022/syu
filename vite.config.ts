import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Built for GitHub Pages under the repository `s2332022/syu`.
// Set `base` so asset URLs resolve when served from https://s2332022.github.io/syu/
// Force base to '/syu/' for production builds so built HTML points to the
// correct repository path on GitHub Pages. If you want a different behavior
// for local dev, run the dev server which ignores this base for asset serving.
export default defineConfig({
  // Use relative base so built HTML uses relative paths (works on GitHub Pages)
  base: './',
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
});
