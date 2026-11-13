import { Meta, Title } from "@solidjs/meta";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";
import { BlogList } from "../../components/blog/BlogList";
import { absoluteUrl, OG_IMAGE } from "../../site";

const DESCRIPTION = "News, releases and community updates from the SolidJS team.";

export default function BlogIndex() {
  return (
    <>
      <Title>Blog | SolidJS</Title>
      <Meta name="description" content={DESCRIPTION} />
      <Meta property="og:title" content="Blog | SolidJS" />
      <Meta property="og:description" content={DESCRIPTION} />
      <Meta property="og:image" content={absoluteUrl(OG_IMAGE)} />
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
