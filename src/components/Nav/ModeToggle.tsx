import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { VoidComponent } from 'solid-js';
import { useAppState } from '../../AppContext';

export const ModeToggle: VoidComponent = () => {
  const context = useAppState();
  const { t } = context;
  const title = () => (context.isDark ? t('global.light_mode') : t('global.dark_mode'));

  return (
    <button
      type="button"
      onClick={() => context.setDark(!context.isDark)}
      class="text-solid-medium dark:brightness-150 focus:color-red-500 bg-no-repeat bg-center hover:border-gray-500 cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 px-3 ml-2 rounded-md h-10 border border-solid-100"
      classList={{
        'hover:bg-gray-300 dark:hover:text-black focus:outline-none focus:highlight-none active:highlight-none focus:ring-0 active:outline-none':
          context.isDark,
      }}
      title={title()}
    >
      <Icon path={context.isDark ? sun : moon} class="h-6" />
      <span class="text-xs sr-only">{title()}</span>
    </button>
  );
};
