import { createEffect, createResource, createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';
import { RouteDataFunc } from 'solid-app-router';
import { createCookieStorage } from '@solid-primitives/storage';
import { createI18nContext } from '@solid-primitives/i18n';

const langs: { [lang: string]: any } = {
  en: async () => (await import('../lang/en/en')).default(),
  it: async () => (await import('../lang/it/it')).default(),
  de: async () => (await import('../lang/de/de')).default(),
  pt: async () => (await import('../lang/pt/pt')).default(),
  ja: async () => (await import('../lang/ja/ja')).default(),
  fr: async () => (await import('../lang/fr/fr')).default(),
  id: async () => (await import('../lang/id/id')).default(),
  he: async () => (await import('../lang/he/he')).default(),
  ru: async () => (await import('../lang/ru/ru')).default(),
  fa: async () => (await import('../lang/fa/fa')).default(),
  tr: async () => (await import('../lang/tr/tr')).default(),
  'zh-cn': async () => (await import('../lang/zh-cn/zh-cn')).default(),
};

type DataParams = {
  locale: string;
  page: string;
};

const RootData: RouteDataFunc = (props) => {
  const [settings, set] = !isServer
    ? createCookieStorage<{ dark: string; locale: string }>()
    : createSignal({ dark: false, locale: 'en' });
  const browserLang = !isServer ? navigator.language.slice(0, 2) : 'en';
  if (props.location.query.locale) {
    set('locale', props.location.query.locale);
  } else if (!settings.locale && langs.hasOwnProperty(browserLang)) {
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
  console.log('HI')
  return {
    set isDark(value) {
      settings.dark = value === true ? 'true' : 'false';
    },
    get isDark() {
      return settings.dark === 'true' ? true : false;
    },
    get i18n() {
      console.log('RETURN', i18n)
      return i18n;
    },
    get loading() {
      return lang.loading;
    },
  };
};

export default RootData;
