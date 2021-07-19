import type { DataFn } from 'solid-app-router';
import { createResource } from 'solid-js';

export type DataParams = {
  version: string;
  lang?: string;
  resource?: string;
};

const cache = new Map<string, Promise<string>>();

function mdFetcher({
  version,
  lang,
  resource,
}: {
  version: string;
  lang: string;
  resource: string;
}) {
  const cacheKey = `${version}-${lang}`;
  if (!cache.has(cacheKey)) {
    const markdown = fetch(`/docs/${version}/${lang}/${resource}.json`).then((r) => r.json());
    cache.set(cacheKey, markdown);
  }

  return cache.get(cacheKey);
}

export const DocsData: DataFn<DataParams> = (props) => {
  const version =
    props.params.version && props.params.version !== 'latest' ? props.params.version! : '1.0.0';
  const lang = props.query.lang || 'en';
  const resource = props.params.resource || 'api';
  const [doc] = createResource({ version, lang, resource }, mdFetcher);
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
