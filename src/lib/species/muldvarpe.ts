import type { SpeciesArticle } from "../speciesContent";

// His pro page for muldvarpe is empty on the live site. His own text is the
// two webshop guides: "Muldvarp eller mosegris?" and "Find en aktiv
// muldvarpegang". Those carry the practical sections and the whole
// Skuddene article. His guide says the shape of a skud is only a clue, so the
// old "round with the hole under the middle" rule is not stated as a test.
const MO = "https://billigskadedyr.dk/muldvarp-eller-mosegris/";
const MA = "https://billigskadedyr.dk/find-aktiv-muldvarpegang/";

const articles: SpeciesArticle[] = [
  {
    name: "Muldvarp",
    slug: "muldvarp",
    latin: "Talpa europaea",
    description:
      "Muldvarpen æder ikke dine planter, men gangene og skuddene ødelægger plænen. Sådan finder du en aktiv gang, før du sætter fælden.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Muldvarpen er et lille pattedyr på 11-15 cm, der lever næsten hele livet under jorden. Pelsen er grå til blåsort og føles som fløjl, og forfødderne er brede som skovle.",
          "Du ser sjældent selve dyret. Et jordskud viser, at muldvarpen har skubbet overskydende jord op. Det fortæller ikke alene, hvor den næste passage bliver.",
        ],
        provenance: ["new", `owner ${MA}`],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Muldvarpen bruger gangene både til at bevæge sig omkring og til at finde føde. Den lever især af regnorme og insektlarver og gnaver ikke i planterødder. Er rødder eller knolde afgnavede, bør du derfor undersøge, om der er andre dyr på spil.",
          "De faste gange ligger typisk 10-20 cm nede. Om foråret graver den også gange lige under overfladen, og det er her, plænen hæver sig i lange striber.",
        ],
        provenance: [`owner ${MA}`, "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "For dig og dit hus er den ufarlig. For plænen og bedene er den et problem: skuddene gør græsset ujævnt, og gangene kan løfte jorden om nye planter.",
          "Mange skud betyder ikke nødvendigvis mange muldvarpe, og gamle jordbunker er ikke dokumentation for fortsat aktivitet.",
        ],
        provenance: ["new", `owner ${MA}`],
      },
      {
        heading: "Sådan finder vi en aktiv gang",
        paragraphs: [
          "Indsatsen starter altid med at finde de gange, der faktisk er i brug. Vi ser efter nyligt opståede skud og sammenligner området fra dag til dag — der er ingen grund til at bruge tid på forladte gange.",
          "Er du i tvivl, om en gang er aktiv, kan du forsigtigt trykke et kort stykke af en hævet gang ned og kontrollere stedet efter cirka 24 timer. Er jorden løftet igen, er gangen i brug. Den slags viden bruger vi til at sætte ind de rigtige steder.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan sætter vi ind",
        paragraphs: [
          "Vi opsætter fælder i de aktive gange og følger op, indtil dyret er fanget. Arbejdet udføres efter gældende regler for bekæmpelse af muldvarpe og mosegrise, og vi holder børn og kæledyr i mente, når vi vælger placeringer.",
          "Andre muldvarpe kan senere overtage et eksisterende gangsystem. Nye skud efter en periode uden aktivitet er derfor anledning til en ny undersøgelse — skriv til os, så kigger vi på det.",
        ],
        provenance: ["new", `owner ${MA}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Begge kan lave muldskud, og gangsystemer kan ligne hinanden. Mosegrisen er planteæder og kan gnave i rødder, løg og andre plantedele. Muldvarpen lever af animalsk føde som regnorme og gnaver ikke rødder som føde.",
        ],
        provenance: [`owner ${MO}`],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Muldvarp"],
  },
  {
    name: "Mosegris",
    slug: "mosegris",
    latin: "Arvicola amphibius",
    description:
      "Mosegrisen, også kaldet vandrotte, gnaver i rødder, løg og andre plantedele. Sådan kender du den fra muldvarpen.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Mosegrisen kaldes også vandrotte eller stor studsmus. Den er ikke en rotte, men en studsmus. Kroppen er 12-20 cm lang, pelsen lang og mørkebrun til næsten sort, og ørerne gemmer sig næsten i pelsen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Mosegrisen er planteæder og kan gnave i rødder, løg og andre plantedele. Den går især efter rodknolde, stauder og rødder fra unge hække, buske og frugttræer.",
          "Den yngler fra april til november og kan få flere kuld på en sæson, så en have kan hurtigt få mange. Den bruger tit muldvarpens gamle gange.",
        ],
        provenance: [`owner+new ${MO}`, "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Ja, for haven. Et ungt træ eller en busk, der hælder og kan trækkes op uden rødder, er et klassisk tegn.",
          "Visne planter er derfor ikke et endeligt bevis. Planter kan også påvirkes indirekte af graveaktivitet. Undersøg, om rødderne faktisk er gnavet, og om tegnene optræder sammen med nye gange og jordskud.",
        ],
        provenance: ["new", `owner ${MO}`],
      },
      {
        heading: "Sådan griber du det an",
        paragraphs: [
          "Se på flere tegn samlet, før du vælger fælde. Særligt planteskader og fund af selve dyret kan hjælpe med at afklare opgaven. Tag billeder af både overfladen og de relevante skader.",
          "Ved mistanke om rotter skal forekomsten anmeldes til kommunen; et åbent hul i haven bør ikke automatisk kaldes en mosegrisgang.",
          "Beskyt nye frugttræer og hække med trådnet om rodklumpen, når du planter. Ved uklare spor er en faglig vurdering mere værd end at købe flere fælder uden at have afklaret dyret.",
        ],
        provenance: [`owner ${MO}`, `owner ${MO}`, `owner+new ${MO}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Muldvarpen laver også skud, men den lever af regnorme og insektlarver og gnaver ikke i planterødder. Har du planter, hvor rødderne faktisk er gnavet, er det næsten altid mosegris.",
        ],
        provenance: [`owner+new ${MA}`],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Mosegris"],
  },
  {
    name: "Skuddene",
    slug: "muldvarpeskud",
    title: "Muldvarpeskud eller mosegris?",
    description:
      "Jordbunker i plænen kan være muldvarp eller mosegris. Skuddene alene afgør det ikke. Sådan undersøger du skud, gange og planteskader samlet.",
    sections: [
      {
        heading: "Skuddene fortæller ikke det hele",
        paragraphs: [
          "Jordskud i plænen fortæller, at et dyr har arbejdet under overfladen. De fortæller ikke alene, om det er en muldvarp eller mosegris. Begge kan lave muldskud, og gangsystemer kan ligne hinanden.",
          "Se derfor på flere tegn samlet, før du vælger fælde. Særligt planteskader og fund af selve dyret kan hjælpe med at afklare opgaven.",
        ],
        provenance: [`owner ${MO}`, `owner ${MO}`],
      },
      {
        heading: "Se efter skade på rødder og planter",
        paragraphs: [
          "Mosegrisen er planteæder og kan gnave i rødder, løg og andre plantedele. Muldvarpen lever af animalsk føde som regnorme og gnaver ikke rødder som føde. Planter kan dog også påvirkes indirekte af graveaktivitet.",
          "Visne planter er derfor ikke et endeligt bevis. Undersøg, om rødderne faktisk er gnavet, og om tegnene optræder sammen med nye gange og jordskud.",
        ],
        provenance: [`owner ${MO}`, `owner ${MO}`],
      },
      {
        heading: "Brug skuddenes form som et spor",
        paragraphs: [
          "Skud og placering kan bidrage til vurderingen, men jordtype, aktivitet og alder påvirker udseendet. Undgå at vælge behandling alene efter, om et skud er højt eller fladt.",
          "Tag billeder af både overfladen og de relevante skader. Ved mistanke om rotter skal forekomsten anmeldes til kommunen; et åbent hul i haven bør ikke automatisk kaldes en mosegrisgang.",
        ],
        provenance: [`owner ${MO}`, `owner ${MO}`],
      },
      {
        heading: "Find en aktiv gang før fælden sættes",
        paragraphs: [
          "Når fundene peger på muldvarp, skal fælden placeres i en relevant, aktiv gang efter modellens vejledning. Et gammelt skud er ikke nødvendigvis et godt fangststed.",
          "Hvis du kan se en hævet gang lige under græsset, kan du forsigtigt trykke et kort stykke ned. Markér stedet, og kontrollér det efter cirka 24 timer. Er jorden løftet igen, er det tegn på, at gangen er blevet benyttet og genåbnet.",
          "Ved uklare spor er en faglig vurdering mere værd end at købe flere fælder uden at have afklaret dyret. Send os gerne billeder af skuddene og planterne.",
        ],
        provenance: [`owner ${MO}`, `owner ${MA}`, `owner+new ${MO}`],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Muldvarp",
      "https://da.wikipedia.org/wiki/Mosegris",
    ],
  },
];

export default articles;
