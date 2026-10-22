import { Component } from 'solid-js';
import { Title } from '@solidjs/meta';

const Docs: Component = () => {
  return (
    <>
      <Title>Docs | SolidJS</Title>
      <div class="container my-10 w-[80vw] text-center py-20 mx-auto">
        <h2 class="text-4xl font-semibold pb-5">We moved our docs!</h2>
        <span class="text-lg">
          Our docs have moved to a new domain. Please visit{' '}
          <a href="https://docs.solidjs.com">https://docs.solidjs.com</a> for the latest
          documentation.
        </span>
      </div>
    </>
  );
};

export default Docs;
