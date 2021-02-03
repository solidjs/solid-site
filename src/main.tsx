import './assets/main.css';

import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';

import { routes } from './routes';
import { App } from './App';
import { MetaProvider } from 'solid-meta';

const dispose = render(
  () => (
    <MetaProvider>
      <Router routes={routes}>
        <App />
      </Router>
    </MetaProvider>
  ),
  document.getElementById('app'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
