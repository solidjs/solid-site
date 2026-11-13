import { For } from "solid-js";
import { absoluteUrl } from "../../site";
import { CopyButton } from "../CopyButton";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { logoPath, type LogoVariant } from "./assets";
import styles from "./LogoAsset.module.css";

/** One logo variant: preview tile on its intended surface, per-format downloads, copy-SVG-URL. */
export function LogoAsset(props: { variant: LogoVariant }) {
  const headingId = () => `logo-${props.variant.id}`;
  return (
    <article class={styles.card} aria-labelledby={headingId()}>
      <div class={[styles.preview, props.variant.surface === "dark" ? styles.dark : styles.light]}>
        <img
          class={styles.image}
          src={logoPath(props.variant.id, "SVG")}
          alt={`${props.variant.title} preview`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class={styles.body}>
        <h3 id={headingId()} class={styles.title}>{props.variant.title}</h3>
        <p class={styles.description}>{props.variant.description}</p>
        <div class={styles.downloads}>
          <For each={props.variant.formats} keyed={(f) => f}>
            {(format) => (
              <Link
                class={styles.download}
                href={logoPath(props.variant.id, format())}
                download={`solid-${props.variant.id}.${format().toLowerCase()}`}
                aria-label={`Download ${props.variant.title} as ${format()}`}
              >
                <Icon name="download" size={14} />
                {format()}
              </Link>
            )}
          </For>
          <CopyButton
            class={styles.copy}
            text={absoluteUrl(logoPath(props.variant.id, "SVG"))}
            label={`Copy SVG URL for ${props.variant.title}`}
          />
        </div>
      </div>
    </article>
  );
}
