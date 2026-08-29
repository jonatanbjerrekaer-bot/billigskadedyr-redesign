# Billigskadedyr.dk / billigskadedyrprof.dk - Design Audit

Date: 2026-08-29. Scope: full crawl of both live sites + pricing benchmark + review search.
Evidence: screenshots in docs/before/ (390/768/1440 per page), live HTML, Trustpilot, e-mærket.

## 1. The two-site problem (core issue)

billigskadedyr.dk (webshop, WooCommerce) and billigskadedyrprof.dk (service, WordPress) are
run by the same owner (CVR 40306633, DFN v/Daniel Nemborg) but read as two unrelated
companies:

- Different visual identity (no shared palette, type, or components)
- Different information architecture: shop is organised by product type (rottegift, fælder,
  sprøjter), service site is a flat landing page with one contact form
- A visitor who needs a professional must guess that the prof site exists. The shop's
  "Professionel hjælp" section is just a phone number and the text "Ring og få et
  uforpligtende tilbud" - no link to the service site, no explanation of what the service
  actually is
- A visitor who just wants a trap on the service site has nowhere to shop

Result: both audiences under-convert. DIY customers never discover the product range is
curated by a professional; service customers never discover the shop exists.

## 2. Navigation and taxonomy (shop)

- Shop menu is organised by product structure: "Rotter & Mus > Rotter > Rottegift /
  Rottefælder / Giftstationer / Lokkemiddel / Monitorering". This is the company's internal
  catalogue, not the visitor's mental model. A visitor with a rat problem cannot tell how
  many steps deep the answer is.
- Category names mix pests and products: "Insekter" sits next to "Fuglesikring",
  "Mærker" (brands) is a top-level category, "Artikler" is top-level
- 35+ product categories at top level. No pest-first entry point
- No search field with placeholder text on the category pages (search box exists but is
  icon-only in some views)
- /artikler/ (200+ SEO articles) is not surfaced as a trust/authority signal anywhere on
  the service side

## 3. Conversion blockers (shop)

- Hero says "Din specialist i skadedyrsbekæmpelse" but the page is a shop - the value prop
  ("professionel rådgivning + billige DIY produkter") is stated in body copy, not the hero
- No price ranges anywhere on category pages. Prices only on product detail pages
- "Markedets måske billigste priser" - unverifiable superlative in the trust strip
- "E-mærket webshop" claim: verified, e-mærket certificate exists (certifikat.emaerket.dk/
  billigskadedyr.dk, 4.6/5, 110 verified reviews). This is a real trust asset that is
  underused
- Opening hours shown: Ma-Fr 08-18, Lø-Sø 12-16 (shop) vs Ma-Fr 08-21, Lø-Sø 12-16 (prof).
  The mismatch is unexplained and looks like an error

## 4. Service site (billigskadedyrprof.dk)

- Single landing page. One form (name, phone, email, address, postcode, city, service
  select, m², "Andet"). No pricing, no process explanation, no social proof
- "Vælg service" dropdown lists 13 pests + "Andet" - the visitor must read all 14 options
  before they can submit
- Lorem ipsum text present in production (hvepse service section): "Lorem ipsum dolor sit
  amet, consectetuer..." - visible to every visitor
- "Stankelben" listed as a service (a harmless insect) - dilutes credibility
- Om os claims "næsten 20 års erfaring" and "mere end 25 års erfaring" on Facebook - the
  numbers are inconsistent across surfaces
- No mention of authorisation anywhere. R1/R2 (rat control) and B-autorisering
  (insecticides) are held per the om-os text ("alle nødvendige autorisationer") but are
  not verifiable from the site and not linked to Miljøstyrelsen
- No reviews, no case studies, no certifications displayed
- Quote form has no price anchor. Visitors cannot compare against competitors who publish
  per-job prices

## 5. Social proof (verified)

- Trustpilot: 3.8/5, 44 reviews. Split: 59% 5-star, 34% 1-star. The 1-star themes are
  unfulfilled orders, unanswered calls, and ineffective products. Genuine and worth
  showing honestly - the 5-star reviews repeatedly name Daniel's advice as the reason for
  choosing them
