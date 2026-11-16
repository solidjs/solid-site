import { useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import { getPost } from "../blog/posts";
import { DEFAULT_LOCALE, LOCALES, stripLocale, useI18n, withLocale } from "../i18n";
import { absoluteUrl, COPYRIGHT_HOLDER, LICENSE_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS, URLS } from "../site";

/** Stable @id values so the entities in one page's graph, and across pages, point at each other. */
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LOGO = "/img/logos/icon/solid-icon-flat-light.svg";

/** Pages that get a breadcrumb trail, keyed by their bare (English) path. */
const CRUMB_LABELS: Record<string, string> = {
  "/about": "About",
  "/blog": "Blog",
  "/code-of-conduct": "Code of Conduct",
  "/ecosystem": "Ecosystem",
  "/media": "Media",
  "/resources": "Resources",
  "/store": "Store",
  "/team": "Team",
};

/** One JSON-LD block. `<` is escaped so no string in the data can close the script element. */
function JsonLd(props: { data: object }) {
  return <script type="application/ld+json" innerHTML={JSON.stringify(props.data).replace(/</g, "\\u003c")} />;
}

/**
 * schema.org structured data for the current page, rendered from the layout so every route is covered in one place:
 * the home page describes the organisation, website and software; blog posts are BlogPosting; every inner page gets a
 * BreadcrumbList. Plain facts only (no ratings, offers or search actions the site cannot back up).
 */
export function Seo() {
  const location = useLocation();
  const { t, locale } = useI18n();
  const barePath = () => stripLocale(location.pathname).replace(/\/+$/, "") || "/";
  const url = (path: string) => absoluteUrl(withLocale(path, locale().code));
  const slug = () => (barePath().startsWith("/blog/") ? barePath().slice("/blog/".length) : undefined);
  const post = () => {
    const s = slug();
    return s ? getPost(s) : undefined;
  };

  const crumbs = (items: { name: string; path: string }[]) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: url(item.path) })),
  });
  const home = () => ({ name: t("Home"), path: "/" });

  return (
    <>
      <Show when={barePath() === "/"}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": ORG_ID,
                name: SITE_NAME,
                legalName: COPYRIGHT_HOLDER,
                url: SITE_URL,
                logo: { "@type": "ImageObject", url: absoluteUrl(LOGO) },
                sameAs: [...SOCIAL_LINKS.map((s) => s.href), URLS.githubRepo, URLS.npm, URLS.opencollective],
              },
              {
                "@type": "WebSite",
                "@id": SITE_ID,
                url: SITE_URL,
                name: SITE_NAME,
                description: SITE_DESCRIPTION,
                inLanguage: LOCALES.map((l) => l.lang),
                publisher: { "@id": ORG_ID },
              },
              {
                "@type": "SoftwareSourceCode",
                name: SITE_NAME,
                description: SITE_DESCRIPTION,
                url: SITE_URL,
                codeRepository: URLS.githubRepo,
                programmingLanguage: "TypeScript",
                license: LICENSE_URL,
                author: { "@id": ORG_ID },
              },
            ],
          }}
        />
      </Show>

      {/* The French copy of a post is a noindexed duplicate (see Layout.tsx), so only the English page carries the article data. */}
      <Show when={post() && !post()!.draft && locale().code === DEFAULT_LOCALE.code}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${absoluteUrl(`/blog/${slug()}`)}#article`,
                // Posts are English only; every locale's copy points at the English page as canonical.
                mainEntityOfPage: absoluteUrl(`/blog/${slug()}`),
                headline: post()!.title,
                description: post()!.description,
                datePublished: post()!.date,
                dateModified: post()!.modified ?? post()!.date,
                inLanguage: "en-US",
                image: post()!.image ? [absoluteUrl(post()!.image!)] : undefined,
                keywords: post()!.tags?.join(", "),
                author: { "@type": post()!.author === COPYRIGHT_HOLDER ? "Organization" : "Person", name: post()!.author, url: post()!.authorUrl },
                publisher: { "@id": ORG_ID },
                isPartOf: { "@type": "Blog", name: t("Blog"), url: absoluteUrl("/blog") },
              },
              crumbs([home(), { name: t("Blog"), path: "/blog" }, { name: post()!.title, path: `/blog/${slug()}` }]),
            ],
          }}
        />
      </Show>

      <Show when={!post() && CRUMB_LABELS[barePath()]}>
        {(label) => (
          <JsonLd data={{ "@context": "https://schema.org", ...crumbs([home(), { name: t(label()), path: barePath() }]) }} />
        )}
      </Show>
    </>
  );
}
