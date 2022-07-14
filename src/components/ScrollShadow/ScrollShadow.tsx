import { ParentComponent, onCleanup, onMount } from 'solid-js';
import { useAppContext } from '../AppContext';

type TShared = {
  direction: 'horizontal' | 'vertical';
  child: 'first' | 'last';
  rtl?: boolean;
  shadowSize: string;
  initShadowSize?: boolean;
};

const ScrollShadow: ParentComponent<
  {
    class: string;
    classList?: { [key: string]: boolean };
    locked: boolean;
  } & Omit<TShared, 'child'>
> = (props) => {
  const { direction, shadowSize, initShadowSize } = props;
  const sentinelShadowState = new Map<HTMLElement, { el: HTMLElement; visible: boolean }>();
  let shadowFirstEl!: HTMLElement;
  let shadowLastEl!: HTMLElement;
  let sentinelFirstEl!: HTMLDivElement;
  let sentinelLastEl!: HTMLDivElement;
  let scrollableContainer!: HTMLDivElement;
  let init = true;
  let initResetSize = false;
  let isScrollable = false;

  const scrollHorizontally = (e: WheelEvent) => {
    if (!isScrollable) return;

    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    target.scrollLeft += e.deltaX + e.deltaY;
  };

  onMount(() => {
    const resetInitShadowSize = () => {
      if (!initShadowSize) return;
      if (!init && !initResetSize) {
        sentinelShadowState.forEach(({ el }) => {
          el.style.transform = '';
        });
        initResetSize = true;
      }
    };
    const setInitShadowSize = () => {
      if (!initShadowSize) return;
      sentinelShadowState.forEach(({ el }) => {
        el.style.transform = 'scaleX(3)';
        shadowLastEl.style.transformOrigin = props.rtl ? 'left' : 'right';
        shadowFirstEl.style.transformOrigin = props.rtl ? 'right' : 'left';
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const { el: shadowEl } = sentinelShadowState.get(target)!;
        shadowEl.style.opacity = entry.isIntersecting ? '0' : '1';
        sentinelShadowState.set(target, { el: shadowEl, visible: entry.isIntersecting });
        resetInitShadowSize();
      });
      isScrollable = ![...sentinelShadowState].every(([, { visible }]) => visible === true);
      init = false;
    });

    scrollableContainer.addEventListener('wheel', scrollHorizontally, { passive: true });
    sentinelShadowState.set(sentinelFirstEl, { el: shadowFirstEl, visible: false });
    sentinelShadowState.set(sentinelLastEl, { el: shadowLastEl, visible: false });
    observer.observe(sentinelFirstEl);
    observer.observe(sentinelLastEl);
    setInitShadowSize();
    onCleanup(() => observer.disconnect());
  });
  return (
    <div class={props.class} classList={props.classList}>
      <Shadow
        child="first"
        direction={direction}
        shadowSize={shadowSize}
        rtl={props.rtl}
        ref={shadowFirstEl}
        locked={props.locked}
      />
      <Shadow
        child="last"
        direction={direction}
        shadowSize={shadowSize}
        rtl={props.rtl}
        ref={shadowLastEl}
        locked={props.locked}
      />
      <div class="relative flex items-center overflow-auto no-scrollbar" ref={scrollableContainer}>
        {props.children}
        <Sentinel child="first" direction={direction} rtl={props.rtl} ref={sentinelFirstEl} />
        <Sentinel child="last" direction={direction} rtl={props.rtl} ref={sentinelLastEl} />
      </div>
    </div>
  );
};

const Sentinel: ParentComponent<
  Omit<TShared, 'shadowSize' | 'initShadowSize'> & { ref: HTMLDivElement }
> = (props) => {
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
  return <div aria-hidden="true" style={style()} ref={props.ref}></div>;
};

const Shadow: ParentComponent<
  { ref: HTMLElement | ((el: HTMLElement) => void); locked: boolean } & TShared
> = (props) => {
  const { child, direction, ref, shadowSize: size } = props;
  const context = useAppContext();
  const refCb = (el: HTMLElement) => {
    (ref as (el: HTMLElement) => void)(el);
  };

  const setPosition = () => {
    const isFirst = child === 'first';
    const rtl = props.rtl;
    const left = rtl ? 'right' : 'left';
    const right = rtl ? 'left' : 'right';
    const rgb = !context.isDark ? '255, 255, 255' : props.locked ? '68, 107, 158' : '34, 34,34';

    if (direction === 'horizontal') {
      return `top: 0; ${isFirst ? left : right}: 0; background: linear-gradient(to ${
        isFirst ? right : left
      }, rgba(${rgb}, 1), 50%, rgba(${rgb}, 0)); width: ${size}; height: 100%;`;
    }
    return `left: 0; ${isFirst ? 'top' : 'bottom'}: 0; background: linear-gradient(to ${
      isFirst ? 'top' : 'bottom'
    }, rgba(${rgb}, 1), 50%, rgba(${rgb}, 0)); width: ${size}; height: 28%;`;
  };
  const style = () =>
    `position: absolute; z-index: 1; pointer-events: none; transition: 300ms opacity, 300ms transform; ${setPosition()};`;
  return <div ref={refCb} style={style()}></div>;
};

export default ScrollShadow;
