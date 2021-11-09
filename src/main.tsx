import './assets/main.css';

import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'solid-utils';
import { MetaProvider } from 'solid-meta';

if (!('scrollBehavior' in document.documentElement.style)) {
  await import('scroll-behavior-polyfill');
}

import { App } from './App';

createApp(App).use(MetaProvider).mount('#app');

// Register service worker
registerSW({ onOfflineReady() {} });
