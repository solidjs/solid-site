import { Errored, For, Loading, createMemo, createSignal, onSettled } from "solid-js";
import { Avatar } from "../Avatar";
import { Link } from "../Link";
import styles from "./Team.module.css";

interface Contributor {
  login: string;
  avatar: string;
  url: string;
  contributions: number;
}

interface ApiContributor {
  login: string;
  type: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const REPOS = ["solidjs/solid", "solidjs/solid-start", "solidjs/solid-router"] as const;
export const CONTRIBUTORS_URL = "https://github.com/solidjs/solid/graphs/contributors";

async function loadContributors(): Promise<Contributor[]> {
  const lists = await Promise.all(
    REPOS.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=100`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      return (await res.json()) as ApiContributor[];
    }),
  );
  const byLogin = new Map<string, Contributor>();
  for (const c of lists.flat()) {
    if (c.type !== "User") continue; // skip bots
    const prev = byLogin.get(c.login);
    if (prev) prev.contributions += c.contributions;
    else byLogin.set(c.login, { login: c.login, avatar: `${c.avatar_url}${c.avatar_url.includes("?") ? "&" : "?"}s=96`, url: c.html_url, contributions: c.contributions });
  }
  return [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
}

const Fallback = (props: { message: string }) => (
  <p class={styles.wallNote}>
    {props.message}{" "}
    <Link href={CONTRIBUTORS_URL} inline>See everyone on GitHub</Link>.
  </p>
);

/**
 * Contributor avatar wall. Prerendered HTML contains only the link-out; the live list is fetched
 * in the browser after hydration and never throws (rate limits show the link-out message).
 */
export function ContributorWall() {
  const [ready, setReady] = createSignal(false);
  onSettled(() => {
    setReady(true);
  });
  // Plain [] until the client has settled so SSR and first hydration match; then the fetch promise.
  const people = createMemo(() => (ready() ? loadContributors() : ([] as Contributor[])));

  return (
    <div class={styles.wall} aria-live="polite">
      <Errored fallback={() => <Fallback message="The live contributor list is unavailable right now (GitHub may be rate limiting requests)." />}>
        <Loading fallback={<p class={styles.wallNote}>Loading contributors...</p>}>
          <ul class={styles.wallGrid} role="list">
            <For each={people()}>
              {(c) => (
                <li>
                  <Link href={c.url} aria-label={`${c.login} on GitHub`} title={c.login} class={styles.wallLink}>
                    <Avatar src={c.avatar} name={c.login} size={48} />
                  </Link>
                </li>
              )}
            </For>
          </ul>
        </Loading>
      </Errored>
      <Fallback message="Showing top contributors across solid, solid-start and solid-router." />
    </div>
  );
}
