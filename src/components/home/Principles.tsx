import { For, Match, Switch } from "solid-js";
import { Card } from "../Card";
import { Section } from "../Section";
import { PRINCIPLES, type Principle } from "./data";
import styles from "./Principles.module.css";

function Chip(props: { text: string; strong?: boolean }) {
  return <span class={[styles.chip, { [styles.strong]: props.strong }]}>{props.text}</span>;
}

function Arrow() {
  return <span class={styles.arrow} aria-hidden="true">&rarr;</span>;
}

/** Tiny illustrative visuals built from chips; decorative, the card text carries the meaning. */
function Visual(props: { kind: Principle["visual"] }) {
  return (
    <div class={styles.visual} aria-hidden="true">
      <Switch>
        <Match when={props.kind === "reactivity"}>
          <Chip text="count()" strong />
          <Arrow />
          <Chip text="<span>5</span>" />
          <span class={styles.caption}>only this text node updates</span>
        </Match>
        <Match when={props.kind === "compiled"}>
          <Chip text="JSX" />
          <Arrow />
          <Chip text="compiler" strong />
          <Arrow />
          <Chip text="real DOM" />
        </Match>
        <Match when={props.kind === "async"}>
          <Chip text="createMemo(async)" strong />
          <Chip text="<Loading>" />
          <Chip text="<Errored>" />
          <Chip text="action()" />
        </Match>
        <Match when={props.kind === "familiar"}>
          <Chip text="JSX" />
          <Chip text="TypeScript" />
          <Chip text="Vite" />
          <Chip text="runs once" strong />
        </Match>
      </Switch>
    </div>
  );
}

export function Principles() {
  return (
    <Section
      id="principles"
      eyebrow="Principles"
      title="Built different, on purpose"
      description="Four ideas shape every part of Solid, from the compiler to the new async primitives in 2.0."
      size="wide"
    >
      <ol class={styles.grid}>
        <For each={PRINCIPLES} keyed={(p) => p.index}>
          {(p) => (
            <Card as="li" index={p().index} title={p().title} description={p().description} class={styles.card}>
              <Visual kind={p().visual} />
            </Card>
          )}
        </For>
      </ol>
    </Section>
  );
}
