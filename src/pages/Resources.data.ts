import articles from '../resources/Articles.data';
import utilities from '../resources/Utilities.data';
import videos from '../resources/Videos.data';
import podcasts from '../resources/Podcasts.data';

const ResourceData = () => ({
  list: [...utilities, ...videos, ...articles, ...podcasts],
});

export type ResourcesDataProps = ReturnType<typeof ResourceData>;
export default ResourceData;
