const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
  'Access-Control-Max-Age': '86400',
});

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }
    return handleRequest(request, env);
  },
};

function handleOptions(request) {
  const headers = request.headers;
  const origin = headers.get('Origin');

  if (
    origin !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    return new Response(null, {
      headers: {
        ...corsHeaders(origin),
        'Access-Control-Allow-Headers': headers.get('Access-Control-Request-Headers'),
      },
    });
  }

  return new Response(null, {
    headers: { Allow: 'GET, HEAD, OPTIONS' },
  });
}

async function handleRequest(request, env) {
  try {
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);

    newResponse.headers.set('X-XSS-Protection', '1; mode=block');
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-Frame-Options', 'DENY');
    newResponse.headers.set('Referrer-Policy', 'unsafe-url');
    newResponse.headers.set('Feature-Policy', 'none');
    newResponse.headers.set('Access-Control-Allow-Origin', request.headers.get('Origin'));
    newResponse.headers.append('Vary', 'Origin');

    return newResponse;
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 });
  }
}
