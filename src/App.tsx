import { Suspense } from 'solid-js';
import { Router } from '@solidjs/router';
import { MetaProvider } from '@solidjs/meta';
import { routes } from './routes';
import Header from './components/Header';
import { AppContextProvider } from './AppContext';
import { preventSmoothScrollOnTabbing } from './utils';

export const App = () => {
  preventSmoothScrollOnTabbing();

  return (
    <main class="min-h-screen">
      <Router
        root={(props) => (
          <MetaProvider>
            <AppContextProvider>
              <Header />
              {/* two div wrappers to make page animation work and performant */}
              <div id="main-content">
                <div>
                  {/* <TransitionRoutes> */}
                  <Suspense>{props.children}</Suspense>
                  {/* </TransitionRoutes> */}
                </div>
              </div>
            </AppContextProvider>
          </MetaProvider>
        )}
      >
        {routes}
      </Router>
    </main>
  );
};
