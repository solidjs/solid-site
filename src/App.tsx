import { Suspense } from 'solid-js';
import { useRoutes, Router } from '@solidjs/router';
import { routes } from './routes';
import Header from './components/Header';
import { AppContextProvider } from './AppContext';
import { preventSmoothScrollOnTabbing } from './utils';

export const App = () => {
  const Routes = useRoutes(routes);

  preventSmoothScrollOnTabbing();

  return (
    <main class="min-h-screen">
      <Router>
        <AppContextProvider>
          <Header />
          {/* two div wrappers to make page animation work and performant */}
          <div id="main-content">
            <div>
              {/* <TransitionRoutes> */}
              <Suspense>
                <Routes />
              </Suspense>
              {/* </TransitionRoutes> */}
            </div>
          </div>
        </AppContextProvider>
      </Router>
    </main>
  );
};
