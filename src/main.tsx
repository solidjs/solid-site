import { render } from "solid-js/web";
import './assets/main.css';

// import { registerSW } from 'virtual:pwa-register';
import { App } from './App';

render(() => <App />, document.getElementById("app")); 

// Register service worker
// registerSW({ onOfflineReady() {} });
