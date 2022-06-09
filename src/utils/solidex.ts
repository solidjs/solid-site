import type { Accessor } from 'solid-js';
import { createFetch } from '@solid-primitives/fetch';
import type { Resource } from '../pages/Resources/Ecosystem';

export type SolidexType = 'packages' | 'resources';
export interface SolidexResponse {
  list: Resource[];
  loading: boolean;
};

export const createSolidexQuery = (type: SolidexType): SolidexResponse => {
  const [fetch] = createFetch<Resource[]>(
    `https://api.solidjs.com/solidex/${type}`,
    {
      method: 'GET',
    }
  );
  return {
    get list() {
      return fetch() || [];
    },
    get loading() {
      return fetch.loading;
    },
  };
};
