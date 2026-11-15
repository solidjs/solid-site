import { Drawer } from "@kobalte/core/drawer";
import { NavigationMenu } from "@kobalte/core/navigation-menu";
import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, For, onFlush, onSettled, Show } from "solid-js";
import { stripLocale, useI18n } from "../i18n";
import { isExternalHref, isNavGroup, NAV, SITE_NAME, SOCIAL_LINKS, type NavLink } from "../site";
import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

/** Is `href` the current page (or a parent section of it)? External links are never current. */
const isCurrent = (href: string, fullPathname: string) => {
  const pathname = stripLocale(fullPathname);
  return !isExternalHref(href) && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
};

const linkAttrs = (link: NavLink) =>
  isExternalHref(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

/** The dropdown trigger most recently hovered or focused (see keepOpenOnHoverClick). */
let activeTrigger: HTMLElement | undefined;

/**
 * Kobalte's NavigationMenu opens a menu when the pointer rests on its trigger, but a mouse press on an open trigger
 * closes it again. A visitor who hovers and then clicks therefore sees the dropdown flash open and vanish. Swallow
 * the first mouse press that follows a hover-open so the click keeps the menu open (a second click, Escape or moving
 * away closes it). Keyboard, touch and click-opened menus keep Kobalte's own toggle behaviour.
 */
function keepOpenOnHoverClick(el: HTMLElement) {
  let openedByHover = false;
  // The trigger the pointer or focus is on is where the dropdown must line up. Kobalte positions the panel before it
  // marks the trigger expanded, so asking for the "expanded" trigger at that moment finds none.
  const mark = () => { activeTrigger = el; };
  el.addEventListener("pointerenter", mark);
  el.addEventListener("focus", mark);
  el.addEventListener("pointerenter", (e) => {
    openedByHover = e.pointerType !== "touch" && el.getAttribute("aria-expanded") !== "true";
  });
  el.addEventListener("pointerleave", () => { openedByHover = false; });
  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    // Opened by hover and still open: keep it. Anything else falls through to Kobalte.
    if (openedByHover && el.getAttribute("aria-expanded") === "true") {
      e.stopPropagation();
      openedByHover = false;
    }
  });
}

