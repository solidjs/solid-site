import type { ParentProps } from "solid-js";
import "./tokens.css";
import "./global.css";

export default function Layout(props: ParentProps) {
  return <main>{props.children}</main>;
}
