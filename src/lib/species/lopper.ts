import type { SpeciesArticle } from "../speciesContent";

const articles: SpeciesArticle[] = [
  {
    name: "Katteloppe",
    slug: "katteloppe",
    latin: "Ctenocephalides felis",
    description:
      "Katteloppen er den loppe, langt de fleste danske hjem får. Sådan kender du den, derfor er de få lopper du ser kun toppen af problemet, og sådan kommer du af med den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Katteloppen er en vingeløs, brunlig loppe på 1,5-4 mm. Den kan hoppe op til 30 cm og bevæger sig hurtigt gennem pelsen, så den er svær at fange.",
          "Loppeekskrementerne er det sikreste tegn: sorte prikker i pelsen, der ligner kaffegrums. Kommer de på fugtigt, hvidt papir, opløses de og bliver rødbrune, fordi de består af tørret blod.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "På katte og hunde, men den bider også mennesker. Når den ikke sidder på dyret, findes den i tæpper, gulvsprækker, sofaer og kurve — der, hvor dyret ligger mest.",
          "Ca. 95 % af en loppebestand findes i omgivelserne som æg, larver og pupper. Æggene er glatte, falder af dyret og havner, hvor dyret bevæger sig.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Én voksen loppe lægger typisk 20-30 æg i døgnet. Ved stuetemperatur tager det ca. 3 uger at udvikle sig fra æg til voksen loppe.",
          "Pupperne ligger i kokoner og kan hvile i månedsvis. De klækker, når de mærker vibrationer og varme — fx fra fodtrin eller et menneske, der sætter sig i sofaen. Derfor kan et hus, der har stået tomt, pludselig give loppebid, når der igen er liv i det.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Loppebidene er kløende, røde knopper, ofte samlet om anklerne og der, hvor tøjet sidder tæt. Bidene er sjældent farlige i sig selv, men kraftig kløe kan give sår og infektioner, hvis man klør sig op.",
          "Lopper kan overføre båndorm og fungerer som mellemværter for andre parasitter, så tag angrebet alvorligt, selvom det sjældent er farligt.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Behandl alle kæledyr samtidig med et godkendt middel — dyret ordner dyrlægen eller et middel fra dyrehandlen. Behandler du kun det ene dyr, vandrer lopperne over på det næste.",
          "Brug aldrig permethrin på katte. Det findes i flere midler til hunde og er giftigt for katte.",
          "Støvsug grundigt og dagligt de første 7-10 dage, og smid posen ud hver gang. Vask dyner, tæpper, sofaovertræk og dyrets tekstiler ved mindst 60 °C.",
          "Er lopperne kommet i boligen, kan en sprøjtebehandling af gulve og tæpper med langtidsvirkende middel være nødvendig — ofte to gange med 10-14 dages mellemrum, fordi pupperne klækker skiftevis. Skriv til os, så ser vi på det.",
        ],
        provenance: ["new", "new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Hundeloppen ligner næsten til forveksling, men den er sjældnere i danske hjem. Fugleloppen kommer fra fuglereder og giver ofte bid på mennesker i et hus, hvor der ikke bor kæledyr. Stikmyggen kan også lave kløende knopper, men den sidder ikke i boligen og forsvinder igen af sig selv.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://jsb.dk/krybende-insekter/lopper.aspx",
      "https://www.medpets.dk/bekaempelse-af-lopper-i-hjemmet",
      "https://toxin.dk/bekaempelse-af-lopper/",
    ],
  },
  {
    name: "Hundeloppe",
    slug: "hundeloppe",
    latin: "Ctenocephalides canis",
    description:
      "Hundeloppen lever på hunde og ligner katteloppen. Sådan kender du den, derfor er det alligevel katteloppen, du skal lede efter, og sådan behandles den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Hundeloppen er en lille, brun, vingeløs loppe på 1,5-4 mm, der ligner katteloppen så meget, at man sjældent kan skelne dem med det blotte øje. Den kan som andre lopper hoppe op til 30 cm.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "På hunde, i hundekurve, tæpper og sofaer, hvor hunden ligger. Selvom den hedder hundeloppe, er det i danske hjem oftest katteloppen, man har fået — den lever nemlig både på katte og hunde.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Som hos katteloppen lægger hunnen 20-30 æg i døgnet, og æggene falder af dyret ned i omgivelserne. Udviklingen fra æg til voksen loppe tager ca. 3 uger ved stuetemperatur, og pupperne kan ligge i dvale i månedsvis.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Hundeloppen bider også mennesker og giver kløende, røde knopper. Den kan overføre båndorm, ligesom katteloppen kan.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Behandlingen er den samme som ved katteloppe: alle kæledyr behandles samtidigt med et godkendt middel, og husk at permethrin ikke må bruges på katte. Støvsug dagligt de første 7-10 dage, og vask tekstiler ved mindst 60 °C.",
          "Kommer lopperne igen efter en behandling, skyldes det som regel pupper, der har ligget i dvale og først klækker senere. Derfor kan en anden behandling af boligen 10-14 dage efter være nødvendig.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Katteloppen er næsten identisk at se på og er langt den almindeligste i danske hjem. Få dyrlægen til at fastslå arten, hvis det har betydning for behandlingen af dyret.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://jsb.dk/krybende-insekter/lopper.aspx",
      "https://azskadedyrsservice.dk/skadedyr/loppebekaempelse/",
    ],
  },
  {
    name: "Fugleloppe",
    slug: "fugleloppe",
    description:
      "Fugleloppen kommer fra fuglereder under taget eller på altanen og bider mennesker, når reden er forladt. Sådan kender du den, og sådan slipper du af med den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Fugleloppen er en lille, brun, vingeløs loppe, der ligner katteloppen. Den lever naturligt på fugle og findes i og omkring fuglereder.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "I fuglereder under taget, i udhæng, på altaner og i skorstene. Når ungerne er flyvet fra reden, eller reden ryddes væk, søger lopperne nye værter — og så kan de ende hos mennesker i huset.",
          "Det klassiske scenarie er et hus eller en lejlighed, der har stået tomt: loppepupperne ligger i dvale og klækker, så snart der igen er vibrationer og varme fra nye beboere.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Fugleloppen lever af fugleblod i reden. Når værten forsvinder, overlever pupperne i månedsvis i omgivelserne og klækker på vibrationer — det er derfor, bidene ofte kommer pludseligt, længe efter reden er væk.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Fugleloppen bider mennesker og giver kløende, røde knopper, typisk om ankler og ben. Den er ikke farligere end andre lopper, men bidene kan kløe kraftigt.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Fjern reden, hvis det er muligt uden at overskride reglerne om beskyttede fugle, og tæt åbningen, så nye fugle ikke bygger på samme sted.",
          "Støvsug grundigt og dagligt de første 7-10 dage — også i revner og langs fodpaneler — og smid posen ud hver gang. Vask tekstiler ved mindst 60 °C.",
          "Sidder lopperne fast i tæpper og gulve, kan en sprøjtebehandling med langtidsvirkende middel være nødvendig, ofte to gange med 10-14 dages mellemrum. Skriv til os, så ser vi på det.",
        ],
        provenance: ["new", "new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Katteloppen giver de samme bid, men den har et kæledyr som vært. Har du hverken kat eller hund og har haft en fuglerede på eller ved huset, er fugleloppen det mest sandsynlige. Væggelus bider også, men den bider i senge og sofaer om natten og efterlader rækker af bid, hvor loppen typisk bider enkeltstående knopper om anklerne.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://jsb.dk/krybende-insekter/lopper.aspx",
      "https://toxin.dk/bekaempelse-af-lopper/",
    ],
  },
];

export default articles;
