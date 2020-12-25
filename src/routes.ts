import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import { DocsData } from './pages/Docs.data';

export const routes: RouteDefinition[] = [
  {
    path: '/docs/:version/:page',
    component: lazy(() => import('./pages/Docs')),
    data: DocsData,
  },
  {
    path: '/media',
    component: lazy(() => import('./pages/Media')),
  },
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
  },
];
