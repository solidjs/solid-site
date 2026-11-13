import { CopyButton } from "../CopyButton";
import styles from "./CodeSample.module.css";

/** Plain code panel with a copy button (no highlighter: static, dependency-free). */
export function CodeSample(props: { code: string; label: string }) {
  return (
    <figure class={styles.figure}>
      <figcaption class={styles.caption}>
        <span>{props.label}</span>
        <CopyButton text={props.code} label={`Copy ${props.label}`} />
      </figcaption>
      <pre class={styles.pre} tabindex={0}><code>{props.code}</code></pre>
    </figure>
  );
}
