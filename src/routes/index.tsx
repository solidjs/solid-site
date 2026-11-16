import { Meta, Title } from "@solidjs/meta";
import { useI18n } from "../i18n";
import { SITE_NAME } from "../site";
import { BlogPreview } from "../components/home/BlogPreview";
import { Community } from "../components/home/Community";
import { Ecosystem } from "../components/home/Ecosystem";
import { Hero } from "../components/home/Hero";
import { Maintainers } from "../components/home/Maintainers";
import { Newsletter } from "../components/home/Newsletter";
import { WhySolid } from "../components/home/WhySolid";
import { Sponsors } from "../components/home/Sponsors";
import { StoreCallout } from "../components/home/StoreCallout";
import { WhatsNew } from "../components/home/WhatsNew";

const TITLE = "Solid: Fine-grained reactive UI";
const DESCRIPTION =
  "Solid is a fine-grained reactive UI library with no virtual DOM. Solid 2.0 adds first-class async, optimistic actions and draft-first stores.";

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t(TITLE)}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t(TITLE)} />
      <Meta property="og:description" content={t(DESCRIPTION)} />
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Hero />
      <WhySolid />
      <WhatsNew />
      <Ecosystem />
      <Community />
      <Sponsors />
      <BlogPreview />
      <Maintainers />
      <Newsletter />
      <StoreCallout />
    </>
  );
}
