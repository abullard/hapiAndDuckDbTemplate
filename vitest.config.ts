/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    // AJB: feel free to add other pattern matchers here
    include: ['**/__tests__/**/*.spec.ts'],
    exclude: ['node_modules'],
    globals: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
});
