interface Example {
  id: string;
  name: string;
  description: string;
}

const list: Record<string, Example[]> = {
  Basic: [
    {
      id: 'counter',
      name: 'Counter',
      description: 'A simple standard counter example',
    },
    {
      id: 'todos',
      name: 'Simple Todos',
      description: 'Todos with LocalStorage persistence',
    },
    {
      id: 'forms',
      name: 'Form Validation',
      description: 'HTML 5 validators with custom async validation',
    },
    {
      id: 'cssanimations',
      name: 'CSS Animations',
      description: 'Using Solid Transition Group',
    },
    {
      id: 'context',
      name: 'Context',
      description: 'A simple color picker using Context.',
    },
  ],
  Complex: [
    {
      id: 'clock',
      name: 'Clock',
      description: 'Demonstrates Solid reactivity with a real-time clock example.',
    },
    {
      id: 'ethasketch',
      name: 'Etch A Sketch',
      description: 'Uses Index and createMemo to create a grid graphic.',
    },
    {
      id: 'scoreboard',
      name: 'Scoreboard',
      description: 'Make use of hooks to do simple transitions',
    },
    {
      id: 'asyncresource',
      name: 'Async Resource',
      description: 'Ajax requests to SWAPI with Promise cancellation',
    },
    {
      id: 'suspensetabs',
      name: 'Suspense Transitions',
      description: 'Defered loading spinners for smooth UX',
    },
    {
      id: 'simpletodos',
      name: 'Simple Todos Template Literals',
      description: 'Simple Todos using Lit DOM Expressions',
    },
    {
      id: 'simpletodoshyperscript',
      name: 'Simple Todos Hyperscript',
      description: 'Simple Todos using Hyper DOM Expressions',
    },
  ],
};

const ExamplesData = () => ({
  list,
});

export type ExamplesDataRoute = ReturnType<typeof ExamplesData>;
export default ExamplesData;
