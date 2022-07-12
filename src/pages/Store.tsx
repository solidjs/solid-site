import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import Footer from '../components/Footer';
import { useRouteData } from 'solid-app-router';
import { useRouteReadyState } from '../utils/routeReadyState';
import type { CartUtilities, ShopifyProduct } from '../utils/shopify';
import { Icon } from 'solid-heroicons';
import { shoppingCart } from 'solid-heroicons/solid';
import { minusCircle } from 'solid-heroicons/outline';
import Dismiss from 'solid-dismiss';

const Product: Component<{ details: ShopifyProduct; cart: CartUtilities }> = (props) => {
  const [current, setCurrent] = createSignal(props.details.variants[0].id);
  const [loading, setLoading] = createSignal(false);
  const variant = createMemo(() => {
    for (const variant of props.details.variants) {
      if (variant.id == current()) {
        return variant;
      }
    }
    return null;
  });
  const quantity = props.cart.variantQuantity(current);
  const adjustQuantity = (quantity = 1) => {
    setLoading(true);
    void props.cart.add([
      {
        variantId: current(),
        quantity,
      },
    ]);
    setLoading(false);
  };
  return (
    <div class="border dark:border-gray-500 border-t justify-center text-center relative rounded-lg shadow">
      <Show when={variant() !== null}>
        <div class="absolute top-0 left-0 py-3 px-5 border-b border-r dark:border-slate-400 rounded-br-lg rounded-tl-lg bg-white/90 dark:bg-slate-500 dark:text-gray-800 text-gray-500 font-bold">
          {props.cart.formatTotal(variant()!.priceV2.amount)}
        </div>
        <img class="rounded-t-lg" src={variant()!.image.src} />
      </Show>
      <div class="py-4 details bg-slate-50 dark:bg-slate-700">
        <div>{props.details.title}</div>
      </div>
      <div class="flex justify-center rounded-b border-t divide-white dark:border-slate-500">
        <Show when={props.details.variants.length > 1}>
          <select
            class="py-4 pl-4 text-xs w-4/6 rounded-bl-lg bg-transparent"
            onChange={(evt) => setCurrent(evt.currentTarget.value)}
          >
            <For each={props.details.variants}>
              {(variant) => <option value={variant.id}>{variant.title}</option>}
            </For>
          </select>
        </Show>
        <div class="flex py-2 w-2/6 justify-center content-center items-center">
          <button
            title="Remove item"
            disabled={loading() || quantity() == 0}
            onClick={() => adjustQuantity(-1)}
            class="transition text-solid-light hover:text-solid-dark disabled:hidden disabled:text-solid-light font-semibold text-lg rounded-full w-25 h-25"
            classList={{
              'opacity-20': loading(),
            }}
          >
            <Icon class="h-8" path={minusCircle} />
          </button>
          <button
            title="Add item"
            disabled={loading()}
            onClick={() => adjustQuantity(1)}
            class="transition text-white bg-solid-light px-3 py-2 hover:text-solid-dark disabled:hidden disabled:text-solid-light font-semibold text-xs rounded-full w-25 h-25"
            classList={{
              'opacity-20': loading(),
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart: Component<CartUtilities> = (props) => {
  const [loading, setLoading] = createSignal(false);
  return (
    <div class="absolute top-30 right-0 bg-white border-slate-300 divide-y shadow-lg divide-slate-300 border top-16 rounded-lg">
      <Show
        fallback={<div class="p-10 w-80 text-center">No items in cart.</div>}
        when={props.cart.totalItems !== 0}
      >
        <For each={props.cart.lines}>
          {(item: ShopifyBuy.LineItem) => {
            const remove = async () => {
              setLoading(true);
              await props.remove([item.id.toString()]);
              setLoading(false);
            };
            const adjustQuantity = (quantity = 1) => {
              setLoading(true);
              props
                .add([
                  {
                    variantId: item.variant.id,
                    quantity,
                  },
                ])
                .then(() => setLoading(false))
                .catch((err) => console.error(err));
            };
            return (
              <div class="flex items-center hover:bg-slate-100 transition">
                <img class="first:rounded-tl last:rounded-bl w-32" src={item.variant.image.src} />
                <div class="px-3 flex flex-col w-52">
                  <b class="font-semibold">{item.title}</b>
                  <span class="text-xs">{props.formatTotal(item.variant.priceV2.amount)}/ea</span>
                  <div class="text-xs mt-3">
                    <b class="text-semibold">Total</b>:{' '}
                    {props.formatTotal(parseFloat(item.variant.priceV2.amount) * item.quantity)}
                  </div>
                </div>
                <div class="flex space-x-1 px-5">
                  <div class="pr-2">x {item.quantity}</div>
                  <button
                    title="Remove item"
                    disabled={loading()}
                    onClick={() => (item.quantity == 1 ? void remove() : adjustQuantity(-1))}
                    class="flex bg-solid-medium rounded-full w-6 h-6 items-center justify-center text-white"
                  >
                    <Show fallback="×" when={item.quantity !== 1}>
                      -
                    </Show>
                  </button>
                  <button
                    title="Add item"
                    disabled={loading()}
                    onClick={() => adjustQuantity(1)}
                    class="flex bg-solid-medium rounded-full w-6 h-6 items-center justify-center text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          }}
        </For>
      </Show>
    </div>
  );
};

const Store: Component = () => {
  const data = useRouteData<{
    products: ShopifyProduct[];
    loading: boolean;
    commerce: CartUtilities;
  }>();
  const [showCart, setShowCart] = createSignal(false);
  let cartButtonEl;
  useRouteReadyState();
  return (
    <div class="flex flex-col relative">
      <div class="my-2 py-5 pb-10 lg:px-12 container relative">
        <div class="flex py-3 justify-end space-x-2 relative">
          <div class="w-full">
            Welcome to the <b>Solid Store</b>! All profits from the store goes back to Solid's
            OpenCollective to support our community.
            <div class="text-xs">Prices are listed in USD.</div>
          </div>
          <div class="sticky top-16 dark:bg-transparent z-10">
            <button
              ref={cartButtonEl}
              class="flex justify-center items-center border w-60 rounded-md space-x-2"
            >
              <div class="flex h-12 justify-center items-center space-x-3">
                <Icon class="w-7 text-solid-medium" path={shoppingCart} />
                <div>My Cart</div>
              </div>
              <figure class="flex border-l h-full px-5 border-slate-200 text-xs justify-center items-center">
                {data.commerce.cart.totalItems}
              </figure>
            </button>
            {/* <button
            disabled={data.commerce.cart.totalItems == 0}
            onClick={() => (window.location.href = data.commerce.cart.checkoutURL)}
            class="flex transition justify-center items-center bg-solid-medium text-white px-5 text-md rounded-md disabled:bg-gray-300"
          >
            Checkout
            <Icon class="w-5 text-white" path={chevronRight} />
          </button> */}
            <Dismiss menuButton={cartButtonEl} open={showCart} setOpen={setShowCart}>
              <Cart {...data.commerce} />
            </Dismiss>
          </div>
        </div>
        <Show fallback="Fetching products..." when={!data.loading}>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 px-5 md:px-0">
            <For each={data.products}>
              {(product: ShopifyProduct) => <Product cart={data.commerce} details={product} />}
            </For>
          </div>
        </Show>
      </div>
      <Footer />
    </div>
  );
};

export default Store;
