import { Link as KLink } from "@kobalte/core/link";
import type { JSX } from "@solidjs/web";
import { omit } from "solid-js";
import { useI18n } from "../i18n";
import { isExternalHref } from "../site";
import { Icon } from "./Icon";
import styles from "./Link.module.css";

export interface LinkProps extends Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  /** Force external behaviour. Defaults to true for absolute http(s) URLs. */
  external?: boolean;
  /** Marks the link as the current page (aria-current). */
  current?: boolean;
  /** Render a trailing external-link glyph for external links. */
  showExternalIcon?: boolean;
  /** Underlined inline link styling (for prose / body copy). */
  inline?: boolean;
}

/**
 * Kobalte Link. Internal paths are plain anchors: the router 2.0 link plugin intercepts the click
 * and navigates client-side (there is no `A` component). External URLs open in a new tab.
 */
export function Link(props: LinkProps) {
  const { t, localePath } = useI18n();
  const isExternal = () => props.external ?? isExternalHref(props.href);
  const href = () => (isExternal() ? props.href : localePath(props.href));
  const rest = omit(props, "href", "external", "current", "showExternalIcon", "inline", "class", "children", "target", "rel");
  return (
    <KLink
      {...rest}
      href={href()}
      class={[styles.link, { [styles.inline]: props.inline }, props.class]}
      current={props.current}
      target={isExternal() ? "_blank" : props.target}
      rel={isExternal() ? "noopener noreferrer" : props.rel}
    >
      {props.children}
      {isExternal() && props.showExternalIcon ? (
        <>
          <Icon name="arrow-up-right" size={14} class={styles.ext} />
          <span class="visually-hidden"> {t("(opens in a new tab)")}</span>
        </>
      ) : null}
    </KLink>
  );
}

/** Link that always opens in a new tab and shows the external glyph. */
export function ExternalLink(props: Omit<LinkProps, "external">) {
  return <Link showExternalIcon {...props} external />;
}
