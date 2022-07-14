import { defineConfig, PluginOption } from 'vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import solid from 'solid-start/vite';
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
      }),
      enforce: 'pre',
    } as PluginOption,
    solid({
      extensions: ['.md', '.mdx'],
    }),
  ],
  ssr: {
    noExternal: ['solid-dismiss', 'solid-heroicons', 'solid-docs'],
  },
  build: {
    target: 'esnext',
  },
});
