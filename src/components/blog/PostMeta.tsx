import { Show } from "solid-js";
import { formatDate, type Post } from "../../blog/posts";
import { Link } from "../Link";
import styles from "./PostMeta.module.css";

/** Author, date and reading time line shared by cards and article headers. */
export function PostMeta(props: { post: Post; linkAuthor?: boolean }) {
  return (
    <p class={styles.meta}>
      <span>
        <Show when={props.linkAuthor && props.post.authorUrl} fallback={props.post.author}>
          <Link href={props.post.authorUrl!} class={styles.author}>{props.post.author}</Link>
        </Show>
      </span>
      <span aria-hidden="true" class={styles.dot}>·</span>
      <time datetime={props.post.date}>{formatDate(props.post.date)}</time>
      <Show when={props.post.readingMinutes}>
        <span aria-hidden="true" class={styles.dot}>·</span>
        <span>{props.post.readingMinutes} min read</span>
      </Show>
    </p>
  );
}
