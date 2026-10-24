import type { SpeciesArticle } from "../speciesContent";

const PRO = "owner https://billigskadedyrprof.dk/service/fluer/";
const HOUSE = "owner https://billigskadedyr.dk/fluer-i-huset-find-kilden/";
const SMALL = "owner https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/";
const BANANA = "owner https://billigskadedyr.dk/bananfluer-i-koekkenet/";
const CARD = "owner serviceContent.ts";

const articles: SpeciesArticle[] = [
  {
    name: "Husflue",
    slug: "husflue",
    latin: "Musca domestica",
    description:
      "Husfluen, eller stuefluen, er den mest almindelige flue i danske hjem. Sådan kender du den, hvor den yngler, og hvordan du finder kilden.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Husfluen, som mange kalder stuefluen, er den mest almindelige flue i danske hjem. Den ses ofte omkring vinduer, døre, køkkener og opholdsrum, hvor den søger føde og varme.",
          "Den er 6-7 mm lang, grå til sort og har røde øjne. Ser du godt efter, har den fire mørke striber på langs over ryggen.",
        ],
        provenance: ["owner+new https://billigskadedyrprof.dk/service/fluer/", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "En almindelig stueflue lever typisk mellem to og fire uger. I løbet af denne periode kan en hunflue lægge flere hundrede æg, hvilket betyder, at bestanden kan vokse meget hurtigt under de rette forhold.",
          "Fluer lægger æg på steder, hvor larverne har adgang til føde. Typiske ynglesteder er affaldscontainere, kompost, gylle, husdyrgødning, døde dyr, fugtigt organisk materiale, madaffald og kloakområder.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Fluer tiltrækkes især af varme, fugt, madrester, affald og organisk materiale, og de ses derfor ofte omkring køkkener, affaldsbeholdere, stalde, kompost og andre områder med gode levevilkår.",
          "Fluer er mest aktive fra forår til sensommer. Særligt i juni, juli og august kan bestanden vokse meget hurtigt, hvis der findes gode ynglesteder i nærheden. Milde vintre og opvarmede bygninger kan desuden betyde, at enkelte fluearter er aktive året rundt.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Mange betragter fluer som en irritation, men de kan også udgøre et hygiejneproblem. Fluer bevæger sig ofte mellem affald, organisk materiale og fødevarer. Undervejs kan de bringe bakterier og andre mikroorganismer med sig, hvilket gør dem uønskede i både private hjem og virksomheder, der håndterer fødevarer.",
          "Derfor bør fødevarer altid opbevares tildækket, og større flueproblemer bør bekæmpes hurtigt, især i erhverv, hvor der håndteres mad.",
        ],
        provenance: [PRO, CARD],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Se efter et mønster. Hvis fluerne især kommer ind, når døren står åben, er et velfungerende insektnet og bedre lukning af døren oplagte tiltag. Kommer der fluer, selv når der er lukket, skal du undersøge huset mere grundigt. Kig ved affald, glemte madvarer, dyrefoder og utilgængelige kroge.",
          "Luk affaldet, fjern spild, og rengør beholderen, ikke kun gulvet omkring den. Udskiftning af posen fjerner ikke det materiale, som ligger tilbage i spanden.",
          "Har du kun enkelte fluer, er en professionel behandling ikke altid nødvendig. En god fluefælde eller en elektrisk insektfanger fra webshoppen kan ofte være en både effektiv og økonomisk løsning.",
          "Har du derimod mange fluer, eller vender problemet tilbage igen og igen, skyldes det ofte en aktiv yngleplads. Så behandler vi de steder, hvor fluerne naturligt sætter sig mange gange i løbet af dagen, som vinduer, karme og lyse, solopvarmede flader, og rådgiver om, hvordan ynglestedet kan fjernes.",
        ],
        provenance: [HOUSE, HOUSE, PRO, PRO],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Spyfluer er større end almindelige stuefluer og kendes ofte på deres metalliske blå eller grønne farve. De tiltrækkes af døde dyr, affald og andet organisk materiale og kan derfor være tegn på et underliggende problem.",
          "Klyngefluer søger ofte ind i bygninger om efteråret for at overvintre. Mange oplever dem samlet på loftet eller omkring vinduer, når temperaturen igen stiger i foråret.",
          "Er fluerne meget små, er det snarere en bananflue ved frugten eller en kloakflue ved afløbet, og så skal du lede et andet sted.",
        ],
        provenance: [PRO, PRO, "owner+new https://billigskadedyr.dk/fluer-i-huset-find-kilden/"],
      },
    ],
    sources: ["https://en.wikipedia.org/wiki/Housefly"],
  },
  {
    name: "Kloakflue",
    slug: "kloakflue",
    latin: "Psychodidae",
    description:
      "Kloakfluer er sommerfuglemyg fra afløbet. Sådan kender du dem på de behårede vinger, og sådan slipper du af med dem ved at rense afløbet.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Det, der i daglig tale kaldes kloakfluer, er sommerfuglemyg, som også omtales som afløbsfluer. Lille og mørk med dunede vinger, og den har et mere møllignende udseende med tydeligt behårede vinger.",
          "De kan sidde stille på vægge i køkken og badeværelse, og de flyver kort og klodset, når du kommer forbi.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/ + serviceContent.ts", "owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Larverne kan udvikle sig i fugtigt organisk materiale, eksempelvis belægninger i afløbssystemer. Så længe der er slam i afløbet, kommer der nye.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den kommer ofte fra afløb, der er tørret ud eller snavsede, og kan være en plage på badeværelset. Vær opmærksom på sjældent brugte afløb og steder med vedvarende fugt.",
          "Et fund ved vasken betyder dog ikke automatisk, at der er et stort kloakbrud. Start med de tilgængelige dele og den almindelige vedligeholdelse.",
        ],
        provenance: [`${CARD} + https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/`, SMALL],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "I en almindelig bolig er den mest til gene. Den stikker og bider ikke. Kommer den i store mængder fra afløbet i et erhvervskøkken, er det dog et hygiejneproblem, fordi den kommer direkte fra slammet.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Det er afløbet, du skal behandle, ikke de voksne fluer. Rengør efter afløbets anvisninger, og fjern belægninger fysisk, hvor du kan komme til uden at beskadige installationen.",
          "En enkelt overhældning med kogende vand er ikke en sikker løsning på belægning eller en skjult fugtkilde, og meget varmt vand kan være uegnet til nogle materialer. Brug den rengøringsmetode, som passer til installationen.",
          "Brug gulvafløb og afløb, der står ubrugt, så der altid er vand i vandlåsen. Du kan tjekke, om et afløb er kilden, ved at sætte tape med klæbesiden nedad over det natten over.",
          "Store mængder eller tilbagevendende aktivitet trods rengøring kan kræve en nærmere undersøgelse af afløb, lækager eller andre fugtige kilder. Her kan en relevant fagperson være nødvendig. At stille flere frugtfluefælder rundt om vasken løser ikke en skjult kilde i en installation.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/", SMALL, "new", SMALL],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Du kan godt have mere end én type småfluer samtidig. Et eksempel er, at aktiviteten ved pant falder efter rengøring, mens der stadig sidder møllignende fluer over gulvafløbet. Her peger observationerne på to forskellige forhold: bananfluer ved pant og frugt, kloakfluer ved afløbet.",
          "Små sorte myg omkring potteplanter er som regel sørgemyg, der kommer fra fugtig pottemuld og ikke fra afløbet.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/", "owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
    ],
    sources: [
      "https://www.bolius.dk/sommerfuglemyg-paa-badevaerelset-hvordan-slipper-man-af-med-dem-98242",
      "https://en.wikipedia.org/wiki/Clogmia_albipunctata",
    ],
  },
  {
    name: "Bananflue",
    slug: "bananflue",
    latin: "Drosophila",
    description:
      "Bananfluer sværmer om moden frugt og gærende rester. Sådan kender du dem, derfor kommer de så hurtigt, og sådan bliver du af med dem.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Lille og gulbrun. Bananfluer, eller frugtfluer, omkring køkkenet er ofte små, forholdsvis kompakte fluer med gullige eller brunlige nuancer. Udseendet varierer mellem arterne, og øjenfarve alene er ikke en sikker bestemmelse. Kombinationen af insektets form og aktivitet ved gærende materiale er mere nyttig.",
        ],
        provenance: ["owner serviceContent.ts + https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Bananfluer tiltrækkes af gærende fødevarer og væsker. Under gunstige forhold kan udviklingen fra æg til voksen flue ske på under ti dage. Det forklarer, hvorfor et lille problem hurtigt kan vokse, og hvorfor fangst af de voksne fluer ikke kan stå alene.",
        ],
        provenance: [BANANA],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I køkkenet er overmoden frugt, drikkerester og madaffald oplagte steder at undersøge. Men stop ikke ved den synlige frugtskål. En løgpose, en beskadiget kartoffel, en sjat vin i en flaske eller saft under en affaldspose kan blive overset.",
          "Efteråret er et oplagt tidspunkt at være opmærksom på frugtfluer. Høst fra haven, moden frugt og returemballage kan give mere materiale, som skal håndteres.",
        ],
        provenance: [`${BANANA} + https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/`, SMALL],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Nej, den stikker ikke og er ikke farlig. Den er til gene, og den kan sætte sig på mad, så frugt og rester med fluer i bør smides ud.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "En bananfluefælde fanger voksne fluer. For at stoppe tilgangen af nye fluer skal du samtidig fjerne de steder, hvor larverne udvikler sig.",
          "Fjern overmodne og beskadigede varer, og vask frugtskålen. Opbevar egnede frugter i køleskab under indsatsen. Skyl pantemballage med rester af vin, øl, juice og sodavand. Tøm affaldet, og rengør selve spanden, låget og området under posen.",
          "Stil fælden ved det område, hvor du faktisk ser aktivitet. En placering ved pantemballagen er mere relevant end frugtskålen, hvis fluerne primært samler sig ved flaskerne. En frugtfluefælde fra webshoppen er som regel det, der skal til i en privat bolig.",
          "Ved fødevarevirksomheder bør gentagne fund indgå i virksomhedens skadedyrskontrol og håndteres systematisk.",
        ],
        provenance: [BANANA, BANANA, "owner+new https://billigskadedyr.dk/bananfluer-i-koekkenet/", SMALL],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Små fluer omkring potteplanter kan være sørgemyg. De forbindes med fugtig pottemuld og kræver en anden indsats end fluer ved gærende fødevarer.",
          "Sidder de på væggen ved afløbet og har tydeligt behårede vinger, er det kloakflue, og så er det afløbet, der skal renses. Er det større fluer i hele huset, er det snarere husflue.",
        ],
        provenance: [BANANA, "owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
    ],
    sources: ["https://en.wikipedia.org/wiki/Drosophila_melanogaster"],
  },
  {
    name: "Hestebremse og klæg",
    slug: "hestebremse-og-klaeg",
    description:
      "Klægen bider med skærende munddele, mens hestebremsen hverken kan bide eller stikke. Sådan kender du dem, og sådan holder du dem væk fra terrassen.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Klægen er den store, tunge flue, der sværver om hovedet på varme sommerdage. Den bider med skærende munddele, og bidet er smertefuldt, men den stikker altså ikke.",
          "Hestebremsen kan hverken bide eller stikke. Den har reducerede munddele og lægger i stedet æg på heste, hvor larverne udvikles i hestens mave. Den opleves som en stor, larmende flue, der forfølger heste om sommeren.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder dem",
        paragraphs: [
          "Klægen aktiveres af sol, varme, mørke farver, bevægelse og den CO₂, du udånder. Den ses især om sommeren ved vand, marker og hesteomgivelser. Hestebremsen er knyttet til heste og findes, hvor der er heste.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er de farlige?",
        paragraphs: [
          "Klægens bid er smertefuldt og kan hæve, men den er ikke giftig. De generer langt mere, end de skader, og et enkelt bid kræver som regel ingen behandling.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Lange lyse bukser og strømper hjælper, for klægen tiltrækkes af mørke farver. Brug myggemiddel med DEET eller icaridin, og stil en blæser på terrassen — fluerne kan ikke lande i blæsevejr.",
          "Holder du heste, findes der klægfælder uden kemi til folden. Rengøring og tæt affaldshåndtering holder generelt fluerne nede omkring stalden.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Stikfluen ligner en almindelig husflue men bider om anklerne, også på terrassen. Kvægmyg er de meget små, sværmende bidere, der stikker om dagen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://muldvarpemanden.dk/fluebekaempelse/fluer-der-bider-i-danmark/",
      "https://goerdetselv.dk/hus/skadedyr/hestebremser-saadan-kan-de-bekaempes",
      "https://www.magasinettolt.dk/blog/fakta-om-klaeg-bremser-og-mitter-klaegens-mund-ligner-noget-fra-en-horrorfilm/",
    ],
  },
  {
    name: "Stikflue",
    slug: "stikflue",
    latin: "Stomoxys calcitrans",
    description:
      "Stikfluen ligner en almindelig husflue, men den bider om ben og ankler — også på terrassen. Sådan kender du den, og sådan holder du den væk.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Stikfluen, også kaldet staldflue, ligner en almindelig husflue, men den har en fremadrettet stiksnabel, som den bider med. Den bider ofte om ben og ankler.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den trives ved stalde og kvæg, men ses i stigende grad ved boliger og på terrasser, især hvor der er landbrug eller heste i nærheden.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "De samme tiltag som mod husflue gælder: tætte insektnet, rengøring og tæt affaldshåndtering. Sidder fluerne fast på terrassen, hjælper en blæser, og et middel mod fluer kan bruges, hvor de holder til.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Husfluen stikker ikke. Kvægmyg er meget mindre og sværmer i skyer. Stikfluen lander stille og bidder — derfor opdager man den ofte først, når bidet mærkes.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://muldvarpemanden.dk/fluebekaempelse/fluer-der-bider-i-danmark/"],
  },
  {
    name: "Hjortelusflue",
    slug: "hjortelusflue",
    latin: "Lipoptena cervi",
    description:
      "Hjortelusfluen er skovens flyvende lus, der lander i håret og smider vingerne. Ubehagelig, men sjældent farlig. Sådan håndterer du den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Hjortelusfluen er en brunlig flue på størrelse med en husflue, som ses i skoven fra sensommeren og frem. Den flyver ind i hår og tøj og smider derefter vingerne, så den sidder fast.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den udvikles som larve hos hjorte og andre hjortedyr. Den voksne flue skal have et blodmåltid for at kunne lægge æg, og den tager det gerne fra det menneske, den lander på.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Den er ubehagelig, fordi den kravler rundt i håret og bider, men den er sjældent farlig. Tag fluen ud med en kam eller pincet, og lad være med at kradse bidene.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Flåten bider sig fast og suger blod i flere dage, mens hjortelusfluen kravler rundt og bider gentagne gange. Har du været i skoven og får udslæt eller finder en fastsiddende flåt, så tjek efter flåt i stedet.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://muldvarpemanden.dk/fluebekaempelse/fluer-der-bider-i-danmark/"],
  },
  {
    name: "Kødflue og spidsflue",
    slug: "koedflue-og-spidsflue",
    description:
      "Kødfluer og spidsfluer er de metallisk grønne og blå fluer. En pludselig sværm indendørs afslører ofte en død mus i væggen. Sådan finder du kilden.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Kødfluer og spidsfluer er mellemstore fluer med et blankt, metallisk skær i blåt og grønt. De lægger æg i kød og ådsler og tiltrækkes af alt, der lugter af dødt.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Det vigtigste tip: led efter et dødt dyr",
        paragraphs: [
          "Kommer der pludselig en sværm af kødfluer i huset, er det ofte tegn på et dødt dyr i konstruktionen — typisk en mus eller en mår i væggen, loftet eller under gulvet. Find og fjern ådslet, så forsvinder fluerne af sig selv.",
          "Det er det vigtigste diagnostiske tip ved spyfluer: Sværmen er som regel ikke selve problemet, men et symptom på noget, der ligger skjult.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Tætte insektnet i vinduer og døre, rengøring og tæt affaldshåndtering holder dem ude. I køkkenet bør fødevarer altid dækkes til.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Husfluen er grå og mat og mangler det metalliske skær. Bananfluen er meget mindre og holder sig til gærende frugt i køkkenet.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://muldvarpemanden.dk/fluebekaempelse/fluer-der-bider-i-danmark/",
      "https://www.skadedyrene.dk/",
    ],
  },
];

export default articles;
