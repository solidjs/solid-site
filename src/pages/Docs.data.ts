import { useLocation, RouteDataFunc } from '@solidjs/router';
import { createResource } from 'solid-js';
import { DocFile, getApi } from '@solid.js/docs';
import { useAppState } from '../AppContext';

export interface DocData {
  loading: boolean;
  fallback: boolean;
  doc?: DocFile;
}

export const DocsData: RouteDataFunc<DocData> = () => {
  const location = useLocation();
  const ctx = useAppState();

  const lang = () => (location.query.locale ? location.query.locale : ctx.locale);
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
