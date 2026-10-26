# Billigskadedyr.dk - Design-koncept og håndtering

Skrevet: 29. august 2026. Opdateret: 26. oktober 2026 (wiki-fasen, ny prislogik, mobil). Design: Jonatan Daugbjerg Bjerkjær.
Det her er et uofficielt redesign-koncept lavet til portfoliet. Det er ikke
tilknyttet eller godkendt af Billigskadedyr.dk / BilligskadedyrPROF.

## Hvad konceptet gør

Ét samlet site i stedet for to domæner der taler forbi hinanden:

- billigskadedyr.dk (webshop, WooCommerce)
- billigskadedyrprof.dk (professorisk service, WordPress)

De to sites har i dag hver sin identitet, sit eget informationsarkitektur og ingen
hinanden-visende links. Kunder der søger professionel hjælp finder den kun ved at
kende telefonnummeret, og kunder der vil købe selvprodukter ser aldrig servicebenet.

Konceptet løser det med:

1. **Två-spors router** lige under heroen: "Klar det selv" vs "Få en professionel ud".
   Hvert kort fortæller målgruppe, vejledende pris og tidshorisont, så besøgeren kan
   vurdere hvilket ben de skal til.
2. **En dansk skadedyrwiki**, ikke bare en landingsside: 22 services (myrer, edderkopper,
   rotter, klannere, vildedyr ...) med 76 arter på undersider. Hver art har eget
   prærenderet URL, artsbeskrivelse, FAQ og krydshenvisninger. Stilen er en wiki,
   ikke marketing: kort, konkret, ærlig om hvornår man ikke behøver en fagmand.
3. **Prisberegner** som centralt element. Den viser ikke et interval — den viser de
   priser ejeren selv offentliggør (src/lib/pricing.ts, OWNER_PRICES), plus kørsel
   ud fra postnummer og naborabat. Sæson læses af uret, ikke af et spørgsmål.
   Ejers regler fra oktober 2026:
   - Myrer i Herning, Holstebro og Viborg: aldrig over 1.200 kr. i alt (cap).
   - Edderkopper sælges aldrig som én behandling — altid forår + efterår pakken.
     I Viborg og Holstebro er pakken minimum 3.000 kr. (floor).
   - Edderkopper kan tilvælge en bonusbehandling i sæsonen for 500 kr. — det
     spørger beregeren om, det antages ikke.
   - Fra to huse skjules areal og angrebsgrad (prisen styres af antallet),
     kun boligtype bliver stående.
4. **3 pakker** på pro-sporet, hvor den midterte er fremhævet.
5. **Sociale beviser** fra Trustpilot og e-mærket med de reelle tal (3,8/5 på
   Trustpilot, 4,6/5 på e-mærket). Ingenting er opfundet.
6. **Cookie-banner** der viser førstegang og gemmer valget i localStorage.

Mobilt (≤640 px) er skadedyrsvælgeren en bundsheet fastgjort til den visuelle
viewport, med pris-chip (skadedyr + pris + CTA) der ligger sig oven på
telefonbjælken mens man stiller på beregneren.

## Forretningspositionering: ingen garanti, intet papir

Ejerens model er med vilje anderledes end konkurrenternes: han giver
**hverken garanti eller skriftlig dokumentation** (kun faktura/kvittering).
Det er hele grunden til, at han kan være billigere - konkurrenterne har
gratis genbesøg og garanti med i prisen og taber penge på dem. Sitet siger
det ligeud som et salgsargument (sammenligningstabel, fordele, pakker,
service-sider). **Genindfør aldrig løfter om skriftlig dokumentation,
garanti eller forsikringspapir** - kun Faktura og kvittering.

## Design

Papir og skovgrøn blæk (oklch-tokens i tradesman.css): lys papirbaggrund, mørk
grøn tekst, grøn accent, lime til mørke flader. Archivo til display
(overskrifter, 800), Manrope til brødtekst. To tema-filer: newsprint.css
(typografi, komponenter) og themes/tradesman.css (farver, kontroller);
 hover kun under `@media (hover: hover)`, så touch ikke hænger i :hover.
