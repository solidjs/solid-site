import { Component, onCleanup, onMount } from 'solid-js';

type TShared = {
  direction: 'horizontal' | 'vertical';
  child: 'first' | 'last';
  shadowSize: string;
  initShadowSize?: boolean;
};

/**
 *
 * child scrollable container should have already have overflow property and should have `position: relative;` in order to make Intersection Observer to work.
 */
const ScrollShadow: Component<
  {
    class: string;
  } & Omit<TShared, 'child'>
> = (props) => {
  const { class: className, direction, shadowSize, initShadowSize } = props;
  const sentinelShadowState = new Map<HTMLElement, HTMLElement>();
  let shadowFirstEl!: HTMLElement;
  let shadowLastEl!: HTMLElement;
  let sentinelFirstEl = (<Sentinel child="first" direction={direction} />) as HTMLElement;
  let sentinelLastEl = (<Sentinel child="last" direction={direction} />) as HTMLElement;
  let init = true;
  let initResetSize = false;

  // Won't work for SSR
  const scrollableContainer = props.children as HTMLElement;
  scrollableContainer.appendChild(sentinelFirstEl);
  scrollableContainer.appendChild(sentinelLastEl);

  const scrollHorizontally = (e: WheelEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.scrollLeft += e.deltaY;
  };
  onMount(() => {
    const resetInitShadowSize = () => {
      if (!initShadowSize) return;
      if (!init && !initResetSize) {
        sentinelShadowState.forEach((item) => {
          item.style.transform = '';
        });
        initResetSize = true;
      }
    };
    const setInitShadowSize = () => {
      if (!initShadowSize) return;
      sentinelShadowState.forEach((item) => {
        item.style.transform = 'scaleX(3)';
        shadowLastEl.style.transformOrigin = 'right';
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const shadowEl = sentinelShadowState.get(target);
        let isVisible = false;
        if (entry.isIntersecting) {
          isVisible = true;
        }
        shadowEl!.style.opacity = isVisible ? '0' : '1';
        resetInitShadowSize();
      });
      init = false;
    });
    scrollableContainer.addEventListener('wheel', scrollHorizontally, { passive: true });
    sentinelShadowState.set(sentinelFirstEl, shadowFirstEl);
    sentinelShadowState.set(sentinelLastEl, shadowLastEl);
    observer.observe(sentinelFirstEl);
    observer.observe(sentinelLastEl);
    setInitShadowSize();
    onCleanup(() => observer && observer.disconnect());
  });
  return (
    <div class={className}>
      <Shadow child="first" direction={direction} shadowSize={shadowSize} ref={shadowFirstEl} />
      <Shadow child="last" direction={direction} shadowSize={shadowSize} ref={shadowLastEl} />
      {scrollableContainer}
    </div>
  );
};

const Sentinel: Component<Omit<TShared, 'shadowSize' | 'initShadowSize'>> = ({
  direction,
  child,
}) => {
  const setPosition = (direction: string) => {
    const isFirst = child === 'first';
    if (direction === 'horizontal') {
      return `position: ${isFirst ? 'absolute' : 'static'}; top: 0; ${
        isFirst ? 'left' : 'right'
      }: 0; height: 100%; width: 1px; ${isFirst ? '' : 'flex-shrink: 0; margin-left: -1px;'}`;
    }
    return `position: ${isFirst ? 'absolute' : 'relative'}; left: 0; ${
      isFirst ? 'top' : 'bottom'
    }: 0; height: 1px; width: 100%`;
  };
  const style = `pointer-events: none; ${setPosition(direction)}; `;
  return <div style={style}></div>;
};

const Shadow: Component<{ ref: any } & TShared> = ({ child, direction, ref, shadowSize: size }) => {
  const setPosition = () => {
    const isFirst = child === 'first';
    if (direction === 'horizontal') {
      return `top: 0; ${isFirst ? 'left' : 'right'}: 0; background: linear-gradient(to ${
        isFirst ? 'right' : 'left'
      }, rgba(255, 255, 255, 1), 50%, rgba(255, 255, 255, 0)); width: ${size}; height: 100%`;
    }
    return `left: 0; ${isFirst ? 'top' : 'bottom'}: 0; background: linear-gradient(to ${
      isFirst ? 'top' : 'bottom'
    }, rgba(255, 255, 255, 1), 50%, rgba(255, 255, 255, 0)); width: ${size}; height: 28%`;
  };
  const style = `position: absolute; z-index: 1; pointer-events: none; transition: 300ms opacity, 300ms transform; ${setPosition()};`;
  return <div ref={ref} style={style}></div>;
};

export default ScrollShadow;
