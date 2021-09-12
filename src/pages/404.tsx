import { Component } from 'solid-js';
import { Icon } from '@amoutonbrady/solid-heroicons';
import { emojiSad } from '@amoutonbrady/solid-heroicons/outline';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

const FourOhFour: Component<{}> = (props) => {
  return (
    <div>
      <Nav />
      <div class="flex flex-col justify-center content-center text-center rounded-2xl m-10 bg-gray-100 py-10 text-solid-medium">
        <div class="my-10 py-10">
          <Icon class="m-auto w-40 text-solid-default" path={emojiSad} />
          <h2 class="mt-5 text-4xl font-semibold">Oops. Four oh four.</h2>
          <h2 class="text-2xl text-solid-gray">
            <a class="text-solid-medium" href="https://github.com/solidjs/solid-app-router">
              solid-app-router
            </a>{' '}
            believes this page definitely doesn't exist.
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FourOhFour;
