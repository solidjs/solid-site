import { createSignal, onSettled } from "solid-js";
import { useI18n } from "../../i18n";
import { CopyButton } from "../CopyButton";
import styles from "./Swatch.module.css";

export interface SwatchProps {
  /** Semantic CSS custom property, e.g. "--color-brand". */
  token: string;
  name: string;
}

/**
 * Colour swatch. The chip is painted with var(token); the displayed/copyable value is the token's
 * resolved value read after settle (and again on theme change). Empty on the server ("—").
 */
export function Swatch(props: SwatchProps) {
  const { t } = useI18n();
  const [value, setValue] = createSignal("");

  onSettled(() => {
    const root = document.documentElement;
    const read = () => setValue(getComputedStyle(root).getPropertyValue(props.token).trim());
    read();
    // Re-read when the theme attribute changes (our script, or SolidBase's bootstrap).
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  });

  return (
    <li class={styles.swatch}>
      <div class={styles.chip} style={{ background: `var(${props.token})` }} role="img" aria-label={t("{name} colour swatch", { name: t(props.name) })} />
      <div class={styles.meta}>
        <span class={styles.name}>{t(props.name)}</span>
        <code class={styles.value}>{value() || "—"}</code>
        <span class={styles.token}>{props.token}</span>
      </div>
      {value() ? <CopyButton text={value()} label={t("Copy {name} value {value}", { name: t(props.name), value: value() })} /> : null}
    </li>
  );
}
