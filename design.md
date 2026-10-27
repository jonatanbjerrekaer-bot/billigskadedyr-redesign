# Design.md — Billigskadedyr.dk

Denne fil er kildesandheden for designet på servicesitet (alt undtagen butikken).
Læs den, før du laver visuelle ændringer. Den skal holdes synkron med koden —
en design-doc der afviger fra koden er værre end ingen.

Sidst opdateret: 2026-10-26 (wiki-fasen, ingen-garanti-positioneringen).

## Produktets karakter

Et **lokal håndværkers** site, ikke et bureau. Papir og skovgrøn blæk: et
fysisk hæfte med faglig viden, ikke en marketingfunnel.

- **Wiki først, salg bagefter.** Siderne svarer på det, en bekymret
  boligejer googler. Vi siger ærligt, når man selv kan klare det med et
  middel til 49 kr. — også selvom det koster os en ordre.
- **Tillid gennem ærlighed, ikke gennem glans.** Ingen gradients, ingen
  skygger, ingen udsmykning. Alt er fladt papir og blæk.
- **Ærlig prisæstetik.** Ingen garanti, intet papir — kun faktura og
  kvittering. Det er sagt ligeud på siden, for det er grunden til, at vi
  er billigere. Se "Hårde regler".
- **Tæthed:** åndbar — luftige sektioner, korte afsnit, lister der må
  stå alene. Ingen mure af tekst.
- **Sætninger, ikke overskriftsråb.** Sentence case overalt, aldrig
  `text-transform: uppercase`.

## Læse-rækkefølge

**Skal læses før kodeændringer:**
1. Denne fil — karakter, regler, tokens
2. `docs/handover.md` — forretningsbeslutninger og historik
3. `docs/wiki-style-guide.md` — indholdsregler for artiklerne

**Læses ved behov:**
- `src/themes/tradesman.css` — farver og kontroller (det aktive tema)
- `src/newsprint.css` — typografi og komponent-stilarter
- `src/tokens.css` — basale tokens, scopet til `.np`
- `src/lib/pricing.ts` — al prislogik

## Grundelementer (tokens)

Alle værdier findes i koden; brug altid variablerne, aldrig hårdkodede
værdier. Værdierne her er dokumenteret med det formål, de tjener.

### Farve (tradesman.css)

| Token | Værdi (oklch) | Formål |
|---|---|---|
| `--color-paper` | 99.3% 0.004 140 | Sidens lærred |
| `--color-paper-2` | 96.6% 0.012 140 | Hævede flader, hover-wash |
| `--color-paper-3` | 93.4% 0.018 140 | Tryk-feedback, dybere wash |
| `--color-ink` | 25% 0.045 160 | Overskrifter, maksimal vægt |
| `--color-ink-2` | 34% 0.035 160 | Brødtekst |
| `--color-muted` | 47% 0.03 160 | Metatekst, underskrifter |
| `--color-rule` | 89.5% 0.015 145 | Skillelinjer |
| `--color-rule-2` | 82% 0.022 150 | Tungere skillelinjer |
| `--color-accent` | 50% 0.135 150 | **Den ene handling.** CTA'er, links, valgt tilstand |
| `--color-accent-2` | 44% 0.12 152 | Hover på accent |
| `--color-accent-ink` | 99.3% 0.004 140 | Tekst på accent (knappen) |
| `--color-focus` | 55% 0.17 255 | Fokus-ring (blå — aldrig accent) |
| `--color-navy` | 30% 0.065 158 | Mørke bånd, hero, segment-thumb |
| `--color-navy-2` | 35% 0.07 158 | Hover på navy |
| `--color-lime` | 90% 0.17 125 | Accent på mørke flader |
| `--color-lime-2` | 85% 0.18 125 | Hover på lime |

Regler for farve: accent er til interaktion og små markeringer, aldrig
store flader. Navy bånd bruger lime til handlinger og `on-ink`-tokens til
tekst. Fokus er altid den blå `--color-focus`, så den aldrig forsvinder i
designet.

### Typografi

| Rolle | Font | Vægt | Bemærkning |
|---|---|---|---|
| Display | Archivo (woff2, 100–900) | 800 | tracking −0.015em, h1 line-height 1.04 |
| Brødtekst | Manrope (woff2, 200–800) | 400/500 | 1.0625rem / 1.6, farve `ink-2` |
| Priser | Archivo | 800 | tracking −0.04em, `tabular-nums` |

