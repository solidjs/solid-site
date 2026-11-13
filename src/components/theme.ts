/** Theme persistence helpers. The pre-hydration script in Document.tsx applies the stored value before first paint. */
export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";
export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script (ES5). Sets <html data-theme> before paint; defaults to the OS preference. It also mirrors an explicit
 * choice into the `theme` cookie because SolidBase's own bootstrap script (injected later in <head>) reads that cookie
 * and would otherwise override the attribute with "sdark"/"slight" (CSS treats those as aliases of dark/light).
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement,t,s;try{s=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}t=s;if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t;if(s===t)document.cookie="theme="+t+";max-age=31536000;path=/;samesite=lax"})();`;

export const readStoredPreference = (): ThemePreference => {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
};

export const resolveTheme = (pref: ThemePreference): ResolvedTheme =>
  pref === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : pref;

/** Point <meta name="theme-color"> at the active --color-bg (the static per-scheme tags in Document.tsx are the no-JS fallback). */
export const syncThemeColor = (): void => {
  const bg = getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim();
  if (!bg) return;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.removeAttribute("media");
    m.content = bg;
  });
};

/** Apply a preference to <html> and persist it ("system" clears storage). */
export const applyPreference = (pref: ThemePreference): void => {
  document.documentElement.dataset.theme = resolveTheme(pref);
  syncThemeColor();
  syncThemeCookie(pref);
  try {
    if (pref === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* storage unavailable (private mode): the choice lasts for this page view only */
  }
};

/** Keep SolidBase's cookie in step with our preference (see THEME_INIT_SCRIPT). */
export const syncThemeCookie = (pref: ThemePreference): void => {
  document.cookie =
    pref === "system" ? "theme=;max-age=0;path=/;samesite=lax" : `theme=${pref};max-age=31536000;path=/;samesite=lax`;
};
