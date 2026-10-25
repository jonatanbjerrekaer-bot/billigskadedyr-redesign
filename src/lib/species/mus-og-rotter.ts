import type { SpeciesArticle } from "../speciesContent";

// Mus og rotter i Danmark: the legal facts for rats (anmeldelsespligt,
// authorised controllers only, bait only in locked stations) come from the
// MST guidance and municipal pages; mouse facts from the pest-control pages
// listed in `sources`.
const MST = "https://mst.dk/media/rclcc3kv/vejledning-om-forebyggelse-og-bekaempelse-af-rotter-2019.pdf";
const ANTICIMEX = "https://www.anticimex.dk/rotter/metoder-til-at-slippe-af-med-rotter/";
const FURESOE = "https://www.furesoe.dk/borger/bolig/ejerbolig/rotter-og-skadedyr";
const PESTIUM = "https://www.pestium.dk/almindelige-skadedyr-i-danmark/mus/";
const MYREEXPRESSEN = "https://myreexpressen.dk/skadedyr/";
const AZ = "https://azskadedyrsservice.dk/skadedyr/musbekaempelse/";

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
          "Brun rotte har en krop på 18-25 cm, en butt snude og små ører, der ikke når ned over øjnene. Halen måler 15-21 cm og er kortere end kroppen. Vægten ligger typisk på 200-500 g.",
          "Ekskrementerne er sorte, ca. 6 mm tykke og op til 17 mm lange og spidser til i den ene ende. Friske gnavmærker er ca. 4 mm brede, og åbninger til gange er cirkelrunde og ca. 2 cm i diameter — en to-krones størrelse.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Brun rotte lever i kloakker, kældre og jordgangsystemer og kommer op, hvor der er føde. Den har brug for et hul på ca. 2 cm for at komme ind i en bygning.",
          "Den svømmer godt, klatrer godt og kan springe ca. 90 cm lodret. Faldstammeudluftningen, utætte kloakdæksler og sprækker ved soklen er typiske adgangsveje.",
          "Ud over ekskrementer efterlader den en skarp kloak- eller staldlugt, som mange når at bemærke, før de ser selve dyret.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Brun rotte formerer sig hurtigt: 4-7 kuld årligt med 8-12 unger pr. kuld, og ungerne er kønsmodne efter 2-3 måneder. Et lokalt fund kan derfor blive til mange rotter på et enkelt år.",
          "De holder sig tæt på fødekilder. Fjerner du føden, flytter de sig — men de forsvinder ikke af sig selv.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Rotter overfører bl.a. salmonella, leptospirose (Weils sygdom) og E. coli via urin, ekskrementer og bid. De ødelægger ledninger, rør, isolering og fødevarer.",
          "Bid og berøring med ekskrementer i køkkenet er de situationer, du skal undgå. Opbevar mad tætsluttende, og rengør overflader, hvor rotterne har været.",
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
      "Sort rotte er sjælden i Danmark og ses mest ved havne og på lofter. Sådan skelner du den fra brun rotten, og hvorfor et fund alligevel skal anmeldes.",
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
          "Fordi sort rotten holder sig i højden, ligger en stor del af arbejdet i at finde og tætte adgangsvejene ved tag og tagrende — ellers bliver den eller en ny rotte boende.",
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
  {
    name: "Husmus",
    slug: "husmus",
    latin: "Mus musculus",
    description:
      "Husmusen er den mus, de fleste danske hjem får besøg af. Sådan kender du den, hvor små sprækker den kan presses igennem, og hvad der virker mod den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Husmusen er en lille, spids mus med en krop på 7-10 cm. Halen er omtrent lige så lang som kroppen. Ryggen er gråbrun, og bugten er lysere. Vægten ligger på 10-25 g.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvorfor kommer den ind?",
        paragraphs: [
          "Den søger ind efter varme og føde og kan presses igennem en sprække på kun 6-7 mm. Rørgennemføringer, sprækker ved soklen, kældervinduer og utætte døre er nok.",
          "Den er nysgerrig og undersøger gerne nye ting. Det gør den til den nemmeste af gnaverne at fange i fælde — rotter er det modsatte og undgår alt nyt i dagevis.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Husmusen er aktiv hele året, mest om aftenen og natten. Indendørs yngler den ca. 4 gange årligt med 4-8 unger pr. kuld, så et enkelt fund kan blive til mange mus på kort tid.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Mus gnaver i emballage, træ, plastik, isolering og el-ledninger, hvor der opstår risiko for kortslutning. Ekskrementer og urin forurener madvarer i skabe og skuffer.",
          "Museurin kan overføre sygdomme som leptospirose og toxoplasmose. Det er en god grund til at smide gnavede madvarer ud og rengøre hylder, hvor der er set spor.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Tæt sokkel, rørgennemføringer og ventilationsåbninger med metalnet, ståluld eller hård mørtel. Opbevar mad og dyrefoder tætsluttende, og hold udhuse og kældervinduer intakte.",
          "Fjern rodebunker og kompost tæt på huset, hvor musene kan skjule sig, og sørg for, at der ikke ligger foderrester i garagen eller skuret.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Brug musefælder — smækfælder, klapfælder eller levendefælder — med lokkemad som rosiner, nødder eller gryn. Sæt fælderne vinkelret op ad vægge, hvor musene færdes, ikke midt på gulvet.",
          "Brug normalt ikke gift indendørs. Mus dør på steder, du ikke kan nå, og så lugter det, mens liget tiltrækker spyfluer.",
          "Fanger du mus igen og igen, er der en vej ind, du ikke har fundet. Tæt den, før du gør noget andet. Skriv til os, så ser vi på sporene sammen.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Halsbåndmus er større og gulligbrun med en tydelig mørk pelskrave om halsen. Markmus og skovmus lever udenfor og kommer sjældent ind. Spidsmus er ikke en gnaver og ikke et skadedyr — den spiser insekter og orme. Er du i tvivl om, hvad du har med at gøre, så send os et billede — og husk, at et rottefund altid skal meldes til kommunen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [PESTIUM, MYREEXPRESSEN, AZ, FURESOE],
  },
  {
    name: "Halsbåndmus",
    slug: "halsbaandsmus",
    latin: "Apodemus flavicollis",
    description:
      "Halsbåndmusen er større end husmusen og kendes på den mørke pelskrave. Sådan kender du den fra husmusen, og hvad der virker mod den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Halsbåndmusen er større end husmusen og gulligbrun med en tydelig mørk pelskrave om halsen — et bånd, der har givet den navnet. Snuden er spids, og øjnene og ørerne er større end husmusens.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Halsbåndmusen er den anden mus, du typisk får ind i huset i Danmark. Den lever i naturen omkring huse og søger ind, når der er føde, eller når kulden sætter ind.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Som andre mus er den mest aktiv om aftenen og natten og hele året. Den yngler flere gange årligt, så et fund indendørs skal du gøre noget ved med det samme.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Samme skader som husmusen: den gnaver i emballage, træ, plastik, isolering og el-ledninger og forurener madvarer med ekskrementer og urin. Museurin kan overføre leptospirose og toxoplasmose.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Start med fælder med lokkemad som rosiner, nødder eller gryn, og sæt dem op ad væggen, hvor musene løber. Undgå som hovedregel gift indendørs; de døde mus ender på steder, du ikke kan nå, og så lugter det og tiltrækker spyfluer.",
          "Find vejen ind, og tæt den med metalnet, ståluld eller hård mørtel. Opbevar mad og foder tætsluttende. Er du i tvivl om, hvilket dyr du har med at gøre, så send os et billede af sporene.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Husmus er mindre, gråbrun og uden pelskrave. Markmus og skovmus er udenfor-arter, der sjældent kommer ind. Spidsmus er ikke en gnaver og ikke et skadedyr. Rotter er langt større og skal altid anmeldes til kommunen; mus håndterer du selv med fælder og tætning.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [PESTIUM, MYREEXPRESSEN, AZ],
  },
];

export default articles;
