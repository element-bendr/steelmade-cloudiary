import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['__tests__/**/*.test.{ts,tsx}'],
    exclude: ['modules/**'],
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
});
