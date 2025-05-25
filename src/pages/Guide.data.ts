import { useLocation, type RouteLoadFunc } from '@solidjs/router';
import { createResource } from 'solid-js';
import { getDoc } from '@solid.js/docs';
import type { DocData } from './Docs.data';
import { useAppState } from '../AppContext';

export const GuideData: RouteLoadFunc<DocData> = (props) => {
  const location = useLocation();
  const ctx = useAppState();

  const paramList = () => ({
    lang: location.query.locale ? location.query.locale : ctx.locale,
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
