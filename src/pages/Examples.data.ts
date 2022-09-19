import { RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { Example, getExamplesDirectory, getExample } from '@solid.js/docs';

export interface ExamplesRouteData {
  loading: boolean;
  list?: [string, Example[]][];
  current?: Example;
}

export const ExamplesData: RouteDataFunc<ExamplesRouteData> = (props) => {
  const [, { locale }] = useI18n();
  const paramList = () => ({ lang: locale(), id: props.params.id });
  const [examplesDirectoryResource] = createResource(paramList, async ({ lang }) => {
    const requestedLang = await getExamplesDirectory(lang);
    if (requestedLang) return requestedLang;
    return await getExamplesDirectory('en');
  });
  const [exampleResource] = createResource(paramList, async ({ lang, id }) => {
    const requestedLang = await getExample(lang, id);
    if (requestedLang) return requestedLang;
    return await getExample('en', id);
  });

  return {
    get loading() {
      return examplesDirectoryResource.loading || exampleResource.loading;
    },
    get list() {
      const examplesDirectory = examplesDirectoryResource();
      if (!examplesDirectory) return undefined;
      const result = examplesDirectory.reduce<Record<string, Example[]>>((acc, val) => {
        const [category] = val.name.split('/');
        if (!acc[category]) acc[category] = [];
        acc[category].push(val);
        return acc;
      }, {});
      return Object.entries(result);
    },
    get current() {
      return exampleResource();
    },
  };
};
