import { Component } from 'solid-js';

const Hack: Component = () => {
  return (
    <div
      class="w-full flex flex-col justify-center px-10"
      style={{
        'height': 'calc(100vh - 65px)',
        'background': 'linear-gradient(-180deg, #BCC5CE 0%, #335d92 90%), radial-gradient(at bottom left, rgba(255,255,255,0.98) 0%, rgba(0,0,0,0.30) 80%)',
        'background-blend-mode': 'screen'
      }}
    >
      <div>
        <img class="w-96 mx-auto" src="/img/hack.svg" />
        <div class="flex space-x-8 bg-white/30 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-20 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">What</div>
          <div>
            <b>SolidHack</b> is a public hackathon presented by the SolidJS core team
            and corporate sponsors. The event will last 3 months and award prizes in
            three categories.
          </div>
        </div>
        <div class="flex space-x-8 bg-white/30 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">Who</div>
          <div>
            The hackathon is available to coders who are interested in learning
            and developing SolidJS built applications and utilities. The event
            is sponsored and supported by corporate allies of SolidJS and the OSS
            ecosystem overall.
          </div>
        </div>
        <div class="flex space-x-8 bg-white/30 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">Why</div>
          <div>
            To encourage growth and experimentation of SolidJS. Being a very new
            front-end solution, opportunities to work with Solid aren't easy to come
            by. SolidHack gives you a reason to give in, learn and potentially win prizes.
          </div>
        </div>
        <div class="flex space-x-8 bg-white/30 bg-opacity-50 text-gray-500 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="text-3xl font-semibold mb-5">When</div>
          <div>
            The event will run from January the end of March 2022.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hack;
