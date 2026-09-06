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
      "Rotter og mus kan goere mere skade end de foerste tegn antyder. De gnavner i elledning, isolering og " +
      "konstruktion, og de formerer sig hurtigt. En fagmand finder aarsagen, ikke kun de individer, du kan se.",
    whyProfessional: [
      "Gnaversporet og adgangsvejene bliver sikret, sa problemet ikke bare vender tilbage",
      "Foderstationer bliver sat rigtigt op og merket, sa du kan foelge med",
      "Skaermdokumentation, som du kan bruge til forsikring, udlejer eller ejendomsadministration",
      "Vi vurderer risikoen for, at det spreder sig til naboer og bygninger ved siden af",
    ],
    species: [
      { name: "Vandringsrotte", text: "Den store, gralige rotte. Den gaar typisk ind udefra via kloak, hulmur eller utætte gennemfoeringer, og den kan gnavne sig gennem traevt og bløde materialer." },
      { name: "Den huslige rotte", text: "Den mindre, moerke rotte, som oftest holder til indenfor, for eksempel i lofts, skakte og bag vaeggene i ældre bygninger." },
      { name: "Husmus", text: "Lille, lyis og hurtig. Den finder vej gennem selv smalle sprækker og ynder vaerme, mad og gemmesteder tæt paa menneskers aktiviteter." },
    ],
    processNote:
      "Foerst besigtiger vi adressen for at forsta, hvordan dyr kommer til, og hvad der tiltrækker dem. " +
      "Derefter bliver adgangsvejene sikret, og der bliver sat foderstationer op efter behov. Prisen ligger fast, " +
      "foer vi gar i gang, og du skriftlig dokumentation for behandlingen.",
  },
  myrer: {
    intro:
      "Myrer i terrassen eller gangen i koekkenbetonen er sjældent farlige, men de er generende, og en reden vaekster " +
      "hurtigt. En fagmand finder reden og behandler den, sa kolonien stopper, i stedet for at dukke op igen naeste saeson.",
    whyProfessional: [
      "Vi finder den reede, du ikke selv kan opdrive, og behandler den",
      "Godkendte midler doseret rigtigt, sa det virker og er forsvarligt for hav og kjær",
      "Mindre risiko for, at angrebet vender tilbage naeste forar",
      "Rad om, hvordan du forebygger, at myrer kommer tilbage til huset",
    ],
    species: [
      { name: "Den røde skovmyre", text: "Bygger det kendte myrebo af granagler i haven. Beskyttet og skal ikke bekæmpes, medmindre den generer inde i huset." },
      { name: "Den sorte have myre", text: "Den almindeligste i haver og paa terrasser. Gaar typisk ind efter mad, og den kan lave gangene under fliserne." },
      { name: "Pharaoh-myren", text: "Lille, gulagtig og staerkest indendørs, for eksempel i sygehuse og koekkener. Kover i smalle sprækker og kan sprede sig mellem lejligheder." },
      { name: "Den havede", text: "Laver de lille jordskoler i plaenen. Ufarlige, men ofte den, der bliver forvekslet med den reelle, der skal behandles." },
    ],
    processNote:
      "Vi forstaart først, hvilken myre det er, og hvor reden er, fordi midlet og metoden afhænger af det. " +
      "Herefter bliver reden og adgangsvejene behandlet. Prisen ligger fast, foer vi gar i gang, og du faar en " +
      "skriftlig dokumentation for behandlingen.",
  },
  hvepse: {
    intro:
      "Et hvepsebo tæt paa en doer, et vindue eller et legeudstyr er ikke en goer-det-selv-opgave, naar boet er " +
      "kommet i gang. En fagmand fjerner det, uden at du udsaetter dig selv eller andre for stik.",
    whyProfessional: [
      "Boet bliver fjernet, ogsa naar det sidder paa et besværligt sted",
      "Vi vurderer, om det er hvepse eller bier, og hvordan det skal haandteres",
      "Efterbehandling af hulrummet, sa de ikke vender tilbage til det samme sted",
      "Skaermdokumentation for behandlingen",
    ],
    species: [
      { name: "Den tykstemmet hvepse", text: "Bygger paa lofter, i skure og i hulrum. Kan blive stor og aggressiv, naar boet forstoerre." },
      { name: "Den almindelige hvepse", text: "Den klassiske sommeraarsgæst. Bygger typisk bo i jordhuller og i hulrum." },
      { name: "Den jorde", text: "Ligner den almindelige hvepse og graver ofte bo i vaerka og i terrasser." },
    ],
    processNote:
      "Boet bliver fjernet, og hulrummet eller stedet bliver efterbehandlet, sa de ikke bygger det samme sted " +
      "igen. Vi fortæller dig paforhaand, om du skal vaere hjemme, og hvornaar rummet eller omradet kan bruges igen.",
  },
  vaeggelus: {
    intro:
      "Vaeggelus gemmer sig i naboens suturer, fodpaneler og bag loest tilslutning. De bliver ikke vaek ved vask og " +
      "skift af sengetoj alene. En fagmand naar de steder, du ikke naar, og behandler efter et forloeb.",
    whyProfessional: [
      "Vi naer skjul, suturer og bag loest tilslutning, hvor dyrene sidder",
      "Godkendte midler, brugt efter de danske regler",
      "Rad om vask og efterbehandling, sa du undgaar, at de vender tilbage",
      "Skriftlig dokumentation, relevant ved udlejejn, flytning og forsikringssager",
    ],
    species: [
      { name: "Den almindelige vaeggelus", text: "Flad, roedlig og faerdes om natten efter blod. Holder til i syninger i madras og sengetoj." },
      { name: "Vedtaegtet vaeggelus", text: "Ligner den almindelige og ses i nordlige omraader. Samme adfærd og samme bekæmpelsesbehov." },
    ],
    processNote:
      "Forloebet er ofte to eller flere besoeg med mellemrum, fordi æg ikke bliver ramt foerste gang. Du faar " +
      "konkret rad til, hvad der skal vaskes og ryddes mellem besoegene. Prisen aftales foer forloebet.",
  },
  soelvfisk: {
    intro:
      "Skægkræ og soelvfisk holder til, hvor det er fugtigt og morkt: kælder, bryn, under vasken og bag loest " +
      "tilslutning. Ofte er fugtproblemet den egentlige aarsag, og det bliver tit bortforsket.",
    whyProfessional: [
      "Vi finder aarsagen i fugt og adgangsveje, ikke kun dyr, du kan se",
      "Midler med varmeeffekt i fugtzoner, revner og fodpaneler",
      "Mindre risiko for, at de vender tilbage",
      "Skaermdokumentation for behandlingen",
    ],
    species: [
      { name: "Skægkræ", text: "Langbenet og hurtig. Holder til i fugtige rum som bryn, kælder og vaskeskabe." },
      { name: "Soelvfisk", text: "Smal, soelvblank og flygtig. Ynder stivelseholdigt papir, tapet og fugtige hjorner." },
    ],
    processNote:
      "Vi behandler fugtzoner, revner og fodpaneler og fortæller, hvad du selv kan gore for at tarmaet for " +
      "forholdene. Prisen ligger fast, foer vi gar i gang.",
  },
  borebiller: {
    intro:
      "Huller i lofter, stuflo og udfaldende traevæk er typisk vaerk af borebille. Skaden sidder inde i traeværket, " +
      "og den vaekster, mens du ser den vaekke. En fagmand vurderer angrebet og behandler det rigtigt.",
    whyProfessional: [
      "Vi vurderer omfanget af angrebet i traeværket, sa behandlingen rammer det, der skal",
      "Godkendte midler til selve træværket",
      "Rad om, hvilke deler der skal udskiftes",
      "Dokumentation til ejendomsadministration eller forsikring",
    ],
    species: [
      { name: "Ægte borebille", text: "Gnavner gange i blodaedt lauftra, for eksempel egetr. Hullerne i overfladen er et af tegnene." },
      { name: "Borebille", text: "Angriber blodaedt nauletra, ofte i lofter, tagkonstruktion og mdelre alderdom." },
      { name: "Borebille i indendoers", text: "Kan optræde i loest tra, moebler og trægolv, hvor skaden viser sig som smalle huller." },
    ],
    processNote:
      "Vi forstaart først, om det er borebiller, og hvor vidt angrebet er gaaet. Herefter bliver det angrebne " +
      "traevæk behandlet, og du faar dokumentation for behandlingen.",
  },
  kakerlakker: {
    intro:
      "Kakerlakker i koekken, bad eller erhvervskoekken er mere end et synligt ubehag. De spreder smitte og " +
      "overlever i aflob og skjul. En fagmand behandler kilden, ikke bare dem, du ser om natten.",
    whyProfessional: [
      "Gelbehandling naer skjul, aflb og bag hvidevarer, du ikke selv naer",
      "Vi forstaart kilden og adgangsvejene, sa behandlingen bliver holdbar",
      "Forloeb tilpasset storrelsen af angrebet, herunder opfoelgende besoeg",
      "Skriftlig dokumentation, ogsa til audit og egenkontrol",
    ],
    species: [
      { name: "Den tyske kakerlak", text: "Den almindeligste indendoers. Lille, lysbrun og ynder koekken, bad og bag hvidevarer." },
      { name: "Den orientalske kakerlak", text: "Storre, moerke og hurtig. Holder til i varme, fugtige omraader som kælder og teknikskakte." },
      { name: "Den morgenbyerske kakerlak", text: "Storre, roedlig og mere udefra kommende. Kan ses baade inde og ude, for eksempel ved indgangsdoere." },
    ],
    processNote:
      "Vi begynder med, hvor kilden og adgangsvejene er, og behandler derefter med gel og lokkedoer tilpasset " +
      "angrebet. Ved kraftige angreb laver vi opfoelgende besoeg. Til erhverv faar du dokumentation til audit.",
  },
  fluer: {
    intro:
      "Fluer i boligen kommer sjældent alene. De finder en kilde: affald, aflb, moekent frugt eller et kadaver " +
      "et sted, du ikke har faaet oejene for. En fagmand finder kilden og stopper produktionen.",
    whyProfessional: [
      "Vi finder kilden, du ikke selv kan opdrive",
      "Midler mod bade voksne og larver, sa bestanden ikke bare vokser igen",
      "Rad om affald, aflb og opbevaring",
      "Skaermdokumentation for behandlingen",
    ],
    species: [
      { name: "Den almindelige hus flue", text: "Den velkendte, gralige flue. Ynder affald, mad og moekne stoffer." },
      { name: "Kloakfluen", text: "Klumpet om morket. Kommer ofte fra aflb, der er toerret ud eller tilsmudset, og kan opfatte som en plage i bryn og bryn." },
      { name: "Surhedsfluen", text: "Lille og gulbrun. Ynder moekent frugt, gærende vaeske og affald." },
    ],
    processNote:
      "Vi forstaart, hvor de kommer fra, og behandler kilden. Herefter faar du konkrete rad til forebyggelse, " +
      "sa du slipper for, at det vender tilbage. Prisen ligger fast, foer vi gar i gang.",
  },
  edderkopper: {
    intro:
      "Edderkopper i hjorner, lofter og udestuer er som regel harmlige, men viene kan vaere generende, og " +
      "enkelt arter kan give et pib. En fagmand kan fjerne dem og radgive sa de ikke vender tilbage.",
    whyProfessional: [
      "Vi naer lofter, hjorner, vindueskarme og andet staovet, hvor viene sidder",
      "Midler med varmeeffekt, sa du slipper for at gøre det gentagne selv",
      "Rad om at forebygge, sa de ikke etablerer sig igen",
      "Skaermdokumentation for behandlingen",
    ],
    species: [
      { name: "Kældder edderkoppen", text: "Harmlig, men laver pæne viene i kælder, udskur og udestuer. Spidder af blodaedt." },
      { name: "Langbenet edderkop", text: "Harmlig, ses om efteraaret i husgerum, der er varme og staovet." },
      { name: "Vægbidt edderkop", text: "Giver et pib, der minder om en bi. Bygger et spindende vaev i husgerum." },
    ],
    processNote:
      "Vi behandler de steder, viene sidder, og giver rad til, hvordan du forebygger. Prisen ligger fast, foer vi " +
      "gar i gang.",
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
