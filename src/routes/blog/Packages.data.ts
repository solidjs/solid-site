import utilities from '../../resources/Utilities.data';

export const PackagesData = () => ({
  list: [...utilities],
});

export type PackagesDataProps = ReturnType<typeof PackagesData>;
