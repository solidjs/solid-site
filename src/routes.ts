import { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import { ContributorsData } from './pages/Contributors.data';
import { BenchmarkData } from './pages/Benchmarks.data';
import { DocsData } from './pages/Docs.data';
import { TutorialData } from './pages/Tutorial.data';
import { ResourceData } from './pages/Resources.data';
import { Redirect } from './components/Redirect';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: () => ({
      benchmarks: BenchmarkData(),
    }),
  },
  {
    path: '/docs',
    component: lazy(() => import('./pages/Docs')),
    children: [
      { path: ':version', component: lazy(() => import('./pages/Docs')) },
      { path: '*all', component: lazy(() => import('./pages/Docs')) },
    ],
    data: DocsData,
  },
  {
    path: '/examples/:id',
    component: lazy(() => import('./pages/Examples')),
  },
  {
    path: '/examples',
    component: Redirect('/examples/counter'),
  },
  {
    path: '/tutorial/:id',
    component: lazy(() => import('./pages/Tutorial')),
    data: TutorialData,
  },
  {
    path: '/tutorial',
    component: Redirect('/tutorial/introduction_basics'),
  },
  {
    path: '/contributors',
    component: lazy(() => import('./pages/Contributors')),
    data: ContributorsData,
  },
  {
    path: '/resources',
    component: lazy(() => import('./pages/Resources')),
    data: ResourceData,
  },
  {
    path: '/media',
    component: lazy(() => import('./pages/Media')),
  },
  {
    path: '*all',
    component: lazy(() => import('./pages/404')),
  },
];
