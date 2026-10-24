import type { SpeciesArticle } from "../speciesContent";

// His pro page for snegle is empty on the live site. His own text is the two
// webshop guides (køkkenhaven, hegn eller middel), which are about snegle in
// general, not one species, so they carry the practical sections and the
// species facts are ours. Vinbjergsneglens legal status checked against
// BEK 521/2021 § 14, stk. 3, § 15 and bilag 3 (not changed by BEK 1005/2025).
const SN1 = "https://billigskadedyr.dk/snegle-i-koekkenhaven/";
const SN2 = "https://billigskadedyr.dk/sneglehegn-eller-sneglemiddel/";

const articles: SpeciesArticle[] = [
  {
    name: "Dræbersnegl",
    slug: "draebersnegl",
    latin: "Arion vulgaris",
    description:
      "Dræbersneglen, også kaldet spansk eller iberisk skovsnegl: sådan kender du den, og sådan beskytter du bedene målrettet.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Dræbersneglen er en nøgen snegl uden hus. Den hedder officielt spansk skovsnegl, og du vil også se den kaldt iberisk skovsnegl. Den er oftest brunrød eller snavset orange, men farven kan gå fra gullig til næsten sort, og den kan blive op til omkring 15 cm.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den lever kun ét år. De voksne lægger æg i sensommeren og dør, når frosten kommer, og det er æggene og de små snegle, der bærer bestanden over vinteren. Den er tvekønnet, og en snegl lægger typisk omkring 400 æg i sit liv.",
          "Den er mest aktiv om natten og i fugtigt vejr. Om dagen gemmer den sig under brædder, sten, kompost og tæt bunddække, og den følger ofte med jord og planter ind i haven.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "For haven, ja. Den æder levende planter, grøntsager og blomster og kan i fugtige somre blive til rigtig mange. Den kan bære bakterier, så brug handsker, når du samler den.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan beskytter du bedene",
        paragraphs: [
          "Snegleproblemer er lettest at håndtere, når du ved, hvor skaden sker, og hvilke områder du vil beskytte. Start med unge planter, salat og andre udsatte afgrøder frem for at behandle hele haven ens.",
          "Kig under løse genstande, potter og fugtige planterester ved de planter, der skades. Ryd op dér, hvor unødige skjul gør det let at nå afgrøderne. Kontrollér nye potter og plantemateriale, før de placeres i et beskyttet bed. Ellers kan snegle følge med ind bag en barriere.",
          "Et korrekt monteret sneglehegn kan være relevant omkring et højbed eller en mindre køkkenhave. Det skal slutte sammen og holdes frit for blade og andre broer hen over kanten.",
          "Hvis du bruger et sneglemiddel, skal det være godkendt til den konkrete anvendelse og bruges i den angivne mængde. Lav ikke bunker for at gøre behandlingen »stærkere«. Brug heller ikke salt som havebehandling.",
        ],
        provenance: [`owner ${SN1}`, `owner ${SN1}`, `owner ${SN1}`, `owner ${SN1}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Små dræbersnegle om foråret kan ligne agersnegle, men dræbersneglen bliver hurtigt større og mere rødbrun. Vinbjergsneglen har hus og er ikke den, der æder bedene. Den plettede gråsnegl skal du lade være. Den æder dræbersnegle.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Iberisk_skovsnegl",
      "https://en.wikipedia.org/wiki/Arion_vulgaris",
    ],
  },
  {
    name: "Agersnegl",
    slug: "agersnegl",
    latin: "Deroceras",
    description:
      "Agersneglen er den lille grå snegl i salaten og kålen. Sådan kender du den, og sådan beskytter du de udsatte planter.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Agersnegle er små nøgne snegle uden hus, typisk grå, cremefarvede eller lyst brune, ofte med et mørkt, netagtigt mønster. De fleste bliver 3-6 cm lange. Slimen er klar, men bliver mælkehvid, når du irriterer sneglen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den kan nå to generationer på et år, og det er især æggene, der overvintrer. Derfor kan der være snegle i bedene fra det tidlige forår og helt til frosten. Om dagen ligger den skjult i jorden, under blade og i sprækker.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Den går efter friske blade og kimplanter, og i regnfulde somre kan den lave store skader på for eksempel salat og jordbær.",
          "Huller i blade alene er ikke en sikker identifikation, så se efter snegle og slimspor omkring planterne. Undersøg efter fugtigt vejr eller på tidspunkter, hvor sneglene er aktive.",
        ],
        provenance: ["new", `owner ${SN1}`],
      },
      {
        heading: "Sådan beskytter du planterne",
        paragraphs: [
          "Start med unge planter, salat og andre udsatte afgrøder frem for at behandle hele haven ens. Ryd op dér, hvor unødige skjul gør det let at nå afgrøderne. Haven behøver ikke tømmes for alle levesteder; indsatsen kan målrettes dyrkningsområdet.",
          "Til et afgrænset bed er en vedligeholdt barriere værd at overveje. Følg monteringsvejledningen, så hjørner og samlinger er lukkede, og gennemgå også området indenfor for snegle, der allerede er kommet ind.",
          "Tag billeder af skaden, og kontrollér, om der opstår nye gnav. Eksisterende huller forsvinder ikke, så udviklingen i nye blade er mere nyttig end at se på den samme skade igen.",
        ],
        provenance: [`owner ${SN1}`, `owner ${SN2}`, `owner ${SN1}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Små dræbersnegle om foråret kan ligne. Dræbersneglen bliver dog hurtigt større og mere rødbrun eller orange, og den mangler agersneglens netmønster.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Agersnegl",
      "https://en.wikipedia.org/wiki/Deroceras_reticulatum",
    ],
  },
  {
    name: "Vinbjergsnegl",
    slug: "vinbjergsnegl",
    latin: "Helix pomatia",
    description:
      "Vinbjergsneglen er den store snegl med hus. Den er sjældent den, der æder dine bede. Her er, hvordan du kender den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Vinbjergsneglen er Europas største landsnegl med hus. Huset kan blive op til 4,5 cm højt og er lyst, gulbrunt til gråligt. Den er nem at kende fra de nøgne snegle, du ellers møder i haven.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den lever typisk 6-8 år. Parringen sker i maj og juni, og midt i november lukker den åbningen i huset med et kalklåg og går i vinterdvale. Den lever på skrænter og i krat og mere sjældent i haver, og der er ofte mange omkring gamle herregårde og klostre.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Sjældent. Den lever mest af visne planterester, ikke af dine friske salatplanter. Det er de nøgne snegle, især dræbersneglen og agersneglen, der står for skaden i bedene.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad gør du, hvis du har den?",
        paragraphs: [
          "Ser du vinbjergsnegle og samtidig skader i bedene, er det næsten altid en anden snegl, der er på spil. Huller i blade alene er ikke en sikker identifikation, så se efter snegle og slimspor omkring planterne.",
          "Ved uklare fund bør arten afklares, før du bekæmper, så harmløse eller andre relevante arter ikke behandles på et forkert grundlag.",
        ],
        provenance: [`owner+new ${SN1}`, `owner ${SN1}`],
      },
      {
        heading: "Er den fredet?",
        paragraphs: [
          "Den er delvist fredet. Det er forbudt at indsamle vinbjergsnegle i erhvervsmæssigt øjemed, og snegle samlet i naturen må ikke handles. Den er ikke fredet mod at blive slået ihjel, men den er sjældent den, der er problemet i haven.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Vinbjergsnegl",
      "https://www.retsinformation.dk/eli/lta/2021/521",
    ],
  },
];

export default articles;
