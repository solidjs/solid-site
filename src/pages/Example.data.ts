import { RouteDefinition, useRouter } from 'solid-app-router';
import { createComputed, createResource } from 'solid-js';

const fetchExample = (id: string) => () => fetch(`/examples/${id}.json`).then((r) => r.json());

export const ExampleData: RouteDefinition['data'] = (props) => {
  const [example, loadExample] = createResource<string>();

  let prevId: string;

  createComputed(() => {
    if (prevId === props.params.id) return;

    void loadExample(fetchExample(props.params.id as string));
    prevId = props.params.id as string;
  });

  return {
    get example() {
      return example();
    },
    get id() {
      return props.params.id as string;
    },
    get loading() {
      return example.loading;
    },
  };
};
