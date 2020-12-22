
import { render } from 'solid-js/dom';
// import { Router } from 'solid-app-router';
import App from './components/App';
import './main.css';

// Route configurations
const routes = [
  {
    path: '/',
    component: "pages/Index.js"
  }
];

// Mount and render the root
const root = document.querySelector('#app');
if (root) {
  document.body.appendChild(root);
  render(
    () => (
      // <Router routes={routes}>
        <App />
      // </Router>
    ),
    root
  );
}

export const moduleHotAccept = (mod: NodeModule): void => {
  if (mod && mod.hot) {
    mod.hot.accept(() => window.location.reload());
  }
};

moduleHotAccept(module);
