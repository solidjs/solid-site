import { SITE_NAME } from "../site";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Show the "solid" wordmark (live text in the brand font) next to the icon (default true). */
  wordmark?: boolean;
  /** Rendered icon height in px (default 28). */
  height?: number;
  /** Scales the wordmark relative to its default size, leaving the icon as is (default 1). */
  wordScale?: number;
  class?: string;
}

/** Brand icon files (public/img/logos/icon). Flat artwork, one per colour scheme, so it stays crisp at any size. */
const ICON_LIGHT = "/img/logos/icon/solid-icon-flat-light.svg";
const ICON_DARK = "/img/logos/icon/solid-icon-flat-dark.svg";
const ICON_RATIO = 200.97 / 187.15;

/**
 * Solid logo: the flat icon from the brand files (light artwork on light pages, dark artwork on dark pages, switched in
 * CSS from <html data-theme> so there is no flash) plus the wordmark as text in Geist.
 */
export function Logo(props: LogoProps) {
  const h = () => props.height ?? 28;
  return (
    <span class={[styles.logo, props.class]} role="img" aria-label={SITE_NAME} style={{ "--logo-size": `${h()}px`, "--logo-word-scale": props.wordScale ?? 1 }}>
      <img class={[styles.icon, styles.light]} src={ICON_LIGHT} width={Math.round(h() * ICON_RATIO)} height={Math.round(h())} alt="" decoding="async" />
      <img class={[styles.icon, styles.dark]} src={ICON_DARK} width={Math.round(h() * ICON_RATIO)} height={Math.round(h())} alt="" decoding="async" />
      {props.wordmark === false ? null : <span class={styles.word} aria-hidden="true">solid</span>}
    </span>
  );
}
