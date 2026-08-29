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
