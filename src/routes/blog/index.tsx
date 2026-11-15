import { Meta, Title } from "@solidjs/meta";
import { useI18n } from "../../i18n";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";
import { BlogList } from "../../components/blog/BlogList";

const DESCRIPTION = "News, releases and community updates from the Solid team.";

export default function BlogIndex() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t("Blog | Solid")}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <Meta property="og:title" content={t("Blog | Solid")} />
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
