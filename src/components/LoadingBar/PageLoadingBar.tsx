import { Component, onCleanup, onMount } from 'solid-js';

let prevWidth = 0;
// why not use createUniqueId? Because it takes to long for devices with low cpu to render loading bar.
let id = 0;

const PageLoadingBar: Component<{ postion?: 'top' | 'bottom'; width?: number }> = ({
  postion = 'top',
  width = 0,
}) => {
  const gradientId = 'page-loading-bar-linear-gradient';
  let svgEl!: SVGSVGElement;
  let pathEl!: SVGPathElement;
  let timeoutId = null as unknown as number;
  let styleElement: HTMLStyleElement;
  let animationName = `page-loading-bar-animation-${id}`;
  // Safari reads keyframe animation name once, so updated keyframes are ignored. Solution is to create new name
  id++;

  onMount(() => {
    createKeyframe();
  });

  onCleanup(() => {
    window.clearTimeout(timeoutId);
  });

  const createKeyframe = () => {
    const keyframe = `@keyframes ${animationName} {${generateAnimation()}}`;

    if (prevWidth === width) return;
    if (styleElement) {
      styleElement.textContent = keyframe;
      return;
    }

    const styleEl = document.createElement('style');
    styleEl.textContent = keyframe;
    styleElement = styleEl;
    document.head.appendChild(styleElement);
    prevWidth = width;
  };

  const generateAnimation = () => {
    const frames = 100;
    const step = 15;
    let percentage = 100;

    let keyframes = `0% {stroke-dashoffset: ${width}}`;

    for (let i = step; i < frames; i += step) {
      const divide = i + step >= frames ? 10 : 2;
      percentage /= 1.7;

      keyframes += `${i}%,${i + step / divide}% {stroke-dashoffset: ${width * (percentage / 100)}}`;
    }

    keyframes += `100% {stroke-dashoffset: -${width}}`;
    return keyframes;
  };

  return (
    <svg
      class="absolute w-full pointer-events-none z-50"
      ref={svgEl}
      style={`${postion}: 0;`}
      height="10px"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          {/* <stop offset="10%" stop-color="#000955" />
          <stop offset="50%" stop-color="#1b2670" />
          <stop offset="70%" stop-color="#8bbbe2" />
          <stop offset="100%" stop-color="#8bbbe2" /> */}
          {/* <stop offset="0%" stop-color="#09009a" /> */}
          <stop offset="30%" stop-color="#1b2670" />
          <stop offset="50%" stop-color="#000955" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
      </defs>
      <path
        ref={pathEl}
        d={`M 0, ${postion === 'top' ? 3 : 5} h ${width}`}
        stroke={`url(#${gradientId})`}
        stroke-dasharray={`${width}`}
        stroke-dashoffset={`${width}`}
        stroke-width="8"
        stroke-linecap="round"
        style={`animation: ${animationName} 8000ms infinite;`}
      />
    </svg>
  );
};

export default PageLoadingBar;
