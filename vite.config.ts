import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import solid from 'solid-start';
import cloudflare from 'solid-start-cloudflare-workers';

export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-jsx',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [remarkGfm],
      }),
      enforce: 'pre',
    },
    solid({ 
      extensions: ['.md', '.mdx'], 
      adapter: cloudflare(), 
      hot: false,
    }),
  ],
  optimizeDeps: {
    include: [],
    exclude: ['@solid.js/docs'],
  },
  resolve: {
    conditions: ['solid'],
    dedupe: ["solid-js"]
  },
  ssr: {
    noExternal: ["solid-dismiss", "solid-heroicons", "solid-app-router"],
    external: ["solid-repl", "monaco-editor", "solid-markdown"],
  },
  build: {
    polyfillDynamicImport: false,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
