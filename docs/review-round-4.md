# Review round 4 — the owner's own feedback, recovered

Source: the owner's iMessage of 2026-09-07 08:18:43, with five screenshots.
That message was lost when `/stop` was sent at 08:19:32, so it never reached
Hermes and none of it was implemented. Round 3 was written without it and made
two of these items worse. This round is the owner's feedback, verbatim in
intent, plus the one duplicate he flagged afterwards.

Baseline: commit `25b460e`.

Apply the exact old/new pairs in `docs/r4-strings.json`. Load the JSON, assert
each `old` occurs exactly once in its file, then replace. Do not retype any
Danish string and do not paraphrase. R4-5 is a code change and is described in
full below.

## R4-1 Comparison: revert to the approved rows, minus the webshop row

**What the owner said:** "It is worded very weird that you changed the text
completely. I need you to revert to the text we had before but without that
single webshop bullet point."

The approved five rows (screenshot IMG_4162) were:

| Sådan gør andre | Sådan gør vi |
| --- | --- |
| "Kontakt os for pris". Du ved først noget, når du har ringet | Prisen står på siden. Regn den ud, før du kontakter os |
| ~~Webshop og fagfolk på hver sit domæne~~ | ~~Ét sted: produkter til dig selv og folk, der kommer ud~~ |
| Kategorier efter produkttype | Kategorier efter skadedyr. Du tænker "rotter", ikke "smækfælde" |
| Alt sælges som en opgave for en fagmand | Vi siger det ligeud, når du selv kan klare det med et middel til 49 kr. |
| Ingen dokumentation af behandlingen | Skriftlig dokumentation, klar til ejendomsadministrationen eller forsikringssagen |

Row 2 is the webshop row and is the one row to drop. The remaining four go back
in that order. This removes "Den rigtige behandling først..." from the section
and restores the 49 kr DIY line, which the house rules require and which no
other section on the page currently carries.

The subhead already reads "Fire steder" and is correct for four rows. Leave it.

**Done when:** `ROWS` has exactly four entries in the order above, the string
`Den rigtige behandling` appears nowhere in `src/`, and `49 kr.` appears in
`Comparison.tsx`.

## R4-2 Hero: delete the third trust point

**What the owner said, pointing at the third bullet:** "This line here in the
hero section should be removed. Do not touch the other text."

The line he highlighted was "Kan du klare det selv, siger vi det ligeud"
(screenshot IMG_6957). Round 3 replaced it with "Den rigtige behandling først.
Vi kigger, vurderer, og behandler derefter" instead of removing it, which is
why the hero now carries a line that reads as nonsense in that position.

Delete the third entry. Do not substitute anything. The hero keeps two trust
points. The DIY idea it used to carry now lives in the comparison row restored
by R4-1, so nothing is lost.

**Done when:** `TRUST_POINTS` has exactly two entries and neither of the two
deleted sentences appears anywhere in `src/`.

## R4-3 Hero: the subhead repeats trust point 1

The subhead ends "og prisen ligger fast, før vi går i gang" and the first trust
point directly below reads "Fast pris, aftalt før vi går i gang". Same promise,
twice, four lines apart.

Cut the clause from the subhead. The trust point keeps it.

**Done when:** the hero subhead ends at "hele Jylland og på Fyn." and the page
states the fixed-price promise once.

## R4-4 Phone number: say what it is for

**What the owner said:** "The phone number here is for 'akut' emergencies
during or at the job primarily. What do you suggest we do to convey this
information a little bit more?"

Recommendation: qualify the number where it is shown, rather than adding a new
section. Email stays the primary channel per the house rules, so this does not
promote the phone, it narrows it. Two places carry a bare number:

- `UspBar.tsx` labels it "Professionel rådgivning", which invites general
  sales calls. Change the label to "Akut hjælp".
- The hero contact strip shows the digits with no context. Add a small second
  line under them: "Akut og igangværende sager".

The contact form's phone field needs nothing further: round 3 already made it
optional and labelled it "(valgfrit)", so nobody is forced to give a number for
an ordinary enquiry.

**Done when:** both places name the acute use, and the email address still
appears before the phone number in the hero strip and the footer.

## R4-5 Service pages: the top navigation goes nowhere

**What the owner said:** "The service pages are really well designed, I like
them. Just one issue is that the navigation in the top navbar doesn't work when
I'm on the service page." Repro:
`http://localhost:5173/billigskadedyr-redesign/service/myrer/#faq`

**Cause:** `Header.tsx` links to bare hashes (`#pest`, `#estimator`,
`#process`, `#faq`, and `#top` on the logo). Those ids exist only on the front
page. `ServicePage.tsx` renders `Header`, `UspBar`, `Footer` and `MobileCtaBar`
but none of the front-page sections, so the browser sets the hash and stays put.
No error, nothing moves.

The same bug hits `CONTACT_HREF` (`#skriv`): `Contact.tsx` is the only thing
that renders `id="skriv"`, and `ServicePage` does not render it. So the header's
"Skriv til os" button, the service page's own mail CTA and `MobileCtaBar` are
all dead on a service page too.

**Fix:** one helper next to `CONTACT_HREF` in `src/components/ui/Cta.tsx`:

```ts
// ponytail: service pages carry none of the front-page sections, so a bare hash
// goes nowhere. Prefix with the site root when we are not on the front page.
export const homeHref = (hash: string) =>
  location.pathname.includes("/service/") ? import.meta.env.BASE_URL + hash : hash;
```

Then wrap every front-page hash that a service page can render:

- `Header.tsx`: the four `NAV_LINKS` hrefs in both the desktop nav and the
  mobile nav, the logo's `#top`, and the `CONTACT_HREF` button.
- `MobileCtaBar.tsx`: its `CONTACT_HREF` usage.
- `ServicePage.tsx`: its calculator and mail CTAs, if they use bare hashes.

Keep it to href values. Do not add a router, and do not change any of these
links on the front page, where the bare hash is still correct and still gives
the smooth scroll.

**Done when:** from `/service/myrer/`, clicking Skadedyr, Priser, Forløb, FAQ
and "Skriv til os" each land on the front page at the right section, and the
same links on the front page still scroll in place without a reload.

## Non-goals

- No new sections, no layout changes, no colour or spacing work.
- Do not touch `src/lib/serviceContent.ts`. The Danish copy there is correct.
- Do not commit `docs/handover.md` or `.hermes-build-spec/`. Keep the review
  files in `docs/` untracked.

## Commits

Three, in the repo's usual style: R4-1 and R4-2 and R4-3 together as the copy
commit, R4-4 as the phone commit, R4-5 as the navigation fix. Run `npm run
build` before each and include the refreshed `dist/`.
