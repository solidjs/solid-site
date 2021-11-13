import { Component } from 'solid-js';
import { Title, Meta } from 'solid-meta';
import { useRouteData } from 'solid-app-router';
import { Scripts, Links, Routes } from 'solid-start/root';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { preventSmoothScrollOnTabbing } from './utils';
import { AppContextProvider } from './components/AppContext';
import Header from './components/Header';
import './assets/main.css';

export default function Root() {
  preventSmoothScrollOnTabbing();
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <Links />
      </head>
      <body class="font-display bg-white text-black dark:bg-solid-darkbg dark:text-white">
        <main class="min-h-screen">
          <Lang>
            <Header />
            <div id="main-content">
              <div>
                <Routes />
              </div>
            </div>
          </Lang>
        </main>
        <footer id="footer"></footer>
        <Scripts />
      </body>
    </html>
  );
}

const Lang: Component = (props) => {
  const data = useRouteData<{ isDark: true; i18n: ReturnType<typeof createI18nContext> }>();
  const [t, { locale }] = data.i18n;
  return (
    <AppContextProvider>
      <I18nContext.Provider value={data.i18n}>
        <Title>{t('global.title', {}, 'SolidJS · Reactive Javascript Library')}</Title>
        <Meta name="lang" content={locale()} />
        <div dir={t('global.dir', {}, 'ltr')}>{props.children}</div>
      </I18nContext.Provider>
    </AppContextProvider>
  );
};
