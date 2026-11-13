import { SITE_NAME } from "../site";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Show the wordmark next to the glyph (default true). */
  wordmark?: boolean;
  /** Rendered height in px (default 28). */
  height?: number;
  class?: string;
}

/** Solid logo from /img/logo; the light and dark variants swap with <html data-theme> (CSS only, no flash). Both <img>s are lazy so the display:none variant is never fetched. */
export function Logo(props: LogoProps) {
  const dir = () => (props.wordmark === false ? "without-wordmark" : "with-wordmark");
  const ratio = () => (props.wordmark === false ? 1.12 : 5.4);
  const h = () => props.height ?? 28;
  const common = () => ({ height: h(), width: Math.round(h() * ratio()), alt: "", loading: "lazy" as const, decoding: "async" as const });
  return (
    <span class={[styles.logo, props.class]} role="img" aria-label={SITE_NAME} style={{ height: `${h()}px` }}>
      <img class={styles.light} src={`/img/logo/${dir()}/logo.svg`} {...common()} />
      <img class={styles.dark} src={`/img/logo/dark-${dir()}/logo.svg`} {...common()} />
    </span>
  );
}
