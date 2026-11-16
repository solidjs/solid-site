import { createMemo, createSignal, createUniqueId, Errored, For, Loading, onSettled, refresh, Show, untrack } from "solid-js";
import { useI18n } from "../../i18n";
import {
  addLine, createCart, fetchCart, fetchProducts, formatMoney, removeLine, resized, saveCartId, savedCartId, setLineQuantity,
  type Cart, type CartLine, type Product,
} from "../../store/shopify";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { Icon } from "../Icon";
import { Skeleton } from "./Skeleton";
import styles from "./Store.module.css";

/**
 * The product grid and the cart. Loaded on the client only (see routes/store.tsx): prices and stock are fetched live
 * from Shopify, and the cart belongs to the visitor, so none of it belongs in the prerendered HTML.
 */
export default function Shelf() {
  const { t, locale } = useI18n();
  const lang = () => locale().lang;
  const products = createMemo(() => fetchProducts());

  const [cart, setCart] = createSignal<Cart | null>(null);
  const [busy, setBusy] = createSignal(false);
  const [problem, setProblem] = createSignal<string | undefined>();

  // Pick up the cart a visitor left behind. Shopify answers null once it has expired or been checked out.
  onSettled(() => {
    const id = savedCartId();
    if (!id) return;
    fetchCart(id).then(
      (found) => {
        setCart(found);
        if (!found) saveCartId(null);
      },
      () => {},
    );
  });

  async function run(operation: () => Promise<Cart>) {
    setBusy(true);
    setProblem(undefined);
    try {
      const next = await operation();
      setCart(next);
      saveCartId(next.id);
    } catch (error) {
      setProblem(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  /** Adds one of a variant. A saved cart Shopify no longer knows is replaced with a new one. */
  const add = (variantId: string) =>
    run(async () => {
      const current = cart();
      if (!current) return createCart(variantId);
      try {
        return await addLine(current.id, variantId);
      } catch {
        return createCart(variantId);
      }
    });
  const setQuantity = (line: CartLine, quantity: number) =>
    run(() => (quantity < 1 ? removeLine(cart()!.id, line.id) : setLineQuantity(cart()!.id, line.id, quantity)));

  return (
    <>
      <div class={styles.toolbar}>
        <p class={styles.note}>{t("Prices are in US dollars. Checkout happens securely on Shopify.")}</p>
        <Dialog
          title={t("Your cart")}
          triggerClass={styles.cartButton}
          trigger={
            <>
              <Icon name="shopping-cart" size={18} />
              <span>{t("Cart")}</span>
              <span class={styles.count}>{cart()?.totalQuantity ?? 0}</span>
            </>
          }
        >
          <CartPanel cart={cart()} busy={busy()} problem={problem()} lang={lang()} onQuantity={setQuantity} />
        </Dialog>
      </div>

      <Errored
        fallback={(_error, reset) => (
          <div class={styles.status} role="alert">
            <p>{t("The store could not be reached right now.")}</p>
            <Button
              icon="arrow-right"
              onClick={() => {
                refresh(products);
                reset();
              }}
            >
              Try again
            </Button>
          </div>
        )}
      >
        <Loading fallback={<Skeleton />}>
          <Show when={products().length > 0} fallback={<p class={styles.status}>{t("The store is empty at the moment. Check back soon.")}</p>}>
            <ul class={styles.grid} aria-label={t("Products")}>
              <For each={products()}>
                {(product) => <ProductCard product={product} lang={lang()} busy={busy()} cart={cart()} onAdd={add} />}
              </For>
            </ul>
          </Show>
        </Loading>
      </Errored>

      <Show when={problem()}>
        {(message) => <p class={styles.problem} role="alert">{t("Something went wrong: {message}", { message: message() })}</p>}
      </Show>
    </>
  );
}

function ProductCard(props: { product: Product; lang: string; busy: boolean; cart: Cart | null; onAdd: (variantId: string) => void }) {
  const { t } = useI18n();
  // A writable derived signal: starts on the first variant and follows the product if it changes.
  const [selected, setSelected] = createSignal(() => props.product.variants[0].id);
  // The description is clamped to three lines; "Read more" appears only when the text is actually cut off.
  const descriptionId = createUniqueId();
  const [expanded, setExpanded] = createSignal(false);
  const [clamped, setClamped] = createSignal(false);
  let description: HTMLParagraphElement | undefined;
  onSettled(() => {
    if (!description) return;
    const measure = () => {
      // While expanded nothing is cut off, so keep the last answer and leave the button in place.
      if (description && !untrack(expanded)) setClamped(description.scrollHeight > description.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(description);
    return () => observer.disconnect();
  });
  const variant = createMemo(() => props.product.variants.find((v) => v.id === selected()) ?? props.product.variants[0]);
  const image = () => variant().image ?? props.product.image;
  const inCart = () => props.cart?.lines.find((l) => l.variantId === variant().id)?.quantity ?? 0;
  const soldOut = () => !variant().availableForSale;

  return (
    <li class={[styles.card, { [styles.hasItems]: inCart() > 0 }]}>
      <div class={styles.photo}>
        <Show when={image()} fallback={<Icon name="shopping-bag" size={40} />}>
          {(img) => <img src={resized(img().url, 640)} alt={img().altText ?? props.product.title} loading="lazy" decoding="async" />}
        </Show>
        <Show when={soldOut()}>
          <Badge class={styles.badge}>Sold out</Badge>
        </Show>
        <Show when={inCart() > 0}>
          <span class={styles.inCartBadge} role="status">
            <Icon name="check" size={14} />
            {t("{n} in cart", { n: inCart() })}
          </span>
        </Show>
      </div>
      <div class={styles.info}>
        <div class={styles.heading}>
          <h3 class={styles.name}>{props.product.title}</h3>
          <span class={styles.price}>{formatMoney(variant().price, props.lang)}</span>
        </div>
        <Show when={props.product.description}>
          <p id={descriptionId} ref={description} class={[styles.description, { [styles.expanded]: expanded() }]}>
            {props.product.description}
          </p>
          <Show when={clamped() || expanded()}>
            <button type="button" class={styles.more} aria-expanded={expanded() ? "true" : "false"} aria-controls={descriptionId} onClick={() => setExpanded(!expanded())}>
              {expanded() ? t("Show less") : t("Read more")}
            </button>
          </Show>
        </Show>
        <div class={styles.actions}>
          <Show when={props.product.variants.length > 1}>
            <select
              class={styles.select}
              aria-label={t("Option for {name}", { name: props.product.title })}
              value={selected()}
              onChange={(e) => setSelected(e.currentTarget.value)}
            >
              <For each={props.product.variants} keyed={(v) => v.id}>
                {(v) => <option value={v().id}>{v().title}</option>}
              </For>
            </select>
          </Show>
          <Button variant="primary" icon="plus" disabled={props.busy || soldOut()} onClick={() => props.onAdd(variant().id)}>
            {inCart() > 0 ? "Add another" : "Add to cart"}
          </Button>
        </div>
      </div>
    </li>
  );
}

function CartPanel(props: {
  cart: Cart | null;
  busy: boolean;
  problem: string | undefined;
  lang: string;
  onQuantity: (line: CartLine, quantity: number) => void;
}) {
  const { t } = useI18n();
  return (
    <div class={styles.cart}>
      <Show when={props.cart && props.cart.lines.length > 0} fallback={<p class={styles.empty}>{t("Your cart is empty.")}</p>}>
        <ul class={styles.lines}>
          <For each={props.cart!.lines} keyed={(l) => l.id}>
            {(line) => (
              <li class={styles.line}>
                <Show when={line().image} fallback={<span class={styles.thumb} />}>
                  {(img) => <img class={styles.thumb} src={resized(img().url, 160)} alt={img().altText ?? line().title} />}
                </Show>
                <div class={styles.lineInfo}>
                  <span class={styles.lineTitle}>{line().title}</span>
                  <span class={styles.lineMeta}>{line().variantTitle}</span>
                  <span class={styles.lineMeta}>{formatMoney(line().unitPrice, props.lang)}</span>
                </div>
                <div class={styles.stepper}>
                  <button type="button" class={styles.step} disabled={props.busy} aria-label={t("Remove one {name}", { name: line().title })} onClick={() => props.onQuantity(line(), line().quantity - 1)}>
                    <Icon name={line().quantity === 1 ? "trash" : "minus"} size={14} />
                  </button>
                  <span class={styles.qty} aria-live="polite">{line().quantity}</span>
                  <button type="button" class={styles.step} disabled={props.busy} aria-label={t("Add one {name}", { name: line().title })} onClick={() => props.onQuantity(line(), line().quantity + 1)}>
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
        <div class={styles.subtotal}>
          <span>{t("Subtotal")}</span>
          <strong>{formatMoney(props.cart!.subtotal, props.lang)}</strong>
        </div>
        <p class={styles.fine}>{t("Shipping and taxes are calculated at checkout.")}</p>
        <Button href={props.cart!.checkoutUrl} variant="primary" size="lg" block iconAfter="arrow-up-right">
          Checkout
        </Button>
      </Show>
      <Show when={props.problem}>
        <p class={styles.problem} role="alert">{props.problem}</p>
      </Show>
    </div>
  );
}
