import { Component, For, Show } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const articles = [
  {
    link: 'https://medium.com/@ryansolid/solidjs-the-tesla-of-javascript-ui-frameworks-6a1d379bc05e',
    title: 'SolidJS: The Tesla of JavaScript Frameworks?',
    description: 'Tech built for Economy can be used for Performance.',
  },
  {
    link: 'https://indepth.dev/the-journey-to-isomorphic-rendering-performance',
    title: 'The Journey to Isomorphic JavaScript Performance',
    description: 'Finding the right SSR solution for Solid.',
  },
  {
    link: 'https://dev.to/ryansolid/why-i-m-not-a-fan-of-single-file-components-3bfl',
    title: 'Why I am not a fan of Single File Components',
    description: "Exploring the advantages of Solid's templates.",
  },
  {
    link: 'https://levelup.gitconnected.com/how-we-wrote-the-fastest-javascript-ui-framework-again-db097ddd99b6',
    title: 'How we wrote the Fastest JavaScript Framework, Again!',
    description: 'This time we conquered the server.',
  },
  {
    link: 'https://areknawo.com/solid-the-best-javascript-ui-library/',
    title: 'Solid - The best JavaScript UI library?',
    description: 'Highlights the qualities that make Solid a powerufl solution.',
  },
  {
    link: 'https://dev.to/lloyds-digital/comparing-reactivity-models-react-vs-vue-vs-svelte-vs-mobx-vs-solid-29m8',
    title: "Building Solid's reactive renderer from the ground up",
    description:
      "An in depth look at building Solid's reactive renderer, piece by piece, from the ground up.",
  },
  {
    link: 'https://dev.to/lloyds-digital/comparing-reactivity-models-react-vs-vue-vs-svelte-vs-mobx-vs-solid-29m8',
    title: 'Comparing reactivity models - React vs Vue vs Svelte vs MobX vs Solid vs Redux',
    description: 'Compares popular and well known frames.',
  },
  {
    link: 'https://areknawo.com/best-react-like-jsx-ui-libraries-in-2020/',
    title: 'Best React-like JSX UI Libraries in 2020',
    description: 'Presents 4 viable React alternatives.',
  },
  {
    link: 'https://indepth.dev/exploring-the-state-of-reactivity-patterns-in-2020/',
    title: 'Exploring Reactivity Patterns in 2020',
    description: "What's the latest trend in the frontend?",
  },
  {
    link: 'https://dev.to/ryansolid/why-solidjs-do-we-need-another-js-ui-library-1mdc',
    title: 'Why SolidJS: Do We Really Need Another JS UI Library',
    description: "Ryan's personal journey creating SolidJS.",
  },
  {
    link: 'https://dev.to/ryansolid/thinking-granular-how-is-solidjs-so-performant-4g37',
    title: 'Thinking Granular: How is SolidJS so Performant?',
    description: "An in-deph 12 minute read that explains Solid's methodology.",
  },
  {
    link: 'https://levelup.gitconnected.com/a-solid-realworld-demo-comparison-8c3363448fd8',
    title: 'A Solid RealWorld Demo Comparison of JavaScript Frameworks',
    description: 'How does Solid perform in a larger application?',
  },
  {
    link: 'https://levelup.gitconnected.com/designing-solidjs-abstraction-66d8c63fa7d1?source=friends_link&amp;sk=9cc520bbba3d97872a78081a8ab7b259',
    title: 'Designing SolidJS: Abstraction',
    description: 'Understanding both the power and cost of abstraction.',
  },
  {
    link: 'https://itnext.io/designing-solidjs-suspense-f4e92c625cb5?source=friends_link&amp;sk=f06f93d28632daba59048ed3d6d6b0a5',
    title: 'Designing SolidJS: Suspense',
    description: "React isn't the only library that stops time.",
  },
  {
    link: 'https://medium.com/@ryansolid/designing-solidjs-jsx-50ee2b791d4c?source=friends_link&amp;sk=ef3d7ada15b50a6b5b7f5aee2cb8f952',
    title: 'Designing SolidJS: JSX',
    description:
      'How is it that the syntax born of the Virtual DOM is also secretly the best syntax for Reactive UI libraries?',
  },
  {
    link: 'https://medium.com/javascript-in-plain-english/designing-solidjs-immutability-f1e46fe9f321?source=friends_link&amp;sk=912e32c63353ff0e084630bf3b63a8b1',
    title: 'Designing SolidJS: Immutability',
    description: 'Can Reactive State Management be both Immutable and also the most performant?',
  },
  {
    link: 'https://dev.to/atfzl/understanding-solid-jsx-584p',
    title: 'Understanding Solid: JSX',
  },
  {
    link: 'https://dev.to/atfzl/understanding-solid-reactivity-basics-39kk',
    title: 'Understanding Solid: Reactivity Basics',
  },
  {
    link: 'https://medium.com/@ryansolid/designing-solidjs-components-8f1ebb88d78b?source=friends_link&amp;sk=cac89d1679d8be2c7bf2b303fabd153c',
    title: 'Designing SolidJS: Components',
    description: 'Exploring Solid\'s "Vanishing" Components',
  },
  {
    link: 'https://medium.com/@ryansolid/designing-solidjs-reactivity-75180a4c74b4?source=friends_link&amp;sk=dbb9dd46a2e902c199ad3d5c7aeb1566',
    title: 'Designing SolidJS: Reactivity',
    description: 'Finding the right reactivity model for Solid.',
  },
  {
    link: 'https://medium.com/@ryansolid/designing-solidjs-dualities-69ee4c08aa03?source=friends_link&amp;sk=161ddd70db4fca50d6f33b6d53056d36',
    title: 'Designing SolidJS: Dualities',
    description: 'How exploring opposites can help us redefine the whole problem space.',
  },
  {
    link: 'https://medium.com/@ryansolid/how-we-wrote-the-fastest-javascript-ui-frameworks-a96f2636431e',
    title: 'How we wrote the Fastest JavaScript UI Frameworks',
    description: 'How Solid topped the JS Framework Benchmark.',
  },
  {
    link: 'https://levelup.gitconnected.com/finding-fine-grained-reactive-programming-89741994ddee?source=friends_link&amp;sk=31c66a70c1dce7dd5f3f4229423ad127',
    title: 'Finding Fine Grained Reactive Programming',
    description: "Introduction to the inner workings of Solid's Reactive system.",
  },
  {
    link: 'https://medium.com/better-programming/the-real-cost-of-ui-components-6d2da4aba205?source=friends_link&amp;sk=a412aa18825c8424870d72a556db2169',
    title: 'The Real Cost of UI Components',
    description: 'Comparison of the cost of Components in different UI Libraries.',
  },
  {
    link: 'https://medium.com/@ryansolid/the-fastest-way-to-render-the-dom-e3b226b15ca3?source=friends_link&amp;sk=5ae1688dde789e46cecf5c976e708da5',
    title: 'The Fastest Way to Render the DOM',
    description: 'Comparison of all Solid Renderers against the Fastest Libraries in the World.',
  },
  {
    link: 'https://medium.com/@ryansolid/javascript-ui-compilers-comparing-svelte-and-solid-cbcba2120cea',
    title: 'JavaScript UI Compilers: Comparing Svelte and Solid',
    description: 'A closer look at precompiled UI libraries',
  },
  {
    link: 'https://levelup.gitconnected.com/building-a-simple-javascript-app-with-solid-ff17c8836409',
    title: 'Building a Simple JavaScript App with Solid',
    description: 'Dissecting building TodoMVC with Solid.',
  },
  {
    link: 'https://levelup.gitconnected.com/solid-the-best-javascript-ui-library-youve-never-heard-of-297b22848ac1?source=friends_link&amp;sk=d61fc9352b4a98c6c9f5f6bd2077a722',
    title: 'Solid — The Best JavaScript UI Library You’ve Never Heard Of',
  },
  {
    link: 'https://medium.com/@ryansolid/what-every-javascript-framework-could-learn-from-react-1e2bbd9feb09?source=friends_link&amp;sk=75b3f6f90eecc7d210814baa2d5ab52c',
    title: 'What Every JavaScript Framework Could Learn from React',
    description: 'The lessons Solid learned from React.',
  },
  {
    link: 'https://medium.com/js-dojo/react-hooks-has-react-jumped-the-shark-c8cf04e246cf?source=friends_link&amp;sk=a5017cca813ea970b480cc44afb32034',
    title: 'React Hooks: Has React Jumped the Shark?',
    description: 'Comparison of React Hooks to Solid.',
  },
  {
    link: 'https://medium.com/@ryansolid/how-i-wrote-the-fastest-javascript-ui-framework-37525b42d6c9?source=friends_link&amp;sk=8eb9387a535a306d1eb96f7ce88c4db5',
    title: 'How I wrote the Fastest JavaScript UI Framework',
    description: "The key to Solid's performance.",
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-5-js-frameworks-in-2019-deb9c4d3e74',
    title: 'Part 5: JS Frameworks in 2019',
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-4-rendering-the-dom-753657689647',
    title: 'Part 4: Rendering the DOM',
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-3-change-management-in-javascript-frameworks-6af6e436f63c',
    title: 'Part 3: Change Management in JavaScript Frameworks',
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-2-web-components-as-containers-85e04a7d96e9',
    title: 'Part 2: Web Components as Containers',
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-1-writing-a-js-framework-in-2018-b02a41026929',
    title: 'Part 1: Writing a JS Framework in 2018',
  },
  {
    link: 'https://dev.to/ryansolid/jsx-is-not-hyperscript-61i',
    title: 'JSX is not HyperScript',
    description: 'Setting the story straight between JSX and HS.',
  },
  {
    link: 'https://dev.to/this-is-learning/learning-to-appreciate-react-server-components-49ka',
    title: 'Learning to Appreciate React Server Components',
    description: 'A deep dive into the evolution and future of React Server Components.',
  },
  {
    link: 'https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p',
    title: 'Building a Reactive Library from Scratch',
  },
  {
    link: 'https://dev.to/this-is-learning/is-0kb-of-javascript-in-your-future-48og',
    title: 'Is 0kb of JavaScript in your Future?',
    description: 'Thoughts on a 0kb JS world and various approaches.',
  },
  {
    link: 'https://dev.to/ryansolid/server-rendering-in-javascript-optimizing-performance-1jnk',
    title: 'Server Rendering in JavaScript: Optimizing Performance',
    description: 'Ryan discusses his learning process in topics of perf and optimization.',
  },
  {
    link: 'https://dev.to/this-is-learning/components-are-pure-overhead-hpm',
    title: 'Components are Pure Overhead',
    description: 'An analysis of components and the future of Component-Less.',
  },
  {
    link: 'https://dev.to/this-is-learning/two-years-of-writing-about-designing-javascript-frameworks-2018-2020-3ha5',
    title: 'Two Years of Writing about Designing JavaScript Frameworks (2018-2020)',
    description: 'Reflections on building Solid.',
  },
  {
    link: 'https://dev.to/this-is-learning/what-the-hell-is-reactive-programming-anyway-31p5',
    title: 'What the hell is Reactive Programming anyway?',
    description: 'A helpful walkthrough of reactivity.',
  },
  {
    link: 'https://dev.to/this-is-learning/5-places-solidjs-is-not-the-best-5019',
    title: '5 Places SolidJS is not the Best',
    description: 'A candid review of limitations and benefits of Solid.',
  },
  {
    link: 'https://dev.to/ryansolid/solid-update-march-2021-1jj6',
    title: 'Solid Update: March 2021',
    description: 'A Pre-1.0 release summary and description of the work completed to date.',
  },
];

