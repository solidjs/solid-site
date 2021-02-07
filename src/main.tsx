import './assets/main.css';

import { render } from 'solid-js/web';
import { MetaProvider } from 'solid-meta';
import { Router } from 'solid-app-router';

import { App } from './App';
import { routes } from './routes';

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
// const dispose = createApp(App).use(Router, { routes }).use(MetaProvider).mount('#app');

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
