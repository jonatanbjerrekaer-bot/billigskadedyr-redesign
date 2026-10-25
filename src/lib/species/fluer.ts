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
          "Husfluen, som mange kalder stuefluen, er den mest almindelige flue i danske hjem. Du ser den ofte omkring vinduer, døre, køkkener og opholdsrum, hvor den leder efter føde og varme.",
          "Den er 6-7 mm lang, grå til sort og har røde øjne. Ser du godt efter, har den fire mørke striber på langs over ryggen.",
        ],
        provenance: ["owner+new https://billigskadedyrprof.dk/service/fluer/", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "En stueflue lever typisk to til fire uger. På den tid kan en hunflue nå at lægge flere hundrede æg, så bestanden kan vokse hurtigt, hvis forholdene er gode.",
          "Fluer lægger æg, hvor larverne har adgang til føde. Typiske ynglesteder er affaldscontainere, kompost, gylle, husdyrgødning, døde dyr, fugtigt organisk materiale, madaffald og kloakområder.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Fluer tiltrækkes af varme, fugt, madrester, affald og organisk materiale. Derfor ser du dem ofte omkring køkkenet, affaldsbeholderen, stalde og komposten.",
          "De er mest aktive fra forår til sensommer. I juni, juli og august kan bestanden vokse hurtigt, hvis der er ynglesteder i nærheden. Milde vintre og opvarmede bygninger kan få enkelte arter til at flyve året rundt.",
        ],
        provenance: [PRO, PRO],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Fluer er til irritation, men de er også et hygiejneproblem. De flytter sig mellem affald, organisk materiale og fødevarer og kan trække bakterier og andre mikroorganismer med. Derfor er de uønskede både i private hjem og i virksomheder, der håndterer mad.",
          "Hold maden tildækket, og tag et større flueproblem hurtigt — især i erhverv, hvor der håndteres mad.",
        ],
        provenance: [PRO, CARD],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Se efter et mønster. Kommer fluerne mest ind, når døren står åben, er insektnet og dørtætninger stedet at starte. Kommer de, selv når der er lukket, skal du lede i huset: ved affald, glemte madvarer, dyrefoder og kroge, du ikke kommer til så ofte.",
          "Sørg for, at affaldet er lukket inde, fjern spild omkring beholderen, og rengør selve spanden. En ny pose fjerner ikke det, der sidder fast i bunden.",
          "Har du kun enkelte fluer, er behandling af en professionel ikke altid nødvendig. En fluefælde eller en elektrisk insektfanger fra webshoppen er ofte nok.",
          "Har du mange fluer, eller vender de tilbage igen og igen, ligger der ofte en aktiv yngleplads et sted. Så behandler vi de steder, fluerne sætter sig i løbet af dagen — vinduer, karme og lyse, solopvarmede flader — og finder ud af, hvordan ynglestedet fjernes.",
        ],
        provenance: [HOUSE, HOUSE, PRO, PRO],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Spyfluer er større end stuefluer og kendes ofte på det metalliske blå eller grønne skær. De tiltrækkes af døde dyr og affald og kan være tegn på et problem bagved.",
          "Klyngefluer søger ind i bygninger om efteråret for at overvintre. Mange oplever dem samlet på loftet eller omkring vinduerne, når temperaturen stiger igen i foråret.",
          "Er fluerne meget små, er det næppe husflue. Bananfluen holder sig ved frugten, kloakfluen ved afløbet.",
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
          "Det, folk kalder kloakfluer, er sommerfuglemyg — også kaldt afløbsfluer. De er små og mørke med dunede, tydeligt behårede vinger, så de ligner nærmest en lille møl.",
          "De sidder ofte stille på væggen i køkkenet eller badeværelset og flyver kort og klodset, når du kommer forbi.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/ + serviceContent.ts", "owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Larverne kan udvikle sig i fugtigt organisk materiale, fx i belægninger i afløbssystemet. Så længe der er slam i afløbet, kommer der nye.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den kommer ofte fra afløb, der er tørret ud eller snavsede, og den kan være en plage på badeværelset. Hold øje med sjældent brugte afløb og steder med konstant fugt.",
          "Et fund ved vasken betyder ikke automatisk, at der er et kloakbrud. Start med det, du kan komme til, og med almindelig rengøring.",
        ],
        provenance: [`${CARD} + https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/`, SMALL],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "I en almindelig bolig er den mest til gene. Den stikker og bider ikke. Kommer den i store mængder fra afløbet i et erhvervskøkken, er det et hygiejneproblem, fordi den kommer direkte fra slammet.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Det er afløbet, du skal behandle, ikke de voksne fluer. Rengør efter afløbets anvisninger, og fjern belægninger med håndkraft, hvor du kan nå uden at beskadige noget.",
          "Det er ikke nok at hælde kogende vand i afløbet en enkelt gang. Det fjerner hverken belægningen eller en skjult fugtkilde, og meget varmt vand kan skade nogle materialer. Brug den rengøringsmetode, som passer til installationen.",
          "Brug gulvafløb og afløb, der står ubrugt, så der altid er vand i vandlåsen. Du kan tjekke, om et afløb er kilden, ved at sætte tape med klæbesiden nedad over det natten over.",
          "Kommer der stadig mange, selvom du har gjort rent, skal afløb, lækager og andre fugtige steder undersøges nærmere, og det kan kræve en fagperson. Frugtfluefælder ved vasken løser ikke en skjult kilde i rørene.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/", SMALL, "new", SMALL],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Du kan godt have to slags småfluer på én gang. Aktiviteten ved pant kan falde, efter du har vasket op, mens de møllignende fluer stadig sidder over gulvafløbet. Så peger det på to forskellige ting: bananfluer ved pant og frugt, kloakfluer ved afløbet.",
          "Små sorte myg omkring potteplanter er som regel sørgemyg fra fugtig pottemuld. De kommer ikke fra afløbet.",
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
          "Bananfluen er lille og gulbrun. Der findes flere arter, så udseendet varierer lidt, og du kan ikke sikert artsbestemme den på øjenfarven alene. Se i stedet på kombinationen af kropsformen og at den holder sig ved gærende materiale.",
        ],
        provenance: ["owner serviceContent.ts + https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Bananfluer tiltrækkes af gærende fødevarer og væsker. Under gunstige forhold kan udviklingen fra æg til voksen flue ske på under ti dage. Det forklarer, hvorfor et lille problem vokser hurtigt, og hvorfor det ikke er nok at fange de voksne fluer.",
        ],
        provenance: [BANANA],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I køkkenet er overmoden frugt, drikkerester og madaffald de oplagte steder at lede. Men gå ikke bare ud fra frugtskålen. En løgpose, en beskadiget kartoffel, en sjat vin i flasken eller saft under affaldsposen kan nemt blive overset.",
          "Efteråret er højsæson. Høst fra haven, moden frugt og returemballage giver flere steder, de kan yngle.",
        ],
        provenance: [`${BANANA} + https://billigskadedyr.dk/smaa-fluer-frugt-afloeb-planter-2/`, SMALL],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Nej, den stikker ikke, og den er ikke farlig. Den er til gene, og da den sætter sig på maden, skal frugt og rester med fluer i smides ud.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "En bananfluefælde fanger voksne fluer. For at stoppe tilgangen af nye fluer skal du samtidig fjerne de steder, hvor larverne udvikler sig.",
          "Fjern overmodne og beskadigede varer, og vask frugtskålen. Opbevar egnede frugter i køleskab under indsatsen. Skyl pantemballage med rester af vin, øl, juice og sodavand. Tøm affaldet, og rengør selve spanden, låget og området under posen.",
          "Stil fælden ved det område, hvor du faktisk ser aktivitet. Sidder fluerne primært ved flaskerne, er en placering ved pantemballagen mere relevant end ved frugtskålen. En frugtfluefælde fra webshoppen er som regel det, der skal til i en privat bolig.",
          "Ved fødevarevirksomheder bør gentagne fund indgå i virksomhedens skadedyrskontrol og håndteres systematisk.",
        ],
        provenance: [BANANA, BANANA, "owner+new https://billigskadedyr.dk/bananfluer-i-koekkenet/", SMALL],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Små fluer omkring potteplanter kan være sørgemyg. De kommer fra fugtig pottemuld og kræver en anden indsats end fluer ved gærende fødevarer.",
          "Sidder de på væggen ved afløbet med tydeligt behårede vinger, er det kloakflue, og så skal afløbet renses. Er der tale om større fluer i hele huset, er det nok husflue i stedet.",
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
          "Klægen er den store, tunge flue, der sværver om hovedet på varme sommerdage. Den bider med skærende munddele, og bidet gør ondt, men den stikker altså ikke.",
          "Hestebremsen kan hverken bide eller stikke. Munddelene er reducerede, så den kan ikke bruge dem til noget. I stedet lægger den æg på heste, og larverne udvikles i hestens mave. Den er en stor, larmende flue, der plager heste om sommeren.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder dem",
        paragraphs: [
          "Klægen aktiveres af sol, varme, mørke farver, bevægelse og den CO₂, du udånder. Den ses især om sommeren ved vand, marker og hesteomgivelser. Hestebremsen findes, hvor der er heste.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er de farlige?",
        paragraphs: [
          "Klægens bid gør ondt og kan hæve, men den er ikke giftig. De generer langt mere, end de skader. Et enkelt bid kræver som regel ingen behandling.",
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
          "Husfluen stikker ikke. Kvægmyg er meget mindre og sværmer i skyer. Stikfluen lander stille og bider, så du opdager den ofte først, når bidet mærkes.",
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
          "Sværmen er sjældent problemet i sig selv. Den peger på noget, der ligger skjult, så led efter ådslet.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Tætte insektnet i vinduer og døre, rengøring og tæt affaldshåndtering holder dem ude. I køkkenet skal fødevarer altid dækkes til.",
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
