import type { SpeciesArticle } from "../speciesContent";

// Rotter in Denmark: the legal facts (anmeldelsespligt, authorised
// controllers only, bait only in locked stations) come from the MST
// guidance and municipal pages listed in `sources`.
const MST = "https://mst.dk/media/rclcc3kv/vejledning-om-forebyggelse-og-bekaempelse-af-rotter-2019.pdf";
const ANTICIMEX = "https://www.anticimex.dk/rotter/metoder-til-at-slippe-af-med-rotter/";
const FURESOE = "https://www.furesoe.dk/borger/bolig/ejerbolig/rotter-og-skadedyr";

const articles: SpeciesArticle[] = [
  {
    name: "Brun rotte",
    slug: "brun-rotte",
    latin: "Rattus norvegicus",
    description:
      "Brun rotte er den rotteart, næsten alle fund i Danmark drejer sig om. Sådan kender du den, hvorfor ét fund bliver til mange, og hvad loven siger om bekæmpelse.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Brun rotte har en krop på 18-25 cm, en butt snude og små ører, der ikke når ned over øjnene. Halen måler 15-21 cm og er altså kortere end kroppen. Vægten ligger typisk på 200-500 g.",
          "Ekskrementerne er sorte, ca. 6 mm tykke og op til 17 mm lange og spidser til i den ene ende. Friske gnavmærker er ca. 4 mm brede, og åbninger til gange er cirkelrunde og ca. 2 cm i diameter — en to-krones størrelse.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Brun rotte lever i kloakker, kældre og jordgangsystemer og kommer op, hvor der er føde. Den har brug for et hul på ca. 2 cm for at komme ind i en bygning.",
          "Den er en glimrende svømmer, en god klatrer og kan springe ca. 90 cm lodret. Faldstammeudluftningen, utætte kloakdæksler og sprækker ved soklen er typiske adgangsveje.",
          "Ud over ekskrementer efterlader den en skarp kloak- eller staldlugt, som mange når at bemærke, før de ser selve dyret.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Brun rotte formerer sig hurtigt: 4-7 kuld årligt med 8-12 unger pr. kuld, og ungerne er kønsmodne efter 2-3 måneder. Et lokal fund kan derfor blive til et helt system på et enkelt år.",
          "De lever i kloakker, kældre og jordgangsystemer og holder sig tæt på fødekilder. Fjernes føden, flytter de sig — men de forsvinder ikke af sig selv.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Rotter overfører bl.a. salmonella, leptospirose (Weils sygdom) og E. coli via urin, ekskrementer og bid. De ødelægger ledninger, rør, isolering og fødevarer.",
          "Bid og berøring med ekskrementer i køkkenet er de konkrete situationer, man skal undgå. Opbevar mad tætsluttende, og rengør overflader, hvor rotterne har været.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Tæt huller ved sokkel og rør med metalrist, sikr faldstammeudluftningen, fjern foderrester og rodebunker, opbevar foder tæt, og beskær træer væk fra tagrenden, så rotterne ikke kan springe eller klatre over på taget.",
          "Det meste af forebyggelsen handler om at fjerne adgang og føde. En rotte, der hverken kan komme ind eller finde mad, søger et andet sted hen.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Rotter skal altid anmeldes til kommunen, uanset hvor du ser dem. Det er pligt, og det er strafbart at lade være.",
          "Bekæmpelse af rotter må kun udføres af autoriserede rottebekæmpere, og rottegift må kun udlægges i aflåste foderstationer — ellers risikerer rovfugle, katte og hunde at blive forgiftet sekundært.",
          "Skriv til os, så ser vi på sporene og fortæller dig, hvad der er det næste skridt.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Sort rotte er slankere med spids snude, store nøgne ører og en hale, der er længere end kroppen; den ses mest ved havne og på lofter. Mus er langt mindre og har en hale, der er omtrent lige så lang som kroppen. Mosegrisen kaldes også vandrotte, men den er en studsmus og ikke en rotte.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [MST, ANTICIMEX, FURESOE],
  },
  {
    name: "Sort rotte",
    slug: "sort-rotte",
    latin: "Rattus rattus",
    description:
      "Sort rotte er sjælden i Danmark og ses mest ved havne og på lofter. Sådan kender du den fra brun rotten, og hvorfor et fund stadig skal anmeldes.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Sort rotte er slankere end brun rotten med en spids snude og store, nøgne ører. Halen er længere end kroppen — det modsatte af brun rotten, hvis hale er kortere.",
          "Navnet til trods er den ikke nødvendigvis sort; den kan være mørkebrun til sort ovenpå. Det er bygningen på kroppen, der afgør arten, ikke farven alene.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I Danmark er sort rotten sjælden og ses især ved havne og på lofter. Den er en bedre klatrer end brun rotten og holder sig gerne i højden — i tagrum, på lofter og i skotter.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Som brun rotten overfører den sygdomme via urin, ekskrementer og bid og gnaver i ledninger, isolering og opmagasinerede ting. På et loft kan man derfor finde både spor og ødelagte effekter, uden at have set selve dyret.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Samme regler gælder som for alle rotter: fundet skal anmeldes til kommunen, uanset hvor dyret er set, og bekæmpelse må kun udføres af autoriserede rottebekæmpere. Rottegift må kun udlægges i aflåste foderstationer.",
          "Fordi sort rotten holder sig i højden, ligger en stor del af arbejdet i at finde og tætte adgangsvejene ved tag og tagrende — ellers bliver den eller en ny boende.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Brun rotte er kraftigere med butt snude, små ører og hale kortere end kroppen; den er langt den almindeligste i Danmark. Husmus og halsbåndmus er mange gange mindre. På loftet kan man også få besøg af husmår, som er et rovdyr — den efterlader snoede ekskrementer med hår og knogler.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [MST, ANTICIMEX, FURESOE],
  },
];

export default articles;
