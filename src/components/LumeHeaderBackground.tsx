import { Component, createEffect } from 'solid-js';

import type { JSX as LUMEJSX } from 'lume';

// We shouldn't need this, but it works, for now.
// LUME's JSX export already augments the re-export of Solid's JSX, so I'm not
// yet sure why the types aren't picked up if we don't do this here manually.
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends LUMEJSX.IntrinsicElements {}
  }
}

declare const LUME: typeof import('lume');

LUME.useDefaultNames();

const { Scene } = LUME;

export const LumeHeaderBackground: Component<{ mouseX: number; mouseY: number }> = (props) => {
  let box;

  const scene = (
    <lume-scene webgl>
      <lume-point-light color="white" position="500 -500 500" align-point="0.5 0.5 0.5" />
      <lume-ambient-light color="white" intensity="0.4" />

      <lume-perspective-camera
        align-point="0.5 0.5 0.5"
        active
        position={`${props.mouseX} ${props.mouseY} 500`}
      />

      <lume-box
        ref={box}
        size="100 100 100"
        align-point="0.5 0.5 0.5"
        mount-point="0.5 0.5 0.5"
        color="white"
      ></lume-box>
    </lume-scene>
  );

  // FIXME Why TypeScript?
  const _scene = scene as any as InstanceType<typeof Scene>;

  createEffect(() => {
    const { mouseX, mouseY } = props;
    const size = _scene.calculatedSize;

    console.log('mouse pos:', mouseX, mouseY);
  });

  box.rotation = (x, y, z) => [x, ++y, z];

  return scene;
};
