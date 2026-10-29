import type { SpeciesArticle } from "../speciesContent";

const PRO = "https://billigskadedyrprof.dk/service/hvepse/";
const SHOP = "https://billigskadedyr.dk/hvepse/";
const FAELDE = "https://billigskadedyr.dk/hvepsefaelde-eller-bekaempelse-af-bo/";

const articles: SpeciesArticle[] = [
  {
    name: "Tysk hveps",
    slug: "tysk-hveps",
    latin: "Vespula germanica",
    description:
      "Tysk hveps, eller tysk gedehams, bygger bo i jorden, på lofter og i hulrum. Sådan kender du den, og sådan bliver du af med boet.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Tysk hveps hedder i bøgerne tysk gedehams. Man kan kende hvepsen på dens sorte og gule farve og den store bagkrop med en lille forkrop. Hvepsens størrelse er typisk mellem 10-20 mm.",
          "Mønsteret på bagkroppen varierer så meget, at det ikke duer til at skelne arterne. Kig i stedet på ansigtet. Tysk hveps har typisk tre små sorte prikker på det gule ansigtsskjold. Almindelig hveps har i stedet en bred sort streg, der minder om et anker.",
        ],
        provenance: [`owner+new ${SHOP}`, "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Et hvepsebo starter i foråret med én dronning, der bygger de første celler. I løbet af sommeren kan boet vokse til flere tusinde hvepse. Jo større kolonien er, desto hårdere forsvares boet.",
          "Når vinteren kommer, dør arbejderne og den gamle dronning. Kun nye befrugtede dronninger overlever vinteren og søger ly et andet sted. Det gamle bo genbruges normalt ikke året efter.",
        ],
        provenance: [`owner ${PRO}`, `owner ${PRO}`],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Tysk hveps ligner almindelig hveps til forveksling. Begge er sociale og bygger gerne bo ved huset. Tysk hveps bygger det meste af boet under jorden, men også gerne inde i bygninger.",
          "Vi ser ofte hvepsebo i tagudhæng, loftsrum, skure, garager, carporte, hulmure, ventilationskanaler, hække og buske og i jorden omkring terrasser og bede. Hvis du observerer en fast flyverute med hvepse, er der stor sandsynlighed for, at et bo befinder sig i nærheden.",
        ],
        provenance: ["new", `owner ${PRO}`],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Et enkelt stik er normalt ikke alvorligt, men flere stik på én gang kan være meget smertefulde. For personer med allergi kan et hvepsestik i værste fald medføre en alvorlig allergisk reaktion. Og selv hvis du ikke er allergisk, kan et stik i mund eller hals blive farligt, fordi tungen eller luftrøret kan svulme op.",
          "Når en hveps har stukket, frigøres alarmferomoner, som tilkalder andre hvepse. Derfor er et godt råd at undgå at gå i panik og vifte med armene, når en hveps nærmer sig.",
        ],
        provenance: [`owner ${PRO} + ${SHOP}`, `owner ${SHOP}`],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Hold afstand til boet. Undlad at banke på det, stikke redskaber ind i indgangen eller lukke en aktiv åbning. I en bygning kan en lukket indgang få hvepsene til at søge andre veje, herunder ind mod beboelsen.",
          "Et hvepsebo bør altid behandles med omtanke. Bo i en væg, på loftet, i jorden eller på svært tilgængelige steder anbefales det at lade en professionel tage sig af — både for resultatet og for sikkerheden.",
          "Vi starter altid med at gennemgå det område, hvor hvepsene er aktive, og behandler direkte på boet. Kan vi ikke komme til boet, behandler vi i stedet hvepsenes ind- og udgang. Det anbefales at holde døre og vinduer omkring boet lukket i op til 2 døgn.",
          "Er det kun enkelte hvepse ved bordet og intet bo i nærheden, er der som regel ikke behov for en behandling. Dæk søde drikke og mad til, og hold afstand til områder med faldet frugt.",
        ],
        provenance: [`owner ${FAELDE}`, "new", `owner ${SHOP} + ${PRO}`, "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Almindelig hveps, som ligner den næsten helt. Forskellen sidder i ansigtet. Behandlingen er den samme, så for dig betyder det mindre, hvilken af de to der er tale om. Bygger den i jorden, kaldes den i daglig tale jordhveps.",
        ],
        provenance: ["new"],
      },
    ],
    sources: ["https://en.wikipedia.org/wiki/Vespula_germanica", "https://da.wikipedia.org/wiki/Almindelig_gedehams", "https://lex.dk/gedehamse"],
  },
  {
    name: "Almindelig hveps",
    slug: "almindelig-hveps",
    latin: "Vespula vulgaris",
    description:
      "Almindelig hveps, eller almindelig gedehams, er sensommerens gæst ved bordet. Sådan kender du den, hvor den bygger, og hvad du gør ved boet.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "En hveps, også kendt som en almindelig gedehams, hører til ordenen årevinger. Gedehams er den fælles betegnelse for familien, som rummer flere forskellige arter af hvepse. Den hveps, man ofte ser i sin have, er den almindelige hveps.",
          "Man kan kende hvepsen på dens sorte og gule farve og den store bagkrop med en lille forkrop. Hvepsens brod har ingen modhager, og den kan stikke flere gange uden at dø. Det sikreste kendetegn over for tysk hveps sidder i ansigtet: et bredt sort mærke, der ligner et anker.",
        ],
        provenance: [`owner ${SHOP}`, `owner+new ${SHOP}`],
      },
      {
        heading: "Hvepsens samfund",
        paragraphs: [
          "Hvepsene lever i et samfund med flere tusinde arbejdere, og i nogle ekstreme tilfælde ses det, at der kan være op til 50 tusinde i ét bo. Arbejdet er delt op: rengøring af celler, bygning af boet, fodring af larverne, hente føde og omsorg for dronningen.",
          "I sensommeren udvikles der frugtbare hunner, som bliver den nye generations dronninger. Den gamle dronning dør hen på efteråret, og det er kun de nye dronninger, der overlever vinteren. De overvintrer i gammelt træ, mos eller i din bolig.",
          "Har du brændeovn, kan de nye dronninger godt gemme sig i det træ, du henter ind. Når de kommer ind i varmen, vågner de op og begynder at flyve rundt, fordi de tror, det er forår.",
        ],
        provenance: [`owner ${SHOP}`, `owner ${SHOP}`, `owner ${SHOP}`],
      },
      {
        heading: "Hvor du finder den",
        paragraphs: [
          "Boet ligger ofte under jorden i gamle muse- eller muldvarpehuller, men den bygger også på lofter og i andre mørke hulrum i og ved bygninger. Bygger den i jorden, kaldes den i daglig tale jordhveps.",
          "Hvepse er mest aktive fra forår til sensommer. Aktiviteten topper typisk i juli, august og september, hvor kolonien er størst. Sidst på sommeren bliver hvepsene ofte mere nærgående, fordi de søger sukkerholdige fødevarer og drikkevarer.",
        ],
        provenance: ["new", `owner ${PRO}`],
      },
      {
        heading: "Hvornår skal du gøre noget?",
        paragraphs: [
          "Gør gerne noget ved hvepseboet i god tid, gerne om foråret, da der kun er én hveps i boet på dette tidspunkt, dronningen. Venter du til midt på sommeren, kan der være 500-1000 hvepse i boet.",
          "Hvepse har også en funktion i naturen. Et fritliggende bo på et roligt sted i haven kan have en anden betydning end et bo ved en ofte brugt dør.",
        ],
        provenance: [`owner ${SHOP}`, `owner ${FAELDE}`],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Plages du af hvepse ved marmeladen, er en fælde relevant. Kombinér den med overdækning af mad, lukkede affaldsbeholdere og oprydning af nedfaldsfrugt. Fælden fanger hvepse, der søger føde, men en fangst fortæller ikke, hvor boet ligger.",
          "Ser du mange følge den samme rute ind i et bestemt hul, er der et bo. Hæld ikke vand i hullet og stop det ikke til, og brug aldrig ild, benzin eller improviseret røg mod et bo.",
          "Et aktivt bo tæt på huset kan du skrive til os om. Send gerne et foto taget på afstand og en beskrivelse af indflyvningsstedet.",
        ],
        provenance: [`owner ${FAELDE}`, `owner+new ${FAELDE}`, `owner ${FAELDE}`],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Almindelig_gedehams", "https://lex.dk/gedehamse"],
  },
  {
    name: "Jordhveps",
    slug: "jordhveps",
    description:
      "Jordhveps er det daglige navn for hvepse, der bygger bo i jorden, i plænen eller under terrassen. Sådan finder du boet, og sådan bliver du af med det.",
    sections: [
      {
        heading: "Hvad er en jordhveps?",
        paragraphs: [
          "Jordhvepse er ikke en selvstændig hvepseart, men betegnelsen bruges om hvepse, der bygger deres bo i jorden. Ofte anlægges boet i gamle muse- eller muldvarpegange, under fliser, ved terrasser, i skråninger eller andre beskyttede områder omkring boligen.",
          "Det er oftest almindelig hveps eller tysk hveps. Hvepsen selv ser ud som de andre hvepse, gul og sort. Det er boets placering, der giver navnet.",
        ],
        provenance: [`owner ${PRO}`, "new"],
      },
      {
        heading: "Hvorfor er de et problem?",
        paragraphs: [
          "Jordhvepse kan være en betydelig gene, fordi boets indgang ofte er svær at opdage, før aktiviteten bliver omfattende. Mange oplever først problemet, når de klipper græs, arbejder i haven eller opholder sig tæt på boet.",
          "Jordhvepse er ikke nødvendigvis mere aggressive end andre hvepsearter, men de opleves ofte som mere problematiske. Det skyldes primært, at mennesker og kæledyr lettere kommer tæt på boet uden at opdage det. Når græsset klippes eller jorden forstyrres, kan kolonien føle sig truet og gå til angreb.",
          "Særligt familier med børn, kæledyr eller personer med allergi oplever jordhvepse som et alvorligt problem.",
        ],
        provenance: [`owner ${PRO}`, `owner ${PRO}`, `owner ${PRO}`],
      },
      {
        heading: "Sådan finder du boet",
        paragraphs: [
          "Et af de tydeligste tegn på et hvepsebo er, at mange hvepse flyver til og fra det samme område. Du kan ofte observere en fast flyverute til et hul i jorden. Jo større boet bliver, desto mere aktivitet vil du typisk opleve.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Hæld ikke kogende vand eller benzin i hullet, og stop det ikke til. Det dræber sjældent hele boet, og de hvepse, der er tilbage, graver sig ud et nyt sted.",
          "Sæt et par pinde ved hullet, så ingen træder på det, og hold børn og husdyr væk. Ligger boet et sted, hvor I færdes, så få det behandlet. Hvis boet forstyrres, kan hvepsene reagere hurtigt og aggressivt, hvilket gør professionel bekæmpelse til den sikreste løsning.",
          "Ligger boet langt nede i haven, hvor ingen kommer, kan du også bare lade det være. Når vinteren kommer, dør arbejderne og den gamle dronning, og det gamle bo genbruges normalt ikke året efter.",
        ],
        provenance: ["new", `owner+new ${PRO}`, `owner+new ${PRO}`],
      },
    ],
    sources: ["https://da.wikipedia.org/wiki/Almindelig_gedehams", "https://lex.dk/gedehamse", "https://en.wikipedia.org/wiki/Vespula_germanica"],
  },
  {
    name: "Hornisse",
    slug: "hornisse",
    latin: "Vespa crabro",
    description:
      "Hornisse, eller stor gedehams, er Danmarks største hveps. Den er roligere end almindelig hveps, men boet kan rumme 400-700 hvepse. Sådan kender du den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Hornisse hedder på dansk også stor gedehams, og det er Danmarks klart største hveps. Arbejderne er op til 24 mm lange, dronningen op til 35-38 mm. Hoved og forkrop er rødbrune, og bagkroppen er sort med orangegule tegninger.",
          "Til trods for størrelsen er hornissen mindre aggressiv end de almindelige gedehamse. Den lokkes heller ikke af søde sager på samme måde, for den er primært rovdyr og jager andre insekter.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Hornissen flyver fra maj til september og bygger sit bo af papmaché-lignende materiale i hule træer, skorstene, loftsrum, fuglekasser og udhæng. Et fuldvoksent bo kan rumme 400-700 individer.",
          "Den findes i det meste af Danmark, hyppigst i den østlige del, og den er i spredning. Det er især sensommeren, der giver henvendelser, fordi boet er størst, og hvepsene er mest på vingerne.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Er den farlig?",
        paragraphs: [
          "Stikket er mere smertefuldt end hos de almindelige hvepse, men hornissen stikker sjældent uden at blive provokeret. Er du allergisk over for hvepsestik, gælder de samme forholdsregler som ved andre hvepse: hold afstand til boet, og rør det ikke.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Behandlingen er den samme som ved andre hvepse: skum eller spray ind i boåbningen om aftenen, eller professionel fjernelse af hele boet. Store bo kræver ofte professionel indsats, fordi hornisserne forsvarer boet koordineret.",
          "Sidder boet i en skorsten eller et loftsrum, er det en god idé at få det fjernet, før efteråret får hvepsene til at søge længere ind i bygningen. Skriv til os, så ser vi på det.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Almindelig hveps og tysk hveps er mindre og skarpere i farverne. Dræberhvepsen fra Asien er endnu ikke etableret i Danmark, men den kan ligne en hornisse, så hold øje med nyheder om den, hvis du ser en meget stor, mørk hveps.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://arter.dk/taxa/118367",
      "https://muldvarpemanden.dk/hvepsebekaempelse/danmarks-stoerste-hveps/",
    ],
  },
  {
    name: "Honningbi og bisværme",
    slug: "honningbi",
    latin: "Apis mellifera",
    description:
      "Honningbier stikker kun én gang og bør ikke bekæmpes. En bisværm indsamles typisk gratis af en biavler. Sådan kender du forskel på bi og hveps.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "En bi er lodden og buttet med afrundet bagkrop og svage gulbrune striber. En hveps er glat og slank med spids bagkrop og skarpe sort-gule striber. Sidder insektet på en blomst og ser lodden ud, er det en bi.",
          "Bier stikker kun én gang, fordi brodden sidder fast, og bien dør bagefter. Hvepse kan stikke igen og igen. Bier er normalt fredelige og stikker kun, hvis de føler sig truet.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Bier bekæmpes ikke",
        paragraphs: [
          "Honningbien er Danmarks vigtigste bestøver, og bestøvningen er ifølge Miljøstyrelsen anslået til omkring 1 mia. kr. om året. Derfor bekæmpes bier ikke. Et biinvasiv er et spørgsmål om tålmodighed og en biavler, ikke om gift.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Bisværme og biboer",
        paragraphs: [
          "Når en bifamilie deler sig, kan en bisværm sætte sig på en gren, en bil eller en husfacade i nogle timer eller dage, mens spejderbierne leder efter et nyt hjem. Kontakt en biavler via Danmarks Biavlerforening — sværme indsamles typisk gratis.",
          "Sidder bierne fast i en mur, et skunk eller en skorsten, er der etableret bibo. Så kan det kræve professionel indsamling at få dem ud igen. Skriv til os, så siger vi, om det er noget, vi kan hjælpe med.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Humlebien er større og tættere behåret; den stikker også kun én gang og er ganske fredelig. Murbier og jordbier, der bruger eksisterende huller i murværk og plænen, er ufarlige, gnaver ikke i murværket og forsvinder som regel af sig selv.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://skadedyrservice.dk/det-er-hoejsaeson-for-hvepse-der-skaber-problemer-for-mange-mennesker/",
      "https://ecostyle.dk/blogs/haveblog/kend-forskel-paa-bier-og-hvepse",
      "https://kvbb-biavl.dk/forsiden/bisv%C3%A6rme.html",
    ],
  },
];

export default articles;
