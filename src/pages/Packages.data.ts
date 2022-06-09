import { createSolidexQuery } from '../utils/solidex';

export const PackagesData = () => createSolidexQuery('packages');

export type PackagesDataProps = ReturnType<typeof PackagesData>;