function DesktopNav() {
  const location = useLocation();
  const { t, localePath } = useI18n();
  // Kobalte's NavigationMenu.Portal mounts into the viewport through a conditional `mount` getter. In dev, Solid 2
  // throws PRIMITIVE_IN_EFFECT_CALLBACK when Portal reads it (it creates a memo in an effect callback), which halts
  // reactivity and leaves menus "open" but empty. Our own lazy getter over a plain variable wins over Kobalte's and
  // creates nothing, and the content still mounts inside the viewport so focus stays within the menu.
  let viewportEl: HTMLElement | undefined;
  const portalProps = { get mount() { return viewportEl; } };
  // Kobalte anchors the shared dropdown viewport to the whole menu bar, which centres it under the bar. Anchor it to
  // the trigger that is open instead, so each dropdown lines up with its own trigger.
  // The last rect is remembered so the panel keeps its place while it fades out (no trigger is expanded by then).
  let lastRect: DOMRect | undefined;
  const activeTriggerRect = (root?: Element) => {
    const trigger = activeTrigger?.isConnected ? activeTrigger : root?.querySelector<HTMLElement>('[aria-expanded="true"]');
    const rect = trigger?.getBoundingClientRect();
    return (lastRect = rect ?? lastRect);
  };
  // Animation state. Kobalte unmounts the dropdown panel the moment the menu closes, which leaves nothing to fade, so
  // the panel is kept mounted for the length of the exit. `switching` is true while one dropdown replaces another, so
  // the panel glides to the next trigger (it must not glide on the first open, or it would fly in from the corner).
  const EXIT_MS = 200;
  const [keepMounted, setKeepMounted] = createSignal(false);
  const [switching, setSwitching] = createSignal(false);
  // True while a dropdown is open. Kobalte's own data-expanded/data-closed lag behind it (and differ between pointer and
  // keyboard), so the panel's visibility follows this instead.
  const [menuOpen, setMenuOpen] = createSignal(false);
  let isOpen = false;
  let exitTimer: ReturnType<typeof setTimeout> | undefined;
  const onValueChange = (value?: string | null) => {
    // Plain links (Blog) are menu triggers to Kobalte too, with no panel to show. Only a trigger that owns a dropdown
    // (marked data-has-menu) counts as open, otherwise an empty panel appears under the link.
    const trigger = value ? document.querySelector(`[data-kb-menu-value-trigger="${CSS.escape(String(value))}"]`) : null;
    const open = !!trigger?.hasAttribute("data-has-menu");
    clearTimeout(exitTimer);
    setMenuOpen(open);
    if (open) {
      setSwitching(isOpen);
      setKeepMounted(true);
    } else {
      setSwitching(false);
      exitTimer = setTimeout(() => {
        // Content is held until the viewport reports an animation end (see Header.module.css); the fade is over now.
        viewportEl?.dispatchEvent(new Event("animationend"));
        setKeepMounted(false);
      }, EXIT_MS);
    }
    isOpen = open;
  };
  return (
    <NavigationMenu class={styles.menu} aria-label={t("Primary")} delayDuration={80} skipDelayDuration={200} placement="bottom-start" getAnchorRect={activeTriggerRect} forceMount={keepMounted()} onValueChange={onValueChange} data-switching={switching() ? "" : undefined} data-open={menuOpen() ? "" : undefined}>
      <For each={NAV} keyed={(e) => e.label}>
        {(entry) => (
          <NavigationMenu.Menu>
            <Show
              when={(() => { const e = entry(); return isNavGroup(e) ? e : undefined; })()}
              fallback={
                <NavigationMenu.Trigger
                  as="a"
                  class={styles.trigger}
                  href={localePath((entry() as NavLink).href)}
                  aria-current={isCurrent((entry() as NavLink).href, location.pathname) ? "page" : undefined}
                >
                  {t(entry().label)}
                </NavigationMenu.Trigger>
              }
            >
              {(group) => (
                <>
                  <NavigationMenu.Trigger class={styles.trigger} ref={keepOpenOnHoverClick} data-has-menu>
                    {t(group().label)}
                    <Icon name="chevron-down" size={14} class={styles.caret} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Portal {...portalProps}>
                    <NavigationMenu.Content class={styles.content} data-no-scroll>
                      <For each={group().items} keyed={(i) => i.href}>
                        {(item) => (
                          <NavigationMenu.Item
                            class={styles.item}
                            href={localePath(item().href)}
                            aria-current={isCurrent(item().href, location.pathname) ? "page" : undefined}
                            {...linkAttrs(item())}
                          >
                            <Show when={item().icon}>
                              <span class={styles.itemIcon}><Icon name={item().icon!} size={18} /></span>
                            </Show>
                            <span class={styles.itemText}>
                              <span class={styles.itemLabel}>
                                {t(item().label)}
                                <Show when={isExternalHref(item().href)}>
                                  <Icon name="arrow-up-right" size={12} class={styles.itemExt} />
                                </Show>
                              </span>
                              <Show when={t(item().description!)}>
                                <span class={styles.itemDesc}>{t(item().description!)}</span>
                              </Show>
                            </span>
                          </NavigationMenu.Item>
                        )}
                      </For>
                    </NavigationMenu.Content>
                  </NavigationMenu.Portal>
                </>
              )}
            </Show>
          </NavigationMenu.Menu>
        )}
      </For>
      <NavigationMenu.Viewport class={styles.viewport} ref={viewportEl} />
    </NavigationMenu>
  );
}

