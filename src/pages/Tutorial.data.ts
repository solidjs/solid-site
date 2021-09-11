import { useI18n } from '@solid-primitives/i18n';
import { useLocation, RouteDataFunc, RouteData } from 'solid-app-router';
import { createResource } from 'solid-js';

const supportedLanguages = ['en', 'ja', 'zh-cn'];

export interface Step {
  md: string;
  js: string;
}

export interface TutorialDirectoryItem {
  internalName: string;
  lessonName: string;
  description: string;
}

interface Params {
  lang: string;
  id?: string;
}

export type TutorialDirectory = TutorialDirectoryItem[];

const markdownCache = new Map<string, Promise<string>>();
let directoryCache: { [key: string]: Promise<TutorialDirectory> | undefined } = {};

function getMarkdown(locale: string, id: string) {
  const cacheKey = `${locale}-${id}`;
  if (markdownCache.has(id)) return markdownCache.get(cacheKey);
  const markdown = fetch(`/tutorial/lessons/${locale}/${id}/lesson.md`).then((res) => res.text());
  markdownCache.set(cacheKey, markdown);
  return markdown;
}

async function fetchData({ lang, id }: Params) {
  if (!id) return {};
  const markdown = await getMarkdown(lang, id);
  const javascript = `/tutorial/lessons/${lang}/${id}/lesson.json`;
  const solved = `/tutorial/lessons/${lang}/${id}/solved.json`;
  return { markdown, javascript, solved };
}

async function fetchTutorialDirectory({ lang }: Params) {
  if (directoryCache[lang] === undefined) {
    directoryCache[lang] = fetch(`/tutorial/lessons/${lang}/directory.json`).then((r) => r.json());
  }
  return directoryCache[lang];
}

const propogateUndefined = (
  strings: TemplateStringsArray,
  ...substitutions: (string | undefined)[]
) => {
  let out = '';
  for (let i = 0; i < substitutions.length; i++) {
    if (substitutions[i] === undefined) return undefined;
    out += strings[i] + substitutions[i];
  }
  return out + strings[strings.length - 1];
};

export interface TutorialRouteData extends RouteData {
  loading: boolean;
  markdown?: string;
  js?: string;
  solvedJs?: string;
  tutorialDirectory?: Record<string, TutorialDirectory>;
  tutorialDirectoryEntry?: TutorialDirectoryItem;
  nextUrl?: string;
  previousUrl?: string;
  nextLesson?: string;
  previousLesson?: string;
  id?: string;
  solved?: boolean;
}

export const TutorialData: RouteDataFunc = (props) => {
  const location = useLocation();
  const [, { locale }] = useI18n();
  const params = () => {
    let lang = locale();
    if (!supportedLanguages.includes(lang)) {
      lang = 'en';
    }
    return { lang, id: props.params.id! };
  };
  const [directory] = createResource<TutorialDirectory>(params, fetchTutorialDirectory);
  const [data] = createResource(params, fetchData);
  return {
    get loading() {
      return data.loading;
    },
    get markdown() {
      return data()?.markdown;
    },
    get js() {
      return data()?.javascript;
    },
    get solvedJs() {
      return data()?.solved;
    },
    get tutorialDirectory() {
      const data = directory();
      return (
        data &&
        data.reduce<Record<string, TutorialDirectory>>((sections, item) => {
          // Turns `Basics/Signal` into ['Basics', 'Signal']
          const [section, lessonName] = item.lessonName.split('/');
          // Create the section if it doesn't already exists
          if (!sections[section]) {
            sections[section] = [];
          }
          sections[section].push({ ...item, lessonName });
          return sections;
        }, {})
      );
    },
    get tutorialDirectoryEntry() {
      const data = directory();
      return data && data.find((el) => el.internalName === props.params.id);
    },
    get nextUrl() {
      const data = directory();
      return propogateUndefined`/tutorial/${
        data && data[data.findIndex((el) => el.internalName === props.params.id) + 1]?.internalName
      }`;
    },
    get previousUrl() {
      const data = directory();
      return propogateUndefined`/tutorial/${
        data && data[data.findIndex((el) => el.internalName === props.params.id) - 1]?.internalName
      }`;
    },
    get nextLesson() {
      const data = directory();
      return propogateUndefined`${
        data && data[data.findIndex((el) => el.internalName === props.params.id) + 1]?.lessonName
      }`
        ?.split('/')
        .pop();
    },
    get previousLesson() {
      const data = directory();
      return propogateUndefined`${
        data && data[data.findIndex((el) => el.internalName === props.params.id) - 1]?.lessonName
      }`
        ?.split('/')
        .pop();
    },
    get id() {
      return props.params.id;
    },
    get solved() {
      return Boolean(location.query['solved']);
    },
  };
};
