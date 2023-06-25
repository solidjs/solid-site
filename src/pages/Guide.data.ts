import { useLocation, RouteDataFunc } from '@solidjs/router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { getDoc } from '@solid.js/docs';
import { DocData } from './Docs.data';

export const GuideData: RouteDataFunc<DocData> = (props) => {
  const location = useLocation();
  const [, { locale }] = useI18n();

  const paramList = () => ({
    lang: location.query.locale ? location.query.locale : locale(),
    resource: props.params.id,
  });
  const [resource] = createResource(paramList, async ({ lang, resource }) => {
    const requestedLang = await getDoc(lang, resource);
    if (requestedLang) return { doc: requestedLang, fallback: false };
    return { doc: await getDoc('en', resource), fallback: true };
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
