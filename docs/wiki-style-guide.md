# Style guide: nye skadedyrs-sider til billigskadedyr-redesign

Alt indhold er på dansk. Sitet er en wiki FØRST og et salgssted bagefter.
Artiklerne svarer på det, en bekymret husejer søger; salgsknapperne er allerede
på skabelonen. Skriv aldrig som om vi overbeviser nogen — skriv som en der
ved besked og siger det ligeud.

## To filformater

### 1. Service-indhold: `src/lib/services/<slug>.ts`

```ts
import type { ServiceContent } from "../serviceContent";

const content: ServiceContent = {
  intro: "Én-to sætninger under titlen 'Vi fjerner <label>'.",
  whyProfessional: ["4-5 korte punkter: hvorfor gør-det-selv mislykkes, og hvad vi gør i stedet."],
  species: [{ name: "<kortnavn>", text: "Én-to sætninger: hvad det er, og hvornår det er et problem." }],
  processNote: "Et par linjer om hvordan besøget forløber.",
  faq: [{ q: "…", a: "…" }, /* 5-8 spørgsmål */],
};
export default content;
```

- `whyProfessional`, `species`, `processNote`, `faq` er valgfrie — men alle
  nye services SKAL have dem alle.
- `species[].name` er join-nøgle til artiklerne i `src/lib/species/<slug>.ts`
  (præcis samme streng) og bliver det synlige kortnavn.

### 2. Artsartikler: `src/lib/species/<slug>.ts`

Kopiér strukturen fra et eksisterende eksempel:
`src/lib/species/myrer.ts` (åbn og læs det først — det viser alle felter).

Per artikel:
- `name`: dansk navn, præcis som på kortet i services-filen.
- `slug`: små bogstaver, æ→ae, ø→oe, å→aa, bindestreg mellem ord.
- `latin`: videnskabeligt navn, hvor det giver mening.
- `description`: max ~155 tegn, meta-beskrivelse. Formel: "X er … Sådan kender
  du den, derfor …, og sådan …" — se eksisterende artikler.
- `sections`: 4-7 sektioner. Typisk rækkefølge: Kendetegn → Hvor du finder den
  / Hvorfor kommer den ind → Levevis → Er den farlig? / Er den skadelig? →
  Hvad gør du selv? / Sådan kommer du af med den → Forveksles med.
- `sources`: 1-4 URL'er, kun kilder der faktisk understøtter fakta i teksten.
- `provenance`: én streng pr. afsnit, samme rækkefølge. Brug `"new"` for alt nyt
  indhold (alt dit indhold er nyt). Format: `provenance: ["new", "new"]`.

## Stemme og sprog (kopier mønsteret i eksisterende filer)

- Kort, mundret dansk. Afsnit på 1-4 sætninger. Du over "man", vi over "vi
  behandler/jeres"? — nej: sammen med læseren: "Kommer de igen år efter år,
  behandler vi…", "Skriv til os, så siger vi, om…"
- Direkte, ingen salgsgloser, ingen overtalelse. Tilladte formuleringer fra
  eksisterende sider: "Skriv til os, så ser vi på det.", "Så siger vi det
  ligeud.", "Lad være med at…", "Tit ingenting." Undgå: "desværre", "faktisk"
  (oftere end sjældent), "effektiv", "professionel løsning", "topkvalitet".
- Tal med tal, ikke tillægsord: "ca. 2 cm", "2-3 uger", "95 %".
- Sandhedstælling: kun facts der står i research-rapporten eller kilderne du
  selv har åbnet. Ingen opfundne tal, ingen opfundne påstande om firmaet
  (Daniel Nemborg / Billigskadedyr). Skriv ALDRIG at firmaet er autoriseret
  rottebekæmper — formulér lovkrav neutralt ("rotter skal anmeldes til
  kommunen", "bekæmpelse må kun udføres af autoriserede rottebekæmpere") og
  lad skabelonens kontaktformular tage over.
- Lov-stof skal være korrekt og neutralt (anmeldelsespligt, jagttider,
  fredning, godkendte midler).
- Konkrete råd først (tæt, støvsug, vask), behandling bagefter.
- "Forveksles med"-sektion er obligatorisk og linker videre: nævn gerne andre
  skadedyr med deres danske navn — sitet laver automatisk links af kendte navne
  (du skal IKKE skrive <a>-tags, kun flad tekst).

## Vigtigt

- KUN de tildelte filer må oprettes/ændres. Rør aldrig eksisterende filer
  (serviceContent.ts, pests.tsx, speciesContent.ts, sitemap.xml, skaller i
  service/) — dem samler jeg selv bagefter.
- TypeScript, ingen `any`, ingen kommentarer på dansk i koden udover evt. én
  linje øverst.
- Kør `npx tsc --noEmit -p tsconfig.app.json` (i projektroden) inden du
  afleverer — filen skal type-tjekke. Bemærk: projektet kan have præ-eksisterende
  fejl i andre filer; kun fejl i DINE filer skal rettes.
