import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [remarkGfm],
      }),
      enforce: 'pre',
    },
    solid({ extensions: ['.md', '.mdx'] }),
    // VitePWA(pwaOptions),
  ],
  optimizeDeps: {
    include: [],
    exclude: ['@solid.js/docs'],
  },
  build: {
    target: 'esnext',
  },
});
