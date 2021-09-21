import global from './global.json';
import home from './home.json';
import resources from './resources.json';
import tutorial from './tutorial';
import media from './media';
import examples from './examples';
import contributors from './contributors';
import docs from './docs';

const langs = () => ({
  global,
  home,
  docs,
  media,
  resources,
  tutorial,
  examples,
  contributors
});

export default langs;
