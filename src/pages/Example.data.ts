import { RouteDefinition } from 'solid-app-router';

export const ExampleData: RouteDefinition['data'] = (props) => {
  return {
    get example() {
      return `${location.origin}/examples/${props.params.id as string}.json`;
    },
    get id() {
      return props.params.id as string;
    },
  };
};
