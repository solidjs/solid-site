import { defineConfig, PluginOption } from 'vite';
import solid from 'vite-plugin-solid';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  define: {
    __UPDATED_AT__: JSON.stringify(new Date().toLocaleString()),
    __SOLID_VERSION__: JSON.stringify('1.4.7'),
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
