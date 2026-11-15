import { SITE_NAME } from "../site";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Show the "solid" wordmark (live text in the brand font) next to the icon (default true). */
  wordmark?: boolean;
  /** Rendered icon height in px (default 28). */
  height?: number;
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
  // The icon is a detailed mark: below ~40px a standard-density (1x) screen has too few pixels for its curved edges,
  // which then read as jagged next to the text. Draw it larger than the text is tall.
  const icon = () => Math.round(h() * 1.25);
  return (
    <span class={[styles.logo, props.class]} role="img" aria-label={SITE_NAME} style={{ "--logo-size": `${h()}px` }}>
      <img class={[styles.icon, styles.light]} src={ICON_LIGHT} width={Math.round(icon() * ICON_RATIO)} height={icon()} alt="" decoding="async" />
      <img class={[styles.icon, styles.dark]} src={ICON_DARK} width={Math.round(icon() * ICON_RATIO)} height={icon()} alt="" decoding="async" />
      {props.wordmark === false ? null : <span class={styles.word} aria-hidden="true">solid</span>}
    </span>
  );
}