To CTA-vægte: primær (grøn, udfyldt) og sekundær (outline).

Tilgængelighed:
- WCAG AA kontrast på alle tekstfarver
- 44px touch-mål på alle interaktive elementer
- prefers-reduced-motion respekteres (animationer slås fra)
- ARIA-labels på radiogroups, accordions og mobile navigation
- Semantisk HTML: nav, main, section, h1-h3, blockquote, footer

## Teknisk

- React 19 + TypeScript + Vite
- Tailwind CSS 4 + håndskrevne tema-filer (src/newsprint.css, src/themes/tradesman.css)
- Selvhostede variable fonts (én woff2 pr. skrift i public/fonts/, font-display:
  swap): servicesitet bruger Manrope til brødtekst og Archivo til display;
  butikkens tema bruger Switzer og Cabinet Grotesk
- Én fil til alle prisregler: src/lib/pricing.ts (priser, kørsel, rabatter,
  cap/floor, estimate() + scripts/pricing.check.ts der låser reglerne fast)
- Wiki-indhold i src/lib/species/ (22 services) + src/lib/serviceContent.ts
- Prerender: scripts/prerender.py bager alle 232 sider til statisk HTML i dist/
- Ingen backend, ingen API-calls, ingen tracker

Byg og tjek:
```
cd ~/projects/billigskadedyr-redesign
npm install
npm run build
npm run prerender            # bager 232 sider
node --experimental-strip-types scripts/routes.check.mjs
python3 scripts/oneway.check.py
python3 scripts/images.check.py
node --experimental-strip-types scripts/pricing.check.ts
```

Build-output: dist/ (statisk, committet på main så GitHub Pages kan serve det
direkte).

## Anbefalet produktion-stack (valgt: Option A)

Kunden vil have webshoppen fully buildet ud. Jonatan valgte **Option A:
Hydrogen + Oxygen** den 31.08.2026.

### Option A: Hydrogen + Oxygen (valgt)

Ét system, alt under Shopify. Ingen anden host, ingen rebuild-lag.

- **Backend/commerce: Shopify Basic** (249 kr/md i DK). Giver:
  - Produktdatabase, lager, ordrer, kunder (CMS - redigeres i Shopify-admin)
  - Checkout, betalinger, PCI compliance, fraud detection
  - Storefront API (GraphQL) til at hente produkter, cart, collections
- **Frontend: Hydrogen** (Shopify's officielle React-ramme, bygget på
  React Router 7). Porteres fra den eksisterende Vite/React-demo.
  Komponenter kan mest bruges som de er; det er data-fetching og routing
  der skiftes ud med Hydrogen's hooks og routes.
- **Hosting: Shopify Oxygen** (edge-hosting, incl. i Basic-planen, 0 kr
  ekstra, ubegrænset bandwidth, auto-scale). Ingen Cloudflare Pages,
  ingen Vercel.
- **Checkout:** redirect til Shopify-hosted checkout. Ingen custom
  checkout behøves til denne størrelse.
- **Total drift:** 249 kr/md. Alt hos Shopify.

### Produkt-katalog og CMS

- Produkt-kataloget ligger i **Shopify-admin** (den <yourstore>.myshopify.com
  dashboard). Det er den CMS-del man selv koder ikke, men Shopify leverer.
- Tilføj/redigér produkter: log ind i Shopify-admin -> Produkter ->
  "Add product" (eller klik på et eksisterende). Indtast navn, pris,
  beskrivelse, billeder, varianter, lager. Publicer. Ingen kode, ingen
  deployment.
- Da Hydrogen fetcher live fra Storefront API (SSR), viser ændringer i
  administratoren sig **umiddelbart** på sitet. Ingen rebuild-lag som
  SSG ville have.

### SEO

