/*
 * Butikkens redaktionelle lag. Intet her kommer fra hans varekatalog.
 *
 * Opgaven er at sælge varerne OG at være ærlig om, hvornår en vare ikke er
 * svaret. De to ting trækker kun i hver sin retning, hvis man lyver. En
 * hvepsespray virker fint på et bo, du kan nå fra jorden; den virker ikke
 * på et bo i en tagkonstruktion, og det er der ingen grund til at skjule.
 * Kunden, der køber sprayen og fejler, kommer ikke tilbage. Kunden, der
 * bliver sendt videre til en fagmand i tide, gør.
 *
 * Alt herunder er skrevet til denne demo og skal læses igennem af ham, før
 * det går live. Det er markeret OURS, ligesom teksterne på serviceviden.
 *
 * Kilder til de faktuelle påstande, så de kan efterprøves:
 *   Rotter er anmeldepligtige i Danmark, og private må ikke bekæmpe dem med
 *   gift. Kun personer med autorisation fra Miljøstyrelsen (R1/R2) må lægge
 *   rottegift ud. Se Miljøstyrelsens vejledning om rottebekæmpelse og
 *   bekendtgørelsen om forebyggelse og bekæmpelse af rotter.
 *   Han skal bekræfte formuleringerne, ikke mindst fordi han selv sælger
 *   rottegiften og kender reglerne bedre end nogen tekst her.
 */

import type { PestKey } from "./shop";

const BASE = import.meta.env.BASE_URL;

/** Hvor på servicesitet et skadedyr hører hjemme. */
export const SERVICE_LINK: Partial<Record<PestKey, string>> = {
  hvepse: `${BASE}service/hvepse/`,
  myrer: `${BASE}service/myrer/`,
  fluer: `${BASE}service/fluer/`,
  moel: `${BASE}service/moel/`,
  edderkopper: `${BASE}service/edderkopper/`,
  vaeggelus: `${BASE}service/vaeggelus/`,
  kakerlakker: `${BASE}service/kakerlakker/`,
  muldvarpe: `${BASE}service/muldvarpe/`,
  snegle: `${BASE}service/snegle/`,
  biller: `${BASE}service/borebiller/`,
};

/** Der er ingen serviceside for mus, rotter, fugle og lopper. Så går det
    til kontaktformularen, som stadig er den rigtige handling. */
export const CONTACT_LINK = `${BASE}#skriv`;

export function proLinkFor(pest: PestKey): string {
  return SERVICE_LINK[pest] ?? CONTACT_LINK;
}

export type ProNudge = {
  /** Overskriften på panelet. Skal kunne læses alene. */
  title: string;
  /** Hvorfor det her sjældent går som håbet. Konkret, ikke skræmmende. */
  body: string;
  /** Det korte spørgsmål på produktkortet. */
  flag?: string;
  /** Sæt, hvor det ikke bare er svært, men ulovligt eller farligt. */
  level: "svaert" | "farligt" | "ulovligt";
};

/**
 * Hvornår gør-det-selv holder, og hvornår det ikke gør. Ét afsnit pr.
 * skadedyr, vist på produktsiden og øverst i browseren, når man filtrerer.
 */
