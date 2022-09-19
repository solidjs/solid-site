import { useLocation, RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { Example, getExamplesDirectory } from '@solid.js/docs';

export interface ExamplesDirectoryData {
  loading: boolean;
  fallback: boolean;
  list?: [string, Example[]][];
}

export const ExamplesData: RouteDataFunc<ExamplesDirectoryData> = () => {
  const location = useLocation();
  const [, { locale }] = useI18n();

  const lang = () => (location.query.locale ? location.query.locale : locale());
  const [resource] = createResource(lang, async (lang) => {
    const requestedLang = await getExamplesDirectory(lang);
    if (requestedLang) return { list: requestedLang, fallback: false };
    return { list: await getExamplesDirectory('en'), fallback: true };
  });
  return {
    get loading() {
      return resource.loading;
    },
    get fallback() {
      return !!resource()?.fallback;
    },
    get list() {
      const flatList = resource()?.list;
      if (!flatList) return undefined;
      const result = flatList.reduce<Record<string, Example[]>>((acc, val) => {
        const [category] = val.name.split('/');
        if (!acc[category]) acc[category] = [];
        acc[category].push(val);
        return acc;
      }, {});
      return Object.entries(result);
    },
  };
};
