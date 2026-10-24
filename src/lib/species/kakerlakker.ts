import type { SpeciesArticle } from "../speciesContent";

// His pro page for kakerlakker (billigskadedyrprof.dk/service/kakerlakker/)
// is still lorem-ipsum placeholder, so the owner text here comes from his
// webshop articles and the species cards in serviceContent.ts.
const GUIDE = "owner https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats-2/";
const FIRST = "owner https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats/";
const CARD = "owner serviceContent.ts";

const articles: SpeciesArticle[] = [
  {
    name: "Tysk kakerlak",
    slug: "tysk-kakerlak",
    latin: "Blattella germanica",
    description:
      "Tysk kakerlak er den almindeligste kakerlak indendørs. Sådan kender du den på de to striber, her gemmer den sig, og sådan reagerer du på et fund.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Den almindeligste indendørs. Den voksne tyske kakerlak er omtrent 1–1,6 cm lang, lysebrun til gulbrun og har to mørke længdestriber på halsskjoldet bag hovedet.",
          "De unge dyr kaldes nymfer. De er mindre, mørkere og har endnu ikke de voksnes udviklede vinger.",
        ],
        provenance: [`${CARD} + https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats-2/`, GUIDE],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Kakerlakker udvikler sig gennem æg, nymfer og voksne dyr; de har ikke et puppestadium. Hos tysk kakerlak bærer hunnen normalt ægkapslen frem mod klækningen. Synlige voksne dyr er derfor kun en del af det, der skal indgå i vurderingen.",
          "En kapsel rummer typisk et sted mellem 18 og 50 æg. Den er aktiv om natten og gemmer sig om dagen i smalle sprækker.",
        ],
        provenance: [GUIDE, "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Tyske kakerlakker udnytter varme skjulesteder med adgang til føde og fugt. Den holder af køkken, badeværelse og bag hvidevarer. Kig især ved tilgængelige sokler, rørgennemføringer og områder omkring opvaskemaskine, køleskab og affaldsopbevaring.",
          "I etageejendomme kan den flytte mellem lejlighederne gennem rør, skakter og installationer. I en ejendom med fælles installationer bør relevante naboområder derfor også indgå i vurderingen, og i en udlejningsejendom bør udlejer eller administration orienteres tidligt.",
        ],
        provenance: [`${GUIDE} + serviceContent.ts`, "owner+new https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats-2/"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Ja. Kakerlakker regnes i Norden for levnedsmiddelskadedyr. De færdes i afløb og affald og går bagefter hen over mad og køkkenborde. Hvor de er almindelige i boliger, kan man også udvikle allergi over for dem.",
          "Et fund er ikke et mål for beboernes renlighed. Kakerlakker kan følge med varer, emballage og udstyr. Det er mere nyttigt at undersøge indslæbning og skjulesteder end at lede efter skyld.",
        ],
        provenance: ["new", `${GUIDE} + https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats/`],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Tag et skarpt foto, hvis du kan gøre det uden at sprede dyret. Notér størrelse, tidspunkt og præcis placering. Hvis et eksemplar kan opbevares sikkert i en lukket beholder til identifikation, giver det et bedre grundlag end kun at beskrive noget som en brun bille.",
          "Luk fødevarer, fjern krummer og fedtrester, og udbedr tilgængelige vandspild. Tøm affald, og undgå, at opvask og madrester står fremme natten over.",
          "Egnede insektfælder fra webshoppen kan hjælpe med at registrere, hvor kakerlakkerne bevæger sig. En tilfældig spraybehandling af gulvet fortæller derimod hverken, hvor dyrene opholder sig, eller om der findes aktivitet i naboområder.",
          "Ved bekræftede tyske kakerlakker er en tidlig professionel indsats relevant, især ved gentagne fund eller aktivitet i flere rum. Gelen, der bruges, er forbeholdt professionel skadedyrsbekæmpelse, og behandlingen kræver opfølgning, fordi en kort periode uden observationer ikke alene er dokumentation for, at opgaven er afsluttet.",
        ],
        provenance: [GUIDE, FIRST, "owner+new https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats-2/", GUIDE],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Der findes andre kakerlakarter og insekter, som kan skabe forveksling. Udendørslevende kakerlakker kan komme ind ved et tilfælde uden at have samme betydning som en etableret bestand af tyske kakerlakker. Derfor bør en artsbestemmelse komme før en konklusion om angrebets størrelse.",
          "Unger af orientalsk kakerlak kan ligne, men de er mørkere og mangler de to striber. Sølvfisk og skægkræ bliver også forvekslet med små kakerlakker, men de er slanke, uden vinger og har lange haletråde.",
        ],
        provenance: [GUIDE, "new"],
      },
    ],
    sources: ["https://lex.dk/kakerlakker", "https://en.wikipedia.org/wiki/German_cockroach"],
  },
  {
    name: "Orientalisk kakerlak",
    slug: "orientalsk-kakerlak",
    latin: "Blatta orientalis",
    description:
      "Orientalsk kakerlak er stor, mørk og holder til i kældre, afløb og fugtige rum. Sådan kender du den, og sådan reagerer du på et fund.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Større, mørk og hurtig. Orientalsk kakerlak er omkring 2-3 cm lang og blank mørkebrun til næsten sort.",
          "Hannen har vinger, der dækker en del af bagkroppen. Hunnen har kun små vingestumper og ser vingeløs ud. Ingen af dem kan flyve.",
        ],
        provenance: ["owner+new serviceContent.ts", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Hunnen lægger en mørk ægkapsel på omkring en centimeter, som hun afsætter et beskyttet sted i stedet for at bære den med sig. Hver kapsel rummer typisk 16-18 æg.",
          "Hvor hurtigt æggene klækker, afhænger meget af varmen. Den er aktiv om natten, så du ser den sjældent om dagen.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den holder til i varme, fugtige steder som kældre og teknikskakte, og ellers i kloakker, afløb og rum med rør og varme.",
          "Den ses kun af og til i Danmark, og et fund er derfor et signal om, at der er noget at undersøge.",
        ],
        provenance: ["owner+new serviceContent.ts", "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Ja. Den kommer fra afløb og fugtigt affald og kan bære bakterier med sig på ben og krop over på mad, service og borde. Derfor regnes den, som de andre kakerlakker, for et levnedsmiddelskadedyr.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Ikke alle kakerlaklignende insekter er arter, der etablerer sig indendørs. Tag et tydeligt billede, notér fundstedet, og gem et eksemplar i en lukket beholder, hvis det kan gøres sikkert. En artsbestemmelse er afgørende for, om der er behov for bekæmpelse, og hvordan den skal udføres.",
          "Er det ét enkelt dyr, der er kommet ind udefra, kan du holde øje med det et stykke tid. Egnede monitoreringsfælder kan hjælpe med at lokalisere aktivitet. Ser du flere, eller ser du dem igen, bør bekæmpelsen planlægges fagligt, og ofte er det en kælder, et utæt afløb eller en skakt, der skal tætnes.",
          "Hold kælder og bryggers tørre, ryd op i det, der står på gulvet, og sørg for, at gulvafløb har vand i vandlåsen.",
        ],
        provenance: [FIRST, "owner+new https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats/", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Den forveksles oftest med amerikansk kakerlak, som også er stor, men rødbrun med en lys kant bag hovedet. Den kan også forveksles med store biller, der kommer ind udefra. Biller har hårde dækvinger, der mødes i en lige linje midt ned ad ryggen. Det har kakerlakken ikke. Unger kan minde om tysk kakerlak, men mangler de to striber.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://lex.dk/kakerlakker", "https://en.wikipedia.org/wiki/Oriental_cockroach"],
  },
  {
    name: "Amerikansk kakerlak",
    slug: "amerikansk-kakerlak",
    latin: "Periplaneta americana",
    description:
      "Amerikansk kakerlak er den største kakerlak, du kan møde i Danmark. Sådan kender du den på farven og den lyse kant, og sådan reagerer du på et fund.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Stor og rødlig. En voksen er typisk omkring 4 cm lang og har en gullig kant på skjoldet bag hovedet.",
          "Den voksne har lange vinger og kan glide eller flyve et kort stykke, oftest ned fra et højt sted.",
        ],
        provenance: ["owner+new serviceContent.ts", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Hunnen bærer ægkapslen et par dage og sætter den så fast et beskyttet sted. Der går nogle uger, før ungerne kommer ud. Den trives bedst i varme og fugt og er aktiv om natten.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den ses sjældent i Danmark. Mange kender den fra varme lande. Her i landet dukker den typisk op i varme bygninger, i kældre og ved kloakdæksler og afløb, og nogle gange følger den med varer eller bagage hjem.",
        ],
        provenance: ["owner+new serviceContent.ts"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Ja. Den lever i kloakker og afløb og kan bære bakterier som salmonella med sig på benene. Støv med ekskrementer og hudrester fra kakerlakker kan give allergi og forværre astma hos nogle.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Fordi arten er sjælden her, er det første skridt at få den bestemt. Tag et skarpt foto, hvis du kan gøre det uden at sprede dyret, og notér størrelse, tidspunkt og præcis placering. Hold især øje med genstande, der netop er kommet ind, som kasser, varer eller bagage fra et andet sted.",
          "Er det én, der er fulgt med bagagen hjem, er problemet måske løst, når den er fjernet. Ser du flere, eller kommer de op fra et afløb, bør bekæmpelsen planlægges fagligt, og vejen, de kommer ind ad, skal findes.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats-2/", "owner+new https://billigskadedyr.dk/kakerlakker-tegn-og-foerste-indsats/"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Den forveksles oftest med orientalsk kakerlak, som også er stor. Den orientalske er dog næsten sort og mangler den lyse kant bag hovedet, og hunnen har ingen rigtige vinger. Tysk kakerlak er langt mindre og har to mørke striber bag hovedet.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://lex.dk/kakerlakker", "https://en.wikipedia.org/wiki/American_cockroach"],
  },
];

export default articles;
