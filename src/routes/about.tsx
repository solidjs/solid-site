import { Meta, Title } from "@solidjs/meta";
import { For } from "solid-js";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CodeSample } from "../components/about/CodeSample";
import styles from "../components/about/About.module.css";
import { Timeline, type TimelineEvent } from "../components/about/Timeline";
import { Container } from "../components/Container";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { SOLID_2, URLS } from "../site";

const DESCRIPTION =
  "What Solid is, where it came from, how fine-grained reactivity works, and how the project is run.";

const PRINCIPLES = [
  {
    icon: "zap",
    title: "Fine-grained reactivity",
    description:
      "Signals track exactly which part of the UI depends on which value. An update runs only the code that reads it, with no component re-rendering and no virtual DOM diffing.",
  },
  {
    icon: "code",
    title: "Compiled, not interpreted",
    description:
      "JSX is compiled ahead of time to direct DOM operations. Components run once to set up the graph; after that, the work is in the bindings.",
  },
  {
    icon: "layers",
    title: "Small and fast",
    description:
      "A small runtime and consistently strong results on public benchmarks, because there is little between a state change and the DOM node it affects.",
  },
] as const;

// Dates come from the project's announcement posts (the State of Solid editions and the individual announcements), the first
// commit in the solidjs/solid repository, the creation date of the Discord server, and Ryan's own posts about joining
// Netlify and Sentry.
const TIMELINE: TimelineEvent[] = [
  {
    label: "Apr 2018",
    iso: "2018-04",
    title: "The first commit",
    description: "Ryan Carniato makes the first commit to the solidjs/solid repository, \"open source repo\", and Solid goes public.",
  },
  {
    label: "15 Jun 2020",
    iso: "2020-06-15",
    title: "The official Discord opens",
    description: "The SolidJS Discord server is created, giving the growing community a home for questions, help and discussion.",
  },
  {
    label: "2021",
    iso: "2021",
    title: "Solid 1.0",
    description: "The 1.0 release, referred to in the September 2021 State of Solid post as having landed in the months before it.",
  },
  {
    label: "30 Sep 2021",
    iso: "2021-09-30",
    title: "The State of Solid begins",
    description: "The first edition of a regular outline of updates across the project, community and ecosystem.",
  },
  {
    label: "30 Sep 2021",
    iso: "2021-09-30",
    title: "Netlify becomes a deployment partner",
    description: "Netlify joined as an official Deployment Partner and sponsor, contributing $500 a month through OpenCollective.",
  },
  {
    label: "31 Dec 2021",
    iso: "2021-12-31",
    title: "First SolidHack announced",
    description: "The first public open-source hackathon was announced for January, with three months to build and $9,000+ in prizes.",
  },
  {
    label: "7 Jan 2022",
    iso: "2022-01-07",
    title: "SolidHack 2022",
    description: "Solid's first hackathon opened with community voting. Sponsors including Stytch, Builder.io, ClearSpend and 402, plus private donors, grew the prize pool to US$12,000.",
  },
  {
    label: "1 Apr 2022",
    iso: "2022-04-01",
    title: "Vercel and <div>riots sponsor Solid",
    description: "Both pledged $100 a month to the project's OpenCollective, and GitHub stars passed 16,000.",
  },
  {
    label: "23 May 2022",
    iso: "2022-05-23",
    title: "Ryan Carniato joins Netlify",
    description: "Solid's creator joined Netlify's open-source team as a principal engineer, with Netlify supporting him to work on Solid full-time. Netlify had already been backing the project financially since 2021.",
  },
  {
    label: "31 Jul 2022",
    iso: "2022-07-31",
    title: "JetBrains sponsorship and 20k stars",
    description: "JetBrains pledged $500 a month. Funds go toward domains, events and meetups, and other community initiatives. Solid also passed 20,000 GitHub stars.",
  },
  {
    label: "31 Jul 2022",
    iso: "2022-07-31",
    title: "The Solid Store launches",
    description: "Official merchandise went on sale, with profit going straight to the project's OpenCollective.",
  },
  {
    label: "19 Sep 2022",
    iso: "2022-09-19",
    title: "Solid Fellowships announced",
    description: "A programme funded through OpenCollective giving community members fixed-term, Core-supervised project work.",
  },
  {
    label: "9 Nov 2022",
    iso: "2022-11-09",
    title: "SolidStart beta",
    description: "The official beta announcement of the SolidStart meta-framework.",
  },
  {
    label: "12 Jul 2023",
    iso: "2023-07-12",
    title: "Chrome Aurora support",
    description: "Chrome's Aurora programme announced $30,000 toward Solid's performance research.",
  },
  {
    label: "21 May 2024",
    iso: "2024-05-21",
    title: "SolidStart 1.0",
    description: "Official 1.0 release announcement for SolidStart.",
  },
  {
    label: "3 Sep 2024",
    iso: "2024-09-03",
    title: "SolidHack 2024",
    description: "The 2024 hackathon was announced, sponsored by Netlify and Sentry.",
  },
  {
    label: "3 Sep 2024",
    iso: "2024-09-03",
    title: "Ryan Carniato joins Sentry",
    description: "Ryan moved from Netlify to Sentry, which supports his continued full-time work on Solid and open source as the project heads toward 2.0.",
  },
  {
    label: "13 Aug 2026",
    iso: "2026-08-13",
    title: "Solid 2.0 release candidate",
    description: "Solid 2.0 reaches release candidate: async becomes part of the reactive graph itself, and a new Rust compiler built on Oxc ships by default.",
  },
  {
    label: "13 Aug 2026",
    iso: "2026-08-13",
    title: "SolidStart becomes legacy",
    description: "Server functions, the serving layer and file-system routing had all moved into core, so SolidStart was retired in favour of start mode, merging the framework and the library. SolidStart keeps receiving maintenance releases.",
  },
  {
    label: "2026",
    iso: "2026",
    title: "Solid 2.0",
    description: "Solid 2.0 ships with first-class async, split effects and draft-first stores.",
  },
];