Hydrogen leverer SSR/SSG ud af boksen, så produkt-sider renderes til
server-HTML. Bedre SEO end det aktuelle client-side-only build, uden
ekstra hosting.

### Portering fra den eksisterende demo

- Eksisterende Vite/React-demo (denne repo) porteres til Hydrogen.
- Komponenter (Hero, TwoPathRouter, PestQuickSelect, Estimator,
  Packages, m.fl.) kan genbruges. Data-fetching skiftes fra
  statiske data til Hydrogen's useProduct/useCollection hooks.
- Vite-konfiguration erstattes af Hydrogen's. Tailwind v4 kan bevares
  som styling-basis.
- Tidsestimat: få dage (ikke uger), da komponent-laget allerede er
  bygget.

### Hvorfor ikke Option B (Vite SSG + Cloudflare Pages)?

- Option B var: behold den eksisterende Vite/React-app, SSG ved build,
  host på Cloudflare Pages (0 kr), Shopify Basic (249 kr/md).
- Valgte A i stedet fordi:
  - Ingen rebuild-lag: produkter opdateres live, ikke først efter ny build
  - Én host, alt under Shopify, mindre vedligehold
  - Bedre SEO (SSR/SSG indbygget)
  - Kundens produkter sjældent opdateret, men alligevel: A er den
    reneste langsigtede løsning
- Cost af A: portering af demo til Hydrogen (få dages arbejde). Cost af
  B: ingen portering, men rebuild-lag + to hosts.

### Hvorfor ikke WooCommerce?

- Kræver eget hosting (shared: 5-15 USD/md, VPS: 20-80 USD/md)
- Man selv vedligeholder PHP, database, sikkerheds patches
- Ingen "det kører bare" garanti
- Kun værd hvis kunden vil eje alt eller budgettet er meget stramt

## Inden du deler det

Disse skal tjekkes med ejeren:

1. **Adresse**: Site siger Viengevej 6A, 8240 Risskov. Trustpilot siger Engskovbakken 122,
   8541 Skødstrup. Hvilken er aktuelt?
2. **Autorisation**: Om-os sider på prof-site påstår "alle nødvendige autorisationer"
   men der er ingen R1/R2-numre eller link til mst.dk. Skal det vises på det
   redesignede site?
3. **Åbningstider**: Shop siger Ma-Fr 08-18, Lø-Søn 12-16. Prof-site siger Ma-Fr 08-21,
   Lø-Søn 12-16. Skal de være ens?
4. **Lorem ipsum**: Hvepse-service sektionen på prof-site har "Lorem ipsum dolor sit
   amet" i production. Skal det fjernes?
5. **Stankelben** som service: Diluter troværdighed. Skal den fjernes fra listen?
6. **1-stjernede Trustpilot anmeldelser**: De handler om upafleverede ordrer og
   ubesvarte mails. Det er det største conversions-problem, og det er ikke et
   designproblem.

## Filstruktur

