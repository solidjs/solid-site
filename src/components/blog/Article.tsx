import { Meta } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { For, Show, type ParentProps } from "solid-js";
import { getAdjacent, getPost, postPath, type Post } from "../../blog/posts";
import { DEFAULT_LOCALE, useI18n } from "../../i18n";
import { absoluteUrl } from "../../site";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Container } from "../Container";
import { Notice } from "../Embeds";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Separator } from "../Separator";
import { PostMeta } from "./PostMeta";
import styles from "./Article.module.css";

const slugOf = (pathname: string) => pathname.replace(/\/+$/, "").split("/").pop() ?? "";

function ShareLinks(props: { post: Post }) {
  const { t } = useI18n();
  const url = () => encodeURIComponent(absoluteUrl(postPath(props.post.slug)));
  const text = () => encodeURIComponent(props.post.title);
  return (
    <div class={styles.share}>
      <span class={styles.shareLabel}>{t("Share")}</span>
      <Link external class={styles.shareLink} href={`https://x.com/intent/post?text=${text()}&url=${url()}`}>
        <Icon name="x" size={16} /> X
      </Link>
      <Link external class={styles.shareLink} href={`https://bsky.app/intent/compose?text=${text()}%20${url()}`}>
        <Icon name="bluesky" size={16} /> Bluesky
      </Link>
      <Link external class={styles.shareLink} href={`https://www.reddit.com/submit?url=${url()}&title=${text()}`}>
        <Icon name="reddit" size={16} /> Reddit
      </Link>
    </div>
  );
}

function Adjacent(props: { post: Post }) {
  const { t, localePath } = useI18n();
  const adj = () => getAdjacent(props.post.slug);
  return (
    <nav class={styles.adjacent} aria-label={t("More posts")}>
      <Show when={adj().newer} fallback={<span />}>
        {(p) => (
          <a class={styles.adjLink} href={localePath(postPath(p().slug))} rel="prev">
            <span class={styles.adjLabel}><Icon name="arrow-right" size={14} class={styles.flip} /> {t("Newer")}</span>
            <span class={styles.adjTitle}>{p().title}</span>
          </a>
        )}
      </Show>
      <Show when={adj().older} fallback={<span />}>
        {(p) => (
          <a class={[styles.adjLink, styles.next]} href={localePath(postPath(p().slug))} rel="next">
            <span class={styles.adjLabel}>{t("Older")} <Icon name="arrow-right" size={14} /></span>
            <span class={styles.adjTitle}>{p().title}</span>
          </a>
        )}
      </Show>
    </nav>
  );
}

/**
 * Wraps an article body (used from each blog .mdx; leave blank lines around the markdown inside).
 * Renders header, hero, prose, share links, prev/next and back link from src/blog/posts.ts.
 * The <title>/description come from the mdx frontmatter via SolidBase.
 */
export function Article(props: ParentProps) {
  const location = useLocation();
  const { t, locale } = useI18n();
  const post = () => getPost(slugOf(location.pathname));
  return (
    <Show when={post()}>
      {(p) => (
        <article class={styles.article}>
          <Show when={p().draft}>
            <Meta name="robots" content="noindex, nofollow" />
          </Show>
          <Meta property="og:type" content="article" />
          {/* Full ISO 8601 timestamps, as the Open Graph article spec asks. */}
          <Meta property="article:published_time" content={`${p().date}T00:00:00Z`} />
          <Meta property="article:modified_time" content={`${p().modified ?? p().date}T00:00:00Z`} />
          <Meta property="article:author" content={p().authorUrl ?? p().author} />
          <Meta name="author" content={p().author} />
          <For each={p().tags ?? []} keyed={(tag) => tag}>
            {(tag) => <Meta property="article:tag" content={tag()} />}
          </For>

          <header class={styles.header}>
            <Container size="prose">
              <Link href="/blog" class={styles.back}>
                <Icon name="arrow-right" size={14} class={styles.flip} /> {t("Back to blog")}
              </Link>
              <Show when={p().draft}>
                <Badge tone="warning">{t("Draft: not published")}</Badge>
              </Show>
              <h1 class={styles.title}>{p().title}</h1>
              <p class={styles.lead}>{p().description}</p>
              <PostMeta post={p()} linkAuthor />
            </Container>
            <Show when={p().image}>
              <Container size="default">
                <img class={styles.hero} src={p().image} alt="" width="1200" height="675" decoding="async" />
              </Container>
            </Show>
          </header>

          <Container size="prose">
            <Show when={locale().code !== DEFAULT_LOCALE.code}>
              <Notice type="info">{t("This article is only available in English.")}</Notice>
            </Show>
            <div class="prose">{props.children}</div>

            <Separator class={styles.sep} />
            <footer class={styles.footer}>
              <Show when={p().tags?.length}>
                <ul class={styles.tags} aria-label={t("Tags")}>
                  <For each={p().tags}>{(t) => <li><Badge>{t}</Badge></li>}</For>
                </ul>
              </Show>
              <ShareLinks post={p()} />
            </footer>
            <Adjacent post={p()} />
            <div class={styles.all}>
              <Button href="/blog" icon="newspaper">All posts</Button>
            </div>
          </Container>
        </article>
      )}
    </Show>
  );
}
