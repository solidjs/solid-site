import articles from './Resources/Articles.data';
import utilities from './Resources/Utilities.data';
import videos from './Resources/Videos.data';
import podcasts from './Resources/Podcasts.data';

export const ResourceData = () => ({
  list: [...utilities, ...videos, ...articles, ...podcasts],
});

export type ResourcesDataProps = ReturnType<typeof ResourceData>;
