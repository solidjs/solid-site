import { useLocation, RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { getDoc, getSupported } from '@solid.js/docs';

export type DataParams = {
  lang: string;
  resource: string;
};

function guideFetcher({ lang, resource }: DataParams) {
  return getDoc(lang, resource);
}

export const GuideData: RouteDataFunc = (props) => {
  const location = useLocation();
  const [, { locale }] = useI18n();
  const paramList = (): DataParams => {
    const lang = location.query.locale ? (location.query.locale as string) : locale();
    const resource = `guides/${props.params.id}`;
    return {
      lang: getSupported(resource, lang) ? lang : 'en',
      resource,
    };
  };
  const [guide] = createResource(paramList, guideFetcher);
  return {
    get langAvailable() {
      const lang = location.query.locale ? (location.query.locale as string) : locale();
      return !getSupported(`guides/${props.params.id}`, lang);
    },
    get doc() {
      return guide();
    },
    get loading() {
      return guide.loading;
    },
    get version() {
      return '';
    },
    get params() {
      return paramList;
    },
  };
};
