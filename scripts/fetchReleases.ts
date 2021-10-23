import 'dotenv/config';
// @ts-ignore
import htmlnano from 'htmlnano';
import frontmatter from 'front-matter';
import { getHighlighter, loadTheme } from 'shiki';
import markdown from 'markdown-it';
import anchor, { AnchorInfo } from 'markdown-it-anchor';
import Token from 'markdown-it/lib/token';
import Got from 'got';
import { basename } from 'path';
import { existsSync } from 'fs';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { resolve } from 'path';
import { globby } from 'globby';

import { Documentation, Section, Release } from './types';

const API_URL = 'https://api.github.com/repos/solidjs/solid-docs';
const LANGS = ['it', 'en', 'de', 'fr', 'zh-cn', 'ja', 'pt', 'id', 'ru'];

// Helper for calling Github API
const client = Got.extend({
  prefixUrl: API_URL,
  headers: {
    Accept: 'application/json',
    'Accept-Charset': 'utf-8',
    'User-Agent': 'node-github-api-client',
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

// Parse individual markdown files
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
  let second: Section | undefined;
  md.use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
    callback: (token: Token, { slug, title }: AnchorInfo) => {
      // h1 -> 1, h2 -> 2, etc.
      const level = Number.parseInt(token.tag[1], 10);
      const section: Section = { slug, title, level, children: [] };
      if (level === 1) {
        first = section;
        second = undefined;
        sections.push(first);
      } else if (level === 2) {
        second = section;
        first.children!.push(second);
      } else {
        if (!second) return;
        else second.children!.push(section);
      }
    },
  });
  const renderedMarkdown = md.render(body)
  const optimizedMarkdown = (await htmlnano.process(renderedMarkdown)).html
  const html = '<section class="mt-10">' + optimizedMarkdown + '</section>';
  return { html, attributes, sections };
}

// Download and process Markdown within a specific folder
async function fetchReleaseFolder(
  release: Release, index: number, path: string = ''
) {
  const isLatest = index === 0;
  const version = release.tag_name;
  const writePath = resolve(__dirname, 'docs', version, path);

  // Download the source MD file if it's doesn't exist locally
  if (!existsSync(writePath)) {
    console.log(`> Processing ${path} of ${version}`);
    await mkdir(writePath, { recursive: true });

    // Grab individual folders
    const files = await client
      .get(`contents/${path}`, {
        searchParams: { ref: isLatest ? 'main' : version },
      })
      .json<Documentation[]>()
      .then((docs) => docs.filter(({ size, download_url }) => size && download_url));

    for (const item of files) {
      const name = basename(item.download_url);
      const content = await Got.get(item.download_url).text();
      await writeFile(resolve(writePath, name), content, { encoding: 'utf-8' });
    }
  }
}

// Processes individual md files into a single build
async function processSections(
  version: string, lang: string, path: string, output: string
) {
  const readPath = resolve(__dirname, 'docs', version, lang, path);
  const { sections, content } = await globby([resolve(readPath)]).then(
    async (mdFiles) => {
      let results = [];
      for (const mdFile of mdFiles) {
        const fileContent = await readFile(mdFile, { encoding: 'utf-8' });
        results.push(await processMarkdown(fileContent));
      }
      results.sort(
        (a: any, b: any) => (
          a.attributes ? a.attributes.sort : 0) - (b.attributes ? b.attributes.sort : 0)
      );
      let content = '';
      let sections = [];
      for (let i in results) {
        content += results[i].html;
        sections.push(...results[i].sections);
      }
      return { sections, content };
    }
  );
  const outputPath = resolve(__dirname, '../public/docs', version.slice(1), lang);
  if (!existsSync(outputPath)) {
    await mkdir(outputPath, { recursive: true });
  }
  console.log(`  - Processing ${lang}/${output}`);
  await writeToPath(`${outputPath}/${output}`, { sections, content });
}

// Write the file to a specific path
async function writeToPath(path: string, release: any) {
  await writeFile(path, JSON.stringify(release, null, 2), {
    encoding: 'utf-8',
  });
}

// Method for determining if a release should be allowed
function shouldProcess({ draft, prerelease }: Release) {
  return !draft || !prerelease;
}

// Retrieves individual releases from the API
export async function fetchReleases(lang: string) {
  const releases = await client.get('releases').json<Release[]>();
  releases.filter(shouldProcess).map(async (release, index) => {
    console.log(` -> Running ${release.tag_name}`);
    await fetchReleaseFolder(release, index, lang);
    await fetchReleaseFolder(release, index, `${lang}/guides`);
    await processSections(
      release.tag_name, lang, '*.md', 'api.json'
    );
    await processSections(
      release.tag_name, lang, 'guides/*.md', 'guide.json'
    );
  })
}

// Begin processing release files
async function run() {
  for (let i in LANGS) {
    console.log(`> Processing ${LANGS[i]}`);
    await fetchReleases(LANGS[i]);
  }
}

run();
