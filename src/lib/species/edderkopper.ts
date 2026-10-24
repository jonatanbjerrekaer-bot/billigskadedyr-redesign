import type { SpeciesArticle } from "../speciesContent";

const PRO = "owner https://billigskadedyrprof.dk/service/edderkopper/";
const SHOP1 = "owner https://billigskadedyr.dk/problemer-med-edderkopper/";
const SHOP3 = "owner https://billigskadedyr.dk/problemer-med-edderkopper-3/";
const WIN = "owner https://billigskadedyr.dk/edderkopper-vinduer-og-doere/";
const CARD = "owner serviceContent.ts";

const articles: SpeciesArticle[] = [
  {
    name: "Husedderkop",
    slug: "husedderkop",
    latin: "Eratigena atrica",
    description:
      "Husedderkoppen er den største edderkop, vi har i Danmark, og den, der løber over gulvet i sensommeren. Sådan kender du den, og sådan holder du den nede.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "I Danmark er edderkopperne som regel meget små, men den største vi har er husedderkoppen, som i hankøn kan blive op til 10 cm i diameter, hvor kroppen alene kun er 1 cm. En edderkop på denne størrelse er et sjældent syn, da de ofte ligger i skjul på loftet eller i kælderen.",
          "Store husedderkopper har en brunlig krop og lange ben. Benspænd og kropslængde er forskellige mål, så et dyr kan opleves meget stort, selv om kroppen er betydeligt mindre end den samlede udstrækning.",
          "Forkroppen er grålig med mørke tegninger, og bagkroppen er mørkebrun med gullige, vinkelformede pletter.",
        ],
        provenance: [SHOP1, SHOP3, "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Husedderkoppen laver et tæt, fladt tæppe af spind med et rør i den ene ende, hvor den sidder og venter på byttet.",
          "Når hannerne bliver kønsmodne og forlader deres skjul på jagt efter hunner, kan de pludselig dukke op på åbne gulve. Den ændrede synlighed kan føles dramatisk, selv om nogle af dyrene allerede har opholdt sig i eller tæt ved bygningen gennem længere tid.",
          "Edderkopper bliver særligt synlige i sensommeren og efteråret, når de søger indendørs for at finde læ, varme og føde. Samtidig er det parringssæson for flere arter, hvilket øger aktiviteten. Det er derfor helt normalt at opleve flere edderkopper i denne periode.",
        ],
        provenance: ["new", SHOP3, PRO],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Edderkopper søger et fugtigt miljø. Luftfugtigheden er også grunden til, at du ofte ser mest aktivitet i kælderrum, bryggers, badeværelse eller soveværelse.",
          "Finder du den i badekarret eller håndvasken, er den som regel faldet ned og kan ikke komme op ad den glatte side igen.",
        ],
        provenance: [PRO, "new"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Du kan være ganske rolig, for der findes ingen farlige eller dødbringende edderkopper i Danmark. Den velkendte husedderkop kan godt bide fra sig, men det vil hverken klø, hæve eller blive rødt, og biddet mærkes kun som et lille stik. Det kan ske, hvis den føler sig truet, bliver klemt eller taget op i hånden.",
          "Edderkopper lever af byttedyr. De gnaver ikke i bjælker som borebillelarver og lever ikke af uldtøj som klædemøllarver. Hvis du samtidig finder huller i tekstiler eller boremel, skal disse tegn derfor undersøges særskilt.",
        ],
        provenance: [SHOP1, SHOP3],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Hvis du vil fjerne en enkelt edderkop uden direkte berøring, kan du bruge en egnet beholder og et stift stykke papir. Arbejd roligt, og sørg for, at beholderen er stor nok til ikke at klemme benene.",
          "Gør støvsugeren til din bedste ven, og kom godt ned i alle fodlister og revner, da det ofte er der, en edderkop opholder sig. Husk også at komme op i højden og så vidt muligt få fjernet støv og spindelvæv i alle kroge og hjørner.",
          "Til mindre bekæmpelse, som når det kun drejer sig om en enkelt edderkop eller to, kan du bruge et insektmiddel fra webshoppen, både til bekæmpelse og forebyggelse.",
          "Normalt vil det ikke være nødvendigt at behandle indendørs, da edderkopperne ikke kun er inde, men bevæger sig ind og ud flere gange dagligt. Har du mange år efter år, giver det mening at behandle udenfor to gange årligt, forår og efterår, langs tagrender, udhæng, vinduer og døre.",
        ],
        provenance: [SHOP3, SHOP1, SHOP1, PRO],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "En meget langbenet edderkop, der hænger i et hjørne, er ikke nødvendigvis samme type som den kraftigere, hurtigt løbende husedderkop på gulvet. Den langbenede under loftet er som regel en vinduesedderkop, og de store hjulspind i haven er korsedderkoppens.",
        ],
        provenance: ["owner+new https://billigskadedyr.dk/problemer-med-edderkopper-3/"],
      },
    ],
    sources: [
      "https://www.naturhistoriskmuseum.dk/viden-forskning/naturlex/smådyr/stor-husedderkop",
      "https://en.wikipedia.org/wiki/Eratigena_atrica",
    ],
  },
  {
    name: "Vinduesedderkop",
    slug: "vinduesedderkop",
    latin: "Pholcus phalangioides",
    description:
      "Den langbenede edderkop under loftet hedder også mejeredderkop. Den er harmløs, men spindet samler støv. Sådan kender du den, og sådan holder du den nede.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Langbenet og harmløs. Den edderkop, vi her kalder vinduesedderkop, hedder i opslagsværkerne mejeredderkop, og den er en af de mest almindelige edderkopper i vores hjem.",
          "Kroppen er kun omkring 8-9 mm, men benene er meget lange og tynde, og den kan spænde over omkring 10 cm. Bagkroppen er lang og grålig, og hele dyret er næsten gennemsigtigt.",
        ],
        provenance: ["owner+new serviceContent.ts + https://billigskadedyr.dk/problemer-med-edderkopper/", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Den laver et løst, uordentligt spind under loftet. Bliver den forstyrret, sætter den sig selv og spindet i voldsom svingning, så den bliver svær at få øje på.",
          "Den æder insekter, men går især efter andre edderkopper og forlader gerne sit eget spind for at fange dem i deres. Den kan tage en husedderkop, der er større end den selv.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den ses ofte om efteråret i lofter og hjørner med ro og lidt fugt. I Danmark lever den kun inden døre, og den sidder helst øverst under loftet, i trappeopgange, på lofter og i kældre.",
        ],
        provenance: ["owner+new serviceContent.ts"],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Edderkopper i Danmark er som udgangspunkt ikke farlige for mennesker. De fleste arter er sky og undgår kontakt. Problemet med edderkopper handler derfor typisk ikke om sundhedsrisiko, men om ubehag, spind og gentagen forekomst i boligen.",
        ],
        provenance: [PRO],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Gør støvsugeren til din bedste ven, og kom op i højden. Få fjernet støv og spindelvæv i alle kroge og hjørner, så den ikke får lov at blive siddende.",
          "Spind kan være forladte og blive siddende længe. Rengør de relevante områder og se, hvor der opstår nyt spind. Det giver et bedre billede af den aktuelle aktivitet end at tælle alle gamle tråde på én gang.",
          "Vil du holde dem væk fra vindueskarme og hjørner, kan et insektmiddel fra webshoppen være nok. Edderkopper kan være særligt generende i opgange, fællesarealer og erhvervslokaler, og der tilbyder vi faste aftaler.",
        ],
        provenance: [SHOP1, SHOP3, "owner+new https://billigskadedyrprof.dk/service/edderkopper/"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Den forveksles med mejere, de langbenede dyr i haven. Mejeren har ét samlet, rundt kropsled og laver intet spind. Vinduesedderkoppen har to kropsdele og sidder i sit spind. Den kraftige edderkop, der løber over gulvet, er derimod en husedderkop.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.naturhistoriskmuseum.dk/viden-forskning/naturlex/smådyr/mejeredderkop",
      "https://en.wikipedia.org/wiki/Pholcus_phalangioides",
    ],
  },
  {
    name: "Korsedderkop",
    slug: "korsedderkop",
    latin: "Araneus diadematus",
    description:
      "Korsedderkoppen spinder de store hjulspind i haven og ved vinduerne i sensommeren. Sådan kender du den, og sådan holder du den væk fra huset.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Kendt på det lyse mønster på ryggen, der ligner et kors. Den er omkring 10-12 mm lang, og farven varierer fra lys gullig til mørk gråbrun. Hunnen er større end hannen.",
        ],
        provenance: ["owner+new serviceContent.ts"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Den spinder det klassiske, runde hjulspind, og hunnen sidder med hovedet nedad midt i nettet eller gemt i nærheden med en signaltråd. Edderkopper lever af andre insekter som fluer, myg og små kryb, og derfor optræder de ofte dér, hvor der også er andre insekter.",
          "Hunnen lægger sine æg i et gult spind om efteråret, og ungerne bliver voksne den følgende sommer. Det er derfor, du ser de største korsedderkopper og de fleste spind i sensommeren og om efteråret.",
        ],
        provenance: ["owner+new https://billigskadedyrprof.dk/service/edderkopper/", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Den ses ofte i haven og kan finde vej indenfor om efteråret. Mest synlig er de fleste edderkopper om sommeren, især i form af spindelvæv på facaden, havemøbler, carport eller hækken.",
          "Edderkopper tiltrækkes ofte af lys omkring vinduer og døre og af de andre insekter, lyset trækker til. Hvis mange flyvende insekter samles omkring en lampe, kan området også være attraktivt for edderkopper, der udnytter byttedyrene.",
        ],
        provenance: [`${CARD} + https://billigskadedyrprof.dk/service/edderkopper/`, `${PRO} + https://billigskadedyr.dk/problemer-med-edderkopper-3/`],
      },
      {
        heading: "Er den skadelig?",
        paragraphs: [
          "Nej. Edderkopper i Danmark er som udgangspunkt ikke farlige for mennesker, og de fleste arter er sky og undgår kontakt. Man kan godt sige, at edderkopper er nyttedyr, da de spiser mange andre typer insekter. Generne er spindet over døre, vinduer og havemøbler.",
        ],
        provenance: ["owner+new https://billigskadedyrprof.dk/service/edderkopper/"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Vinduer og døre er gode steder at begynde, når edderkopper og spind vender tilbage. Rengør karme, false og tilgængelige hjørner, og se efter huller i insektnet og mellemrum langs kanterne.",
          "Overvej, om lyset behøver at være tændt hele natten, og om placering eller styring kan ændres uden at forringe sikkerhed og adgang. Et insektmiddel fra webshoppen langs vinduer og døre hjælper på en lille flade.",
          "Er huset dækket af spind hvert år, sprøjter vi hække, buske, træer, stakit, havelamper og møbler, samt rundt ved tagrender, udhæng, vinduer, døre og væglamper. Behandlingen gentages forår og efterår. Efter behandlingen skal der ikke vaskes vinduer eller hække de næste 14 dage, så midlet bliver siddende. Man kan aldrig blive 100% fri for edderkopper, men vi kan holde bestanden betydeligt nede.",
        ],
        provenance: [WIN, `${SHOP3} (+ new: insektmiddel fra webshoppen)`, PRO],
      },
    ],
    sources: [
      "https://da.wikipedia.org/wiki/Korsedderkop",
      "https://en.wikipedia.org/wiki/Araneus_diadematus",
    ],
  },
];

export default articles;
