import { defineConfig } from 'vite';

export default defineConfig({
  // TODO (ajb): Need to add client build for vue

  // server build
  build: {
    lib: {
      entry: './src/server/index.ts',
      formats: ['cjs'],
      fileName: () => 'server/index.js',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['@hapi/hapi', '@duckdb/node-api', 'path'],
    },
    emptyOutDir: true,
    target: 'node20',
    minify: false,
  }
});