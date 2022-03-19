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
    <html lang="en" style="scroll-behavior: smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileImage" content="/img/favicons/ms-icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#2c4f7c" />
        <meta name="theme-color" content="#2c4f7c" />
        <meta name="msapplication-TileColor" content="#2c4f7c" />
        <meta name="theme-color" content="#2c4f7c" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="og:title" content="SolidJS" />
        <meta name="og:url" content="https://www.solidjs.com" />
        <meta name="og:type" content="article" />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="627" />
        <meta name="og:image:url" content="https://www.solidjs.com/og.jpg" />
        <meta name="og:image:secure_url" content="https://www.solidjs.com/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.solidjs.com/og.jpg" />
        <meta name="twitter:site" content="@solid_js" />
        <meta name="msvalidate.01" content="2430336572A8F5A3CCB92DC181ADA489" />
        <meta
          name="og:description"
          content="Solid is a purely reactive library. It was designed from the ground up with a reactive core. It's influenced by reactive principles developed by previous libraries."
        />
        <meta
          name="description"
          content="A declarative, efficient and flexible JavaScript library for building user interfaces."
        />
        <link rel="sitemap" href="sitemap.xml" type="application/xml" />
        <link rel="icon" type="image/png" href="/img/favicons/favicon-32x32.png" />
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
