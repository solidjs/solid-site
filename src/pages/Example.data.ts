import { DataFn, RouteDefinition } from 'solid-app-router';

export const ExampleData: DataFn<{ id: string }> = (props) => {
  return {
    get example() {
      return `${location.origin}/examples/${props.params.id}.json`;
    },
    get id() {
      return props.params.id;
    },
  };
};
