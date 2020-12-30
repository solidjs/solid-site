import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
  'Access-Control-Max-Age': '86400',
});

addEventListener('fetch', (event) => {
  try {
    if (event.request.method === 'OPTIONS') {
      // Handle CORS preflight requests
      event.respondWith(handleOptions(event.request));
    } else {
      event.respondWith(handleEvent(event));
    }
  } catch (e) {
    // https://stackoverflow.com/questions/58432345/cloudflare-workers-spa-with-vuejs/58439234#58439234
    return getAssetFromKV(event, {
      mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/index.html`, req),
    });
  }
});

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  const origin = headers.get('Origin');

  if (
    origin !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    const respHeaders = {
      ...corsHeaders(origin),
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
    };

    return new Response(null, { headers: respHeaders });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: { Allow: 'GET, HEAD, OPTIONS' },
    });
  }
}

async function handleEvent(event) {
  const options = {
    mapRequestToAsset(req) {
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
    },
  };

  try {
    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'unsafe-url');
    response.headers.set('Feature-Policy', 'none');
    response.headers.set('Access-Control-Allow-Origin', event.request.headers.get('Origin'));
    response.headers.append('Vary', 'Origin');

    return response;
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 });
  }
}
