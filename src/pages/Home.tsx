import { Component } from 'solid-js';
import { Repl, ReplTab } from 'solid-repl';

import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';

const Home: Component = () => (
  <div class="flex flex-col">
    <div class="container mx-auto">
      <div class="flex content-end flex-wrap h-96 px-5">
        <img class="w-48" src={logo} alt="Solid logo" />
        <img class="w-52 ml-4" src={wordmark} alt="Solid wordmark" />
      </div>
      <div class="py-10 px-10">
        <h2 class="font-bold text-5xl leading-snug">
          A next generation fine-grained reactive Javascript application framework.
        </h2>
      </div>
      {/* <div class="grid px-10 grid-cols-3 gap-4">
        <div>
          <b class="block font-semibold">Extreme Performance</b>
          <span class="text-gray-500 text-base">Consitently tops recognized UI speed and memory utilization benchmarks.</span>
        </div>
        <div>
          <b class="block font-semibold">Ergonomic Development</b>
          <span class="text-gray-500 text-base">Write simple and complex applications with TypeScript and JSX.</span>
        </div>
        <div>
          <b class="block font-semibold">Isomorphic Applications</b>
          <span class="text-gray-500 text-base">Render applications client and server-side with SSR and SSG.</span>
        </div>
      </div> */}
      <div class="bg-gray-50 mt-10 px-10 py-10">
        <div class="px-10 py-10">
          <h2 class="text-4xl font-bold">A purely reactive library.</h2>
          <h2 class="text-3xl font-bold text-gray-300 mt-2">
            Solid was designed from the ground up with a reactive core. It's influenced by reactive
            principles developed by previous libraries.
          </h2>
          <a
            target="_blank"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-md border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">7.3kb</strong>
            <span class="block text-sm">Minified + Gzipped</span>
          </a>
          <a
            target="_blank"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-sm border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
          <a
            target="_blank"
            href="https://github.com/ryansolid/solid/stargazers"
            class="detail inline-block rounded-sm border-gray-300 border mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
        </div>
      </div>
      <div class="bg-gray-50 mt-10 px-10 py-10">
        <div class="px-10 py-10">
          <h2 class="text-3xl font-bold">Incredible performance.</h2>
          <h2 class="text-3xl font-bold text-gray-300 mt-2">
            Solid performs consistently within the top three UI frameworks for the past few years.
          </h2>
          <a
            target="_blank"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-md border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">7.3kb</strong>
            <span class="block text-sm">Minified + Gzipped</span>
          </a>
          <a
            target="_blank"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-sm border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
          <a
            target="_blank"
            href="https://github.com/ryansolid/solid/stargazers"
            class="detail inline-block rounded-sm border-gray-300 border mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
        </div>
      </div>
    </div>
    <div class="container mx-auto mt-10 py-10">
      <div class="px-8">
        <h4 class="text-2xl font-bold">Give it a shot</h4>
        <Repl height={500} isInteractive class="rounded-lg overflow-hidden shadow-2xl">
          <ReplTab name="main">
            {`
              import { render } from 'solid-js/web';
              import { App } from './app.tsx';

              render(() => <App />, document.getElementById('app'));
            `}
          </ReplTab>
          <ReplTab name="app">{`export const App = () => <h1>Hello world</h1>`}</ReplTab>
        </Repl>
      </div>
    </div>
  </div>
);

export default Home;
