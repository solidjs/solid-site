import { createUniqueId, Show } from "solid-js";
import { SITE_NAME } from "../site";
import styles from "./Logo.module.css";

export interface LogoProps {
  /** Show the "solid" wordmark (live text in the brand font) next to the icon (default true). */
  wordmark?: boolean;
  /** Rendered icon height in px (default 28). */
  height?: number;
  class?: string;
}

// Artwork of /img/logos/icon (viewBox 200.97 x 187.15): the two "top" pieces and the two "front" pieces.
const TOP_BACK = "M200.972 39.4325C200.972 39.4325 133.981 -9.6248 82.1586 1.69612L78.3667 2.954C70.7829 5.46976 64.463 9.2434 60.6711 14.2749L58.1432 18.0486L39.1836 50.7535L72.0468 57.0429C85.9505 65.848 103.646 69.6217 120.078 65.848L178.22 77.1689L200.972 39.4325Z";
const FRONT_BACK = "M60.6725 39.4325L55.6166 40.6904C34.1291 46.9798 27.8093 67.1059 39.185 84.7163C51.8247 101.069 78.3681 109.874 99.8556 103.584L178.222 77.169C178.222 77.169 111.231 28.1116 60.6725 39.4325Z";
const TOP_FRONT = "M164.316 96.0372C157.24 87.239 147.685 80.7432 136.876 77.3818C126.068 74.0203 114.497 73.9462 103.646 77.1689L25.2794 102.327L0 146.352L141.565 170.252L166.844 124.968C171.9 116.163 170.636 106.1 164.316 96.0372Z";
const FRONT_FRONT = "M139.037 141.108C131.96 132.309 122.406 125.814 111.597 122.452C100.788 119.091 89.2174 119.017 78.3662 122.239L0 147.397C0 147.397 66.9904 197.712 118.813 185.133L122.605 183.876C144.093 177.586 151.676 157.46 139.037 141.108Z";
const ICON_RATIO = 200.97 / 187.15;

/**
 * Solid logo: the icon drawn inline (so it is rasterised at the page's own scale and recoloured by the theme tokens,
 * with no image to decode or swap) plus the wordmark as text in Geist. Per the brand README the sheen icon is for sizes
 * above 24px and the flat icon for 24px and under.
 */
export function Logo(props: LogoProps) {
  const h = () => props.height ?? 28;
  const sheen = () => h() > 24;
  const id = createUniqueId();
  return (
    <span class={[styles.logo, props.class]} role="img" aria-label={SITE_NAME} style={{ "--logo-size": `${h()}px` }}>
      <svg class={styles.icon} viewBox="0 0 200.97 187.15" width={h() * ICON_RATIO} height={h()} aria-hidden="true" shape-rendering="geometricPrecision">
        <Show when={sheen()}>
          <defs>
            <linearGradient id={`${id}-a`} gradientUnits="userSpaceOnUse" x1="69.7992" y1="15.8502" x2="191.203" y2="65.7034">
              <stop style={{ "stop-color": "var(--logo-sheen-from)" }} />
              <stop offset="1" style={{ "stop-color": "var(--logo-sheen-to)" }} />
            </linearGradient>
            <linearGradient id={`${id}-b`} gradientUnits="userSpaceOnUse" x1="161.665" y1="65.8232" x2="-0.983195" y2="133.997">
              <stop style={{ "stop-color": "var(--logo-sheen-to)" }} />
              <stop offset="1" style={{ "stop-color": "var(--logo-sheen-from)" }} />
            </linearGradient>
          </defs>
        </Show>
        <path d={TOP_BACK} fill={sheen() ? `url(#${id}-a)` : "var(--logo-top)"} />
        <path d={FRONT_BACK} fill="var(--color-logo-text)" />
        <path d={TOP_FRONT} fill={sheen() ? `url(#${id}-b)` : "var(--logo-top)"} />
        <path d={FRONT_FRONT} fill="var(--color-logo-text)" />
      </svg>
      {props.wordmark === false ? null : <span class={styles.word} aria-hidden="true">solid</span>}
    </span>
  );
}
