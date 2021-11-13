import { RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { getDoc, getSupported } from '@solid.js/docs';

export type DataParams = {
  lang: string;
  resource: string;
};

const DocsData: RouteDataFunc = () => {
  const [, { locale }] = useI18n();
  const paramList = (): DataParams => {
    return {
      lang: getSupported('api', locale()) ? locale() : 'en',
      resource: 'api',
    };
  };
  const [doc] = createResource(paramList, ({ lang, resource }) => getDoc(lang, resource));
  return {
    get langAvailable() {
      return !getSupported('api', locale());
    },
    get doc() {
      return doc();
    },
    get loading() {
      return doc.loading;
    },
    get params() {
      return paramList;
    },
  };
};

export default DocsData;