const PIONEERED = [
  {
    icon: "zap",
    title: "Signals as the UI primitive",
    description:
      "Signals were not new: Knockout, S.js and MobX used the idea long before. Solid made createSignal the foundation of a whole UI framework and helped bring it to the mainstream. Preact, Angular, Qwik, Vue and Svelte now build on signals or similar primitives, and a TC39 proposal is exploring standardising them.",
  },
  {
    icon: "target",
    title: "Fine-grained reactive rendering",
    description:
      "Solid compiles JSX into direct DOM operations, each wired to the exact signals it reads. A change updates a single text node or attribute, with no virtual tree to build and diff and no component to re-render.",
  },
  {
    icon: "code",
    title: "Components that run once",
    description:
      "A component function runs a single time to build the reactive graph. It is a setup function, not a render function, which removes whole classes of problems such as stale closures and dependency arrays.",
  },
  {
    icon: "layers",
    title: "Advanced features without a virtual DOM",
    description:
      "Suspense, concurrent rendering and streaming server rendering were seen as the territory of virtual DOM frameworks. Solid delivered them on a fine-grained graph, and its stores update nested state through proxies without re-rendering.",
  },
  {
    icon: "server",
    title: "Server functions",
    description:
      "SolidStart made server functions a core idea: write code that runs on the server and call it from the client like any other function, with the network hop handled for you. Similar approaches have since appeared in React, Svelte and other frameworks.",
  },
  {
    icon: "sparkles",
    title: "Async as part of the graph",
    description:
      "Solid 2.0 goes further. Async memos, split effects and draft-first stores with optimistic actions make loading and mutation part of the reactive graph, so data fetching, pending states and optimistic UI use the same primitives as everything else.",
  },
] as const;

const PERFORMANCE = [
  {
    icon: "zap",
    title: "At the top of the benchmarks",
    description:
      "Solid has consistently ranked at or near the top of the JS Framework Benchmark, the community's public comparison of UI libraries, staying close to hand-written vanilla JavaScript.",
  },
  {
    icon: "star",
    title: "Loved by developers",
    description:
      "Solid was the top-rated framework for developer satisfaction in the 2021 State of JS survey, ahead of far larger frameworks, with adoption growing quickly since.",
  },
  {
    icon: "newspaper",
    title: "Performance research, funded by Chrome",
    description:
      "The Chrome team's Aurora programme contributed $30,000 toward Solid's continued performance research, supporting work that improves Core Web Vitals in open-source projects.",
  },
  {
    icon: "sparkles",
    title: "The industry caught up",
    description:
      "Others followed. Preact introduced signals, Vue is building Vapor Mode, a compilation strategy without a virtual DOM, Svelte 5 moved to signal-based runes, and Angular added signals and zoneless change detection.",
  },
] as const;

