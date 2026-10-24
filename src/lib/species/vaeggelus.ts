import type { SpeciesArticle } from "../speciesContent";

// Provenance for the owner's review. Never rendered.
const PRO = "owner https://billigskadedyrprof.dk/service/vaeggelus/";
const TEGN = "owner https://billigskadedyr.dk/vaeggelus-tegn-og-handling/";
const BAG = "owner https://billigskadedyr.dk/vaeggelus-bagage-brugte-moebler/";
const CARD = "owner serviceContent.ts";

const articles: SpeciesArticle[] = [
  {
    name: "Almindelig væggelus",
    slug: "almindelig-vaeggelus",
    latin: "Cimex lectularius",
    description:
      "Væggelus er små, flade insekter, der lever af blod og kommer frem om natten. Sådan kender du tegnene, og sådan bliver du af med dem.",
    sections: [
      {
        heading: "Hvad er væggelus?",
        paragraphs: [
          "Væggelus er små, flade og vingeløse insekter, der lever af blod fra mennesker. De er primært aktive om natten, hvor de forlader deres skjulesteder for at finde føde, mens mennesker sover.",
          "En voksen væggelus er cirka 4-6 mm lang og har en brunlig farve. Efter et blodmåltid bliver kroppen mørkere og mere opsvulmet. De kan ikke flyve eller hoppe.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Livscyklus",
        paragraphs: [
          "En væggelus gennemgår tre stadier: æg, nymfe og voksen. Hunnen lægger æg i små skjulesteder tæt på mennesker. Efter få dage klækker æggene, og nymferne begynder hurtigt at søge efter deres første blodmåltid. Inden de bliver voksne, gennemgår de flere hudskifter, hvor de skal have blod mellem hvert udviklingstrin.",
          "En enkelt hun kan lægge flere hundrede æg i løbet af sin levetid. Ved normale indendørstemperaturer kan væggelus udvikle sig fra æg til voksen på få uger, og voksne væggelus kan overleve i flere måneder uden at få et blodmåltid. Derfor forsvinder et angreb ikke nødvendigvis, fordi en bolig står tom i en periode.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Hvordan får man væggelus?",
        paragraphs: [
          "En af de største misforståelser er, at væggelus skyldes dårlig rengøring. Det er ikke tilfældet. Væggelus søger mennesker, ikke snavs.",
          "De kommer typisk ind via rejser og hoteller, ferielejligheder, brugte møbler, kufferter og tasker, offentlig transport, flyttekasser, gæster og nabolejligheder i etagebyggeri. Netop fordi væggelus let kan transporteres mellem boliger, kan alle blive ramt.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Hvor gemmer de sig?",
        paragraphs: [
          "Væggelus er eksperter i at gemme sig. De opholder sig sjældent direkte på madrassen, men skjuler sig tæt på mennesker, så de hurtigt kan finde føde om natten: i madrassømme, sengerammer, lamelbunde, natborde, sprækker i gulve, bag paneler og billeder, i stikkontakter, sofaer, polstrede møbler, gardiner og revner i vægge.",
          "Ved større angreb kan væggelus sprede sig til flere rum og i nogle tilfælde til nabolejligheder.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Tegn på væggelus",
        paragraphs: [
          "Mange oplever små røde og kløende stikmærker, ofte på arme, ben, nakke eller ryg. Bidene sidder ofte på række eller i små grupper, men reaktionen varierer meget fra person til person. Kløe og mærker på huden kan dog have andre årsager, så se efter selve insekterne og spor tæt på sovepladsen.",
          "Væggelus efterlader små mørke ekskrementer omkring deres skjulesteder, og når de vokser, skifter de hud flere gange. Ser du sorte pletter, tomme hudskaller eller små blodpletter på lagen eller pude, så tag skarpe billeder, og gem eventuelt et insekt i en lukket beholder til identifikation.",
        ],
        provenance: [PRO + " + " + TEGN.replace("owner ", ""), PRO + " + " + TEGN.replace("owner ", "")],
      },
      {
        heading: "Er de skadelige?",
        paragraphs: [
          "Selvom væggelus ikke er kendt for at overføre sygdomme til mennesker, kan de skabe betydeligt ubehag. Mange oplever kløende bid, søvnproblemer, stress og usikkerhed, når de opdager et angreb.",
        ],
        provenance: [PRO],
      },
      {
        heading: "Sådan kommer du af med dem",
        paragraphs: [
          "Væggelus er blandt de mest vanskelige skadedyr at bekæmpe, fordi de skjuler sig i selv de mindste sprækker og kan overleve i lang tid uden føde. Her er en professionel indsats ofte den hurtigste og mest effektive løsning. Vi gennemgår de rum, hvor der er mistanke om væggelus, og vælger varmebehandling, kemisk behandling eller en kombination, alt efter hvad der giver størst sandsynlighed for en holdbar bekæmpelse.",
          "Undgå at flytte seng, tekstiler og andre genstande rundt mellem rum, mens årsagen er uafklaret. Improviserede behandlinger med varmeblæsere, åben ild eller tilfældige kemikalier er ikke en kontrolleret metode.",
          "Inden behandlingen vejleder vi dig om, hvordan boligen bedst forberedes. Det kan blandt andet være vask af sengetøj ved minimum 60 °C, tørring i tørretumbler ved høj temperatur og støvsugning af de relevante områder. Madrassen skal ikke nødvendigvis smides ud. I mange tilfælde kan den behandles som en del af den samlede bekæmpelse.",
        ],
        provenance: [PRO, TEGN, PRO],
      },
      {
        heading: "Sådan undgår du at tage dem med hjem",
        paragraphs: [
          "Når du rejser, så undersøg hotelværelset ved ankomst, og hold kufferten væk fra sengen. Vask alt tøj ved minimum 60 °C efter hjemkomst, hvis du har mistanke om væggelus.",
          "Køber du brugte møbler, så se i sprækker, samlinger og polstring, især på senge og møbler fra soveområder. Undlad at tage et mistænkt møbel ind i boligen, mens fundene stadig er uafklarede.",
        ],
        provenance: [PRO, BAG],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Vingetæge, der ligner almindelig væggelus og ses især, hvor der er flagermus på loftet.",
        ],
        provenance: [CARD],
      },
    ],
    sources: ["https://en.wikipedia.org/wiki/Bed_bug", "https://da.wikipedia.org/wiki/Væggelus"],
  },
  {
    name: "Vingetæge",
    slug: "vingetaege",
    latin: "Cimex pipistrelli",
    description:
      "Vingetægen ligner almindelig væggelus og ses især, hvor der er flagermus på loftet. Sådan hænger det sammen, og sådan bliver du af med den.",
    sections: [
      {
        heading: "Hvad er en vingetæge?",
        paragraphs: [
          "Ligner almindelig væggelus og ses især, hvor der er flagermus på loftet. Samme adfærd og samme behov for behandling.",
          "Vingetægen lever af blod fra flagermus. Den ligner væggelusen så meget, at man skal bruge mikroskop for at skelne dem.",
        ],
        provenance: [CARD, "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den lever i flagermusenes kolonier på lofter, i skorstene og bag beklædning. Så længe flagermusene er der, bliver tægerne for det meste hos dem. Forlader flagermusene stedet, begynder tægerne at gå på opdagelse i resten af huset efter noget andet at leve af.",
          "Inde i boligen dukker den især op i soveværelser på øverste etage, og den sætter sig de samme steder som væggelus: i madrassen og sengerammen. Den bider mennesker, hvis den får chancen, og bidene ligner væggelusbid.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Det vigtigste er at finde ud af, om der er flagermus i huset. Alle danske flagermus er fredede, også når de bor på dit loft, og du må ikke bare lukke hullet, de kommer ind ad.",
          "Tægerne inde i boligen behandles som ved væggelus, og vi rådgiver om, hvad der skal ske med adgangen til loftet, og hvornår det lovligt kan gøres. Indtil da gælder de samme råd som ved væggelus: vask sengetøjet ved minimum 60 °C, og undgå at flytte seng og tekstiler rundt mellem rum.",
        ],
        provenance: ["new", "owner+new https://billigskadedyrprof.dk/service/vaeggelus/"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Almindelig væggelus. Har du tæger i sengen, men ingen har været ude at rejse eller købt brugte møbler, og er der flagermus i nærheden, er det værd at tænke på vingetægen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Bat_bug",
      "https://en.wikipedia.org/wiki/Bed_bug",
      "https://byggeri-arkitektur.dk/Flagermus--fredning-og-inspektion-foer-nedrivning",
    ],
  },
];

export default articles;
