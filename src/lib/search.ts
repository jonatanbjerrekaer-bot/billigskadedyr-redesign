import { PRODUCTS, PEST_LABEL, type PestKey, type Product } from "./shop";

/*
 * Søgningen.
 *
 * Feltet i toppen har indtil nu været en attrap: ingen value, ingen onChange,
 * ingen formular. Man kunne skrive i det, trykke retur og der skete
 * ingenting. Det er værre end intet søgefelt, for det er det, folk griber
 * efter, når kategorierne svigter.
 *
 * Baymard deler søgninger op i otte typer. To af dem afgør alt her:
 *
 *   symptomsøgning     "huller i træet", "boremel på gulvet", "gnavelyde
 *                      om natten". 37 % af butikker fejler dem, og det er
 *                      den måde en husejer faktisk beskriver sit problem.
 *                      Han ved ikke, at det hedder en borebille. Han ved,
 *                      at der er små runde huller i spærene.
 *
 *   synonym og slang   "træorm" er borebiller, "gedehams" er hvepse,
 *                      "sølvfisk" er skægkræ, "kakalak" er kakerlakker.
 *                      Folk søger med det ord, de kom med, ikke med det ord
 *                      en skadedyrsbekæmper ville bruge.
 *
 * Derfor er der to opslagstabeller: en fra ord til skadedyr, og en fra
 * symptom til skadedyr. Rammer søgningen et skadedyr, sættes dyrefilteret
 * automatisk, og det står som en chip, man kan fjerne igen. Baymard kalder
 * det at anvende det søgte som et forvalgt filter, og pointen er, at det
 * skal kunne ses og slås fra.
 *
 * Der er ingen søgemaskine involveret. 122 varer kan gennemsøges i browseren
 * hurtigere end et netværkskald ville tage.
 */

/** æøå og accenter ud, så "hvepse", "hveps" og "HVEPSE" er det samme ord. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    // "5l" skrives af mange uden mellemrum. Uden det her er det et andet
    // ord end "5 l", og så finder man ikke sin egen dunk.
    .replace(/(\d)\s*(ltr|liter|l|ml|kg|g|stk)\b/g, "$1 $2")
    // og enhederne selv skal folde sammen
    .replace(/\b(ltr|liter)\b/g, "l")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Ordene folk kommer med, og hvad de betyder i hans katalog.
 * Nøglerne er normaliserede. Værdien er det skadedyr, vi filtrerer på.
 */
const WORD_TO_PEST: Record<string, PestKey> = {
  // gnavere
  mus: "mus", muse: "mus", musen: "mus", husmus: "mus", markmus: "mus",
  rotte: "rotter", rotter: "rotter", rotten: "rotter", kloakrotte: "rotter",
  gnaver: "mus", gnavere: "mus",
  // hvepse
  hveps: "hvepse", hvepse: "hvepse", hvepsebo: "hvepse", gedehams: "hvepse",
  gedehamse: "hvepse", bi: "hvepse", bier: "hvepse", jordbi: "hvepse",
  // myrer
  myre: "myrer", myrer: "myrer", myretue: "myrer", pharaomyre: "myrer",
  sukkermyre: "myrer", tissemyre: "myrer",
  // biller og traeodelaeggere
  borebille: "biller", borebiller: "biller", traeorm: "biller",
  husbuk: "biller", husbukke: "biller", bille: "biller", biller: "biller",
  traeskadedyr: "biller", traebeskyttelse: "biller",
  // ovrige
  vaeggelus: "vaeggelus", vaegge: "vaeggelus", sengelus: "vaeggelus",
  kakerlak: "kakerlakker", kakerlakker: "kakerlakker", kakalak: "kakerlakker",
  kakalakker: "kakerlakker",
  moel: "moel", moellarver: "moel", klaedemoel: "moel", melmoel: "moel",
  flue: "fluer", fluer: "fluer", bananflue: "fluer", frugtflue: "fluer",
  edderkop: "edderkopper", edderkopper: "edderkopper",
  muldvarp: "muldvarpe", muldvarpe: "muldvarpe", muldskud: "muldvarpe",
  snegl: "snegle", snegle: "snegle", draebersnegl: "snegle",
  dræbersnegle: "snegle", skovsnegl: "snegle",
  loppe: "lopper", lopper: "lopper", hundeloppe: "lopper",
  due: "fugle", duer: "fugle", fugl: "fugle", fugle: "fugle", maage: "fugle",
  alger: "alger", alge: "alger", mos: "alger", groenbelaegning: "alger",
};

/**
 * Symptomer, i de ord folk selv bruger. Rækkefølgen betyder noget: den
 * første, der findes i søgestrengen, vinder, så de mest specifikke står
 * først.
 */
