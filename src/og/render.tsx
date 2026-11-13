/**
 * Node-only. Loaded through Vite's ssrLoadModule by scripts/generate-og.ts so this JSX is compiled
 * for the server (the form @solidjs/ogp/server expects). Never import this from the app.
 */
import { createOpenGraphImage } from "@solidjs/ogp/server";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { SITE_URL } from "../site";
import { Card, type OgColors } from "./Card";
import { OG_SIZE, type OgPage } from "./pages";

const root = new URL("../../", import.meta.url);
const require = createRequire(import.meta.url);

/** Reads `--name: value;` declarations from the light-theme (`:root`) block of tokens.css. */
function lightTokens(): Record<string, string> {
  const css = readFileSync(new URL("src/theme/tokens.css", root), "utf8");
  // Anchor to the selector at the start of a line: the file's header comment also mentions "Swapping ... :root".
  const match = /^:root\s*\{([^}]*)\}/m.exec(css);
  if (!match) throw new Error("tokens.css has no :root block");
  const tokens: Record<string, string> = {};
  for (const [, name, value] of match[1].matchAll(/--([\w-]+):\s*([^;]+);/g)) tokens[name] = value.trim();
  if (!/color-scheme:\s*light/.test(match[1])) {
    throw new Error("Parsed the wrong block of tokens.css: the :root block must declare color-scheme: light");
  }
  return tokens;
}

const hexToRgba = (hex: string, alpha: number) => {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`Expected a 6-digit hex colour for the OG glow, got "${hex}"`);
  const n = parseInt(m[1], 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

function colors(): OgColors {
  const t = lightTokens();
  const need = (k: string) => t[k] ?? (() => { throw new Error(`tokens.css (light) is missing --${k}`); })();
  return {
    bg: need("color-bg"),
    text: need("color-text"),
    muted: need("color-text-muted"),
    brand: need("color-brand"),
    brandText: need("color-brand-text"),
    border: need("color-border-strong"),
    glow: hexToRgba(need("color-brand"), 0.16),
  };
}

const font = (weight: 400 | 600 | 700) =>
  readFileSync(require.resolve(`@fontsource/geist/files/geist-latin-${weight}-normal.woff`));

const logo = () =>
  `data:image/svg+xml;base64,${readFileSync(new URL("public/img/logos/icon/solid-icon-light.svg", root)).toString("base64")}`;

/** Renders every page and returns [file, png] pairs. */
export async function renderAll(pages: OgPage[]): Promise<Array<[string, Uint8Array]>> {
  const palette = colors();
  const logoUri = logo();
  const host = new URL(SITE_URL).host.replace(/^www\./, "");
  const fonts = ([400, 600, 700] as const).map((weight) => ({ name: "Geist", data: font(weight), weight, style: "normal" as const }));
  const out: Array<[string, Uint8Array]> = [];
  for (const page of pages) {
    const res = await createOpenGraphImage(() => <Card page={page} colors={palette} logo={logoUri} host={host} />, {
      ...OG_SIZE,
      fonts,
    });
    out.push([page.file, new Uint8Array(await res.arrayBuffer())]);
  }
  return out;
}
