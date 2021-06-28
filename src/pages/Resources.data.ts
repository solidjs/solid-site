import articles from './Resources/Articles.data';
import utilities from './Resources/Utilities.data';
import videos from './Resources/Videos.data';

export const ResourceData = () => ({
  list: [...utilities, ...videos, ...articles],
});

export type ResourcesDataProps = ReturnType<typeof ResourceData>;
