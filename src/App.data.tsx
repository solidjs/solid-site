import { RouteDataFunc } from 'solid-app-router';
import createCookieStore from '@solid-primitives/cookies-store';
import { createResource } from 'solid-js';

type DataParams = {
  lang: string;
  page: string;
};

const fetchLang = async ({ lang, page }: DataParams) =>
  (await fetch(`/lang/${lang}/${page}.json`)).json();

export const AppData: RouteDataFunc = (props) => {
  const [settings, set] = createCookieStore<{ lang: string }>();
  if (props.location.query.lang) {
    set('lang', props.location.query.lang);
  }
  const params = (): DataParams => {
    const lang = settings.lang || 'en';
    let page = props.location.pathname.slice(1);
    if (page == '') {
      page = 'home';
    }
    return { lang, page };
  };
  const [lang] = createResource(params, fetchLang);
  return {
    get locale() {
      return settings.lang || 'en';
    },
    get dict() {
      return lang();
    },
    get loadingLang() {
      return lang.loading;
    },
  };
};