export const NUDGE: Partial<Record<PestKey, ProNudge>> = {
  rotter: {
    level: "ulovligt",
    flag: "Rotter skal anmeldes til kommunen",
    title: "Rotter må du ikke selv bekæmpe med gift",
    body:
      "Ser du en rotte, skal du melde det til kommunen. Gift må kun lægges ud af folk med autorisation fra Miljøstyrelsen, så vi sælger den kun til dem — resten af vejen går gennem en bekæmper.",
  },
  hvepse: {
    level: "farligt",
    flag: "Sidder boet højt?",
    title: "Et bo i jordhøjde kan du klare. Et bo på taget kan du ikke",
    body:
      "En spray rækker to-tre meter, og det er nok til et bo i en hæk eller under en terrasseplade. Skal du op på en stige med en hånd optaget, mens hvepsene kommer ud, så lad være — det er sådan, folk falder ned.",
  },
  vaeggelus: {
    level: "svaert",
    flag: "Fælder finder dem, de fjerner dem ikke",
    title: "Væggelus overlever næsten altid første forsøg",
    body:
      "De sidder i sprækker i sengeramme, fodpaneler og bag stikkontakter, og en behandling, der kun rammer det, du kan se, flytter dem længere ind i boligen. Fælder er gode til at opdage dem og holde øje bagefter, men de er ikke en behandling.",
  },
  kakerlakker: {
    level: "svaert",
    title: "Kakerlakker kræver en vurdering på stedet",
    flag: "Sjældent alene i én bolig",
    body:
      "Ser du én om dagen, er der mange flere om natten, og i en etageejendom sidder de sjældent kun hos dig. Gel og fælder virker, men kun som del af en plan, der også dækker naboer og faldstammer.",
  },
  mus: {
    level: "svaert",
    flag: "Fælder virker. Hullet skal stadig lukkes",
    title: "Mus kommer igen, hvis vejen ind bliver stående",
    body:
      "En fælde tager de mus, der er inde nu. Den gør intet ved hullet, de kom ind igennem, og en mus skal bruge en åbning på størrelse med en blyant — bliver den stående, står du med det samme til foråret.",
  },
  moel: {
    level: "svaert",
    title: "Møllene, du ser flyve, er ikke dem, der laver skaden",
    flag: "Larverne sidder et andet sted",
    body:
      "De voksne møl er nemme at ramme, men skaden laves af larverne i uld, skabe og fødevarer, og de sidder sjældent der, hvor møllene flyver. En detektor fortæller dig, hvilken slags du har.",
  },
  myrer: {
    level: "svaert",
    title: "Gel virker på stien, ikke på reden",
    body:
      "Gelen virker, fordi myrerne bærer den hjem til reden, og det tager dage, ikke minutter. Sprayer du stien væk med det samme, afbryder du det, der virkede.",
  },
  edderkopper: {
    level: "svaert",
    title: "Sprøjt hjørnerne, ikke dyrene",
    body:
      "De vender tilbage til de samme kroge år efter år, så at slå dem ihjel enkeltvis gør ingen forskel. Det, der holder, er en behandling af karme, hjørner og udhæng to gange om året.",
  },
  muldvarpe: {
    level: "svaert",
    title: "Skuddene fortæller dig ikke, hvor dyret er",
    body:
      "Skuddet er der, hvor jorden er kommet op, ikke der, hvor muldvarpen arbejder. Fælder virker kun i en aktiv gang, og at finde den er hele opgaven.",
  },
  fugle: {
    level: "svaert",
    title: "Fugle er fredede, og reder må ikke fjernes i yngletiden",
    body:
      "Pigge og skræmmere forebygger, og det må du gerne. At fjerne en rede med æg eller unger må du ikke, så sidder de allerede under tagpladerne, skal opgaven times efter yngletiden.",
  },
};

/**
 * OURS: Vi har ingen salgstal. Butikken har hverken anmeldelser eller
 * offentlige salgstal, så listen her er redaktionel og skal skiftes ud med
 * hans egne tal, når de foreligger. Den er sat sammen af de varer, en
 * privatkunde med et almindeligt problem faktisk står med.
 */
export const BESTSELLERS = [
  "pest-stop-hvepsespray",
  "trinol-turbo-jet",
  "climbup-vaeggelusfaelde",
  "trinol-multikill-musefaelde",
  "provoke-lokkemiddel",
  "trinol-melmoel-detektor",
  "pest-stop-automatisk-musefaelde",
  "trinol-sneglefaelde",
];

/**
 * Sæsonvarer efter måned. September til november er, når mus og rotter
 * søger indendørs, og hvepseboene er størst lige inden. Listen er vores,
 * men logikken er årstiden, ikke en kampagne.
 */
export const SEASON: { months: number[]; heading: string; note: string; slugs: string[] }[] = [
  {
    months: [9, 10, 11],
    heading: "Lige nu: efterår",
    note: "Mus og rotter søger indendørs, når nætterne bliver kolde.",
    slugs: [
      "pest-stop-automatisk-musefaelde",
      "trinol-multikill-musefaelde",
      "pest-stop-fingersikker",
      "pest-stop-hvepsespray",
      "trinol-melmoel-detektor",
      "provoke-lokkemiddel",
    ],
  },
  {
    months: [12, 1, 2],
    heading: "Lige nu: vinter",
    note: "Gnaverne er inde nu, og møllene opdages, når vintertøjet kommer frem.",
    slugs: [
      "trinol-multikill-musefaelde",
      "pest-stop-fingersikker",
      "trinol-klaedemoel-detektor",
      "trinol-melmoel-detektor",
      "provoke-lokkemiddel",
      "pest-stop-automatisk-musefaelde",
    ],
  },
  {
    months: [3, 4, 5],
    heading: "Lige nu: forår",
    note: "Myrerne kommer først. Edderkopper skal behandles nu, hvis det skal holde sommeren ud.",
    slugs: [
      "ps-myre-gel-10g",
      "trinol-insect-freeze",
      "pest-stop-universel-insektspray-mod-insekter-billigskadedyr-dk",
      "trinol-sneglefaelde",
      "trinol-turbo-jet",
      "pest-stop-fingersikker",
    ],
  },
  {
    months: [6, 7, 8],
    heading: "Lige nu: sommer",
    note: "Hvepse og fluer indenfor, snegle i haven.",
    slugs: [
      "pest-stop-hvepsespray",
      "trinol-turbo-jet",
      "trinol-sneglefaelde",
      "hvepselokkemiddel",
      "trinol-insect-freeze",
      "frugtfluefaelde-prof",
    ],
  },
];

