import { Component } from 'solid-js';
import { Link, Meta } from 'solid-meta';
import { Route } from 'solid-app-router';

import Footer from './components/Footer';

export const App: Component = () => {
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
