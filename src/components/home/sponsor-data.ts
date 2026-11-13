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
 * Supporters listed in the footer of the previous solidjs.com. That list was flat (no tiers), so
 * everyone is "supporter" until real tiers are confirmed. TODO(content): confirm the current
 * sponsor list and assign gold/silver/bronze tiers before launch.
 */
export const SPONSORS: Sponsor[] = [
  { name: "CodeRabbit", href: "https://www.coderabbit.com/", logo: coderabbit, tier: "supporter" },
  { name: "Informaticon", href: "https://www.informaticon.com/", logo: informaticon, tier: "supporter" },
  { name: "Cloudflare", href: "https://www.cloudflare.com/", logo: cloudflare, tier: "supporter" },
  { name: "Netlify", href: "https://www.netlify.com/", logo: netlify, tier: "supporter" },
  { name: "Builder.io", href: "https://www.builder.io/", logo: builder, tier: "supporter" },
  { name: "Sauce Labs", href: "https://saucelabs.com/", logo: saucelabs, tier: "supporter" },
  { name: "Proton", href: "https://proton.me/", logo: proton, tier: "supporter" },
  { name: "Vercel", href: "https://vercel.com/", logo: vercel, tier: "supporter" },
  { name: "JetBrains", href: "https://www.jetbrains.com/", logo: jetbrains, tier: "supporter" },
  { name: "Interview Pal", href: "https://interviewpal.com/", logo: interviewpal, tier: "supporter" },
];
