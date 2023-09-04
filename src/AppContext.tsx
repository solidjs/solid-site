import {
  JSX,
  ParentComponent,
  Suspense,
  createContext,
  createEffect,
  createResource,
  useContext,
} from 'solid-js';
import { Meta, Title } from 'solid-meta';
import * as router from '@solidjs/router';
import * as storage from '@solid-primitives/storage';
import * as i18n from '@solid-primitives/i18n';
import { ResourceMetadata, getGuideDirectory } from '@solid.js/docs';
import { createStore } from 'solid-js/store';
import type en_dict from '../lang/en/en';

const raw_dict_map = {
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
} satisfies Record<string, () => Promise<unknown>>;

export type RawDictionary = ReturnType<typeof en_dict>;
export type Dictionary = i18n.Flatten<RawDictionary>;

export type Locale = keyof typeof raw_dict_map;

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const raw_dict = await raw_dict_map[locale]();
  return i18n.flatten(raw_dict) as Dictionary;
}

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const LANG_ALIASES: Partial<Record<string, Locale>> = {
  fil: 'tl',
};

const toLocale = (string: string): Locale | undefined =>
  string in raw_dict_map
    ? (string as Locale)
    : string in LANG_ALIASES
    ? (LANG_ALIASES[string] as Locale)
    : undefined;

interface Settings {
  locale: Locale;
  dark: boolean;
}

function initialLocale(location: router.Location): Locale {
  let locale: Locale | undefined;

  locale = toLocale(location.query.locale);
  if (locale) return locale;

  locale = toLocale(navigator.language.slice(0, 2));
  if (locale) return locale;

  locale = toLocale(navigator.language.toLocaleLowerCase());
  if (locale) return locale;

  return 'en';
}

function initialSettings(location: router.Location): Settings {
  return {
    locale: initialLocale(location),
    dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  };
}

function deserializeSettings(value: string, location: router.Location): Settings {
  const parsed = JSON.parse(value) as unknown;
  if (!parsed || typeof parsed !== 'object') return initialSettings(location);

  return {
    locale:
      ('locale' in parsed && typeof parsed.locale === 'string' && toLocale(parsed.locale)) ||
      initialLocale(location),
    dark: 'dark' in parsed && typeof parsed.dark === 'boolean' ? parsed.dark : false,
  };
}

interface AppState {
  get isDark(): boolean;
  setDark(value: boolean): void;
  get locale(): Locale;
  setLocale(value: Locale): void;
  t: i18n.NullableTranslator<Dictionary>;
  get dir(): JSX.HTMLDir;
  get guides(): ResourceMetadata[] | undefined;
}

const AppContext = createContext<AppState>({} as AppState);

export const useAppState = () => useContext(AppContext);

export const AppContextProvider: ParentComponent = (props) => {
  const location = router.useLocation();

  const now = new Date();
  const cookieOptions: storage.CookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };

  const [settings, set] = storage.makePersisted(createStore(initialSettings(location)), {
    storageOptions: cookieOptions,
    storage: storage.cookieStorage,
    deserialize: (value) => deserializeSettings(value, location),
  });

  const locale = () => settings.locale;

  const [dict] = createResource(locale, fetchDictionary);

  const [guidesList] = createResource(locale, getGuideDirectory);

  createEffect(() => {
    document.documentElement.lang = settings.locale;
  });

  createEffect(() => {
    if (settings.dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  const t = i18n.translator(dict);

  const state: AppState = {
    get isDark() {
      return settings.dark;
    },
    setDark(value) {
      set('dark', value);
    },
    get locale() {
      return settings.locale;
    },
    setLocale(value) {
      set('locale', value);
    },
    t,
    get dir() {
      return (t('global.dir') ?? 'ltr') as JSX.HTMLDir;
    },
    get guides() {
      return guidesList();
    },
  };

  return (
    <Suspense>
      <AppContext.Provider value={state}>
        <Title>{t('global.title') ?? 'SolidJS · Reactive Javascript Library'}</Title>
        <Meta name="lang" content={locale()} />
        <div dir={state.dir}>{props.children}</div>
      </AppContext.Provider>
    </Suspense>
  );
};