/**
 * Produktspecifik tekst til de tre demo-varer. Resten af butikken kører på
 * hans egen korte beskrivelse alene.
 *
 * "does" og "doesNot" er det, Baymard kalder for den information, der
 * afgør købet: hvad varen konkret gør, og hvor den holder op. Den anden
 * halvdel er normalt den, der mangler, og den er her det ærlige nudge.
 */
export type ProductDetail = {
  /** Én linje under navnet. Hans egen blurb er for lang til den plads. */
  lead: string;
  does: string[];
  doesNot: string[];
  /** Praktiske fakta, som en 55-årig husejer faktisk spørger om. */
  specs: { k: string; v: string }[];
  /** Hvad man skal gøre, i rækkefølge. */
  how: string[];
  /**
   * En betingelse, der afgør om kunden overhovedet må købe varen. Står
   * over købsknappen, fordi det er værre at opdage den i kassen.
   */
  gate?: string;
};

export const DETAIL: Record<string, ProductDetail> = {
  "a-tox-25ltr": {
    lead: "Træbeskyttelse mod borebiller og husbukke. Vandbaseret, transparent og lugtsvag, til nyt og gammelt træværk indendørs.",
    gate: "Købet kræver et gyldigt CVR-nummer. Er du privat husejer, kan du ikke bestille den her, og så er en fagmand vejen frem.",
    does: [
      "Behandler træværk både forebyggende og der, hvor der allerede er aktivitet",
      "Trænger ind uden at ændre træets udseende, fordi den er transparent",
      "Fås både brugsklar og som koncentrat, så den kan skaleres til opgaven",
    ],
    doesNot: [
      "Siger ikke noget om, hvorvidt træets bæreevne er i behold. Ved husbuk er det det vigtigste spørgsmål, og det kræver, at nogen kigger på konstruktionen",
      "Når ikke ind i det træ, du ikke kan komme til. Larverne sidder inde i materialet, ikke på overfladen",
      "Kan ikke købes uden CVR-nummer",
    ],
    specs: [
      { k: "Mod", v: "Almindelig borebille og husbuk" },
      { k: "Type", v: "Vandbaseret, transparent, lugtsvag" },
      { k: "Størrelser", v: "25 liter brugsklar eller 5 liter koncentrat" },
      { k: "Rækkeevne", v: "5 liter koncentrat giver op til 50 liter færdig blanding ved forebyggende behandling" },
      { k: "Køb", v: "Kræver gyldigt CVR-nummer" },
    ],
    how: [
      "Find ud af, om angrebet er aktivt: frisk, lyst boremel og nye flyvehuller. Gamle huller alene betyder ingenting",
      "Ved husbuk, eller hvis træet føles blødt: stop her, og få set på bæreevnen først",
      "Gør træet rent og tørt, og fjern maling og lak, hvor midlet skal ind",
      "Påfør efter etiketten, og hold øje med boremel igen næste sæson",
    ],
  },
  "pest-stop-hvepsespray": {
    lead: "Skumspray med lang rækkevidde til hvepsebo, du kan se og nå fra jorden.",
    does: [
      "Rammer et bo på op til cirka tre meters afstand, så du kan stå væk fra det",
      "Skummet bliver siddende i indflyvningshullet i stedet for at løbe af",
      "Virker på almindelige gedehamse og hvepse i hæk, brændestabel og under terrasseplader",
    ],
    doesNot: [
      "Rækker ikke op til et bo under tagsten, i en skunk eller bag facadebeklædning",
      "Fjerner ikke selve boet, og et tomt bo i en konstruktion tiltrækker larver og bænkebidere",
      "Beskytter dig ikke, hvis du er allergisk over for stik",
    ],
    specs: [
      { k: "Rækkevidde", v: "Ca. 3 meter" },
      { k: "Bedste tidspunkt", v: "Efter mørkets frembrud, hvor hvepsene er hjemme og rolige" },
      { k: "Beskyttelse", v: "Dækkende tøj, handsker og briller. Aldrig fra en stige" },
      { k: "Virkning", v: "Minutter på de hvepse, der rammes. Boet er stille efter et døgn" },
    ],
    how: [
      "Find indflyvningshullet i dagslys, og læg mærke til, hvor det sidder",
      "Kom tilbage efter mørkefald med lygte, gerne med rødt lys, og tag dækkende tøj på",
      "Sprøjt direkte ind i hullet i et par sekunder, og gå roligt væk med det samme",
      "Kig til det næste dag. Er der stadig aktivitet, så gentag én gang, og ikke mere end det",
    ],
  },
  "climbup-vaeggelusfaelde": {
    lead: "Skål til sengeben, der fanger væggelus på vej op. Giftfri, og kan bruges igen.",
    does: [
      "Viser dig sort på hvidt, om der er væggelus, og hvor mange",
      "Holder lus, der allerede er i sengen, fra at komme ned og ud igen",
      "Bruges bagefter til at se, om en behandling faktisk virkede",
    ],
    doesNot: [
      "Behandler ikke. Lus i fodpaneler, bag stikkontakter og i madrassømme rører den ikke",
      "Virker ikke, hvis sengetøj eller sengetæppe rører gulvet, for så går de udenom",
      "Kan ikke stå alene, når først bidene er der",
    ],
    specs: [
      { k: "Placering", v: "Ét stykke under hvert sengeben eller møbelben" },
      { k: "Krav", v: "Sengen må ikke røre væg eller gulv andre steder end benene" },
      { k: "Aflæsning", v: "Kig efter hver anden dag den første uge" },
      { k: "Giftfri", v: "Ja. Kan bruges i soveværelse og på børneværelse" },
    ],
    how: [
      "Træk sengen fri af væggen, og sørg for at intet sengetøj rører gulvet",
      "Sæt en skål under hvert ben, med den ru side indad",
      "Kig efter hver anden dag, og notér hvor mange og hvor",
      "Finder du bare én, så ring efter en fagmand nu. Fælden er beviset, ikke løsningen",
    ],
  },
  "klerat-voksblok": {
    lead: "Rottegift til autoriserede bekæmpere. Privatpersoner må ikke lægge den ud.",
    does: [
      "Virker mod brun rotte, husrotte og husmus, også hvor der er resistens over for svagere midler",
      "Voksblokken holder i fugt og kan sikres fast i en låst station",
      "Godkendt til brug i og omkring kloak, af folk med autorisationen til det",
    ],
    doesNot: [
      "Må ikke bruges af private. Bekæmpelse af rotter med gift kræver autorisation fra Miljøstyrelsen",
      "Fritager dig ikke for at anmelde rotter til kommunen. Det skal du under alle omstændigheder",
      "Løser ikke det, rotterne kom ind igennem, og det er som regel et defekt kloakstik",
    ],
    specs: [
      { k: "Aktivstof", v: "Brodifacoum, 2. generation" },
      { k: "Hvem må bruge den", v: "Kun autoriserede, R1 eller R2" },
      { k: "Anmeldepligt", v: "Rotter skal meldes til kommunen, uanset hvad du selv gør" },
      { k: "Anvendelse", v: "I sikrede stationer, i og omkring bygninger" },
    ],
    how: [
      "Har du set en rotte: meld det til kommunen. Det er gratis og det er et krav",
      "Er du autoriseret, så læg blokkene i sikrede stationer efter etiketten",
      "Er du ikke, så er det her ikke et produkt til dig, og det er ikke et smuthul",
      "Få kloakken tjekket. Rotter i huset kommer næsten altid op gennem et brud",
    ],
  },
};

/**
 * OURS: Butikken har ingen ægte tilbud lige nu. Fire varer er flaget som
 * tilbud i hans WooCommerce, men før- og nu-pris er den samme på alle fire,
 * så der er intet at streget over. Sektionen findes og virker; den fylder
 * sig selv, i det øjeblik han sætter en rigtig tilbudspris. Indtil da siger
 * den det, som det er, hvilket er bedre end en opfundet rabat.
 */
export const DEALS_NOTE =
  "Der er ingen aktive tilbud lige nu. Vi sætter dem her, så snart der er.";
