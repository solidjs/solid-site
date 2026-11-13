import { For, Show } from "solid-js";
import { postPath, type Post } from "../../blog/posts";
import { Badge } from "../Badge";
import { PostMeta } from "./PostMeta";
import styles from "./PostCard.module.css";

export interface PostCardProps {
  post: Post;
  /** Larger horizontal layout for the latest post. */
  featured?: boolean;
}

/** Blog card: the whole card is clickable through the title link's stretched ::after. */
export function PostCard(props: PostCardProps) {
  return (
    <article class={[styles.card, { [styles.featured]: props.featured }]}>
      <Show when={props.post.image}>
        {/* Decorative: the title link carries the accessible name. Fixed ratio avoids layout shift. */}
        <div class={styles.media}>
          <img
            src={props.post.image}
            alt=""
            width="1200"
            height="675"
            loading={props.featured ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      </Show>
      <div class={styles.body}>
        <Show when={props.featured}>
          <Badge tone="brand">Latest</Badge>
        </Show>
        <h3 class={styles.title}>
          <a href={postPath(props.post.slug)} class={styles.link}>{props.post.title}</a>
        </h3>
        <p class={styles.description}>{props.post.description}</p>
        <PostMeta post={props.post} />
        <Show when={props.post.tags?.length}>
          <ul class={styles.tags} aria-label="Tags">
            <For each={props.post.tags}>{(t) => <li><Badge>{t}</Badge></li>}</For>
          </ul>
        </Show>
      </div>
    </article>
  );
}
