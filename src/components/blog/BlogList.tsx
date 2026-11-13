import { createSignal, For, Show } from "solid-js";
import { allTags, posts } from "../../blog/posts";
import { ToggleGroup } from "../ToggleGroup";
import { PostCard } from "./PostCard";
import styles from "./BlogList.module.css";

/**
 * Featured latest post + filterable grid. SSR renders every post; filtering is a client-side signal,
 * so the prerendered HTML (and no-JS visitors) always get the full list.
 */
export function BlogList() {
  const [selected, setSelected] = createSignal<string[]>([]);
  const filtered = () => {
    const tags = selected();
    return tags.length ? posts.filter((p) => p.tags?.some((t) => tags.includes(t))) : posts;
  };
  const featured = () => (selected().length ? undefined : posts[0]);
  const rest = () => (selected().length ? filtered() : posts.slice(1));

  return (
    <>
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
        <For each={rest()} keyed={(p) => p.slug}>{(p) => <li><PostCard post={p()} /></li>}</For>
      </ul>
      <Show when={selected().length > 0 && filtered().length === 0}>
        <p class={styles.empty}>No posts match those tags.</p>
      </Show>
    </>
  );
}
