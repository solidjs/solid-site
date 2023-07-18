import { lazy } from 'solid-js';
import { RouteDefinition, Navigate, RouteDataFunc } from '@solidjs/router';
import { ContributorsData } from './pages/Contributors.data';
import { BenchmarkData } from './pages/Benchmarks.data';
import { DocsData } from './pages/Docs.data';
import { GuideData } from './pages/Guide.data';
import { TutorialData } from './pages/Tutorial.data';
import { PackagesData } from './pages/Packages.data';
import { ResourcesData } from './pages/Resources.data';
import { ExamplesData } from './pages/Examples.data';
import { StoreData } from './pages/Store.data';
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
    data: GuideData as RouteDataFunc,
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
    data: GuideData as RouteDataFunc,
  },
  {
    path: '/guides',
    component: () => Navigate({ href: '/guides/getting-started' }),
    data: GuideData as RouteDataFunc,
  },
  {
    path: '/blog/:slug',
    component: lazy(() => import('./pages/BlogArticle')),
    data: BlogArticleData as RouteDataFunc,
  },
  {
    path: '/blog',
    component: lazy(() => import('./pages/Blog')),
    data: BlogData as RouteDataFunc,
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
    data: DocsData as RouteDataFunc,
  },
  {
    path: '/tutorial/:id',
    component: lazy(() => import('./pages/Tutorial')),
    data: TutorialData as RouteDataFunc,
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
    component: lazy(() => import('./pages/Packages')),
    data: PackagesData,
  },
  {
    path: '/resources',
    component: lazy(() => import('./pages/Resources')),
    data: ResourcesData,
  },
  {
    path: '/media',
    component: lazy(() => import('./pages/Media')),
  },
  {
    path: '/store',
    component: lazy(() => import('./pages/Store')),
    data: StoreData,
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404')),
  },
];
