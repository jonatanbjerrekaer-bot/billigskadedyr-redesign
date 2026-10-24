import type { SpeciesArticle } from "../speciesContent";

// Mus in Danish homes: husmus and halsbåndmus. Facts from the pest-control
// and municipal pages listed in `sources`; no prices, no invented claims.
const PESTIUM = "https://www.pestium.dk/almindelige-skadedyr-i-danmark/mus/";
const MYREEXPRESSEN = "https://myreexpressen.dk/skadedyr/";
const AZ = "https://azskadedyrsservice.dk/skadedyr/musbekaempelse/";
const FURESOE = "https://www.furesoe.dk/borger/bolig/ejerbolig/rotter-og-skadedyr";

const articles: SpeciesArticle[] = [
  {
    name: "Husmus",
    slug: "husmus",
    latin: "Mus musculus",
    description:
      "Husmusen er den mus, de fleste danske hjem får besøg af. Sådan kender du den, hvor små sprækker den kan presses igennem, og hvad der virker mod den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Husmusen er en lille, spids mus med en krop på 7-10 cm. Halen er omtrent lige så lang som kroppen. Ryggen er gråbrun, og bugten er lysere. Vægten ligger på 10-25 g.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvorfor kommer den ind?",
        paragraphs: [
          "Den søger ind efter varme og føde og kan presses igennem en sprække på kun 6-7 mm. Rørgennemføringer, sprækker ved soklen, kældervinduer og utætte døre er nok.",
          "Den er nysgerrig og undersøger gerne nye ting. Det gør den til den nemmeste af gnaverne at fange i fælde — rotter er det modsatte og undgår alt nyt i dagevis.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Husmusen er aktiv hele året, mest om aftenen og natten. Indendørs yngler den ca. 4 gange årligt med 4-8 unger pr. kuld, så et enkelt fund kan blive til mange mus på kort tid.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Mus gnaver i emballage, træ, plastik, isolering og el-ledninger, hvor der opstår risiko for kortslutning. Ekskrementer og urin forurener madvarer i skabe og skuffer.",
          "Museurin kan overføre sygdomme som leptospirose og toxoplasmose. Det er en god grund til at smide gnavede madvarer ud og rengøre hylder, hvor der er set spor.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forebyggelse",
        paragraphs: [
          "Tæt sokkel, rørgennemføringer og ventilationsåbninger med metalnet, ståluld eller hård mørtel. Opbevar mad og dyrefoder tætsluttende, og hold udhuse og kældervinduer intakte.",
          "Fjern rodebunker og kompost tæt på huset, hvor musene kan skjule sig, og sørg for, at der ikke ligger foderrester i garagen eller skuret.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Brug musefælder — smækfælder, klapfælder eller levendefælder — med lokkemad som rosiner, nødder eller gryn. Sæt fælderne vinkelret op ad vægge, hvor musene færdes, ikke midt på gulvet.",
          "Brug normalt ikke gift indendørs. Mus dør på steder, du ikke kan nå, og så lugter det, mens liget tiltrækker spyfluer.",
          "Fanger du mus igen og igen, er der en vej ind, du ikke har fundet. Tæt den, før du gør noget andet. Skriv til os, så ser vi på sporene sammen.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Halsbåndmus er større og gulligbrun med en tydelig mørk pelskrave om halsen. Markmus og skovmus lever udenfor og kommer sjældent ind. Spidsmus er ikke en gnaver og ikke et skadedyr — den spiser insekter og orme. Er du i tvivl om det er mus eller rotter, så husk at rotter altid skal anmeldes til kommunen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [PESTIUM, MYREEXPRESSEN, AZ, FURESOE],
  },
  {
    name: "Halsbåndmus",
    slug: "halsbaandsmus",
    latin: "Apodemus flavicollis",
    description:
      "Halsbåndmusen er større end husmusen og kendes på den mørke pelskrave. Sådan kender du den fra husmusen, og hvad der virker mod den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Halsbåndmusen er større end husmusen og gulligbrun med en tydelig mørk pelskrave om halsen — et bånd, der har givet den navnet. Snuden er spids, og øjnene og ørerne er større end husmusens.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Halsbåndmusen er den anden art, man typisk får i huse i Danmark. Den lever i naturen omkring huse og søger ind, når der er føde, eller når kulden sætter ind.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Som andre mus er den mest aktiv om aftenen og natten og hele året. Den yngler flere gange årligt, så et fund indendørs skal tages alvorligt med det samme.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Mus gnaver i emballage, træ, plastik, isolering og el-ledninger og forurener madvarer med ekskrementer og urin. Museurin kan overføre sygdomme som leptospirose og toxoplasmose. Det gælder halsbåndmusen som husmusen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Brug fælder med lokkemad som rosiner, nødder eller gryn, og sæt dem vinkelret op ad vægge, hvor musene færdes. Brug normalt ikke gift indendørs — døde mus på steder, du ikke kan nå, lugter og tiltrækker spyfluer.",
          "Tæt sprækker ved sokkel, rør og ventilationsåbninger med metalnet, ståluld eller hård mørtel, og opbevar mad og foder tætsluttende. Er du i tvivl om, hvilket dyr du har med at gøre, så send os et billede af sporene.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Husmus er mindre, gråbrun og uden pelskrave. Markmus og skovmus er udenfor-arter, der sjældent kommer ind. Spidsmus er ikke en gnaver og ikke et skadedyr. Husk at rotter — der er langt større — altid skal anmeldes til kommunen, mens mus skal bekæmpes med fælder og tætning.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [PESTIUM, MYREEXPRESSEN, AZ],
  },
];

export default articles;
