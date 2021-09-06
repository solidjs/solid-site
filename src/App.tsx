import { Component } from 'solid-js';
import { Meta } from 'solid-meta';
import { useRoutes, Router, useData } from 'solid-app-router';
import { routes } from './routes';
import { AppData } from './App.data';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

export const App = () => {
  const Routes = useRoutes(routes);
  return (
    <>
      <Meta
        name="description"
        content="A declarative, efficient and flexible JavaScript library for building user interfaces."
      />
      <main class="min-h-screen">
        <Router data={AppData}>
          <Lang>
            <Routes />
          </Lang>
        </Router>
      </main>
    </>
  );
};

const Lang: Component = (props) => {
  const data = useData<{ i18n: ReturnType<typeof createI18nContext> }>(0);
  return <I18nContext.Provider value={data.i18n}>{props.children}</I18nContext.Provider>;
};
