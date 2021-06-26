import 'dotenv/config';

import Got from 'got';
import { basename } from 'path';
import markdown from 'markdown-it';
import frontmatter from 'front-matter';
import anchor from 'markdown-it-anchor';
import { getHighlighter, loadTheme } from 'shiki';
import { existsSync } from 'fs';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import globby from 'globby';

import { Documentation, Release, Section } from './types';

const API_URL = 'https://api.github.com/repos/solidjs/solid';
const NEXT = process.env.NEXT ? true : false;

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
  const theme = await loadTheme(resolve(__dirname, 'github-light.json'));
  const highlighter = await getHighlighter({ theme });

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
        if (!second) return;
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

  console.log('> Processing release ', version);
  const documentationPath = resolve(__dirname, 'documentation', version);

  if (!existsSync(documentationPath)) {
    await mkdir(documentationPath);

    if (NEXT == true) {
      console.log('! Next flag enabled, grabbing next branch docs...')
    }

    const documentations = await client
      .get('contents/documentation', {
        searchParams: { ref: NEXT == true && isLatest ? 'main' : version },
      })
      .json<Documentation[]>()
      .then((docs) => docs.filter(({ size, download_url }) => size && download_url));

    for (const documentation of documentations) {
      const name = basename(documentation.download_url);
      const content = await Got.get(documentation.download_url).text();

      await writeFile(resolve(documentationPath, name), content, { encoding: 'utf-8' });
    }
  }

  const { sections, content } = await globby([resolve(documentationPath, '**/*.md')]).then(
    async (mdFiles) => {
      let sections = [];
      let content = '';

      for (const mdFile of mdFiles) {
        const name = basename(mdFile, '.md');
        const title = name.charAt(0).toUpperCase() + name.slice(1);
        console.log('  >> Processing file ', title);

        const fileContent = await readFile(mdFile, { encoding: 'utf-8' });
        const result = await processMarkdown(fileContent);

        console.log('  >> Finished processing file ', title);
        content += result.html;
        sections.push(...result.sections);
      }

      console.log('> Finished processing release ', version);

      return { sections, content };
    },
  );

  return {
    version,
    isLatest,
    html: release.html_url,
    date: release.published_at,
    tar: release.tarball_url,
    zip: release.zipball_url,
    sections,
    content,
    body: release.body,
  };
}

function shouldProcess({ draft, prerelease }: Release) {
  return !draft || !prerelease;
}

export async function fetchReleases() {
  const documentation = resolve(__dirname, 'documentation');
  if (!existsSync(documentation)) await mkdir(documentation);
  const repos = await client
    .get('releases')
    .json<Release[]>()
    .then((repos) => Promise.all(repos.filter(shouldProcess).map(processRelease)));

  return repos;
}

fetchReleases()
  .then(async (releases) => {
    const apiDir = resolve(dirname(__dirname), 'public/api');
    if (!existsSync(apiDir)) await mkdir(apiDir);

    const path = (name: string) => resolve(apiDir, `${name}.json`);

    for (const release of releases) {
      await writeFile(path(release.version.slice(1)), JSON.stringify(release, null, 2), {
        encoding: 'utf-8',
      });
    }
  })
  .catch(console.error);
