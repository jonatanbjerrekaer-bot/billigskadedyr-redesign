# Billigskadedyr.dk - Design-koncept og håndtering

Skrevet: 29. august 2026. Design: Jonatan Daugbjerg Bjerkjær.
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
2. **Skadedyrs-baseret navigation** i stedet for produkttype-baseret. Besøgeren tænker
   "rotter", ikke "smækfælde".
3. **Priskalkulator** som centralt element. Viser et interval baseret på skadedyr,
   areal, ejendomstype og grad. Rater er hentet fra offentlige danske
   skadedyrsbekæmpelses-prissider (se docs/pricing-research.md).
4. **3 pakker** på pro-sporet, hvor den midterte er fremhævet.
5. **Sociale beviser** fra Trustpilot og e-mærket med de reelle tal (3,8/5 på
   Trustpilot, 4,6/5 på e-mærket). Ingenting er opfundet.
6. **Cookie-banner** der viser førstegang og gemmer valget i localStorage.

## Design

Mørk skovgrøn baggrund, orange accent, hvide og cremefarvede sektioner, store afrundede
kort, condensed all-caps overskrifter (Archivo), Inter for brødtekst. To CTA-vægte:
primær (orange, udfyldt) og sekundær (outline). Ingen grid, kun flexbox.

Tilgængelighed:
- WCAG AA kontrast på alle tekstfarver
- 44px touch-mål på alle interaktive elementer
- prefers-reduced-motion respekteres (animationer slås fra)
- ARIA-labels på radiogroups, accordions og mobile navigation
- Semantisk HTML: nav, main, section, h1-h3, blockquote, footer

## Teknisk

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 (tokens i src/index.css)
- @fontsource-variable for Inter og Archivo (ingen externe fonts)
- Ingen grid i CSS, kun flexbox
- Én fil til pristabellen: src/lib/pricing.ts
- Ingen backend, ingen API-calls, ingen tracker

Byg:
```
cd ~/projects/billigskadedyr-redesign
npm install
npm run build
```

Build-output: dist/ (statisk, kan hostes på GitHub Pages eller lignende).

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
    before/           # skærmbilleder af de to nuværende sites (390/768/1440)
    audit.md          # fulde design-undersøgelse
    pricing-research.md  # priskilder og rater
  src/
    components/
      Header.tsx        # sticky nav + mobile menu
      Hero.tsx
      TwoPathRouter.tsx # "Klar det selv" vs "Få en professionel ud"
      PestQuickSelect.tsx
      Benefits.tsx
      Comparison.tsx    # "Sådan gør andre" vs "Sådan gør vi"
      Process.tsx       # 3 trin
      Estimator.tsx     # priskalkulator
      Packages.tsx      # 3 pakker
      Reviews.tsx       # Trustpilot/e-mærket citeringer
      Faq.tsx
      ClosingCta.tsx
      Footer.tsx
      CookieBanner.tsx
    lib/
      pricing.ts        # pristabel + estimate() + dkr()
      consent.ts        # localStorage consent
    App.tsx
    main.tsx
    index.css
  index.html
  vite.config.ts
  package.json
```

## Før/efter

Før: docs/before/ (shop_home_390.png, shop_home_768.png, shop_home_1440.png,
prof_home_390.png, prof_home_768.png, prof_home_1440.png, og lignende for kontakt,
om-os, tilbud, faq, artikler, fortrydelsesret, handelsbetingelser).

Efter: tag new screenshots af det built site på 390, 768 og 1440 og gem dem i
docs/after/ til portfolio case study.

## GitHub Pages

Repo: https://github.com/jonatanbjerrekaer-bot/billigskadedyr-redesign.git
URL: https://jonatanbjerrekaer-bot.github.io/billigskadedyr-redesign/

Deploy: commit dist/ til en `gh-pages` branch, eller push til main og lad GitHub
Actions bygge. Vite er allerede konfigureret med base: '/billigskadedyr-redesign/'
så subpath virker.

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
