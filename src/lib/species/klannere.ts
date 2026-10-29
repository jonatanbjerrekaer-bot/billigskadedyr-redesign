import type { SpeciesArticle } from "../speciesContent";

// He has written no klanner page of his own (his pro page is empty boilerplate),
// so these stay mostly new; only the textile-handling lines are his, from
// https://billigskadedyr.dk/moel-i-toej/

// "Larven" is a life stage shared by the klanner species, not a species, so
// it gets a heading of its own and covers the larvae of both.
const articles: SpeciesArticle[] = [
  {
    name: "Pelsklanner",
    slug: "pelsklanner",
    latin: "Attagenus pellio",
    description:
      "Pelsklanneren er en lille sort bille med to hvide pletter. Larven gnaver i uld, pels og silke. Sådan kender du den, og sådan får du den ud af huset.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Den voksne pelsklanner er en oval bille på omkring en halv centimeter. Den er ensfarvet sort bortset fra to hvide pletter midt på dækvingerne.",
          "Larven bliver op til 1 cm lang. Den er brun og lodden og har en karakteristisk penselformet hårdusk i bagenden.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Ude i naturen lever pelsklanneren overalt. Om sommeren sidder de voksne biller ofte på blomster, hvor de æder pollen og nektar.",
          "Hunnen lægger 50-100 æg i muse- eller fuglereder, og larverne lever af fjer, hår og andet affald i reden. Undervejs skifter larven hud flere gange, før den forpupper sig og bliver til bille. De tomme larvehuder er tit det første, du finder.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Har du fuglereder under tagstenene eller en muserede på loftet, kan både biller og larver vandre derfra og ind i huset. Billerne flyver også godt og kommer ind ad åbne vinduer og døre.",
          "Inde lægger hunnerne æg, hvor der er føde til larverne. Det er i gulvrevner, langs fodpaneler, i bunden af klædeskabe og andre steder, hvor uldfnug og støv samler sig.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "For mennesker er den ufarlig. Larverne kan gøre skade på uldne tekstiler, natursilke, skind, pels, udstoppede dyr og insektsamlinger.",
          "Finder du en enkelt bille i vindueskarmen, er det som regel uden betydning. Ser du mange, eller finder du huller i tekstiler, er det tid til at gøre noget.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Start med en grundig støvsugning af skabe, skuffer, langs paneler og i revner ved gulv og loft. Det fjerner både larver og deres føde.",
          "Læg angrebne tekstiler i lukkede poser, før du flytter dem gennem boligen. Vælg vask eller rens efter tekstilets vaskeanvisning, og fortæl renseriet om mistanken.",
          "Kommer dyrene fra fuglereder på huset, skal rederne fjernes, når fuglene er færdige med at yngle. Fjern ikke en aktiv rede med æg eller unger.",
          "Kommer billerne igen trods rengøringen, eller ved du ikke, hvor de kommer fra, sidder kilden et sted, du ikke kan nå. Så skriv til os, så finder vi den og behandler de steder, larverne sidder.",
        ],
        provenance: ["new", "owner https://billigskadedyr.dk/moel-i-toej/", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Brun pelsklanner ligner meget som larve og er mere almindelig indendørs. Den voksne er brun med mørkt eller sort hoved. Museumsbillen og tæppebillen er mindre, rundere og spættede.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://dcapub.au.dk/djfpdf/pelskl2007.pdf",
      "https://www.bolius.dk/er-der-huller-i-taepper-og-toej-saadan-finder-du-ud-af-om-det-er-taeppebiller-99344",
      "https://en.wikipedia.org/wiki/Attagenus_pellio",
    ],
  },
  {
    name: "Museumsbille",
    slug: "museumsbille",
    latin: "Anthrenus museorum",
    description:
      "Museumsbillen er en lille, rund, spættet bille, du tit finder i vindueskarmen om foråret. Larven lever af døde insekter, hår og uld. Sådan stopper du den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Museumsbillen er kun 2-4 mm lang, oval og sort eller sortbrun. Den er dækket af små hvide og okkergule skæl, der danner uregelmæssige tværbånd. Skællene slides let af, så ældre biller ser næsten ensfarvet sorte ud.",
          "Larven er 4-5 mm, gulbrun og håret, bredest bag midten. Bagtil har den en dusk af stive hår, som den bruger til forsvar.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "De voksne biller lever af nektar og pollen og ses ude på skærmplanter om sommeren. Om foråret flyver de mod lyset og ender i vindueskarmen. Det er tit der, du ser dem.",
          "Hunnen søger mørke steder, hvor larverne kan finde føde, og vender ofte tilbage til huse, hvor der er noget at leve af. Fra æg til bille tager det som regel et år, men det kan gå hurtigere eller langsommere afhængigt af føde og temperatur. Indendørs er larverne aktive hele vinteren.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Larven lever mest af døde, tørre insekter og edderkopper. Den æder også fjer, pels og uld og er almindelig i fuglereder. Et angreb følger tit efter mange døde fluer på loftet, en rede i ventilationen, et gammelt hvepsebo eller et dødt dyr i en væg.",
          "Larverne kan vandre ind i skuffer, skabe og madpakker uden nødvendigvis at æde maden.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Museumsbillen bider ikke mennesker. Den har fået navnet, fordi den tidligere var et alvorligt skadedyr på udstoppede dyr og samlinger i museer.",
          "I hjemmet kan larverne gnave i uld og silke, men det er sjældent. Hullerne sidder mere spredt end møllets, og tomme larvehuder i tøjet er et sikkert tegn.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Det bedste du kan gøre er at fjerne føden. Støvsug døde insekter væk i vindueskarme, på loftet og i lamper, og find kilden, hvis der er en rede eller et dødt dyr.",
          "Angrebet tøj kan du ryste ude og vaske. Varme virker godt: tøjet skal være gennemvarmt til omkring 60 grader, for eksempel i en tørretumbler. Sarte eller værdifulde ting bør vurderes, før du bruger varme eller kulde.",
          "En enkelt bille i vindueskarmen er ikke et problem. Bliver du ved med at finde larver eller biller, og kan du ikke finde kilden, så få en fagmand til at kigge på det.",
        ],
        provenance: ["new", "owner+new https://billigskadedyr.dk/moel-i-toej/", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Tæppebillen ligner meget og er også lille og spættet. Rådene er de samme. Pelsklanneren er større og sort med to tydelige hvide pletter.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.fhi.no/nettpub/skadedyrveilederen/biller/museumsbille/",
      "https://en.wikipedia.org/wiki/Anthrenus_museorum",
    ],
  },
  {
    name: "Larven",
    slug: "klannerlarve",
    title: "Klannerlarven",
    description:
      "Det er klannerens larve, der laver skaden. Den er lodden, sky for lys og lever i støv, hår og uld. Sådan kender du den, og sådan slipper du af med den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Huller alene afgør ikke arten. Larver af visse biller kan også skade tekstiler, og finder du hårede larver eller larvehuder, er det tit klannere og ikke klædemøl. Klannerlarven er det stadie, du oftest finder, og det er den, der gnaver. Hos de almindelige arter er den brun til gulbrun, lodden og har en dusk af hår i bagenden.",
          "Pelsklannerens larve bliver op til 1 cm og har en penselformet hårdusk bagtil. Tæppebillens og museumsbillens larver er mindre, omkring 5 mm, og har små dusker af stive hår, som de rejser, når de bliver forstyrret.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/moel-i-toej/", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Larven skifter hud flere gange, før den forpupper sig og bliver til bille. De tomme hudskind bliver liggende og er tit det, du ser først.",
          "Udviklingen går i stå, når temperaturen kommer under 14 grader. I en varm stue kan det tage et år eller mere fra larve til bille. Larven klarer sig længe på det lidt, der ligger og flyder.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Larven skyr lyset. Den lever i støv, hår og fnug under møbler, bag fodlister, i gulvrevner og i bunden af skabe. Den finder også føde i fuglereder, musereder, gamle hvepsebo og døde insekter på loftet.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "For mennesker er den ufarlig. Men den laver små, runde huller i uld, natursilke og andre naturfibre, og fint uld som kashmir er en favorit. Hullerne sidder spredt, ikke samlet ét sted som hos møl.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Støvsug grundigt i skabe, skuffer, under hynder og langs paneler. Det fjerner larverne og deres føde på samme tid.",
          "Vask eller frys de angrebne tekstiler. I fryseren skal de have 2-3 døgn ved -18 grader, og uld skal ligge spredt ud, ikke foldet, for larver inde i midten kan overleve. Rensning virker også.",
          "Find kilden. Er det en fuglerede under taget, så vent til fuglene er færdige med at yngle, før du fjerner den.",
          "Er problemet lille, kan grundig rengøring og rensning ofte være nok til sprækker og lister. Kommer larverne igen, eller er de i flere rum, sidder kilden et sted, du ikke har fundet — så skriv til os, så finder vi ud af, hvor de kommer fra.",
        ],
        provenance: ["new", "new", "new", "new"],
      },
    ],
    sources: [
      "https://dcapub.au.dk/djfpdf/pelskl2007.pdf",
      "https://www.bolius.dk/er-der-huller-i-taepper-og-toej-saadan-finder-du-ud-af-om-det-er-taeppebiller-99344",
      "https://www.fhi.no/nettpub/skadedyrveilederen/biller/museumsbille/",
    ],
  },
  {
    name: "Tæppebiller",
    slug: "taeppebiller",
    latin: "Anthrenus spp.",
    description:
      "Tæppebiller er små, runde, brogede biller, hvis larver æder uld, tæpper og pels. Voksne biller flyver ind ad vinduet om foråret. Sådan stopper du dem.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Tæppebillerne er 2-4 mm lange, næsten runde og ofte brogede i hvidt, brunt og gult. Larverne er brune, behårede og stribede. Det er larverne, der gør skaden: De æder uld, pels, fjer, tæpper og møbelstof — og også døde insekter og museådsler.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sammenhængen med museumsbillen",
        paragraphs: [
          "Museumsbillen er også en tæppebille, så rådene på museumsbille-siden gælder her. Læs museumsbille-artiklen, hvis du vil vide mere om den art, der tit sidder i vindueskarmen om foråret.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor de kommer ind",
        paragraphs: [
          "De voksne biller flyver ind gennem åbne vinduer om foråret og sommeren og lægger æg i uforstyrrede tekstiler. Larveudviklingen tager ofte ca. et år, så skaden kan være undervejs længe, før du opdager den.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er de skadelige?",
        paragraphs: [
          "Tæppebillen bider ikke mennesker, og der er ingen sundhedsrisiko. Til gengæld kan larverne lave store skader på uldtæpper, tøj, pels og fjer.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med dem",
        paragraphs: [
          "Støvsug grundigt under møbler, langs fodpaneler og i alle hjørner. Vask eller rens tekstilerne, og kassér det, der er kraftigt angrebet. Fjern kilder som døde mus, gamle fuglereder og døde insekter, som larverne også lever af.",
          "Kommer billerne igen trods rengøringen, sidder kilden et sted, du ikke har fundet — så skriv til os, så finder vi den og behandler de steder, larverne sidder.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Museumsbillen er mindre og næsten ensfarvet sort med lyse tværbånd — og er altså selv en tæppebille. Pelsklanneren er større, sort med to hvide pletter.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://www.anticimex.dk/taeppebiller/"],
  },
];

export default articles;
