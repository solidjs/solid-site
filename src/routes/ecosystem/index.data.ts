import utilities from '~/Resources/Utilities.data';

const PackagesData = () => ({
  list: [...utilities],
});
export default PackagesData;

export type PackagesDataProps = ReturnType<typeof PackagesData>;
