import { Meta, Title } from "@solidjs/meta";
import { SITE_NAME } from "../site";
import { BlogPreview } from "../components/home/BlogPreview";
import { Community } from "../components/home/Community";
import { Ecosystem } from "../components/home/Ecosystem";
import { Hero } from "../components/home/Hero";
import { Maintainers } from "../components/home/Maintainers";
import { Newsletter } from "../components/home/Newsletter";
import { Principles } from "../components/home/Principles";
import { Sponsors } from "../components/home/Sponsors";
import { WhatsNew } from "../components/home/WhatsNew";

const TITLE = "SolidJS: Fine-grained reactive UI. Solid 2.0 is coming";
const DESCRIPTION =
  "Solid is a fast, fine-grained reactive UI library with no virtual DOM. Solid 2.0 adds first-class async, split effects and draft-first stores, and is now a release candidate.";

export default function Home() {
  return (
    <>
      <Title>{TITLE}</Title>
      <Meta name="description" content={DESCRIPTION} />
      <Meta property="og:title" content={TITLE} />
      <Meta property="og:description" content={DESCRIPTION} />
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content={SITE_NAME} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Hero />
      <Principles />
      <WhatsNew />
      <Ecosystem />
      <Community />
      <Sponsors />
      <BlogPreview />
      <Maintainers />
      <Newsletter />
    </>
  );
}
