import { SITE_NAME } from "../site";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Show the wordmark next to the icon (default true). Use the icon alone below a 16px icon. */
  wordmark?: boolean;
  /** Rendered height in px (default 28). The icon fills the full height of every file. */
  height?: number;
  class?: string;
}

// Natural width / height of the files in /img/logos (cropped tight to the artwork).
const RATIO = { lockup: 465.12 / 146.28, icon: 200.97 / 187.15 };

/**
 * Solid logo from /img/logos. Per the brand README the sheen versions are for icons above 24px and the flat versions
 * for 24px and under. The light and dark variants swap with <html data-theme> (CSS only, no flash). Both <img>s are
 * lazy so the display:none variant is never fetched.
 */
export function Logo(props: LogoProps) {
  const h = () => props.height ?? 28;
  const kind = () => (props.wordmark === false ? "icon" : "lockup");
  const file = (theme: "light" | "dark") =>
    `/img/logos/${kind()}/solid-${kind()}${h() > 24 ? "" : "-flat"}-${theme}.svg`;
  const common = () => ({ height: h(), width: Math.round(h() * RATIO[kind()]), alt: "", loading: "lazy" as const, decoding: "async" as const });
  return (
    <span class={[styles.logo, props.class]} role="img" aria-label={SITE_NAME} style={{ height: `${h()}px` }}>
      <img class={styles.light} src={file("light")} {...common()} />
      <img class={styles.dark} src={file("dark")} {...common()} />
    </span>
  );
}
