import type { JSX } from "@solidjs/web";
import { For } from "solid-js";
import { Section } from "../Section";
import { Separator } from "../Separator";
import { LiveStat } from "./Stats";
import styles from "./WhySolid.module.css";

type Accent = "brand" | "success" | "warning" | "info" | "accent";

/** One alternating row: coloured eyebrow, heading and copy on the left, a small visual on the right. */
function Highlight(props: { eyebrow: string; accent: Accent; title: string; children: JSX.Element; visual: JSX.Element }) {
  return (
    <article class={[styles.row, styles[props.accent]]}>
      <div class={styles.copy}>
        <p class={styles.eyebrow}>{props.eyebrow}</p>
        <h3 class={styles.title}>{props.title}</h3>
        <p class={styles.text}>{props.children}</p>
      </div>
      <div class={styles.visual}>{props.visual}</div>
    </article>
  );
}

/**
 * Node centres as percentages of the graph box. One table drives both the SVG connectors (viewBox 0-100, so the
 * numbers are the coordinates) and the HTML nodes (left/top), so they cannot drift apart. The x values leave room
 * for the widest node on a 360px phone.
 */
const CORE = { x: 50, y: 50 };
const NODES = {
  live: { x: 70, y: 22, label: "<span>{count()}</span>" },
  heading: { x: 22, y: 22, label: "<h1>Hello</h1>" },
  header: { x: 24, y: 80, label: "<Header />" },
  footer: { x: 76, y: 80, label: "<Footer />" },
} as const;
const at = (n: { x: number; y: number }) => ({ left: `${n.x}%`, top: `${n.y}%` });

/** Reactivity graph: one signal, one DOM node that reads it. Decorative: the row copy carries the meaning. */
function GraphVisual() {
  const line = (n: { x: number; y: number }, cls: string) => (
    <line class={cls} x1={CORE.x} y1={CORE.y} x2={n.x} y2={n.y} />
  );
  return (
    <div class={styles.graph} aria-hidden="true">
      <svg class={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
        {line(NODES.heading, styles.lineDim)}
        {line(NODES.header, styles.lineDim)}
        {line(NODES.footer, styles.lineDim)}
        {line(NODES.live, styles.lineLive)}
      </svg>
      <span class={[styles.node, styles.core]}>count()</span>
      <span class={[styles.node, styles.live]} style={at(NODES.live)}>{NODES.live.label}</span>
      <span class={[styles.node, styles.dim]} style={at(NODES.heading)}>{NODES.heading.label}</span>
      <span class={[styles.node, styles.dim]} style={at(NODES.header)}>{NODES.header.label}</span>
      <span class={[styles.node, styles.dim]} style={at(NODES.footer)}>{NODES.footer.label}</span>
      <span class={styles.legend} style={{ left: `${NODES.live.x + 2}%`, top: `${NODES.live.y + 14}%` }}>only this updates</span>
    </div>
  );
}

const ASYNC_ROWS = [
  { name: "user()", result: "suspends until ready" },
  { name: "isPending(user)", result: "boolean" },
  { name: "<Loading>", result: "first load shows fallback" },
  { name: "<Errored>", result: "a rejection shows fallback" },
] as const;

const EFFECT_STEPS = [
  { code: "() => count()", note: "compute: tracked reads" },
  { code: "(value) => { … }", note: "apply: untracked side effects" },
  { code: "return () => cleanup()", note: "runs before the next apply" },
] as const;

const ACTION_STEPS = [
  { code: "setTodos(list => …)", note: "optimistic write shows instantly" },
  { code: "yield api.add(todo)", note: "the request is in flight" },
  { code: "refresh(todos)", note: "reconcile with the server" },
  { code: "settled", note: "the guess gives way to server data" },
] as const;

export function WhySolid() {
  return (
    <Section
      id="why-solid"
      eyebrow="Why Solid"
      title="Why Solid 2.0?"
      description="A reactive core you can reason about, now with async, effects and mutations built into the graph."
      size="default"
    >
      <div class={styles.rows}>
        <Highlight eyebrow="No virtual DOM" accent="brand" title="Fine-grained reactivity" visual={<GraphVisual />}>
          Components run once. Signals update exactly the DOM nodes that read them, so there is no re-rendering and no
          diffing of component trees.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Async by design"
          accent="success"
          title="Async is part of the graph"
          visual={
            <dl class={styles.table}>
              <For each={ASYNC_ROWS} keyed={(r) => r.name}>
                {(row) => (
                  <div class={styles.tableRow}>
                    <dt class={styles.mono}>{row().name}</dt>
                    <dd class={[styles.mono, styles.result]}>{row().result}</dd>
                  </div>
                )}
              </For>
            </dl>
          }
        >
          In 2.0 a memo can return a promise. Reads suspend the nearest Loading boundary, errors reach Errored, and
          isPending() tells you when fresh data is on its way.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Explicit effects"
          accent="warning"
          title="Say what you track, then what you do"
          visual={
            <ol class={styles.flow}>
              <For each={EFFECT_STEPS} keyed={(s) => s.code}>
                {(step) => (
                  <li class={styles.flowStep}>
                    <code class={styles.mono}>{step().code}</code>
                    <span class={styles.note}>{step().note}</span>
                  </li>
                )}
              </For>
            </ol>
          }
        >
          Effects take two halves. The compute half reads signals and defines the dependencies; the apply half runs side
          effects untracked and can return a cleanup.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Safe mutations"
          accent="info"
          title="Optimistic updates, built in"
          visual={
            <ol class={styles.timeline}>
              <For each={ACTION_STEPS} keyed={(s) => s.code}>
                {(step) => (
                  <li class={styles.timelineStep}>
                    <code class={styles.mono}>{step().code}</code>
                    <span class={styles.note}>{step().note}</span>
                  </li>
                )}
              </For>
            </ol>
          }
        >
          Actions group a write, a request and a refresh into one transaction. The optimistic value shows right away and is
          replaced by server data when it settles.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Open source"
          accent="accent"
          title="Production-grade"
          visual={
            <div class={styles.metric}>
              <p class={styles.metricLabel}>npm downloads / week</p>
              <p class={styles.metricValue}><LiveStat stat="downloads" /></p>
              <p class={styles.metricRow}>
                <span><LiveStat stat="stars" /> GitHub stars</span>
                <span><LiveStat stat="contributors" /> contributors</span>
              </p>
            </div>
          }
        >
          MIT-licensed and maintained by a global community. These numbers are live from npm and GitHub.
        </Highlight>
      </div>
    </Section>
  );
}
