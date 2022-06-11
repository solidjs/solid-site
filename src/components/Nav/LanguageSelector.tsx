import { ParentComponent } from 'solid-js';

export const LanguageSelector: ParentComponent<{ ref: HTMLButtonElement }> = (props) => (
  <button
    aria-label="Select Language"
    ref={props.ref}
    class="dark:brightness-150 focus:color-red-500 bg-no-repeat bg-center bg-translate bg-24 hover:border-gray-500 cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 px-6 pl-4 ml-2 rounded-md h-10 border border-solid-100 pt-4 text-sm my-3 w-full"
  />
);
