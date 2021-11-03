
interface Section {
  slug: string;
  title: string;
  level: number;
  children?: Section[];
}

interface DocData {
  loading: boolean;
  langAvailable: boolean;
  doc: {
    sections: Section[];
    content: string;
  };
}

interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Author;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

interface DocumentationRelease {
  version: string,
  isLatest: boolean,
  html: string,
  date: string,
  tar: string,
  zip: string,
  sections: Section[],
  content: string,
  body: string,
};

interface Author {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Documentation {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: Links;
}

interface Links {
  self: string;
  git: string;
  html: string;
}
