import { JSX } from 'solid-js';
import { Meta } from 'solid-meta';
import { useRoutes, Router } from 'solid-app-router';
import { routes } from './routes';

export const App = (): JSX.Element => {
  const Routes = useRoutes(routes);
  return (
    <>
      <Meta
        name="description"
        content="A declarative, efficient and flexible JavaScript library for building user interfaces."
      />
      <main class="min-h-screen">
        <Router>
          <Routes />
        </Router>
      </main>
    </>
  );
};
