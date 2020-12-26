import { RouteDefinition } from 'solid-app-router';
import { createComputed, createResource } from 'solid-js';

const fetchMarkdown = (version: string, id: string) => () =>
  fetch(`/docs/md/${version}/${id}.md`).then((r) => r.text());

export const DocsData: RouteDefinition['data'] = (props) => {
  const [markdown, loadMarkdown] = createResource<string>();

  createComputed(() => {
    void loadMarkdown(fetchMarkdown(props.params.version as string, props.params.page as string));
  });

  return {
    get markdown() {
      return markdown();
    },
    get loading() {
      return markdown.loading;
    },
    get version() {
      return props.params.version as string;
    },
  };
};
