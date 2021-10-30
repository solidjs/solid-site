import { Component, onCleanup, onMount } from 'solid-js';
import createThrottle from '@solid-primitives/throttle';

// why not use createUniqueId? Because it takes to long for devices with low cpu to render loading bar.
let id = 0;

const PageLoadingBar: Component<{ postion?: 'top' | 'bottom'; width?: number }> = ({
  postion = 'top',
  width = 0,
}) => {
  const gradientId = 'page-loading-bar-linear-gradient';
  const duration = 8000;
  const delay = 250;
  const [onResizeThrottled, clearOnResizeThrottled] = createThrottle(onResize, 250);
  const animationName = () => `page-loading-bar-animation-${id}`;
  const animationValue = () => `${animationName()} ${duration}ms ${delay}ms infinite`;
  const pathDValue = () => `M 0, ${postion === 'top' ? 3 : 5} h ${width}`;

  let svgEl!: SVGSVGElement;
  let pathEl!: SVGPathElement;
  let styleEl: HTMLStyleElement;
  // Safari reads keyframe animation name once, so updated keyframes are ignored. Solution is to create new name
  id++;

  onMount(() => {
    createKeyframe();

    window.addEventListener('resize', onResizeThrottled);
  });

  onCleanup(() => {
    clearOnResizeThrottled();
    window.removeEventListener('resize', onResizeThrottled);
  });

  function onResize() {
    width = svgEl.parentElement!.clientWidth;
    svgEl.setAttribute('width', `${width}`);
    pathEl.setAttribute('d', pathDValue());
    pathEl.setAttribute('stroke-dasharray', `${width}px`);
    pathEl.setAttribute('stroke-dashoffset', `${width}px`);
    id++;
    pathEl.style.animation = animationValue();
    createKeyframe();
  }

  const createKeyframe = () => {
    const keyframe = `@keyframes ${animationName()} {${generateAnimation()}}`;

    if (styleEl) {
      styleEl.textContent = keyframe;
      return;
    }

    styleEl = document.createElement('style');
    styleEl.textContent = keyframe;
    document.head.appendChild(styleEl);
  };

  const generateAnimation = () => {
    const frames = 100;
    const step = 15;
    let percentage = 100;

    let keyframes = `0% {stroke-dashoffset: ${width}px}`;

    for (let i = step; i < frames; i += step) {
      const divide = i + step >= frames ? 10 : 2;
      percentage /= 1.7;

      keyframes += `${i}%,${i + step / divide}% {
        stroke-dashoffset: ${width * (percentage / 100)}px;
        transform: translateX(0px);
      }`;
    }

    keyframes += `100% {
      stroke-dashoffset: 0;
      transform: translateX(${width}px);
    }`;
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
        d={pathDValue()}
        stroke={`url(#${gradientId})`}
        stroke-dasharray={`${width}px`}
        stroke-dashoffset={`${width}px`}
        stroke-width="8"
        stroke-linecap="round"
        style={`animation: ${animationValue()};`}
      />
    </svg>
  );
};

export default PageLoadingBar;
