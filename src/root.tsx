import { ParentComponent, Suspense } from 'solid-js';
import { Title } from '@solidjs/meta';
import { useRouteData, Routes } from '@solidjs/router';
import { FileRoutes, Scripts } from 'solid-start/root';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { preventSmoothScrollOnTabbing } from './utils';
import { AppContextProvider } from './components/AppContext';
import Header from './components/Header';
import './assets/main.css';
import { Head, Body, Html, Meta, Link } from 'solid-start';

export default function Root() {
  preventSmoothScrollOnTabbing();
  return (
    <Html lang="en" style="scroll-behavior: smooth">
      <Head>
        <Meta charset="UTF-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png" />
        <Link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
        <Link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
        <Meta name="msapplication-TileImage" content="/img/favicons/ms-icon-144x144.png" />
        <Meta name="msapplication-TileColor" content="#2c4f7c" />
        <Meta name="theme-color" content="#2c4f7c" />
        <Meta name="msapplication-TileColor" content="#2c4f7c" />
        <Meta name="theme-color" content="#2c4f7c" />
        <Meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <Meta name="og:title" content="SolidJS" />
        <Meta name="og:url" content="https://www.solidjs.com" />
        <Meta name="og:type" content="article" />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="627" />
        <Meta name="og:image:url" content="https://www.solidjs.com/og.jpg" />
        <Meta name="og:image:secure_url" content="https://www.solidjs.com/og.jpg" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:image" content="https://www.solidjs.com/og.jpg" />
        <Meta name="twitter:site" content="@solid_js" />
        <Meta name="msvalidate.01" content="2430336572A8F5A3CCB92DC181ADA489" />
        <Meta
          name="og:description"
          content="Solid is a purely reactive library. It was designed from the ground up with a reactive core. It's influenced by reactive principles developed by previous libraries."
        />
        <Meta
          name="description"
          content="A declarative, efficient and flexible JavaScript library for building user interfaces."
        />
        <Link rel="sitemap" href="sitemap.xml" type="application/xml" />
        <Link rel="icon" type="image/png" href="/img/favicons/favicon-32x32.png" />
      </Head>
      <Body class="font-display bg-white text-black dark:bg-solid-darkbg dark:text-white">
        <div id="app">
          <main class="min-h-screen">
            <Suspense>
              <Lang>
                <Header />
                <div id="main-content">
                  <div>
                    <Routes>
                      <FileRoutes />
                    </Routes>
                  </div>
                </div>
              </Lang>
            </Suspense>
          </main>
        </div>
        <Scripts />
      </Body>
    </Html>
  );
}

const Lang: ParentComponent = (props) => {
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