- e-mærket: 4.6/5, 110 verified reviews
- No Google Business / Trustpilot presence found for the prof domain
- No R-autorisering verification link found publicly. Treated as unverified for the
  redesign; flagged as a handover question

## 6. Pricing benchmark (DKK, single treatment, incl. tax, 2025-2026)

Source: skadedyrforbudt.dk/priser, skadedyrservice.dk, djurslandskadedyr.dk/priser,
myreexpressen.dk/priser, denrodemyre.dk/priser, handyhand.dk.

- Myrer: 1.200-2.500 (from 1.100 handyhand, 1.250 djursland, 2.000 skadedyrservice)
- Mus: 1.200-2.200
- Rotter: 1.800-3.000 (skadedyrforbudt from 1.800 + free follow-up; skadedyrservice 2.200)
- Væggelus: 2.500-4.500 (skadedyrservice 2.200 per treatment; multi-visit typical)
- Skægkræ/sølvfisk: 2.000-3.000
- Hvepsebo: 850-2.000 (denrodemyre 850 for nest)
- Borebiller: 2.500-4.500 (skadedyrservice 2.500 pr. behandling)
- Kakerlakker: 2.000-3.500
- Edderkopper: 1.800-2.500 (skadedyrservice 2.200)
- Property type: erhverv typically +20-40% (documentation, access coordination)
- Follow-up visits: 750 kr/h (myreexpressen) or included (skadedyrforbudt)

Shop product anchors (real, from WooCommerce Store API):
- DIY traps: 39-150 kr (PS Trip-Trap 39,00; T-Rex 349; Smækfælde+lokkemad 49,95)
- Bait/station: 279-1.499 kr (Musegift pakke 279,95; Edialux Warden 39,95; Advion Gel 629)
- Professional-strength products: 1.449-4.599 kr (Provecta 1.449; Maxforce Platin 4.599)
- A-Tox+ (rat, bulk): 2.099,95 kr

## 7. Brand direction (from Dribbble reference 27471845)

Dark forest-green surfaces, orange accent, large rounded cards, condensed all-caps display
headings, thin line icons in filled square tiles, generous whitespace. Two CTA weights:
one primary (orange, filled), one secondary (outline). Fix: the reference's two
equal-weight hero buttons - this design differentiates them.

## 8. Design decisions for the unified page

1. Two-path router right below the hero: "Klar det selv" vs "Få en professionel ud".
   Each card states audience, rough price, and time to resolution
2. Pest-first quick-select (rotter, myrer, hvepse, væggelus, skægkræ, borebiller,
   kakerlakker, fluer/myg) - each card routes to the right path
3. Price estimator as the centrepiece. m2 slider + pest + property + severity, outputs a
   RANGE labelled "Vejledende prisoverslag". Rate table in src/lib/pricing.ts, one file
   to edit
4. Packages (3 tiers, middle highlighted) only on the pro path
5. Reviews section uses only verified Trustpilot/e-mærket quotes, with the 3.8/5 and
   4.6/5 numbers stated plainly. No invented reviews
6. Trust strip: e-mærket (verified), CVR 40306633, "siden 1997" (company founding per
   om-os), no authorisation claim until verified
7. Demo disclaimer in footer + banner: unofficial redesign concept by Jonatan
   Daugbjerg Bjerkjær, not affiliated with or endorsed by the business
8. No named competitor comparisons. Comparison block vs "typical industry practice"
9. All copy in Danish, du-form, humanised (no em-dashes, no "I en verden hvor")
10. Flexbox only, no CSS Grid. Theme tokens in index.css. WCAG AA contrast verified.
    44px touch targets. prefers-reduced-motion respected

## 9. Open questions for the friend (handover note)

1. Which address is current: Viengevej 6A, 8240 Risskov (site) vs Engskovbakken 122,
   8541 Skødstrup (Trustpilot company info)?
2. Confirm R1/R2 autorisation numbers and B-autorisering for display. If yes, add a
   "Se autorisation" link to mst.dk
3. Reconcile opening hours across both surfaces
4. Which of the 13 prof services should drop? "Stankelben" reads as filler
5. Replace the Lorem ipsum block in the hvepse section
6. Fix the 1-star order-fulfilment issues (they are the real conversion killer, not the
   design)
