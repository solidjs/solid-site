import articles from './Resources/Articles.data';
import videos from './Resources/Videos.data';
import podcasts from './Resources/Podcasts.data';

export const ResourcesData = () => ({
  list: [...videos, ...articles, ...podcasts],
});

export type ResourcesDataProps = ReturnType<typeof ResourcesData>;
