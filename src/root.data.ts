import { createEffect, createResource, createComputed } from 'solid-js';
import { RouteDataFunc } from '@solidjs/router';
import { createCookieStorage } from '@solid-primitives/storage';
import { createI18nContext } from '@solid-primitives/i18n';
import { getGuideDirectory } from '@solid.js/docs';
import { isServer } from 'solid-js/web';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const langs: { [lang: string]: () => Promise<any> } = {
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
  'ko-kr': async () => (await import('../lang/ko-kr/ko-kr')).default(),
  'zh-cn': async () => (await import('../lang/zh-cn/zh-cn')).default(),
  'zh-tw': async () => (await import('../lang/zh-tw/zh-tw')).default(),
  es: async () => (await import('../lang/es/es')).default(),
  pl: async () => (await import('../lang/pl/pl')).default(),
  uk: async () => (await import('../lang/uk/uk')).default(),
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

const createRootStore = () => {
  const now = new Date();
  const cookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };
  const [settings, set] = createCookieStorage();

  return [
    settings as { dark?: 'false' | 'true'; locale: string },
    (key: string, value: string) => set(key, value, cookieOptions),
  ] as const;
};

const RootData: RouteDataFunc = (props) => {
  const [settings, set] = createRootStore();
  const browserLang = isServer ? 'en' : navigator.language.slice(0, 2);
  const location = props.location;
  if (location.query.locale) {
    set('locale', location.query.locale);
  } else if (!settings.locale && browserLang in langs) {
    set('locale', browserLang);
  }
  const i18n = createI18nContext({}, settings.locale || 'en');
  const [, { add, locale }] = i18n;
  const params = (): DataParams => {
    const locale = i18n[1].locale();
    let page = location.pathname.slice(1);
    if (page == '') {
      page = 'home';
    }
    if (locale in langAliases) {
      return { locale: langAliases[locale], page };
    }
    return { locale, page };
  };

  const [lang] = createResource(params, async ({ locale }) => {
    const lang = await langs[locale]();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add(locale, lang as Record<string, any>);
  });

  const [guidesList] = createResource(params, ({ locale }) => getGuideDirectory(locale));
  const isDark = () =>
    settings.dark === 'true'
      ? true
      : settings.dark === 'false'
      ? false
      : isServer
      ? false
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

  createEffect(() => set('locale', locale()));

  createEffect(() => {
    document.documentElement.lang = locale();
  });
  createEffect(() => {
    if (isDark()) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  return {
    set isDark(value) {
      set('dark', value === true ? 'true' : 'false');
    },
    get isDark() {
      return isDark();
    },
    get i18n() {
      createComputed(() => {
        lang();
      });
      return i18n;
    },
    get loading() {
      return lang.loading;
    },
    get guides() {
      return guidesList();
    },
  };
};

export default RootData;
