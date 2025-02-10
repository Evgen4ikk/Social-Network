import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      generatedRouteTree: './generated/router/index.ts'
    }),
    react()
  ],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/api': path.resolve(__dirname, './src/utils/api'),
      '@/generated': path.resolve(__dirname, './generated')
    }
  }
});
