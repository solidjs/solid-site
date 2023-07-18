import { useI18n } from '@solid-primitives/i18n';
import { RouteDataFunc } from '@solidjs/router';
import { createResource } from 'solid-js';
import { getTutorial, getTutorialDirectory, LessonLookup } from '@solid.js/docs';

type JsFiles = {
  files: { name: string; type?: string; content: string }[];
};

export interface TutorialRouteData {
  loading: boolean;
  markdown?: string;
  js?: JsFiles;
  solvedJs?: JsFiles;
  tutorialDirectory?: Record<string, LessonLookup[]>;
  tutorialDirectoryEntry?: LessonLookup;
  nextUrl?: string;
  previousUrl?: string;
  nextLesson?: string;
  previousLesson?: string;
  id: string;
  solved?: boolean;
}

export const TutorialData: RouteDataFunc<TutorialRouteData> = (props) => {
  const [, { locale }] = useI18n();
  const paramList = () => ({ lang: locale(), id: props.params.id || 'introduction_basics' });
  const [directory] = createResource(paramList, async ({ lang }) => {
    const requestedLang = await getTutorialDirectory(lang);
    if (requestedLang) return requestedLang;
    return await getTutorialDirectory('en');
  });
  const [data] = createResource(paramList, async ({ lang, id }) => {
    const requestedLang = await getTutorial(lang, id);
    if (requestedLang && requestedLang.lesson) return requestedLang;
    return await getTutorial('en', id);
  });

  const currentIndex = (data: LessonLookup[]) =>
    data.findIndex((el) => el.internalName === paramList().id);

  return {
    get loading() {
      return data.loading;
    },
    get markdown() {
      return data()?.markdown;
    },
    get js() {
      return data()?.lesson as JsFiles;
    },
    get solvedJs() {
      return data()?.solved as JsFiles;
    },
    get tutorialDirectory() {
      const data = directory();
      if (!data) return;
      return data.reduce<Record<string, LessonLookup[]>>((sections, item) => {
        // Turns `Basics/Signal` into ['Basics', 'Signal']
        const [section, lessonName] = item.lessonName.split('/');
        // Create the section if it doesn't already exists
        if (!sections[section]) {
          sections[section] = [];
        }
        sections[section].push({ ...item, lessonName });
        return sections;
      }, {});
    },
    get tutorialDirectoryEntry() {
      const data = directory();
      if (!data) return;
      return data.find((el) => el.internalName === paramList().id);
    },
    get nextUrl() {
      const data = directory();
      if (!data) return;
      const index = currentIndex(data);
      if (index + 1 < data.length) return `/tutorial/${data[index + 1].internalName}`;
    },
    get previousUrl() {
      const data = directory();
      if (!data) return;
      const index = currentIndex(data);
      if (index - 1 >= 0) return `/tutorial/${data[index - 1].internalName}`;
    },
    get nextLesson() {
      const data = directory();
      if (!data) return;
      const index = currentIndex(data);
      if (index + 1 < data.length) return data[index + 1].lessonName.split('/').pop();
    },
    get previousLesson() {
      const data = directory();
      if (!data) return;
      const index = currentIndex(data);
      if (index - 1 >= 0) return data[index - 1].lessonName.split('/').pop();
    },
    get id() {
      return paramList().id;
    },
    get solved() {
      return !!props.location.search.includes('solved');
    },
  };
};
