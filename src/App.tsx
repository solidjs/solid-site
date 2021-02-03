import { Component, createEffect } from 'solid-js';
import { Route, useRouter } from 'solid-app-router';
import { Link, Meta } from 'solid-meta';

import Footer from './components/Footer';

export const App: Component = () => {
  const router = useRouter();

  createEffect(() => {
    console.log(router);
  });

  return (
    <>
      <Link rel="canonical" href="https://www.solidjs.com/" />
      <Meta name="keywords" content="javascript solid ui framework" />
      <Meta
        name="description"
        content="The next generation fine-grained reactive Javascript UI library."
      />
      <main class="min-h-screen">
        <Route />
      </main>

      <Footer />
    </>
  );
};
