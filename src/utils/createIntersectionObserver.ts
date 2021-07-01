import { onMount, onCleanup, createSignal } from 'solid-js';

/**
 * Primitive for wrapping Intersection Observer.
 *
 * @param elementRef - Element that should be targetted
 * @param threshold - Indicates at what percentage of the target's visibility the observer's callback should be executed
 * @param root - Root element to target
 * @param rootMargin - Margin around the root. Can have values similar to the CSS margin property
 * @param freezeOnceVisible - Deterines to freeze the observer
 *
 * @example
 * ```ts
 * createIntersectionObserver(document.getElementById("mydiv"))
 * ```
 */
const createIntersectionObserver = (
  elementRef: HTMLElement,
  onLoad: boolean = true,
  threshold: number = 0,
  root: HTMLElement | null = null,
  rootMargin: string = '0%',
  freezeOnceVisible?: () => boolean,
): (() => IntersectionObserverEntry | null) => {
  let observer: IntersectionObserver;
  const [entry, setEntry] = createSignal<IntersectionObserverEntry | null>(null);
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    if (onLoad === true || entry.isIntersecting || entry.intersectionRatio > threshold) {
      setEntry(entry);
    }
  };

  // Bind and then release the observer
  onMount(() => {
    const node = elementRef;
    const frozen = entry()?.isIntersecting && freezeOnceVisible && freezeOnceVisible() !== false;
    const canUse = globalThis.IntersectionObserver;
    if (!canUse || frozen || !node) return;
    const observerParams = { threshold, root, rootMargin };
    observer = new IntersectionObserver(updateEntry, observerParams);
    observer.observe(node);
    onCleanup(() => observer.disconnect);
  });
  return entry;
};

export default createIntersectionObserver;
