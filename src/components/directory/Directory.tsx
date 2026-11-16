import { useLocation } from "@solidjs/router";
import { createMemo, createSignal, For, Show, untrack } from "solid-js";
import { useI18n } from "../../i18n";
import { type PackageType, type Resource, type ResourceType, matches } from "../../ecosystem/types";
import { Badge } from "../Badge";
import { Icon, type IconName } from "../Icon";
import { ToggleGroup } from "../ToggleGroup";
import styles from "./Directory.module.css";

const TYPE_ICONS: Record<ResourceType | PackageType, IconName> = {
  article: "newspaper",
  video: "video",
  podcast: "mic",
  library: "code",
  package: "package",
};

export interface DirectoryProps {
  items: readonly Resource[];
  /** Filter chips: the values to offer, in order, with the English label of each. */
  filters: { by: "type" | "category"; options: { value: string; label: string }[] };
  /** Group the results under a heading per category (Ecosystem), or one flat list newest first (Resources). */
  grouped?: boolean;
  /** Show "Official" and "Hide unmaintained" switches (Ecosystem). */
  packageSwitches?: boolean;
  /** Accessible name of the filter group. */
  filterLabel: string;
  searchLabel: string;
}

function formatDate(ms: number, lang: string): string {
  return new Date(ms).toLocaleDateString(lang, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

function ResourceCard(props: { item: Resource }) {
  const { t, locale } = useI18n();
  return (
    <li class={styles.card}>
      <span class={styles.badge} aria-hidden="true">
        <Icon name={TYPE_ICONS[props.item.type]} size={20} />
      </span>
      <div class={styles.body}>
        <h3 class={styles.title}>
          <a class={styles.cardLink} href={props.item.link} target="_blank" rel="noopener noreferrer nofollow">
            {props.item.title}
            <span class="visually-hidden"> {t("(opens in a new tab)")}</span>
          </a>
        </h3>
        <Show when={props.item.description}>
          <p class={styles.description}>{props.item.description}</p>
        </Show>
        <p class={styles.meta}>
          <Show when={props.item.author}>
            {(author) => (
              <Show when={props.item.author_url} fallback={<span>{t("By {author}", { author: author() })}</span>}>
                {(url) => (
                  <a class={styles.author} href={url()} target="_blank" rel="noopener noreferrer nofollow">
                    {t("By {author}", { author: author() })}
                  </a>
                )}
              </Show>
            )}
          </Show>
          <Show when={props.item.published_at}>
            {(ms) => <span>{formatDate(ms(), locale().lang)}</span>}
          </Show>
        </p>
      </div>
      <div class={styles.flags}>
        <Show when={props.item.maintained === false}>
          <Badge tone="warning">Unmaintained</Badge>
        </Show>
        <Show when={props.item.official}>
          <Badge tone="brand">Official</Badge>
        </Show>
      </div>
    </li>
  );
}

/** Searchable, filterable list used by both the Ecosystem and Resources pages. */
export function Directory(props: DirectoryProps) {
  const { t, tx } = useI18n();
  const location = useLocation();

  // The search lives in the address bar (?search=) so a filtered view can be shared. Read once, then only written.
  const [query, setQuery] = createSignal(untrack(() => new URLSearchParams(location.search).get("search") ?? ""));
  const [selected, setSelected] = createSignal<string[]>([]);
  const [officialOnly, setOfficialOnly] = createSignal(false);
  const [hideUnmaintained, setHideUnmaintained] = createSignal(true);

  const onSearch = (value: string) => {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("search", value);
    else url.searchParams.delete("search");
    window.history.replaceState(window.history.state, "", url);
  };

  const keyOf = (r: Resource) => (props.filters.by === "type" ? [r.type as string] : [...r.categories]);

  // Everything except the chip selection, so each chip's count says how many results it would show.
  const base = createMemo(() =>
    props.items.filter(
      (r) =>
        matches(r, query()) &&
        (!props.packageSwitches || ((!officialOnly() || r.official) && (!hideUnmaintained() || r.maintained !== false))),
    ),
  );
  const counts = createMemo(() => {
    const out: Record<string, number> = {};
    for (const r of base()) for (const k of keyOf(r)) out[k] = (out[k] ?? 0) + 1;
    return out;
  });
  const visible = createMemo(() => {
    const chosen = selected();
    return base().filter((r) => !chosen.length || keyOf(r).some((k) => chosen.includes(k)));
  });
  const flat = createMemo(() => [...visible()].sort((a, b) => (b.published_at ?? 0) - (a.published_at ?? 0)));
  const groups = createMemo(() => {
    const out: { value: string; label: string; items: Resource[] }[] = [];
    for (const o of props.filters.options) {
      if (selected().length && !selected().includes(o.value)) continue;
      const items = visible().filter((r) => (r.categories as readonly string[]).includes(o.value));
      if (items.length) out.push({ ...o, items });
    }
    return out;
  });

  return (
    <div class={styles.directory}>
      <div class={styles.controls}>
        <label class={styles.search}>
          <Icon name="search" size={18} />
          <span class="visually-hidden">{tx(props.searchLabel)}</span>
          <input
            type="search"
            value={query()}
            placeholder={t(props.searchLabel)}
            onInput={(e) => onSearch(e.currentTarget.value)}
            autocomplete="off"
            spellcheck={false}
          />
        </label>
        <Show when={props.packageSwitches}>
          <div class={styles.switches}>
            <label>
              <input type="checkbox" checked={officialOnly()} onChange={(e) => setOfficialOnly(e.currentTarget.checked)} />
              {t("Official only")}
            </label>
            <label>
              <input type="checkbox" checked={hideUnmaintained()} onChange={(e) => setHideUnmaintained(e.currentTarget.checked)} />
              {t("Hide unmaintained")}
            </label>
          </div>
        </Show>
        <ToggleGroup
          class={styles.chips}
          label={props.filterLabel}
          value={selected()}
          onChange={setSelected}
          options={props.filters.options.map((o) => ({
            value: o.value,
            label: `${t(o.label)} ${counts()[o.value] ?? 0}`,
          }))}
        />
      </div>

      <p class={styles.status} role="status" aria-live="polite">
        {t("{count} results", { count: visible().length })}
      </p>

      <Show when={visible().length} fallback={<p class={styles.empty}>{t("No resources found.")}</p>}>
        <Show
          when={props.grouped}
          fallback={
            <ul class={styles.list}>
              <For each={flat()} keyed={(r) => r.link}>{(r) => <ResourceCard item={r()} />}</For>
            </ul>
          }
        >
          <For each={groups()} keyed={(g) => g.value}>
            {(g) => (
              <section class={styles.group} aria-labelledby={`cat-${g().value}`}>
                <h2 id={`cat-${g().value}`} class={styles.groupTitle}>{t(g().label)}</h2>
                <ul class={styles.grid}>
                  <For each={g().items} keyed={(r) => r.link}>{(r) => <ResourceCard item={r()} />}</For>
                </ul>
              </section>
            )}
          </For>
        </Show>
      </Show>
    </div>
  );
}
