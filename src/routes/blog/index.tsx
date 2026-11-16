import { Meta, Title } from "@solidjs/meta";
import { useI18n } from "../../i18n";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";
import { BlogList } from "../../components/blog/BlogList";

const DESCRIPTION = "News, release announcements and deep dives on Solid 2.0, SolidStart and the Solid community, from the Solid team.";

export default function BlogIndex() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t("Solid Blog: news, releases and deep dives | Solid")}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t("Solid Blog: news, releases and deep dives | Solid")} />
      <Meta property="og:description" content={t(DESCRIPTION)} />
      <PageHeader
        eyebrow="Blog"
        title="News from the Solid team"
        description={DESCRIPTION}
        actions={<Button href="/rss.xml" icon="rss" external>RSS feed</Button>}
      />
      <Container size="wide">
        <BlogList />
      </Container>
    </>
  );
}
