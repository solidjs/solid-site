import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
  'Access-Control-Max-Age': '86400',
});

addEventListener('fetch', (event) => {
  if (event.request.method === 'OPTIONS') {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(event.request));
  } else {
    event.respondWith(handleEvent(event));
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

  try {
    const page = await getAssetFromKV(event, { mapRequestToAsset: serveSinglePageApp });

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
