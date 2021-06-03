/* @jsxImportSource @lume/element */

import { Component, createEffect, createSignal, For } from 'solid-js';
import { Box, Scene, useDefaultNames, Motor, THREE } from 'lume';

let global = globalThis as any;

if (!global.LUME_HOT_MODULE_RELOAD) {
  useDefaultNames();
  global.LUME_HOT_MODULE_RELOAD = true;
}

const colors = ['#4f88c6', 'white'];

export const LumeHeaderBackground: Component<{ mouseX: number; mouseY: number }> = (props) => {
  const camX = () => {
    props.mouseX;
    if (!scene) return 0;
    return (props.mouseX - scene.calculatedSize.x / 2) / 20;
  };

  const camY = () => {
    props.mouseY;
    if (!scene) return 0;
    return (props.mouseY - scene.calculatedSize.y / 2) / 20;
  };

  var scene = (
    <lume-scene webgl background-color="#446b9e">
      <lume-point-light color="white" position="500 -500 500" align-point="0.5 0.5 0.5" />
      <lume-ambient-light color="white" intensity="0.4" />

      <lume-node align-point="0.5 0.5 0.5" position={`${camX()} ${camY()} 0`} rotation="0 0 -10">
        <For each={Array.from({ length: 100 })}>
          {(item, index) => (
            <lume-box
              size="50 50 50"
              align-point="0.5 0.5 0.5"
              mount-point="0.5 0.5 0.5"
              color={colors[Math.round(1 * Math.random())]}
              cast-shadow="false"
              receive-shadow="false"
              position={`
                ${2000 * Math.random() - 1000}
                ${1000 * Math.random() - 500}
                ${-1400 * Math.random()}
              `}
              rotation={`0 ${360 * Math.random()} 0`}
            />
          )}
        </For>
      </lume-node>
    </lume-scene>
  ) as Scene;

  createEffect(() => {
    const { mouseX, mouseY } = props;
    const size = scene.calculatedSize;

    // console.log('mouse pos:', mouseX, mouseY);
  });

  // Wait for scene to be upgraded to a LUME.Scene instance.
  setTimeout(() => {
    // TODO add attributes for <lume-scene> for fog.
    scene.three.fog = new THREE.FogExp2(new THREE.Color('#446b9e').getHex(), 0.0015);
    scene.needsUpdate();
  });

  // scene.three.fog = new THREE.FogExp2(new THREE.Color('#345887').getHex(), 0.0015);

  return scene;
};
