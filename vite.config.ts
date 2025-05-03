import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['cjs'],
      fileName: () => 'index.js',
    },
    outDir: 'dist',
    rollupOptions: {
      external: [],
    },
    emptyOutDir: true,
    target: 'node20',
    minify: true,
  }
});