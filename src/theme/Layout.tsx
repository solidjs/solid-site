import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { Link, Meta } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { Show } from "solid-js";
import { absoluteUrl } from "../site";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./tokens.css";
import "./global.css";
import styles from "./Layout.module.css";

/** Rendered by SolidBaseRoot around every route. */
export default function Layout(props: ParentProps) {
  const location = useLocation();
  // Trailing slash stripped except for "/" so it matches the sitemap; the prerendered 404 (SolidBase pathname) is never canonical.
  const canonical = () => absoluteUrl(location.pathname.length > 1 ? location.pathname.replace(/\/+$/, "") : "/");
  return (
    <>
      <Show when={location.pathname !== "/__solidbase_404__"}>
        <Link rel="canonical" href={canonical()} />
        <Meta property="og:url" content={canonical()} />
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
