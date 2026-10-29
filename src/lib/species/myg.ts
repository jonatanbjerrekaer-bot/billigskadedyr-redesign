import type { SpeciesArticle } from "../speciesContent";

// These three cards are families, not single species, so latin holds the
// family name. His pro page for myg is empty on the live site; his own text
// here is the two webshop guides on myg, which are about stikmyg. He writes
// nothing specific about dansemyg or kvægmyg, so those two are mostly ours,
// with his advice on net and personal protection where it fits.
const MY1 = "https://billigskadedyr.dk/myg-omkring-huset/";
const MY2 = "https://billigskadedyr.dk/myg-net-middel-eller-faelde/";

const articles: SpeciesArticle[] = [
  {
    name: "Stikmyg",
    slug: "stikmyg",
    latin: "Culicidae",
    description:
      "Stikmyg er de myg, der stikker. Kun hunnen suger blod, og larverne lever i stillestående vand. Sådan begrænser du dem omkring huset.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Stikmyg er ikke én art, men en hel familie med op mod 30 arter i Danmark. Fælles for dem er den lange sugesnabel. Det er kun hunnen, der stikker, fordi hun skal bruge blod for at lægge æg. Hannen lever af nektar.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor de kommer fra",
        paragraphs: [
          "Myggens larve- og puppestadier udvikler sig i vand. Myg kan komme fra både haven og omgivelserne. Du kan ikke styre hele området, men du kan undersøge vandansamlinger på din egen grund og beskytte de steder, hvor du opholder dig.",
          "Start med en runde i haven efter regn. Små beholdere er lette at overse, og et problem kan blive ved, selv om den store regnvandstønde er dækket til.",
        ],
        provenance: [`owner ${MY1}`, `owner ${MY1}`],
      },
      {
        heading: "Er de skadelige?",
        paragraphs: [
          "I Danmark er stikmyg først og fremmest en plage. Stikket klør, men myggene her er ikke kendte for at sprede sygdom. Ved rejser til områder med risiko for myggebårne sygdomme skal beskyttelsen afklares med sundhedsfaglig rådgivning.",
        ],
        provenance: [`owner+new ${MY2}`],
      },
      {
        heading: "Sådan begrænser du dem",
        paragraphs: [
          "Undersøg underskåle, spande, presenninger, legetøj og andre steder, hvor vand bliver stående. Tøm unødvendige beholdere, og opbevar dem, så de ikke fyldes igen. Dæk opsamlet regnvand på en måde, der passer til beholderen. Ændr ikke naturlige vandhuller eller beskyttet natur som et gør-det-selv-tiltag mod myg.",
          "Et intakt insektnet gør det muligt at lufte ud med mindre indflyvning. Kontrollér kanter, samlinger og huller. En god netdug hjælper kun, hvis myggene ikke kan komme rundt om den.",
          "Ved ophold ude kan dækkende tøj være en praktisk del af beskyttelsen. Et myggemiddel skal være beregnet til personen og anvendelsesstedet; alder, påføring og gentagelse følger etiketten.",
          "En almindelig fluefælde eller frugtfluevæske er ikke automatisk en myggeløsning. Der er ikke grundlag for at love en myggefri have, men en målrettet indsats giver bedre forudsætninger end tilfældig behandling af hele udearealet. Kommer myggene igen, selvom du har tømt alt stillestående vand, sidder ynglestedet et sted, du ikke har fundet — der hjælper vi med at lede.",
        ],
        provenance: [`owner ${MY1}`, `owner ${MY1}`, `owner ${MY1}`, "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Dansemyg danser i store sværme om aftenen og ligner stikmyg, men de har ingen sugesnabel og kan ikke stikke. Kvægmyg er mindre og mere kompakte og stikker om dagen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Stikmyg"],
  },
  {
    name: "Dansemyg",
    slug: "dansemyg",
    latin: "Chironomidae",
    description:
      "Dansemyg sværmer i skyer over vand og hække, men de stikker ikke. Sådan kender du dem fra stikmyg, og hvad du kan gøre, hvis de generer.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Dansemyg er en stor familie med over 350 arter i Danmark. De ligner stikmyg, men de mangler sugesnabel og kan hverken stikke eller suge blod. Det sikreste kendetegn er adfærden: de samler sig i sværme, der står og danser i luften om aftenen, over vand, en hæk eller et træ.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder dem",
        paragraphs: [
          "Larverne lever oftest i ferskvand. Derfor ser du dem tæt på søer, åer og damme. Bor du tæt på vand, kan der i perioder være så mange, at de sidder på facaden og kommer ind, når du lufter ud.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er de skadelige?",
        paragraphs: ["Nej. Dansemyg stikker ikke og bider ikke. Problemet er alene mængden."],
        provenance: ["new"],
      },
      {
        heading: "Hvad du kan gøre",
        paragraphs: [
          "Insektnet er et oplagt valg til vinduer og døre, der ofte står åbne. Mål åbningen, og kontrollér, at nettet kan slutte til hele vejen rundt.",
          "Inde kan du bare støvsuge dem op. Der er ingen grund til at bruge midler mod dyr, der ikke gør skade. Bliver du stukket, er det ikke dansemyg, men stikmyg eller kvægmyg.",
        ],
        provenance: [`owner ${MY2}`, "new"],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Dansemyg"],
  },
  {
    name: "Kvægmyg",
    slug: "kvaegmyg",
    latin: "Simuliidae",
    description:
      "Kvægmyg er små, mørke myg, hvis stik klør og hæver kraftigt. Larverne lever i rindende vand. Sådan kender du dem, og sådan beskytter du dig.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Kvægmyg er små, mørke myg på 1-7 mm med korte ben og korte følehorn. De er mere kompakte end stikmyg og ligner nærmest små fluer. Det er hunnen, der stikker, og hun stikker om dagen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder dem",
        paragraphs: [
          "Larverne sidder fast på sten og planter i åer og vandløb. Bor du ved en å, eller går du tur langs en, er det her, du møder dem.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er de skadelige?",
        paragraphs: [
          "Stikket er værre end et almindeligt myggestik. Det hæver, klør og kan blive betændt, og selv få stik kan være til stor gene. Får du kraftige reaktioner, så tal med din læge.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan beskytter du dig",
        paragraphs: [
          "Larverne lever ude i åen, hvor du ikke kan komme til dem. Det handler derfor om at beskytte dig selv.",
          "Ved ophold ude kan dækkende tøj være en praktisk del af beskyttelsen. Et myggemiddel skal være beregnet til personen og anvendelsesstedet; alder, påføring og gentagelse følger etiketten. Et intakt insektnet holder dem ude af huset.",
        ],
        provenance: ["new", `owner ${MY1}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Stikmyg er længere og mere langbenede og stikker mest i skumringen. Dansemyg ligner, men stikker slet ikke.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://lex.dk/kvægmyg", "https://en.wikipedia.org/wiki/Black_fly"],
  },
  {
    name: "Sørgemyg",
    slug: "soergemyg",
    latin: "Sciaridae",
    description:
      "Sørgemyg er de små mørke myg, der sværmer op fra potteplanterne, når du vander. De falder ikke i eddikefælder som bananfluer. Sådan kommer du af med dem.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Sørgemyg er meget små, spinkle, mørke myg, der sværmer op fra potteplanterne, når du vander. De ligner bananfluer, men de er mørkere og længerebenede og kredser om planterne i stedet for frugtskålen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "De voksne myg gør ingen skade. Larverne lever af råddende organisk materiale i jorden og kan i stort tal nappe rødderne på helt unge planter, men etablerede stueplanter klarer dem som regel.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Derfor virker eddikefælden ikke",
        paragraphs: [
          "Det vigtigste at vide er, at sørgemyg ikke falder i eddikefælder som bananfluer gør. Står fælden ved frugten tom, mens myggene sværmer om planterne, er det sørgemyg — og så skal behandlingen foregå i potterne, ikke i køkkenet.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med dem",
        paragraphs: [
          "Lad jorden tørre godt ud mellem vandingerne, og hæld overskydende vand af fra underskålen. Dæk jordoverfladen med et lag sand eller fint grus, så hunnen ikke kan lægge æg, og stil en gul klisterfælde i potten.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Bananflue sidder ved gærende frugt og falder i eddikefælden. Kloakflue holder sig til afløbet på badeværelset og har tydeligt behårede vinger.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://www.bolius.dk/saadan-slipper-du-af-med-bananfluer-2187"],
  },
];

export default articles;
