import type { JSX } from "@solidjs/web";
import { Show } from "solid-js";
import { Container } from "./Container";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  eyebrow?: string;
  /** The page's single <h1>. */
  title: JSX.Element;
  description?: JSX.Element;
  /** Buttons rendered below the description. */
  actions?: JSX.Element;
  align?: "start" | "center";
  class?: string;
}

/** Hero block for inner pages: eyebrow, display-size h1, lead paragraph, actions. */
export function PageHeader(props: PageHeaderProps) {
  return (
    <header class={[styles.header, props.class]}>
      <Container size="narrow" class={[styles.inner, { [styles.start]: props.align === "start" }]}>
        <Show when={props.eyebrow}>
          <p class={styles.eyebrow}>{props.eyebrow}</p>
        </Show>
        <h1 class={styles.title}>{props.title}</h1>
        {/* Render the Show-provided value: reading props.x twice evaluates the JSX twice and desyncs hydration ids. */}
        <Show when={props.description}>
          {(d) => <p class={styles.description}>{d()}</p>}
        </Show>
        <Show when={props.actions}>
          {(a) => <div class={styles.actions}>{a()}</div>}
        </Show>
      </Container>
    </header>
  );
}
