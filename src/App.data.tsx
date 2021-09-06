import { lazy, createEffect, createResource } from 'solid-js';
import { RouteDataFunc } from 'solid-app-router';
import createCookieStore from '@solid-primitives/cookies-store';
import { createI18nContext, I18nContext, useI18n } from '@solid-primitives/i18n';

type DataParams = {
  locale: string;
  page: string;
};

export const AppData: RouteDataFunc = (props) => {
  const [settings, set] = createCookieStore<{ locale: string }>();
  if (props.location.query.locale) {
    set('locale', props.location.query.locale);
  }
  const i18n = createI18nContext({}, settings.locale || 'en');
  const params = (): DataParams => {
    const locale = i18n[1].locale();
    let page = props.location.pathname.slice(1);
    if (page == '') {
      page = 'home';
    }
    return { locale, page };
  };
  const [lang] = createResource(params, async ({ locale }) => {
    switch (locale) {
      case 'en':
        return (await import('../lang/en/en')).default();
      case 'it':
        return (await import('../lang/it/it')).default();
      case 'ja':
        return (await import('../lang/ja/ja')).default();
      case 'fr':
        return (await import('../lang/fr/fr')).default();
      case 'id':
        return (await import('../lang/id/id')).default();
      case 'he':
        return (await import('../lang/he/he')).default();
      case 'zh-cn':
        return (await import('../lang/zh-cn/zh-cn')).default();
    }
  });
  createEffect(() => set('locale', i18n[1].locale()));
  createEffect(() => {
    console.log(lang());
    if (!lang.loading) i18n[1].add(i18n[1].locale(), lang());
  });
  return {
    get i18n() {
      return i18n;
    },
    get loading() {
      return lang.loading;
    },
  };
};
