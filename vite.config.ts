import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@lib': resolve(__dirname, './src/lib'),
      '@locales': resolve(__dirname, './src/locales'),
      '@app': resolve(__dirname, './src/app'),
    },
  },
  plugins: [react()],
});
