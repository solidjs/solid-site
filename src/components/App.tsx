
import { Component } from 'solid-js';
// import { Route } from 'solid-app-router';
import Nav from './Nav';
import Home from '../pages/Home';
import Footer from './Footer';

const App: Component = () => <>
  <Nav />
  <Home />
  {/* <Route /> */}
  <Footer />
</>;

export default App;
