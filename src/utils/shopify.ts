import { createMemo, createResource, createSignal, Resource, Accessor, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { access } from '@solid-primitives/utils';
import Client from 'shopify-buy';

export interface CartUtilities {
  cart: {
    cart: Client.Cart;
    id: string | number;
    attributes: Client.CustomAttribute[];
    note: string;
    lines: Client.LineItem[];
    totalItems: number;
    tax: number;
    checkoutURL: string;
    subtotal: number;
    total: number;
  };
  loading: Accessor<boolean>;
  retrieve: (checkout_id?: string | number) => Promise<void>;
  add: (items: Client.LineItemToAdd[]) => Promise<void>;
  update: (items: Client.AttributeInput[]) => Promise<void>;
  remove: (items: string[]) => Promise<void>;
  formatTotal: (total: number | string) => string;
  setAttribute: (key: string, value: string) => Promise<void>;
  updateAttributes: (customAttributes: Client.CustomAttribute[]) => Promise<void>;
  removeAttribute: (key: string) => Promise<void>;
  addDiscount: (code: string) => Promise<void>;
  removeDiscount: (code: string) => Promise<void>;
  variantQuantity: (id: Accessor<string | number>) => Accessor<number>;
}

export type ShopifyProduct = Client.Product;

export interface ShopifyOptions {
  token: string;
  domain: string;
  client?: Client.Client;
}

/**
 * Produces a utility for managing a Shopify cart reactively.
 * @param checkout_id string Checkout identifier for the cart.
 * @param options Options for the cart such as token, domain, client, etc.
 * @returns Cart helpers and utilities.
 */
export const createCart = (
  checkout_id?: string | number | undefined | null,
  options?: ShopifyOptions & {
    currency?: 'USD';
    locale?: 'en-US';
  },
): CartUtilities => {
  const { checkout } =
    options?.client ||
    Client.buildClient({
      domain: options!.domain,
      storefrontAccessToken: options!.token,
    });
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createStore({
    cart: {} as Client.Cart,
    get id() {
      return this.cart.id;
    },
    get attributes(): Client.CustomAttribute[] {
      return this.cart.customAttributes;
    },
    get note() {
      return this.cart.note;
    },
    get lines() {
      return this.cart.lineItems;
    },
    get totalItems() {
      let total = 0;
      if (data.cart.lineItems) {
        for (const line of data.cart.lineItems) {
          total += line.quantity;
        }
      }
      return total;
    },
    get tax() {
      return parseFloat(this.cart.totalPriceV2.amount);
    },
    get checkoutURL() {
      return this.cart.webUrl;
    },
    get subtotal() {
      if (this.cart.subtotalPrice) {
        return parseFloat(this.cart.subtotalPrice);
      } else {
        return 0;
      }
    },
    get total() {
      if (this.cart.totalPriceV2.amount) {
        return parseFloat(this.cart.totalPrice);
      } else {
        return 0;
      }
    },
  });
  const formatTotal = (amount: number | string) => {
    amount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return amount.toLocaleString(options?.locale || 'en-US', {
      style: 'currency',
      currency: options?.currency || 'USD',
    });
  };
  const create = async () => {
    setLoading(true);
    try {
      setData('cart', await checkout.create());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  const fetchCart = async (checkout_id: string | number) => {
    setLoading(true);
    const cart = await checkout.fetch(checkout_id as string);
    if (cart.orderStatusUrl !== null) {
      return await create();
    }
    setData('cart', cart);
    setLoading(false);
  };
  const retrieve = (checkout_id?: string | number) => {
    return !data.cart.id && !checkout_id
      ? create()
      : fetchCart(checkout_id ?? access(data.cart.id));
  };
  const variantQuantity = (id: Accessor<string | number>): Accessor<number> => {
    return createMemo(() => {
      if (data.cart.lineItems) {
        for (const line of data.cart.lineItems) {
          if (line.variant.id == id()) {
            return line.quantity;
          }
        }
      }
      return 0;
    });
  };
  const add = async (items: Client.LineItemToAdd[]) => {
    setData('cart', await checkout.addLineItems(access(data.cart.id), items));
  };
  const update = async (items: Client.AttributeInput[]) => {
    setData('cart', await checkout.updateLineItems(access(data.cart.id), items));
  };
  const remove = async (items: string[]) => {
    setData('cart', await checkout.removeLineItems(access(data.cart.id), items));
  };
  const updateAttributes = async (customAttributes: Client.CustomAttribute[]) => {
    setData('cart', await checkout.updateAttributes(data.cart.id, { customAttributes }));
  };
  const setAttribute = async (key: string, value: string) => {
    const attrs = data.attributes.reduce(
      (memo: Array<Client.CustomAttribute>, item: Client.CustomAttribute) => {
        memo.push({
          key: item.key,
          value: item.key == key ? value : item.value,
        });
        return memo;
      },
      [{ key, value }],
    );
    await updateAttributes(attrs);
  };
  const removeAttribute = async (key: string) => {
    await updateAttributes(
      data.attributes.filter((attr: Client.CustomAttribute) => attr.key !== key),
    );
  };
  const addDiscount = async (code: string) => {
    setData('cart', await checkout.addDiscount(data.cart.id, code));
  };
  const removeDiscount = async () => {
    setData('cart', await checkout.removeDiscount(data.cart.id));
  };
  onMount(() => {
    if (checkout_id == null) {
      create().catch((err) => console.log(err));
    } else if (checkout_id) {
      retrieve(checkout_id as string).catch((err) => console.log(err));
    }
  });
  return {
    cart: data,
    loading,
    retrieve,
    add,
    variantQuantity,
    formatTotal,
    update,
    remove,
    setAttribute,
    updateAttributes,
    removeAttribute,
    addDiscount,
    removeDiscount,
  };
};

/**
 * A reactive primitive to help pull collections from Shopify.
 * @param collectionId Collection identifier to pull from Shopify.
 * @param options Options for governing the request to the API such as token and domain.
 * @returns
 */
export const createCollection = (
  collectionId: () => string,
  options: ShopifyOptions & {
    language?: 'en-US';
  },
): [products: Resource<Client.CollectionWithProducts | undefined>, refetch: VoidFunction] => {
  const client =
    options.client ||
    Client.buildClient({
      domain: options.domain,
      storefrontAccessToken: options.token,
      language: options.language,
    });
  const [products, { refetch }] = createResource(collectionId, async (id) =>
    client.collection.fetchWithProducts(id),
  );
  return [products, refetch];
};

/**
 * Helps request a list of collections from Shopify.
 * @param options Standard Shopify API options and the language to fetch in.
 * @returns A resource to access the collection list.
 */
export const createCollectionList = (
  options: ShopifyOptions & {
    language?: 'en-US';
  },
): [collections: Resource<Client.CollectionWithProducts[] | undefined>, refetch: () => void] => {
  const client =
    options.client ||
    Client.buildClient({
      domain: options.domain,
      storefrontAccessToken: options.token,
      language: options.language,
    });
  const [collections, { refetch }] = createResource(async () =>
    client.collection.fetchAllWithProducts(),
  );
  return [collections, refetch];
};

/**
 * A helper for fetching and managing information about a store product.
 * @param identifier The identifier or handle of the product.
 * @param options
 * @returns
 */
export const createProduct = (
  identifier: Accessor<{
    id?: string;
    handle?: string;
  }>,
  options: ShopifyOptions & {
    language?: 'en-US';
  },
): [
  Resource<Client.Product | null | undefined>,
  Accessor<Client.Image[]>,
  (
    info?: unknown,
  ) => Client.Product | Promise<Client.Product | null | undefined> | null | undefined,
] => {
  const client =
    options.client ||
    Client.buildClient({
      domain: options.domain,
      storefrontAccessToken: options.token,
      language: options.language,
    });
  const [details, { refetch }] = createResource(identifier, async (identifier) => {
    if (identifier.handle) {
      return client.product.fetchByHandle(identifier.handle);
    } else if (identifier.id) {
      return client.product.fetch(identifier.id);
    }
    return null;
  });
  const images = () => {
    const dts = details();
    if (dts) dts.images;
    return [];
  };
  return [details, images, refetch];
};

export default createCart;
