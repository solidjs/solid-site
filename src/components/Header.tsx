import type { Component } from 'solid-js';

const Header: Component<{ title: string }> = (props) => (
  <header class="bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white text-center md:text-left rtl:text-right">
    <div class="px-3 lg:px-12 container">
      <h1 class="py-8 text-3xl">{props.title}</h1>
    </div>
  </header>
);

export default Header;
