import { dynamic } from "@solidjs/web";
import type { JSX } from "@solidjs/web";
import type { Component } from "solid-js";
import Github from "~icons/simple-icons/github";
import Discord from "~icons/simple-icons/discord";
import Bluesky from "~icons/simple-icons/bluesky";
import X from "~icons/simple-icons/x";
import Reddit from "~icons/simple-icons/reddit";
import Npm from "~icons/simple-icons/npm";
import OpenCollective from "~icons/simple-icons/opencollective";
import Rss from "~icons/lucide/rss";
import Search from "~icons/lucide/search";
import Menu from "~icons/lucide/menu";
import Close from "~icons/lucide/x";
import ChevronDown from "~icons/lucide/chevron-down";
import ArrowRight from "~icons/lucide/arrow-right";
import ArrowUpRight from "~icons/lucide/arrow-up-right";
import Sun from "~icons/lucide/sun";
import Moon from "~icons/lucide/moon";
import Monitor from "~icons/lucide/monitor";
import ExternalLink from "~icons/lucide/external-link";
import Copy from "~icons/lucide/copy";
import Check from "~icons/lucide/check";
import Star from "~icons/lucide/star";
import Download from "~icons/lucide/download";
import Book from "~icons/lucide/book-open";
import GraduationCap from "~icons/lucide/graduation-cap";
import Heart from "~icons/lucide/heart";
import Users from "~icons/lucide/users";
import Shield from "~icons/lucide/shield-check";
import Sparkles from "~icons/lucide/sparkles";
import Zap from "~icons/lucide/zap";
import Layers from "~icons/lucide/layers";
import Code from "~icons/lucide/code-xml";
import Calendar from "~icons/lucide/calendar";
import Newspaper from "~icons/lucide/newspaper";
import Scale from "~icons/lucide/scale";
import Info from "~icons/lucide/info";
import Play from "~icons/lucide/play";
import Warning from "~icons/lucide/triangle-alert";
import Lightbulb from "~icons/lucide/lightbulb";
import Mail from "~icons/lucide/mail";

type SvgIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element;

/**
 * Icon set: brand glyphs from Simple Icons, UI glyphs from Lucide, both compiled to
 * inline SVG at build time by unplugin-icons (SolidBase ships the plugin). They inherit
 * `currentColor` and are tree-shaken to only what is listed here.
 */
const icons = {
  github: Github, discord: Discord, bluesky: Bluesky, x: X, twitter: X, reddit: Reddit,
  npm: Npm, opencollective: OpenCollective,
  rss: Rss, search: Search, menu: Menu, close: Close, "chevron-down": ChevronDown,
  "arrow-right": ArrowRight, "arrow-up-right": ArrowUpRight, sun: Sun, moon: Moon,
  monitor: Monitor, "external-link": ExternalLink, copy: Copy, check: Check, star: Star,
  download: Download, book: Book, "graduation-cap": GraduationCap, heart: Heart,
  users: Users, shield: Shield, sparkles: Sparkles, zap: Zap, layers: Layers, code: Code,
  calendar: Calendar, newspaper: Newspaper, scale: Scale, info: Info, play: Play,
  warning: Warning, lightbulb: Lightbulb, mail: Mail,
} satisfies Record<string, SvgIcon>;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export interface IconProps {
  name: IconName;
  /** Pixel size (width = height). Default 20. */
  size?: number;
  class?: string;
  /** Accessible name. When omitted the icon is decorative (aria-hidden). */
  label?: string;
}

/** Inline SVG icon. Decorative unless `label` is given. */
export const Icon: Component<IconProps> = (props) => {
  const Glyph = dynamic(() => icons[props.name] as SvgIcon);
  return (
    <Glyph
      width={props.size ?? 20}
      height={props.size ?? 20}
      class={props.class}
      aria-hidden={props.label ? undefined : "true"}
      role={props.label ? "img" : undefined}
      aria-label={props.label}
    />
  );
};