Skala (scopet til `.np`): `--text-xs` 0.8125rem · `-sm` 0.875 · `-md` 1rem ·
`-lg` 1.25 · `-xl` 1.5625 · `-2xl` 1.953 · `-3xl` 2.441. Fluid: `--text-display`
clamp(2.75→5.25rem), `--text-section` clamp(2→3.5rem), `--text-lead`
clamp(1.125→1.375rem). Begge fonte er self-hosted med `font-display: swap`.

### Form & afstand

Radius: `--radius-control` 8px (kontroller), `--radius-panel` 12px
(paneler). **Ingen skygger, ingen gradients, ingen pille-knapper.**
Hierarki kommer af farveflader og luft, ikke af kanter og elevation.

### Bevægelse

| Token | Værdi |
|---|---|
| `--dur-micro` | 120ms (tryk) |
| `--dur-short` | 220ms (hover, små overgange) |
| `--dur-long` | 420ms (paneler) |
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--ease-in` | cubic-bezier(0.7, 0, 0.84, 0) |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) |

Etablerede mønstre: hover-wash = `paper-3`-baggrund; wiki-links får en
`scaleX(0→1)` accent-wash (::before, accent 14%) + `scale(1.01)` løft;
tryk = `scale(0.97)` i 120ms; segment-thumb glider 260ms; sheets
`translateY(100%)` 280/200ms med scrim-fade; `Reveal.tsx` er engangs-
IntersectionObserver (stigning 8px + fade, forsinkelse via `delay`).

`prefers-reduced-motion: reduce` slår alt fra: animationer væk, transforms
væk, reveals bliver opacity-only, thumb glider øjeblikkeligt.

## Responsivt

Breakpoints i rem: **40rem (640px)** telefon, **60rem (960px)** tablet,
75rem (1200px) til kontakt-stabling, plus `@container (min-width: 816px)`
til skadedyrslisten.

Ved ≤40rem bliver popover/selects til **bundsheets** (grabber,
`env(safe-area-inset-bottom)`, fastgjort til visual viewport), og
mobilmenuen er et fast full-screen sheet fra 72px med `overflow: hidden`
via `body:has(...)`. Pris-chip (skadedyr + pris + CTA) ligger oven på
telefonbjælken, mens man stiller på beregneren.

## Hårde regler

- **Hover kun under `@media (hover: hover) and (pointer: fine)`.** Touch
  får `:active`-feedback (`scale(0.97)`, paper-3-wash) i stedet. Ingen
  undtagelser — touch må aldrig hænge fast i `:hover`.
- **Aldrig løfter om garanti, skriftlig dokumentation eller
  forsikringspapir.** Kun "Faktura og kvittering". Ingen garanti og intet
  papir er hele forretningsmodellen og står åbent på siden. Genindførsel
  er en fejl, uanset hvor uskyldig formuleringen ser ud.
- **Al prislogik lever udelukkende i `src/lib/pricing.ts`.** Komponenter
  spørger `estimate()` — de rører aldrig tal selv. Kør
  `scripts/pricing.check.ts` efter enhver prisændring.
- **Ingenting er opfundet.** Sociale beviser er de reelle tal (Trustpilot
  3,8/5, e-mærket 4,6/5). Ingen placeholder-citater, ingen generiske
  anmeldelser, ingen opdigtede "før/efter".
- **Brug variabler, ikke hårdkodede værdier.** Farve, type, radius,
  duration, easing — alt findes som token.
- **Semantisk HTML:** nav, main, section, h1–h3, blockquote, footer.
- **Touch-mål 44px** på alt interaktivt under `@media (pointer: coarse)`
  (negativ-margin-trick, så layoutet ikke rykker sig).
- **Fokus synligt altid:** `:focus-visible`-ringe — 3px accent på felter,
  2px på segmenter/hero, lime-outline på navy, paper-outline i navy-bånd.
- `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`,
  `user-select: none` på kontroller (aldrig på løbende tekst).

## Komponentkatalog

Alt ligger i `src/components/` (servicesitet) — brug det eksisterende,
byg ikke parallelle varianter.

| Komponent | Bruges til | Fil |
|---|---|---|
| `Cta` | Alle handlinger. Primær (accent, udfyldt) og sekundær (outline). To vægte, ikke flere | `ui/Cta.tsx` |
| `Select` | Dropdowns; bliver bundsheet på telefon | `Select.tsx` + react-aria listbox |
| `SegmentTrack` | Segmented control med glidende navy-thumb | `ui/SegmentTrack.tsx` |
| `Estimator` | Prisberegneren. Inkluderet-listen og "kunne ændre"-listen afledes af svarene | `Estimator.tsx` |
| `PestQuickSelect` | Skadedyrsvælger med søgning | `PestQuickSelect.tsx` |
| `ServicePage` / `ServiceIndexPage` | Skabelon for alle 22 servicesider | `ServicePage.tsx` |
| `SpeciesCards` / `SpeciesPage` | Artikler under hver service | `SpeciesCards.tsx` |
| `Comparison` | "Os mod de andre"-tabellen | `Comparison.tsx` |
| `Benefits` | Fordele-kort | `Benefits.tsx` |
| `Packages` | 3-pakke-sammenligning, midterste fremhævet | `Packages.tsx` |
| `Faq` | Accordion (`.faq__item`, `.disclosure-trigger`) | `Faq.tsx` |
| `Reviews` / `TrustSeal` | Sociale beviser — kun reelle tal | `Reviews.tsx` |
| `MobileCtaBar` | Pris-chip fast på telefonbjælken | `MobileCtaBar.tsx` |
| `CookieBanner` | Cookie-kort nederst til venstre | `CookieBanner.tsx` |
| `Reveal` | Engangs-indgangsanimering | `ui/Reveal.tsx` |

Z-lag: sticky-nav 300 · mobil CTA-bar 300 · sheets 390–399 (scrim 390) ·
cookie-toast 500 · tooltip 600.

## Indholdsregler (sprog)

- Dansk kun. Skriv som en, der ved besked og siger det ligeud — aldrig
  overbevisende, aldrig sælgende i kammertonen.
- Artikler svarer på det, en bekymret boligejer søger, og indrømmer
  ærligt, når en professionel ikke er nødvendig.
- `docs/wiki-style-guide.md` styrer artikelstruktur og tonalitet.
- Faktuelle forbehold om forsikring (fx at husforsikring ikke dækker
  mårskader) er kundevenlig vejledning — de må godt stå. Papir-løfter må
  ikke.

## Arbejdsgange

**Før du tilføjer en ny komponent:** tjek kataloget ovenfor og
`src/newsprint.css` — findes der allerede et mønster? Byg på det i stedet
for at introducere en ny variant.

**Før du tilføjer en skadedyrsside:** kopiér strukturen fra en
eksisterende service i `src/lib/serviceContent.ts` og en artikel i
`src/lib/services/`. Indholdet følger wiki-style-guiden; løfterne er
altid "Faktura og kvittering" og aldrig dokumentation. Kør
`scripts/routes.check.mjs` og `scripts/prerender.py` bagefter.

**Før du rører priser:** kun i `src/lib/pricing.ts`, og kør
`scripts/pricing.check.ts`. Ejerens regler gælder (fx myre-loft 1.200 kr.
i 7400/7500/8800, edderkopper altid som pakke med 3.000-kr.-gulv i
Viborg/Holstebro og +500 kr. bonus-spørgsmål).

**Før merge/deploy:** `npm run build` + prerender + alle checks i
`scripts/*.check.*` skal være grønne. Se `docs/handover.md` for den
fulde deploy-rutine.

## Historik

| Dato | Ændring |
|---|---|
| 2026-10-23 | Tradesman-temaet vælges (ejerens valg), første redesign |
| 2026-10-24 | Wiki-fasen: 22 services, 76 arter, bundsheets på telefon |
| 2026-10-26 | Ingen-garanti-positioneringen skrives ind overalt; denne fil oprettes |
| 2026-10-27 | Flere skadedyr på samme besøg er et tekstlink som kørsel og nabo; skifter man skadedyr, bliver linket til "Har du også X?". Ingen kasser eller accent-striber til forslag |
| 2026-10-27 | Tilføjede skadedyr med pris pr. rum eller bo får samme tæller som hovedskadedyret under Tilpas beregningen, og prislinjen skriver antallet ("hvepse & bier (2 boer)") |

Ændrer du designet, opdaterer du tabellerne og historikken i samme
commit.
