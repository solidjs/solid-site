// @ts-check
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [solid(), pluginRewriteAll()],
  optimizeDeps: {
    include: [
      'prismjs/components/prism-typescript',
      'prismjs/components/prism-jsx',
      'prismjs/components/prism-json',
      'prismjs/components/prism-bash',
    ],
  },
  build: {
    polyfillDynamicImport: false,
    target: 'esnext',
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {}
      }
    }
  },
});
