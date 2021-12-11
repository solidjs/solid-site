import { createEffect, createResource } from 'solid-js';
import { RouteDataFunc } from 'solid-app-router';
import createCookieStore from '@solid-primitives/cookies-store';
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
  tl: async () => (await import('../lang/tl/tl')).default(),
  'zh-cn': async () => (await import('../lang/zh-cn/zh-cn')).default(),
};

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const langAliases: Record<string, string> = {
  fil: 'tl',
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
    if (locale in langAliases) {
      return { locale: langAliases[locale], page };
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
    get loading() {
      return lang.loading;
    },
  };
};
