import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import Footer from '../components/Footer';
import { useRouteData } from 'solid-app-router';
import { useRouteReadyState } from '../utils/routeReadyState';
import type { CartUtilities, ShopifyProduct } from '../utils/shopify';
import { Icon } from 'solid-heroicons';
import { shoppingCart } from 'solid-heroicons/solid';
import { chevronRight } from 'solid-heroicons/outline';
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
  const adjustQuantity = async (quantity: number = 1) => {
    setLoading(true);
    await props.cart.add([
      {
        variantId: current(),
        quantity,
      },
    ]);
    setLoading(false);
  };
  return (
    <div class="border border-t justify-center text-center relative rounded-lg shadow">
      <Show when={variant() !== null}>
        <div class="absolute top-0 left-0 py-3 px-5 border-b border-r rounded-br-lg rounded-tl-lg bg-white/90 text-gray-500 font-bold">
          {props.cart.formatTotal(variant()!.priceV2.amount)}
        </div>
        <img class="rounded-t-lg" src={variant()!.image.src} />
      </Show>
      <div class="my-7 space-y-2 details">
        <div>{props.details.title}</div>
      </div>
      <div class="flex bg-white rounded-b border-t divide-white divide-x">
        <Show when={props.details.variants.length > 1}>
          <select
            class="p-4 text-xs w-4/6 rounded-bl-lg bg-transparent"
            onChange={(evt) => setCurrent(evt.currentTarget.value)}
          >
            <For each={props.details.variants}>
              {(variant) => <option value={variant.id}>{variant.title}</option>}
            </For>
          </select>
        </Show>
        <button
          title="Remove item"
          disabled={loading() || quantity() == 0}
          onClick={() => adjustQuantity(-1)}
          class="bg-solid-light hover:bg-solid-medium disabled:opacity-80 transition text-white p-2 font-semibold text-lg"
          classList={{
            'w-2/6 ': props.details.variants.length > 1,
            'rounded-bl-lg w-1/2': props.details.variants.length == 1,
          }}
        >
          -
        </button>
        <button
          title="Add item"
          disabled={loading()}
          onClick={() => adjustQuantity(1)}
          class="bg-solid-light hover:bg-solid-medium transition text-white p-2 font-semibold text-lg rounded-br-lg"
          classList={{
            'rounded-br-lg w-2/6 ': props.details.variants.length > 1,
            'w-1/2': props.details.variants.length == 1,
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

const Cart: Component<CartUtilities> = (props) => {
  const [loading, setLoading] = createSignal(false);
  return (
    <div class="absolute top-30 bg-white border-gray-300 divide-y shadow-lg divide-gray-300 border top-16 right-4 rounded-lg">
      <Show
        fallback={<div class="p-10 w-80 text-center">No items in cart.</div>}
        when={props.cart.totalItems !== 0}
      >
        <For each={props.cart.lines}>
          {(item: ShopifyBuy.LineItem) => {
            const remove = async () => {
              setLoading(true);
              props.remove([item.id.toString()]);
              setLoading(false);
            };
            const adjustQuantity = async (quantity: number = 1) => {
              setLoading(true);
              await props.add([
                {
                  variantId: item.variant.id,
                  quantity,
                },
              ]);
              setLoading(false);
            };
            return (
              <div class="flex items-center hover:bg-gray-100 transition">
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
                    onClick={() => (item.quantity == 1 ? remove() : adjustQuantity(-1))}
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
    <div class="flex flex-col">
      <div class="my-2 p-5 pb-10 px-3 lg:px-12 container">
        <div class="sticky top-16 bg-white z-10 flex p-3 justify-end space-x-2">
          <button
            ref={cartButtonEl}
            class="flex justify-center items-center border  rounded-md space-x-2"
          >
            <div class="p-2 flex justify-center items-center space-x-3">
              <Icon class="w-7 text-solid-medium" path={shoppingCart} />
              <div>My Cart</div>
            </div>
            <figure class="flex border-l h-full px-5 border-gray-200 text-xs justify-center items-center">
              {data.commerce.cart.totalItems}
            </figure>
          </button>
          <button
            disabled={data.commerce.cart.totalItems == 0}
            onClick={() => (window.location.href = data.commerce.cart.checkoutURL)}
            class="flex transition justify-center items-center bg-solid-medium text-white px-5 text-md rounded-md disabled:bg-gray-300"
          >
            Checkout
            <Icon class="w-5 text-white" path={chevronRight} />
          </button>
          <Dismiss menuButton={cartButtonEl} open={showCart} setOpen={setShowCart}>
            <Cart {...data.commerce} />
          </Dismiss>
        </div>
        <div class="text-center py-5">
          Welcome to the Solid Store! All profit from the store goes back to Solid's OpenCollective
          to support our community.
          <div class="text-xs">Prices are listed in USD.</div>
        </div>
        <Show fallback="Fetching products..." when={!data.loading}>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 px-5 md:px-0">
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
