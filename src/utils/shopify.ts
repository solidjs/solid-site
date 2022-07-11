import { createMemo, createResource, createSignal, Resource, Accessor } from 'solid-js';
import { createStore, Store } from 'solid-js/store';
import Client from 'shopify-buy';

export interface CartUtilities {
  loading: () => boolean;
  cart: Store<{
    id: () => string;
    cart: Client.Cart;
    attributes: Client.CustomAttribute[];
    note: string;
    lines: Client.LineItem[];
    total: number;
    lineItems: Client.LineItem[];
    totalItems: number;
    subtotal: number;
    customAttributes: Client.CustomAttribute,
    checkoutURL: string;
    tax: number;
  }>;
  retrieve: (checkout_id?: string | number) => void;
  add: (items: Client.LineItemToAdd[]) => void;
  update: (items: Client.AttributeInput[]) => void;
  remove: (items: string[]) => void;
  formatTotal: (total: number) => string;
  setAttribute: (key: string, value: string) => void;
  updateAttributes: (customAttributes: Client.CustomAttribute[]) => void;
  removeAttribute: (key: string) => void;
  addDiscount: (code: string) => void;
  variantQuantity: (id: Accessor<string>) => Accessor<number>;
  removeDiscount: (code: string) => void;
}

export const createCart = (
  checkout_id?: string | number | undefined | null,
  options?: {
    token: string;
    domain: string;
    client?: Client.Client;
    currency: 'USD';
    locale: 'en-US';
  },
): CartUtilities => {
  const { checkout } =
    options?.client ||
    Client.buildClient({
      domain: options!.domain,
      storefrontAccessToken: options!.token,
    });
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createStore<CartUtilities>({
    cart: {} as Client.Cart,
    get id() {
      return this.cart.id;
    },
    get attributes() {
      return this.cart.customAttributes;
    },
    get note() {
      return this.cart.note;
    },
    get lines(): Client.LineItem[] {
      return this.cart.lineItems;
    },
    get totalItems(): number {
      let total = 0;
      if (data.cart.lineItems) {
        for (const line of data.cart.lineItems) {
          total += line.quantity;
        }
      }
      return total;
    },
    get tax() {
      return parseFloat(this.cart.totalTax);
    },
    get checkoutURL() {
      return this.cart.webUrl;
    },
    get subtotal() {
      if (this.cart.subtotalPriceV2) {
        return parseFloat(this.cart.subtotalPriceV2.amount);
      } else {
        return 0;
      }
    },
    get total() {
      if (this.cart.subtotalPriceV2) {
        return parseFloat(this.cart.totalPriceV2.amount);
      } else {
        return 0;
      }
    },
  });
  const formatTotal = (amount: number | string) => {
    return parseFloat(amount).toLocaleString(options.locale || 'en-US', {
      style: 'currency',
      currency: options.currency || 'USD',
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
  const retrieve = (checkout_id?: string) => {
    return !data.cart.id && !checkout_id ? create() : fetchCart(checkout_id || data.cart.id);
  };
  const variantQuantity = (id: Accessor<string>): number => {
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
    setData('cart', await checkout.addLineItems(data.cart.id, items));
  };
  const update = async (items: Client.AttributeInput[]) => {
    setData('cart', await checkout.updateLineItems(data.cart.id, items));
  };
  const remove = async (items: string[]) => {
    setData('cart', await checkout.removeLineItems(data.cart.id, items));
  };
  const updateAttributes = async (customAttributes: Client.CustomAttribute[]) => {
    setData(
      'cart',
      // @ts-ignore
      await checkout.updateAttributes(data.cart.id, { customAttributes }),
    );
  };
  const setAttribute = async (key: string, value: string) => {
    const attrs = data.attributes.reduce(
      (memo, item) => {
        memo.push({
          key: item.key,
          value: item.key == key ? value : item.value,
        });
        return memo;
      },
      [{ key, value }],
    );
    // @ts-ignore
    updateAttributes(attrs);
  };
  const removeAttribute = async (key: string) => {
    updateAttributes(data.attributes.filter((attr) => attr.key !== key));
  };
  const addDiscount = async (code: string) => {
    // @ts-ignore
    setData('cart', await checkout.addDiscount(data.cart.id, code));
  };
  const removeDiscount = async (code: string) => {
    // @ts-ignore
    setData('cart', await checkout.removeDiscount(data.cart.id, code));
  };
  if (checkout_id) {
    retrieve(checkout_id as string);
  } else if (checkout_id == null) {
    create();
  }
  return {
    loading,
    cart: data,
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

export const createCollection = (
  collectionId: () => string,
  options: {
    token: string;
    domain: string;
    client?: Client.Client;
    language?: 'en-US';
  },
): [products: ShopifyProduct, refetch: () => void] => {
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

export const createCollectionList = (options: {
  token: string;
  domain: string;
  client?: Client.Client;
  language?: 'en-US';
}): [
  collections: Resource<{
    id: string;
    handle: string;
    description: string;
    image: string;
    products: Client.Product[];
  }>,
  refetch: () => void,
] => {
  const client =
    options.client ||
    Client.buildClient({
      domain: options.domain,
      storefrontAccessToken: options.token,
      language: options.language,
    });
  const [collections, { refetch }] = createResource(async (id) =>
    client.collection.fetchAllWithProducts(),
  );
  return [collections, refetch];
};

export type ShopifyProduct = Resource<{
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  variants: Client.ProductVariant[];
  products: Client.Product[];
}>;

export const createProduct = (
  identifier: () => {
    id?: string;
    handle?: string;
  },
  options: {
    token: string;
    domain: string;
    client?: Client.Client;
    language?: 'en-US';
  },
): [
  Resource<Client.Product | null | undefined>,
  () => Client.Image[],
  (info?: unknown) => Client.Product | Promise<Client.Product | null | undefined> | null | undefined
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
  const images = () => details().images;
  return [details, images, refetch];
};

export default createCart;
