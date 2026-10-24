import type { SpeciesArticle } from "../speciesContent";

// Provenance for the owner's review. Never rendered.
const SK = "owner https://billigskadedyrprof.dk/service/skaegkrae/";
const SF = "owner https://billigskadedyrprof.dk/service/soelvfisk/";
const FAQ = "owner https://billigskadedyrprof.dk/faq/";
const SKB = "owner https://billigskadedyr.dk/saadan-bekaemper-du-skaegkrae/";
const SKM = "owner https://billigskadedyr.dk/har-jeg-skaegkrae-guide-til-monitorering/";

const articles: SpeciesArticle[] = [
  {
    name: "Skægkræ",
    slug: "skaegkrae",
    latin: "Ctenolepisma longicaudata",
    description:
      "Skægkræ ligner sølvfisk, men er større, kan leve i tørre rum og kravler op ad væggene. Sådan kender du det, og sådan kommer du af med det.",
    sections: [
      {
        heading: "Hvad er skægkræ?",
        paragraphs: [
          "Skægkræ er et vingeløst insekt, der minder om sølvfisk, men som er større, mere mobile og langt sværere at slippe af med. De har små hår ned ad siden, også kaldet skæg, kan blive op til 20 mm i længden og er udstyret med antenner, som de bruger til at føle med.",
          "Langt de fleste danskere er vokset op med sølvfisk i deres hjem og ser dem ikke som det helt store skadedyr. Det var lige indtil sølvfiskens lidt større fætter flyttede til Danmark i 2016. Skægkræ er derfor et forholdsvis nyt skadedyr, som de fleste vil identificere som en sølvfisk.",
        ],
        provenance: [SK, SK],
      },
      {
        heading: "Hvor lever skægkræ?",
        paragraphs: [
          "Skægkræet foretrækker at opholde sig mørkt og tørt. Det er derfor meget normalt at finde dem i både din bogreol, køkkenskabe, vasketøjskurv og endda også i din seng. Da de er meget små i den første fase af deres liv, kan de nemt finde vej i selv de mindste sprækker i din bolig.",
          "I modsætning til sølvfisk er skægkræ ikke afhængige af høj luftfugtighed. De mest almindelige steder er langs paneler og fodlister, bag møbler og reoler, i entré og gangarealer, i køkkenets sokkelområder og i soveværelser og stuer.",
          "Fuldvoksne skægkræ kan overleve i meget lang tid uden at indtage føde. Man regner med, at de kan overleve hele 10 måneder uden føde.",
        ],
        provenance: [SK, SKM, SK],
      },
      {
        heading: "Hvad lever skægkræ af?",
        paragraphs: [
          "Skægkræ lever af stivelse, et tørstof som findes i næsten alt i din bolig. Det er et bindemateriale, som især bruges i tørre madvarer såsom havregryn, mel, sukker og brød, og i papir, bøger, malerier, klistermærker, tapet og billeder.",
          "Skægkræ er ikke skadelige eller sundhedsfarlige og hverken bider eller stikker. De kan dog gøre skade på materiel såsom papir, bøger, malerier, billeder og fotos.",
        ],
        provenance: [SK, SK],
      },
      {
        heading: "Hvor kommer de fra?",
        paragraphs: [
          "De fleste skægkræ formodes at komme ind via papkasser, måltidskasser eller post og pakker. Åbn derfor dine kasser udenfor, så du ikke slipper skægkræet løs i din bolig.",
          "De er også fundet på en del skoler, børnehaver, varehuse og arbejdspladser. Disse steder står oftest tomme om natten, og derfra kan insektet følge med i dine sko eller din taske, så du tager dem med hjem.",
        ],
        provenance: [SKB, SK],
      },
      {
        heading: "Hvordan ved jeg, om der er skægkræ?",
        paragraphs: [
          "Det kan være meget svært at vide, om der er skægkræ i din bolig, uden at fange dem. De er nataktive og ses ofte om aftenen eller natten, så hold godt øje, når du tænder lys i mørke rum.",
          "En god måde at finde ud af det på er klisterfælder med lokkemad. Mange begår den fejl kun at placere én fælde dér, hvor de har set et insekt. Skægkræ bevæger sig rundt i hele boligen, så sæt fælder langs vægge og i mørke områder i flere rum.",
        ],
        provenance: [SK, SK + " + " + SKM.replace("owner ", "")],
      },
      {
        heading: "Sådan kommer du af med det",
        paragraphs: [
          "Gør rent ofte, specielt i køkkenskabe og skuffer med mad, og støvsug grundigt så ofte som muligt. Læg mel, sukker og andre tørvarer i lufttætte kasser. Det kan også være en god idé at fjerne klistermærker og stregkoder, for skægkræ kan leve af limen.",
          "Vil du prøve selv, kan du starte med klisterfælder med lokkemad. Efter en uges tid kan du se, hvor i din bolig insekterne kommer fra, og flytte fælderne derhen. Ædegift kan skydes ind under lister og paneler uden besvær og har både til formål at tiltrække og udrydde skægkræet.",
          "Mindre forekomster kan midlertidigt reduceres med fælder, men skægkræ forsvinder sjældent permanent uden professionel behandling. Ser du dem i flere rum, eller vender problemet tilbage efter egen behandling, så kontakt os. Bor du i lejlighed og deler væg med naboer, er det et spørgsmål om tid, før de kommer igen, medmindre dine naboer også får behandlet.",
        ],
        provenance: [SKB, SKB, SK],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Sølvfisk. Udover at være en del større kan skægkræ leve under en lavere luftfugtighed og derfor ikke kun i vådrum såsom badeværelse og bryggers. De kan også bevæge sig op ad lodrette flader modsat sølvfisk. Ser du de sølvgrå insekter flere steder i boligen, eller kan de bevæge sig op ad glatte vægge, er der ofte tale om skægkræ.",
        ],
        provenance: [SK + " + " + FAQ.replace("owner ", "")],
      },
    ],
    sources: [
      "https://www.bolius.dk/saadan-faar-du-bugt-med-skaegkrae-i-boligen-91693",
    ],
  },
  {
    name: "Sølvfisk",
    slug: "soelvfisk",
    latin: "Lepisma saccharina",
    description:
      "Sølvfisk holder til i fugtige rum som badeværelse og bryggers. Sådan kender du dem fra skægkræ, og sådan holder du dem nede uden gift.",
    sections: [
      {
        heading: "Er det sølvfisk – eller har du skægkræ?",
        paragraphs: [
          "Mange tror, at de har sølvfisk, når de opdager små sølvgrå insekter i boligen. I virkeligheden viser vores erfaring, at en stor del af de henvendelser, vi modtager om sølvfisk, i stedet skyldes skægkræ. De to insekter ligner hinanden meget, men kræver ofte en forskellig tilgang.",
          "Du har sandsynligvis sølvfisk, hvis de kun ses på badeværelset eller i andre fugtige rum, hvis de forsvinder hurtigt ned i afløb eller sprækker, hvis de sjældent ses om dagen, og hvis de har svært ved at bevæge sig op ad glatte vægge.",
          "Du har sandsynligvis skægkræ, hvis de findes i stue, køkken eller soveværelse, ses flere steder i boligen, kan kravle op ad glatte vægge, skabe og døre, eller du finder dem i papkasser, skabe eller bag lister.",
        ],
        provenance: [SF, SF, SF],
      },
      {
        heading: "Kendetegn og levevis",
        paragraphs: [
          "Sølvfisk er et lille, vingeløst insekt med en sølvgrå krop og en karakteristisk bugtende bevægelse. De trives bedst i varme og fugtige omgivelser og findes derfor typisk på badeværelser, i bryggers, kældre og andre rum med høj luftfugtighed.",
          "Sølvfisk er primært nataktive og gemmer sig i revner, sprækker og omkring afløb om dagen. Ser du mange sølvfisk i dagslys, kan det være tegn på, at bestanden er blevet stor.",
        ],
        provenance: [FAQ, FAQ],
      },
      {
        heading: "Hvad lever sølvfisk af?",
        paragraphs: [
          "Sølvfisk lever af små mængder organisk materiale. De spiser blandt andet sæberester, hudskæl, skimmel, papir, stivelse og andre organiske rester. Derfor ses de ofte omkring afløb, under skabe og i fugtige hjørner.",
          "Sølvfisk lever normalt ikke inde i selve afløbet, men de opholder sig ofte omkring gulvafløb, hvor der er fugt og adgang til sæberester og organisk materiale.",
        ],
        provenance: [FAQ, FAQ],
      },
      {
        heading: "Er de skadelige?",
        paragraphs: [
          "Nej. Sølvfisk er ikke farlige for mennesker eller kæledyr. De bider ikke, stikker ikke og overfører ikke sygdomme. De betragtes primært som et tegn på høj luftfugtighed eller adgang til fødekilder. Ser du mange sølvfisk, kan det derfor være en god idé at undersøge fugtforholdene i boligen.",
        ],
        provenance: [FAQ],
      },
      {
        heading: "Den bedste behandling mod sølvfisk",
        paragraphs: [
          "Hvis du er sikker på, at det er almindelige sølvfisk, er den mest effektive løsning som regel ikke en kemisk behandling. Rens gulvafløb regelmæssigt, fjern sæberester, hold badeværelset tørt efter bad, sørg for god ventilation, tør vand op fra gulve, reparer eventuelle fugtskader og støvsug langs paneler og i hjørner.",
          "Jo mindre fugt og føde der er til rådighed, desto dårligere trives sølvfisk. Hvis fugten fortsat er høj, eller der stadig findes sæberester og andre fødekilder, vil sølvfiskene vende tilbage.",
          "Du er altid velkommen til at kontakte os, hvis du er i tvivl om, hvilket insekt du har fundet. Hvis det viser sig at være almindelige sølvfisk, rådgiver vi dig om, hvordan problemet bedst løses.",
        ],
        provenance: [SF, SF + " + " + FAQ.replace("owner ", ""), SF],
      },
      {
        heading: "Forveksles med",
        paragraphs: [
          "Skægkræ. Almindelige sølvfisk holder sig som regel til fugtige rum. Finder du sølvlignende insekter i hele boligen, er det ofte et tegn på, at der er tale om skægkræ. Skægkræ trives nemlig også i tørre rum og spreder sig langt lettere end sølvfisk.",
        ],
        provenance: [FAQ],
      },
    ],
    sources: ["https://en.wikipedia.org/wiki/Silverfish", "https://da.wikipedia.org/wiki/Sølvkræ", "https://www.bolius.dk/saadan-faar-du-bugt-med-skaegkrae-i-boligen-91693"],
  },
];

export default articles;
