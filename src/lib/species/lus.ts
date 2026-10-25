import type { SpeciesArticle } from "../speciesContent";

const articles: SpeciesArticle[] = [
  {
    name: "Hovedlus",
    slug: "hovedlus",
    latin: "Pediculus humanus capitis",
    description:
      "Hovedlus er små gråbrune insekter, der lever i håret helt nede ved hovedbunden. Sådan kender du den, derfor har den intet med hygiejne at gøre, og sådan behandler du den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Hovedlusen er 2-3 mm lang, gråbrun og flad. Den kan hverken hoppe eller flyve — den kravler, og den gør det hurtigt, så den er svær at fange.",
          "Det, du skal lede efter, er mest æggene (luseæggene, også kaldet krinoliner): små, aflange, gråhvide prikker, der sidder klemt fast på hårstrået tæt ved hovedbunden. De kan ikke fjernes med fingerspidserne, kun med kam.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I håret helt nede ved hovedbunden — bag ørerne og i nakken er yndlingsstederne. Den findes i både rent og snavset hår, for den har intet med hygiejne at gøre.",
          "Hovedlus rammer oftest børn i alderen 3-10 år. Der er flest tilfælde i august-november og februar-april, når børn er tæt sammen i skole og institution.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis og smitte",
        paragraphs: [
          "Lusen lever af blod fra hovedbunden og dør inden for 48 timer, hvis den kommer væk fra hovedet. Æggene klækker efter ca. en uge.",
          "Den smitter næsten udelukkende ved direkte kontakt: sove tæt sammen, dele hue, hjelm, hårelastik, kam eller hårbørste. Derfor skal kun de smittede behandles — ikke hele husstanden.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Nej. Hovedlus overfører ikke sygdomme. Den klør, fordi man udvikler overfølsomhed over for lusenes affaldsstoffer, og symptomerne viser sig først 2-4 uger efter smitten.",
          "Kløen kan godt blive ved i flere uger, efter lusene er væk. Det er restkløe, ikke et nyt angreb.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Kæm vådt, balsameret hår med tættekam hver anden dag i 14 dage. Balsamen lammer lusene en stund, så kammeren kan fange dem. De fleste starter med den, og den virker, hvis du er grundig.",
          "Er kamningen for langsom eller angrebet stort, kan du supplere med lægemiddelgodkendt lusemiddel fra apoteket. Permethrin-shampoo gentages efter 8 dage, og der findes udbredt resistens — derfor er kamning ofte første valg.",
          "Huer, kamme og sengetøj fra de smittede vaskes, fryses eller lægges væk i 48 timer. Boligen behøver du ikke at behandle.",
          "Det her kan du klare selv, og det gør de fleste. Har du brug for hjælp til at finde smittekilden eller tjekke husstanden, så skriv til os.",
        ],
        provenance: ["new", "new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Fnat giver også kløe, men der sidder en mide i huden og ikke i håret, og kløen er værst om natten. Fladlus sidder i kønsbehåringen. Skæl sidder løst i håret og kan børstes af — luseæg sidder fastklemt på strået.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.sst.dk/media/wwria1tx/lus-april-23.pdf",
      "https://www.sundhed.dk/borger/patienthaandbogen/hud/sygdomme/kloeende-lidelser/lus/",
    ],
  },
  {
    name: "Fladlus",
    slug: "fladlus",
    latin: "Pthirus pubis",
    description:
      "Fladlus — også kaldet kønslus — er en lille, bred lus, der lever i kønsbehåringen. Sådan kender du den, hvordan den smitter, og hvordan den behandles.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Fladlusen er 1-2 mm og har en kortere, bredere krop end hovedlusen — nærmest krabbeformet. Den er gullig-grå og sidder fast i behåringen, hvor den lægger sine æg.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I kønsbehåringen, hvor den lever helt nede ved huden. I sjældne tilfælde ses den også i brystbehåring, i armhuler eller i skæg.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis og smitte",
        paragraphs: [
          "Fladlus smitter ved tæt kropskontakt — oftest seksuel kontakt. Den kan hverken hoppe eller flyve og dør, hvis den kommer væk fra kroppen.",
          "Den overfører ikke sygdomme, men kløen er kraftig, og blålige pletter kan ses, hvor lusene har sugt blod.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Nej, den overfører ikke sygdomme. Kløen er dog generende, og kradser man sig, kan der opstå sår og infektioner.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Behandles som hovedlus: grundig kamning og eventuelt lægemiddel fra apoteket, der er godkendt til området. Behandlingen gentages typisk efter en uge.",
          "Alt tøj, sengetøj og håndklæder vaskes ved 60 °C eller lægges i pose i et døgns tid. Partneren bør tjekkes og behandles, hvis der er tegn på smitte, ellers går det i ring.",
          "Kan du ikke komme af med den selv, er det lægen eller apoteket, du skal fat i — ikke en skadedyrsbekæmper.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Hovedlusen er længere og smalere og sidder i håret på hovedet. Fnat giver kløe i hele kropsområdet og er en mide i huden, ikke en lus i behåringen.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.sst.dk/media/wwria1tx/lus-april-23.pdf",
      "https://www.sundhed.dk/borger/patienthaandbogen/hud/sygdomme/kloeende-lidelser/lus/",
    ],
  },
  {
    name: "Fnat",
    slug: "fnat",
    latin: "Sarcoptes scabiei",
    description:
      "Fnat er ikke en lus, men en mikroskopisk mide, der graver gange i huden. Sådan kender du den, derfor skal hele husstanden behandles samtidigt, og sådan slipper du af med den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Fnat er en mide, der er så lille, at den ikke kan ses med det blotte øje. Hunnen graver smalle gange i det yderste lag af huden og lægger æg i dem.",
          "Tegnene er intens kløe, der er værst om natten, og et udslæt med små blærer og røde knopper mellem fingrene, ved håndled, albuer, bryst og skridt. Gange ses ofte som korte, bølgende streger i huden.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I huden på mennesker — det er det eneste sted, fnatmiden kan leve i længere tid. Den overlever op til 36 timer på tøj, sengetøj og håndklæder, men ikke længere væk fra kroppen.",
          "Den er med her blandt lus, fordi folk søger på de to ting sammen. Det, du leder efter, er det samme: kløe, smitte og behandling.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis og smitte",
        paragraphs: [
          "Fnat smitter ved tæt kropskontakt — at sove tæt sammen, dele seng, eller tæt og længerevarende fysisk kontakt. Den kan også smitte via tøj og sengetøj, fordi miden overlever op til 36 timer uden for kroppen.",
          "Symptomerne viser sig først 2-6 uger efter smitten, fordi kløen er en allergisk reaktion på miden. Man kan derfor smitte videre længe, før man selv opdager noget.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Fnat er ikke farlig i sig selv og forsvinder med behandling. Kløen kan dog være voldsom og forstyrre søvnen, og kradser man sig, kan der komme sår og betændelse.",
          "På plejehjem og hospitaler ses en særlig voldsom form (skab- eller krustefnat), men den er sjælden i private hjem.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Hele husstanden behandles samtidigt — også dem uden symptomer — ellers smitter I hinanden igen. Behandlingen er permethrin-creme to gange med en uges mellemrum eller tabletter efter lægens ordination, og den får du hos lægen eller apoteket.",
          "Tøj, sengetøj og håndklæder vaskes ved 60 °C eller lægges i en lukket pose i 3-7 dage. Støvsug gerne sengen, sofaen og gulvene grundigt.",
          "Man er smittefri 8-12 timer efter første behandling. Kløen kan godt vare flere uger endnu — det betyder ikke, at behandlingen har slået fejl.",
          "Gentager angrebet sig, selvom alle er behandlet, kan det være værd at få hjemmet gjort grundigt rent og behandlet. Skriv til os, så ser vi på det.",
        ],
        provenance: ["new", "new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Hovedlus og fladlus er insekter, der sidder i hår og behåring — fnat sidder i huden. Eksem og andre kløende hudsygdomme kan ligne fnat, så er du i tvivl, bør lægen kigge på det.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.ssi.dk/sygdomme-beredskab-og-forskning/sygdomsleksikon/f/fnat",
      "https://www.sundhed.dk/borger/patienthaandbogen/hud/sygdomme/kloeende-lidelser/lus/",
      "https://da.wikipedia.org/wiki/Fnat",
    ],
  },
];

export default articles;
