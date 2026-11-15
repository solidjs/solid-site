import type { JSX } from "@solidjs/web";
import { Show, type ParentProps } from "solid-js";
import { useI18n } from "../i18n";
import { Container, type ContainerProps } from "./Container";
import styles from "./Section.module.css";

export interface SectionProps extends ParentProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title?: JSX.Element;
  description?: JSX.Element;
  /** Buttons / links rendered under the description. */
  actions?: JSX.Element;
  /** Alignment of the heading block. Default "center". */
  align?: "start" | "center";
  /** Subtle background band. */
  tone?: "default" | "subtle";
  size?: ContainerProps["size"];
  /** id for anchor links; also used for aria-labelledby on the heading. */
  id?: string;
  class?: string;
}

/** Page section with an optional eyebrow / title / description / actions header, then children. */
export function Section(props: SectionProps) {
  const { tx } = useI18n();
  const headingId = () => (props.id ? `${props.id}-title` : undefined);
  return (
    <section
      id={props.id}
      aria-labelledby={props.title ? headingId() : undefined}
      class={[styles.section, { [styles.subtle]: props.tone === "subtle" }, props.class]}
    >
      <Container size={props.size}>
        <Show when={props.title || props.eyebrow || props.description}>
          <header class={[styles.header, { [styles.start]: props.align === "start" }]}>
            <Show when={props.eyebrow}>
              <p class={styles.eyebrow}>{tx(props.eyebrow)}</p>
            </Show>
            <Show when={props.title}>
              {(t) => <h2 id={headingId()} class={styles.title}>{tx(t())}</h2>}
            </Show>
            <Show when={props.description}>
              {(d) => <p class={styles.description}>{tx(d())}</p>}
            </Show>
            {/* Show's accessor avoids evaluating the JSX prop twice (that desyncs hydration ids). */}
            <Show when={props.actions}>
              {(a) => <div class={styles.actions}>{a()}</div>}
            </Show>
          </header>
        </Show>
        {props.children}
      </Container>
    </section>
  );
}
