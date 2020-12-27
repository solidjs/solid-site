import { Component, For } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';
import github from '../assets/github.svg';

const core = [
  {
    img: 'ryan-carniato.jpeg',
    github: 'ryansolid',
    name: 'Ryan Carniato',
    role: 'Project Founder and Manager',
    bio:
      'Front-end JS performance enthusiast and long time super-fan of fine-gained reactive programming.',
  },
  {
    img: 'david-dibiase.jpeg',
    github: 'davedbase',
    name: 'David Di Biase',
    role: 'Contributor, Website and Community Manager',
    bio:
      'David is a full-stack developer with 15+ years of experience. He owns and operates Pilot, a Toronto-based brand technology company.',
  },
  {
    img: 'alexandre-mouton-brady.jpeg',
    github: 'amoutonbrady',
    name: 'Alexandre Mouton Brady',
    role: 'Library Maintainer',
    bio:
      'A multi-talented web developer with a preference for the front. He takes great pleasure in making the web more alive.',
  },
];
const contributors = [
  {
    name: 'Eric Rochon',
    company: 'Brood Studio',
    link: 'https://brood.studio',
    detail: "A special thanks to Eric for his incredible contribution to Solid's brand.",
  },
  {
    name: 'Sarah Kim',
    company: 'Pilot Interactive',
    link: 'https://www.pilotinteractive.io',
    detail: 'Sarah has graciously provided her expertise in usability and design.',
  },
];

const Contributors: Component = () => {
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Team & Contributors" />
      <div class="container my-10">
        Solid.js is supportedand made possible by a community of dedicated contributors and
        ethusiasts. This page draws attention to individual members and recgonizes their
        roles/responsibilitiesto ensure that the community continues to succeed.
        <div class="grid my-8 grid-cols-12 gap-20">
          <div class="col-span-7">
            <h2 class="text-2xl mb-4">Core Team</h2>
            <For each={core}>
              {(person) => (
                <div class="grid grid-cols-3 gap-10 mb-7">
                  <div class="col-span-1">
                    <img
                      class="shadow-lg rounded-md"
                      alt="Profile headshot"
                      src={`/img/bios/${person.img}`}
                    />
                  </div>
                  <div class="col-span-2">
                    <span class="text-bold text-2xl border-b w-12/12 block pb-2 mb-3 text-solid">
                      {person.name}
                    </span>
                    <small class="block mb-3">{person.role}</small>
                    <p class="block mb-3">{person.bio}</p>
                    <a target="_blank" href={`https://github.com/${person.github}`}>
                      <img class="w-7" alt="" src={github} />
                    </a>
                  </div>
                </div>
              )}
            </For>
          </div>
          <div class="col-span-5">
            <h2 class="text-2xl mb-7">Acknowledgements</h2>
            Solid wouldn't be possible with the help of other talented individuals. As we grow we
            hope others will find ways to give their time either in the form of bug reporting, pull
            requests, design suggestions, writing and many other ways.
            <For each={contributors}>
              {(person) => (
                <div class="shadow-lg p-8 mt-3">
                  <span class="text-bold text-lg text-solid">
                    {person.name}
                    {person.company && (
                      <a href={person.link} class="text-black ml-2">
                        ({person.company})
                      </a>
                    )}
                  </span>
                  <p class="text-md mt-1">{person.detail}</p>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributors;
