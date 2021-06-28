import { JSX } from 'solid-js';
import { Meta } from 'solid-meta';
import { Route } from 'solid-app-router';

export const App = (): JSX.Element => {
  return (
    <>
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
