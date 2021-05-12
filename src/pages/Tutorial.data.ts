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

export interface TutorialProps {
  loading: boolean;
  markdown: string;
  js: string;
  solvedJs: string;
  tutorialDirectory: TutorialDirectory;
  tutorialDirectoryEntry: TutorialDirectoryItem;
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
      return directory();
    },
    get tutorialDirectoryEntry() {
      const data = directory();
      return data && data.find((el) => el.internalName === props.params.id);
    },
    get id() {
      return props.params.id;
    },
    get solved() {
      return Boolean(props.query['solved']);
    },
  };
};