const videos = [
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-1-writing-a-js-framework-in-2018-b02a41026929',
    title: 'Solid Video Series',
    description: 'Eric Schmucker walks you through Solid.',
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-1-writing-a-js-framework-in-2018-b02a41026929',
    title: 'Solid.js - A fast, Declarative, Compiled Web UI Library',
    description: "Zaieste Programming walks you through Solid's web UI solution.",
  },
  {
    link: 'https://www.youtube.com/watch?v=wu6HvLoi9VQ',
    title: 'How To Convert React Application To SolidJS',
    description: 'Maksim Ivanov walks us through Solid.js and how to use it.',
  },
  {
    link: 'https://www.youtube.com/watch?v=Dq5EAcup044',
    title: 'UI Libraries, Improving React.js & Music, with Ryan Carniato, Solid.js Creator',
    description: '',
  },
  {
    link: 'https://www.youtube.com/watch?v=P8iGK8zYzns',
    title: 'Solid.js - A Fast, Declarative, Compiled Web UI Library - Better than React.js?',
    description:
      'Zaiste Programming discusses three things that makes Solid.js and Snowpack great.',
  },
  {
    link: 'https://www.youtube.com/watch?v=p8e9ta269x8',
    title: 'React to Solid - Stream With Ryan Carniato',
    description:
      'Maksim Ivanov and Ryan Carniato take an existing React application and try to rewrite it using the Solid framework.',
  },
  {
    link: 'https://www.youtube.com/watch?v=-CymMzGwzP8',
    title: 'Looking at solid.js',
    description: "Looking at solid.js, a new library for reactive web UI's.",
  },
];

const ContentRow = (props) => (
  <li class="p-5 border-b hover:bg-gray-50">
    <a class="text-solid" target="_blank" href={props.link} rel="nofollow">
      <div class="text-lg">{props.title}</div>
      <Show when={props.description != ''}>
        <div class="text-sm mt-2 text-black block">{props.description}</div>
      </Show>
    </a>
  </li>
);

const Resources: Component = () => {
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Resources" />
      <div class="px-3 lg:px-12 container my-10 grid grid-cols-12 gap-10">
        <div class="col-span-7">
          <h1 class="text-2xl border-b border-solid-medium pb-3 my-5 text-solid-default">
            Latest Articles
          </h1>
          <ul class="ml-3">
            <For each={articles.reverse()}>{(article) => <ContentRow {...article} />}</For>
          </ul>
        </div>
        <div class="col-span-5">
          <h1 class="text-2xl border-b border-solid-medium pb-3 my-5 text-solid-default">Videos</h1>
          <ul class="ml-3 mb-10">
            <For each={videos}>{(video) => <ContentRow {...video} />}</For>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;
