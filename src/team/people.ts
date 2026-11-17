/**
 * People shown on /team. Only information the previous solidjs.com already published
 * (names, GitHub handles, roles, bios). Images live in public/img/bios.
 */

export interface Person {
  name: string;
  /** GitHub username. */
  github: string;
  /** Absolute public path to a local bio image. */
  img: string;
  role: string;
  bio?: string;
  /** Extra profile links (label + url). */
  links?: { label: string; href: string }[];
}

export interface Supporter {
  name: string;
  company?: string;
  /** Empty string when no public link was published. */
  link: string;
  detail: string;
}

export const githubUrl = (user: string) => `https://github.com/${user}`;

export const maintainers: readonly Person[] = [
  { name: "Ryan Carniato", github: "ryansolid", img: "/img/bios/ryan-carniato.jpeg", role: "Project Founder / OSS Engineer @ Sentry", bio: "Front-end JS performance enthusiast and long time super-fan of fine-grained reactive programming." },
  { name: "David Di Biase", github: "davedbase", img: "/img/bios/david-dibiase.jpeg", role: "Community Coordinator", bio: "David is a full-stack developer based in Toronto." },
  { name: "Milo M.", github: "modderme123", img: "/img/bios/milo-m.svg", role: "Reactivity Designer", bio: "A web developer with an interest in reactive programming and making the web a better place." },
  { name: "Alexis Munsayac", github: "lxsmnsyc", img: "/img/bios/alexis-munsayac.jpeg", role: "Seroval Maintainer", bio: "An all-around web developer and performance enthusiast." },
  { name: "Atila Fassina", github: "atilafassina", img: "/img/bios/atila-fassina.png", role: "Maintainer", bio: "Atila contributes to the Solid documentation and to SolidStart." },
  { name: "Dev Agrawal", github: "devagrawal09", img: "/img/bios/dev-agrawal.jpeg", role: "Library Maintainer", bio: "Builds full-stack Solid apps and teaches others how to build them." },
  // TODO(content): roles for the newest maintainers.
  { name: "ladybluenotes", github: "ladybluenotes", img: "/img/bios/ladybluenotes.jpeg", role: "Maintainer", bio: "Maintains the Solid documentation and is its most active contributor." },
  { name: "Birk Skyum", github: "birkskyum", img: "/img/bios/birk-skyum.jpeg", role: "Maintainer", bio: "Birk works on developer experience across the Solid ecosystem." },
  { name: "Brenley (Brenelz)", github: "brenelz", img: "/img/bios/brenley-brenelz.png", role: "Maintainer", bio: "Contributes to SolidStart and the Solid documentation." },
  { name: "Katja Lutz", github: "katywings", img: "/img/bios/katja-lutz.jpeg", role: "Maintainer" },
  { name: "Gabriel Valfridsson", github: "GabbeV", img: "/img/bios/gabriel-valfridsson.png", role: "Maintainer" },
  { name: "Brendan Allan", github: "Brendonovich", img: "/img/bios/brendan-allan.jpeg", role: "Maintainer" },
];

/** Individuals thanked for design, writing and site work. */
export const contributors: readonly Supporter[] = [
  { name: "Eric Rochon", company: "Brood Studio", link: "https://brood.studio", detail: "Contributed to Solid's brand." },
  { name: "Eran Dod", company: "erandod.com", link: "https://erandod.com", detail: "Supported branding efforts for Solid 2.0." },
  { name: "Sarah Kim", company: "Pilot Interactive", link: "https://www.pilotinteractive.io", detail: "Sarah provides expertise in usability and design." },
  { name: "Les Pruszynski", company: "", link: "https://github.com/seneca", detail: "Les provides support for copywriting on the website and our tutorials." },
  { name: "Joaquín (userquin)", company: "", link: "https://github.com/userquin", detail: "Helped add PWA support to the website." },
  { name: "Erik Demaine", company: "", link: "https://github.com/edemaine", detail: "Contributed documentation and was a major contributor to dark mode on the Solid site." },
  { name: "Évelyne Lachance", company: "", link: "https://github.com/eslachance", detail: "Lead Advocate and head moderator of Solid's Discord community." },
  { name: "Ali Sal", company: "", link: "https://github.com/AlidotSal", detail: "Helps test, design and maintain the Solid site." },
  { name: "David Peter", company: "", link: "https://github.com/sarenji", detail: "Transferred ownership of the `solid` npm package to the project." },
];

/** Ecosystem supporters. */
export const ecosystem: readonly Supporter[] = [
  { name: "Joe Pea", company: "SpaceX, formerly NASA", link: "https://github.com/trusktr", detail: "Founder of Lume." },
  { name: "Moshe Uminer", company: "", link: "https://www.pilotinteractive.io", detail: "Full-stack support and TypeScript guidance." },
  { name: "Steve Sewell", company: "Builder.io", link: "https://www.builder.io", detail: "Founder of Builder.io CMS and creator of JSX-Lite." },
  { name: "Vish Vadlamani", company: "", link: "", detail: "Provides support and insight on Solid." },
  { name: "Alex Lohr", company: "", link: "", detail: "Web developer and engineer." },
  { name: "Caleb Taylor", company: "", link: "https://github.com/aquaductape", detail: "Front-End Developer" },
  { name: "Shaun Regenbaum", company: "402 Media", link: "https://github.com/Shaun-Regenbaum", detail: "Front-end developer and general Solid supporter" },
  { name: "Oren Elbaum", company: "", link: "https://github.com/orenelbaum", detail: "Developer and active ecosystem contributor." },
  { name: "high1", company: "", link: "https://github.com/high1", detail: "Active community contributor and starter maintainer." },
  { name: "Damian Tarnawski", company: "", link: "https://github.com/thetarnav", detail: "Creator of Solid Devtools and a contributor across the Solid ecosystem." },
  { name: "jer3m01", company: "", link: "https://github.com/jer3m01", detail: "Maintainer of Kobalte." },
  { name: "Fabian Hiller", company: "", link: "https://github.com/fabian-hiller", detail: "Creator of Valibot and Formisch, and co-creator of Standard Schema." },
];
