import { dynamic, type JSX } from "@solidjs/web";
import { omit, type ParentProps } from "solid-js";
import styles from "./Container.module.css";

export interface ContainerProps extends ParentProps, Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Max width: narrow (44rem), prose (48rem), default (72rem), wide (84rem). */
  size?: "narrow" | "prose" | "default" | "wide";
  /** Element to render. Default div. */
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
}

/** Centered, gutter-padded content column. */
export function Container(props: ContainerProps) {
  const rest = omit(props, "size", "as", "class", "children");
  const Tag = dynamic(() => props.as ?? "div");
  return (
    <Tag {...(rest as object)} class={[styles.container, styles[props.size ?? "default"], props.class]}>
      {props.children}
    </Tag>
  );
}
