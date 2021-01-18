import { RouteDefinition } from 'solid-app-router';
import { createResource } from 'solid-js';

export type Step = {
  name: string;
  md: string;
  js: string;
};

type Manifest = {
  name: string;
  description: string;
  steps: Step[];
};

const fetchManifest = (id: string) => () =>
  fetch(`/tutorial/manifests/${id}.json`).then((res) => {
    return res.json();
  });

const fetchMarkdown = (id: string, file: string) => () =>
  fetch(`/tutorial/lessons/${id}/${file}`).then((r) => {
    return r.text();
  });

export const TutorialData: RouteDefinition['data'] = (props) => {
  const [manifest, loadManifest] = createResource<Manifest>();
  const [markdown, loadMarkdown] = createResource<string>();

  void loadManifest(fetchManifest(props.params.id as string));

  return {
    get markdown() {
      if (!manifest()) return;
      const step = manifest().steps[Number.parseInt(props.params.step as string)];
      void loadMarkdown(fetchMarkdown(props.params.id as string, step.md));
      return markdown();
    },
    get js() {
      if (manifest()) {
        const file = manifest().steps[Number.parseInt(props.params.step as string)].js;
        return `${location.origin}/tutorial/lessons/${props.params.id as string}/${file}`;
      }
    },
    get name() {
      if (manifest()) return manifest().name;
    },
    get description() {
      if (manifest()) return manifest().description;
    },
    get stepName() {
      if (manifest()) return manifest().steps[Number.parseInt(props.params.step as string)].name;
    },
    get id() {
      return props.params.id as string;
    },
    get step() {
      return props.params.step as string;
    },
    get steps() {
      if (manifest()) return manifest().steps;
    },
    get numberOfSteps() {
      if (manifest()) return manifest().steps.length;
    },
  };
};
