import { createSolidexQuery } from '../utils/solidex';

export const ResourcesData = () => createSolidexQuery('resources');

export type ResourcesDataProps = ReturnType<typeof ResourcesData>;