const SYMPTOMS: { phrase: string; pest: PestKey; because: string }[] = [
  { phrase: "huller i trae", pest: "biller", because: "små runde flyvehuller i træværk" },
  { phrase: "runde huller", pest: "biller", because: "små runde flyvehuller i træværk" },
  { phrase: "boremel", pest: "biller", because: "boremel under træværk" },
  { phrase: "smuld", pest: "biller", because: "smuld fra træværk" },
  { phrase: "knirken i spaer", pest: "biller", because: "lyde i konstruktionstræ" },
  { phrase: "gnavelyde", pest: "mus", because: "gnavelyde i loft eller væg" },
  { phrase: "lyde paa loftet", pest: "mus", because: "lyde på loftet om natten" },
  { phrase: "kradsen", pest: "mus", because: "kradsende lyde" },
  { phrase: "museloerter", pest: "mus", because: "efterladenskaber" },
  { phrase: "afforing", pest: "mus", because: "efterladenskaber" },
  { phrase: "loerter", pest: "mus", because: "efterladenskaber" },
  { phrase: "bid i sengen", pest: "vaeggelus", because: "bid, du vågner med" },
  { phrase: "bidt om natten", pest: "vaeggelus", because: "bid, du vågner med" },
  { phrase: "roede prikker", pest: "vaeggelus", because: "bid på huden" },
  { phrase: "kloe", pest: "lopper", because: "kløe og bid" },
  { phrase: "huller i toej", pest: "moel", because: "huller i tekstiler" },
  { phrase: "huller i uld", pest: "moel", because: "huller i tekstiler" },
  { phrase: "bo under tagsten", pest: "hvepse", because: "bo i konstruktionen" },
  { phrase: "bo i haekken", pest: "hvepse", because: "bo i haven" },
  { phrase: "stik", pest: "hvepse", because: "risiko for stik" },
  { phrase: "skud i plaenen", pest: "muldvarpe", because: "skud i plænen" },
  { phrase: "bunker i plaenen", pest: "muldvarpe", because: "skud i plænen" },
  { phrase: "aedt planter", pest: "snegle", because: "afgnavede planter" },
  { phrase: "aedt bladene", pest: "snegle", because: "afgnavede planter" },
  { phrase: "groent paa taget", pest: "alger", because: "belægning på tag og fliser" },
  { phrase: "glatte fliser", pest: "alger", because: "belægning på tag og fliser" },
];

/**
 * Sted og situation.
 *
 * Kunden søger ikke altid på et dyr eller en vare. Han søger på, hvor han
 * har problemet. Et sted peger på flere dyr, og alle skal med: den, der
 * skriver "til køkkenet", ved ikke nødvendigvis, om det er myrer eller
 * sølvfisk, han har.
 *
 * Kun steder, hvor butikken faktisk har varer. Et sted uden varer er et nul
 * med ekstra trin.
 */
const USE_CASES: { phrases: string[]; pests: PestKey[]; because: string }[] = [
  {
    phrases: ["koekken", "i koekkenet", "spisekammer", "madvarer", "paa koekkenbordet"],
    pests: ["myrer", "fluer", "kakerlakker", "moel"],
    because: "det, der plejer at gå efter mad indendørs",
  },
  {
    phrases: ["udendoers", "i haven", "havemoebler", "terrasse", "paa terrassen", "altan"],
    pests: ["hvepse", "myrer", "snegle", "muldvarpe"],
    because: "det, der plejer at være udenfor",
  },
  {
    phrases: ["sovevaerelse", "i sengen", "seng", "madras", "soveværelset"],
    pests: ["vaeggelus", "lopper"],
    because: "det, der bider om natten",
  },
  {
    phrases: ["loft", "paa loftet", "tagrum", "spaer", "traevaerk", "bjaelker"],
    pests: ["mus", "biller", "hvepse"],
    because: "det, der holder til i tag og træværk",
  },
  {
    phrases: ["kaelder", "i kaelderen", "fugtigt", "vaskerum"],
    pests: ["mus", "edderkopper"],
    because: "det, der trives, hvor der er fugtigt",
  },
  {
    phrases: ["klaedeskab", "toej", "garderobe", "uld", "tekstiler"],
    pests: ["moel"],
    because: "det, der går i tekstiler",
  },
  {
    phrases: ["husdyr", "hund", "kat", "kaeledyr"],
    pests: ["lopper", "fluer"],
    because: "det, der følger med dyr",
  },
];

/** Sider, der ikke er varer. Baymard: 66 % af butikker finder dem slet ikke. */
export const INFO_HITS: { match: string[]; title: string; text: string; href: string }[] = [
  {
    match: ["fragt", "levering", "porto", "afhentning", "hvornaar kommer"],
    title: "Fragt og levering",
    text: "Fragtpriser fra 59 kr. Gratis afhentning i Risskov. Afsendt samme hverdag, hvis du bestiller inden kl. 14.",
    href: "#fragt",
  },
  {
    match: ["retur", "returret", "fortryd", "bytte"],
    title: "Returret",
    text: "14 dages returret på uåbnede varer.",
    href: "#fragt",
  },
  {
    match: ["cvr", "erhverv", "professionel brug", "autorisation", "autoriseret"],
    title: "Varer der kræver CVR eller autorisation",
    text: "Nogle midler må kun sælges til erhvervskunder med gyldigt CVR-nr., og rottegift kræver autorisation. Det står på den enkelte vare.",
    href: "#fragt",
  },
];

