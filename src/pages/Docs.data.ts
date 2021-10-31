import { useParams, useLocation, RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { getDoc, supportedDocs } from "@solid.js/docs"

export type DataParams = {
  version: string;
  lang: string;
  resource: string;
};

const currentVersion = '1.0.0';
const availableLangs = supportedDocs;

function docFetcher({version, lang, resource}: DataParams) {
  return getDoc(lang, resource);
}

export const DocsData: RouteDataFunc = () => {
  const params = useParams();
  const [, { locale }] = useI18n();
  const location = useLocation();
  const paramList = (): DataParams => {
    const version =
      params.version && params.version !== 'latest' ? params.version! : currentVersion;
    const lang = location.query.locale ? (location.query.locale as string) : locale();
    const resource = location.pathname.includes('/guide') ? 'guide' : 'api';
    return {
      version,
      lang: availableLangs.includes(lang) ? lang : 'en',
      resource,
    };
  };
  const [doc] = createResource(paramList, docFetcher);
  return {
    get langAvailable() {
      const lang = location.query.locale ? (location.query.locale as string) : locale();
      return !availableLangs.includes(lang);
    },
    get doc() {
      return doc();
    },
    get loading() {
      return doc.loading;
    },
    get version() {
      return paramList().version;
    },
    get params() {
      return paramList;
    },
  };
};
