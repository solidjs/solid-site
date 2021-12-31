import { Component, For } from 'solid-js';
import builder from '../assets/supporters/builder-colour.png';
import stytch from '../assets/supporters/stytch.png';
import FourOhTwo from '../assets/supporters/402.png';
import Newsletter from '../components/Newsletter';
import createCountdown from '@solid-primitives/countdown';

type BoxProps = {
  title: string;
};

const Box: Component<BoxProps> = (props) => (
  <div class="md:grid md:grid-cols-12 md:space-x-6 bg-white/50 text-gray-700 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
    <div class="text-3xl col-span-2 font-semibold mb-5">{props.title}</div>
    <div class="col-span-10">{props.children}</div>
  </div>
);

const Countdown: Component = () => {
  const startDate = new Date(1641531600000);
  const endDate = new Date(1649390400000);
  const countdownValues = createCountdown(
    new Date().getTime() < startDate.getTime() ? startDate : endDate,
  );

  const CountdownBox = (props: { label: string; value: number }) => {
    const fixed = props.value >= 10 ? props.value.toString() : '0' + props.value.toString();

    return (
      <div class="flex flex-col items-center bg-gray-700 text-white py-4 px-4 md:py-5 md:px-7 rounded-md">
        <div class="font-mono text-5xl">{fixed}</div>
        {props.label}
      </div>
    );
  };

  return (
    <div class="flex flex-row w-min gap-2">
      <For each={Object.entries(countdownValues).slice(0, -1)}>
        {(entry) => <CountdownBox label={entry[0]} value={entry[1]}></CountdownBox>}
      </For>
    </div>
  );
};

const Hack: Component = () => {
  return (
    <div
      class="w-full flex flex-col items-center gap-6 md:gap-8 lg:gap-12 px-10 min-h-screen"
      style={{
        background:
          'linear-gradient(-180deg, #BCC5CE 0%, #335d92 90%), radial-gradient(at bottom left, rgba(255,255,255,0.98) 0%, rgba(0,0,0,0.30) 80%)',
        'background-blend-mode': 'screen',
      }}
    >
      <img
        class="w-6/6 md:w-5/6 mt-32 mb-4 g:w-4/6 xl:w-3/6 2xl:w-2/6 mx-auto"
        src="/img/hack.svg"
      />

      <Countdown></Countdown>

      <div>
        <Box title="What">
          <b>SolidHack</b> is a public hackathon presented by the Solid Team and corporate sponsors.
          We've got US$10,000 to give away to the best projects across three categories. It's free
          to enter, you've got three months to build your project, and winners will be selected by
          public vote.
        </Box>
        <Box title="When">
          The event begins <strong>January 7th</strong> and you can start building then. The
          submissions portal will open in mid February, but you'll have until April 7th to submit.
          More details on categories and official rules and regulations will be announced via Solid
          News before the start date. Sign up below or join the{' '}
          <a target="_blank" href="https://discord.com/invite/solidjs" class="underline">
            Solid Discord
          </a>{' '}
          to make sure you're up-to-date!
        </Box>
        <Box title="Who">
          The hackathon is open to anyone: experienced Solid users and newcomers alike. You'll use
          your GitHub account to verify your identity when you submit your project and when you cast
          your vote. The event is sponsored by corporate supporters of Solid and the open-source
          ecosystem.
          <div class="flex items-center space-y-5 flex-col md:space-y-0 md:flex-row mt-3 md:space-x-8 bg-white/20 p-4 px-7 rounded-xl">
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="https://www.stytch.com"
            >
              <img class="inline-block w-24" src={stytch} />
            </a>
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="https://www.builder.io"
            >
              <img class="inline-block w-24" src={builder} />
            </a>
            <a
              target="_blank"
              class="hover:opacity-70 transition duration-300"
              rel="noopener"
              href="#"
            >
              <img class="inline-block w-24" src={FourOhTwo} />
            </a>
          </div>
          <small class="mt-3 block">
            To participate as a sponsor contact{' '}
            <a href="mailto:community@solidjs.com">community@solidjs.com</a>.
            <br />
            <br />A special thanks to others who have submitted personal donations including:{' '}
            <a target="_blank" href="https://github.com/Brendan-csel">
              Brendan-csel
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://github.com/davedbase">
              davedbase
            </a>
            .
          </small>
        </Box>
        <Box title="Why">
          <p class="mb-3">
            Solid has made its mark on the JavaScript ecosystem. It's a flourishing community and we
            want you to be a part of it.
          </p>
          <p>
            We know that this kind of initiative is new for the open-source world, and we're looking
            to push the boundaries of what a hackathon can be and what open-source projects can do.
            Ultimately, we want to give you an opportunity to give Solid a try.
          </p>
        </Box>

        <div class="bg-white/50 text-gray-700 max-w-3xl mx-auto mt-5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div class="mb-5">
            Stay up-to-date on SolidHack, major Solid releases, and community updates.
          </div>
          <Newsletter title="Sign up for Solid News" />
        </div>
        <div class="bg-opacity-50 text-black max-w-3xl mx-auto mt-2 mb-20 p-10 rounded-xl">
          <small>
            SolidHack is operated by volunteers and funded by corporate sponsors. The SolidHack
            Planning Committee is responsible for coordinating Rules and Regulations. Questions and
            concerns relating to the competition may be directed to community@solidjs.com. The
            Planning Committee maintains the right to enforce, adapt or cancel terms of the
            competition in the spirit of fairness.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Hack;
