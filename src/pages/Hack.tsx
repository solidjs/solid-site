import { Component } from 'solid-js';

const Hack: Component = () => {
  return (
    <div
      class="w-full flex"
      style={{
        'height': '100vh',
        'background': 'linear-gradient(-180deg, #BCC5CE 0%, #335d92 90%), radial-gradient(at bottom left, rgba(255,255,255,0.98) 0%, rgba(0,0,0,0.30) 80%)',
        'background-blend-mode': 'screen'
      }}
    >
      <img class="w-2/6 mx-auto" src="/img/hack.svg" />
    </div>
  );
};

export default Hack;
