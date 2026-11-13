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

// Dates come from the announcement posts published on the previous solidjs.com blog.
const TIMELINE: TimelineEvent[] = [
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
    description: "The 2024 hackathon was announced.",
  },
];

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
      <Title>About | SolidJS</Title>
      <Meta name="description" content={DESCRIPTION} />
      <PageHeader
        eyebrow="About Solid"
        title="Simple, fine-grained reactivity for the web"
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
        id="solid-2"
        eyebrow="Solid 2.0"
        title="Solid 2.0 is on its way"
        description={`Solid 2.0 is currently a ${SOLID_2.status.toLowerCase()} (${SOLID_2.version}). APIs may still change before the stable release, so try it, but pin your versions.`}
        actions={
          <>
            <Badge tone="warning">{SOLID_2.status}</Badge>
            <Button href={SOLID_2.migrationGuide}>Migration guide</Button>
          </>
        }
      />

      <Section id="history" tone="subtle" eyebrow="History" title="Milestones from the Solid blog" description="Dates are taken from announcement posts on the previous Solid blog.">
        <Timeline events={TIMELINE} />
      </Section>

      <Section
        id="community"
        eyebrow="Governance and community"
        title="Built in the open"
        description="Solid is developed in public on GitHub by the Solid Core Team and contributors, and funded in part through OpenCollective. Everyone taking part is expected to follow the code of conduct."
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
