import { DataFn } from 'solid-app-router';
import { createResource, createSignal } from 'solid-js';

type Params = { page: string; version: string };

const cache = new Map<string, Promise<string>>();

function mdFetcher({ page, version }: Params) {
  const uid = page + version;

  if (!cache.has(uid)) {
    const markdown = fetch(`/docs/md/${version}/${page}.md`).then((r) => r.text());
    cache.set(uid, markdown);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return cache.get(uid);
}

export const DocsData: DataFn<{ version: string; page: string }> = (props) => {
  const [hash, setHash] = createSignal(location.hash);
  const [markdown] = createResource(() => props.params, mdFetcher);

  window.addEventListener('hashchange', () => setHash(location.hash));

  return {
    get markdown() {
      return markdown();
    },
    get loading() {
      return markdown.loading;
    },
    get version() {
      return props.params.version;
    },
    get params() {
      return props.params;
    },
    get hash() {
      return hash();
    },
  };
};
