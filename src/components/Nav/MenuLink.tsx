import { createEventListener } from '@solid-primitives/event-listener';
import { NavLink } from 'solid-app-router';
import { batch, onMount, ParentComponent, Show } from 'solid-js';
import { setRouteReadyState, page, reflow } from '../../utils';

export type MenuLinkProps = {
  title: string;
  description: string;
  path: string;
  external?: boolean;
  setSubnav: (children: MenuLinkProps[]) => void;
  setSubnavPosition: (position: number) => void;
  closeSubnav: () => void;
  clearSubnavClose: () => void;
  links: MenuLinkProps[];
  direction: 'ltr' | 'rtl';
};

export const MenuLink: ParentComponent<MenuLinkProps> = (props) => {
  let linkEl!: HTMLAnchorElement;

  // Only rerender event listener when children change
  if (props.links) {
    onMount(() => {
      createEventListener(linkEl, 'mouseenter', () => {
        props.clearSubnavClose();
        batch(() => {
          props.setSubnav(props.links as MenuLinkProps[]);
          props.setSubnavPosition(linkEl.getBoundingClientRect().left);
        });
      });
      createEventListener(linkEl, 'mouseleave', () => props.closeSubnav());
    });
  }
  onMount(() => {
    createEventListener(linkEl, 'mousedown', () => {
      setRouteReadyState((prev) => ({ ...prev, loadingBar: true }));
      page.scrollY = window.scrollY;
      reflow();
      const clearLeave = createEventListener(linkEl, 'mouseleave', () => {
        setRouteReadyState((prev) => ({ ...prev, loadingBar: false }));
        removeEvents();
      });
      const clearClick = createEventListener(linkEl, 'click', () => {
        setRouteReadyState((prev) => ({ ...prev, loadingBar: false }));
        removeEvents();
      });
      const removeEvents = () => {
        clearLeave();
        clearClick();
      };
    });
    if (!window.location.pathname.startsWith(props.path)) return;

    // @ts-ignore
    linkEl.scrollIntoView({ inline: 'center', behavior: 'instant' });
  });

  const onClick = () => {
    if (window.location.pathname.startsWith(props.path)) {
      window.scrollTo({ top: 0 });
      return;
    }
    const pageEl = document.body;
    pageEl.style.minHeight = document.body.scrollHeight + 'px';
    reflow();
    setRouteReadyState((prev) => ({
      ...prev,
      loadingBar: true,
      loading: true,
      routeChanged: true,
    }));
  };

  return (
    <li>
      <NavLink
        href={props.path}
        target={props.external ? '_blank' : undefined}
        class="inline-flex items-center transition text-[15px] dark:hover:bg-solid-darkLighterBg sm:text-base m-0 sm:m-1 px-3 sm:px-4 py-3 rounded pointer-fine:hover:text-white pointer-fine:hover:bg-solid-medium whitespace-nowrap"
        activeClass="bg-solid-medium dark:bg-solid-light text-white"
        onClick={() => !props.external && onClick()}
        noScroll
        ref={linkEl}
      >
        <span>{props.title}</span>
        <Show when={props.external}>
          <svg
            class="h-5 z-50 -mt-1 ltr:ml-1 rtl:mr-1 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Show>
      </NavLink>
    </li>
  );
};
