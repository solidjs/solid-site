import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";
import { Link } from "../components/Link";

export { Notice, Spotify, Tweet, Twitch, YouTube } from "../components/Embeds";

/** Markdown links: router-intercepted for internal paths, new tab for http(s), plain for #hash / mailto. */
export function a(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = () => (typeof props.href === "string" ? props.href : "");
  const plain = () => href().startsWith("#") || href().startsWith("mailto:");
  return plain() ? <a {...props} /> : <Link {...omit(props, "href", "class")} class={props.class} href={href()} />;
}

/** Markdown images: lazy + async decoding by default. */
export function img(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  return <img loading="lazy" decoding="async" {...props} />;
}

/** Wide tables scroll horizontally instead of breaking the layout. */
export function table(props: JSX.HTMLAttributes<HTMLTableElement>) {
  return (
    <div style={{ "overflow-x": "auto" }} tabindex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  );
}
