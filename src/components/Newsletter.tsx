import { Component, createSignal, Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

const NewsletterState = {
  IDLE: 0,
  SENDING: 1,
  SENT: 2,
  ERROR: 3
};

type NewsletterProps = {
  title: string;
  className?: string;
}

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailRef.value })
      });
      emailRef.value = '';
      setState(NewsletterState.SENT);
    } catch(err) {
      setState(NewsletterState.ERROR);
    }
    return false;
  };
  return (
    <form
      class={
        `bg-solid flex w-full items-center space-x-4 ${props.className}`
      }
      onSubmit={submit}
    >
      <div class="font-semibold text-md">{props.title}</div>
      <div class="w-3/6">
        <div class="flex space-x-2">
          <input
            type="email"
            class="w-full rounded-md py-2 border-gray-300"
            required={true}
            ref={emailRef}
            disabled={state() === NewsletterState.SENDING}
            placeholder={t('global.footer.newsletter.email', {}, 'Email address')}
          />
          <button
            disabled={state() === NewsletterState.SENDING}
            class="bg-solid-medium py-3 px-5 text-white rounded-md hover:bg-solid-dark transition duration-300"
            type="submit"
          >
            <Show fallback="Sending..." when={state() !== NewsletterState.SENDING}>Register</Show>
          </button>
        </div>
        <Show when={state() === NewsletterState.SENT}>
          <div class="mt-3">
            {t('global.footer.newsletter.success', {}, 'You are successfully registered!')}
          </div>
        </Show>
        <Show when={state() === NewsletterState.ERROR}>
          <div class="mt-3 text-red-500">
            {t('global.footer.newsletter.error', {}, 'Registration could not be completed')}
            Registration could not be completed.
          </div>
        </Show>
      </div>
    </form>
  )
}

export default Newsletter;
