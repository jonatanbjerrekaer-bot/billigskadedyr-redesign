import type { SpeciesArticle } from "../speciesContent";

const PRO = "https://billigskadedyrprof.dk/service/service-2/";
const INDE = "https://billigskadedyr.dk/myrer-indendoers-den-komplette-guide-til-effektiv-bekaempelse/";
const HVERT_AAR = "https://billigskadedyr.dk/hvorfor-faar-man-myrer-hvert-aar-flyvemyrer-nye-myrebo-og-husraad/";

const articles: SpeciesArticle[] = [
  {
    name: "Rød skovmyre",
    slug: "roed-skovmyre",
    latin: "Formica rufa",
    description:
      "Rød skovmyre bor i de store myretuer i skoven. Sådan kender du den, derfor skal du som regel lade tuen være, og hvornår den er et problem.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Den røde skovmyre er en del større og bider hårdere end sort havemyre og pharaomyre. Den kendetegnes ved sin rødbrune farve, en størrelse på ca. 6-9 mm og sin aggressive natur, der gør, at den ofte bider, hvis man nærmer sig dens bo.",
          "Tuen er bygget af grannåle og små kviste. Fra tuen går der tydelige myrestier ud til de steder, hvor myrerne henter føde.",
        ],
        provenance: [`owner ${PRO}`, "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Skovmyren bor i de karakteristiske myretuer, man ser overalt i skoven, og er derfor sjældent et problem indendørs. Den kan dog være til stor gene i haven, især hvis man bor tæt på en skov.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "De voksne myrer lever af honningdug fra bladlus og af insekter, som de jager på jorden og i planterne. Hele samfundet overvintrer samlet nede i bunden af tuen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad gør du, hvis den er for tæt på?",
        paragraphs: [
          "Lad tuen være, hvis den ikke er i vejen, og hold børn og hunde væk fra den. Den holder mange andre insekter nede.",
          "Ligger tuen op ad huset, ved en sandkasse eller på terrassen, eller begynder myrerne at gå indenfor, så skriv til os. Så ser vi på, hvad der er den skånsomme løsning. Lad være med at hælde gift ud over en tue i skoven.",
        ],
        provenance: ["new", "new"],
      },
    ],
    sources: [
      "https://www.naturhistoriskmuseum.dk/viden-forskning/naturlex/insekter/rød-skovmyre",
      "https://www.retsinformation.dk/eli/lta/2021/521",
      "https://www.retsinformation.dk/eli/lta/2025/1005",
    ],
  },
  {
    name: "Sort havemyre",
    slug: "sort-havemyre",
    latin: "Lasius niger",
    description:
      "Sort havemyre er den myre, de fleste danske hjem har haft besøg af. Sådan kender du den, derfor kommer den igen, og sådan kommer du af med den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Du har nok, som de fleste danske hjem, haft besøg af den sorte havemyre på et tidspunkt. Den kendetegnes ved sin sorte eller mørkebrune farve, og den er ca. 3-5 mm lang.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Hvorfor kommer den ind?",
        paragraphs: [
          "Den er meget vedholdende, og den vil søge ind i dit hjem med tiden. Den kan nedbryde alle materialer bortset fra metal og glas, så den kan nemt finde vej ind. Den vil derfor ødelægge dine fuger, murværk og med tiden skabe ujævnhed i dine fliser.",
          "De fleste myrer, der ses inde i boligen, kommer faktisk udefra. Myrer etablerer ofte bo i jorden omkring huset og søger derefter ind gennem små sprækker, sokler eller installationer for at finde føde. Typiske indgangspunkter er revner ved dørkarme, sokkel og fundament, terrassefliser, rørgennemføringer og sprækker i murværk.",
          "Myrer kommunikerer via duftspor, som gør dem i stand til hurtigt at finde og genfinde fødekilder. Når først én myre har fundet mad i en bolig, kan der hurtigt opstå lange myrestier, fordi resten af kolonien følger sporet.",
          "Ofte opdager man ikke, at man har myrer indendørs, da de kan komme ind i forbindelse med vand- og varmerør. De kan derfor bevæge sig i og bag dine køkkenskabe, uden at du ved det.",
        ],
        provenance: [`owner ${PRO}`, `owner ${INDE}`, `owner ${PRO}`, `owner ${PRO}`],
      },
      {
        heading: "Myrer om vinteren",
        paragraphs: [
          "Mange bliver overraskede over at se myrer indendørs om vinteren. Men forklaringen er ofte enkel: kolonien har etableret sig under huset. Gulvvarme og isolering gør jorden varm nok til, at myrerne fortsætter deres aktivitet. Derfor er det ekstra vigtigt at behandle fundament og omgivelser, ikke kun boligens indre.",
        ],
        provenance: [`owner ${INDE}`],
      },
      {
        heading: "Flyvemyrer og nye bo",
        paragraphs: [
          "Flyvemyrer er et tegn på, at et eksisterende myrebo har nået en bestemt størrelse. Når en koloni vokser, producerer den nye dronninger og hanner. De udvikler vinger og forlader boet i en sværmning, typisk på varme dage, for at starte nye kolonier andre steder.",
          "Flyvemyrer lever kun i et par dage, så de kan sagtens støvsuges op uden fare for at tilkalde andre myrer.",
          "Myrer udskiller et duftstof, der virker ret kraftigt for andre myrer. Derfor kan et allerede bekæmpet bo sagtens overtages af nye myrer året efter. Det er netop derfor, mange oplever myrer hvert år.",
        ],
        provenance: [`owner ${HVERT_AAR}`, `owner ${HVERT_AAR}`, `owner ${HVERT_AAR}`],
      },
      {
        heading: "Husråd virker sjældent",
        paragraphs: [
          "Kanel og kaffegrums kan måske irritere myrerne i en kort periode, men bekæmper dem altså ikke. Kogende vand bekæmper de myrer, det rammer, men der findes en halv til en hel million myrer i et bo, og det skader din græsplæne. Eddike kan fjerne duftspor midlertidigt, men det dræber ikke kolonien.",
          "Problemet med husrådene er, at myrerne flytter til et nyt område i en periode. Nu har du så myrer to steder i stedet for kun det ene. Kort sagt: husråd løser sjældent selve problemet, de flytter det blot.",
        ],
        provenance: [`owner ${PRO}`, `owner ${PRO} + ${HVERT_AAR}`],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Gør-det-selv produkter rammer ofte kun de synlige myrer og ikke selve kolonien eller dronningen. Vil du selv i gang, så vælg midler, myrerne bærer hjem til boet: gel i små dråber langs fodpaneler, ved indgangssteder, bag køkkensokler og i revner og sprækker, og lokkedåser ved mindre angreb. Udvanding langs sokkel, terrasse og indgangssteder rammer kolonien ved kilden.",
          "Myrer forsvinder sjældent med det samme. De første dage ser du øget aktivitet omkring gelen, efter 1-2 uger falder aktiviteten, og efter 2 uger er der markant færre myrer eller ingen. Den største fejl er at overse kolonien udenfor.",
          "Kommer de igen år efter år, behandler vi udenfor hele vejen rundt langs sokkel, rundt om potter, planter, store sten og sandkasser og langs flisekanten. Inde behandler vi de rum, hvor der er set aktivitet. Kontakt os, så snart du ser den første vedvarende aktivitet af myrer. Venter du for længe, vil boet vokse sig større.",
        ],
        provenance: [`owner ${PRO} + ${INDE}`, `owner ${INDE}`, `owner ${PRO}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Pharaomyren indendørs er mindre og gullig og lever i opvarmede bygninger. Gul engmyre i plænen er lysere og bliver nede i jorden.",
        ],
        provenance: [`owner+new ${PRO}`],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Sort_havemyre",
    ],
  },
  {
    name: "Pharaomyre",
    slug: "pharaomyre",
    latin: "Monomorium pharaonis",
    description:
      "Pharaomyren er en lille, gullig myre, der lever i opvarmede bygninger. Sådan kender du den, derfor gør spray det værre, og sådan bliver du af med den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Pharaomyrer kendetegnes ved deres gullige til lysebrune farve og er ca. 2-3 mm i størrelse. Den er så lille, at du tit først opdager den, når der er mange af dem.",
        ],
        provenance: [`owner+new ${PRO}`],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "De lever hovedsageligt indendørs og oftest i opvarmede bygninger, hvor de danner mange mindre kolonier. De er en utrolig invasiv art og vil overtage hele din bolig, hvis de får lov.",
          "Et bo kan have mange dronninger. Når boet bliver stort, flytter en del af det ud og laver et nyt bo et andet sted. Sådan kan den brede sig gennem en hel bygning.",
        ],
        provenance: [`owner ${PRO}`, "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I varme bygninger: køkkener, badeværelser, bag hvidevarer, i hulrum i væggene og langs varmerør. I etageejendomme kan den brede sig fra lejlighed til lejlighed.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Lad være med at sprøjte. Spray får boet til at splitte sig op, så du ender med flere bo i stedet for færre.",
          "Det, der virker, er gel, som myrerne bærer hjem. Gelen arbejder indirekte: i stedet for at dræbe myrerne med det samme, spredes midlet i kolonien, hvilket giver en mere langtidsholdbar effekt. Placér små dråber langs fodpaneler, bag køkkensokler og i revner og sprækker. Det kræver tålmodighed.",
          "Bor du i en etageejendom, skal naboerne som regel med, ellers kommer de igen. Skriv til os, så taler vi gerne med ejendommen eller administrationen om det.",
        ],
        provenance: ["new", `owner+new ${INDE}`, "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Sort havemyre er større og mørk og kommer ind udefra. Ser du små, gule myrer midt om vinteren inde i en varm lejlighed, er det et tegn på pharaomyre.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Pharaoh_ant",
    ],
  },
  {
    name: "Gul engmyre (ænsmyren)",
    slug: "gul-engmyre",
    latin: "Lasius flavus",
    description:
      "Gul engmyre laver de små jordtuer i plænen og lever næsten hele livet under jorden. Sådan kender du den, og hvornår du skal gøre noget ved den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Gul engmyre er lille og gul til brun. Arbejderne er 2-4 mm lange. Du ser sjældent selve myrerne, fordi de næsten aldrig kommer op i lyset.",
          "Det, du ser, er de små høje af løs jord mellem græsstråene. Over tid kan de blive til faste, græsklædte tuer i plænen.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den lever under jorden i enge, plæner og græsarealer og holder rodlus i boet, som den lever af honningdug fra. På varme dage i juli og august kommer de bevingede dronninger og hanner op og sværmer.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Den er ufarlig for dig, og den har sjældent noget at gøre i huset. Problemet er kun plænen, hvor tuerne gør den ujævn og besværlig at slå.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad gør du ved den?",
        paragraphs: [
          "Tit ingenting. Kan du leve med nogle små tuer, så gør de ingen skade. Vil du have en jævn plæne, kan du rive tuerne ud, så græs i og vande godt.",
          "Lad være med at hælde kogende vand på tuerne. Det rammer kun de myrer, det berører, og det skader din græsplæne.",
          "Er du i tvivl om, hvilken myre det er, så send et billede, så siger vi, om det er noget, der skal behandles.",
        ],
        provenance: ["new", `owner+new ${PRO}`, "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Sort havemyre er mørk, kommer frem i dagslys og går gerne ind i huset. Gul engmyre bliver under jorden.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Lasius_flavus",
    ],
  },
];

export default articles;
