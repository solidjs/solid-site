import articles from '../resources/Articles.data';
import videos from '../resources/Videos.data';
import podcasts from '../resources/Podcasts.data';

export const ResourcesData = () => ({
  list: [...videos, ...articles, ...podcasts],
});

export type ResourcesDataProps = ReturnType<typeof ResourcesData>;
