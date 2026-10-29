import type { SpeciesArticle } from "../speciesContent";

// Provenance for the owner's review. Never rendered.
const PRO = "owner https://billigskadedyrprof.dk/service/borebiller/";
const GUIDE = "owner https://billigskadedyr.dk/den-ultimative-guide-til-borebiller/";
const BEH = "owner https://billigskadedyr.dk/behandling-af-borebiller-alt-du-skal-bruge-og-hvordan-du-goer/";
const HAR = "owner https://billigskadedyr.dk/har-du-borebiller-i-traevaerket-det-skal-du-vide/";
const OPM = "owner https://billigskadedyr.dk/borebiller-opmaaling-og-opfoelgning/";
const CARD = "owner serviceContent.ts";

const articles: SpeciesArticle[] = [
  {
    name: "Husbuk",
    slug: "husbuk",
    latin: "Hylotrupes bajulus",
    description:
      "Husbukken laver større, ovale huller og kan give alvorlige skader på tagkonstruktioner. Sådan kender du den fra almindelig borebille.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Den alvorligste. Husbukken gnaver gange i blødt nåletræ, for eksempel i tagkonstruktioner og lofter. De karakteristiske huller i overfladen er et af tegnene.",
          "Den voksne bille er 8-20 mm lang og sort eller sortbrun, med en gråhåret forkrop. Du ser sjældent selve billen. Det er sporene i træet, du opdager.",
        ],
        provenance: [CARD, "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Det er ikke selve billen, der skader træet mest. Det er larvestadiet, som kan vare flere år. Larverne laver gange inde i træet, og når de udvikler sig til voksne biller, borer de sig ud gennem overfladen og efterlader flyvehuller.",
          "Hos husbukken lever larven i tørt, forarbejdet nåletræ, og der kan gå mellem to og ti år, før den er en færdig bille. De voksne biller flyver om sommeren.",
        ],
        provenance: [GUIDE, "new"],
      },
      {
        heading: "Husbuk eller almindelig borebille?",
        paragraphs: [
          "Mange forveksler borebiller med husbukke, men der er klare forskelle. Borebiller laver små runde huller og angriber ofte overfladisk træværk. Husbukken laver større ovale huller og kan forårsage alvorlige strukturelle skader på tagkonstruktioner.",
          "Hvis hullerne er små og runde, er det oftest almindelig borebille. Hvis de er større og ovale, kan det være husbuk.",
        ],
        provenance: [GUIDE, GUIDE],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Ja. Over tid kan larverne svække bjælker, spær, gulve og andet bærende træ, og i ældre bygninger kan et længerevarende angreb i værste fald påvirke konstruktionens stabilitet. Jo tidligere angrebet opdages og behandles, desto mindre er risikoen for omfattende skader og dyre reparationer.",
          "Hvis træet smuldrer ved let tryk, bør det vurderes nærmere.",
        ],
        provenance: [PRO, GUIDE],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Angreb i bærende konstruktioner, over store områder eller med mistanke om husbuk bør altid vurderes professionelt. Vi fastlægger, hvor vidt angrebet har spredt sig, og sikrer, at behandlingen rammer alt det angrebne træ — ikke kun det, hvor du ser hullerne.",
          "Ved en professionel behandling rengør vi først træet for spindelvæv, støv og træmel. Dernæst behandles træet med godkendte midler i 2-3 omgange i løbet af det samme besøg, indtil træets mæthed er nået.",
          "Behandlingen stopper billerne, men den genskaber ikke allerede beskadiget træ. Ved alvorlige skader kan det være nødvendigt at få en byggeteknisk vurdering af, om udskiftning er nødvendig.",
        ],
        provenance: ["new", "new", PRO],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Husbuk", "https://en.wikipedia.org/wiki/House_longhorn_beetle"],
  },
  {
    name: "Løvtræborebille",
    slug: "loevtraeborebille",
    latin: "Lyctus brunneus",
    description:
      "Løvtræborebillen, også kaldet splintvedbille eller parketbille, går i nyt løvtræ som eg og ask og efterlader helt fint boremel.",
    sections: [
      {
        heading: "Hvad er det for en bille?",
        paragraphs: [
          "Gnaver i hårdt løvtræ som egetræ og ses ofte i ældre bygningsdele og møbler.",
          "I bøgerne hedder den splintvedbille eller parketbille. Den er brun, 3-7 mm lang og lidt fladtrykt.",
        ],
        provenance: [CARD, "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Larven lever af stivelsen i træets splintved og forvandler det til helt fint støv bag en tynd ydre skal. Det hårde kerneved går den ikke i, og den går ikke i nåletræet i tagkonstruktionen, som husbuk gør.",
          "Den angriber især ret frisk, storporet løvtræ som eg, ask og valnød, typisk i nyere møbler, parket og finer. Udviklingen tager normalt omkring et år.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan ser du den",
        paragraphs: [
          "Flyvehullerne er små og runde, omkring 1 mm, og boremelet er næsten som talkum. Hullerne er mindre end hos almindelig borebille.",
          "Hvis du ser frisk boremel under et træområde, er der stor sandsynlighed for, at angrebet stadig er aktivt. Den nemmeste og mest lavpraktiske løsning er at støvsuge under det berørte træ og efterfølgende holde øje med, om der kommer nyt træmel.",
        ],
        provenance: ["new", "owner https://billigskadedyr.dk/den-ultimative-guide-til-borebiller/ + https://billigskadedyr.dk/har-du-borebiller-i-traevaerket-det-skal-du-vide/"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Mindre genstande kan fryses ned i et par døgn ved -18 grader. Lakeret eller malet træ suger ikke midlet ordentligt op, så en behandling skal ofte gentages.",
          "Ser du fint støv og små runde huller i et nyt møbel, så kontakt også forhandleren. Angrebet er tit sket, før træet kom hjem til dig. Er det et helt gulv eller flere møbler, kan vi se på det og vurdere den rigtige behandling.",
        ],
        provenance: ["new", "new"],
      },
    ],
    sources: ["https://dcapub.au.dk/djfpdf/splintvedb2007.pdf", "https://en.wikipedia.org/wiki/Lyctus_brunneus"],
  },
  {
    name: "Borebille i møbler og gulve",
    slug: "almindelig-borebille",
    title: "Almindelig borebille",
    latin: "Anobium punctatum",
    description:
      "Små runde huller og lyst boremel i møbler, gulve og bjælker er typisk almindelig borebille. Sådan ser du, om angrebet er aktivt, og hvad du gør.",
    sections: [
      {
        heading: "Har du borebiller i dit træværk?",
        paragraphs: [
          "Har du også undret dig over alle de små huller i dit træværk? Har du måske lagt mærke til, at der ligger træmel på gulvet? Så har du desværre borebiller i træværket. Den mest almindelige art i Danmark er den stribede borebille, som især angriber ældre, ubehandlet eller fugtigt træ.",
          "Borebiller er små træødelæggende insekter, der modsat hvad mange tror, ikke selv skader dit træværk. Det er faktisk larverne, der spiser af træet indefra. Ægget klækkes, og larven borer inde i træet, hvor den vil blive de næste 4-8 år afhængig af temperatur, fugtighed og træart.",
        ],
        provenance: [PRO + " + " + BEH.replace("owner ", ""), PRO],
      },
      {
        heading: "Hvordan lever borebiller?",
        paragraphs: [
          "De voksne biller lægger æg i revner, sprækker eller porer i træet. Når æggene klækker, lever larverne af træets indhold i flere år og gnaver skjulte gange inde i træet, før de forpupper sig og bliver til biller. De voksne biller borer sig ud af træet og efterlader små runde huller.",
          "Borebiller kan flyve, og det er derfor meget vigtigt at få behandlet alt synligt træ fra det område, problemet er konstateret. De findes ofte på lofter, i bærende bjælker, gulve, møbler eller i garagen.",
          "Fugt har betydning for almindelig borebilles udvikling. Skadedyrlaboratoriets faktaark beskriver, at udviklingen går i stå ved et vandindhold i træet under cirka 11 %.",
        ],
        provenance: [PRO, PRO, OPM],
      },
      {
        heading: "Sådan ser du, om angrebet er aktivt",
        paragraphs: [
          "Du skal først gennemgå alt dit træ og kigge efter små runde huller. Du kan også kigge efter frisk træmel eller i værste tilfælde levende og aktive borebiller eller larver. Hvis du kan finde huller, men er usikker på, om der er aktivitet, er det vigtigt, at du løbende holder øje med, om der kommer nyt træmel eller flere huller.",
          "En af de mest almindelige myter er, at alle huller betyder aktivt angreb. I virkeligheden kan hullerne være gamle og inaktive. Derfor er frisk boremel en vigtig indikator.",
          "Det er desuden altid en god idé at kigge træ grundigt igennem, før du tager det med ind i din bolig. Så gennemtjek træet en ekstra gang, inden du flytter den gamle bænk fra skuret ind i din stue.",
        ],
        provenance: [HAR, GUIDE, HAR],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Borebiller er sjældent så destruktive som husbuk, men ved langvarige angreb kan de svække træet betydeligt. Hvis angrebet får lov at udvikle sig i mange år, kan det påvirke stabiliteten i bjælker og loftskonstruktioner.",
          "Borebiller elsker træ med et højt vandindhold og dermed også en høj luftfugtighed. Det er ofte en forkert placering af isolering, der er skyld i borebillernes angreb.",
        ],
        provenance: [GUIDE, HAR],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Behandling af borebiller kræver, at midlet trænger ind i træet, og at fugtforholdene bag angrebet bliver taget hånd om. En professionel behandling starter derfor med at fastlægge omfanget, og den afsluttes først, når træet er behandlet til mæthed.",
          "Mange begår den fejl kun at fokusere på insektmidlet, men uden at løse fugtproblemet kan angrebet vende tilbage. Sørg for god ventilation på loftet, hold luftfugtigheden lav, behandl nyt træ før montering, og inspicér træværket én gang om året.",
          "Er der mange nye flyvehuller hvert år, store områder med svækket træ eller angreb i bærende konstruktioner, bør det vurderes professionelt. Vi vurderer, om det er almindelig borebille eller husbuk, og hvor meget af træet der skal behandles.",
        ],
        provenance: ["new", GUIDE + " + " + BEH.replace("owner ", ""), "owner+new https://billigskadedyr.dk/den-ultimative-guide-til-borebiller/"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Husbuk, der laver større ovale huller i nåletræ, og løvtræborebille, der går i nyt løvtræ og laver endnu mindre huller med helt fint boremel.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/den-ultimative-guide-til-borebiller/"],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Almindelig_borebille"],
  },
];

export default articles;
