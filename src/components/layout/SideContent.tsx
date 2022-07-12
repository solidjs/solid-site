import Dismiss from 'solid-dismiss';
import { Icon } from 'solid-heroicons';
import { chevronRight } from 'solid-heroicons/outline';
import { Accessor, Component, JSX, Setter } from 'solid-js';
import { routeReadyState, useRouteReadyState } from '../../utils/routeReadyState';

const SideContent: Component<{
  toggleVisible: Accessor<boolean>;
  setToggleVisible: Setter<boolean>;
  aside: JSX.Element;
  content: JSX.Element;
}> = (props) => {
  let menuButton!: HTMLButtonElement;

  useRouteReadyState();

  return (
    <div dir="ltr" class="lg:bg-doc dark:lg:bg-darkDoc flex min-h-screen flex-auto relative">
      <div class="flex container">
        <div class="absolute z-20 left-0 h-full lg:static lg:w-3/12 bg-gray-100 dark:bg-gray-900 rounded-br-lg">
          <button
            class={`fixed lg:hidden top-20 right-3 text-white rounded-lg transition duration-500 bg-solid-medium reveal-delay`}
            classList={{
              'rotate-90': props.toggleVisible(),
              'opacity-0': routeReadyState().routeChanged,
            }}
            ref={menuButton}
          >
            <Icon class="h-7 w-7" path={chevronRight} />
          </button>
          <Dismiss
            show
            class="w-0 lg:w-auto lg:col-span-3 sticky top-[4rem]"
            menuButton={menuButton}
            open={props.toggleVisible}
            setOpen={props.setToggleVisible}
          >
            <div
              class={
                'w-[85vw] overflow-auto p-10 shadow-2xl bg-white dark:bg-solid-darkbg border-gray-100 ' +
                'dark:bg-solid-darkLighterBg fixed left-0 top-14 lg:bg-transparent lg:translate-x-0 lg:duration-0 transition-transform ' +
                'duration-300 max-w-md lg:w-auto lg:border-0 lg:shadow-none lg:p-0 lg:flex-col lg:top-12 ' +
                'relative lg:flex z-50'
              }
              classList={{
                '-translate-x-full shadow-none': !props.toggleVisible(),
                'translate-x-0 shadow-2xl': props.toggleVisible(),
              }}
              style={{ height: 'calc(100vh - 4rem)', top: 0 }}
            >
              {props.aside}
            </div>
          </Dismiss>
        </div>
        <div class="w-full lg:w-9/12 p-5 md:p-10 bg-white dark:bg-solid-darkbg">
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default SideContent;
