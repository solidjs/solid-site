import { Errored, For, Loading, createMemo, createSignal, onSettled } from "solid-js";
import { URLS } from "../../site";
import { STATS_FALLBACK, type Stats } from "./data";
import styles from "./Stats.module.css";

const TIMEOUT_MS = 4000;

const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const format = (n: number | null) => (n === null ? "—" : compact.format(n));

async function getJson(url: string): Promise<{ json: unknown; headers: Headers }> {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(String(res.status));
  return { json: await res.json(), headers: res.headers };
}

/** Never throws: any failed or slow request keeps the static fallback for that number. */
async function fetchStats(): Promise<Stats> {
  const [repo, npm, contributors] = await Promise.allSettled([
    getJson("https://api.github.com/repos/solidjs/solid"),
    getJson("https://api.npmjs.org/downloads/point/last-week/solid-js"),
    getJson("https://api.github.com/repos/solidjs/solid/contributors?per_page=1&anon=false"),
  ]);
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  const lastPage = (h: Headers) => {
    const m = h.get("link")?.match(/[?&]page=(\d+)>;\s*rel="last"/);
    return m ? Number(m[1]) : null;
  };
  return {
    stars: repo.status === "fulfilled" ? num((repo.value.json as { stargazers_count?: unknown }).stargazers_count) ?? STATS_FALLBACK.stars : STATS_FALLBACK.stars,
    downloads: npm.status === "fulfilled" ? num((npm.value.json as { downloads?: unknown }).downloads) ?? STATS_FALLBACK.downloads : STATS_FALLBACK.downloads,
    contributors: contributors.status === "fulfilled" ? lastPage(contributors.value.headers) ?? STATS_FALLBACK.contributors : STATS_FALLBACK.contributors,
  };
}

/** One request per page load: the hero stats and the "Why Solid" numbers share it (GitHub allows 60 unauthenticated calls/hour). */
let cached: Promise<Stats> | undefined;
const getStats = () => (cached ??= fetchStats());

function StatList(props: { values: Stats }) {
  const items = () => [
    { label: "GitHub stars", value: props.values.stars, href: URLS.githubRepo },
    { label: "npm downloads / week", value: props.values.downloads, href: URLS.npm },
    { label: "Contributors", value: props.values.contributors, href: "/team" },
  ];
  return (
    <dl class={styles.list}>
      <For each={items()} keyed={(i) => i.label}>
        {(item) => (
          <div class={styles.item}>
            <dt class={styles.label}><a href={item().href}>{item().label}</a></dt>
            <dd class={styles.value}>{format(item().value)}</dd>
          </div>
        )}
      </For>
    </dl>
  );
}

/** Prerenders the static fallback; after hydration upgrades to live numbers from the public APIs. */
export function LiveStats() {
  const [enabled, setEnabled] = createSignal(false);
  onSettled(() => {
    setEnabled(true);
  });
  const live = createMemo(async () => (enabled() ? await getStats() : STATS_FALLBACK));
  return (
    <Errored fallback={<StatList values={STATS_FALLBACK} />}>
      <Loading fallback={<StatList values={STATS_FALLBACK} />}>
        <StatList values={live()} />
      </Loading>
    </Errored>
  );
}

/**
 * A single live number (inline text). Prerenders the fallback, then upgrades after hydration with the shared
 * request. Never throws, and keeps the fallback if the API fails.
 */
export function LiveStat(props: { stat: keyof Stats }) {
  const [enabled, setEnabled] = createSignal(false);
  onSettled(() => {
    setEnabled(true);
  });
  const live = createMemo(async () => (enabled() ? (await getStats())[props.stat] : STATS_FALLBACK[props.stat]));
  return (
    <Errored fallback={format(STATS_FALLBACK[props.stat])}>
      <Loading fallback={format(STATS_FALLBACK[props.stat])}>{format(live())}</Loading>
    </Errored>
  );
}
