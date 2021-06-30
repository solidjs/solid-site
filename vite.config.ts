import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import TerserOptions from './.terserrc';

export default defineConfig({
  plugins: [solid()],
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
    terserOptions: TerserOptions
  },
});
