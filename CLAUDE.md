# CLAUDE.md — project rules for Foreign Policy Atlas

This file is the single source of truth for how entries are written and rated.
It lives at the repo root so Claude Code follows it, **and** the same text
should be pasted into the shared Team Project's *custom instructions* so every
chat stays consistent. Keep the two copies in sync.

> **v3 — the "President Effect" model.** This replaces the old tier 1–6 rubric.
> The map now reads on **two independent axes**: a **state** (the color — where
> the relationship stands today) and an **effect** (the arrow — what *this*
> president caused, measured against the trajectory they inherited). If you are
> reading an entry that still uses a `tier` field or `"interp"` in `points[]`,
> it is a v2 entry awaiting migration (see *Migration* at the bottom).

## What this project is

An interactive, president-by-president assessment of U.S. foreign policy. For
each country, the map shows two things at once: **where the relationship stands
now**, and **whether this president helped, hurt, or had a mixed/unclear effect
on the U.S. strategic position there — versus what they inherited.** The goal is
an honest, sourced analytic picture, not advocacy for or against any
administration, and not a scoreboard of "warmth."

The central research question is causal: *did this president improve or worsen
America's strategic position with respect to this country, relative to the
trajectory already in motion when they took office?* Color answers "where are we
now"; the arrow answers "what did this president do about it."

## Architecture rules (do not break these)

- Content lives in `data/<president>.js`. App logic lives in `app.js`.
  **Adding or editing entries must never require changing `app.js`.** If a new
  field needs rendering, that is a deliberate app change, not a data edit.
- One file per president. Each file self-registers on `window.PRESIDENTS`.
- Country names must match the map geometry; the `ALIAS` table in `app.js`
  handles known mismatches.
- Prefer to split work by president, or by region within a president, so two
  people rarely touch the same lines. Use branches + pull requests.

## The two axes

**State (the color) — where the relationship stands today.** A point-in-time
snapshot of the *current* relationship, independent of who caused it.

| state | meaning |
|---|---|
| `core-ally` | treaty-level or institutionally deep |
| `aligned` | partner; moving together on most issues |
| `neutral` | transactional; no strong pull either way |
| `strained` | cooling, damaged, or low-engagement |
| `adversarial` | active rivalry or hostility |
| `us` | the United States itself |

**Effect (the arrow) — what this president caused.** The president's *net causal
effect on the U.S. strategic position* over the term, judged against the
inherited trajectory.

| effect | arrow | meaning |
|---|---|---|
| `helped` | ↑ | the president improved the U.S. position vs. the inherited path |
| `mixed` | → | net effect is genuinely mixed, offsetting, or unclear |
| `hurt` | ↓ | the president worsened the U.S. position vs. the inherited path |
| `unscored` | · | deliberately off the scoreboard (see *Triage*) |

The public map uses **only these four** — no five-level arrow. False precision is
worse than honest coarseness. **Magnitude** (`modest` / `material` / `major`) is
a separate field, shown on hover, and applies only to `helped` / `hurt`.

The two axes are independent and the combination is the point: a country can be
`adversarial` but `helped` (an enemy we handled well), or `core-ally` but `hurt`
(a friend we damaged).

### The mandatory counterfactual

Every `effect` is measured against **one fixed counterfactual: the continuation
of the inherited trajectory, absent the president's major policy changes.** This
is recorded in the `inherited` field. Do **not** shop for a flattering or
damning counterfactual — the inherited path is the only baseline.

### Separate outcome from effect; credit and blame are symmetric

- `outcome` describes **what happened to the U.S. position** (the world).
- `effect` + `points` describe **what the president caused** (the attribution).

A good outcome the president merely inherited is **not** `helped` — score the
*effect* `mixed` and let `role` say `Inheritor`. A bad outcome the president
could not have changed is **not** `hurt`. Unearned gains and blameless losses
both resolve toward `mixed`. Apply the same standard to wins and losses.

## Triage — don't force every country

Not every country needs a scored effect. Use `effect: "unscored"` with an
`unscoredReason` rather than manufacturing a judgment:

