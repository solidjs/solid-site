import { Component, createSignal, Show } from 'solid-js';

const NewsletterState = {
  IDLE: 0,
  SENDING: 1,
  SENT: 2,
  ERROR: 3
};

export const Newsletter: Component = () => {
  let emailRef: HTMLInputElement;
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
      setState(NewsletterState.SENT);
    } catch(err) {
      setState(NewsletterState.ERROR);
    }
    return false;
  };
  return (
    <form
      class="mb-10 py-3 bg-solid flex w-full items-center space-x-4"
      onSubmit={submit}
    >
      <div class="font-semibold text-md">Sign up for Solid News</div>
      <div class="w-3/6">
        <div class="flex space-x-2">
          <input
            type="email"
            class="w-full rounded-md py-2 border-gray-300"
            required={true}
            ref={emailRef}
            disabled={state() === NewsletterState.SENDING}
            placeholder="Email address"
          />
          <button
            class="bg-solid-medium py-3 px-5 text-white rounded-md"
            type="submit"
          >
            <Show fallback="Sending..." when={state() !== NewsletterState.SENDING}>Register</Show>
          </button>
        </div>
        <Show when={state() === NewsletterState.SENT}>
          <div class="mt-3">
            You were successfully registered!
          </div>
        </Show>
        <Show when={state() === NewsletterState.ERROR}>
          <div class="mt-3 text-red-500">
            Registration could not be completed.
          </div>
        </Show>
      </div>
    </form>
  )
}

export default Newsletter;
