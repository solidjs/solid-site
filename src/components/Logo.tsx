import { SITE_NAME } from "../site";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Show the "solid" wordmark (live text in the brand font) next to the icon (default true). */
  wordmark?: boolean;
  /** Rendered icon height in px (default 28). */
  height?: number;
  class?: string;
}

// Natural width / height of the icon files in /img/logos (cropped tight to the artwork).
const ICON_RATIO = 200.97 / 187.15;

/**
 * Solid logo: the icon from /img/logos plus the wordmark as text in Geist, so the type stays crisp at any size and
 * follows the page font. Per the brand README the sheen icon is for sizes above 24px and the flat icon for 24px and
 * under. The light and dark icons swap with <html data-theme> (CSS only, no flash). Both <img>s are lazy so the
 * display:none variant is never fetched.
 */
export function Logo(props: LogoProps) {
  const h = () => props.height ?? 28;
  const file = (theme: "light" | "dark") => `/img/logos/icon/solid-icon${h() > 24 ? "" : "-flat"}-${theme}.svg`;
  const common = () => ({ height: h(), width: Math.round(h() * ICON_RATIO), alt: "", loading: "lazy" as const, decoding: "async" as const });
  return (
    <span class={[styles.logo, props.class]} role="img" aria-label={SITE_NAME} style={{ "--logo-size": `${h()}px` }}>
      <span class={styles.icon} aria-hidden="true">
        <img class={styles.light} src={file("light")} {...common()} />
        <img class={styles.dark} src={file("dark")} {...common()} />
      </span>
      {props.wordmark === false ? null : <span class={styles.word} aria-hidden="true">solid</span>}
    </span>
  );
}
