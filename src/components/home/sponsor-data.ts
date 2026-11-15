import builder from "./logos/builder.webp";
import cloudflare from "./logos/cloudflare.webp";
import coderabbit from "./logos/coderabbit.webp";
import informaticon from "./logos/informaticon.webp";
import interviewpal from "./logos/interviewpal.webp";
import jetbrains from "./logos/jetbrains.webp";
import netlify from "./logos/netlify.webp";
import proton from "./logos/proton.webp";
import saucelabs from "./logos/saucelabs.webp";
import vercel from "./logos/vercel.webp";
import type { Sponsor } from "./data";

/**
 * Logos are one-colour shapes (black on transparent, 72px tall) that the page tints with the theme, so they all look
 * alike. `ratio` is each image's width divided by its height. To add one, trim it tight, make it a single colour with
 * transparency, and add its ratio.
 *
 * Supporters listed in the footer of the previous solidjs.com. That list was flat (no tiers), so
 * everyone is "supporter" until real tiers are confirmed. TODO(content): confirm the current
 * sponsor list and assign gold/silver/bronze tiers before launch.
 */
export const SPONSORS: Sponsor[] = [
  { name: "CodeRabbit", href: "https://www.coderabbit.com/", logo: coderabbit, ratio: 7.0, tier: "supporter" },
  { name: "Informaticon", href: "https://www.informaticon.com/", logo: informaticon, ratio: 7.889, tier: "supporter" },
  { name: "Cloudflare", href: "https://www.cloudflare.com/", logo: cloudflare, ratio: 2.917, tier: "supporter" },
  { name: "Netlify", href: "https://www.netlify.com/", logo: netlify, ratio: 2.472, tier: "supporter" },
  { name: "Builder.io", href: "https://www.builder.io/", logo: builder, ratio: 2.958, tier: "supporter" },
  { name: "Sauce Labs", href: "https://saucelabs.com/", logo: saucelabs, ratio: 4.764, tier: "supporter" },
  { name: "Proton", href: "https://proton.me/", logo: proton, ratio: 3.889, tier: "supporter" },
  { name: "Vercel", href: "https://vercel.com/", logo: vercel, ratio: 4.444, tier: "supporter" },
  { name: "JetBrains", href: "https://www.jetbrains.com/", logo: jetbrains, ratio: 1.014, tier: "supporter" },
  { name: "Interview Pal", href: "https://interviewpal.com/", logo: interviewpal, ratio: 7.25, tier: "supporter" },
];
