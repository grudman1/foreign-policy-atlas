# Foreign Policy Atlas

An interactive world map classifying countries by their foreign-policy alignment
with the United States, president by president. Click a country for its dossier
and projected outcomes; click a region for the regional picture; filter by tier;
switch presidents from the dropdown.

This started as a single-file prototype and has been split into a clean,
multi-president structure so two people can build it out in parallel.

## Run it

It's a static site — no build step. Either:

- Open `index.html` directly in a browser, **or**
- Serve the folder (better, avoids any file:// quirks):
  `python3 -m http.server` then visit `http://localhost:8000`.

It loads D3, TopoJSON, and the world-map geometry from CDNs, so it needs an
internet connection on first load.

## Structure

```
index.html      The shell: page markup, all CSS, the president dropdown,
                and the <script> includes. Rarely needs editing.
app.js          All render logic (map, panels, search, inset zoom, region
                outlines) — president-agnostic. It renders whichever
                president is registered/selected.
data/
  trump.js      One president's data. Self-registers on window.PRESIDENTS.
  <next>.js     Add more presidents here, one file each.
```

The golden rule: **content lives in `data/*.js`, code lives in `app.js`.**
Adding or editing entries should almost never require touching `app.js`.

## Add a new president

1. Copy `data/trump.js` to `data/<name>.js`.
2. Change `id`, `label`, `headline`, `blurb`, `asOf`, `foot`, and replace the
   three data objects (`dossier`, `regions`, `outcomes`).
3. Add one line in `index.html` next to the other data includes:
   `<script src="data/<name>.js"></script>` (before `app.js`).

The dropdown picks it up automatically.

## Add or edit a country (within a president file)

In that president's `dossier`:

```js
window.PRESIDENTS["trump"].dossier["Ukraine"] = {
  tier: 4,                     // 1-6 (see tiers below); drives map color
  region: "Europe",            // must match a region label
  points: [
    "Concrete, sourced reasoning bullet.",
    "Another bullet.",
    "interp"                   // OPTIONAL last item: flags an interpretive call
  ]
};
```

Optionally add an outcome line in the same file's `outcomes`:

```js
window.PRESIDENTS["trump"].outcomes["Ukraine"] =
  { best:"...", base:"...", down:"..." };
```

Country names must match the map geometry's names. A few differ (e.g. the map
uses "Czech Rep.", "Macedonia", "Dominican Rep."); the alias table in `app.js`
handles the known cases. If a new country won't highlight, check its exact map
name and add an alias.

## Tiers (the map colors)

| tier | meaning | note |
|---|---|---|
| 1 | Emerging gain | new & real, not yet locked in |
| 2 | Solid gain | aligned & institutionalizing |
| 3 | Established ally | maintained, not a new win for this president |
| 4 | In play | courted or contested |
| 5 | Strained / uncommitted | cooling or low-engagement |
| 6 | Adversarial / rival | |
| 0 | The United States | the home country |

## Deploy

Push to GitHub, then connect Vercel, Netlify, or GitHub Pages for the repo.
Because it's a static site, the default settings work with no build command;
every push auto-deploys.

## AI Analysis

The "AI Analysis" panel in the right column is powered by `api/analyze.js`, a
Vercel Edge Function that proxies to the Anthropic Messages API. The front-end
in `app.js` POSTs the current dossier context plus a question to `/api/analyze`
and renders the streamed reply; the function holds the API key server-side and
pipes Anthropic's SSE stream straight through.

For this to work in production:

1. In the Vercel project settings, add `ANTHROPIC_API_KEY` as an environment
   variable for both **Production** and **Preview**. The expected shape is
   documented in `.env.example` (which holds no real value — never commit one).
2. **Redeploy** after setting the variable; existing deployments won't pick it
   up retroactively.

For local testing, the existing `python3 -m http.server` flow only serves the
static files — it does not run the Edge Function, so `/api/analyze` will 404
locally. Run `vercel dev` from the repo root instead (requires the Vercel CLI
and a `.env.local` containing your `ANTHROPIC_API_KEY`).

If the key is missing or misconfigured, the panel will display the JSON error
returned by the function rather than a Vercel 404 page — that's the signal that
the route exists but the environment isn't set up yet.

## Notes from the prototype

- The Trump map is a projected May 2026 timeline; outcome lines are analytical
  projections, not predictions.
- Region label positions are hand-placed approximations for navigation.
- See `CLAUDE.md` for the rating rubric, sourcing standard, and the honesty
  rules every entry should follow.
