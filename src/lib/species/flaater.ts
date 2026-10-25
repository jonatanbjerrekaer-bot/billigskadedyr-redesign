import type { SpeciesArticle } from "../speciesContent";

const articles: SpeciesArticle[] = [
  {
    name: "Skovflåt",
    slug: "skovflaat",
    latin: "Ixodes ricinus",
    description:
      "Skovflåten er Danmarks almindeligste flåt og findes overalt, også uden for skoven. Sådan kender du den, derfor den kan være farlig, og sådan fjerner du den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Skovflåten er 3-4 mm lang og kan nå op til ca. 1 cm, når den er fuld af blod. Som voksen har den 8 ben og ingen øjne — den finder sit bytte ved at registrere varme, kuldioxid og bevægelser.",
          "Den bider sig fast med munddele, der er forsynet med modhager, og suger blod i op til ca. en uge. Bidet mærker man ofte ikke, fordi flåtens spyt indeholder et bedøvende stof.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Skovflåten udgør over 90 % af flåterne i Danmark og er udbredt i hele landet. Den findes ikke kun i skove, men også i haver, hække og højt græs — især hvor der er rådyr.",
          "Den sidder på et græsstrå eller en gren og venter. Når et dyr eller et menneske passerer, griber den fat med forbenene og kravler opad for at finde et sted at bide sig fast.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Livscyklussen går fra æg over larve og nymfe til voksen, og den strækker sig over 2-6 år. Hvert stadie skal have ét blodmåltid for at udvikle sig videre.",
          "Flåtsæsonen løber normalt fra marts til november. Flåter bliver aktive allerede ved 4-5 °C, og i milde vintre kan der være flåtsæson året rundt.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Skovflåten kan overføre borrelia, der giver det røde udslæt erythema migrans og i sjældne tilfælde neuroborreliose. Borrelia overføres først, efter flåten har siddet fast i flere timer, og sygdommen behandles med antibiotika.",
          "Den kan også overføre TBE-virus, der kan give hjernebetændelse, og som overføres hurtigere end borrelia. I Danmark er TBE især kendt fra Bornholm, hvor den har forekommet i over 60 år, og siden 2019 er der set flere tilfælde om året i Tisvilde Hegn og omegn.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan fjerner du en flåt",
        paragraphs: [
          "Tjek huden efter ophold i naturen — især læggene, knæhaserne, lysken og hovedbunden, og hos hunde ofte hoved, ører og nakke.",
          "Fjern flåten med en flåttang eller pincet, så tæt ved huden som muligt, og træk lige op uden at vride. Lad være med at smøre olie, margarine eller andet på flåten først — den kan tømme sit maveindhold i bidstedet. Vask området med sæbe og vand bagefter.",
          "Sitter en del af flåten tilbage, er det som regel ikke farligt — resterne kan pilles ud med en pincet, men behøver ikke nødvendigvis fjernes. Hold øje med området de næste par dage, og søg læge ved udslæt eller feber.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Sådan holder du dem væk",
        paragraphs: [
          "Hold græsplænen slået, og ryd op i høje hække og krat tæt på terrassen, hvor flåterne venter. Brug tæt tøj på ture i naturen, så flåterne er nemmere at se.",
          "Behandl hund og kat med et godkendt flåtmiddel efter dyrlægens anvisning, og gennemse pelsen efter hver gåtur. Nogle midler til hunde er giftige for katte, så læs indlægssedlen.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Engflåten, der er større og har et hvidt mønster på ryggen. I folkemunde kaldes skovflåten også fejlagtigt for tæge, men en tæge er et insekt med 6 ben — se artiklen om tæger.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.sst.dk/vidensbase/sygdomme-og-behandling/smitsomme-sygdomme/smitsomme-sygdomme-a-aa/flaatoverfoerte-sygdomme-tbe-og-borrelia",
      "https://www.sdu.dk/da/om-sdu/fakulteterne/sundhedsvidenskab/nyheder/det-skal-du-vide-om-skovflaater",
      "https://www.ssi.dk/sygdomme-beredskab-og-forskning/sygdomsleksikon/f/flaatbaarne-sygdomme",
      "https://www.dinapoteker.dk/familie/dyr/loppe-flaater-og-taeger-g166",
    ],
  },
  {
    name: "Engflåt",
    slug: "engflaat",
    latin: "Dermacentor reticulatus",
    description:
      "Engflåten er en større, mønstret flåt, der spreder sig i Europa og ses i stigende tal i Danmark. Sådan kender du den, og hvad du gør, hvis du finder den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Engflåten er omtrent dobbelt så stor som skovflåten og har et karakteristisk hvidt mønster på ryggen. Hunnen er ca. 4 mm, når den ikke har spist, og kan nå ca. 1 cm, når den er opsvulmet med blod; hannen er ca. 4-5 mm.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Engflåten findes i Europa og Vestasien og har spredt sig hastigt de seneste år. Den foretrækker græs langs vandløb og mere åbne områder, og det er derfor, den har fået sit danske navn.",
          "Den blev konstateret første gang i Danmark i 2017, på en skudt guldsjakal, og der kommer formentlig flere tilfælde. Den trives i åbne områder, skovflåten ikke bruger, så den ændrer, hvor der er risiko.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Bidet er ikke farligt i sig selv. Problemet er sygdommene, den kan bære: bakterien Rickettsia raoultii, der kan give et sår ved bidstedet, og parasitten Babesia canis, der giver hundemalaria hos hunde — en sygdom, der kan være dødelig for hunde.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan fjerner du den",
        paragraphs: [
          "Fjern den, som du fjerner enhver flåt: med en flåttang eller pincet tæt ved huden, trukket lige op uden at vride. Smør ikke noget på flåten først, og vask området bagefter.",
          "Hundeejere bør være opmærksomme: opdager du en stor, mønstret flåt på hunden, er det en god idé at lade dyrlægen se den, så hunden kan følges for babesia.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Skovflåten, der er mindre og uden det hvide mønster på ryggen. Ligesom skovflåten kaldes den nogle gange fejlagtigt for en tæge — men en tæge er et insekt med 6 ben, ikke en flåt.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.dinapoteker.dk/familie/dyr/loppe-flaater-og-taeger-g166",
      "https://da.wikipedia.org/wiki/Engfl%C3%A5t",
    ],
  },
  {
    name: "Tæger",
    slug: "taeger",
    latin: "Reduviidae",
    description:
      "Er det en flåt eller en tæge? En flåt er en mide med 8 ben, en tæge et insekt med 6. Sådan kender du forskellen, og hvorfor ægte tæger sjældent er et problem i hjemmet.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "En tæge er et insekt med 6 ben. En flåt er en mide med 8 ben, en slags edderkop. Alligevel kaldes skovflåten i folkemunde fejlagtigt for tæge, og det er derfor, man taler om en tægetang.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Kan en tæge bide sig fast?",
        paragraphs: [
          "Nej. Ægte tæger er rovdyr, der suger blod fra andre insekter. En tæge kan i sjældne tilfælde bide et menneske, men den kan ikke hægte sig fast som en flåt og sidde og suge blod i flere dage.",
          "Sitter krybet fast på huden, er det altså ikke en tæge — så er det en flåt, og den skal fjernes med det samme.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor almindelig er den?",
        paragraphs: [
          "Ægte tæger er sjældne i danske hjem og udgør ingen reel plage. Finder du et lille insekt med 6 ben i stuen, er det med stor sandsynlighed noget helt andet — fx vingetægen, der har sin egen artikel under væggelus.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Skovflåten, som mange kalder tæge, og vingetægen, der godt nok er en tæge og godt nok suger blod, men som hører hjemme under væggelus. Tæl benene: 6 ben er et insekt, 8 ben er en mide.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://videnskab.dk/naturvidenskab/kan-du-kende-forskel-paa-en-flaat-og-en-taege/",
      "https://www.dinapoteker.dk/familie/dyr/loppe-flaater-og-taeger-g166",
    ],
  },
];

export default articles;
