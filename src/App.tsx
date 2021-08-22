import { JSX, createContext, createResource } from 'solid-js';
import { Meta } from 'solid-meta';
import { useRoutes, Router, RouteDataFunc, useParams } from 'solid-app-router';
import { routes } from './routes';

export const LangData: RouteDataFunc = () => {
  const params = useParams();
  const [doc] = createResource(
    () => ({ lang: 'it' }),
    ({ lang }) => fetch(`../lang/${lang}/Home`)
  );
  return {
    get loading() {
      return doc.loading;
    },
  };
};

export const LangContext = createContext({

});

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
