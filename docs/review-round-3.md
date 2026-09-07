# Review round 3 — owner's annotated screenshots (2026-09-07 08:18)

Reviewer: Kimi (Mac), from the five screenshots Jonatan sent Hermes at 08:18.
Applied on top of `ffa26ad`. All strings live in `docs/r3-strings.json`
(exact UTF-8 old/new pairs) so nothing Danish is ever retyped.

## R3-1. Comparison section: duplicated row and stale count

Screenshot 2 shows the "Sådan gør vi det anderledes" section with the last
"Sådan gør vi" row duplicated, and the subhead still says "Fem steder" while
the section has four rows. Both sides also had near-duplicate documentation
rows. Fix:

- Replace the last ROWS entry pair. Other side: "Ingen dokumentation af
  behandlingen" becomes "Kategorier efter produkttype" (restores the pairing
  from the earlier 5-row version, without the webshop rows). Our side: the
  duplicated documentation string becomes "Kategorier efter skadedyr. Du
  tænker "rotter", ikke "smækfælde"" (curly quotes, same style as the first
  row's "Kontakt os for pris").
- Subhead: "Fem steder branchen gør det besværligt" -> "Fire steder ...".
- Rows 1-3 stay exactly as they are. "Den rigtige behandling først. Vi
  kigger, vurderer, og behandler derefter" is the owner's approved wording
  (highlighted in his screenshot) and is already row 2.

## R3-2. Hero trust point still references DIY

Screenshot 4 highlights the trust point "Kan du klare det selv, siger vi det
ligeud". The owner has rejected DIY framing site-wide. Replace it with the
same approved line from the comparison: "Den rigtige behandling først. Vi
kigger, vurderer, og behandler derefter".

## R3-3. Phone field must not be required

Screenshot 5 highlights the forced phone validation error. The phone field
stays, but empty is fine: validate the digits only when something was typed.
Email remains the required contact channel (site convention: email first).
Mark the label "Dit telefonnummer (valgfrit)" so the expectation is visible.

## Method (do not deviate)

1. Apply every pair in `docs/r3-strings.json` with a small python script
   that loads the JSON and does exact substring replacement. Assert each
   `old` occurs exactly once before replacing. Never retype the strings.
2. `npm run build` must pass.
3. Headless-verify: home hero no longer contains "klare det selv";
   comparison renders 4 rows, the two "Sådan gør vi" documentation strings
   are not duplicated, "Fire steder" is present; contact form submits with
   empty phone + valid email + message (no phone error), and a 3-digit phone
   still raises the too-short error.
4. Commit each R3 item as its own commit (R3-1, R3-2, R3-3), usual message
   style, including the dist/ changes from your build. Never commit
   docs/handover.md or .hermes-build-spec/. Keep the docs/ review files
   untracked.
