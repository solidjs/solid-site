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

/**
 * Favicons per scheme. The two static <link rel="icon" media="(prefers-color-scheme: ...)"> tags in Document.tsx follow
 * the operating system, so they are wrong whenever the site's own theme differs (a visitor who picked dark on a light
 * OS). The script below, placed right after those tags, and syncFavicon() after a theme change point a single icon at
 * the one for the site's current theme.
 */
export const FAVICON_LIGHT = "/img/logos/icon/solid-icon-flat-light.svg";
export const FAVICON_DARK = "/img/logos/icon/solid-icon-flat-dark.svg";
export const FAVICON_SCRIPT = `(function(){var t=document.documentElement.dataset.theme||"",l=document.querySelectorAll('link[rel="icon"][data-favicon]');if(!l.length)return;var i=l[0];for(var n=1;n<l.length;n++)l[n].remove();i.removeAttribute("media");i.href=/dark/.test(t)?"${FAVICON_DARK}":"${FAVICON_LIGHT}"})();`;

/** Point the favicon at the variant for the site's current theme (see FAVICON_SCRIPT). */
export const syncFavicon = (): void => {
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-favicon]');
  if (!link) return;
  link.removeAttribute("media");
  link.href = /dark/.test(document.documentElement.dataset.theme ?? "") ? FAVICON_DARK : FAVICON_LIGHT;
};

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

/** Point <meta name="theme-color"> and the favicon at the active theme (the static per-scheme tags in Document.tsx are the no-JS fallback). */
export const syncThemeColor = (): void => {
  syncFavicon();
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
