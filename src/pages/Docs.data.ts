import type { DataFn } from 'solid-app-router';
import { createResource } from 'solid-js';

type Params = { version: string };

const cache = new Map<string, any>();

function mdFetcher({ version }: Params) {
  if (!cache.has(version)) {
    const markdown = fetch(`/api/${version}.json`).then((r) => r.json());
    cache.set(version, markdown);
  }

  return cache.get(version);
}

export const DocsData: DataFn<Params> = (props) => {
  const [doc] = createResource(() => props.params, mdFetcher);

  return {
    get doc() {
      return doc();
    },
    get loading() {
      return doc.loading;
    },
    get version() {
      return props.params.version;
    },
    get params() {
      return props.params;
    },
  };
};
