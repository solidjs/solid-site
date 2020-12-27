import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    // https://stackoverflow.com/questions/58432345/cloudflare-workers-spa-with-vuejs/58439234#58439234
    return getAssetFromKV(event, {
      mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
    });
  }
});

async function handleEvent(event) {
  let options = {};

  options.mapRequestToAsset = (req) => {
    // First let's apply the default handler, which we imported from
    // '@cloudflare/kv-asset-handler' at the top of the file. We do
    // this because the default handler already has logic to detect
    // paths that should map to HTML files, for which it appends
    // `/index.html` to the path.
    req = mapRequestToAsset(req);

    // Now we can detect if the default handler decided to map to
    // index.html in some specific directory.
    if (req.url.endsWith('/index.html')) {
      // Indeed. Let's change it to instead map to the root `/index.html`.
      // This avoids the need to do a redundant lookup that we know will
      // fail.
      return new Request(`${new URL(req.url).origin}/index.html`, req);
    } else {
      // The default handler decided this is not an HTML page. It's probably
      // an image, CSS, or JS file. Leave it as-is.
      return req;
    }
  };

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }

    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');

    return response;
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/404.html`, req),
        });

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 });
        // eslint-disable-next-line no-empty
      } catch {}
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}
