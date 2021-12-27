import { Component } from 'solid-js';
import builder from '../assets/supporters/builder-colour.png';
import stytch from '../assets/supporters/stytch.png';
import Newsletter from '../components/Newsletter';

const Hack: Component = () => {
  return (
    <div
      class="w-full flex flex-col justify-center px-10 min-h-screen"
      style={{
        'background': 'linear-gradient(-180deg, #BCC5CE 0%, #335d92 90%), radial-gradient(at bottom left, rgba(255,255,255,0.98) 0%, rgba(0,0,0,0.30) 80%)',
        'background-blend-mode': 'screen'
      }}
    >
      <div class="mt-20 lg:mt-40">
        <img class="w-6/6 md:w-5/6 lg:w-4/6 xl:w-3/6 2xl:w-2/6 mx-auto" src="/img/hack.svg" />
        <div class="md:flex md:space-x-8 bg-white/20 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-20 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">What</div>
          <div>
            <b>SolidHack</b> is a public hackathon presented by the SolidJS Core Team
            and corporate sponsors. Prizes in the amounts of US$9,000 will be awarded
            to projects that capture the imagination and interest of our
            developer community.
          </div>
        </div>
        <div class="md:flex md:space-x-8 bg-white/20 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">Who</div>
          <div>
            The hackathon is available to coders who are interested in learning
            and developing SolidJS-built applications and utilities. The event
            is sponsored and supported by corporate allies of SolidJS and the OSS
            ecosystem overall.
            <div class="mt-3 space-x-5 bg-white/20 p-4 px-7 rounded-xl">
              <a target="_blank" class="hover:opacity-70 transition duration-300" rel="noopener" href="https://www.stytch.com">
                <img class="inline-block w-24" src={stytch} />
              </a>
              <a target="_blank" class="hover:opacity-70 transition duration-300" rel="noopener" href="https://www.builder.io">
                <img class="inline-block w-24" src={builder} />
              </a>
            </div>
          </div>
        </div>
        <div class="md:flex md:space-x-8 bg-white/20 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">Why</div>
          <div>
            To encourage growth and experimentation of SolidJS. Being a very new
            front-end solution, opportunities to work with Solid aren't easy to come
            by. SolidHack gives you a reason to give in, learn and potentially win prizes.
          </div>
        </div>
        <div class="md:flex md:space-x-8 bg-white/20 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">When</div>
          <div>
            The event will run from January to the end of March 2022. Exact start day
            to be announced via Solid News!
          </div>
        </div>
        <div class="bg-white/50 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 mb-20 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="mb-8">
            More information will available over the coming weeks as we continue to grow
            our sponsor list and details regarding how to participate.
          </div>
          <Newsletter title="Sign up for announcements" />
        </div>
      </div>
    </div>
  );
};

export default Hack;
