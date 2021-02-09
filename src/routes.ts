import { RouteDefinition, useRouter } from 'solid-app-router';
import { lazy } from 'solid-js';
import { ContributorsData } from './pages/Contributors.data';
import { DocsData } from './pages/Docs.data';
import { ExampleData } from './pages/Example.data';
import { TutorialData } from './pages/Tutorial.data';

function Redirect(to: string): any {
  return () => {
    const router = useRouter();
    router.push(to);
  };
}

export const routes: RouteDefinition[] = [
  {
    path: '/examples/:id',
    component: lazy(() => import('./pages/Examples')),
    data: ExampleData,
  },
  {
    path: '/examples',
    component: Redirect('/examples/counter'),
  },
  {
    path: '/tutorial/:id/:step',
    component: lazy(() => import('./pages/Tutorial')),
    data: TutorialData,
  },
  {
    path: '/tutorial/:id',
    component: (props) => Redirect(`/tutorial/${props.params.id}/0`),
  },
  {
    path: '/tutorial',
    component: Redirect('/tutorial/lesson_test/0'),
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