| unscoredReason | use when |
|---|---|
| `noMaterialEffect` | nothing of strategic consequence happened |
| `noPresidentialEffect` | things changed, but not because of the president |
| `systemicOnly` | movement was driven by global/structural forces |
| `insufficientEvidence` | we cannot source a defensible call |

**Triage-fairness rule:** if you score the comparable *wins*, you must score the
comparable *losses*, and vice versa. `unscored` is a selection-bias surface —
audit it. Note that **neglect can itself be the critique**: if a president
ignored a country where engagement mattered, that may be `hurt` (role
`Neglect`), not `unscored`. There is no "not a priority" escape hatch.

## The entry schema

Each entry in `dossier` is an object. **Required** fields are always present;
**conditional** fields appear only where they genuinely apply. (A complete,
commented example lives in `data/_example.js`.)

### Required

| field | type / values | notes |
|---|---|---|
| `state` | `core-ally`\|`aligned`\|`neutral`\|`strained`\|`adversarial`\|`us` | the color |
| `effect` | `helped`\|`mixed`\|`hurt`\|`unscored` | the arrow |
| `magnitude` | `modest`\|`material`\|`major`\|`null` | required iff effect is `helped`/`hurt`; else `null` |
| `region` | string | must match a `regions` key |
| `outcome` | one sentence | what *happened* to the U.S. position (the world) |
| `inherited` | one sentence | the inherited trajectory = the fixed counterfactual |
| `points` | string[] | the causal argument; one sourced fact/claim each |
| `role` | see *Roles* | how the president related to the outcome |
| `confidence` | `high`\|`medium`\|`low` | confidence in the **effect attribution** |
| `evidence` | `adequate`\|`thin`\|`insufficient` | source sufficiency; `insufficient` ⇒ `effect` must be `unscored` |
| `contested` | boolean | `true` ⇒ UI shows "analysts could score this differently" |
| `counterargument` | short string | the strongest case *against* this scoring (`"—"` if none) |
| `sources` | `{label,url}[]` | claims are fetched, not recalled |

### Conditional (include only when they apply)

`unscoredReason` (required iff `effect:"unscored"`) · `levers[]` ·
`userDirected` · `decisionVsExecution` · `durability` · `opportunityCost` ·
`escalationRisk` · `crossTheaterTradeoff` · `grandStrategyDispute` ·
`longHorizon` · `omissionNote` · `linkedPolicies[]`.

See `data/_example.js` for the exact shape of each.

## Scoring tools

**The 5 levers** (score only where relevant — there is no formula; these are a
checklist, not a weighted sum):

1. **Security / threat** — deterrence, force posture, war/peace.
2. **Leverage / dependence** — who needs whom; coercive leverage gained or lost.
3. **Rival-denial** — did this deny China/Russia/Iran a foothold, or hand them one?
4. **Coalition / institutional** — alliances, blocs, institutions strengthened or eroded.
5. **Economic / tech** — trade, capital, critical minerals, technology standards.

