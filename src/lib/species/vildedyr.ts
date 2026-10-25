import type { SpeciesArticle } from "../speciesContent";

const articles: SpeciesArticle[] = [
  {
    name: "Ræv",
    slug: "raev",
    latin: "Vulpes vulpes",
    description:
      "Ræven er en fast del af dansk natur og bor også i byerne. Sådan kender du dens spor, hvornår den er til gene i haven, og hvad du må gøre for at holde den væk.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Rødræven kendes på den rødbrune pels, den spidse snude og den buskede hale. Den er nataktiv, men ses også i dagslys — især når den skal skaffe mad til unger.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Ræven findes i hele landet, både på landet og i byerne. Den graver huler i plæner, bede og skrænter og etablerer sig gerne under skure, garager og terrasser.",
          "Tegn på ræv er gravehuller med en samlet jordhøj, efterladenskaber med rester af mad, og støj om natten — især i januar-marts, hvor det er parringstid.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvorfor den bliver i haven",
        paragraphs: [
          "Ræven bliver, hvor der er føde og ro. Kompost, affald, faldet frugt og en åben hundeskål holder den i nærheden, og et stille hjørne under et skur er et fint sted at bo.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Ræve bider næsten aldrig mennesker og angriber normalt ikke katte eller større dyr. De kan bære ræveskab, som meget sjældent overføres til mennesker og kureres medicinsk, og i sjældne tilfælde bændelorm.",
          "Vask grøntsager, der har ligget på jorden, og rør ikke ræveekskrementer med bare hænder. Hold afstand, og lad ræven gå sin vej — den vil som regel hellere væk end tæt på dig.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvad gør du selv?",
        paragraphs: [
          "Fod aldrig ræven — hverken med vilje eller ved at lade foderrester ligge. Fjern faldet frugt, sikr komposten, og luk skuret af med kraftigt trædækkende net, der går mindst 30 cm ned i jorden.",
          "Nedlæg rævegraven: vand den i stykker, eller fyld den med sten og brokker. Gør det især i juni, når ungerne er ude af hulen. I yngletiden skal du ikke lukke en hule, fordi ungerne kan være tilbage i den.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvad må du ikke?",
        paragraphs: [
          "Gift og skyderi er forbudt i byzone, og ræve må ikke bare flyttes et andet sted hen. Vil du have reguleret ræve på din grund, skal det ske i overensstemmelse med jagtlovgivningen — nogle kommuner har aftaler med jagtforeninger, der tager sig af det.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Grævlingen, der også graver i plænen, men laver mange smågrave efter regnorme i stedet for en hule. Skuddene fra muldvarp og mosegris er jord skudt op nedefra og ligner heller ikke rævens grave.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.bolius.dk/undgaa-raeve-i-din-have-15982",
      "https://naturstyrelsen.dk/media/10bdnkss/om-at-leve-med-byraeve.pdf",
      "https://www.havenyt.dk/artikler/dyr_i_haven/dyr/409.html",
    ],
  },
  {
    name: "Grævling",
    slug: "graevling",
    latin: "Meles meles",
    description:
      "Grævlingen graver i plæner og kan bo under huse, men den er totalfredet i Danmark. Sådan kender du den, og hvad du må — og ikke må — gøre.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Grævlingen er et stort, tævepattet rovdyr med sort-hvidstribet pels og korte ben. Den er primært nataktiv, så det er sjældent, man ser den — til gengæld ser man dens arbejde om morgenen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Grævlingen er altædende: regnorme, insekter, biller, mus, rotter, hareunger, frøer, bær og korn. Den lever i fastsiddende sæt — et gangsystem — i skovbrynge, men også gerne i en have med løs undergrund.",
          "Et sæt bruges i generationer og kan rumme flere kamre med tørt græs som redemateriale. Sidder sættet under en bygning, giver det problemer: gangene svækker fundamentet, og dørene binder.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvorfor den er til gene",
        paragraphs: [
          "Skaderne kommer af, at grævlingen leder efter føde. Den river græstørv op for at komme til regnorme og insekter, og det kan se voldsomt ud i plænen og køkkenhaven. Den etablerer sig også gerne under huse og udhuse.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Grævlingen er ikke farlig for mennesker. Den holder sig for sig selv og undgår kontakt. Skaderne er på haven og i værste fald på bygningen — ikke på dig.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad må du ikke?",
        paragraphs: [
          "Grævlingen er totalfredet i Danmark. Den må hverken jages, fanges eller generes, og dens gange må ikke ødelægges, mens dyrene er i dem. Det gælder hele året.",
          "Har grævlingen slået sig ned under dit hus, er det kommunen eller en vildtkonsulent, du skal kontakte. En aflukning skal ske, mens dyrene er ude, og kræver ofte professionel hjælp — gør-det-selv-løsninger risikerer at lukke levende dyr inde.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvad gør du selv?",
        paragraphs: [
          "Forebyg, før der sidder et dyr: sæt hegn med underjordisk afskærmning — net eller gravplade 50-80 cm ned og 30-50 cm op ad stolperne — og hold låg på kompost og affaldscontainere.",
          "Er skaderne i plænen til at overse, kan du trykke græstøverne tilbage og vande. Skaderne kommer igen, så længe grævlingen bor der — og den må du ikke fjerne selv.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Ræven, der også graver i haven, men som laver en hule med en samlet jordhøj. Muldvarpens og mosegrisens skud er jord presset op nedefra uden revne eller hul ovenfra — grævlingens grave er åbne og løsrevne.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.naturhistoriskmuseum.dk/viden-forskning/naturlex/pattedyr/gr%C3%A6vling",
    ],
  },
  {
    name: "Hare",
    slug: "hare",
    latin: "Lepus europaeus",
    description:
      "Harer gnaver bark af unge træer om vinteren og æder afgrøder om sommeren. Sådan kender du skaderne, og hvordan du holder dem væk fra haven.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "I Danmark findes to arter: markharen (Lepus europaeus) og sneharen (Lepus timidus). Begge kendes på de lange ører og de lange bagben, og sneharen skifter om vinteren til hvid pels.",
          "Markharen er den, de fleste ser i haven og på markerne. Den bygger ikke bo, men ligger på jorden — ofte i en lille fordybning, den selv har trykket.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Harer holder til i åbne landskaber: marker, enge, græsplæner og villakvarterer med store haver. Om dagen ligger den trykket, og om aftenen og natten kommer den frem og æder.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvorfor den er til gene",
        paragraphs: [
          "Om vinteren gnaver harer bark af unge træer og buske — især æbletræer, roser og nåletræer — når føden er sparsom. Om sommeren æder de afgrøder i køkkenhaven, især unge planter og kål.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Nej. Haren er sky og holder sig på afstand. Den er jagtbar i jagtsæsonen og er ikke fredet som skadedyr — men levende fangst og udsætning af harer kræver tilladelse, så du flytter den ikke selv.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad gør du selv?",
        paragraphs: [
          "Et hegn alene rækker sjældent, for harer kan hoppe over 1 m. Brug i stedet et trådhegn med god afstand til planterne — så kan haren ikke nå hen over hegnet — eller sæt spiralskåle om stammerne på unge træer om vinteren.",
          "I køkkenhaven hjælper højbede med net, og en hund, der bruger haven, skræmmer de fleste harer væk. Er skaden sket på et træ, kan barken på sårene dækkes med sammenkrøllet fugtfrit materiale, mens træet heler.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Mus og rotter, der også gnaver bark af træer — især om vinteren. Musegnav sidder lavere på stammen og er tit finere; harer æder højere op og laver pænere, brede gnaveflader. Ser du lange bagbensspore i sneen, var det en hare.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.havenyt.dk/artikler/dyr_i_haven/dyr/409.html",
    ],
  },
];

export default articles;
