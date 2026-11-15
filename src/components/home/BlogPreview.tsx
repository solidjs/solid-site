import { For, Show } from "solid-js";
import { postPath, posts } from "../../blog/posts";
import { useI18n } from "../../i18n";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Link } from "../Link";
import { Section } from "../Section";
import styles from "./BlogPreview.module.css";

const latest = posts.slice(0, 3);

export function BlogPreview() {
  const { t, fmtDate, localePath } = useI18n();
  return (
    <Section
      id="blog"
      tone="subtle"
      eyebrow="Blog"
      title="Latest from the blog"
      description="Releases, roadmaps and community news from the Solid team."
      size="wide"
    >
      <ul class={styles.grid}>
        <For each={latest} keyed={(p) => p.slug}>
          {(p) => (
            <li class={styles.card}>
              <div class={styles.media} aria-hidden="true">
                <Show when={p().image}>
                  <img src={p().image} alt="" loading="lazy" decoding="async" width="640" height="360" />
                </Show>
              </div>
              <div class={styles.body}>
                <div class={styles.meta}>
                  <time datetime={p().date}>{fmtDate(p().date)}</time>
                  <Show when={p().tags?.[0]}>
                    <Badge>{p().tags![0]}</Badge>
                  </Show>
                </div>
                <h3 class={styles.title}>
                  <Link href={postPath(p().slug)} class={styles.link}>{p().title}</Link>
                </h3>
                <p class={styles.desc}>{p().description}</p>
              </div>
            </li>
          )}
        </For>
      </ul>
      <div class={styles.more}>
        <Button href="/blog" iconAfter="arrow-right">View all posts</Button>
      </div>
    </Section>
  );
}
