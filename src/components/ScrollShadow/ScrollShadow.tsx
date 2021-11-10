import { Component, onCleanup, onMount } from 'solid-js';

type TShared = {
  direction: 'horizontal' | 'vertical';
  child: 'first' | 'last';
  rtl?: boolean;
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
    classList?: { [key: string]: boolean };
  } & Omit<TShared, 'child'>
> = (props) => {
  const { class: className, direction, shadowSize, initShadowSize } = props;
  const sentinelShadowState = new Map<HTMLElement, HTMLElement>();
  let shadowFirstEl!: HTMLElement;
  let shadowLastEl!: HTMLElement;
  let sentinelFirstEl = (
    <Sentinel child="first" direction={direction} rtl={props.rtl} />
  ) as HTMLElement;
  let sentinelLastEl = (
    <Sentinel child="last" direction={direction} rtl={props.rtl} />
  ) as HTMLElement;
  let init = true;
  let initResetSize = false;

  // Won't work for SSR
  const scrollableContainer = props.children as HTMLElement;
  scrollableContainer.appendChild(sentinelFirstEl);
  scrollableContainer.appendChild(sentinelLastEl);

  const scrollHorizontally = (e: WheelEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.scrollLeft += e.deltaY;
    e.preventDefault();
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
        shadowLastEl.style.transformOrigin = props.rtl ? 'left' : 'right';
        shadowFirstEl.style.transformOrigin = props.rtl ? 'right' : 'left';
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

    scrollableContainer.addEventListener('wheel', scrollHorizontally);
    sentinelShadowState.set(sentinelFirstEl, shadowFirstEl);
    sentinelShadowState.set(sentinelLastEl, shadowLastEl);
    observer.observe(sentinelFirstEl);
    observer.observe(sentinelLastEl);
    setInitShadowSize();
    onCleanup(() => observer && observer.disconnect());
  });
  return (
    <div class={props.class} classList={props.classList}>
      <Shadow
        child="first"
        direction={direction}
        shadowSize={shadowSize}
        rtl={props.rtl}
        ref={shadowFirstEl}
      />
      <Shadow
        child="last"
        direction={direction}
        shadowSize={shadowSize}
        rtl={props.rtl}
        ref={shadowLastEl}
      />
      {scrollableContainer}
    </div>
  );
};

const Sentinel: Component<Omit<TShared, 'shadowSize' | 'initShadowSize'>> = (props) => {
  const { direction, child } = props;

  const setPosition = () => {
    const isFirst = child === 'first';
    const rtl = props.rtl;
    const marginLeft = rtl ? 'margin-right' : 'margin-left';
    const left = rtl ? 'right' : 'left';
    const right = rtl ? 'left' : 'right';

    if (direction === 'horizontal') {
      return `position: ${isFirst ? 'absolute' : 'static'}; top: 0; ${
        isFirst ? left : right
      }: 0; height: 100%; width: 1px; ${isFirst ? '' : `flex-shrink: 0; ${marginLeft}: -1px;`}`;
    }
    return `position: ${isFirst ? 'absolute' : 'relative'}; left: 0; ${
      isFirst ? 'top' : 'bottom'
    }: 0; height: 1px; width: 100%`;
  };
  const style = () => `pointer-events: none; ${setPosition()}; `;
  return <div aria-hidden="true" style={style()}></div>;
};

const Shadow: Component<{ ref: any } & TShared> = (props) => {
  const { child, direction, ref, shadowSize: size } = props;
  const refCb = (el: HTMLElement) => {
    ref(el);
    divEl = el;
  };
  let divEl!: HTMLElement;

  const setPosition = () => {
    const isFirst = child === 'first';
    const rtl = props.rtl;
    const left = rtl ? 'right' : 'left';
    const right = rtl ? 'left' : 'right';

    if (direction === 'horizontal') {
      return `top: 0; ${isFirst ? left : right}: 0; background: linear-gradient(to ${
        isFirst ? right : left
      }, rgba(255, 255, 255, 1), 50%, rgba(255, 255, 255, 0)); width: ${size}; height: 100%; ${
        divEl ? `opacity: ${divEl.style.opacity};` : ''
      }`;
    }
    return `left: 0; ${isFirst ? 'top' : 'bottom'}: 0; background: linear-gradient(to ${
      isFirst ? 'top' : 'bottom'
    }, rgba(255, 255, 255, 1), 50%, rgba(255, 255, 255, 0)); width: ${size}; height: 28%; ${
      divEl ? `opacity: ${divEl.style.opacity};` : ''
    }`;
  };
  const style = () =>
    `position: absolute; z-index: 1; pointer-events: none; transition: 300ms opacity, 300ms transform; ${setPosition()};`;
  return <div ref={refCb} style={style()}></div>;
};

export default ScrollShadow;
