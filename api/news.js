// api/news.js — Vercel Edge Function. Proxies GDELT's free article-list API
// to avoid CORS and keep the response cacheable.
export const config = { runtime: "edge" };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().slice(0, 120);

  if (!q) {
    return new Response(JSON.stringify({ articles: [] }), {
      headers: { "content-type": "application/json" }
    });
  }

  // Wrap topic in quotes and require "United States" to stay on-topic.
  const query = encodeURIComponent('"' + q + '" "United States"');
  const url =
    "https://api.gdeltproject.org/api/v2/doc/doc" +
    "?query=" + query +
    "&mode=artlist&maxrecords=3&format=json" +
    "&timespan=1month&sourcelang=english&sortby=hybridrel";

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return new Response(JSON.stringify({ articles: [] }), {
        headers: { "content-type": "application/json" }
      });
    }
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=1800"
      }
    });
  } catch {
    return new Response(JSON.stringify({ articles: [] }), {
      headers: { "content-type": "application/json" }
    });
  }
}
