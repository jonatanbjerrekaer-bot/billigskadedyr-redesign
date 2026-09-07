# Review round 2 — tasks C and D (commits 5fe1241, 240c492)

Reviewer: Kimi (Mac). Reviewed 2026-09-06 against
`docs/implementation-plan-owner-brief-2026-09-06.md`.

## Verdict

- **Task C (phone field): passes.** Verified in headless Chrome: `type=tel`,
  `autocomplete=tel`, `inputmode=tel`, side-by-side from `sm` up, stacked at
  375 px, Danish validation copy reads well. No changes.
- **Task D (service sub-pages): structure passes, copy fails.** The nine
  pages, the Vite MPA wiring, the `data-pest` handover, per-page title and
  meta description, sibling navigation, sitemap and robots.txt are all to
  spec and verified rendering. One blocking problem below.

## F1 (blocking): the copy in `src/lib/serviceContent.ts` is corrupted

Every Danish æ/ø/å is transliterated (`goere`, `foer`, `paa`, `roedlig`),
and on top of that a large number of words are garbled into things that are
not Danish at all. Live-verified in the browser at `/service/rotter/`. A
sample of what is in there now:

- `Skaermdokumentation` (should be `Skriftlig dokumentation`)
- `du skriftlig dokumentation` (the verb `får` is missing)
- `gnavner i elledning` (should be `ledninger`)
- `bryn` used for bryggers, `suturer` for sømme, `viene` for spind,
  `pib` for stik, `Kover` for kryber, `tarmaet` for tørrer ud,
  `bortforsket` for overset
- `lauftra` / `nauletra` for løvtræ / nåletræ
- `Den morgenbyerske kakerlak` for amerikansk kakerlak (and it duplicates
  the orientalsk card), `Surhedsfluen` for bananflue

These pages exist for SEO and the owner will read them. As written they
would embarrass the site.

**Fix, exactly this and nothing else:** the corrected copy is in
`docs/service-content.replacement.ts`, already reviewed for spelling and
register. Apply it verbatim:

```
cp docs/service-content.replacement.ts src/lib/serviceContent.ts
```

Do not regenerate, paraphrase or "improve" the text. If a string ever has
to change for a code reason, keep æ/ø/å intact. Never write Danish UI copy
through a pipeline that folds non-ASCII characters.

## F2: dead pest-pick channel

Since the pest cards became links to the service pages,
`requestPestPick()` has no callers anywhere. Delete:

- `src/lib/estimatorSelection.ts` lines 52-76 (the whole pest-pick block:
  `pendingPick`, `pickListeners`, `subscribePestPicks`, `requestPestPick`,
  `consumePestPick`, and the comment above it)
- In `src/components/Estimator.tsx`: remove `consumePestPick` and
  `subscribePestPicks` from the import (lines 19-23), delete the
  `useEffect` that subscribes to picks (the block with the comment
  "A pest card in the grid above can carry its choice here", roughly
  lines 105-115)

Keep `publishEstimatorSelection` / `useEstimatorSelection` — the contact
form subscribes to those.

## F3: hero subhead says "fast pris" twice

`src/components/Hero.tsx` line ~23: "Professionel skadedyrsbekæmpelse til en
fast pris. Vi kommer ud i hele Jylland og på Fyn, og prisen ligger fast,
før vi går i gang." Change the first sentence to:

"Professionel skadedyrsbekæmpelse, når du har brug for det."

Leave the rest of the subhead untouched.

## F4: typo

`src/components/PestQuickSelect.tsx` line 23: `in detale` -> `in detail`.

## Verification before committing

1. `npm run build` must pass.
2. Headless-check at least `/service/rotter/` and one other service page:
   correct `<title>`, h1, and no transliterated `goer|foer|paa ` in the
   rendered body text.
3. Commit each task as its own commit, usual message style (summary
   subject, blank line, `- ` body lines). Never commit
   `docs/handover.md` or `.hermes-build-spec/`.
