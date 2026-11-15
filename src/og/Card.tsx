/**
 * The Open Graph card, written as JSX. It is rendered to a PNG at build time by @solidjs/ogp
 * (satori): flexbox only, inline styles only, and every element with several children needs display:flex.
 * Colours arrive as props (read from src/theme/tokens.css by render.tsx), so a brand change needs no edit here.
 */
import type { OgPage } from "./pages";

export interface OgColors {
  bg: string;
  text: string;
  muted: string;
  brand: string;
  brandText: string;
  border: string;
  glow: string;
}

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);
const titleSize = (title: string) => (title.length > 64 ? 56 : title.length > 40 ? 68 : 84);

export function Card(props: { page: OgPage; colors: OgColors; logo: string; host: string }) {
  const c = props.colors;
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        "font-family": "Geist",
        color: c.text,
        "background-color": c.bg,
        "background-image": `radial-gradient(circle at 88% 8%, ${c.glow} 0%, transparent 52%)`,
      }}
    >
      <div style={{ display: "flex", "align-items": "center", "justify-content": "space-between" }}>
        <div style={{ display: "flex", "align-items": "center" }}>
          <img src={props.logo} style={{ width: "56px", height: "52px" }} />
          <div style={{ display: "flex", "margin-left": "18px", "font-size": "34px", "font-weight": 600, "letter-spacing": "0.14em" }}>
            SOLID
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            "border-radius": "999px",
            border: `2px solid ${c.border}`,
            "font-size": "26px",
            "font-weight": 600,
            color: c.brandText,
          }}
        >
          {props.page.kicker}
        </div>
      </div>

      <div style={{ display: "flex", "flex-direction": "column" }}>
        <div
          style={{
            display: "flex",
            "font-size": `${titleSize(props.page.title)}px`,
            "font-weight": 700,
            "line-height": 1.06,
            "letter-spacing": "-0.035em",
            "text-wrap": "balance",
          }}
        >
          {props.page.title}
        </div>
        <div style={{ display: "flex", "margin-top": "26px", "font-size": "30px", "line-height": 1.35, color: c.muted }}>
          {props.page.description ? truncate(props.page.description, 118) : ""}
        </div>
      </div>

      <div style={{ display: "flex", "align-items": "center", "justify-content": "space-between", "font-size": "26px", color: c.muted }}>
        <div style={{ display: "flex", color: c.brandText, "font-weight": 600 }}>{props.host}</div>
        <div style={{ display: "flex" }}>{props.page.meta ?? ""}</div>
      </div>
    </div>
  );
}
