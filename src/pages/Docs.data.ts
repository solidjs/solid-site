import { RouteDataFunc, useLocation, useParams } from 'solid-app-router';
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

export const DocsData: RouteDataFunc = () => {
  const params = useParams();
  const location = useLocation();
  const options = (): DataParams => {
    const version = params.version && params.version !== 'latest' ? params.version! : '1.0.0';
    const lang = location.query.lang ? (location.query.lang as string) : 'en';
    const resource = location.pathname.includes('/guide') ? 'guide' : 'api';
    return {
      version,
      lang,
      resource,
    };
  };
  const [doc] = createResource(options, mdFetcher);
  return {
    get doc() {
      return doc();
    },
    get loading() {
      return doc.loading;
    },
    get lang() {
      return options().lang;
    },
    get version() {
      return params.version;
    },
    get params() {
      return params;
    },
  };
};
