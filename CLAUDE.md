# CLAUDE.md — project rules for Foreign Policy Atlas

This file is the single source of truth for how entries are written and rated.
It lives at the repo root so Claude Code follows it, **and** the same text
should be pasted into the shared Team Project's *custom instructions* so every
chat both of you have stays consistent. Keep the two copies in sync.

## What this project is

An interactive, president-by-president ledger of U.S. foreign-policy alignment.
Each country gets a tier (which colors the map), sourced reasoning, and a
best/base/downside outcome line. The goal is an honest analytic picture, not
advocacy for or against any administration.

## Architecture rules (do not break these)

- Content lives in `data/<president>.js`. App logic lives in `app.js`.
  Editing or adding entries must not require changing `app.js`.
- One file per president. Each file self-registers on `window.PRESIDENTS`.
- Never hand-edit the same president file simultaneously without coordinating;
  prefer to split work by president, or by region within a president, so two
  people rarely touch the same lines. Use branches + pull requests.

## The tier rubric (be disciplined about this)

- **1 Emerging gain** — a real, new alignment shift, but not yet institutionalized
  or locked in. Reversible.
- **2 Solid gain** — aligned and institutionalizing under this president; more
  than one leader or one election deep, or backed by a concrete agreement.
- **3 Established ally** — a strong relationship that predates this president.
  Mark it tier 3, not tier 1/2 — it is *maintained*, not a new win. Resist the
  temptation to credit an administration for inherited alliances.
- **4 In play** — actively courted or contested; outcome genuinely uncertain.
- **5 Strained / uncommitted** — cooling, low-engagement, or actively damaged.
- **6 Adversarial / rival**.
- **0** — the United States itself.

When unsure between two tiers, pick the more conservative (less favorable to the
president) one and explain the call in the points.

## Sourcing standard

- Every reasoning bullet should be grounded in reporting. Prefer concrete,
  datable facts ("Oct 2025: $20B currency-swap line opened") over vibes.
- Distinguish reported fact from projection. The map premise is a point-in-time
  snapshot; outcome lines (`best`/`base`/`down`) are explicitly *projections,
  not predictions* — write them as ranges of plausibility.
- If a claim can't be sourced, leave it out. Do not invent specifics.

## Honesty rules (this is what makes the ledger credible)

The prototype already models these — keep them:

- **Always show the downside.** Most country entries should include at least one
  bullet on the friction, durability risk, or cost, even for a "gain." A tier
  that has no caveat is usually wrong.
- **Mark interpretive placements.** If a tier rests on overall posture rather
  than a single named agreement, add `"interp"` as the last item in `points[]`.
  The UI then displays a "reasonable analysts could tier this differently" note.
- **Don't dress a judgment as a fact.** Where a placement is contested (e.g. a
  peace framework read as a win by some and a concession by others), say so in
  the points rather than letting the color imply certainty.
- **No partisan framing.** Describe what happened and its effects on the country
  and on U.S. interests. Avoid loaded adjectives and cheerleading in either
  direction.
- **Flag user-directed calls.** If a tier is placed at an editor's direction
  against the stricter analytic read, note that explicitly (see the existing
  Venezuela entry as the template).

## Style for entries

- Reasoning bullets: one fact or argument each, ~1-2 sentences, specific.
- Region `stakes`: deliberately state both the upside case and the damage case.
- Outcome lines: best / base / downside, each one tight sentence.

## Workflow reminder

Research and draft entries in the shared Team Project chat (web search lives
there). Commit and ship with Claude Code against the GitHub repo. Keep this file
updated as the rubric evolves — it is the contract between both contributors and
both Claude sessions.
