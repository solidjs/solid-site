/**
 * Minimal Shopify Storefront API client for the Solid Store (solidjs.myshopify.com): the product collection and a cart.
 * Plain `fetch` against the GraphQL endpoint, so there is no SDK to ship. The Storefront token is a public, read-only
 * token meant for browsers; it can list products and build a cart, nothing else. Checkout happens on Shopify.
 *
 * public/_headers must allow SHOPIFY_ORIGIN in `connect-src` for the /store routes.
 */

export const SHOPIFY_ORIGIN = "https://solidjs.myshopify.com";
const ENDPOINT = `${SHOPIFY_ORIGIN}/api/2026-07/graphql.json`;
const STOREFRONT_TOKEN = "98a442cbab63cb1697002bfae7dc648a";
/** The collection shown in the store. */
const COLLECTION_ID = "gid://shopify/Collection/285612933298";
const CART_STORAGE_KEY = "solid-store-cart";

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  image: { url: string; altText: string | null } | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  availableForSale: boolean;
  image: { url: string; altText: string | null } | null;
  variants: Variant[];
}

export interface CartLine {
  id: string;
  quantity: number;
  title: string;
  variantTitle: string;
  image: { url: string; altText: string | null } | null;
  unitPrice: Money;
  total: Money;
  variantId: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: Money;
  lines: CartLine[];
}

async function query<T>(gql: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN },
    body: JSON.stringify({ query: gql, variables }),
  });
  if (!res.ok) throw new Error(`The store answered ${res.status}.`);
  const body = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (body.errors?.length || !body.data) throw new Error(body.errors?.[0]?.message ?? "The store sent an empty answer.");
  return body.data;
}

/** Shopify's image CDN resizes on request. */
export const resized = (url: string, width: number) => `${url}${url.includes("?") ? "&" : "?"}width=${width}`;

export const formatMoney = (money: Money, lang: string) =>
  new Intl.NumberFormat(lang, { style: "currency", currency: money.currencyCode }).format(Number(money.amount));

const IMAGE = "url altText";

interface RawProduct {
  id: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  variants: { nodes: Variant[] };
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await query<{ collection: { products: { nodes: RawProduct[] } } | null }>(
    `query Products($id: ID!) {
      collection(id: $id) {
        products(first: 50) {
          nodes {
            id title description availableForSale
            featuredImage { ${IMAGE} }
            variants(first: 50) { nodes { id title availableForSale price { amount currencyCode } image { ${IMAGE} } } }
          }
        }
      }
    }`,
    { id: COLLECTION_ID },
  );
  return (data.collection?.products.nodes ?? [])
    .filter((p) => p.variants.nodes.length > 0)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      availableForSale: p.availableForSale,
      image: p.featuredImage,
      variants: p.variants.nodes,
    }));
}

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) {
    nodes {
      id quantity
      cost { totalAmount { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          id title
          image { ${IMAGE} }
          price { amount currencyCode }
          product { title }
        }
      }
    }
  }`;

interface RawCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: Money };
      merchandise: { id: string; title: string; image: CartLine["image"]; price: Money; product: { title: string } };
    }[];
  };
}

const toCart = (raw: RawCart): Cart => ({
  id: raw.id,
  checkoutUrl: raw.checkoutUrl,
  totalQuantity: raw.totalQuantity,
  subtotal: raw.cost.subtotalAmount,
  lines: raw.lines.nodes.map((l) => ({
    id: l.id,
    quantity: l.quantity,
    title: l.merchandise.product.title,
    variantTitle: l.merchandise.title,
    image: l.merchandise.image,
    unitPrice: l.merchandise.price,
    total: l.cost.totalAmount,
    variantId: l.merchandise.id,
  })),
});

interface CartPayload {
  cart: RawCart | null;
  userErrors: { message: string }[];
}

async function mutate(name: string, args: string, variables: Record<string, unknown>, decl: string): Promise<Cart> {
  const data = await query<Record<string, CartPayload>>(
    `mutation(${decl}) { ${name}(${args}) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    variables,
  );
  const payload = data[name];
  if (payload.userErrors.length || !payload.cart) throw new Error(payload.userErrors[0]?.message ?? "The cart could not be updated.");
  return toCart(payload.cart);
}

/** The saved cart, or null when there is none or Shopify has expired it or it was already checked out. */
export async function fetchCart(id: string): Promise<Cart | null> {
  const data = await query<{ cart: RawCart | null }>(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id });
  return data.cart ? toCart(data.cart) : null;
}

export const createCart = (variantId: string) =>
  mutate("cartCreate", "input: $input", { input: { lines: [{ merchandiseId: variantId, quantity: 1 }] } }, "$input: CartInput!");

export const addLine = (cartId: string, variantId: string) =>
  mutate("cartLinesAdd", "cartId: $cartId, lines: $lines", { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] }, "$cartId: ID!, $lines: [CartLineInput!]!");

export const setLineQuantity = (cartId: string, lineId: string, quantity: number) =>
  mutate("cartLinesUpdate", "cartId: $cartId, lines: $lines", { cartId, lines: [{ id: lineId, quantity }] }, "$cartId: ID!, $lines: [CartLineUpdateInput!]!");

export const removeLine = (cartId: string, lineId: string) =>
  mutate("cartLinesRemove", "cartId: $cartId, lineIds: $lineIds", { cartId, lineIds: [lineId] }, "$cartId: ID!, $lineIds: [ID!]!");

/** The cart id is kept in localStorage so a visitor finds their cart again; storage can be blocked, so it never throws. */
export const savedCartId = (): string | null => {
  try {
    return localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return null;
  }
};
export const saveCartId = (id: string | null) => {
  try {
    if (id) localStorage.setItem(CART_STORAGE_KEY, id);
    else localStorage.removeItem(CART_STORAGE_KEY);
  } catch {
    /* storage unavailable: the cart lasts for this visit only */
  }
};
