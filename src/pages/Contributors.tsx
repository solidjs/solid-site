import { Component, For, Show } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';
import github from '../assets/github.svg';
import { ContributorsDataProps } from './Contributors.data';
import Footer from '../components/Footer';

const CoreMember: Component<{
  img: string;
  name: string;
  role: string;
  bio: string;
  github: string;
}> = (props) => {
  return (
    <li class="grid grid-cols-3 gap-x-10">
      <div>
        <span class="sr-only">Profile picture of {props.name}</span>
        <img
          class="shadow-lg rounded-md w-full"
          alt="Profile headshot"
          src={`/img/bios/${props.img}`}
        />
      </div>

      <div class="space-y-4 col-span-2 flex flex-col">
        <span class="text-bold text-xl block text-solid">{props.name}</span>
        <hr />
        <small>{props.role}</small>
        <p class="block">{props.bio}</p>
        <a target="_blank" rel="noopener" href={`https://github.com/${props.github}`}>
          <span class="sr-only">Github URL of {props.github}</span>
          <img class="w-7" alt={`Github URL of ${props.github}`} src={github} />
        </a>
      </div>
    </li>
  );
};

const Contributor: Component<{
  name: string;
  link: string;
  company: string;
  detail: string;
}> = (props) => {
  return (
    <li class="shadow-lg p-8">
      <p class="text-bold text-lg text-solid inline-flex space-x-2">
        <span>{props.name}</span>

        <Show when={props.company}>
          <a href={props.link} class="text-black hover:underline">
            ({props.company})
          </a>
        </Show>
      </p>

      <p class="text-md mt-1">{props.detail}</p>
    </li>
  );
};

const Contributors: Component<ContributorsDataProps> = (props) => {
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Team & Contributors" />

      <div class="px-3 lg:px-12 container my-10">
        <div class="lg:grid my-8 lg:grid-cols-12 space-y-10 gap-20">
          <div class="col-span-6 flex flex-col space-y-4">
            <h2 class="text-3xl font-semibold text-solid-default">Core Team</h2>

            <ul class="space-y-10">
              <For each={props.core} children={CoreMember} />
            </ul>
          </div>

          <div class="col-span-6 flex flex-col space-y-10">
            <h2 class="text-2xl font-semibold text-solid-default">Acknowledgements</h2>

            <p>
              Solid wouldn't be possible without the help of other talented individuals. As we grow
              we hope others will find ways to give their time either in the form of bug reporting,
              pull requests, design suggestions, writing and many other ways.
            </p>

            <ul class="flex flex-col space-y-3">
              <For each={props.contributors} children={Contributor} />
            </ul>

            <h2 class="text-2xl font-semibold text-solid-default">Ecosystem Team</h2>

            <ul class="flex flex-col space-y-3">
              <For each={props.ecosystem} children={Contributor} />
            </ul>

            <div class="flex mb-5 flex-col space-y-3">
              <h2 class="text-2xl mb-5 font-semibold text-solid-default">Contributors</h2>
              <a target="_blank" href="https://github.com/solidjs/solid/graphs/contributors">
                <img src="https://camo.githubusercontent.com/c2d6e18c0cf67d82e51738442d4082326b7cf63a1552e9d27f773eafe0d3d3be/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f736f6c69642f636f6e7472696275746f72732e7376673f77696474683d38393026627574746f6e3d66616c7365" />
              </a>
            </div>

            <div class="flex mb-5 flex-col space-y-3">
              <h2 class="text-2xl mb-5 font-semibold text-solid-default">Open Collective</h2>

              <p class="block">
                Support us with a donation and help us continue our activities.{' '}
                <a target="_blank" href="https://opencollective.com/solid">
                  Contribute
                </a>
              </p>

              <div class="flex">
                <a href="https://opencollective.com/solid/backer/0/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/0/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/1/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/1/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/2/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/2/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/3/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/3/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/4/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/4/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/5/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/5/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/6/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/6/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/7/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/7/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/8/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/8/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/9/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/9/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/10/website" target="_blank">
                  <img src="https://opencollective.com/solid/backer/10/avatar.svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contributors;
