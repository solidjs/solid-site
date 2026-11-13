import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { Link, Meta } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { Show } from "solid-js";
import { absoluteUrl } from "../site";
import { OG_SIZE, ogImageAlt, ogImagePath } from "../og/pages";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./tokens.css";
import "./global.css";
import styles from "./Layout.module.css";

/** Rendered by SolidBaseRoot around every route. */
export default function Layout(props: ParentProps) {
  const location = useLocation();
  // Trailing slash stripped except for "/" so it matches the sitemap; the prerendered 404s (SolidBase renders them at <dir>/__solidbase_404__) are never canonical.
  const canonical = () => absoluteUrl(location.pathname.length > 1 ? location.pathname.replace(/\/+$/, "") : "/");
  // Rendered at build time by scripts/generate-og.ts (@solidjs/ogp); routes without a card get the default.
  const image = () => absoluteUrl(ogImagePath(location.pathname));
  return (
    <>
      <Show when={!location.pathname.endsWith("/__solidbase_404__")}>
        <Link rel="canonical" href={canonical()} />
        <Meta property="og:url" content={canonical()} />
        <Meta property="og:image" content={image()} />
        <Meta property="og:image:type" content="image/png" />
        <Meta property="og:image:width" content={String(OG_SIZE.width)} />
        <Meta property="og:image:height" content={String(OG_SIZE.height)} />
        <Meta property="og:image:alt" content={ogImageAlt(location.pathname)} />
        <Meta name="twitter:image" content={image()} />
        <Meta name="twitter:image:alt" content={ogImageAlt(location.pathname)} />
      </Show>
      <a href="#main-content" class={styles.skip}>Skip to main content</a>
      <Header />
      <main id="main-content" tabindex={-1} class={styles.main}>
        {props.children}
      </main>
      <Footer />
    </>
  );
}
