/** Logo variants shipped in /public/img/logo. Only formats that exist on disk are listed. */
export type LogoFormat = "SVG" | "PNG" | "EPS" | "JPG" | "PDF";

export interface LogoVariant {
  id: string;
  title: string;
  description: string;
  /** Which preview surface the artwork is designed for. */
  surface: "light" | "dark";
  formats: LogoFormat[];
}

const ALL: LogoFormat[] = ["SVG", "PNG", "EPS", "JPG", "PDF"];

export const LOGO_VARIANTS: LogoVariant[] = [
  { id: "with-wordmark", title: "Logo with wordmark", description: "For light backgrounds.", surface: "light", formats: ALL },
  { id: "dark-with-wordmark", title: "Logo with wordmark, dark", description: "For dark backgrounds.", surface: "dark", formats: ALL },
  { id: "without-wordmark", title: "Logo mark", description: "Symbol only, for light backgrounds.", surface: "light", formats: ALL },
  // No PNG exists for this variant in public/img/logo.
  { id: "dark-without-wordmark", title: "Logo mark, dark", description: "Symbol only, for dark backgrounds.", surface: "dark", formats: ["SVG", "EPS", "JPG", "PDF"] },
  { id: "wordmark", title: "Wordmark", description: "Text only, for light backgrounds.", surface: "light", formats: ALL },
  { id: "dark-wordmark", title: "Wordmark, dark", description: "Text only, for dark backgrounds.", surface: "dark", formats: ALL },
];

export const logoPath = (id: string, format: LogoFormat) => `/img/logo/${id}/logo.${format.toLowerCase()}`;
