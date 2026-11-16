import { Meta, Title } from "@solidjs/meta";
import { Directory } from "../components/directory/Directory";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { SubmitDialog } from "../components/directory/SubmitDialog";
import { useI18n } from "../i18n";
import articles from "../ecosystem/articles";
import podcasts from "../ecosystem/podcasts";
import videos from "../ecosystem/videos";
import { ResourceType, TYPE_LABELS } from "../ecosystem/types";

const TITLE = "Solid Resources: articles, videos and podcasts | Solid";
const DESCRIPTION = "Learn Solid from community articles, videos and podcasts, including talks and deep dives from the Solid team.";

const ITEMS = [...videos, ...articles, ...podcasts];
const TYPES = Object.values(ResourceType).map((value) => ({ value, label: TYPE_LABELS[value] }));

export default function ResourcesPage() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t(TITLE)}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t(TITLE)} />
      <Meta property="og:description" content={t(DESCRIPTION)} />
      <PageHeader
        eyebrow="Resources"
        title="Learn Solid from the community"
        description="Articles, videos and podcasts about Solid, newest first."
        actions={<SubmitDialog kind="resource" />}
      />
      <Section size="wide">
        <Directory
          items={ITEMS}
          filters={{ by: "type", options: TYPES }}
          filterLabel="Filter by type"
          searchLabel="Search resources"
        />
      </Section>
    </>
  );
}
