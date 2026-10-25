import type { SpeciesArticle } from "../speciesContent";

const PRO = "https://billigskadedyrprof.dk/service/moel/";
const TOEJ = "https://billigskadedyr.dk/moel-i-toej/";
const FAELDER = "https://billigskadedyr.dk/moelfaelder-feromon-overvaagning/";
const TOERVARER = "https://billigskadedyr.dk/skadedyr-i-mel-og-toervarer-2/";

// Bolius puts the true melmøl mostly in bakeries and calls tofarvet frømøl the
// common kitchen moth; his own tørvarer article says the same, so the melmøl
// article names both rather than pick one silently.
const articles: SpeciesArticle[] = [
  {
    name: "Klædemøl",
    slug: "klaedemoel",
    latin: "Tineola bisselliella",
    description:
      "Klædemøllets larve laver huller i uld, kashmir, silke og pels. Sådan kender du det, hvor larverne gemmer sig, og hvordan du får dem ud af tøjet.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Klædemøllet er et lille, blankt gulligt møl på 5-7 mm med en rødlig hårtot på hovedet.",
          "Møllarver er typisk 5-15 mm lange med en lys, hvidlig eller cremefarvet krop og et mørkere hoved. Klædemøllarver holder sig skjult mellem tekstilerne, hvor de lever af naturfibre.",
        ],
        provenance: ["new", `owner ${PRO}`],
      },
      {
        heading: "Hvad lever det af?",
        paragraphs: [
          "Klædemøl spiser naturmaterialer: uld, kashmir, silke, fjer, pels, tæpper og plaider. Bomuld og syntetiske materialer rører de ikke. Det er larverne, der gnaver de små huller. Ofte opdager du angrebet først flere måneder senere.",
          "De voksne møl gør ingen skade. De er der for at lægge æg. Så gå ikke kun efter de møl, der flyver rundt — bekæmp æg og larver også.",
        ],
        provenance: [`owner ${PRO}`, `owner ${PRO}`],
      },
      {
        heading: "Hvor du finder det",
        paragraphs: [
          "Klædemøl trives, hvor tøj ligger ubrugt længe: i mørke skabe, på lofter, i kældre og sommerhuse, blandt uldtæpper og plaider. De vil have ro, mørke og adgang til naturfibre.",
          "Ofte er det hullerne i yndlingstrøjen, uldtæppet eller jakkesættet, der afslører det. Mange kunder siger til os: Vi troede bare, der var kommet et par små sommerfugle ind ad vinduet. På det tidspunkt kan der allerede ligge flere generationer af larver gemt i skabe, paneler, revner eller blandt opbevarede tekstiler.",
        ],
        provenance: [`owner ${PRO}`, `owner ${PRO}`],
      },
      {
        heading: "Tegn på klædemøl",
        paragraphs: [
          "Små huller i uldtøj, skader på tæpper, larvehylstre i skabe, små lyse larver, møl omkring garderoben og skader på opbevarede tekstiler. Jo før du opdager det, jo mindre bliver skaden som regel.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Sådan kommer du af med det",
        paragraphs: [
          "Start med de genstande, hvor skaden er synlig, og undersøg så det, der ligger tæt på. Se i folder, lommer og sømme og langs kanterne på tæpper. Kig efter larver, spind og rester omkring skaden.",
          "Læg berørte genstande i lukkede poser, før du flytter dem gennem boligen. Vask eller rens efter tekstilets vaskeanvisning, og sig til renseriet, at du har mistanke om møl. En kort tur i en almindelig fryser er ikke en dokumenteret metode.",
          "Tøm det berørte område, og støvsug sprækker, hylder og kanter grundigt. Sprøjt ikke vilkårligt på tøj eller sengetøj. Insektmiddel må kun bruges på de materialer og steder, som etiketten tillader.",
          "En feromonfælde til klædemøl kan vise, om der stadig kommer møl, men den fanger mest de voksne hanner og fjerner hverken æg eller larver. Kommer møllene igen og igen, eller sidder de i tæpper og værdifulde tekstiler, så skriv til os.",
        ],
        provenance: [`owner ${TOEJ}`, `owner ${TOEJ}`, `owner ${TOEJ}`, `owner ${PRO} + ${TOEJ}`],
      },
      {
        heading: "Forebyg klædemøl",
        paragraphs: [
          "Luft og gennemgå garderoben med jævne mellemrum. Opbevar rent uldtøj i tætsluttende poser eller kasser. Støvsug skabe, gulvlister og tæpper regelmæssigt. Vask eller rens tøjet, inden det lægges væk for sæsonen, og reager hurtigt, hvis du ser små huller i naturmaterialer.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Huller alene afgør ikke arten. Larver af visse biller kan også ødelægge tekstiler. Hårede larver eller larvehuder kan være pelsklanner eller museumsbille. Pelsmøllet laver samme slags skade, men dets larve slæber et lille rør med sig.",
        ],
        provenance: [`owner+new ${TOEJ}`],
      },
    ],
    sources: [
      "https://dcapub.au.dk/djfpdf/moelitex2007.pdf",
      "https://en.wikipedia.org/wiki/Tineola_bisselliella",
    ],
  },
  {
    name: "Melmøl",
    slug: "melmoel",
    latin: "Ephestia kuehniella",
    description:
      "Melmøl og andre madmøl lever i mel, gryn, nødder, dyrefoder og fuglefoder. Sådan finder du kilden i køkkenskabet og får møllet ud igen.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Det rigtige melmøl har blågrå forvinger med mørke zigzag-linjer. Larven er lys med mørkt hoved.",
          "Mange opdager først problemet, når de ser små larver eller spind i mel, gryn eller andre tørvarer. På det tidspunkt har møllene ofte spredt sig til flere skabe.",
        ],
        provenance: ["new", `owner ${PRO}`],
      },
      {
        heading: "Hvad lever det af?",
        paragraphs: [
          "Melmøl angriber tørre fødevarer som mel, havregryn, müsli, pasta, ris, nødder, frø, krydderier, dyrefoder og fuglefoder. De voksne møl lægger æg direkte i eller tæt ved fødevarerne, og larverne forurener indholdet med spind, ekskrementer og hudskifter.",
          "Fødevaremøl er en fællesbetegnelse, ikke navnet på én bestemt art. Tofarvet frømøl er en af arterne, der kan optræde i køkkenets tørvarer. Det voksne dyr har en lysere indre del og en mørkere, kobberbrun ydre del på forvingerne. Det ægte melmøl ses især i bagerier og virksomheder, der opbevarer mel.",
        ],
        provenance: [`owner ${PRO}`, `owner+new ${TOERVARER}`],
      },
      {
        heading: "Hvorfor får man melmøl?",
        paragraphs: [
          "Selv et rent hjem kan få møl. De kommer ofte med hjem i varer, der allerede indeholder æg eller larver, da du køber dem. Ofte opdager du det først flere uger senere, når de voksne møl begynder at flyve rundt i køkkenet.",
          "Vi ser ofte, at det starter i en pose fuglefoder eller hundefoder, der har stået længe i bryggerset eller garagen. Ét angrebet produkt kan være nok til, at bestanden spreder sig til hele køkkenet.",
        ],
        provenance: [`owner ${PRO}`, `owner ${PRO}`],
      },
      {
        heading: "Hvorfor ser jeg larver på væggene?",
        paragraphs: [
          "Når larverne er færdigudviklede, forlader de fødevarerne og kravler op ad vægge og lofter for at finde et beskyttet sted at forpuppe sig. Derfor tror mange fejlagtigt, at problemet kommer fra loftet eller væggene.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Sådan kommer du af med det",
        paragraphs: [
          "Start ved det skab, hvor du har fundet flest tegn. Kassér varer med tydelige larver, spind eller anden forurening, luk dem inde, og fjern dem fra boligen. Du behøver ikke kassere alt i alle skabene, fordi én pose er angrebet. Undersøg de øvrige varer grundigt, og husk også de uåbnede pakker.",
          "Når skabet er tømt, kan du komme til samlinger, hyldekanter og sprækker. Støvsug, rengør, og lad skabet tørre, før varerne sættes tilbage. Brug ikke insektspray på mad, emballage eller flader, hvor maden ligger.",
          "En feromonfælde til fødevaremøl kan vise, at der stadig flyver voksne dyr, og hjælpe dig med at følge udviklingen. Den fjerner ikke æg, larver og pupper. At fælden står tom en enkelt dag, er ikke nok at gå efter.",
          "Kommer der møl igen, efter du har ryddet op, kan en professionel hjælpe med at finde oversete varer eller skjulte steder, hvor der ligger føde.",
        ],
        provenance: [`owner ${TOERVARER}`, `owner ${TOERVARER}`, `owner ${TOERVARER} + ${FAELDER}`, `owner ${TOERVARER}`],
      },
      {
        heading: "Forebyg melmøl",
        paragraphs: [
          "Opbevar mel, gryn, ris, pasta og nødder i tætsluttende beholdere. Støvsug jævnligt køkkenskabe og hylder, især i hjørner og samlinger. Fjern gamle eller glemte madvarer bagerst i skabene, og opbevar fuglefoder og dyrefoder i lukkede beholdere.",
        ],
        provenance: [`owner ${PRO}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Små biller i mel skal identificeres anderledes end flyvende møl på samme hylde. Og en fælde til klædemøl fanger ikke nødvendigvis møl i køkkenet. Møl i køkkenet eller larver i tørvarer er næsten altid melmøl eller et andet fødevaremøl. Huller i uldtøj er ofte klædemøl.",
        ],
        provenance: [`owner ${TOERVARER} + ${PRO}`],
      },
    ],
    sources: [
      "https://lex.dk/melmøl",
      "https://www.bolius.dk/moel-i-madvarer-saadan-slipper-du-af-med-dem-20969",
      "https://en.wikipedia.org/wiki/Ephestia_kuehniella",
    ],
  },
  {
    name: "Pelsmøl",
    slug: "pelsmoel",
    latin: "Tinea pellionella",
    description:
      "Pelsmøllets larve lever i et lille rør og gnaver i pels, uld og tæpper. Den vandrer op ad væggen for at forpuppe sig. Sådan finder og fjerner du den.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Pelsmøllet er sølvgråt til lysebrunt med et par mørke pletter på forvingerne. Det er på størrelse med klædemøllet.",
          "Kendemærket er larven. Den bygger et lille rør af spind, fibre og hår og bærer det med sig, når den flytter sig.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Levevis",
        paragraphs: [
          "Pelsmøllet lever også ude i naturen, fx i fuglereder. Ligesom hos klædemøllet er det larverne, der laver skaden. De voksne møl lægger bare æg.",
          "Når larven er udvokset, forlader den tit det, den har levet i, og vandrer op ad væggen for at forpuppe sig i revner mellem væg og loft og under lister.",
        ],
        provenance: [`owner+new ${PRO}`, "new"],
      },
      {
        heading: "Hvor du finder det",
        paragraphs: [
          "Larven går i pels, uldtøj, tæpper og møbelbetræk. Den trives, hvor der er ro, mørke og adgang til naturfibre, og den kan sidde i gamle fuglereder på loftet.",
        ],
        provenance: [`owner+new ${PRO}`],
      },
      {
        heading: "Sådan kommer du af med det",
        paragraphs: [
          "Gør som ved klædemøl. Se i folder, lommer og sømme og langs kanterne på tæpper. Læg berørte genstande i lukkede poser, før du flytter dem gennem boligen, og vask eller rens efter tekstilets vaskeanvisning.",
          "Med pelsmøl skal du huske, at larverne kan have gemt sig i sprækker i skab og skuffer, ved loftet og i æsker og poser, der har stået sammen med det angrebne. Tøm det berørte område, og støvsug sprækker, hylder og kanter grundigt.",
          "Sidder det i store tæpper, møbler eller flere rum, så skriv til os.",
        ],
        provenance: [`owner ${TOEJ}`, `owner+new ${TOEJ}`, `owner ${TOEJ}`],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Klædemøllets larve har intet rør, kun et spind, der sidder fast på stoffet. Pelsklannerens larve er brun og lodden. Huller alene afgør ikke arten.",
        ],
        provenance: [`owner+new ${TOEJ}`],
      },
    ],
    sources: [
      "https://dcapub.au.dk/djfpdf/moelitex2007.pdf",
      "https://en.wikipedia.org/wiki/Tinea_pellionella",
    ],
  },
  {
    name: "Tofarvet frømøl",
    slug: "tofarvet-froemol",
    latin: "Plodia interpunctella",
    description:
      "Tofarvet frømøl er det almindeligste madmøl i danske køkkener. Det kommer næsten altid med hjem i en pose fra supermarkedet. Sådan finder du kilden.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Den forreste tredjedel af vingen er lysegrå, resten glinsende kobberrød — deraf navnet tofarvet frømøl. Det er ca. 1 cm som voksen. Larven er gulhvid, 12-13 mm lang med mørkt hoved.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvad lever det af?",
        paragraphs: [
          "Det lever af tørret frugt, nødder, mandler, mel, gryn, müsli, pasta og fuglefrø. Det kommer næsten altid med hjem i en pose fra supermarkedet. Du opdager det ofte ikke med det samme, fordi æggene allerede sidder i varen.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Tegn på angreb",
        paragraphs: [
          "Du ser møl svæve i køkkenet, klistret spind i gryn og mel, klumpede gråbrune madvarer og pupper i silkekokoner langs loftslister og øverst i skabene. Møllene er ikke farlige at spise, men madvarerne skal kasseres.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med det",
        paragraphs: [
          "Find kilden og kassér den i en tætlukket pose. Støvsug skabene grundigt — revner, øverste hylder og kanten mellem væg og loft — og smid posen ud med det samme. Tør efter med en eddikeklud.",
          "Hæld rester af tørvarer over i tætsluttende beholdere, og frys angrebne rester ved -18 grader i 2 dage, så æg og larver er døde, før varen sættes tilbage.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Melmøllet er større og ses især i bagerier og virksomheder, der opbevarer mel. Klædemøllet findes i tøjet, ikke i maden. Er du i tvivl om, hvad der flyver rundt i køkkenet, så send os et billede.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.bolius.dk/moel-i-madvarer-saadan-slipper-du-af-med-dem-20969",
      "https://www.pestlex.com/da/melmoel",
    ],
  },
  {
    name: "Melbiller",
    slug: "melbiller",
    latin: "Alphitobius diaperinus, Tribolium spp.",
    description:
      "Melbiller er små, mørke biller i mel, gryn og pasta. Deres larver kaldes populært melorme. Sådan finder du kilden og rydder skabene.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Melbillerne er små, 3-6 mm lange, mørke og aflange biller. De lever af tørre fødevarer som mel, gryn, pasta, müsli, nødder, tørret frugt og dyrefoder, og de kommer typisk med hjem i en inficeret vare fra butikken.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "En hun kan lægge op til 500 æg direkte i fødevarerne, og hele livscyklussen tager 1-2 måneder. Et lille angreb kan derfor vokse hurtigt. Larverne kaldes populært melorme.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Tegn på angreb",
        paragraphs: [
          "Se efter grålig misfarvning, en harsk eller sødlig lugt og små brune klumper eller larver i pakningen. De voksne biller ses i skabe, skuffer og på køkkenbordet.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med dem",
        paragraphs: [
          "Kassér alle mistænkte tørvarer i tætlukkede poser. Rengør skabene med varmt vand og sæbe, støvsug grundigt i sprækkerne, og smid støvsugerposen straks ud eller frys den i 48 timer.",
          "Opbevar mel, gryn og pasta i tætsluttende beholdere fremover. Ved store eller gentagne angreb, fx i foderlagre, kræver det professionel behandling.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Kornsnudebillen har en tydelig snude og huler kornkornene ud indefra. Tofarvet frømøl flyver, hvor billerne kravler.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.anticimex.dk/melbiller/",
      "https://denrodemyre.dk/melbiller/",
      "https://www.pestium.dk/dpil/melbille/",
    ],
  },
  {
    name: "Voksmøl",
    slug: "voksmoel",
    latin: "Galleria mellonella",
    description:
      "Voksmøllets larver, voksormene, lever af bivoks i bistader og er et kendt skadedyr i biavlen. I almindelige hjem er de sjældent et problem.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Voksmøllene er gråbrune møl, hvis larver — kaldet voksorme — lever af bivoks, honning og pollen i bistader. Mange kender voksorme som levende foder til krybdyr og fugle.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Hvor det er et problem",
        paragraphs: [
          "I biavlen er voksmøllet et klassisk skadedyr, især i lagrede tavler og hos svækkede bifamilier. Hunnen kan lægge ca. 1.000 æg i voksbygningen, og larverne gnaver gange med sejt silkespind i tavlerne.",
        ],
        provenance: ["new"],
      },
      {
        heading: "I hjemmet",
        paragraphs: [
          "I et almindeligt hjem er voksmøl sjældent et praktisk problem. Finder du møl i køkkenets tørvarer, er det næsten altid tofarvet frømøl eller melbiller. Voksmøl er det sjældent.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan bekæmpes det i biavlen",
        paragraphs: [
          "Biavler bekæmper med eddikesyre i tavlelagrene, jomfrutavler og stærke, sunde bifamilier. Er du biavler med angreb, så søg råd i den lokale biavlsforening.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Melbille-larverne i mel og gryn kaldes også melorme, men de er et skadedyr i madvarerne, og det er voksormen ikke. Voksormen er hvidlig og lever i voks, ikke i mel.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://bisygdom.dk/da/catalogue/disease/21",
      "https://www.aalborgbiavl.dk/images/PDF/Jubil%C3%A6umsbog%202016.pdf",
    ],
  },
  {
    name: "Kornsnudebille",
    slug: "kornsnudebille",
    latin: "Sitophilus granarius",
    description:
      "Kornsnudebillen er en lille brun bille med lang snude, hvis larver udvikler sig inde i kornkornene. Sådan opdager du angrebet og slipper af med det.",
    sections: [
      {
        heading: "Kendetegn",
        paragraphs: [
          "Kornsnudebillen er 3-4 mm lang, mørkbrun og har en karakteristisk lang, nedadbøjet snude. Du ser den i køkkenskabe og kornlagre, og den kommer med hjem i inficerede varer.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Levevis og livscyklus",
        paragraphs: [
          "Larverne udvikler sig inde i kornkornene. Hvert korn hules ud indefra, så et angreb ses som meldt korn med fine meldannelser og små runde udgangshuller. Den angriber ris, korn, gryn og pasta.",
        ],
        provenance: ["new"],
      },
      {
        heading: "Sådan kommer du af med den",
        paragraphs: [
          "Kassér de inficerede varer, tøm og støvsug skabene grundigt, og opbevar ris, korn og pasta i tætsluttende beholdere fremover. Så kan billen ikke sprede sig videre.",
          "Ved store lagre eller gentagne angreb anvendes phosphorbrinte, men det må kun udføres af autoriserede bekæmpere.",
        ],
        provenance: ["new", "new"],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Melbillerne mangler snuden og lægger æg i de tørre varer. Tofarvet frømøl er et flyvende møl, ikke en bille.",
        ],
        provenance: ["new"],
      },
    ],
    sources: [
      "https://www.anticimex.dk/kornsnudebiller/",
      "https://www.pestium.dk/dpil/kornsnudebille/",
    ],
  },
];

export default articles;