function MobileNav() {
  const location = useLocation();
  const { t, localePath } = useI18n();
  const [open, setOpen] = createSignal(false);
  // Close the drawer after client-side navigation.
  createEffect(
    () => location.pathname,
    () => { setOpen(false); },
  );
  // The trigger hides at >= 56rem but the portalled drawer would stay open: close it when the desktop layout kicks in.
  onSettled(() => {
    const mq = matchMedia("(min-width: 56rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  });
  return (
    <Drawer side="right" open={open()} onOpenChange={setOpen}>
      <Drawer.Trigger class={styles.iconButton} aria-label={t("Open menu")}>
        <Icon name="menu" size={20} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay class={styles.overlay} />
        <Drawer.Content class={styles.drawer} data-no-scroll>
          <div class={styles.drawerHead}>
            <Drawer.Title class="visually-hidden">Menu</Drawer.Title>
            <Logo height={24} />
            <Drawer.CloseButton class={styles.iconButton} aria-label={t("Close menu")}>
              <Icon name="close" size={20} />
            </Drawer.CloseButton>
          </div>
          <nav aria-label={t("Mobile")} class={styles.mobileNav}>
            <For each={NAV} keyed={(e) => e.label}>
              {(entry) => (
                <Show
                  when={(() => { const e = entry(); return isNavGroup(e) ? e : undefined; })()}
                  fallback={
                    <a class={styles.mobileTop} href={localePath((entry() as NavLink).href)} onClick={() => onFlush(() => setOpen(false))}>
                      {t(entry().label)}
                    </a>
                  }
                >
                  {(group) => (
                    <section class={styles.mobileGroup}>
                      <h2 class={styles.mobileHeading}>{t(group().label)}</h2>
                      <ul role="list" class={styles.mobileList}>
                        <For each={group().items} keyed={(i) => i.href}>
                          {(item) => (
                            <li>
                              <a
                                class={styles.mobileLink}
                                href={localePath(item().href)}
                                aria-current={isCurrent(item().href, location.pathname) ? "page" : undefined}
                                onClick={() => onFlush(() => setOpen(false))}
                                {...linkAttrs(item())}
                              >
                                <Show when={item().icon}><Icon name={item().icon!} size={18} /></Show>
                                {t(item().label)}
                              </a>
                            </li>
                          )}
                        </For>
                      </ul>
                    </section>
                  )}
                </Show>
              )}
            </For>
          </nav>
          <div class={styles.mobileSocial}>
            <For each={SOCIAL_LINKS} keyed={(s) => s.href}>
              {(social) => (
                <a class={styles.iconButton} href={social().href} target="_blank" rel="noopener noreferrer" aria-label={t("Solid on {network} (opens in a new tab)", { network: social().label })}>
                  <Icon name={social().icon} size={18} />
                </a>
              )}
            </For>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}

/**
 * Sticky, blurred site header: logo, Kobalte NavigationMenu (desktop), social links, theme menu, Kobalte Drawer (mobile).
 * It slides out of view while the footer is on screen (so the footer gets the whole viewport) and returns on scroll up.
 */
export function Header() {
  const { t, localePath } = useI18n();
  const [hidden, setHidden] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);
  onSettled(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    let footerVisible = false;
    const update = () => {
      setHidden(footerVisible && window.scrollY > 64);
      setScrolled(window.scrollY > 8);
    };
    update();
    const io = new IntersectionObserver(([entry]) => { footerVisible = entry.isIntersecting; update(); });
    io.observe(footer);
    window.addEventListener("scroll", update, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", update); };
  });
  return (
    <header class={styles.header} data-hidden={hidden() ? "" : undefined} data-scrolled={scrolled() ? "" : undefined} inert={hidden()}>
      <div class={styles.bar}>
        <a href={localePath("/")} class={styles.brand} aria-label={t("{name} home", { name: SITE_NAME })}>
          <Logo height={scrolled() ? 28.8 : 32} wordScale={0.85} />
          <div class={styles.badge} aria-hidden="true">2.0</div>
        </a>
        <div class={styles.desktop}>
          <DesktopNav />
        </div>
        <div class={styles.actions}>
          <For each={SOCIAL_LINKS} keyed={(s) => s.href}>
            {(social, i) => (
              <a
                class={`${styles.iconButton} ${i() > 0 ? styles.social : ""}`}
                href={social().href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Solid on {network} (opens in a new tab)", { network: social().label })}
              >
                <Icon name={social().icon} size={18} />
              </a>
            )}
          </For>
          <LanguageSwitcher />
          <ThemeToggle />
          <div class={styles.mobile}>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
