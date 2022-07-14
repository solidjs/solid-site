import { Component, createMemo, createSignal, For, Show } from 'solid-js';
import Footer from '~/components/Footer';
import { useRouteData } from '@solidjs/router';
import { useRouteReadyState } from '~/utils/routeReadyState';
import type { CartUtilities, ShopifyProduct } from '~/utils/shopify';
import { Icon } from 'solid-heroicons';
import { shoppingCart, chevronRight } from 'solid-heroicons/solid';
import { minusCircle, plusCircle, xCircle } from 'solid-heroicons/outline';
import Dismiss from 'solid-dismiss';

const Product: Component<{ details: ShopifyProduct; cart: CartUtilities }> = (props) => {
  const [current, setCurrent] = createSignal(props.details.variants[0].id);
  const [showInfo, setShowInfo] = createSignal(false);
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
    props.cart
      .add([
        {
          variantId: current(),
          quantity,
        },
      ])
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };
  return (
    <div class="border dark:border-solid-gray hover:border-solid-medium transition duration-300 border-t justify-center text-center relative rounded-lg">
      <button class="pointer" onClick={() => setShowInfo(!showInfo())}>
        <Show when={variant() !== null}>
          <Show when={showInfo()}>
            <div
              innerHTML={`<b class="mb-3 block">${props.details.title}</b><div>${props.details.descriptionHtml}</div><div class="mt-5 text-center text-xs">Click to close info</div>`}
              class="h-full w-full absolute overflow-auto bg-white/90 dark:bg-solid-darkgray/90 rounded-lg pt-20 p-10 z-5 text-md text-left"
            />
          </Show>
          <div class="absolute top-0 left-0 py-3 px-5 border-b border-r dark:border-solid-gray  rounded-br-lg rounded-tl-lg bg-white/90 dark:bg-solid-gray dark:text-gray-400 text-gray-500 font-bold">
            {props.cart.formatTotal(variant()!.priceV2.amount)}
          </div>
          <img class="rounded-t-lg" src={variant()!.image.src} />
        </Show>
        <div class="flex justify-center py-4 details bg-slate-50 dark:bg-solid-gray/20">
          <div>{props.details.title}</div>
        </div>
      </button>
      <div class="flex justify-center rounded-b border-t divide-white dark:border-solid-gray">
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
            class="transition text-solid-light hover:opacity-60 disabled:hidden disabled:text-solid-light font-semibold text-lg rounded-full w-25 h-25"
            classList={{
              'opacity-80': loading(),
            }}
          >
            <Icon class="h-8" path={minusCircle} />
          </button>
          <button
            title="Add item"
            disabled={loading()}
            onClick={() => adjustQuantity(1)}
            class="transition text-white bg-solid-light px-3 py-2 hover:text-solid-dark disabled:text-white font-semibold text-xs rounded-full w-25 h-25"
            classList={{
              'opacity-80': loading(),
            }}
          >
            <Show fallback="Saving..." when={!loading()}>
              + Add
            </Show>
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart: Component<CartUtilities> = (props) => {
  const [loading, setLoading] = createSignal(false);
  const data = useRouteData<{
    products: ShopifyProduct[];
    loading: boolean;
    commerce: CartUtilities;
  }>();
  return (
    <div class="absolute w-[500px] max-h-[75vh] overflow-scroll top-[75px] right-0 md:right-[45px] bg-white dark:bg-solid-darkgray border-slate-300 divide-y shadow-xl divide-slate-300 border dark:divide-solid-gray/80 dark:border-solid-gray/80 rounded-lg">
      <Show
        fallback={<div class="p-10 text-center w-full">No items in cart.</div>}
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
              <div class="w-full grid grid-cols-12 gap-4 pr-2 items-center hover:bg-slate-100 dark:hover:bg-solid-gray transition">
                <img
                  class="first:rounded-tl last:rounded-bl col-span-4"
                  src={item.variant.image.src}
                />
                <div class="flex flex-col col-span-5">
                  <b class="font-semibold">{item.title}</b>
                  <span class="text-xs">{props.formatTotal(item.variant.priceV2.amount)}/ea</span>
                  <div class="text-xs">
                    <b class="text-semibold">Price:</b>{' '}
                    {props.formatTotal(parseFloat(item.variant.priceV2.amount) * item.quantity)}
                  </div>
                </div>
                <div class="col-span-1">x {item.quantity}</div>
                <div class="flex space-x col-span-2 text-solid-medium dark:text-white">
                  <button
                    title="Remove item"
                    disabled={loading()}
                    onClick={() => (item.quantity == 1 ? void remove() : adjustQuantity(-1))}
                    class="flex rounded-full items-center justify-center hover:opacity-70 transition duration-200"
                  >
                    <Show fallback={<Icon class="h-8" path={xCircle} />} when={item.quantity !== 1}>
                      <Icon class="h-8" path={minusCircle} />
                    </Show>
                  </button>
                  <button
                    title="Add item"
                    disabled={loading()}
                    onClick={() => adjustQuantity(1)}
                    class="flex rounded-full items-center justify-center hover:opacity-70 transition duration-200"
                  >
                    <Icon class="h-8" path={plusCircle} />
                  </button>
                </div>
              </div>
            );
          }}
        </For>
        <div class="p-4 text-right dark:bg-solid-gray/30">
          <b>Subtotal: </b> US{data.commerce.formatTotal(data.commerce.cart.total)}
        </div>
        <div class="p-3">
          <button
            disabled={data.commerce.cart.totalItems == 0}
            onClick={() => (window.location.href = data.commerce.cart.checkoutURL)}
            class="flex w-full transition justify-center items-center bg-solid-medium hover:opacity-80 text-md rounded-md disabled:bg-gray-300"
          >
            <div class="flex w-full">
              <div class="flex justify-center w-full p-4 text-white">
                Checkout <Icon class="w-5" path={chevronRight} />
              </div>
            </div>
          </button>
        </div>
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
      <div class="sticky top-[55px] dark:bg-transparent z-10 container mx-auto flex justify-end px-5 md:px-12">
        <div class="mt-3">
          <button
            ref={cartButtonEl}
            class="flex bg-white dark:bg-solid-medium shadow-xl justify-center items-center border dark:border-transparent divide divide-red-500 w-40 rounded-md space-x-5"
          >
            <div class="flex h-12 justify-center items-center space-x-2">
              <Icon class="w-7 dark:text-white text-solid-medium" path={shoppingCart} />
              <div>Cart</div>
            </div>
            <figure class="flex h-full text-xs borderjustify-center items-center">
              {data.commerce.cart.totalItems}
            </figure>
          </button>
          <Dismiss menuButton={cartButtonEl} open={showCart} setOpen={setShowCart}>
            <Cart {...data.commerce} />
          </Dismiss>
        </div>
      </div>
      <div class="py-5 pb-10 lg:px-12 container relative">
        <div class="px-5 md:px-0">
          Welcome to the <b>Solid Store</b>! All profits from the store goes back to Solid's
          OpenCollective to support our community.
          <div class="text-xs">Prices are listed in USD.</div>
        </div>
        <Show
          fallback={<div class="flex justify-center p-20">Loading store...</div>}
          when={!data.loading}
        >
          <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-10 px-5 md:px-0">
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