**Roles** (`role`): `Architect` (built it), `Accelerator` (sped an existing
trend), `Closer` (finished an inherited deal), `Stabilizer` / `Active
Stabilizer` (held the line), `Inheritor` (received a result they didn't cause),
`Bystander` (uninvolved), `Neglect` (harmful inaction), `Spoiler` (broke
something).

## Analytic stance

Aim for a **balanced national-interest assessment.** Do not adopt a single
school as the house view:

- Do not assume the goal is always a closer/warmer relationship. Sometimes
  distance, pressure, or restraint serves U.S. interests.
- Do not treat alliances and cooperation as automatically good *or*
  automatically a "subsidy." Both the liberal-order case (alliances, institutions,
  legitimacy are strategic assets) and the realist/restraint case (interests over
  values, avoid overextension) are legitimate lenses.
- Where the *sign* of an effect depends on which grand-strategy school you hold
  (primacy / liberal-internationalist / restraint), say so in
  `grandStrategyDispute` rather than quietly picking one.

## Source rules (this is the most important section)

- **Claims are fetched, not recalled.** Every `points` bullet should trace to
  reporting captured in `sources`. Prefer concrete, datable facts over vibes.
- **Be honest about sufficiency.** Set `evidence` truthfully. If the sourcing is
  `insufficient`, the entry is `unscored` — do not guess.
- **Prefer `unscored` to a confident guess.** A blank is more credible than a
  fabricated judgment. The failure mode for an LLM author is not shallowness —
  it is *fluent confabulation*: a well-written, plausible, unsourced claim.
- **Red-team marquee cells with a different model or a human.** Any high-stakes
  entry (the load-bearing relationships) gets a second, adversarial read from a
  *different* author than the one who wrote it. An LLM will import its own
  training-era bias; a different reviewer is the cheapest correction.

## Honesty rules (this is what makes the assessment credible)

- **Always show the downside.** Every scored entry carries a real
  `counterargument` — the strongest case the *other* direction. An entry with no
  honest counterargument is usually mis-scored.
- **Mark contested calls.** Set `contested: true` whenever a placement rests on
  overall judgment rather than a single decisive fact, or where serious analysts
  would land differently. (This replaces the old `"interp"` flag.)
- **Don't dress a judgment as a fact.** Where a placement is genuinely disputed,
  the color/arrow must not imply certainty the evidence doesn't support — say so
  in `points` and `counterargument`.
- **No partisan framing.** Describe what happened and its effect on U.S.
  interests. Avoid loaded adjectives and cheerleading in either direction.
- **Flag user-directed calls.** If a placement is set at an editor's direction
  against the stricter analytic read, record that in `userDirected` (the
  Venezuela entry is the template).

## Known limitations (disclose these; don't pretend they're solved)

- **Omission bias.** Errors of commission (things done) are easier to see than
  errors of omission (things neglected). The fixed counterfactual helps but does
  not eliminate this.
- **Triage-selection bias.** What we choose to score, and what we leave
  `unscored`, is itself a judgment. The triage-fairness rule is a guardrail, not
  a guarantee.
- **Grand-strategy tilt.** Some effects only have a clear sign once you assume a
  school of grand strategy. `grandStrategyDispute` discloses these; it cannot
  make them neutral.

## Region & systems layers

- `regions` keeps the narrative layer (`tilt`, `dynamics`, `projects`, `goal`,
  `stakes`). `stakes` must state both the upside and the damage case.
- `outcomes` keeps the best / base / downside projection lines — explicitly
  *projections, not predictions*; write them as a spread of plausibility.
- `systems` (optional, **deferred to post-v1**) is a reserved top-level field for
  the Global Systems Panel — alliance architecture, dollar/financial power, the
  trade order, tech standards, nonproliferation, maritime, energy/minerals,
  legitimacy. The map is not a scoreboard; system-level effects live here, not in
  per-country cells. Leave it out until that surface is built.

## Per-president (file-level) fields

`id`, `label`, `subject` (e.g. `"Trump"` — drives the president-agnostic title),
`headline` (optional override), `blurb`, `asOf`, `foot`, `version` (stamp each
revision of the card), plus the data objects `dossier`, `regions`, `outcomes`,
and the optional `systems`.

## Migration (v2 → v3)

Existing `data/trump.js` is v2 (`tier`/`state`+`delta`, `baseline`, `"interp"`).
It is **scaffolding to re-derive, not relabel.** When migrating an entry:
`baseline` → `inherited` (sharpen into an explicit counterfactual); the warmth
`delta` is *discarded* — re-derive `effect` causally; `"interp"` in `points[]` →
`contested: true`; add `outcome`, `role`, `confidence`, `evidence`,
`counterargument`, `sources`. Re-source every `points` bullet; if you can't, the
entry goes `unscored`.

## Workflow reminder

Research and draft sourced entries in the shared Team Project chat (web search
lives there) — that is the authoring pipeline. Commit and ship with Claude Code
against the GitHub repo. Keep this file updated as the model evolves — it is the
contract between both contributors and both Claude sessions.
