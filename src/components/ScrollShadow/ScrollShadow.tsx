import { Component, onCleanup, onMount } from 'solid-js';

type TShared = {
  direction: 'horizontal' | 'vertical';
  child: 'first' | 'last';
  size: string;
};

/**
 *
 * child scrollable container should have already have overflow property and should have `position: relative;` in order to make Intersection Observer to work.
 */
const ScrollShadow: Component<
  {
    class: string;
    shadowSize: string;
  } & Omit<TShared, 'child' | 'size'>
> = (props) => {
  const { class: className, direction, shadowSize } = props;
  const sentinelShadowState = new Map<HTMLElement, HTMLElement>();
  let shadowFirstEl!: HTMLElement;
  let shadowLastEl!: HTMLElement;
  let sentinelFirstEl = (<Sentinel child="first" direction={direction} />) as HTMLElement;
  let sentinelLastEl = (<Sentinel child="last" direction={direction} />) as HTMLElement;

  // won't work for SSR
  const children = props.children as HTMLElement;
  children.appendChild(sentinelFirstEl);
  children.appendChild(sentinelLastEl);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const shadowEl = sentinelShadowState.get(target);

        let isVisible = false;

        if (entry.isIntersecting) {
          isVisible = true;
        }
        shadowEl!.style.opacity = isVisible ? '0' : '1';

        console.log(target, isVisible);
      });
    });

    sentinelShadowState.set(sentinelFirstEl, shadowFirstEl);
    sentinelShadowState.set(sentinelLastEl, shadowLastEl);

    observer.observe(sentinelFirstEl);
    observer.observe(sentinelLastEl);

    onCleanup(() => observer && observer.disconnect());
  });

  return (
    <div class={className}>
      <Shadow child="first" direction={direction} size={shadowSize} ref={shadowFirstEl} />
      <Shadow child="last" direction={direction} size={shadowSize} ref={shadowLastEl} />

      {children}
    </div>
  );
};

const Sentinel: Component<Omit<TShared, 'size'>> = ({ direction, child }) => {
  const setPosition = (direction: string) => {
    const isFirst = child === 'first';
    if (direction === 'horizontal') {
      return `position: ${isFirst ? 'absolute' : 'relative'}; top: 0; ${
        isFirst ? 'left' : 'right'
      }: 0; height: 100%; width: 1px`;
    }
    return `position: ${isFirst ? 'absolute' : 'relative'}; left: 0; ${
      isFirst ? 'top' : 'bottom'
    }: 0; height: 1px; width: 100%`;
  };
  const style = `pointer-events: none; ${setPosition(direction)}; `;
  return <div style={style}></div>;
};

const Shadow: Component<{ ref: any } & TShared> = ({ ref, direction, child, size }) => {
  const setPosition = (direction: string) => {
    const isFirst = child === 'first';
    if (direction === 'horizontal') {
      return `top: 0; ${isFirst ? 'left' : 'right'}: 0;   background: linear-gradient(to ${
        isFirst ? 'right' : 'left'
      }, rgba(255, 255, 255, 1), 65%, rgba(255, 255, 255, 0)); width: ${size}; height: 100%`;
    }

    return `left: 0; ${isFirst ? 'top' : 'bottom'}: 0; background: linear-gradient(to ${
      isFirst ? 'top' : 'bottom'
    }, rgba(255, 255, 255, 1), 65%, rgba(255, 255, 255, 0)); width: ${size}; height: 28%`;
  };
  const style = `position: absolute; z-index: 1; pointer-events: none; opacity: 0; transition: 500ms opacity; ${setPosition(
    direction,
  )};`;

  return <div ref={ref} style={style}></div>;
};

export default ScrollShadow;
