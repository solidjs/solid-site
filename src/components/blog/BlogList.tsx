import { createSignal, For, Show } from "solid-js";
import { allTags, posts } from "../../blog/posts";
import { Icon } from "../Icon";
import { ToggleGroup } from "../ToggleGroup";
import { PostCard } from "./PostCard";
import styles from "./BlogList.module.css";

/** Posts with this tag are current; everything older sits under "Archived posts". */
const CURRENT_TAG = "Solid 2.0";
const isCurrent = (p: (typeof posts)[number]) => p.tags?.includes(CURRENT_TAG) ?? false;

/**
 * Featured latest post and a filterable grid of the current (Solid 2.0) posts, with older posts in a collapsed
 * "Archived posts" disclosure. SSR renders every post: the archive is a native <details>, so its posts are in the
 * HTML (crawlable, and a click works without JavaScript); filtering is a client-side signal. Choosing a tag filter
 * opens the archive so a match is never hidden.
 */
export function BlogList() {
  const [selected, setSelected] = createSignal<string[]>([]);
  const [archiveOpen, setArchiveOpen] = createSignal(false);
  const filtered = () => {
    const tags = selected();
    return tags.length ? posts.filter((p) => p.tags?.some((t) => tags.includes(t))) : posts;
  };
  const current = () => filtered().filter(isCurrent);
  const archived = () => filtered().filter((p) => !isCurrent(p));
  const featured = () => (selected().length ? undefined : current()[0]);
  const grid = () => (selected().length ? current() : current().slice(1));
  const open = () => archiveOpen() || selected().length > 0;

  return (
    <div class={styles.page}>
      <Show when={featured()}>{(p) => <PostCard post={p()} featured />}</Show>
      <div class={styles.filters}>
        <ToggleGroup
          label="Filter posts by tag"
          options={allTags.map((t) => ({ value: t, label: t }))}
          value={selected()}
          onChange={setSelected}
        />
        <p class={styles.status} role="status">
          {selected().length ? `${filtered().length} ${filtered().length === 1 ? "post" : "posts"}` : ""}
        </p>
      </div>
      <ul class={styles.grid}>
        <For each={grid()} keyed={(p) => p.slug}>{(p) => <li><PostCard post={p()} /></li>}</For>
      </ul>
      <Show when={archived().length > 0}>
        <details class={styles.archive} open={open()} onToggle={(e) => setArchiveOpen(e.currentTarget.open)}>
          <summary class={styles.archiveToggle}>
            <span>Archived posts ({archived().length})</span>
            <Icon name="chevron-down" size={16} class={styles.chevron} />
          </summary>
          <ul class={[styles.grid, styles.archiveGrid]}>
            <For each={archived()} keyed={(p) => p.slug}>{(p) => <li><PostCard post={p()} /></li>}</For>
          </ul>
        </details>
      </Show>
      <Show when={selected().length > 0 && filtered().length === 0}>
        <p class={styles.empty}>No posts match those tags.</p>
      </Show>
    </div>
  );
}
