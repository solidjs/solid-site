import type { JSX } from "@solidjs/web";
import { useI18n } from "../../i18n";
import { For } from "solid-js";
import { Section } from "../Section";
import { Separator } from "../Separator";
import { LiveStat } from "./Stats";
import styles from "./WhySolid.module.css";

type Accent = "brand" | "success" | "warning" | "info" | "accent";

/** One alternating row: coloured eyebrow, heading and copy on the left, a small visual on the right. */
function Highlight(props: { eyebrow: string; accent: Accent; title: string; children: JSX.Element; visual: JSX.Element }) {
  const { tx } = useI18n();
  return (
    <article class={[styles.row, styles[props.accent]]}>
      <div class={styles.copy}>
        <p class={styles.eyebrow}>{tx(props.eyebrow)}</p>
        <h3 class={styles.title}>{tx(props.title)}</h3>
        <p class={styles.text}>{tx(props.children)}</p>
      </div>
      <div class={styles.visual}>{props.visual}</div>
    </article>
  );
}

/**
 * One tree of components, drawn twice. When the count changes, a virtual DOM library re-renders the component that owns
 * it and everything below (every node flashes, top-down); Solid updates the single text node that reads the signal.
 * Positions are in a 180 x 150 viewBox; the flash animation lives in WhySolid.module.css.
 */
const TREE = [
  { id: "app", x: 90, y: 14 },
  { id: "header", x: 44, y: 52 },
  { id: "main", x: 136, y: 52 },
  { id: "counter", x: 104, y: 92 },
  { id: "list", x: 160, y: 92 },
  { id: "text", x: 104, y: 132 },
] as const;
const EDGES: [string, string][] = [["app", "header"], ["app", "main"], ["main", "counter"], ["main", "list"], ["counter", "text"]];
const NODE_W = 32;
const NODE_H = 16;
const point = (id: string) => TREE.find((n) => n.id === id)!;
/** Delay (seconds) before a node flashes in the virtual DOM tree: the update walks down from the root. */
const VDOM_DELAY: Record<string, number> = { app: 0, header: 0.18, main: 0.18, counter: 0.36, list: 0.36, text: 0.54 };

function TreeDiagram(props: { kind: "vdom" | "solid" }) {
  const flashes = (id: string) => props.kind === "vdom" || id === "text";
  return (
    <svg class={styles.tree} viewBox="0 0 180 150" aria-hidden="true">
      <For each={EDGES} keyed={(e) => e.join(">")}>
        {(e) => <line class={styles.edge} x1={point(e()[0]).x} y1={point(e()[0]).y} x2={point(e()[1]).x} y2={point(e()[1]).y} />}
      </For>
      <For each={TREE} keyed={(n) => n.id}>
        {(n) => (
          <rect
            class={[styles.treeNode, flashes(n().id) ? styles.flash : undefined, n().id === "text" ? styles.leaf : undefined]}
            x={n().x - NODE_W / 2}
            y={n().y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
            rx="4"
            style={{ "animation-delay": `${props.kind === "vdom" ? VDOM_DELAY[n().id] : 0}s` }}
          />
        )}
      </For>
    </svg>
  );
}

/** Before and after: the same update, drawn as a virtual DOM re-render and as Solid's single-node update. */
function UpdateVisual() {
  const { t } = useI18n();
  return (
    <div class={styles.compare} aria-hidden="true">
      <figure class={styles.panel}>
        <TreeDiagram kind="vdom" />
        <figcaption>
          <strong>{t("Virtual DOM")}</strong>
          <span>{t("re-renders the component tree")}</span>
        </figcaption>
      </figure>
      <figure class={[styles.panel, styles.solidPanel]}>
        <TreeDiagram kind="solid" />
        <figcaption>
          <strong>Solid</strong>
          <span>{t("updates one DOM node")}</span>
        </figcaption>
      </figure>
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
  const { t } = useI18n();
  return (
    <Section
      id="why-solid"
      eyebrow="Why Solid"
      title="Why Solid 2.0?"
      description="A reactive core you can reason about, now with async, effects and mutations built into the graph."
      size="default"
    >
      <div class={styles.rows}>
        <Highlight eyebrow="No virtual DOM" accent="brand" title="Fine-grained reactivity" visual={<UpdateVisual />}>
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
                    <dd class={[styles.mono, styles.result]}>{t(row().result)}</dd>
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
                    <span class={styles.note}>{t(step().note)}</span>
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
                    <span class={styles.note}>{t(step().note)}</span>
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
              <p class={styles.metricLabel}>{t("npm downloads / week")}</p>
              <p class={styles.metricValue}><LiveStat stat="downloads" /></p>
              <p class={styles.metricRow}>
                <span><LiveStat stat="stars" /> {t("GitHub stars")}</span>
                <span><LiveStat stat="contributors" /> {t("contributors")}</span>
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
