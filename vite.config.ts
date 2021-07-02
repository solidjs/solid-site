import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa'
import TerserOptions from './.terserrc';
import manifest from './src/assets/manifest.json';

const pwaOptions = {
  registerType: 'autoUpdate',  
  manifest,
  workbox: {}
};

export default defineConfig({
  plugins: [solid(), VitePWA(pwaOptions)],
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
