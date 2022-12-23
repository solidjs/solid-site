import { defineConfig, type Plugin } from 'vite';
import solid from 'vite-plugin-solid';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { dependencies } from './package.json' assert { type: 'json' };

export default defineConfig({
  define: {
    __UPDATED_AT__: JSON.stringify(new Date().toLocaleString()),
    __SOLID_VERSION__: JSON.stringify(dependencies['solid-js']),
  },
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
      enforce: 'pre',
    } as Plugin,
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
