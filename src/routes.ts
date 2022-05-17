import { lazy } from 'solid-js';
import { RouteDefinition, Navigate } from 'solid-app-router';
import { ContributorsData } from './pages/Contributors.data';
import { BenchmarkData } from './pages/Benchmarks.data';
import { DocsData } from './pages/Docs.data';
import { GuideData } from './pages/Guide.data';
import { TutorialData } from './pages/Tutorial.data';
import { ResourceData } from './pages/Resources.data';
import { ExamplesData } from './pages/Examples.data';
import { BlogData } from './pages/Blog.data';
import { BlogArticleData } from './pages/BlogArticle.data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    data: () => ({
      benchmarks: BenchmarkData(),
    }),
  },
  {
    path: '/guides/:id',
    component: lazy(() => import('./pages/Docs')),
    data: GuideData,
  },
  {
    path: '/hack',
    component: () => {
      typeof window !== 'undefined' && (window.location.href = 'https://hack.solidjs.com');
      return null;
    },
  },
  {
    path: '/guide',
    component: () => Navigate({ href: '/guides/getting-started' }),
    data: GuideData,
  },
  {
    path: '/guides',
    component: () => Navigate({ href: '/guides/getting-started' }),
    data: GuideData,
  },
  {
    path: '/blog/:slug',
    component: lazy(() => import('./pages/BlogArticle')),
    data: BlogArticleData,
  },
  {
    path: '/blog',
    component: lazy(() => import('./pages/Blog')),
    data: BlogData,
  },
  {
    path: '/docs',
    component: lazy(() => import('./pages/Docs')),
    children: [
      {
        path: '/:version',
        component: lazy(() => import('./pages/Docs')),
      },
      {
        path: '/*all',
        component: lazy(() => import('./pages/Docs')),
      },
    ],
    data: DocsData,
  },
  {
    path: '/tutorial/:id',
    component: lazy(() => import('./pages/Tutorial')),
    data: TutorialData,
  },
  {
    path: '/tutorial',
    component: () => Navigate({ href: '/tutorial/introduction_basics' }),
  },

  {
    path: '/examples/:id',
    component: lazy(() => import('./pages/Examples')),
    data: ExamplesData,
  },
  {
    path: '/examples',
    component: () => Navigate({ href: '/examples/counter' }),
  },
  {
    path: '/contributors',
    component: lazy(() => import('./pages/Contributors')),
    data: ContributorsData,
  },
  {
    path: '/ecosystem',
    component: lazy(() => import('./pages/Resources')),
    data: ResourceData,
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
    path: '/*all',
    component: lazy(() => import('./pages/404')),
  },
];
