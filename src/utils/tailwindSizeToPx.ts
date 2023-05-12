import { onCleanup } from 'solid-js';

export const useTailwindSizeToPx = () => {
  const element = document.createElement('div');
  element.style.height = '0';
  element.style.overflow = 'hidden';

  const measure = document.createElement('div');
  measure.classList.add('h-1');

  element.appendChild(measure);

  document.body.appendChild(element);
  onCleanup(() => {
    document.body.removeChild(element);
  });

  return {
    sizeToPx: (size: number) => size * measure.offsetHeight,
  };
};
