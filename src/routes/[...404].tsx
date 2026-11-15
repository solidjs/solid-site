import { HttpStatusCode } from "@kobalte/solidbase/client";
import { Meta, Title } from "@solidjs/meta";
import { Button } from "../components/Button";
import { PageHeader } from "../components/PageHeader";
import { useI18n } from "../i18n";
import { URLS } from "../site";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <>
      <HttpStatusCode code={404} />
      <Title>{t("Page not found | Solid")}</Title>
      <Meta name="robots" content="noindex" />
      <PageHeader
        eyebrow="404"
        title="This page doesn't exist"
        description="The page may have moved, or the link may be mistyped. Try one of these instead."
        actions={
          <>
            <Button href="/" variant="primary" iconAfter="arrow-right">Back home</Button>
            <Button href={URLS.docs}>Read the docs</Button>
            <Button href="/blog">Visit the blog</Button>
          </>
        }
      />
    </>
  );
}
