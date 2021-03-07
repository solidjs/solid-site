import './assets/main.css';

import { createApp } from 'solid-utils';
import { MetaProvider } from 'solid-meta';
import { Router } from 'solid-app-router';

import { App } from './App';
import { routes } from './routes';

createApp(App).use(MetaProvider).use(Router, { routes }).mount('#app');
