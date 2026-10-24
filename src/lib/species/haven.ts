import type { SpeciesArticle } from "../speciesContent";

const articles: SpeciesArticle[] = [
  {
    name: "Kartoffelbille",
    slug: "kartoffelbille",
    latin: "Leptinotarsa decemlineata",
    description:
      "Kartoffelbiller, også kaldt coloradobiller, æder kartoffelplanterne af på få dage. Sådan kender du bille og larve, hvad du gør selv, og hvorfor et fund skal meldes.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Kartoffelbiller er ca. 1 cm lange, gul-orange biller med fem mørke striber på hver dækvinge. Larverne er rødorange og pukkelryggede og sidder ofte på oversiden af bladene, mens de æder.",
          "De kaldes også coloradobiller og stammer oprindeligt fra Amerika. De angriber planter i natskygge-familien — kartofler, tomater og auberginer.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Findes den i Danmark?",
        paragraphs: [
          "Ja, men sjældent. Kartoffelbiller er tilflyttere fra syd og dukker op i Danmark, når vind og vejr har hjulpet dem herop. Historisk er der fundet masser af biller skyllet op på sydkysten af Lolland, og der har været angreb i Sønderjylland.",
          "Fordi den er en alvorlig kartoffelpest, står arten under officiel overvågning i Danmark, og der iværksættes bekæmpelse ved fund.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvorfor er den alvorlig",
        paragraphs: [
          "Et enkelt angreb kan afbladskelere kartoffelplanter på få dage. Planterne står tilbage med bare stilke og kan ikke sætte kartofler, så hele høsten i bedet kan gå tabt på en uge.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Gå efter den dagligt i starten af sæsonen: fjern biller og larver med hånden og kom dem i en spand med vand. Det er det vigtigste greb, og det virker, så længe du er ude hver dag.",
          "Riv jorden op omkring kartoflerne, fordi larverne pupperer i jorden under planten, og dæk rækkerne med fiberdug, så billerne ikke kan nå ind at lægge æg. Vælg tidlige sorter, der når at sætte kartofler, før angrebet topper.",
          "Opdager du en større forekomst, så kontakt kommunen eller Plantetilsynet. Kartoffelbiller skal meldes, fordi myndighederne overvåger arten — og jo før et fund bliver meldt, jo mindre er risikoen for, at den når at sprede sig til naboens kartofler.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Smølderlarver lever også omkring kartofler, men nede i jorden som trådformede larver — det er ikke dem, der spiser bladene. Seksplettet mariehøne og dens larve er nyttedyr, der æder bladlus, så lad dem være. Andre små gule biller i haven har ikke de fem tydelige striber på ryggen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://dcapub.au.dk/pub/Plantesygdomme_i_Danmark_1966.pdf",
      "https://www.inaturalist.org/taxa/84778-Leptinotarsa-decemlineata",
    ],
  },
  {
    name: "Smølderlarver",
    slug: "smoelderlarver",
    latin: "Agriotes spp.",
    description:
      "Smølderlarver, også kaldt jordbiller eller tråduldslarver, gnaver rødder og huler i rodfrugter i årevis. Sådan kender du dem, og sådan mindsker du skaden.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Smølderlarver er gulhvide, trådformede, hårde larver på et par centimeters længde. De kaldes også jordbiller, trådlarver eller tråduldslarver, selvom de altså er larver og ikke biller.",
          "De voksne biller, smølderbillerne, er smalle, matbrune og ligner klikbiller. Du ser dem om foråret på græs og buske, hvor de spiser af unge blade.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Larverne lever 3-5 år i jorden, før de forpupper sig. Hele den tid gnaver de på rødder og rodfrugter, så skaden vokser år for år, uden at du nødvendigvis ser synderen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Tegn på skade",
        paragraphs: [
          "Kig på høsten: kartofler og gulerødder med bore huller og gnavede riller er det klassiske tegn. Planter, der visner uden nogen synlig grund, har ofte fået gnavet rødderne af. I plænen viser angrebet sig som røde, visne pletter — et rødt tæppe af dødt græs, fordi larverne har spist græsrødderne.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad gør du selv?",
        paragraphs: [
          "Skift sædskifte, så kartofler og rodfrugter ikke står det samme sted år efter år, og grav jorden om: larver, der ligger tæt på overfladen, bliver ædt af fugle. Lad være med at lægge køkkenhave direkte i jord, der lige er pløjet op fra græs — der ligger larverne og venter.",
          "Hold plænen fri for stråaffald, og fjern visne pletter med det samme. Mod tråduldslarver i selve plænen findes der insekticidgranulater, men nogle af dem er kun til professionel brug. Skriv til os, hvis plænen skal have hjælp.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Gåsebillelarver er hvide og krumme med brunt hoved og sidder i plænen, hvor de løsner græstæppet — se under gåsebiller. Stankelbenslarven er grå, læderagtig og uden ben. Dræbersneglen æder også kartoffelblade, men den ser du ovenpå jorden.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://dcapub.au.dk/pub/Plantesygdomme_i_Danmark_1966.pdf",
    ],
  },
];

export default articles;
