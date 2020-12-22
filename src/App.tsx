import type { Component } from 'solid-js';
import { Route } from 'solid-app-router';

import Nav from './components/Nav';
import Footer from './components/Footer';

export const App: Component = () => (
  <>
    <Nav />
    <Route />
    <Footer />
  </>
);
