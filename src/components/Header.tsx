import { Drawer } from "@kobalte/core/drawer";
import { NavigationMenu } from "@kobalte/core/navigation-menu";
import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, For, onFlush, onSettled, Show } from "solid-js";
import { isExternalHref, isNavGroup, NAV, SITE_NAME, URLS, type NavLink } from "../site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

/** Is `href` the current page (or a parent section of it)? External links are never current. */
const isCurrent = (href: string, pathname: string) =>
  !isExternalHref(href) && (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

const linkAttrs = (link: NavLink) =>
  isExternalHref(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

/**
 * Kobalte's NavigationMenu opens a menu when the pointer rests on its trigger, but a mouse press on an open trigger
 * closes it again. A visitor who hovers and then clicks therefore sees the dropdown flash open and vanish. Swallow
 * the first mouse press that follows a hover-open so the click keeps the menu open (a second click, Escape or moving
 * away closes it). Keyboard, touch and click-opened menus keep Kobalte's own toggle behaviour.
 */
function keepOpenOnHoverClick(el: HTMLElement) {
  let openedByHover = false;
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
  return (
    <NavigationMenu class={styles.menu} aria-label="Primary" delayDuration={80} skipDelayDuration={200}>
      <For each={NAV} keyed={(e) => e.label}>
        {(entry) => (
          <NavigationMenu.Menu>
            <Show
              when={(() => { const e = entry(); return isNavGroup(e) ? e : undefined; })()}
              fallback={
                <NavigationMenu.Trigger
                  as="a"
                  class={styles.trigger}
                  href={(entry() as NavLink).href}
                  aria-current={isCurrent((entry() as NavLink).href, location.pathname) ? "page" : undefined}
                >
                  {entry().label}
                </NavigationMenu.Trigger>
              }
            >
              {(group) => (
                <>
                  <NavigationMenu.Trigger class={styles.trigger} ref={keepOpenOnHoverClick}>
                    {group().label}
                    <Icon name="chevron-down" size={14} class={styles.caret} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Portal>
                    <NavigationMenu.Content class={styles.content}>
                      <For each={group().items} keyed={(i) => i.href}>
                        {(item) => (
                          <NavigationMenu.Item
                            class={styles.item}
                            href={item().href}
                            aria-current={isCurrent(item().href, location.pathname) ? "page" : undefined}
                            {...linkAttrs(item())}
                          >
                            <Show when={item().icon}>
                              <span class={styles.itemIcon}><Icon name={item().icon!} size={18} /></span>
                            </Show>
                            <span class={styles.itemText}>
                              <span class={styles.itemLabel}>
                                {item().label}
                                <Show when={isExternalHref(item().href)}>
                                  <Icon name="arrow-up-right" size={12} class={styles.itemExt} />
                                </Show>
                              </span>
                              <Show when={item().description}>
                                <span class={styles.itemDesc}>{item().description}</span>
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
      <NavigationMenu.Viewport class={styles.viewport} />
    </NavigationMenu>
  );
}

function MobileNav() {
  const location = useLocation();
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
      <Drawer.Trigger class={styles.iconButton} aria-label="Open menu">
        <Icon name="menu" size={20} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay class={styles.overlay} />
        <Drawer.Content class={styles.drawer}>
          <div class={styles.drawerHead}>
            <Drawer.Title class="visually-hidden">Menu</Drawer.Title>
            <Logo height={24} />
            <Drawer.CloseButton class={styles.iconButton} aria-label="Close menu">
              <Icon name="close" size={20} />
            </Drawer.CloseButton>
          </div>
          <nav aria-label="Mobile" class={styles.mobileNav}>
            <For each={NAV} keyed={(e) => e.label}>
              {(entry) => (
                <Show
                  when={(() => { const e = entry(); return isNavGroup(e) ? e : undefined; })()}
                  fallback={
                    <a class={styles.mobileTop} href={(entry() as NavLink).href} onClick={() => onFlush(() => setOpen(false))}>
                      {entry().label}
                    </a>
                  }
                >
                  {(group) => (
                    <section class={styles.mobileGroup}>
                      <h2 class={styles.mobileHeading}>{group().label}</h2>
                      <ul role="list" class={styles.mobileList}>
                        <For each={group().items} keyed={(i) => i.href}>
                          {(item) => (
                            <li>
                              <a
                                class={styles.mobileLink}
                                href={item().href}
                                aria-current={isCurrent(item().href, location.pathname) ? "page" : undefined}
                                onClick={() => onFlush(() => setOpen(false))}
                                {...linkAttrs(item())}
                              >
                                <Show when={item().icon}><Icon name={item().icon!} size={18} /></Show>
                                {item().label}
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}

/** Sticky, blurred site header: logo, Kobalte NavigationMenu (desktop), GitHub, theme menu, Kobalte Drawer (mobile). */
export function Header() {
  return (
    <header class={styles.header}>
      <div class={styles.bar}>
        <a href="/" class={styles.brand} aria-label={`${SITE_NAME} home`}>
          <Logo height={26} />
        </a>
        <div class={styles.desktop}>
          <DesktopNav />
        </div>
        <div class={styles.actions}>
          <a class={styles.iconButton} href={URLS.github} target="_blank" rel="noopener noreferrer" aria-label="Solid on GitHub (opens in a new tab)">
            <Icon name="github" size={18} />
          </a>
          <ThemeToggle />
          <div class={styles.mobile}>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
