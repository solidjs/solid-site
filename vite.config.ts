import { defineConfig, PluginOption } from 'vite';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import solid from 'solid-start/vite';
import * as pckg from './package.json';

export default defineConfig({
  define: {
    __UPDATED_AT__: JSON.stringify(new Date().toLocaleString()),
    __SOLID_VERSION__: JSON.stringify(pckg.dependencies['solid-js']),
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
  ],
  ssr: {
    noExternal: ['solid-dismiss', 'solid-heroicons', 'solid-docs'],
  },
  build: {
    target: 'esnext',
  },
});
