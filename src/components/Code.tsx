import type { ParentProps } from "solid-js";
import styles from "./Code.module.css";

/** Inline code chip (Geist Mono). Use inside paragraphs. */
export function Code(props: ParentProps & { class?: string }) {
  return <code class={[styles.code, props.class]}>{props.children}</code>;
}
