import type { PestEntry } from "./pests";
import { PESTS } from "./pests";
export type ServiceContent = {
  /** One or two sentences under the page title. */
  intro: string;
  /** Why getting a professional out is the route that actually holds. */
  whyProfessional: string[];
  /** The species or variants people run into here. */
  species: { name: string; text: string }[];
  /** How the visit runs, in a couple of lines. */
  processNote: string;
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  rotter: {
    intro:
      "Rotter og mus kan lave mere skade, end de første tegn antyder. De gnaver i ledninger, isolering og selve " +
      "konstruktionen, og de formerer sig hurtigt. En fagmand finder årsagen til, at de er kommet ind, ikke kun " +
      "de dyr, du kan se.",
    whyProfessional: [
      "Vi sikrer adgangsvejene, så problemet ikke bare vender tilbage",
      "Foderstationer bliver sat rigtigt op og mærket, så du kan følge med i, hvad der sker",
      "Skriftlig dokumentation, du kan bruge over for forsikring, udlejer eller ejendomsadministration",
      "Vi vurderer risikoen for, at problemet spreder sig til naboer og nabobygninger",
    ],
    species: [
      { name: "Brun rotte (kloakrotte)", text: "Den store, gråbrune rotte. Den kommer typisk ind udefra gennem kloak, hulmur eller utætte gennemføringer og kan gnave sig vej gennem bløde materialer." },
      { name: "Sort rotte", text: "Mindre og mørkere end kloakrotten og holder sig oftest højt, for eksempel på loftet, i skakte og bag væggene i ældre bygninger." },
      { name: "Husmus", text: "Lille, lys og hurtig. Den finder vej gennem meget smalle sprækker og holder sig tæt på varme, mad og gemmesteder med mennesker i nærheden." },
    ],
    processNote:
      "Først besigtiger vi adressen for at forstå, hvordan dyrene kommer ind, og hvad der tiltrækker dem. " +
      "Derefter sikrer vi adgangsvejene og sætter foderstationer op efter behov. Prisen ligger fast, før vi " +
      "går i gang, og du får skriftlig dokumentation for behandlingen.",
  },
  myrer: {
    intro:
      "Myrer i terrassen eller i køkkenet er sjældent farlige, men de er generende, og en rede vokser hurtigt. " +
      "En fagmand finder reden og behandler den, så kolonien er standset, i stedet for at dukke op igen næste sæson.",
    whyProfessional: [
      "Vi finder den rede, du ikke selv kan opdrive, og behandler den direkte",
      "Godkendte midler, doseret rigtigt, så de virker og er forsvarlige for hus og have",
      "Mindre risiko for, at angrebet vender tilbage næste forår",
      "Råd om, hvordan du forebygger, at myrerne kommer tilbage",
    ],
    species: [
      { name: "Rød skovmyre", text: "Bygger det kendte myrebo af grannåle i haven. Den er fredet og skal normalt ikke bekæmpes, medmindre den optræder inde i huset." },
      { name: "Sort havemyre", text: "Den almindeligste i haver og på terrasser. Den går typisk ind efter mad og kan lave gange under fliserne." },
      { name: "Pharaomyre", text: "Lille, gulagtig og stærkest indendørs, for eksempel i køkkener. Den lever i smalle sprækker og kan sprede sig mellem lejligheder." },
      { name: "Gul engmyre (ænsmyren)", text: "Laver de små jordhøje i plænen. Ufarlig, men ofte den, der forveksles med myrer, der faktisk skal behandles." },
    ],
    processNote:
      "Først fastlægger vi, hvilken myreart det er, og hvor reden sidder, fordi middel og metode afhænger af " +
      "det. Derefter behandles reden og adgangsvejene. Prisen ligger fast, før vi går i gang, og du får " +
      "skriftlig dokumentation for behandlingen.",
  },
  hvepse: {
    intro:
      "Et hvepsebo tæt på en dør, et vindue eller legepladsen er ikke en opgave, du skal tage selv, når boet " +
      "først er i gang. En fagmand fjerner det, uden at du eller andre bliver udsat for stik.",
    whyProfessional: [
      "Boet bliver fjernet, også når det sidder et besværligt sted",
      "Vi vurderer, om det er hvepse eller bier, og hvordan det skal håndteres",
      "Efterbehandling af hulrummet, så de ikke bygger bo samme sted igen",
      "Skriftlig dokumentation for behandlingen",
    ],
    species: [
      { name: "Tysk hveps", text: "Den mest almindelige i Danmark. Bygger bo på lofter, i skure og i hulrum og kan blive aggressiv, når boet vokser." },
      { name: "Almindelig hveps", text: "Den klassiske gæst i sensommeren. Bygger typisk bo i jordhuller og i hulrum." },
      { name: "Jordhveps", text: "Ligner den almindelige hveps, men graver ofte boet i græsplænen eller under terrassen." },
    ],
    processNote:
      "Boet bliver fjernet, og stedet bliver efterbehandlet, så hvepsene ikke bygger det op igen. Vi fortæller " +
      "dig på forhånd, om du skal være hjemme, og hvornår området kan bruges som før.",
  },
  vaeggelus: {
    intro:
      "Væggelus gemmer sig i sømme, fodlister og bag løst tapet. De forsvinder ikke ved vask og nyt sengetøj " +
      "alene. En fagmand når de steder, du ikke selv når, og behandler over et forløb.",
    whyProfessional: [
      "Vi når ind i sprækker, sømme og bag løst tapet, hvor dyrene sidder",
      "Godkendte midler, brugt efter de danske regler",
      "Råd om vask og ryddeliggøring, så du undgår, at de vender tilbage",
      "Skriftlig dokumentation, der er relevant ved udlejning, flytning og forsikringssager",
    ],
    species: [
      { name: "Almindelig væggelus", text: "Flad, rødlig og aktiv om natten, hvor den søger blod. Holder til i sømme i madras og sengetøj." },
      { name: "Vingetæge", text: "Ligner almindelig væggelus og ses især, hvor der er flagermus på loftet. Samme adfærd og samme behov for behandling." },
    ],
    processNote:
      "Forløbet er ofte to eller flere besøg med mellemrum, fordi æggene ikke bliver ramt første gang. Du får " +
      "konkret råd om, hvad der skal vaskes og ryddes mellem besøgene. Prisen aftales, før forløbet går i gang.",
  },
  soelvfisk: {
    intro:
      "Skægkræ og sølvfisk holder sig, hvor det er fugtigt og mørkt: i kælderen, i bryggerset, under vasken " +
      "og bag løse fodlister. Ofte er fugtproblemet den egentlige årsag, og det bliver ofte overset.",
    whyProfessional: [
      "Vi finder årsagen i fugt og utætheder, ikke kun de dyr, du kan se",
      "Midler med varig effekt i fugtzoner, revner og bag fodlister",
      "Mindre risiko for, at de vender tilbage",
      "Skriftlig dokumentation for behandlingen",
    ],
    species: [
      { name: "Skægkræ", text: "Langbenet og hurtig. Holder til i fugtige rum som bryggers, kælder og vaskeskabe." },
      { name: "Sølvfisk", text: "Slank, sølvblank og sky. Holder af stivelseholdigt papir, tapet og fugtige hjørner." },
    ],
    processNote:
      "Vi behandler fugtzoner, revner og områder bag fodlister og fortæller dig, hvad du selv kan gøre for at " +
      "tørre forholdene ud. Prisen ligger fast, før vi går i gang.",
  },
  borebiller: {
    intro:
      "Huller i lofter, gulve og nedfaldende træværk er typisk tegn på borebiller. Skaden sidder inde i " +
      "træværket og vokser, mens du ser til. En fagmand vurderer omfanget og behandler rigtigt.",
    whyProfessional: [
      "Vi vurderer, hvor langt angrebet har spredt sig, så behandlingen rammer det, den skal",
      "Godkendte midler til selve træværket",
      "Råd om, hvilke dele der bør udskiftes",
      "Dokumentation til ejendomsadministration eller forsikring",
    ],
    species: [
      { name: "Husbuk", text: "Den alvorligste. Gnaver gange i blødt nåletræ, for eksempel i tagkonstruktioner og lofter. De karakteristiske huller i overfladen er et af tegnene." },
      { name: "Løvtræborebille", text: "Gnaver i hårdt løvtræ som egetræ og ses ofte i ældre bygningsdele og møbler." },
      { name: "Borebille i møbler og gulve", text: "Kan optræde i løst træ, møbler og trægulve, hvor skaden viser sig som smalle huller og fint boremel." },
    ],
    processNote:
      "Først fastlægger vi, om det er borebiller, og hvor vidt angrebet er gået. Derefter behandles det " +
      "angrebne træværk, og du får dokumentation for behandlingen.",
  },
  kakerlakker: {
    intro:
      "Kakerlakker i køkken, badeværelse eller erhvervskøkken er mere end et synligt ubehag. De spreder smitte " +
      "og overlever i afløb og skjulesteder. En fagmand behandler kilden, ikke kun dem, du ser om natten.",
    whyProfessional: [
      "Gelbehandling i skjulesteder, afløb og bag hvidevarer, du ikke selv når",
      "Vi finder kilden og adgangsvejene, så behandlingen holder",
      "Et forløb tilpasset angrebets størrelse, med opfølgende besøg når det er nødvendigt",
      "Skriftlig dokumentation, også til audit og egenkontrol",
    ],
    species: [
      { name: "Tysk kakerlak", text: "Den almindeligste indendørs. Lille, lysbrun og holder af køkken, badeværelse og bag hvidevarer." },
      { name: "Orientalisk kakerlak", text: "Større, mørk og hurtig. Holder til i varme, fugtige steder som kældre og teknikskakte." },
      { name: "Amerikansk kakerlak", text: "Stor, rødlig og kommer ofte udefra. Kan ses både inde og ude, for eksempel ved indgangsdøre og kloakdæksler." },
    ],
    processNote:
      "Vi starter med at finde kilden og adgangsvejene og behandler derefter med gel og lokkedøre tilpasset " +
      "angrebet. Ved kraftige angreb laver vi opfølgende besøg. Til erhverv får du dokumentation til audit.",
  },
  fluer: {
    intro:
      "Fluer i boligen kommer sjældent alene. De har fundet en kilde: affald, afløb, moden frugt eller et dødt " +
      "dyr et sted, du ikke har fået øje på. En fagmand finder kilden og stopper produktionen.",
    whyProfessional: [
      "Vi finder kilden, du ikke selv kan opdrive",
      "Midler mod både voksne fluer og larver, så bestanden ikke bare vokser igen",
      "Råd om affald, afløb og opbevaring",
      "Skriftlig dokumentation for behandlingen",
    ],
    species: [
      { name: "Husflue", text: "Den velkendte, grå flue. Holder af affald, madvarer og mørknet materiale." },
      { name: "Kloakflue", text: "Lille og mørk med dunede vinger. Kommer ofte fra afløb, der er tørret ud eller snavsede, og kan være en plage på badeværelset." },
      { name: "Bananflue", text: "Lille og gulbrun. Holder af moden frugt, gærende væske og affald." },
    ],
    processNote:
      "Vi fastlægger, hvor fluerne kommer fra, og behandler kilden. Derefter får du konkrete råd til " +
      "forebyggelse, så du slipper for, at det vender tilbage. Prisen ligger fast, før vi går i gang.",
  },
  edderkopper: {
    intro:
      "Edderkopper i hjørner, lofter og udestuer er som regel harmløse, men spindet kan være generende, og " +
      "nogle arter kan bide. En fagmand fjerner dem og rådgiver, så de ikke etablerer sig igen.",
    whyProfessional: [
      "Vi når lofter, hjørner og vindueskarme, hvor spindet sidder",
      "Midler med varig effekt, så du slipper for at gøre rent igen og igen",
      "Råd om forebyggelse, så de ikke etablerer sig på ny",
      "Skriftlig dokumentation for behandlingen",
    ],
    species: [
      { name: "Husedderkop", text: "Harmløs, men bygger store spind i kælder, udskure og udestuer. Den holder bestanden af andre insekter nede." },
      { name: "Vinduesedderkop", text: "Langbenet og harmløs. Ses ofte om efteråret i lofter og hjørner med ro og lidt fugt." },
      { name: "Korsedderkop", text: "Kendt på det lyse mønster på ryggen. Ses ofte i haven og kan finde vej indenfor om efteråret." },
    ],
    processNote:
      "Vi behandler de steder, hvor spindet sidder, og giver råd om, hvordan du forebygger nye. Prisen ligger " +
      "fast, før vi går i gang.",
  },
};

/** The copy for a given pest, or undefined when no page exists for it. */
export function serviceContentFor(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[slug];
}

/** Registry entry for a slug, so the page can reuse label and glyph. */
export function servicePest(slug: string): PestEntry | undefined {
  return PESTS.find((p) => p.slug === slug);
}
