import { Meta, Title } from "@solidjs/meta";
import { Directory } from "../components/directory/Directory";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { SubmitDialog } from "../components/directory/SubmitDialog";
import { useI18n } from "../i18n";
import utilities from "../ecosystem/utilities";
import { CATEGORY_LABELS, ResourceCategory } from "../ecosystem/types";

const TITLE = "Solid Ecosystem: libraries, tools and packages | Solid";
const DESCRIPTION = "A searchable directory of libraries and tools for Solid, from the Solid team and the community.";

// Only categories that have a package: "Educational" belongs to the articles and videos on the Resources page.
const CATEGORIES = Object.values(ResourceCategory)
  .filter((value) => utilities.some((u) => u.categories.includes(value)))
  .map((value) => ({ value, label: CATEGORY_LABELS[value] }));

export default function EcosystemPage() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t(TITLE)}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t(TITLE)} />
      <Meta property="og:description" content={t(DESCRIPTION)} />
      <PageHeader
        eyebrow="Ecosystem"
        title="Libraries and tools for Solid"
        description="Primitives, routers, UI kits, build plugins and starters, from the Solid team and the community."
        actions={<SubmitDialog kind="package" />}
      />
      <Section size="wide">
        <Directory
          items={utilities}
          groupBy="category"
          packageSwitches
          filters={{ by: "category", options: CATEGORIES }}
          filterLabel="Filter by category"
          searchLabel="Search the ecosystem"
        />
      </Section>
    </>
  );
}
