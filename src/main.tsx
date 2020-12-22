import './assets/main.css';

import { render } from 'solid-js/dom';
import { Router } from 'solid-app-router';

import { routes } from './routes';
import { App } from './App';

const root = document.getElementById('app');

render(
  () => (
    <Router routes={routes}>
      <App />
    </Router>
  ),
  root!,
);

if (module) module.hot.accept(() => window.location.reload());
