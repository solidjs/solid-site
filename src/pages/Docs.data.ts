import { useLocation, RouteDataFunc } from '@solidjs/router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { DocFile, getApi } from '@solid.js/docs';

export interface DocData {
  loading: boolean;
  fallback: boolean;
  doc?: DocFile;
}

export const DocsData: RouteDataFunc<DocData> = () => {
  const location = useLocation();
  const [, { locale }] = useI18n();

  const lang = () => (location.query.locale ? location.query.locale : locale());
  const [resource] = createResource(lang, async (lang) => {
    const requestedLang = await getApi(lang);
    if (requestedLang) return { doc: requestedLang, fallback: false };
    return { doc: await getApi('en'), fallback: true };
  });
  return {
    get doc() {
      return resource()?.doc;
    },
    get loading() {
      return resource.loading;
    },
    get fallback() {
      return !!resource()?.fallback;
    },
  };
};
