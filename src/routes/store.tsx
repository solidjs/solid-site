import { Meta, Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/web";
import { useI18n } from "../i18n";
import { Button } from "../components/Button";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { Skeleton } from "../components/store/Skeleton";
import { URLS } from "../site";

// Products are fetched from Shopify in the browser, so the prerendered page is just the shell and a skeleton.
const Shelf = clientOnly(() => import("../components/store/Shelf"));

const DESCRIPTION = "Stickers and swag from the Solid Store. All profits go to Solid's Open Collective.";

export default function StorePage() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t("Store | Solid")}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t("Store | Solid")} />
      <Meta property="og:description" content={t(DESCRIPTION)} />
      <PageHeader
        eyebrow="Store"
        title="The Solid Store"
        description="All profits from the store go to Solid's Open Collective."
        actions={<Button href={URLS.opencollective} icon="opencollective">Support Solid directly</Button>}
      />
      <Section size="wide">
        <Shelf fallback={<Skeleton />} />
      </Section>
    </>
  );
}
