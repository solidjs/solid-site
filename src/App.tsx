import { Component } from 'solid-js';
import { Meta } from 'solid-meta';
import { Route } from 'solid-app-router';

import Footer from './components/Footer';

export const App: Component = () => {
  return (
    <>
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
