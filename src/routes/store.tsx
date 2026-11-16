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

const DESCRIPTION = "Stickers and swag from the Solid Store. Every profit goes to Solid's Open Collective to support the community.";

export default function StorePage() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t("Solid Store: stickers, shirts and swag | Solid")}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t("Solid Store: stickers, shirts and swag | Solid")} />
      <Meta property="og:description" content={t(DESCRIPTION)} />
      <PageHeader
        eyebrow="Store"
        title="The Solid Store"
        description="All profits from the store go back to Solid's Open Collective to support our community."
        actions={<Button href={URLS.opencollective} icon="opencollective">Support Solid directly</Button>}
      />
      <Section size="wide">
        <Shelf fallback={<Skeleton />} />
      </Section>
    </>
  );
}
