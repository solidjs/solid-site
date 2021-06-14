import { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import { ContributorsData } from './pages/Contributors.data';
import { BenchmarkData } from './pages/Benchmarks.data';
import { DocsData } from './pages/Docs.data';
import { TutorialData } from './pages/Tutorial.data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: () => ({ benchmarks: BenchmarkData() }),
  },
  {
    path: '/docs/:version',
    component: lazy(() => import('./pages/Docs')),
    data: DocsData,
  },
  {
    path: '/examples/:id',
    component: lazy(() => import('./pages/Examples')),
  },
  {
    path: '/tutorial/:id',
    component: lazy(() => import('./pages/Tutorial')),
    data: TutorialData,
  },
  {
    path: '/contributors',
    component: lazy(() => import('./pages/Contributors')),
    data: ContributorsData,
  },
  {
    path: '/resources',
    component: lazy(() => import('./pages/Resources')),
  },
  {
    path: '/media',
    component: lazy(() => import('./pages/Media')),
  },
];
