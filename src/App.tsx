import type { Component } from 'solid-js';
import { Route } from 'solid-app-router';

import Footer from './components/Footer';

import { Parser, HtmlRenderer } from 'commonmark';

// TODO: Remove move, this is just a proof of concept to demonstrate common mark working
const reader = new Parser();
const writer = new HtmlRenderer();
const parsed = reader.parse('Hello *world*');

const result = writer.render(parsed);

console.log({ result });
// end of demo

export const App: Component = () => (
  <>
    <Route />
    <Footer />
  </>
);