```
~/projects/billigskadedyr-redesign/
  docs/
    before/              # skærmbilleder af de to nuværende sites (390/768/1440)
    audit.md             # fulde design-undersøgelse
    pricing-research.md  # priskilder (nu suppleret af ejers egne tal i pricing.ts)
    wiki-style-guide.md  # tone og format for artsiderne
    plan-wiki-pests.md   # plan for 22 services / 76 arter
    review-round-2..4.md # design reviews undervejs
    handover.md          # denne fil
  scripts/
    prerender.py         # bager alle sider til dist/ via CDP
    routes.check.mjs     # alle services/arter har shell + sitemap
    oneway.check.py      # butikken linker til fagmanden, ikke omvendt
    images.check.py      # alle billeder findes og er gyldige formater
    pricing.check.ts     # låser ejers prisregler fast
  src/
    components/          # Header, Hero, TwoPathRouter, Estimator, QuotePanel,
                         # Packages, Reviews, Faq, Comparison, Process, Benefits,
                         # PestQuickSelect, Contact/InquiryForm, MobileCtaBar
                         # (telefonbjælken), ServicePage/ServiceIndexPage,
                         # SpeciesPage/SpeciesCards, TrustSeal, CookieBanner,
                         # Footer, LegalPage, m.fl.
      shop/              # butikkens komponenter (ProductPage, ProductBrowser,
                         # Cart, DoseCalculator, Guides, m.fl.)
      ui/                # Select.tsx (mobil bottomsheet), SegmentTrack.tsx,
                         # Cta.tsx, Reveal.tsx
    lib/
      pricing.ts         # ejers priser + estimate() + kørsel + cap/floor
      pests.tsx          # skadedyrsregister (etiketter, ikoner, behandlingstekst)
      species/           # 22 artikel-filer (én per service)
      services/          # service-indhold (FAQ, sammenligninger m.m.)
      serviceContent.ts  # "det er med i prisen", FAQ m.m.
      pestSearch.ts      # fritekstsøgning ("huller i tøjet" -> klannere)
      estimatorSelection.ts # deler beregnerens svar med kontaktformularen
      consent.ts         # cookie-samtykke i localStorage
      shop.ts, shopContent.ts, shopRouter.tsx, cart.ts  # butikbenet
      distances.json     # postnumre -> by, km, koordinater
      router.tsx, search.ts, legal.ts, safety.ts, dosage.ts, m.fl.
    themes/tradesman.css # farver + kontroller (det aktive tema)
    newsprint.css        # typografi og komponenter
    index.css            # font-face + fælles tokens (butikken: Switzer/Cabinet,
                         # servicesitet: Manrope/Archivo)
    shop-entry.tsx       # butikkens entrypunkt
    App.tsx
    main.tsx
  index.html
  vite.config.ts
  package.json
```

## Før/efter

Før: docs/before/ (shop_home_390.png, shop_home_768.png, shop_home_1440.png,
prof_home_390.png, prof_home_768.png, prof_home_1440.png, og lignende for kontakt,
om-os, tilbud, faq, artikler, fortrydelsesret, handelsbetingelser).

Efter: docs/after/ (live-desktop.png, live-mobile.png — genTag dem når
designet ændrer sig væsentligt, til portfolio case study).

## GitHub Pages

Repo: https://github.com/jonatanbjerrekaer-bot/billigskadedyr-redesign.git
URL: https://jonatanbjerrekaer-bot.github.io/billigskadedyr-redesign/

Deploy: dist/ committes på main (separat `dist:`-commit pr. ændring), og GitHub
Pages serverer direkte fra main. Vite er konfigureret med base:
'/billigskadedyr-redesign/' så subpath virker.

## Beslutningsproces: hvordan vi kom hertil

Dokumenterer valg af produktion-stack for webshop-delivery. Datamærket
31.08.2026.

### Baggrund

Kunden (en dansk skadedyrsvirksomhed) har i dag to sites:
- billigskadedyr.dk (WooCommerce-webshop, selvprodukter)
- billigskadedyrprof.dk (WordPress, professionel service)

Leverancen er ét samlet site der dækker begge målgrupper (DIY-kunder og
kunder der vil have en professionel ud). Demo'en i denne repo er
frontend-delen. Nu skal webshoppen bygges fuldt ud.

### Spørgsmål som drev beslutningen

1. **Hvor hostes webshoppen, og hvad koster det?**
   - Udgangspunkt: Shopify Basic som "hele" hosting-løsning.
   - Verificeret pris: Shopify Basic er 249 kr/md i DK (ikke 45 USD som
     tidligere antaget; den gamle US-pris var 39-45 USD, nu er DK-prisen
     249 kr/md).
   - Verificeret at Cloudflare Pages er 0 kr (gratis tier: 20.000 filer,
     500 builds/md, ubegrænset bandwidth på statiske assets).
   - Verificeret at WooCommerce-softwaren er gratis, men kræver eget
     hosting (shared 5-15 USD/md, VPS 20-80 USD/md) + vedligeholdelse
     af PHP/database.

