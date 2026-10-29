import type { SpeciesArticle } from "../speciesContent";

// Built from his gåsebiller page first. His stankelben page is empty on the
// live site, but the gåsebiller page has a whole section on telling the two
// larvae apart, and that carries the stankelbenslarve article. He writes
// nothing about oldenborre, so that article is mostly ours.
// Dropped from the last round: "Der er ingen godkendte kemiske midler mod
// gåsebiller i Danmark". It contradicts his page, which says he treats with
// approved products, and no source on the list backs it.
const G = "https://billigskadedyrprof.dk/service/gaasebiller/";

const articles: SpeciesArticle[] = [
  {
    name: "Gåsebille",
    slug: "gaasebille",
    latin: "Phyllopertha horticola",
    description:
      "Gåsebillen er en lille brunlig bille. Det er larven under plænen, der æder græssets rødder, så græsset bliver gult og kan løftes som et tæppe.",
    sections: [
      {
        heading: "Hvad er gåsebiller?",
        paragraphs: [
          "Gåsebiller er små brunlige biller, som typisk ses flyvende i de varme sommermåneder. De voksne biller gør normalt kun begrænset skade på planter og træer, men de lægger æg i græsplæner og andre grønne områder.",
          "Billen er 7-12 mm lang, med mørkt metalgrønt hoved og bryst og brune dækvinger.",
          "Larven er typisk cremehvid med et mørkebrunt hoved. Kroppen er krummet som et C, og den har tre par små ben foran på kroppen. Afhængigt af alder kan larven blive flere centimeter lang.",
        ],
        provenance: [`owner ${G}`, "new", `owner ${G}`],
      },
      {
        heading: "Året rundt",
        paragraphs: [
          "De voksne gåsebiller ses typisk i juni og juli, hvor de parrer sig og lægger æg i jorden. I august og september klækker æggene, og de små larver begynder straks at æde græssets rødder.",
          "Larverne er mest aktive fra sensommeren og ind i efteråret, hvor de æder intensivt af græssets rødder. Om vinteren søger de længere ned i jorden, inden de igen bliver aktive om foråret. I maj forpupper de sig i jorden, og så starter det forfra.",
        ],
        provenance: [`owner ${G}`, `owner ${G}`],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Gåsebiller findes naturligt i store dele af Danmark. Græsplæner med gode vækstforhold er særligt attraktive, og derfor ses angreb ofte i parcelhushaver, sommerhusgrunde, golfbaner, fodboldbaner, parker, grønne fællesarealer og på kirkegårde.",
        ],
        provenance: [`owner ${G}`],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Nej. Gåsebiller er ikke farlige for mennesker og stikker eller bider ikke. Det er først og fremmest deres larver, der skaber problemer ved at leve under græsplænen og æde græssets rødder.",
          "Når rødderne bliver beskadiget, kan græsset ikke længere optage vand og næringsstoffer optimalt. Resultatet er ofte en græsplæne, der ser tør, gullig eller vissen ud, selvom den bliver vandet. I takt med at flere rødder bliver ødelagt, løsner græsset sig fra jorden og kan i mange tilfælde løftes næsten som et tæppe.",
          "Fuglene er som regel ikke selve problemet – de er et tegn på problemet. Stære, råger, alliker og skader er meget glade for gåsebillelarver og kan hurtigt opdage dem under græsset.",
        ],
        provenance: [`owner ${G}`, `owner ${G}`, `owner ${G}`],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Du kan forsigtigt løfte et mindre stykke græstørv med en spade. Hvis du finder flere hvidlige, C-formede larver med brunt hoved og små ben, er der stor sandsynlighed for, at du har gåsebillelarver.",
          "Gåsebillelarver er mest sårbare, mens de stadig er små og opholder sig relativt tæt på jordoverfladen. Den bedste periode er normalt fra august til september.",
          "Vi behandler det angrebne areal med et professionelt middel, der når ned i den øverste del af jorden og rodzonen, hvor larverne lever. Behandlingen lægges, mens larverne stadig er små og tæt på overfladen — normalt fra august til september — og én behandling på det rette tidspunkt er nok i langt de fleste tilfælde.",
          "Hvis gåsebillelarverne bekæmpes i tide, kan græssets rodsystem gradvist genopbygges. Ved mindre angreb vil plænen ofte komme sig i løbet af den følgende vækstsæson. Ved større angreb kan det være nødvendigt at efterså.",
        ],
        provenance: [`owner ${G}`, `owner ${G}`, "new", `owner ${G}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Gule pletter kan skyldes mange forskellige forhold, blandt andet tørke, svampesygdomme, stankelbenslarver, dårlig jordkvalitet eller mangel på næringsstoffer. Finder du lange, gråbrune larver uden ben, er det typisk stankelbenslarver.",
          "Oldenborrens larve ligner gåsebillens, men den er meget større.",
        ],
        provenance: [`owner ${G}`, "new"],
      },
    ],
    sources: [
      "https://lex.dk/gåsebille",
      "https://videnskab.dk/naturvidenskab/saadan-bekaemper-du-gaasebiller-i-din-graesplaene/",
      "https://en.wikipedia.org/wiki/Phyllopertha_horticola",
    ],
  },
  {
    name: "Oldenborre",
    slug: "oldenborre",
    latin: "Melolontha melolontha",
    description:
      "Oldenborren er en stor, brun bille, hvis larve lever flere år i jorden og æder rødder. Sådan kender du den fra gåsebillen.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Den almindelige oldenborre er en stor bille på 25-30 mm. Dækvingerne er rødbrune, og bagkroppen har hvide trekanter i siden.",
          "Larven ligger krummet som et C med brunt hoved, ligesom gåsebillens, men den bliver meget større, op til omkring 4 cm.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "De voksne biller flyver i maj og æder blade på træer. Larverne lever i jorden i tre til fire år og æder rødder. Derfor kommer skaden igen over flere sæsoner.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Billen er ufarlig for mennesker. Larven æder rødder af græs, grøntsager og unge planter, og i haven viser det sig som planter, der visner, og plæne, der slipper.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan finder du ud af det",
        paragraphs: [
          "Den sikreste måde er at løfte et stykke græstørv og undersøge jorden. Store, hvide larver med brunt hoved, hvor planterne visner, peger på oldenborre. Larver, du graver op, kan du samle og fjerne.",
          "Er du i tvivl, om det er oldenborre, gåsebille eller stankelbenslarve, hjælper vi gerne med at identificere skadedyret, så behandlingen passer til dyret.",
        ],
        provenance: [
          `owner+new ${G}`,
          `owner+new ${G}`,
        ],
      },
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Melolontha_melolontha",
      "https://da.wikipedia.org/wiki/Oldenborre",
    ],
  },
  {
    name: "Stankelbenslarve",
    slug: "stankelbenslarve",
    latin: "Tipulidae",
    description:
      "Stankelbenslarven, også kaldet læderjakke, er gråbrun og uden ben. Den æder græssets rødder og nye skud og forveksles tit med gåsebiller.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Stankelbenslarver – også kendt som læderjakker – er gråbrune, benløse larver med en læderagtig overflade.",
          "Den voksne stankelben ligner en kæmpemyg med lange ben og smalle vinger. Den stikker ikke og bider ikke.",
        ],
        provenance: [`owner ${G}`, "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Om sommeren lægger hunnerne æg i fugtig jord, og larverne lever i jorden. I modsætning til gåsebillelarver lever de ikke kun af rødder, men også af græssets nederste stængler og nye skud.",
        ],
        provenance: [`owner+new ${G}`],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "For mennesker er den ufarlig. Et angreb viser sig ofte som ujævne, visne områder, hvor græsset let kan trækkes op. Også her vil fugle ofte hakke i plænen for at finde larverne, hvilket kan gøre skaderne endnu mere omfattende.",
        ],
        provenance: [`owner+new ${G}`],
      },
      {
        heading: "Gåsebillelarve eller stankelbenslarve?",
        paragraphs: [
          "Mange haveejere oplever gule pletter og skader i græsplænen, men det er ikke altid let at afgøre, om problemet skyldes gåsebillelarver eller stankelbenslarver. Den sikreste måde er at løfte et stykke græstørv og undersøge jorden.",
          "Hvis du finder hvidlige, krumme larver med ben, er der stor sandsynlighed for, at der er tale om gåsebillelarver. Finder du derimod lange, gråbrune larver uden ben, er det typisk stankelbenslarver.",
          "Stankelben lægger æg i fugtig jord, så en plæne, der dræner godt og ikke vandes mere end nødvendigt, er mindre oplagt for dem. Er du i tvivl, hjælper vi gerne med at identificere skadedyret og anbefale den mest effektive behandling.",
        ],
        provenance: [`owner ${G}`, `owner ${G}`, `owner+new ${G}`],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Stankelben",
      "https://en.wikipedia.org/wiki/Crane_fly",
      "https://videnskab.dk/naturvidenskab/saadan-bekaemper-du-gaasebiller-i-din-graesplaene/",
    ],
  },
];

export default articles;
