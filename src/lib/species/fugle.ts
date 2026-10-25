import type { SpeciesArticle } from "../speciesContent";

const articles: SpeciesArticle[] = [
  {
    name: "Bydue",
    slug: "bydue",
    latin: "Columba livia",
    description:
      "Byduen er den grå due, der yngler på bygninger og altaner. Sådan kender du den, derfor tilsviner den med ekskrementer, og sådan holder du den væk.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Byduen — også kaldt klippedue eller forvildet tamdue — er den grå due med mørke vingebånd og to sorte bjælker på halen, du ser overalt i byerne. Farven varierer en del, fordi mange byduer stammer fra brevduer og andre tamduer.",
          "Den flytter ikke, når den har fundet en redeplads: finder et par først en god plads, bliver den. Et par kan under gode forhold få op til ni kuld af to unger om året, så en flok uden regulering vokser hurtigt.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Byduen yngler på bygninger: under tage, i udhæng, på altaner og i åbne lofter. I byområder ses den ofte i flokke på pladser tæt på høj bebyggelse, hvor der er nem adgang til både redepladser og føde.",
          "Fodring gør problemet større. Når folk fodrer duerne, vokser flokkene, og pladsen bliver tilsvinet tilsvarende hurtigere.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvorfor er den et problem",
        paragraphs: [
          "Det største problem er ekskrementerne. De misfarver bygninger, og den høje koncentration af urinsyre nedbryder over tid kalkfuger og kalkpuds på facader. På biler kan dueklatterne give lakskader, og i tagrender og nedløb samler ekskrementerne sig sammen med blade og snavs, så vandet ikke kan løbe bort.",
          "Ekskrementerne kan bære salmonella og campylobacter, og tørt dueekskrement som støv kan irritere luftvejene. Der ses ca. 25 tilfælde om året i Danmark af papegøjesyge, som duer kan sprede — typisk hos fugleholdere. Gamle reder huser desuden lopper og mider, der senere kan finde vej indenfor.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan holder du den væk",
        paragraphs: [
          "Fjern reder hurtigt og gerne gentagne gange — giver du duerne ro på en plads, bliver de. Desinficér stedet bagefter, så lopper og mider ikke bliver hængende.",
          "Gør siddepladserne ubrugelige: monter duepigge (også kaldet fakirer) eller wire på gesimser og tagrygge, smør fuglepasta på gesimser, tagrender og tagrygge, og spænd et grovmasket net for altanen i vinterhalvåret. Et par stramme snore eller ståltråde et par centimeter over tagryggen gør den også uattraktiv.",
          "Lad være med at bruge foliestrimler, skræmmemekanismer og ultralyd — duerne vænner sig til dem. En rovfuglsilhouette i ruden virker til gengæld mod rudeskader. Byduen er undtaget fra jagtloven og må jages året rundt, men gift må aldrig bruges mod duer. Skriv til os, hvis du vil have hjælp til afværgen.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Ringduen er større med en stor hvid plet på hver side af halsen og yngler i træer frem for på bygninger. Tyrkerduen er mindre og ensartet lys og blev jagtfredet i 2020 — den må ikke jages.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.bolius.dk/saadan-holder-du-duerne-vaek-12878",
      "https://www.skadedyrene.dk/Duer/duer_forebyggelse.htm",
    ],
  },
  {
    name: "Sølvmåge",
    slug: "soelvmaage",
    latin: "Larus argentatus",
    description:
      "Sølvmågen er den store måge, der skriger fra tagene og bygger rede på flade tage. Sådan kender du den, og hvad der kan gøres ved den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Sølvmågen er en stor, kraftig måge med grå ryg, hvidt hoved og gult næb. Sammen med stormmågen er de de to arter, der laver mågeproblemer i danske byer.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Sølvmåger har etableret store bestande i mange danske byer, især i kystbyer. Fra april gør de krav på redepladser på tage og gesimser, og mens ungerne er i reden, skriger de fra solopgang til solnedgang og er ikke bange for at styrte ned mod mennesker, der nærmer sig.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvorfor er den et problem",
        paragraphs: [
          "Støjen fra en redeplads på taget er det største problem, men mågerne sviner også ned med ekskrementer, åbner skraldespande og kan gå til angreb, når de forsvarer unger og yngleføde. En flok måger over tagterrassen ødelægger sommeren.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad kan du gøre",
        paragraphs: [
          "Forebyggelsen er fysisk: net over tagfladen holder mågerne fra at lande og bygge rede, og sikrede affaldsbeholdere fjerner fødekilden. Rækker af pigge eller wire på gesimser hjælper på steder, hvor fuglene sidder.",
          "Alle mågefugle er omfattet af jagtloven, så regulering — for eksempel skydning — kræver forudgående tilladelse fra myndighederne og skal udføres af professionelle. Skriv til os, så siger vi, hvad der er muligt på din bygning.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Stormmågen er mørkere med næsten sort ryg. Hættemågen er mindre med en sort hætte og holder sig mere ved søer og kyster uden for byerne. Tilsviningen og metoderne er stort set de samme for alle tre.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://dpcskadedyr.dk/hjaelp-til-skadedyr/duer-og-maager/",
      "https://www.anticimex.dk/duebekaempelse/case-stories/net-og-pigge-stopper-duers-og-allikers-tilsvining-af-passagerer-og-station/",
    ],
  },
  {
    name: "Allike",
    slug: "allike",
    latin: "Coloeus monedula",
    description:
      "Alliken er den lille sorte krage med det grå næb. Sådan kender du den, og hvordan du holder den væk fra skorstene og taget.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Alliken er en lille, sort krage med lysegrå næb og en lys grå nakke. Den holder sig gerne i flokke og er en udbredt fugl i byer, parker og på kirkegårde.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Alliken bygger rede i hulrum: åbne skorstene, under tagudhæng, i tårne og i hulheder i bygninger. En flok, der slår sig ned på et tag, tilsviner gesimser og tagrender med ekskrementer.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvorfor er den et problem",
        paragraphs: [
          "Som duerne sviner alliker ned med ekskrementer, hvor de sidder. Op ad facader, på stationer og langs gesimser kan tilsviningen blive massiv, når flokken er stor. Reden i skorstenen kan desuden blokere for, at røgen kan komme ordentligt ud.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan holder du den væk",
        paragraphs: [
          "Fjern reder, så snart du opdager dem, og gentag det, til fuglene giver op. Monter net, pigge eller wire på de steder, hvor flokken sidder, og få sat en låge eller et net på skorstenen, så der ikke bygges rede i den.",
          "På større bygninger og stationer bruges de samme løsninger som mod duer: net over fladerne og pigge eller wire langs gesimserne. Skriv til os, så ser vi på bygningen.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Stæren er mindre med spættet, mørkt fjerdragt og kortere næb. Kragen er langt større og helt sort med et sort næb. Tilsviningen er den samme som duernes, og du bruger de samme løsninger: net, pigge og wire.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.anticimex.dk/duebekaempelse/case-stories/net-og-pigge-stopper-duers-og-allikers-tilsvining-af-passagerer-og-station/",
      "https://www.skadedyrene.dk/Duer/duer_forebyggelse.htm",
    ],
  },
];

export default articles;
