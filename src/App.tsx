import { Component, createEffect } from "solid-js";
import { Meta } from 'solid-meta';
import { I18nProvider } from '@amoutonbrady/solid-i18n';
import { useRoutes, Router, useData } from 'solid-app-router';
import { routes } from './routes';
import { AppData } from './App.data';

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
  const data = useData<{ dict: any, locale: string }>();
  createEffect(() => console.log(data));
  return (
    <I18nProvider dict={data.dict} locale={data.locale}>
      {props.children}
    </I18nProvider>
  );
};
