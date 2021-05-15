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
        <img class="shadow-lg rounded-md" alt="Profile headshot" src={`/img/bios/${props.img}`} />
      </div>

      <div class="space-y-3 col-span-2 flex flex-col">
        <span class="text-bold text-2xl block text-solid">{props.name}</span>
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
        <p>
          Solid.js is supportedand made possible by a community of dedicated contributors and
          ethusiasts. This page draws attention to individual members and recgonizes their
          roles/responsibilitiesto ensure that the community continues to succeed.
        </p>

        <div class="grid my-8 grid-cols-12 gap-20">
          <div class="col-span-7 flex flex-col space-y-4">
            <h2 class="text-2xl">Core Team</h2>

            <ul class="space-y-7">
              <For each={props.core} children={CoreMember} />
            </ul>
          </div>

          <div class="col-span-5 flex flex-col space-y-7">
            <h2 class="text-2xl">Acknowledgements</h2>

            <p>
              Solid wouldn't be possible with the help of other talented individuals. As we grow we
              hope others will find ways to give their time either in the form of bug reporting,
              pull requests, design suggestions, writing and many other ways.
            </p>

            <ul class="flex flex-col space-y-3">
              <For each={props.contributors} children={Contributor} />
            </ul>
          </div>
        </div>
      </div>
	
			<Footer />
    </div>
  );
};

export default Contributors;
