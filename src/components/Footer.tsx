
import { Component } from 'solid-js';
import wordmark from '../assets/wordmark.svg';

const Footer: Component = () => (
  <footer class="w-screen py-10 bg-gray-50">
    <div class="container mx-auto grid grid-cols-12 gap-6">
      <div class="col-span-1">
        <img class="w-18" src={wordmark} alt="Solid logo" />
      </div>
      <div class="col-span-7">
        Solid.js is an open-source project supported by a team of public contribitors.
        It's distributed withan <a href="https://github.com/ryansolid/solid/blob/master/LICENSE">MIT license</a>.
      </div>
      <div class="col-span-3 text-sm">
      </div>
    </div>
 </footer>
);

export default Footer;
