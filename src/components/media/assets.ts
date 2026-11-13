/** Logo variants shipped in /public/img/logos (SVG only; see the README.pdf in that folder for usage rules). */
export type LogoFormat = "SVG";

export interface LogoVariant {
  /** Path under /img/logos, without the extension. */
  id: string;
  title: string;
  description: string;
  /** Which preview surface the artwork is designed for. */
  surface: "light" | "dark";
  formats: LogoFormat[];
}

const SVG: LogoFormat[] = ["SVG"];

export const LOGO_VARIANTS: LogoVariant[] = [
  { id: "lockup/solid-lockup-light", title: "Logo", description: "Primary lockup with sheen, for light backgrounds. Use when the icon is above 24px.", surface: "light", formats: SVG },
  { id: "lockup/solid-lockup-dark", title: "Logo, dark", description: "Primary lockup with sheen, for dark backgrounds. Use when the icon is above 24px.", surface: "dark", formats: SVG },
  { id: "lockup/solid-lockup-flat-light", title: "Logo, flat", description: "Flat lockup for light backgrounds. Use when the icon is 16 to 24px.", surface: "light", formats: SVG },
  { id: "lockup/solid-lockup-flat-dark", title: "Logo, flat, dark", description: "Flat lockup for dark backgrounds. Use when the icon is 16 to 24px.", surface: "dark", formats: SVG },
  { id: "icon/solid-icon-light", title: "Icon", description: "Icon with sheen, for light backgrounds. Use above 24px, and alone below a 16px icon.", surface: "light", formats: SVG },
  { id: "icon/solid-icon-dark", title: "Icon, dark", description: "Icon with sheen, for dark backgrounds. Use above 24px, and alone below a 16px icon.", surface: "dark", formats: SVG },
  { id: "icon/solid-icon-flat-light", title: "Icon, flat", description: "Flat icon for light backgrounds. Use at 24px and under, including favicons.", surface: "light", formats: SVG },
  { id: "icon/solid-icon-flat-dark", title: "Icon, flat, dark", description: "Flat icon for dark backgrounds. Use at 24px and under, including favicons.", surface: "dark", formats: SVG },
  { id: "launch/solid-lockup-2.0-light", title: "Solid 2.0 launch logo", description: "Launch lockup with version chip, for light backgrounds.", surface: "light", formats: SVG },
  { id: "launch/solid-lockup-2.0-dark", title: "Solid 2.0 launch logo, dark", description: "Launch lockup with version chip, for dark backgrounds.", surface: "dark", formats: SVG },
];

export const logoPath = (id: string, format: LogoFormat) => `/img/logos/${id}.${format.toLowerCase()}`;
