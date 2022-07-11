import { useLocation, RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { getApi } from '@solid.js/docs';

export const DocsData: RouteDataFunc = () => {
  const location = useLocation();
  const [, { locale }] = useI18n();

  const lang = () => (location.query.locale ? (location.query.locale as string) : locale());
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
      return resource()?.fallback;
    },
  };
};
