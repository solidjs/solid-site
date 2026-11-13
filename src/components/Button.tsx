import { Button as KButton } from "@kobalte/core/button";
import type { JSX } from "@solidjs/web";
import { omit, type ParentProps } from "solid-js";
import { isExternalHref } from "../site";
import { Icon, type IconName } from "./Icon";
import { Link } from "./Link";
import styles from "./Button.module.css";

export interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Leading icon. */
  icon?: IconName;
  /** Trailing icon (external links get an arrow automatically unless set). */
  iconAfter?: IconName;
  class?: string;
  /** Stretch to container width. */
  block?: boolean;
}
export type ButtonProps = ButtonBaseProps &
  ParentProps &
  (
    | ({ href: string; external?: boolean } & Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "class" | "children">)
    | ({ href?: undefined } & Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class" | "children">)
  );

/**
 * Button styled as primary / secondary / ghost. With `href` it renders a Kobalte Link (`<a>`,
 * external links open in a new tab); without it, a Kobalte Button (`<button type="button">`).
 */
export function Button(props: ButtonProps) {
  const cls = () => [
    styles.button,
    styles[props.variant ?? "secondary"],
    styles[props.size ?? "md"],
    props.block ? styles.block : undefined,
    props.class,
  ];
  const own = ["variant", "size", "icon", "iconAfter", "class", "block"] as const;
  const anchorRest = () => omit(props as ButtonBaseProps & { href: string }, ...own);
  const buttonRest = () => omit(props as ButtonBaseProps & JSX.ButtonHTMLAttributes<HTMLButtonElement>, ...own);
  const inner = () => (
    <>
      {props.icon ? <Icon name={props.icon} size={18} /> : null}
      <span>{props.children}</span>
      {props.iconAfter ? <Icon name={props.iconAfter} size={18} /> : null}
    </>
  );
  // Wrapped in a fragment so the href check is a tracked JSX expression, not a top-level read.
  return <>{props.href !== undefined ? (
    <Link
      {...(anchorRest() as { href: string })}
      class={cls()}
      showExternalIcon={false}
    >
      {inner()}
      {isExternalHref(props.href) && !props.iconAfter ? <Icon name="arrow-up-right" size={16} /> : null}
    </Link>
  ) : (
    <KButton type="button" {...(buttonRest() as object)} class={cls()}>
      {inner()}
    </KButton>
  )}</>;
}
