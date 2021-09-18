import { Component, lazy, Show } from 'solid-js';
import Footer from '../components/Footer';
import { useI18n } from '@solid-primitives/i18n';
import { useData } from 'solid-app-router';

const Repl = lazy(() => import('../components/ReplTab'));

const BlogArchive: Component = () => {
  return (
    <a href="/blog/entry" class="block text-md mx-auto mb-10 pb-10 text-center">
      <img class="w-4/6 mx-auto rounded-md mb-10 shadow-md" src="/img/blog/sample/header.png" />
      <h1 class="text-xl font-semibold text-solid-medium">Welcome to the Solid blog!</h1>A new Solid
      based blog with lots of information and helpful details for you to view.
      <div class="text-xs mt-3">By Ryan Carniato</div>
    </a>
  );
};

const Blog: Component = () => {
  const [t] = useI18n();
  const data = useData<any>();
  return (
    <div class="flex flex-col">
      <div class="my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 flex justify-center">
          <Show when={data.archive}>
            <div class="space-y-10">
              <BlogArchive />
              <BlogArchive />
              <BlogArchive />
            </div>
          </Show>
          <Show when={!data.archive}>
            <div class="container px-10">
              <div class="text-center space-y-5">
                <img class="rounded-md mb-10 shadow-md" src="/img/blog/sample/header.png" />
                <h1 class="text-4xl font-semibold mt-10 text-solid-medium">
                  Introducing the new Solid Community Blog
                </h1>
                <div class="text-md">
                  Posted by <a href="https://github.com/davedbase">David Di Biase</a> on September
                  17, 2021
                </div>
              </div>
              <hr class="mt-10 w-1/6 mx-auto" />
              <article class="mt-10 prose mx-auto">
                <p>Hello and welcome to our new blog platform!</p>
                <p>
                  As a relatively new project that's quickly evolving, it's only natural that we
                  expand our means of communicating with rapidly growing community. Our core team
                  values community engagement and our commitment to the ecosystem as a high
                  priority. Following from Ryan's lead of "creating in public" we are growing our
                  outlets and capabilities to engage with the community in positive ways.
                </p>
                <p>
                  This new blog is but onf of the ways that we are planning to stay helpful and
                  relevant to our growing community. You can turn to the Solid Blog to get news and
                  updates and teaching material. You can count on the fact that major updates and
                  releases will come out here first. Meanwhile Ryan will continue publishing
                  articles you've come to love about the project and research relevant to his recent
                  works. We'll frequently link to them here and make you aware of the latest.
                </p>
                <p>
                  This blog comes super charged with extra capabilities that we wont easily have
                  available via the typical providers. For example our custom Solid REPL for live
                  demonstrations and intros:
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
                  Other improvements in time will add more dynamic multimedia options and full
                  feature blog support, maybe even commenting. If you have ideas on the topics,
                  features and other improvements you'd love to see feel free to hop on our Discord
                  to let us know.
                </p>
                <p>
                  On behalf of the the entire Solid Core Team, thanks for reading and we look
                  forward to solid future.
                </p>
                <p>David</p>
              </article>
            </div>
          </Show>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
