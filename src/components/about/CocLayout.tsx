import type { ParentProps } from "solid-js";
import { For } from "solid-js";
import { Container } from "../Container";
import styles from "./CocLayout.module.css";

export interface TocItem {
  id: string;
  label: string;
  /** Nest under the previous top-level item. */
  child?: boolean;
}

/** Article layout with a sticky "On this page" nav (wide screens) beside the prose column. */
export function CocLayout(props: ParentProps<{ toc: TocItem[] }>) {
  return (
    <Container class={styles.wrap}>
      <nav class={styles.toc} aria-label="On this page">
        <p class={styles.tocTitle}>On this page</p>
        <ul class={styles.list} role="list">
          <For each={props.toc} keyed={(i) => i.id}>
            {(item) => (
              <li class={item().child ? styles.child : undefined}>
                <a class={styles.link} href={`#${item().id}`}>{item().label}</a>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <article class={["prose", styles.article]}>{props.children}</article>
    </Container>
  );
}
