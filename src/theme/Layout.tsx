import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { Link, Meta } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { For, Show } from "solid-js";
import { DEFAULT_LOCALE, LOCALES, stripLocale, useI18n, withLocale } from "../i18n";
import { absoluteUrl } from "../site";
import { OG_SIZE, ogImageAlt, ogImagePath } from "../og/pages";
import { installScrollGuard } from "../components/scrollGuard";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { Header } from "../components/Header";
import "./tokens.css";
import "./global.css";
import styles from "./Layout.module.css";

/** Rendered by SolidBaseRoot around every route. */
export default function Layout(props: ParentProps) {
  installScrollGuard();
  const location = useLocation();
  const { locale, t } = useI18n();
  // Cards and alt text are keyed by the English route; every locale of a page shares its card.
  const barePath = () => stripLocale(location.pathname);
  // Trailing slash stripped except for "/" so it matches the sitemap; the prerendered 404s (SolidBase renders them at <dir>/__solidbase_404__) are never canonical.
  const canonical = () => absoluteUrl(location.pathname.length > 1 ? location.pathname.replace(/\/+$/, "") : "/");
  // Blog posts are English only. A /fr/blog/<slug> page is the English text, so it is not a French alternate: it is
  // canonicalised to the English URL and kept out of the index, and posts carry no hreflang set.
  const isPost = () => /^\/blog\/[^/]+\/?$/.test(barePath());
  const englishCopy = () => isPost() && locale().code !== DEFAULT_LOCALE.code;
  const canonicalUrl = () => (englishCopy() ? absoluteUrl(barePath().replace(/\/+$/, "")) : canonical());
  // Rendered at build time by scripts/generate-og.ts (@solidjs/ogp); routes without a card get the default.
  const image = () => absoluteUrl(ogImagePath(barePath()));
  return (
    <>
      <Show when={!location.pathname.endsWith("/__solidbase_404__")}>
        <Link rel="canonical" href={canonicalUrl()} />
        <Meta property="og:url" content={canonicalUrl()} />
        <Meta property="og:type" content="website" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Show when={englishCopy()}>
          <Meta name="robots" content="noindex, follow" />
        </Show>
        <Meta property="og:locale" content={locale().ogLocale} />
        {/* Open Graph lists the other languages a page exists in. */}
        <Show when={!isPost()}>
          <For each={LOCALES.filter((l) => l.code !== locale().code)} keyed={(l) => l.code}>
            {(l) => <Meta property="og:locale:alternate" content={l().ogLocale} />}
          </For>
        </Show>
        {/* Every language of this page, plus the default for visitors whose language is not offered. */}
        <Show when={LOCALES.length > 1 && !isPost()}>
          <For each={LOCALES} keyed={(l) => l.code}>
            {(l) => <Link key={`alternate-${l().lang}`} rel="alternate" hreflang={l().lang} href={absoluteUrl(withLocale(barePath(), l().code))} />}
          </For>
          <Link key="alternate-x-default" rel="alternate" hreflang="x-default" href={absoluteUrl(withLocale(barePath(), DEFAULT_LOCALE.code))} />
        </Show>
        <Meta property="og:image" content={image()} />
        <Meta property="og:image:type" content="image/png" />
        <Meta property="og:image:width" content={String(OG_SIZE.width)} />
        <Meta property="og:image:height" content={String(OG_SIZE.height)} />
        <Meta property="og:image:alt" content={ogImageAlt(barePath())} />
        <Meta name="twitter:image" content={image()} />
        <Meta name="twitter:image:alt" content={ogImageAlt(barePath())} />
      </Show>
      <Seo />
      <a href="#main-content" class={styles.skip}>{t("Skip to main content")}</a>
      <Header />
      <main id="main-content" tabindex={-1} class={styles.main}>
        {props.children}
      </main>
      <Footer />
    </>
  );
}
