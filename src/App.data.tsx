import { RouteDataFunc } from 'solid-app-router';
import createCookieStore from '@solid-primitives/cookies-store';
import { createEffect, createResource } from 'solid-js';

type DataParams = {
  locale: string;
  page: string;
};

const fetchLang = async ({ locale, page }: DataParams) =>
  (await fetch(`/lang/${locale}/${page}.json`)).json();

export const AppData: RouteDataFunc = (props) => {
  const [settings, set] = createCookieStore<{ locale: string }>();
  if (props.location.query.locale) {
    set('locale', props.location.query.locale);
  }
  const params = (): DataParams => {
    const locale = settings.locale || 'en';
    let page = props.location.pathname.slice(1);
    if (page == '') {
      page = 'home';
    }
    return { locale, page };
  };
  const [lang] = createResource(
    params,
    fetchLang
  );
  return {
    set locale(locale: string) {
      set('locale', locale);
    },
    get locale() {
      return settings.locale;
    },
    get dict() {
      return lang();
    },
    get loading() {
      return lang.loading;
    },
  };
};
