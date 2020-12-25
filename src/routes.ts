
import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Docs')),
  },
  // {
  //   path: '/',
  //   component: lazy(() => import('./pages/Media')),
  // },
  // {
  //   path: '/',
  //   component: lazy(() => import('./pages/Home')),
  // },
];
