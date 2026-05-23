export const config = { runtime: 'edge' };

const ALLOWED_FIELDS = new Set(['model','max_tokens','stream','system','messages','temperature']);

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('ANTHROPIC_API_KEY not set', { status: 500 });
  }

  let body;
  try {
    const raw = await req.json();
    body = Object.fromEntries(Object.entries(raw).filter(([k]) => ALLOWED_FIELDS.has(k)));
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') || 'text/event-stream',
      'cache-control': 'no-cache',
    },
  });
}
