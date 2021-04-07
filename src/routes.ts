import { RouteDefinition, useRouter } from 'solid-app-router';
import { lazy } from 'solid-js';
import { ContributorsData } from './pages/Contributors.data';
import { DocsData } from './pages/Docs.data';
import { TutorialData } from './pages/Tutorial.data';

function Redirect(to: string): any {
  return () => {
    const [, { push }] = useRouter();
    push(to);
  };
}

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/docs',
    component: Redirect('/docs/0.25.0'),
  },
  {
    path: '/docs/:version',
    component: lazy(() => import('./pages/Docs')),
    data: DocsData,
  },
  {
    path: '/examples',
    component: Redirect('/examples/counter'),
  },
  {
    path: '/examples/:id',
    component: lazy(() => import('./pages/Examples')),
  },
  {
    path: '/tutorial',
    component: Redirect('/tutorial/lesson_test/0'),
  },
  {
    path: '/tutorial/:id',
    component: (props) => Redirect(`/tutorial/${props.params.id}/0`),
  },
  {
    path: '/tutorial/:id/:step',
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
