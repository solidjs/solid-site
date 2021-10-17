import { lazy } from 'solid-js';

const Repl = lazy(() => import('../../components/ReplTab'));

const article = () => (
  <>
    <p>Hello and welcome to our new blog platform!</p>
    <p>
      As a relatively new project that's quickly evolving, it's only natural that we expand our
      means of communicating with rapidly growing community. Our core team values community
      engagement and our commitment to the ecosystem as a high priority. Following from Ryan's lead
      of "creating in public" we are growing our outlets and capabilities to engage with the
      community in positive ways.
    </p>
    <p>
      This new blog is but onf of the ways that we are planning to stay helpful and relevant to our
      growing community. You can turn to the Solid Blog to get news and updates and teaching
      material. You can count on the fact that major updates and releases will come out here first.
      Meanwhile Ryan will continue publishing articles you've come to love about the project and
      research relevant to his recent works. We'll frequently link to them here and make you aware
      of the latest.
    </p>
    <p>
      This blog comes super charged with extra capabilities that we wont easily have available via
      the typical providers. For example our custom Solid REPL for live demonstrations and intros:
    </p>
    <div class="rounded-lg overflow-hidden shadow-2xl mb-10">
      <Repl
        tabs={[
          {
            name: 'main1',
            type: 'tsx',
            source: `import { render } from "solid-js/web";
  import { onCleanup, createSignal } from "solid-js";

  const CountingComponent = () => {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(
  () => setCount(count => count + 1),
  1000
  );
  onCleanup(() => clearInterval(interval));
  return <div>Count value is {count()}</div>;
  };

  render(() => <CountingComponent />, document.getElementById("app"));`,
          },
        ]}
      />
    </div>
    <p>
      Other improvements in time will add more dynamic multimedia options and full feature blog
      support, maybe even commenting. If you have ideas on the topics, features and other
      improvements you'd love to see feel free to hop on our Discord to let us know.
    </p>
    <p>
      On behalf of the the entire Solid Core Team, thanks for reading and we look forward to solid
      future.
    </p>
    <p>David</p>
  </>
);

export default article;
