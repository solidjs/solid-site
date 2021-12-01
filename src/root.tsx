import { Component, Suspense, Show } from 'solid-js';
import { Title, Meta } from 'solid-meta';
import { useData } from 'solid-app-router';
import { Outlet, Scripts, Links } from 'solid-start/components';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { preventSmoothScrollOnTabbing } from './utils';
import Header from './components/Header';
import RootData from './root.data';

export default function Root({ Start }) {
  preventSmoothScrollOnTabbing();
  return (
    <Start data={RootData}>
      <html lang="en">
        <head>
          <Links />
        </head>
        <body>
          <main class="min-h-screen">
            <Suspense>
              <Lang>
                <Header />
                <div id="main-content">
                  <div>
                      <Outlet />
                  </div>
                </div>
              </Lang>
            </Suspense>
          </main>
          <Scripts />
        </body>
      </html>
    </Start>
  );
}

const Lang: Component = (props) => {
  const data = useData<{ isDark: true; i18n: ReturnType<typeof createI18nContext> }>(0);
  console.log('HERE -> ', data.i18n);
  const [t, { locale }] = data.i18n;
  return (
    <I18nContext.Provider value={data.i18n}>
      <Title>{t('global.title', {}, 'SolidJS · Reactive Javascript Library')}</Title>
      <Meta name="lang" content={locale()} />
      <div
        dir={t('global.dir', {}, 'ltr')}
        classList={{
          dark: data.isDark === true,
        }}
      >
        <Show when={props.children}>
          <div class="dark:bg-solid-gray dark:text-white">{props.children}</div>
        </Show>
      </div>
    </I18nContext.Provider>
  );
};
