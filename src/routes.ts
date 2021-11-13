import { lazy } from 'solid-js';
import { RouteDefinition, Navigate } from 'solid-app-router';
import ContributorsData from './routes/Contributors.data';
import BenchmarkData from './routes/index.data';
import DocsData from './routes/docs/[...all].data';
import { routeData as GuideData } from './routes/guides/[id]';
import TutorialData from './routes/tutorial/[id].data';
import ResourceData from './routes/Resources.data';
import ExamplesData from './routes/examples/[id].data';
import { BlogData } from './routes/blog/index.data';
import BlogArticleData from './routes/blog/[slug].data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./routes/index')),
    data: BenchmarkData,
  },
  {
    path: '/guides/:id',
    component: lazy(() => import('./routes/docs/[...all]')),
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
    component: lazy(() => import('./routes/blog/[slug]')),
    data: BlogArticleData,
  },
  {
    path: '/blog',
    component: lazy(() => import('./routes/blog')),
    data: BlogData,
  },
  {
    path: '/docs',
    component: lazy(() => import('./routes/docs/[...all]')),
    children: [
      {
        path: '/:version',
        component: lazy(() => import('./routes/docs/[...all]')),
      },
      {
        path: '/*all',
        component: lazy(() => import('./routes/docs/[...all]')),
      },
    ],
    data: DocsData,
  },
  {
    path: '/tutorial/:id',
    component: lazy(() => import('./routes/tutorial/[id]')),
    data: TutorialData,
  },
  {
    path: '/tutorial',
    component: () => Navigate({ href: '/tutorial/introduction_basics' }),
  },

  {
    path: '/examples/:id',
    component: lazy(() => import('./routes/examples/[id]')),
    data: ExamplesData,
  },
  {
    path: '/examples',
    component: () => Navigate({ href: '/examples/counter' }),
  },
  {
    path: '/contributors',
    component: lazy(() => import('./routes/Contributors')),
    data: ContributorsData,
  },
  {
    path: '/resources',
    component: lazy(() => import('./routes/Resources')),
    data: ResourceData,
  },
  {
    path: '/media',
    component: lazy(() => import('./routes/Media')),
  },
  {
    path: '/*all',
    component: lazy(() => import('./routes/404')),
  },
];
