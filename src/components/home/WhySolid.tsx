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
  { name: "user()", result: "the value, never undefined" },
  { name: "isPending(user)", result: "true while a refresh is in flight" },
  { name: "<Loading>", result: "fallback on first load only" },
  { name: "<Errored>", result: "catches a rejection" },
] as const;

const TRANSITION_STEPS = [
  { code: "setTab(\"posts\")", note: "the input changes" },
  { code: "isPending(() => posts())", note: "ask where the design needs it" },
  { code: "latest(tab)", note: "the newest value, mid-flight" },
  { code: "settled", note: "the new answer lands whole" },
] as const;

const ACTION_STEPS = [
  { code: "setTodos(list => …)", note: "optimistic write shows instantly" },
  { code: "yield api.add(todo)", note: "the request is in flight" },
  { code: "refresh(todos)", note: "reconcile with the server" },
  { code: "settled", note: "the guess gives way to server data" },
] as const;

const SERVER_STEPS = [
  { code: "\"use server\"", note: "typed RPC, no codegen" },
  { code: "await getUser(id)", note: "in-process during SSR" },
  { code: "live(messages)", note: "an async generator stays current" },
  { code: "broadcast(room)", note: "every viewer gets the same answer" },
] as const;

export function WhySolid() {
  const { t } = useI18n();
  return (
    <Section
      id="why-solid"
      eyebrow="Why Solid"
      title="Why Solid 2.0?"
      description="Signals, with async, transitions and mutations in the same graph."
      size="default"
    >
      <div class={styles.rows}>
        <Highlight eyebrow="No virtual DOM" accent="brand" title="Fine-grained reactivity" visual={<UpdateVisual />}>
          Components run once. There are no re-renders, no memoization and no dependency arrays: signals update exactly
          the DOM nodes that read them, down to a single text node.
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
          A memo that returns a promise is still just a value: no loading flags, no cache keys and no undefined in your
          types. Fetch where you like, block where the design wants, and the components in between never know.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Transitions built in"
          accent="warning"
          title="The UI never shows half an update"
          visual={
            <ol class={styles.flow}>
              <For each={TRANSITION_STEPS} keyed={(s) => s.code}>
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
          There is no transition API to learn. The old content holds until the new answer is ready to land whole, and
          isPending and latest are questions you ask exactly where the design needs them.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Safe mutations"
          accent="info"
          title="Optimistic UI you already wrote"
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
          Wrap a mutation in an action and the draft write you would make in a client-only app becomes the optimistic
          prediction. No snapshots and no rollback code: when the server settles, the guess discards itself, success or
          failure.
        </Highlight>

        <Separator />

        <Highlight
          eyebrow="Full stack"
          accent="brand"
          title="Server functions, refined"
          visual={
            <ol class={styles.flow}>
              <For each={SERVER_STEPS} keyed={(s) => s.code}>
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
          Solid pioneered server functions in 2021, and 2.0 ships the refined form. Mark a function "use server" and call it
          like any other. Return an async generator and it is real-time: live() keeps the value current in the reactive
          graph, and broadcast() gives every viewer the same answer when it changes.
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
          MIT licensed and used in production. These numbers come live from npm and GitHub.
        </Highlight>
      </div>
    </Section>
  );
}
