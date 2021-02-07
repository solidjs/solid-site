import { DataFn } from 'solid-app-router';
import { createResource } from 'solid-js';

export interface Step {
  name: string;
  md: string;
  js: string;
}

interface Manifest {
  name: string;
  description: string;
  steps: Step[];
}

const manifestCache = new Map<string, Manifest>();
const markdownCache = new Map<string, string>();

async function getManifest(id: string) {
  if (manifestCache.has(id)) return manifestCache.get(id);

  const manifest = await fetch(`/tutorial/manifests/${id}.json`).then((res) => res.json());
  manifestCache.set(id, manifest);

  return manifest;
}

async function getMarkdown(id: string, file: string) {
  const uid = id + file;
  if (markdownCache.has(uid)) return markdownCache.get(uid);

  const markdown = await fetch(`/tutorial/lessons/${id}/${file}`).then((res) => res.text());
  markdownCache.set(uid, markdown);

  return markdown;
}

async function fetchData({ id, step }: any) {
  const manifest: Manifest = await getManifest(id);
  const { md, js, name } = manifest.steps[Number.parseInt(step, 10)];

  const markdown: string = await getMarkdown(id, md);
  const javascript = `${location.origin}/tutorial/lessons/${id}/${js}`;

  return { manifest, markdown, javascript, name };
}

export const TutorialData: DataFn<{ id: string; step: string }> = (props) => {
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
    get name() {
      return data().manifest.name;
    },
    get description() {
      return data().manifest.description;
    },
    get stepName() {
      return data().name;
    },
    get id() {
      return props.params.id;
    },
    get step() {
      return Number.parseInt(props.params.step, 10);
    },
    get steps() {
      return data().manifest.steps;
    },
    get numberOfSteps() {
      return data().manifest.steps.length - 1;
    },
  };
};
