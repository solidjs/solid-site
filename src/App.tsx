import { JSX } from 'solid-js';
import { Meta } from 'solid-meta';
import { Route } from 'solid-app-router';

export const App = (): JSX.Element => {
  return (
    <>
      <Meta
        name="description"
        content="The next generation fine-grained reactive Javascript UI library."
      />

      <main class="min-h-screen">
        <Route />
      </main>
    </>
  );
};
