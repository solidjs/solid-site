/**
 * Cloudflare Worker in front of the static site (see wrangler.jsonc). It does two things:
 *
 *   GET /api/stats   serves the GitHub and npm numbers shown on the home page, read from the STATS KV namespace
 *   cron (daily)     refreshes those numbers from GitHub and npm and writes them to KV
 *
 * Every other request goes straight to the static assets. Visitors never call GitHub or npm themselves, so the
 * numbers load instantly and GitHub's per-IP rate limit does not apply.
 */

interface Env {
  ASSETS: Fetcher;
  STATS: KVNamespace;
  /** Optional secret (`wrangler secret put GITHUB_TOKEN`): authenticated calls get a far higher GitHub rate limit. */
  GITHUB_TOKEN?: string;
}

interface Snapshot {
  stars: number | null;
  downloads: number | null;
  contributors: number | null;
  /** ISO time of the last successful refresh of any value. */
  updatedAt: string;
}

const KEY = "stats:v1";
const TIMEOUT_MS = 8000;
/** A snapshot older than this is refreshed in the background by the next visitor (the cron normally keeps it fresh). */
const STALE_MS = 36 * 60 * 60 * 1000;

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

async function getJson(url: string, env: Env): Promise<{ json: unknown; headers: Headers }> {
  const headers: Record<string, string> = { accept: "application/json", "user-agent": "solidjs-site-stats" };
  if (env.GITHUB_TOKEN && url.startsWith("https://api.github.com/")) headers.authorization = `Bearer ${env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return { json: await res.json(), headers: res.headers };
}

/** Fetches fresh numbers. A value that cannot be fetched is null here and keeps its previous value in refresh(). */
async function fetchLive(env: Env): Promise<Omit<Snapshot, "updatedAt">> {
  const [repo, npm, contributors] = await Promise.allSettled([
    getJson("https://api.github.com/repos/solidjs/solid", env),
    getJson("https://api.npmjs.org/downloads/point/last-week/solid-js", env),
    // One contributor per page, so the number of the last page is the contributor count.
    getJson("https://api.github.com/repos/solidjs/solid/contributors?per_page=1&anon=false", env),
  ]);
  const lastPage = (h: Headers) => {
    const m = h.get("link")?.match(/[?&]page=(\d+)>;\s*rel="last"/);
    return m ? Number(m[1]) : null;
  };
  return {
    stars: repo.status === "fulfilled" ? num((repo.value.json as { stargazers_count?: unknown }).stargazers_count) : null,
    downloads: npm.status === "fulfilled" ? num((npm.value.json as { downloads?: unknown }).downloads) : null,
    contributors: contributors.status === "fulfilled" ? lastPage(contributors.value.headers) : null,
  };
}

const read = (env: Env) => env.STATS.get<Snapshot>(KEY, "json");

/** Fetches and stores new numbers. A failed request never replaces a good number with an empty one. */
async function refresh(env: Env): Promise<Snapshot | null> {
  const [live, previous] = await Promise.all([fetchLive(env), read(env)]);
  const next: Snapshot = {
    stars: live.stars ?? previous?.stars ?? null,
    downloads: live.downloads ?? previous?.downloads ?? null,
    contributors: live.contributors ?? previous?.contributors ?? null,
    updatedAt: previous?.updatedAt ?? new Date().toISOString(),
  };
  if (live.stars !== null || live.downloads !== null || live.contributors !== null) next.updatedAt = new Date().toISOString();
  if (next.stars === null && next.downloads === null && next.contributors === null) return null;
  await env.STATS.put(KEY, JSON.stringify(next));
  return next;
}

async function handleStats(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
  }
  let snapshot = await read(env);
  // First request after a deploy, before the cron has run: fill the store now instead of showing nothing.
  if (!snapshot) snapshot = await refresh(env).catch(() => null);
  else if (Date.now() - Date.parse(snapshot.updatedAt) > STALE_MS) ctx.waitUntil(refresh(env).catch(() => null));

  if (!snapshot) {
    return Response.json({ stars: null, downloads: null, contributors: null }, { status: 503, headers: { "cache-control": "no-store" } });
  }
  return Response.json(snapshot, {
    // Browsers keep it for 5 minutes and Cloudflare's edge for an hour; the numbers only change once a day.
    headers: { "cache-control": "public, max-age=300, s-maxage=3600" },
  });
}

export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname === "/api/stats") return handleStats(request, env, ctx);
    return env.ASSETS.fetch(request);
  },
  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(refresh(env));
  },
} satisfies ExportedHandler<Env>;
