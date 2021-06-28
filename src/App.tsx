import { JSX } from 'solid-js';
import { Meta } from 'solid-meta';
import { Route } from 'solid-app-router';
import opengraph from './assets/og.jpg';

export const App = (): JSX.Element => {
  return (
    <>
      <Meta name="og:title" content="SolidJS" />
      <Meta name="og:url" content="https://www.solidjs.com" />
      <Meta name="og:type" content="article" />
      <Meta name="og:image:width" content="1200" />
      <Meta name="og:image:height" content="627" />
      <Meta name="og:image:url" content={opengraph} />
      <Meta name="og:image:secure_url" content={opengraph} />
      <Meta name="twitter:card" content="large" />
      <Meta name="twitter:image" content={opengraph} />
      <Meta name="twitter:site" content="@solid_js" />
      <Meta
        name="og:description"
        content="A declarative, efficient and flexible JavaScript library for building user interfaces."
      />
      <Meta
        name="description"
        content="A declarative, efficient and flexible JavaScript library for building user interfaces."
      />

      <main class="min-h-screen">
        <Route />
      </main>
    </>
  );
};
