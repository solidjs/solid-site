import { Errored, For, Loading, createMemo, createSignal, onSettled } from "solid-js";
import { useI18n } from "../../i18n";
import { URLS } from "../../site";
import { Icon, type IconName } from "../Icon";
import { STATS_FALLBACK, type Stats } from "./data";
import styles from "./Stats.module.css";

const TIMEOUT_MS = 4000;

/** A stat in the current language ("36.3K" or "36,3 k"); "—" until it is known. */
const useFormat = () => {
  const { fmtCompact } = useI18n();
  return (n: number | null) => (n === null ? "—" : fmtCompact(n));
};

async function getJson(url: string): Promise<{ json: unknown; headers: Headers }> {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(String(res.status));
  return { json: await res.json(), headers: res.headers };
}

/**
 * The numbers the Worker refreshes into KV once a day (worker/index.ts). Same origin, so it is instant and does not count
 * against GitHub's rate limit. Returns null when there is no Worker (local dev) or it has nothing yet.
 */
async function fetchStored(): Promise<Stats | null> {
  try {
    const { json } = await getJson("/api/stats");
    const data = json as Record<keyof Stats, unknown>;
    const stats: Stats = { stars: num(data.stars), downloads: num(data.downloads), contributors: num(data.contributors) };
    return stats.stars === null && stats.downloads === null && stats.contributors === null ? null : stats;
  } catch {
    return null;
  }
}

/**
 * Asks GitHub and npm from the visitor's own browser, only for the numbers in `want` (a visitor's own IP has its own
 * rate limit). Never throws: any failed or slow request keeps the static fallback for that number.
 */
async function fetchDirect(want: Record<keyof Stats, boolean> = { stars: true, downloads: true, contributors: true }): Promise<Stats> {
  const skip = Promise.reject(new Error("not needed"));
  skip.catch(() => {});
  const [repo, npm, contributors] = await Promise.allSettled([
    want.stars ? getJson("https://api.github.com/repos/solidjs/solid") : skip,
    want.downloads ? getJson("https://api.npmjs.org/downloads/point/last-week/solid-js") : skip,
    want.contributors ? getJson("https://api.github.com/repos/solidjs/solid/contributors?per_page=1&anon=false") : skip,
  ]);
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

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

/**
 * The Worker's numbers first. It may have only some of them (GitHub can refuse its requests while npm answers), so
 * anything it lacks is asked for directly rather than shown as a dash.
 */
const fetchStats = async (): Promise<Stats> => {
  const stored = await fetchStored();
  const missing = {
    stars: stored?.stars == null,
    downloads: stored?.downloads == null,
    contributors: stored?.contributors == null,
  };
  if (stored && !missing.stars && !missing.downloads && !missing.contributors) return stored;
  const direct = await fetchDirect(missing);
  return {
    stars: stored?.stars ?? direct.stars,
    downloads: stored?.downloads ?? direct.downloads,
    contributors: stored?.contributors ?? direct.contributors,
  };
};

/** One request per page load: the hero stats and the "Why Solid" numbers share it (GitHub allows 60 unauthenticated calls/hour). */
let cached: Promise<Stats> | undefined;
const getStats = () => (cached ??= fetchStats());

function StatList(props: { values: Stats }) {
  const { t, localePath } = useI18n();
  const format = useFormat();
  const items = (): { icon: IconName; label: string; value: number | null; href: string }[] => [
    { icon: "star", label: "GitHub stars", value: props.values.stars, href: URLS.githubRepo },
    { icon: "download", label: "npm downloads / week", value: props.values.downloads, href: URLS.npm },
    { icon: "users", label: "Contributors", value: props.values.contributors, href: "/team" },
  ];
  return (
    <dl class={styles.list}>
      <For each={items()} keyed={(i) => i.label}>
        {(item) => (
          <div class={styles.item}>
            <Icon name={item().icon} size={20} class={styles.icon} />
            <dt class={styles.label}><a href={localePath(item().href)}>{t(item().label)}</a></dt>
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
  const format = useFormat();
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
