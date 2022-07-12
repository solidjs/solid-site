import { Component, createSignal, Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

const NewsletterState = {
  IDLE: 0,
  SENDING: 1,
  SENT: 2,
  ERROR: 3,
};

type NewsletterProps = {
  title: string;
  className: string;
};

export const Newsletter: Component<NewsletterProps> = (props) => {
  let emailRef: HTMLInputElement;
  const [t] = useI18n();
  const [state, setState] = createSignal(NewsletterState.IDLE);
  const submit = async (evt: Event) => {
    evt.preventDefault();
    setState(NewsletterState.SENDING);
    try {
      await fetch('https://newsletter.solidjs.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailRef.value }),
      });
      emailRef.value = '';
      setState(NewsletterState.SENT);
    } catch (err) {
      setState(NewsletterState.ERROR);
    }
  };
  return (
    <form
      class={`bg-solid flex flex-col md:flex-row w-full items-center space-x-4 ${props.className}`}
      onSubmit={(e) => {
        void submit(e);
        return false;
      }}
    >
      <div class="font-semibold text-md mb-3 md:mb-0">{props.title}</div>
      <div class="w-full md:w-3/6">
        <div class="flex space-x-2">
          <input
            type="email"
            class="w-full rounded-md py-2 px-4 border border-gray-300 dark:bg-solid-darkbg dark:placeholder:text-gray-200 dark:border-neutral-500"
            required={true}
            ref={(ref) => (emailRef = ref)}
            disabled={state() === NewsletterState.SENDING}
            placeholder={t('global.newsletter.email', {}, 'Email address')}
          />
          <button
            disabled={state() === NewsletterState.SENDING}
            class="bg-solid-medium py-3 px-5 text-white rounded-md hover:bg-solid-dark transition duration-300"
            type="submit"
          >
            <Show
              fallback={t('global.newsletter.sending', {}, 'Sending')}
              when={state() !== NewsletterState.SENDING}
            >
              {t('global.newsletter.register', {}, 'Register')}
            </Show>
          </button>
        </div>
        <Show when={state() === NewsletterState.SENT}>
          <div class="mt-3">
            {t('global.newsletter.success', {}, 'You are successfully registered!')}
          </div>
        </Show>
        <Show when={state() === NewsletterState.ERROR}>
          <div class="mt-3 text-red-500">
            {t('global.newsletter.error', {}, 'Registration could not be completed')}
          </div>
        </Show>
      </div>
    </form>
  );
};

export default Newsletter;
