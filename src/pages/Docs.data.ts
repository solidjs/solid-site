import type { DataFn } from 'solid-app-router';
import { createResource } from 'solid-js';

export type DataParams = {
  version: string;
  lang: string;
  resource: string;
};

const cache = new Map<string, Promise<string>>();

function mdFetcher({ version, lang, resource }: DataParams) {
  const cacheKey = `${version}-${resource}-${lang}`;
  if (!cache.has(cacheKey)) {
    const markdown = fetch(`/docs/${version}/${lang}/${resource}.json`).then((r) => r.json());
    cache.set(cacheKey, markdown);
  }

  return cache.get(cacheKey);
}

export const DocsData: DataFn<DataParams> = (props) => {
  const params = (): DataParams => {
    const version =
      props.params.version && props.params.version !== 'latest' ? props.params.version! : '1.0.0';
    const lang = props.query.lang ? (props.query.lang as string) : 'en';
    const resource = props.location.includes('/guide') ? 'guide' : 'api';
    return {
      version,
      lang,
      resource,
    };
  };
  const [doc] = createResource(params, mdFetcher);
  return {
    get doc() {
      return doc();
    },
    get loading() {
      return doc.loading;
    },
    get lang() {
      return params().lang;
    },
    get version() {
      return props.params.version;
    },
    get params() {
      return props.params;
    },
  };
};
