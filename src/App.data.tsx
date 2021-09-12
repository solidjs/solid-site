import { createEffect, createResource } from 'solid-js';
import { RouteDataFunc } from 'solid-app-router';
import createCookieStore from '@solid-primitives/cookies-store';
import { createI18nContext } from '@solid-primitives/i18n';

const langs = {
  en: async () => (await import('../lang/en/en')).default(),
  it: async () => (await import('../lang/it/it')).default(),
  ja: async () => (await import('../lang/ja/ja')).default(),
  fr: async () => (await import('../lang/fr/fr')).default(),
  id: async () => (await import('../lang/id/id')).default(),
  he: async () => (await import('../lang/he/he')).default(),
  ru: async () => (await import('../lang/ru/ru')).default(),
  'zh-cn': async () => (await import('../lang/zh-cn/zh-cn')).default(),
};

type DataParams = {
  locale: string;
  page: string;
};

export const AppData: RouteDataFunc = (props) => {
  const [settings, set] = createCookieStore<{ dark: string; locale: string }>();
  const browserLang = navigator.language.slice(0, 2);
  if (props.location.query.locale) {
    set('locale', props.location.query.locale);
  } else if (langs.hasOwnProperty(browserLang)) {
    set('locale', browserLang);
  }
  const i18n = createI18nContext({}, settings.locale || 'en');
  const [, { add }] = i18n;
  const params = (): DataParams => {
    const locale = i18n[1].locale();
    let page = props.location.pathname.slice(1);
    if (page == '') {
      page = 'home';
    }
    return { locale, page };
  };
  const [lang] = createResource(params, ({ locale }) => langs[locale]());
  createEffect(() => set('locale', i18n[1].locale()));
  createEffect(() => {
    if (!lang.loading) add(i18n[1].locale(), lang() as Record<string, any>);
  });
  return {
    set isDark(value) {
      settings.dark = value === true ? 'true' : 'false';
    },
    get isDark() {
      return settings.dark === 'true' ? true : false;
    },
    get i18n() {
      return i18n;
    },
    get languages() {
      return langList;
    },
    get loading() {
      return lang.loading;
    },
  };
};
