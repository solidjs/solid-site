/**
 * Keeps menus and tab lists from scrolling the page.
 *
 * Kobalte scrolls the focused or selected item of a list into view (`scrollIntoView({ block: "nearest" })`) and its
 * focus trap focuses items without `preventScroll`. Both also scroll the page: a dropdown item that has not been
 * positioned yet sits at the top-left of the document, so opening a menu on a scrolled page threw the viewport back to
 * the top, and the selected tab on the home page scrolled the whole page down to it on load.
 *
 * - Inside an element marked `data-no-scroll` or the sticky header, `scrollIntoView` does nothing and `focus()` never
 *   scrolls. The header is always on screen, and the marked lists are short, so there is nothing to scroll to. (A
 *   menu trigger calls scrollIntoView on itself when an arrow key opens its menu, which scrolled the page.)
 */
let installed = false;

export function installScrollGuard() {
  if (installed || typeof Element === "undefined") return;
  installed = true;
  const scrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (this: Element, arg?: boolean | ScrollIntoViewOptions) {
    if (this.closest("[data-no-scroll], header")) return;
    scrollIntoView.call(this, arg as ScrollIntoViewOptions);
  };
  const focus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function (this: HTMLElement, options?: FocusOptions) {
    focus.call(this, this.closest("[data-no-scroll], header") ? { ...options, preventScroll: true } : options);
  };
}
