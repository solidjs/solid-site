import type { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import wordmark from '../assets/wordmark-dark.svg';
import builder from '../assets/supporters/builder.png';
import sauce from '../assets/supporters/saucelabs.png';
import cloudflare from '../assets/supporters/cloudflare.png';
import Social from './Social';

const Footer: Component = () => (
  <Portal mount={document.getElementById('footer')!}>
    <div class="py-10 mt-5 bg-solid-lightgray rounded-tr-3xl rounded-tl-3xl mx-3">
      <div class="px-7 md:px-0 py-10 lg:px-12 container flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-20">
        <img class="w-40" src={wordmark} alt="Solid logo" />
        <div class="text-sm max-w-5xl">
          <p>
            Solid is an open-source project supported by a team of public contributors. It's
            distributed&nbsp;
            <a
              class="underline hover:text-gray-500"
              href="https://github.com/ryansolid/solid/blob/master/LICENSE"
            >
              under an MIT license
            </a>
            . This library and community are made possible by a&nbsp;
            <a class="underline hover:text-gray-500" href="/contributors">
              core team and dedicated contributors
            </a>
            .
          </p>

          <div class="mb-5 mt-7 p-2 rounded-full bg-white hidden md:flex items-center">
            <div class="font-semibold text-gray-600 my-4 ml-5 mr-2">Sponsored by</div>
            <a
              class="mx-4 hover:opacity-50 transition"
              target="_blank"
              rel="noopener"
              href="https://www.cloudflare.com/"
            >
              <img class="w-32" src={cloudflare} alt="cloudflare" />
            </a>
            <a
              class="mx-4 hover:opacity-50 transition"
              target="_blank"
              rel="noopener"
              href="https://www.builder.io/"
            >
              <img class="w-24" src={builder} alt="builder.io" />
            </a>
            <a
              class="mx-4 hover:opacity-50 transition"
              target="_blank"
              rel="noopener"
              href="https://www.saucelabs.com/"
            >
              <img class="w-32" src={sauce} alt="SAUCELABS" />
            </a>
          </div>

          {/* TODO: Make this dynamic */}
          <p class="text-sm text-center text-gray-600 mt-3">
            Last updated July 23, 2021 2:00pm on Solid v1.0.3.
          </p>
          <ul class="lg:hidden flex justify-center items-center pt-12 space-x-3">
            <Social />
          </ul>
        </div>
      </div>
    </div>
  </Portal>
);

export default Footer;