export type SearchResult = {
  q: string;
  /** Skadedyret, søgningen peger på, hvis den peger på ét. */
  pest: PestKey | null;
  /** Hvorfor vi tror det, i klar tekst. Vises, så gættet kan gennemskues. */
  why: string;
  products: Product[];
  info: typeof INFO_HITS;
};

/** Ét bogstav galt i et langt ord skal ikke koste et resultat. */
function close(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++diff > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return diff + (a.length - i) + (b.length - j) <= 1;
}

function score(p: Product, tokens: string[]): number {
  const name = norm(p.name);
  const hay = norm(`${p.name} ${p.brand} ${p.form} ${PEST_LABEL[p.pest]} ${p.blurb} ${p.size}`);
  const words = hay.split(" ");
  let s = 0;
  for (const t of tokens) {
    if (name.startsWith(t)) s += 12;
    else if (name.includes(t)) s += 8;
    else if (hay.includes(t)) s += 4;
    else if (t.length >= 5 && words.some((w) => close(w, t))) s += 2;
    else return 0; // hvert ord skal bidrage, ellers er det ikke et hit
  }
  if (p.inStock) s += 1;
  return s;
}

export function search(raw: string): SearchResult {
  const q = norm(raw);
  const empty: SearchResult = { q: raw, pest: null, why: "", products: [], info: [] };
  if (!q) return empty;

  // 1. symptom slaar alt andet: det er den maade folk beskriver problemet paa
  let pest: PestKey | null = null;
  let why = "";
  const sym = SYMPTOMS.find((s) => q.includes(s.phrase));
  if (sym) {
    pest = sym.pest;
    why = `Vi læser "${raw.trim()}" som ${sym.because}, altså ${PEST_LABEL[sym.pest].toLowerCase()}.`;
  }

  const tokens = q.split(" ").filter(Boolean);

  // 2. ellers: er et af ordene et navn paa et skadedyr, ogsaa i slang
  if (!pest) {
    for (const t of tokens) {
      const hit = WORD_TO_PEST[t] ?? Object.keys(WORD_TO_PEST).find((k) => close(k, t) && t.length >= 5);
      const key = typeof hit === "string" && hit in WORD_TO_PEST ? WORD_TO_PEST[hit]! : (hit as PestKey | undefined);
      if (key) {
        pest = key;
        if (t !== norm(PEST_LABEL[key])) {
          why = `"${raw.trim()}" er ${PEST_LABEL[key].toLowerCase()} hos os.`;
        }
        break;
      }
    }
  }

  const scored = PRODUCTS.map((p) => ({ p, s: score(p, tokens) })).filter((x) => x.s > 0);
  // Peger søgningen på et dyr, men rammer ordene ingen varenavne, så er
  // dyrets egne varer det rigtige svar.
  const products = scored.length
    ? scored.sort((a, b) => b.s - a.s).map((x) => x.p)
    : pest
      ? PRODUCTS.filter((p) => p.pest === pest)
      : [];

  const info = INFO_HITS.filter((i) => i.match.some((m) => q.includes(norm(m))));

  /*
   * Sidste udvej før nul træffere: er det et sted, kunden har beskrevet?
   * Det tjekkes til sidst, fordi "myrer i køkkenet" skal give myrer, ikke
   * hele køkkenlisten. Kun når intet andet har ramt, læses stedet.
   */
  if (!products.length && !pest) {
    const uc = USE_CASES.find((u) => u.phrases.some((ph) => q.includes(norm(ph))));
    if (uc) {
      const set = new Set<string>(uc.pests);
      const hits = PRODUCTS.filter((p) => set.has(p.pest));
      if (hits.length) {
        return {
          q: raw,
          pest: null,
          why: `Vi viser ${uc.because}. Vælg selv dyret i filtrene, hvis du ved hvad det er.`,
          products: hits,
          info,
        };
      }
    }
  }

  return { q: raw, pest, why, products, info };
}

/**
 * Forslag, mens der skrives.
 *
 * Skadedyret først, fordi den, der taster "mus", som regel vil se alt mod
 * mus og ikke en bestemt fælde. Så varerne, med billede og pris, fordi et
 * navn alene ikke fortæller, om det er den rigtige. Til sidst infosiderne.
 */
export function suggest(raw: string): {
  pests: PestKey[];
  pestCounts: Record<string, number>;
  products: Product[];
  info: typeof INFO_HITS;
} {
  const r = search(raw);
  const counts: Record<string, number> = {};
  for (const p of PRODUCTS) counts[p.pest] = (counts[p.pest] ?? 0) + 1;

  // Kun ét skadedyr foreslås. To gæt er ikke et forslag, det er en menu.
  const pests = r.pest ? [r.pest] : [];

  return {
    pests,
    pestCounts: counts,
    products: r.products.slice(0, 6),
    info: r.info,
  };
}
