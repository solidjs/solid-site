import { useI18n } from "../../i18n";
import { CopyButton } from "../CopyButton";
import styles from "./CodeSample.module.css";

/** Plain code panel with a copy button (no highlighter: static, dependency-free). */
export function CodeSample(props: { code: string; label: string }) {
  const { t, tx } = useI18n();
  return (
    <figure class={styles.figure}>
      <figcaption class={styles.caption}>
        <span>{tx(props.label)}</span>
        <CopyButton text={props.code} label={t("Copy {label}", { label: t(props.label) })} />
      </figcaption>
      <pre class={styles.pre} tabindex={0}><code>{props.code}</code></pre>
    </figure>
  );
}
