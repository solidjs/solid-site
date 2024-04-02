import { Component, lazy } from 'solid-js';
import { RouteDefinition, Navigate, RouteSectionProps } from '@solidjs/router';
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
    component: lazy(() => import('./pages/Home')) as Component<RouteSectionProps>,
    load: () => ({
      benchmarks: BenchmarkData(),
    }),
  },
  {
    path: '/guides/:id',
    component: lazy(() => import('./pages/Docs')) as Component<RouteSectionProps>,
    load: GuideData,
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
    load: GuideData,
  },
  {
    path: '/guides',
    component: () => Navigate({ href: '/guides/getting-started' }),
    load: GuideData,
  },
  {
    path: '/blog/:slug',
    component: lazy(() => import('./pages/BlogArticle')) as Component<RouteSectionProps>,
    load: BlogArticleData,
  },
  {
    path: '/blog',
    component: lazy(() => import('./pages/Blog')) as Component<RouteSectionProps>,
    load: BlogData,
  },
  {
    path: '/docs',
    component: lazy(() => import('./pages/Docs')) as Component<RouteSectionProps>,
    children: [
      {
        path: '/:version',
        component: lazy(() => import('./pages/Docs')) as Component<RouteSectionProps>,
      },
      {
        path: '/*all',
        component: lazy(() => import('./pages/Docs')) as Component<RouteSectionProps>,
      },
    ],
    load: DocsData,
  },
  {
    path: '/tutorial/:id',
    component: lazy(() => import('./pages/Tutorial')) as Component<RouteSectionProps>,
    load: TutorialData,
  },
  {
    path: '/tutorial',
    component: () => Navigate({ href: '/tutorial/introduction_basics' }),
  },

  {
    path: '/examples/:id',
    component: lazy(() => import('./pages/Examples')) as Component<RouteSectionProps>,
    load: ExamplesData,
  },
  {
    path: '/examples',
    component: () => Navigate({ href: '/examples/counter' }),
  },
  {
    path: '/contributors',
    component: lazy(() => import('./pages/Contributors')) as Component<RouteSectionProps>,
    load: ContributorsData,
  },
  {
    path: '/ecosystem',
    component: lazy(() => import('./pages/Packages')) as Component<RouteSectionProps>,
    load: PackagesData,
  },
  {
    path: '/resources',
    component: lazy(() => import('./pages/Resources')) as Component<RouteSectionProps>,
    load: ResourcesData,
  },
  {
    path: '/media',
    component: lazy(() => import('./pages/Media')),
  },
  {
    path: '/store',
    component: lazy(() => import('./pages/Store')) as Component<RouteSectionProps>,
    load: StoreData,
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404')),
  },
];
