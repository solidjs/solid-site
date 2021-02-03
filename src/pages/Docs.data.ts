import { RouteDefinition } from 'solid-app-router';
import { createComputed, createResource, createSignal } from 'solid-js';

const fetchMarkdown = (version: string, id: string) => () =>
  fetch(`/docs/md/${version}/${id}.md`).then((r) => {
    // This is probably not the best place to do this
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return r.text();
  });

export const DocsData: RouteDefinition['data'] = (props) => {
  const [markdown, loadMarkdown] = createResource<string>();
  let previousVersion: string;
  let previousPage: string;
  const [hash, setHash] = createSignal(location.hash);

  createComputed(() => {
    setHash(location.hash);
    if (previousPage === props.params.page && previousVersion === props.params.version) return;

    void loadMarkdown(fetchMarkdown(props.params.version as string, props.params.page as string));

    previousPage = props.params.page as string;
    previousVersion = props.params.version as string;
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
    get params() {
      return props.params;
    },
    get hash() {
      return hash();
    },
  };
};
