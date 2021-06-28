import type { DataFn } from 'solid-app-router';
import { createResource } from 'solid-js';

export type DataParams = { version: string };

const cache = new Map<string, Promise<string>>();

function mdFetcher(version: string) {
  if (!cache.has(version)) {
    const markdown = fetch(`/api/${version}.json`).then((r) => r.json());
    cache.set(version, markdown);
  }

  return cache.get(version);
}

export const DocsData: DataFn<DataParams> = (props) => {
  const version =
    props.params.version && props.params.version !== 'latest' ? props.params.version! : '1.0.0';
  const [doc] = createResource(() => version, mdFetcher);
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
