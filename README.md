# Foreign Policy Atlas

An interactive, president-by-president assessment of U.S. foreign policy. For
each country the map shows two things at once on **two independent axes**:
**where the relationship stands today** (the color) and **what this president
caused vs. the trajectory they inherited** (the arrow). Click a country for its
dossier and projected outcomes; click a region for the regional picture; filter
by state or by effect; switch presidents from the dropdown.

> The data model and rating methodology are defined in
> [`CLAUDE.md`](CLAUDE.md) (the v3 "President Effect" model). A fully-commented
> worked example of an entry lives at
> [`data/_example.js`](data/_example.js) — that file is a reference template
> only and is not loaded by the app.

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

Each `dossier` entry is a v3 "President Effect" object — see
[`data/_example.js`](data/_example.js) for the full commented shape and
[`CLAUDE.md`](CLAUDE.md) for field definitions and the methodology. A typical
scored entry looks like:

```js
window.PRESIDENTS["trump"].dossier["Ukraine"] = {
  // ----- the two axes -----
  state: "strained",          // the COLOR: today's relationship
  effect: "hurt",             // the ARROW: what this president caused
  magnitude: "material",      // modest | material | major  (only for helped/hurt)

  region: "Europe",           // must match a key in `regions`

  // outcome = what HAPPENED to the US position (the world)
  outcome: "One sentence.",
  // inherited = the fixed counterfactual the effect is measured against
  inherited: "One sentence describing the inherited trajectory.",

  // the causal argument — one sourced fact/claim per bullet
  points: ["…", "…"],

  // attribution + how sure we are
  role: "Spoiler",            // Architect | Accelerator | Closer | Stabilizer | Active Stabilizer | Inheritor | Bystander | Neglect | Spoiler
  confidence: "medium",       // high | medium | low
  evidence: "adequate",       // adequate | thin | insufficient

  // honesty
  contested: true,            // shows "analysts could score this differently"
  counterargument: "The strongest case against this scoring.",

  // claims are fetched, not recalled
  sources: [{ label: "…", url: "…" }]

  // Optional/conditional fields (durability, opportunityCost, escalationRisk,
  // unscoredReason, userDirected, etc.) — include only when they apply.
};
```

Optionally add an outcome-projection line in the same file's `outcomes`
(separate from the entry's `outcome` field — these are best/base/downside
projections, explicitly not predictions):

```js
window.PRESIDENTS["trump"].outcomes["Ukraine"] =
  { best:"...", base:"...", down:"..." };
```

Country names must match the map geometry's names. A few differ (e.g. the map
uses "Czech Rep.", "Macedonia", "Dominican Rep."); the alias table in `app.js`
handles the known cases. If a new country won't highlight, check its exact map
name and add an alias.

**Triage — don't force every country.** If nothing of strategic consequence
happened or there isn't enough sourcing to make a defensible call, set
`effect: "unscored"` plus an `unscoredReason` (`noMaterialEffect` |
`noPresidentialEffect` | `systemicOnly` | `insufficientEvidence`). The legend's
Unscored count is a deliberate honesty surface — see CLAUDE.md for the
triage-fairness rule.

## The two axes (map colors and arrows)

**State (the color) — where the relationship stands today.**

| state | meaning |
|---|---|
| `core-ally` | treaty-level or institutionally deep |
| `aligned` | partner; moving together on most issues |
| `neutral` | transactional; no strong pull either way |
| `strained` | cooling, damaged, or low-engagement |
| `adversarial` | active rivalry or hostility |
| `us` | the United States itself |

**Effect (the arrow) — what this president caused vs. the inherited trajectory.**

| effect | arrow | meaning |
|---|---|---|
| `helped` | ↑ | improved the US position vs. the inherited path |
| `mixed` | — | net effect is genuinely mixed, offsetting, or unclear |
| `hurt` | ↓ | worsened the US position vs. the inherited path |
| `unscored` | · | deliberately off the scoreboard (with an `unscoredReason`) |

`magnitude` (`modest` / `material` / `major`) is shown on the arrow's weight,
and applies only to `helped` / `hurt`. The two axes are independent: a country
can be `adversarial` but `helped` (an enemy handled well), or `core-ally` but
`hurt` (a friend damaged).

The full methodology — the mandatory counterfactual, the role taxonomy, the
five levers, the source rules, the honesty rules — lives in
[`CLAUDE.md`](CLAUDE.md).

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

## Notes

- The Trump map is a projected May 2026 timeline; the per-entry `outcome` line
  and the `outcomes` best/base/downside block are explicitly *projections, not
  predictions*. Region label positions are hand-placed approximations for
  navigation.
- `data/trump.js` is v3 now — the US home entry plus re-derived v3 country
  entries (China is the first one to ship). The original v2 ledger lives only
  in `data/_trump-v2-scaffold.js`, an inert reference file that is not loaded
  by `index.html` and does not register on `window.PRESIDENTS`. Scaffold
  entries are unsourced leads for the v3 re-derivation pipeline, never
  finished claims to copy. See [`CLAUDE.md`](CLAUDE.md) → *Migration* for the
  re-derivation mechanics.
- See [`CLAUDE.md`](CLAUDE.md) for the methodology, the source rules, and the
  honesty rules every entry should follow.
