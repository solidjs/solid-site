import { Component, Suspense } from 'solid-js';
import { Title, Meta } from 'solid-meta';
import { useRoutes, Router } from 'solid-app-router';
import { routes } from './routes';
import Header from './components/Header';
import { AppContextProvider, useAppContext } from './AppContext';
import { I18nContext } from '@solid-primitives/i18n';
import { preventSmoothScrollOnTabbing } from './utils';

export const App = () => {
  const Routes = useRoutes(routes);

  preventSmoothScrollOnTabbing();

  return (
    <main class="min-h-screen">
      <Router>
        <AppContextProvider>
          <Lang>
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
          </Lang>
        </AppContextProvider>
      </Router>
    </main>
  );
};

const Lang: Component = (props) => {
  const context = useAppContext();
  const [t, { locale }] = context.i18n;
  return (
    <I18nContext.Provider value={context.i18n}>
      <Title>{t('global.title', {}, 'SolidJS · Reactive Javascript Library')}</Title>
      <Meta name="lang" content={locale()} />
      <div dir={t('global.dir', {}, 'ltr')}>{props.children}</div>
    </I18nContext.Provider>
  );
};
