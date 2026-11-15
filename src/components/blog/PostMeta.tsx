import { Show } from "solid-js";
import { type Post } from "../../blog/posts";
import { useI18n } from "../../i18n";
import { Link } from "../Link";
import styles from "./PostMeta.module.css";

/** Author, date and reading time line shared by cards and article headers. */
export function PostMeta(props: { post: Post; linkAuthor?: boolean }) {
  const { t, fmtDate } = useI18n();
  return (
    <p class={styles.meta}>
      <span>
        <Show when={props.linkAuthor && props.post.authorUrl} fallback={t(props.post.author)}>
          <Link href={props.post.authorUrl!} class={styles.author}>{t(props.post.author)}</Link>
        </Show>
      </span>
      <span aria-hidden="true" class={styles.dot}>·</span>
      <time datetime={props.post.date}>{fmtDate(props.post.date)}</time>
      <Show when={props.post.readingMinutes}>
        <span aria-hidden="true" class={styles.dot}>·</span>
        <span>{t("{n} min read", { n: props.post.readingMinutes! })}</span>
      </Show>
    </p>
  );
}
