import { DataFn } from 'solid-app-router';
import { createResource } from 'solid-js';

export interface Step {
  md: string;
  js: string;
}

export interface TutorialDirectoryItem {
  internalName: string;
  lessonName: string;
  description: string;
}

export type TutorialDirectory = TutorialDirectoryItem[];

const markdownCache = new Map<string, Promise<string>>();
let directoryCache: Promise<TutorialDirectory> | undefined;

function getMarkdown(id: string) {
  if (markdownCache.has(id)) return markdownCache.get(id);

  const markdown = fetch(`/tutorial/lessons/${id}/lesson.md`).then((res) => res.text());
  markdownCache.set(id, markdown);

  return markdown;
}

async function fetchData({ id }: { id: string }) {
  if (!id) return {};

  const markdown: string = await getMarkdown(id);
  const javascript = `/tutorial/lessons/${id}/lesson.json`;
  const solved = `/tutorial/lessons/${id}/solved.json`;

  return { markdown, javascript, solved };
}

async function fetchTutorialDirectory() {
  if (directoryCache === undefined) {
    directoryCache = fetch('/tutorial/lessons/directory.json').then((r) => r.json());
  }
  return directoryCache;
}

const propogateUndefined = (strings: TemplateStringsArray, ...substitutions: string[]) => {
  let out = '';
  for (let i = 0; i < substitutions.length; i++) {
    if (substitutions[i] === undefined) return undefined;
    out += strings[i] + substitutions[i];
  }
  return out + strings[strings.length - 1];
};

export interface TutorialProps {
  loading: boolean;
  markdown: string;
  js: string;
  solvedJs: string;
  tutorialDirectory: Record<string, TutorialDirectory>;
  tutorialDirectoryEntry: TutorialDirectoryItem;
  nextUrl: string | undefined;
  previousUrl: string | undefined;
  id: string;
  solved: boolean;
}

export const TutorialData: DataFn<{ id: string; step: string }> = (props) => {
  const [directory] = createResource<TutorialDirectory>(fetchTutorialDirectory);
  const [data] = createResource(() => props.params, fetchData);

  return {
    get loading() {
      return data.loading;
    },
    get markdown() {
      return data().markdown;
    },
    get js() {
      return data().javascript;
    },
    get solvedJs() {
      return data().solved;
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
    get id() {
      return props.params.id;
    },
    get solved() {
      return Boolean(props.query['solved']);
    },
  };
};
