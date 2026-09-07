# Implementation plan: owner brief 2026-09-06

Source: owner review meeting. The owner likes the design as a replacement for
https://billigskadedyrprof.dk/ (professional call-out service). He does NOT
sell through, and does not want to promote, the ecommerce webshop
(billigskadedyr.dk). The product is him: professional help coming out.

Non-goals (owner explicitly deferred — do NOT implement):
- Zip code field in the contact form (future: driving-distance pricing idea).
- Price table corrections (owner noted myrer starts around 600 DKK; current
  PRICE_TABLE says 1200-2500 — parked, needs a pricing-source conversation).

Working rules for whoever implements this:
- Run the humanizer patterns over every new/edited user-facing string (no
  em/en dashes in UI copy, complete sentences, trustworthy-tradesman register,
  target audience is 30+ Danish homeowners).
- `npm run build` must pass after every task, and each task ends with a
  headless-Chrome check that the changed UI actually renders (launch
  `"Google Chrome" --headless=new --remote-debugging-port=<port>
  --user-data-dir=<fresh dir>`, drive via CDP `Runtime.evaluate`).
- Commit style: summary subject, blank line, `- ` body. Never commit
  `docs/handover.md` (Jarvis/Claude's notes). Push when the user says push:
  rsync the Mac copy over first if the change was made there.

## Task A — Remove webshop references

Sweep, verified against current source. The DIY sales path goes with it: the
owner does not position the site as DIY guidance ("the product he is selling
is him"). Where the DIY/pro distinction (`path` in lib/pests) was only there
to route people to the shop, it becomes dead weight — remove it.

1. `src/components/Hero.tsx` (~line 22-45): remove the "Webshop" inline link
   from the subhead and rewrite the sentence without the webshop (e.g.
   "Professionel bekæmpelse til en fast pris — vi kommer ud i hele Jylland og
   på Fyn." — humanize, no dashes). Remove the now-stale comment.
2. `src/components/Header.tsx` NAV_LINKS: delete the "Webshop" external entry
   (restores the original four links).
3. `src/components/Footer.tsx`: delete the Webshop menu item. The legal links
   (handelsbetingelser, fortrydelsesret, fortrydelsesformular,
   privatlivspolitik) point at the shop domain — repoint to the prof site's
   existing pages: https://billigskadedyrprof.dk/privatlivspolitik/ and
   https://billigskadedyrprof.dk/cookie-politik/ (drop the two shop-consumer
   pages, they are meaningless without a shop).
4. `src/components/PestQuickSelect.tsx`: remove the DIY/pro sub-labels under
   each card ("Bedst med professionel hjælp" / "Klarer du selv med de rette
   produkter"). Cards keep icon + name and link to the pest's new service
   page (Task B) instead of `#estimator`/webshop; the estimator preselect
   pick channel (`requestPestPick`) can stay wired for the estimator CTA or
   be dropped — simplest: cards link to service pages, drop the pick on
   cards (service page has its own calculator CTA).
5. `src/components/TwoPathRouter.tsx` + `src/App.tsx`: delete the section
   entirely (App.tsx line 30). A "Klar det selv — fra 19 kr." card
   contradicts the owner's positioning. Repoint the one reference:
   `src/components/Faq.tsx` line 21 CTA `href: "#router"` — change to
   `#pest` or remove that FAQ entry's CTA.
6. `src/components/Estimator.tsx`: remove the whole `diyRow` block (the third
   facts row with "Klar det selv fra …", webshoppen links, and the
   ShieldCheck/ShoppingBag import usage). The `facts` list keeps the two
   remaining rows.
7. `src/components/UspBar.tsx` line 19: replace "Fra 19 kr. i webshoppen"
   (e.g. "Fast pris, aftalt før vi går i gang" — check for dupes with the
   other three slots; humanize).
8. `src/components/Comparison.tsx` line 15: row "Webshop og fagfolk på hver
   sit domæne" — rewrite or drop; the comparison table's angle ("same place
   sells products AND service") is dead. Simplest: reword the row to compare
   on something real (price transparency, documentation, response time).
9. `src/components/TrustSeal.tsx` line 128: "e-mærket webshop · N bedømmelser"
   — the e-mærket certificate belongs to the shop. Reword to drop "webshop"
   ("e-mærket · N bedømmelser") or drop the seal's claim if it can't stand
   without the shop context. Flag in the commit message if the claim's truth
   is in doubt.
10. `src/lib/pests.tsx`: remove `shopUrl` from PestEntry and all entries.
    `path` ("diy"/"pro") is now unused after 4/6 — remove it too unless a
    Task B use appears.
11. `src/lib/pricing.ts`: `DIY_FROM` + `diyFrom()` become unused — delete
    them and the comment block about the WooCommerce scrape.
12. `src/components/ui/Cta.tsx`: `SHOP_URL` and the `external` prop become
    unused — remove them.
13. `src/components/Faq.tsx` `ARTICLES` (lib/articles.ts): excerpts link to
    billigskadedyr.dk blog posts. That is content, not a shop CTA — KEEP for
    now, but flag to the owner that these reference the other domain.
14. Footer contact email info@billigskadedyr.dk: keep unless the owner says
    otherwise (same business, still valid).

## Task B — Remove the "garanti" claim (owner: no guarantee in his work)

That is why he can be cheap; the site currently promises the opposite.
- `src/components/Estimator.tsx` line 230: "Garanti på behandlingen" in the
  "Prisen dækker" list — remove or replace ("Opfølgning på behandlingen" —
  the opfølgning rows already exist, so plain removal is fine).
- `src/components/Packages.tsx` line 58: comparison row "Garanti på
  behandlingen" with three checkmarks — delete the row (and re-balance the
  table if needed).
- `src/components/Faq.tsx` line 52: the "garantiperiode" answer — rewrite to
  what is actually true (opfølgning, ring hellere for tidligt), no invented
  replacement promises.

## Task C — Contact form: phone input next to email

`src/components/InquiryForm.tsx`:
- New phone field beside the email field. Layout: `grid gap-4 sm:grid-cols-2`
  wrapper — stacked vertical on phones, two columns from `sm` up. This is
  the exact behaviour the owner asked for.
- Phone input: HeroUI `Input`, `type="tel"`, `name="phone"`,
  `autoComplete="tel"`, `inputMode="tel"` (the email field already has
  `autoComplete="email"`). Danish mobile numbers: keep validation lenient —
  required, minimum 8 digits, strip spaces. Error copy in Danish under the
  field, same ERROR style as the others, validated in the existing manual
  submit path.
- Add phone to the `Errors` type and the submit validation. It stays local
  UI state just like email (the fake send still just waits and toasts).
- Humanize the label: "Dit telefonnummer". Placeholder: "fx 24 24 55 83".
- The consent line, draft prefill, clear/apply-draft buttons: unchanged.
- Verify with CDP: autofill attributes present in the DOM, both fields
  stack at 375px width and sit side by side at 1280px, validation fires on
  submit for a bad number.

## Task D — Service sub-pages (SEO pages), the big one

Owner "really wants" pages like https://billigskadedyrprof.dk/service/<pest>/
as sub-pages of the redesign. Reference structure (scraped from
/service/service-2/, myrer): hero with "Professionel bekæmpelse af X" + intro,
"Hvorfor er professionel X-bekæmpelse mere effektiv?" (bullets), "Hvad er X –
og hvilke arter?" (species), then process/price/CTA and the contact block.
The prof site also has pages for møl, myg, snegle, muldvarpe, gåsebiller,
klannere, stankelben — v1 covers the site's own 8-9 registry pests
(rotter, myrer, hvepse, vaeggelus, soelvfisk, borebiller, kakerlakker, fluer,
edderkopper), extras later if the owner asks.

Routing (GitHub Pages is static — no server rewrites):
- Vite multi-page build: add `build.rollupOptions.input` entries
  `service/<slug>/index.html`, one per pest, each a ~15-line HTML shell that
  loads a shared `src/service-entry.tsx` and passes the slug via
  `<html data-pest="<slug>">`. Dev server serves them at
  `/billigskadedyr-redesign/service/<slug>/`; build emits
  `dist/service/<slug>/index.html`, so GH Pages serves the pretty URL.
- `vite.config.ts` already sets `base: '/billigskadedyr-redesign/'`, so
  Vite-generated asset URLs are absolute and work at any depth. In-code
  references must use `${import.meta.env.BASE_URL}` (the existing pattern).
- `src/components/ServicePage.tsx`: renders Header + Footer chrome (reuse the
  existing components; Header's mobile nav state lives in App.tsx, so either
  lift a slim header state into ServicePage or accept `mobileNavOpen` state
  local to ServicePage — prefer a small local useState duplicate over
  refactoring App).
- Content model: extend `PestEntry` in lib/pests.tsx with `service?: { intro,
  whyProfessional: string[], species: { name: string; text: string }[],
  processNote: string }`, or a separate `src/lib/serviceContent.ts` keyed by
  slug (prefer the separate file — keeps the registry lean). Write the copy
  fresh in Danish following the owner's structure; do NOT copy his text
  verbatim (duplicate-content SEO penalty) and do not invent facts — reuse
  only what is already sourced on our page or on his (25 års erfaring,
  sprøjtecertificeret, miljøgodkendte midler, arter descriptions).
- Page chrome: hero (pest glyph, "Professionel bekæmpelse af X", intro),
  why-professional list, species section, price pointer ("Se vejledende pris
  i beregneren" → `/${BASE_URL}#estimator`), CTA "Få et fast tilbud" →
  `/${BASE_URL}#skriv`, footer. Each page sets its own document.title and
  meta description (plain DOM manipulation in the entry, or a tiny helper —
  no react-helmet dependency).
- Internal linking: pest grid cards (Task A item 4) link to
  `${BASE_URL}service/<slug>/`; service pages cross-link siblings ("Læs også
  om …") — optional, nice for SEO.
- sitemap.xml + a link-check pass before pushing.

Definition of done: `npm run build` passes; all 9 service URLs render with
correct title, hero, and CTA links in headless Chrome; pest grid cards point
at them; no `webshop` string remains in src/ except the FAQ article excerpts
(flagged); no `garanti` promise remains.
