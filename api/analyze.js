// api/analyze.js — Vercel Edge Function. Holds the API key server-side and
// streams Claude's response back to the browser. No client changes needed.
export const config = { runtime: "edge" };

const MODEL = "claude-opus-4-7";
const MAX_TOKENS = 1024;

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server is missing ANTHROPIC_API_KEY" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  // Pin the model + token cap + stream flag server-side; only accept the
  // system prompt and messages from the client (buildContext supplies those).
  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      stream: true,
      system: typeof payload.system === "string" ? payload.system : "",
      messages: Array.isArray(payload.messages) ? payload.messages : []
    })
  });

  // If Anthropic rejects the request, surface its error instead of a stream.
  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "content-type": "application/json" }
    });
  }

  // Pipe the SSE stream straight through — app.js already parses it.
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform"
    }
  });
}
