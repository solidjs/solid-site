import { createEffect, on } from 'solid-js';
import { RouteDataFunc } from '@solidjs/router';
import { createCookieStorage } from '@solid-primitives/storage';
import { createCollection, createCart } from '~/utils/shopify';

const settings = {
  token: '98a442cbab63cb1697002bfae7dc648a',
  domain: 'solidjs.myshopify.com',
};

const StoreData: RouteDataFunc = () => {
  const [collection] = createCollection(() => 'gid://shopify/Collection/285612933298', settings);
  const [cookie, setCookie] = createCookieStorage();
  const id: string | null =
    !cookie.cartId || cookie.cartId == '' ? null : (cookie.cartId as string);
  const commerce = createCart(id, settings);
  createEffect(
    on(
      () => [commerce.loading(), commerce.cart.id, commerce.cart.id],
      () => {
        if (commerce.loading() == true) return;
        if (commerce.cart.id != cookie.cartId) {
          setCookie('cartId', commerce.cart.id);
        }
      },
    ),
  );
  createEffect(() => console.log(collection()));
  return {
    get commerce() {
      return commerce;
    },
    get loading() {
      return collection.loading;
    },
    get products() {
      return collection()?.products;
    },
  };
};

export default StoreData;
