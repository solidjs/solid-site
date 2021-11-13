import { Component, Suspense } from 'solid-js';
import { Title, Meta } from 'solid-meta';
import { useData } from 'solid-app-router';
import { Outlet } from 'solid-start/components';
import Header from './components/Header';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { preventSmoothScrollOnTabbing } from './utils';
import RootData from './root.data';

export default function Root({ Start }) {
  preventSmoothScrollOnTabbing();
  return (
    <main class="min-h-screen">
      <Start data={RootData}>
        <Lang>
          <Header />
          <div id="main-content">
            <div>
              <Suspense>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </Lang>
      </Start>
    </main>
  );
}

const Lang: Component = (props) => {
  const data = useData<{ isDark: true; i18n: ReturnType<typeof createI18nContext> }>(0);
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
        <div class="dark:bg-solid-gray dark:text-white">{props.children}</div>
      </div>
    </I18nContext.Provider>
  );
};
