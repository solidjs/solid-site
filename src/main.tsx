/* eslint-disable import/no-unresolved */
import 'windi.css';
import './assets/main.css';

import { createApp } from 'solid-utils';
import { MetaProvider } from 'solid-meta';
import { Router } from 'solid-app-router';

import { App } from './App';
import { routes } from './routes';

const dispose = createApp(App).use(MetaProvider).use(Router, { routes }).mount('#app');

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
