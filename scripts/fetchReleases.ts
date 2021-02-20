import 'dotenv/config';

import Got from 'got';
import { basename } from 'path';
import markdown from 'markdown-it';
import frontmatter from 'front-matter';
import anchor from 'markdown-it-anchor';
import * as Shiki from 'shiki';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';

import { Documentation, Release, Section } from './types';

const API_URL = 'https://api.github.com/repos/ryansolid/solid';

let globalHighlighter: Shiki.Highlighter;

async function getHighlighter() {
  if (!globalHighlighter) {
    globalHighlighter = await Shiki.getHighlighter({ theme: 'nord', themes: ['nord'] });
  }

  return globalHighlighter;
}

const client = Got.extend({
  prefixUrl: API_URL,
  headers: {
    Accept: 'application/json',
    'Accept-Charset': 'utf-8',
    'User-Agent': 'node-github-api-client',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

async function processMarkdown(mdToProcess: string) {
  const { attributes, body } = frontmatter(mdToProcess);
  const highlighter = await getHighlighter();

  const md = markdown({
    html: true,
    linkify: true,
    highlight(codeToHightlight, lang) {
      const language = lang === 'js' ? 'ts' : lang === 'jsx' ? 'tsx' : lang;
      return highlighter.codeToHtml(codeToHightlight, language);
    },
  });

  const sections: Section[] = [];
  let first: Section;
  let second: Section;

  md.use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
    callback: (token, { slug, title }) => {
      // h1 -> 1, h2 -> 2, etc.
      const level = Number.parseInt(token.tag[1], 10);
      const section: Section = { slug, title, level, children: [] };

      if (level === 1) {
        first = section;
        second = undefined;
        sections.push(first);
      } else if (level === 2) {
        second = section;
        first.children.push(second);
      } else {
        if (!second) first.children.push(section);
        else second.children.push(section);
      }
    },
  });

  const html = '<section class="mt-10">' + md.render(body) + '</section>';

  return { html, attributes, sections };
}

async function processRelease(release: Release, index: number) {
  // First item should be the latest release
  const isLatest = index === 0;
  const version = release.tag_name;

  const documentations = await client
    .get('contents/documentation', {
      searchParams: { ref: version },
    })
    .json<Documentation[]>()
    .then((docs) => docs.filter(({ size, download_url }) => size && download_url));

  // Parse and iterate over the pages
  const files = await Promise.all(
    documentations.map(async (documentation) => {
      const name = basename(documentation.download_url, '.md');
      const title = name.charAt(0).toUpperCase() + name.slice(1);

      const content = await Got.get(documentation.download_url).text();

      return { title, content };
    }),
  );

  const mergedMarkdown = files.reduce((content, file) => content + file.content, '');

  const { html, sections } = await processMarkdown(mergedMarkdown);

  return {
    version,
    isLatest,
    html: release.html_url,
    date: release.published_at,
    tar: release.tarball_url,
    zip: release.zipball_url,
    sections,
    content: html,
    body: release.body,
  };
}

function shouldProcess({ draft, prerelease }: Release) {
  return !draft || !prerelease;
}

export async function fetchReleases() {
  const repos = await client
    .get('releases')
    .json<Release[]>()
    .then((repos) => Promise.all(repos.filter(shouldProcess).slice(0, 1).map(processRelease)));

  return repos;
}

fetchReleases()
  .then((releases) => {
    const path = (name: string) => resolve(dirname(__dirname), 'public/api', `${name}.json`);

    for (const release of releases) {
      writeFileSync(path(release.version.slice(1)), JSON.stringify(release, null, 2), {
        encoding: 'utf-8',
      });
    }
  })
  .catch(console.error);
