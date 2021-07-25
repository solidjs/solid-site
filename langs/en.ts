
// English Translation

const locale = 'en-US';

const nav = [
  { title: 'Get Started', path: '/guide' },
  { title: 'Docs', path: '/docs/latest/api' },
  { title: 'Resources', path: '/resources' },
  { title: 'Tutorial', path: '/tutorial' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com', external: true },
  { title: 'Media', path: '/media' },
];

const home = {
  hero: 'A declarative, efficient and flexible JavaScript library for building user interfaces.',
  info: 'Solid is a purely reactive library. It was designed from the ground up with a reactive core. It\'s influenced by reactive principles developed by previous libraries.',
  strengths: [
    {
      icon: '/assets/performant.svg',
      label: 'Performant',
      description: 'Consistently tops recognized UI speed and memory utilization benchmarks.'
    },
    {
      icon: '/assets/powerful.svg',
      label: 'Powerful',
      description: 'Composable reactive primitives married with the flexibility of JSX.'
    },
    {
      icon: '/assets/pragmatic.svg',
      label: 'Pragmatic',
      description: 'A sensible and tailored API makes developing fun and simple.'
    },
    {
      icon: '/assets/productive.svg',
      label: 'Productive',
      description: 'Ergonomics and familiarity make building simple or complex things a breeze.'
    }
  ],
  facts: [
    {
      label: '6kb',
      detail: 'Minified + Gzipped',
      link: 'https://bundlephobia.com/package/solid-js@1.0.0'
    },
    {
      label: '9.5k+',
      detail: 'Github stars',
      link: 'https://star-history.t9t.io/#solidjs/solid'
    },
    {
      label: '5+ years',
      detail: 'In development'
    },
    {
      label: 'TypeScript',
      detail: 'Support'
    },
    {
      label: 'Top Rated',
      detail: 'In performance'
    },
    {
      label: 'Astro',
      detail: 'Support',
      link: 'https://github.com/snowpackjs/astro/tree/main/examples/framework-solid'
    }
  ],
  example: {
    headline: 'It\'s familiar and modern',
    copy: [
      "Solid stands on the shoulders of giants, particularly React and Knockout. If you've developed with React Hooks before Solid should seem very natural. In fact, more natural as Solid's model is much simpler with no Hook rules. Every Component executes once and it is the Hooks and bindings that execute many times as their dependencies update.",
      "Solid follows the same philosophy as React with unidirectional data flow, read/write segregation, and immutable interfaces. It just has a completely different implementation that forgoes using a Virtual DOM."
    ],
    link_label: 'View Docs',
    link: 'https://www.solidjs.com/docs/latest#component-apis'
  },
  reactivity: {
    headline: 'Fine-grained reactivity means you do more with less.',
    subheadline: 'Every part of Solid is built on simple primitives to the JavaScript expressions in your JSX views.',
    copy: 'This unlocks complete control over what gets updated and when, even at the DOM binding level. With no Virtual DOM or extensive diffing the framework never does more work than you want it to.',
    link_label: 'See it in action',
    link: 'https://playground.solidjs.com/?version=1.0.0#NobwRAdghgtgpmAXGGUCWEwBowBcCeADgsrgM4Ae2YZA9gK4BOAxiWGjIbY7gAQi9GcCABM4jXgF9eAM0a0YvAOR0ANmhEBaAFZkA9AHc4AIyUBuADoQOXHv17MhUXHADKaAObRVU2fMUqtOpauuZWVjL0EMy4aLQQvACChIQAFACU-Fa8DvFkfMBQMWgAbnBYvGRwuInFZQC6vAC8Dk4u7l5Qqqm4jPRw6ZYQ2YLVTAkAPCKlDqpQZGRNIEWxZRm8APy8FmArpXA7vIjbYDuSAHwAEmgTetMl51aS4RBCouKp603nvBPJhLw9OcKiJaMx6PAILgAHQeaoAUVUcEhuAAQvgAJIiVJKKApJTpdJWMCSepAA'
  },
  performance: {
    headline: [
      'Performance focused',
      'on both client and server'
    ],
    copy: "The strength of fine-grained reactivity as an approach shines on all notable benchmarks. While performance may not be your focus, the end-user's experience is always a concern. Think of Solid's performance gain as a free win without extra development complexity. It's about being fast without trying.",
    link_label: 'Read full article',
    link: 'https://ryansolid.medium.com/solidjs-the-tesla-of-javascript-ui-frameworks-6a1d379bc05e'
  },
  features: {
    headline: 'Fully loaded with all features.',
    copy: 'Solid supports all common and expected library features and expands on aspects to increase DX.',
    list: [
      'Fragments',
      'Portals',
      'Context',
      'Suspense',
      'Error Boundaries',
      'Lazy Components',
      'Async & Concurrent Rendering',
      'Implicit Delegation',
      'SSR & Hydration',
      'Directives',
    ],
  }
};

const benchmarks = {
  time: 'Time',
  link_label: 'The JS Framework Benchmark compares browser performance across a wide range of tests. Lower is better.',
  benchmarks: {
    js_benchmark: {
      title: 'JS Framework Benchmark',
      description: 'The JS Framework Benchmark compares browser performance across a wide range of tests. Lower is better.',
    },
    isomorophic_benchmark: {
      title: 'Isomorphic UI Benchmarks (Search Results)',
      description: 'This benchmark tests raw Server Rendering speeds. Higher is better.'
    }
  }
};

const docs = {
  title: 'Documentation'
};

const resources = {
  title: 'Resources',
  cta: 'To have your SolidJS related project listed here reach out to us on <a href="https://discord.com/invite/solidjs">Discord</a>.',
  search: 'Search resources',
  types: 'Types',
  types_list: {
    article: 'Article',
    video: 'Video',
    library: 'Library',
    package: 'Package',
  },
  categories: 'Categories',
  categories_list: {
    'primitive': 'Primitives',
    'router': 'Routers',
    'data': 'Data',
    'ui': 'UI',
    'plugin': 'Plugins',
    'starters': 'Starters',
    'build_utility': 'Build Utilities',
    'add_on': 'ADd On',
    'testing': 'Testing',
    'educational': 'Educational',
  },
  official: 'Official',
  by: 'By {{author}}'
};

const footer = {
  declaration: "Solid is an open-source project supported by a team of public contributors. It's distributed under an MIT license. This library and community are made possible by a core team and dedicated contributors.",
  updated: 'Last updated {{date}} on Solid v{{version}}',
};

const tutorial = {
  solve: 'Solve',
  reset: 'Reset'
};

const examples = {
  title: 'Example Library',
  basic: 'Basic',
  complex: 'Complex'
};

const media = {
  title: 'Media Assets',
  copy: 'The following are assets that represent the Solid brand. All assets are considered open-source contributions and should be used according to open standards and licensing rules. For additional assets or questions pertaining to brand alignment, feel free to join our Discord for support and guidance.',
  brand_font: 'Brand Font',
  primary: 'Primary Color',
  secondary: 'Secondary Color',
  light: 'Light Color',
  accent: 'Accent Color',
  resources: {
    with_wordmark: 'With Wordmark',
    without_wordmark: 'Without Wordmark',
    only_wordmark: 'Only Wordmark',
    dark_with_wordmark: 'Dark With Wordmark',
    dark_without_workdmark: 'Dark Without Wordmark',
    dark_only_wordmark: 'Only Dark Wordmark'
  }
};

const team = {
  title: 'Team & Contributions',
  core_team: 'Core Team',
  acknowledgments: 'Acknowledgments',
  ecosystem_team: 'Ecosystem Team',
  contributors: 'Contributors',
  open_collective: 'Open Collective'
};