2. **Kan en custom React-frontend hostes "på top af" Shopify?**
   - Ja, men med en vigtig skelnen: Shopify hoster kun frontend
     (Hydrogen) på sin egen platform **Oxygen**, og kun hvis frontend
     er bygget med Hydrogen. En vilkårlig React/Vite-app kan ikke
     hostes på Shopify; den skal hostes eksternt (Cloudflare/Vercel)
     og tale mod Shopify's Storefront API.

3. **Er fuld backend-kontrol nødvendig?**
   - Nej. For en webshop af denne størrelse er backend-API'et
     (Storefront API) tilstrækkeligt. Man ejer ikke nogen database
     eller handler PCI/fraud/checkout. Shopify-admin dækker
     produkt-katalog, ordrer, kunder, lager.

4. **SEO-problemet: klient-side vs. server-side rendering**
   - Demo'en er i dag client-side only (createRoot i main.tsx, ingen
     SSR). Produkt-sider vil have svag SEO.
   - Tre mulige løsninger: (a) Vite SSG ved build, (b) Hydrogen med
     indbygget SSR/SSG, (c) Cloudflare Workers for SSR.
   - Overvejet Vite SSG (billigst, bevarer nuværende kode) fordi
     produkter sjældent tilføjes. Men valgte til sidst (b) Hydrogen.

### De to endelige optioner

**Option A: Hydrogen + Oxygen (VALGT)**
- Shopify Basic (249 kr/md) som backend + CMS + checkout
- Hydrogen som frontend (Shopify's officielle React-ramme)
- Oxygen som hosting (inkl. i Basic, 0 kr ekstra)
- Alt under ét tag, ingen anden host, ingen rebuild-lag
- Ændringer i Shopify-admin vises live på sitet
- SEO: SSR/SSG indbygget
- Kost: portering af den eksisterende Vite-demo til Hydrogen
  (få dages arbejde, komponent-laget genbruges)

**Option B: Vite SSG + Cloudflare Pages (afvist)**
- Bevarer den eksisterende Vite/React-app uden portering
- SSG ved build: henter produkter fra Storefront API, bager dem i HTML
- Frontend hostes på Cloudflare Pages (0 kr)
- Shopify Basic (249 kr/md) som backend
- To hosts at holde (Cloudflare + Shopify)
- Rebuild-lag: nye produkter vises først efter ny build
- SEO: SSG, men indhold er "baked" ved build-tid
- Kost: ingen portering, men vedligehold af to systemer

### Hvorfor Option A vandt

- Én host, alt under Shopify. Mindre vedligehold, nemmere at
  overdrage til kunden og gå fra.
- Ingen rebuild-lag. Produkter opdateres live.
- Bedre SEO (SSR/SSG indbygget, ikke "baked").
- "Det kører bare"-garanti. Shopify-support gælder hele stacken.
- Porterings-kosten (få dage) er engangsudgift. Resten er 249 kr/md
  uanset option.

### Afvejning noteret

Option B var den billigere i opsætning (ingen portering). Den blev
afvist fordi den langsigtede vedligehold (to hosts, rebuild-lag)
uddaterer besparelsen. For en webshop der skal overdrages til en
kunde der ikke selv vedligeholder code, er Option A den reneste
leverance.

### Åbne punkter før portering starter

- Bestem om kunden selv opretter Shopify-kontoen eller om den oprettes
  i forbindelse med delivery.
- Konfirmer om Shopify Payments (vs. Stripe m.m.) bruges som
  betalingsgateway (påvirker transaktions-gebyrer).
- Tjek om klienten ønsker at bevare nuværende domain
  (billigskadedyr.dk) eller om et nyt skal bruges.
- Overvej om webhooks (produkt-opdatering -> auto-rebuild) er
  nødvendige, hvis man senere skifter tilbage til en SSG-løsning.
  (Ikke relevant for Option A, da Hydrogen er live.)
