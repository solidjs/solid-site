import { For } from "solid-js";

/** Isometric block cluster behind the hero copy. Pure decoration: colours come from CSS (HeroArt.module.css). */
const E = 56; // cube edge
const DX = E * 0.866;
const DY = E * 0.5;
const OX = 360;
const OY = 250;

// [x, y, z] grid cells, a loose stair of stacked blocks.
const CELLS: [number, number, number][] = [
  [0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0], [1, 1, 0], [2, 1, 0], [3, 1, 0], [1, 2, 0], [2, 2, 0], [3, 2, 0], [4, 2, 0],
  [0, 0, 1], [1, 0, 1], [1, 1, 1], [2, 1, 1], [2, 2, 1], [3, 2, 1],
  [1, 0, 2], [2, 1, 2], [3, 2, 2],
  [2, 1, 3], [3, 2, 3],
  [3, 2, 4],
].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2])) as [number, number, number][];

const pts = (...p: [number, number][]) => p.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");

function cube([x, y, z]: [number, number, number]) {
  const bx = OX + (x - y) * DX;
  const by = OY + (x + y) * DY - z * E;
  return {
    top: pts([bx, by - E], [bx - DX, by - DY - E], [bx, by - 2 * DY - E], [bx + DX, by - DY - E]),
    left: pts([bx, by], [bx - DX, by - DY], [bx - DX, by - DY - E], [bx, by - E]),
    right: pts([bx, by], [bx + DX, by - DY], [bx + DX, by - DY - E], [bx, by - E]),
  };
}

export function HeroArt(props: { class?: string }) {
  return (
    <svg class={props.class} viewBox="0 0 720 560" aria-hidden="true">
      <For each={CELLS} keyed={(c) => c.join(",")}>
        {(cell) => {
          const c = cube(cell());
          return (
            <g>
              <polygon points={c.left} data-face="left" />
              <polygon points={c.right} data-face="right" />
              <polygon points={c.top} data-face="top" />
            </g>
          );
        }}
      </For>
    </svg>
  );
}
