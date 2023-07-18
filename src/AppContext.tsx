import { ParentComponent, createContext, createEffect, createResource, useContext } from 'solid-js';
import { Meta, Title } from 'solid-meta';
import { useLocation } from '@solidjs/router';
import { createCookieStorage } from '@solid-primitives/storage';
import { createI18nContext, I18nContext } from '@solid-primitives/i18n';
import { ResourceMetadata, getGuideDirectory } from '@solid.js/docs';

interface AppContextInterface {
  isDark: boolean;
  loading: boolean;
  guides: ResourceMetadata[] | undefined;
}

const AppContext = createContext<AppContextInterface>({
  isDark: false,
  loading: true,
  guides: undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const langs: { [lang: string]: () => Promise<any> } = {
  en: async () => (await import('../lang/en/en')).default(),
  az: async () => (await import('../lang/az/az')).default(),
  it: async () => (await import('../lang/it/it')).default(),
  de: async () => (await import('../lang/de/de')).default(),
  pt: async () => (await import('../lang/pt/pt')).default(),
  ja: async () => (await import('../lang/ja/ja')).default(),
  fr: async () => (await import('../lang/fr/fr')).default(),
  id: async () => (await import('../lang/id/id')).default(),
  he: async () => (await import('../lang/he/he')).default(),
  ru: async () => (await import('../lang/ru/ru')).default(),
  ar: async () => (await import('../lang/ar/ar')).default(),
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

export const AppContextProvider: ParentComponent = (props) => {
  const now = new Date();
  const cookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };
  const [settings, set] = createCookieStorage();
  const browserLang = navigator.language.slice(0, 2);
  const location = useLocation();
  const specialLangs = { zh: true, ko: true };

  if (location.query.locale) {
    set('locale', location.query.locale, cookieOptions);
  } else if (!settings.locale && browserLang in langs) {
    set('locale', browserLang);
  } else if (
    !settings.locale &&
    browserLang in specialLangs &&
    navigator.language.toLowerCase() in langs
  ) {
    set('locale', navigator.language.toLocaleLowerCase());
  }

  const i18n = createI18nContext({}, (settings.locale || 'en') as string);
  const [t, { add, locale }] = i18n;
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

  const [lang] = createResource(params, ({ locale }) => langs[locale]());
  const [guidesList] = createResource(params, ({ locale }) => getGuideDirectory(locale));
  const isDark = () =>
    settings.dark === 'true'
      ? true
      : settings.dark === 'false'
      ? false
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

  createEffect(() => set('locale', i18n[1].locale()), cookieOptions);
  createEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!lang.loading) add(i18n[1].locale(), lang() as Record<string, any>);
  });
  createEffect(() => {
    document.documentElement.lang = locale();
  });
  createEffect(() => {
    if (isDark()) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  const store = {
    set isDark(value) {
      set('dark', value === true ? 'true' : 'false', cookieOptions);
    },
    get isDark() {
      return isDark();
    },
    get loading() {
      return lang.loading;
    },
    get guides() {
      return guidesList();
    },
  };

  return (
    <AppContext.Provider value={store}>
      <I18nContext.Provider value={i18n}>
        <Title>{t('global.title', {}, 'SolidJS · Reactive Javascript Library')}</Title>
        <Meta name="lang" content={locale()} />
        <div dir={t('global.dir', {}, 'ltr')}>{props.children}</div>
      </I18nContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