const SNIPPET = `import { createSignal, createMemo } from "solid-js";
import { render } from "@solidjs/web";

function Counter() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);

  // Runs once. Only the two text bindings below re-run on change.
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {count()} x 2 = {doubled()}
    </button>
  );
}

render(() => <Counter />, document.getElementById("app")!);`;

export default function About() {
  return (
    <>
      <Title>About | Solid</Title>
      <Meta name="description" content={DESCRIPTION} />
      <PageHeader
        eyebrow="About Solid"
        title={<>Simple, fine-grained, <span class={styles.mark}>asynchronous</span> reactivity for the web</>}
        description="Solid is an open-source JavaScript library for building user interfaces. It is built and maintained by a community of contributors under the MIT licence."
        actions={
          <>
            <Button href={URLS.docs} variant="primary" iconAfter="arrow-right">Read the docs</Button>
            <Button href={URLS.tutorial}>Take the tutorial</Button>
          </>
        }
      />

      <Section id="philosophy" eyebrow="Philosophy" title="Three ideas that shape Solid">
        <ul class={styles.cards} role="list">
          <For each={PRINCIPLES} keyed={(p) => p.title}>
            {(p, i) => (
              <Card as="li" level={3} index={`0${i() + 1}`} icon={p().icon} title={p().title} description={p().description} />
            )}
          </For>
        </ul>
      </Section>

      <Section
        id="how-it-works"
        tone="subtle"
        eyebrow="How it works"
        title="Components run once"
        description="Reactive values are signals. Reading one inside JSX or a memo subscribes that exact spot, so updates skip straight to the DOM."
      >
        <Container size="prose">
          <CodeSample label="Counter.tsx (Solid 2.0)" code={SNIPPET} />
        </Container>
      </Section>

      <Section
        id="pioneers"
        eyebrow="Influence"
        title="Ideas Solid helped pioneer"
        description="Solid did not invent every idea it uses, but it has been one of the main places where fine-grained reactivity grew up and spread to the rest of the web."
      >
        <ul class={[styles.cards, styles.cardsThree]} role="list">
          <For each={PIONEERED} keyed={(p) => p.title}>
            {(p, i) => (
              <Card as="li" level={3} index={`0${i() + 1}`} icon={p().icon} title={p().title} description={p().description} />
            )}
          </For>
        </ul>
      </Section>

      <Section
        id="performance"
        tone="subtle"
        eyebrow="Performance"
        title="Known for speed, and the industry took notice"
        description="Solid became known for performance because there is so little between a state change and the DOM node it affects. Those results pushed other frameworks to rethink how they update the page."
      >
        <ul class={styles.cards} role="list">
          <For each={PERFORMANCE} keyed={(p) => p.title}>
            {(p, i) => (
              <Card as="li" level={3} index={`0${i() + 1}`} icon={p().icon} title={p().title} description={p().description} />
            )}
          </For>
        </ul>
      </Section>

      <Section
        id="solid-2"
        eyebrow="Solid 2.0"
        title="Solid 2.0 is live"
        description={`Solid ${SOLID_2.version} is out. It adds first-class async, split effects and draft-first stores. Coming from 1.x? The migration guide covers what changed.`}
        actions={
          <>
            <Badge tone="success">Live</Badge>
            <Button href={SOLID_2.migrationGuide}>Migration guide</Button>
          </>
        }
      />

      <Section id="history" tone="subtle" eyebrow="History" title="Milestones of the project" description="Releases, funding, sponsors and hackathons along the way. Dates come from the project's announcement posts.">
        <Timeline events={TIMELINE} />
      </Section>

      <Section
        id="community"
        eyebrow="Governance and community"
        title="Built in the open"
        description="Solid is developed in public on GitHub by the Solid maintainers and contributors, and funded in part through OpenCollective. Everyone taking part is expected to follow the code of conduct."
        actions={
          <>
            <Button href="/team" icon="users">Team and contributors</Button>
            <Button href="/code-of-conduct" icon="shield">Code of conduct</Button>
            <Button href={URLS.opencollective} icon="heart">OpenCollective</Button>
          </>
        }
      />

      <Section id="join" tone="subtle" title="Get started" description="Learn it, ask questions, or read the source.">
        <div class={styles.cta}>
          <Button href={URLS.docs} variant="primary" icon="book">Docs</Button>
          <Button href={URLS.tutorial} icon="graduation-cap">Tutorial</Button>
          <Button href={URLS.discord} icon="discord">Discord</Button>
          <Button href={URLS.github} icon="github">GitHub</Button>
        </div>
      </Section>
    </>
  );
}
