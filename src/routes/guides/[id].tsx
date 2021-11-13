import { useI18n } from '@solid-primitives/i18n';
import { getDoc, getSupported } from '@solid.js/docs';
import { RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import Docs from '../docs/[...all]';

export type DataParams = {
  lang: string;
  resource: string;
};

export const routeData: RouteDataFunc = (props) => {
  const [, { locale }] = useI18n();
  const resource = () => `guides/${props.params.id}`;
  const paramList = (): DataParams => {
    return {
      lang: getSupported(resource(), locale()) ? locale() : 'en',
      resource: resource(),
    };
  };
  const [guide] = createResource(paramList, ({ lang, resource }) => getDoc(lang, resource));
  return {
    get langAvailable() {
      return !getSupported(resource(), locale());
    },
    get doc() {
      return guide();
    },
    get loading() {
      return guide.loading;
    },
    params: paramList,
  };
};

export default Docs;
