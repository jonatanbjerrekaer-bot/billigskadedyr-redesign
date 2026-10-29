/**
 * How the treatment actually runs, one entry per service. Rendered as a
 * collapsed "Sådan udfører vi behandlingen" section on every service and
 * species page, so a reader can see exactly what a visit involves before
 * writing to us.
 *
 * Written from the owner's own service articles (raw copies in
 * docs/owner-copy/prof-service-*.md) where one exists. Where no article
 * exists, the entry is drafted from the service page's own processNote and
 * marked DRAFT — the owner must read and approve it before it goes live.
 * Nothing here recommends a specific product the reader should buy and apply
 * himself; the section describes what WE do on the visit.
 *
 * Species pages inherit their service's entry. A species where the parent's
 * method would be wrong (a protected animal, a different pest that merely
 * resembles it) has an override in SPECIES_TREATMENT_OVERRIDES keyed
 * "<service>/<slug>".
 */
export type TreatmentDetails = {
  /** One or two sentences: what the visit is built around. */
  intro: string;
  /** The concrete actions, in the order we do them. */
  steps: string[];
  /** What the household must do (or refrain from doing) afterwards. */
  aftercare?: string[];
  /**
   * True when there is no treatment to sell: protected or harmless species.
   * The UI then leads with the assessment rather than a method.
   */
  assessmentOnly?: boolean;
};

// ---- Owner-backed entries (docs/owner-copy/prof-service-*.md) ----

const gaasebiller: TreatmentDetails = {
  intro:
    "En behandling af gåsebiller starter altid med at fastslå, hvilken larve der sidder i plænen, fordi middel og tidspunkt afhænger af det.",
  steps: [
    "Vi går plænen igennem og ser på larvetype, hvor dybt larverne ligger, hvor stort det angrebne areal er, og hvor meget af rødderne der er ædt. Vi ser også efter den sekundære skade, hvor fugle har hakker huller for at nå larverne.",
    "Vi behandler det angrebne areal med et professionelt middel, der når ned i den øverste del af jorden og rodzonen, hvor larverne lever.",
    "Du får besked om, hvor længe plænen skal have lov at ligge, inden børn og husdyr må bruge den igen.",
  ],
};

const myrer: TreatmentDetails = {
  intro:
    "Professionel myrebekæmpelse handler om at finde boet og behandle det direkte, i stedet for kun at ramme de myrer, du kan se.",
  steps: [
    "Vi fastlægger først, hvilken myreart du har med at gøre, og hvor reden sidder, fordi metoden afhænger af begge dele.",
    "Udenfor behandler vi langs fundamentet og omkring krukker, planter, store sten, sandkasser og overgangen mellem fliser og græs, samt alle steder med synlig aktivitet.",
    "Er myrerne kommet indenfor, behandler vi de rum, hvor der er aktivitet.",
  ],
  aftercare: [
    "Brug ikke andre kemikalier i området, mens behandlingen skal virke.",
    "Rengør, støvsug og vask ikke de behandlede kanter de første 14 dage.",
  ],
};

const skaegkrae: TreatmentDetails = {
  intro:
    "Skægkræ behandles i ét besøg, hvor vi kombinerer to metoder, så både de synlige dyr og dem, der sidder i skjulestederne, bliver ramt.",
  steps: [
    "Vi lægger gel under lister, hvidevarer, skabe og skuffer, hvor skægkræene færdes og leder efter føde.",
    "Samtidig behandler vi med et hurtigtvirkende middel, så de dyr, der allerede er ude, bliver ramt med det samme.",
  ],
  aftercare: ["Rengør ikke oven på behandlingen de første 14 dage, så giften når at sprede sig i bestanden."],
};

const soelvfiskArt: TreatmentDetails = {
  intro:
    "Almindelige sølvfisk er et tegn på fugt, og derfor går behandlingen efter årsagen — ikke kun efter dyrene.",
  steps: [
    "Vi gennemgår de fugtige zoner — kælder, bryggers, badeværelse og køkken — og finder de utætheder og fødekilder, som sølvfiskene lever af.",
    "Vi behandler revner, områder bag fodlister og de steder, hvor der er aktivitet.",
    "Du får konkret besked om, hvad der skal udtørres eller udbedres, så forholdene ikke lokker nye sølvfisk til.",
  ],
};

const edderkopper: TreatmentDetails = {
  intro:
    "Behandlingen er udendørs, hvor edderkopperne sidder — ikke inde i boligen, som en støvsuger ellers skulle nå rundt i.",
  steps: [
    "Vi behandler hække, buske og træer omkring huset, hvor edderkopperne bygger deres spind.",
    "Vi behandler hegn, havemøbler, lamper, tagrender, overhæng, vinduer og døre — alle de steder, hvor spind og dyr samler sig.",
  ],
  aftercare: ["Vask ikke de behandlede overflader de første 14 dage, så midlets virkning holder."],
};

const borebiller: TreatmentDetails = {
  intro:
    "Borebillebehandling er et håndværk: midlet skal ind i træet, og derfor gøres grundigt rent, før vi går i gang.",
  steps: [
    "Vi fastlægger først, hvor vidt angrebet har spredt sig, så behandlingen rammer alt det angrebne træværk — ikke kun det, hvor du ser hullerne.",
    "Det angrebne træværk gøres grundigt rent med industristøvsuger og sæbevand, så overfladen er klar til at tage imod midlet.",
    "Vi påfører et godkendt, olieret middel i 2-3 omgange i løbet af det samme besøg, indtil træet er mættet og ikke kan tage mere. Det er påføringsomgange, ikke flere besøg.",
  ],
};

const moel: TreatmentDetails = {
  intro:
    "Mølbekæmpelse handler om at finde kilden. Før vi behandler, ved vi, hvilken mølart det er, og hvor den lever.",
  steps: [
    "Vi gennemgår køkken, tørvarer, skabe, tekstiler, opbevaring, dyrefoder og fuglefoder og identificerer både art og kilde.",
    "Materiale, der er angrebet, fjernes, hvor det er det rigtige at gøre det.",
    "Vi behandler målrettet de steder, hvor larverne sidder, og holder øje med, om der kommer liv i resten af bestanden.",
  ],
};

const fluer: TreatmentDetails = {
  intro:
    "Fluer forsvinder ikke, før kilden er væk, så behandlingen starter med at finde den.",
  steps: [
    "Vi identificerer flueartens hvile- og ynglesteder: affald, afløb, modne frugter, et dødt dyr i konstruktionen eller noget helt fjerde.",
    "Vi behandler vinduer, vinduesrammer, vægge, lofter, solrige facader og de steder, hvor der er produktion, affald eller opstaldning — overalt hvor fluerne samler sig.",
  ],
};

const vaeggelus: TreatmentDetails = {
  intro:
    "Væggelus kræver grundighed: dyrene gemmer sig millimeter fra, hvor du sover, og en overfladisk behandling rammer dem ikke.",
  steps: [
    "Vi gennemgår boligen og finder angrebets omfang og alle skjulesteder: sømme, fodlister, bag løst tapet, senge, møbler og sprækker.",
    "Du får præcis besked om, hvad der skal vaskes, ryddes og klargøres, før behandlingen sættes i gang.",
    "Vi vælger varme- eller kemisk behandling ud fra situationen — begge dele udført med professionelt udstyr og godkendte midler.",
    "Du får konkret efterbehandling og råd, så resterende æg og dyr bliver fanget, og så risikoen for nye angreb minimeres.",
  ],
};

const hvepse: TreatmentDetails = {
  intro:
    "Et hvepsebo behandles, mens kolonien er hjemme, så hele boet — også dronningen — bliver ramt.",
  steps: [
    "Vi lokaliserer boet og vurderer aktiviteten og placeringen, så vi kan ramme kolonien uden at udsætte dig eller omgivelserne for stik.",
    "Vi behandler boet med professionelle produkter og det udstyr, opgaven kræver — også når det sidder et besværligt sted.",
    "Stedet efterbehandler vi, så nye hvepse ikke bygger bo samme sted igen.",
  ],
  aftercare: [
    "Hold døre og vinduer tæt på boet lukkede i op til et par døgn, mens behandlingen virker.",
  ],
};

// ---- Draft entries (no owner treatment article; owner must approve) ----

const myg: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Myg bekæmpes bedst ved at ramme det vand, de yngler i — ikke kun de myg, der allerede er flået ind.",
  steps: [
    "Vi går rundt om huset og finder det stillestående vand, myggene yngler i: tagrender, regnbeholdere, hjulspor og andre skjulte steder.",
    "Vi behandler ynglestederne og de steder, hvor myggene hviler i skyggen om dagen, langs hæk og buske.",
    "Vi sprøjter ikke haven ud i ét — behandlingen rammer myggene og skåner bier og andet liv.",
  ],
};

const klannere: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Klannerlarverne lever sjældent der, hvor du ser de voksne biller, så første skridt er at finde det rigtige sted.",
  steps: [
    "Vi leder efter larvernes levesteder: under og bag møbler, i tæpper, støvlag og bag fodlister.",
    "Vi behandler tæpper, fodpaneler og de revner, larverne gemmer sig i.",
  ],
};

const snegle: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Snegle behandles, hvor de gemmer sig om dagen — ikke kun der, hvor du ser skaden om morgenen.",
  steps: [
    "Vi går haven igennem og finder de fugtige, mørke steder, sneglene ligger på om dagen: under brædder, løse fliser, tæt bunddække og op ad kompostbunken.",
    "Vi behandler bede, kanter og skjulesteder med godkendte midler i den dosering, de er godkendt til.",
    "Du får råd om, hvordan du gør haven mindre attraktiv for snegle, så behandlingen holder længst muligt.",
  ],
};

const muldvarpe: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Arbejdet starter med at finde ud af, hvilket dyr der laver skuddene, og hvilke gange der faktisk er i brug.",
  steps: [
    "Vi klarlægger, om det er muldvarp eller mosegris, og undersøger hvilke gange der er aktive — der er ingen grund til at bruge tid på forladte gange.",
    "Vi sætter derefter ind i selve gangsystemet. Arbejdet udføres efter gældende regler for bekæmpelse af muldvarpe og mosegrise.",
    "Du får råd om, hvordan du holder plænen fri bagefter.",
  ],
};

const kakerlakker: TreatmentDetails = {
  // DRAFT: the owner's article for this pest is a placeholder; drafted from the service page's own processNote.
  intro:
    "Kakerlakker bekæmpes ved at ramme kilden og skjulestederne — ikke kun dem, du ser løbe om natten.",
  steps: [
    "Vi starter med at finde kilden og adgangsvejene: hvordan de er kommet ind, og hvor de holder til.",
    "Vi behandler målrettet med gel og stationer i revner, bag hvidevarer og i de tekniske installationer, hvor de gemmer sig.",
    "Ved kraftige angreb laver vi opfølgende besøg, indtil bestanden er væk.",
  ],
};

const musOgRotter: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Mus og rotter bekæmpes lovligt og grundigt: arten fastslås først, og rotter anmeldes altid til kommunen.",
  steps: [
    "Vi fastslår, hvilket dyr du har med at gøre — og om der er tale om rotter, som altid skal anmeldes til kommunen.",
    "Vi sætter professionelle fælder de rigtige steder, hvor dyrene færdes, og følger op, indtil bestanden er væk.",
    "Vi tætter de sprækker og åbninger, dyrene kommer ind gennem, så der ikke kommer nye.",
  ],
};

const lopper: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Lopper bekæmpes i to spor samtidig: kilden findes, og boligen behandles, hvor pupperne sidder.",
  steps: [
    "Vi finder ud af, hvor lopperne kommer fra: kæledyr, en fuglerede under taget eller et hus, der har stået tomt.",
    "Kæledyret behandles af dyrlægen — det er dit ansvar, og vi siger det ligeud, hvis det er det eneste, der skal til.",
    "Står der lopper i boligen, behandler vi gulve, tæpper og de steder, hvor dyret opholder sig.",
  ],
  aftercare: [
    "Støvsug dagligt de første 7-10 dage, og smid posen ud hver gang.",
    "Vask tekstiler og dyrets ting ved mindst 60 °C.",
  ],
};

const flaater: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Flåter kan ikke sprøjtes væk, men grunden kan gøres markant mindre attraktiv for dem.",
  steps: [
    "Vi gennemgår grunden og finder de steder, flåterne trives: højt græs, tæt hæk, krat og fugtige hjørner.",
    "Vi laver en plan for indsatsen — fra klipning og oprydning til råd om, hvordan du beskytter dig selv og dine dyr.",
    "Flåter, der er kommet indenfor, håndterer vi, hvor de sidder.",
  ],
};

const lus: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Først fastslår vi, hvad du står med: hovedlus, fladlus eller fnat — behandlingen er forskellig for hver.",
  steps: [
    "Ved hovedlus og fladlus behandles personen med tættekam og midler fra apoteket; her er der som regel ingen grund til at betale os.",
    "Ved fnat hjælper vi med hjemmet: vi støvsuger grundigt, får vasket tøj og sengetøj ved 60 °C og isolerer det, der ikke kan vaskes.",
    "Er du i tvivl om, hvad kløen kommer af, så skriv til os — så siger vi, om det er noget, vi skal se på.",
  ],
};

const maar: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Mårbehandling følger loven: arten skal sikres, før der gøres noget, og dyret skal ud, før huset tættes.",
  steps: [
    "Vi fastslår, hvilket dyr der er tale om, og hvor det kommer ind.",
    "Vi sætter godkendte fælder op eller monterer et envejssystem, så dyret kan komme ud, men ikke ind igen.",
    "Når dyret er væk, tætter vi alle åbninger med stålnet og mårsikrer nedløbsrørene.",
  ],
};

const fugle: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Fugle bekæmpes ikke med gift — de holdes væk ved at gøre siddepladserne ubrugelige.",
  steps: [
    "Vi kigger på bygningen og finder ud af, hvilken fugl der er tale om, og hvor den holder til.",
    "Vi fjerner reder, hvor loven tillader det, og desinficerer stedet bagefter.",
    "Vi monterer net, pigge, wire eller fuglepasta på de steder, fuglene lander. Er der måger på et tag, vurderer vi også, om der skal net over hele tagfladen.",
  ],
};

const vildedyr: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "Vilde dyr håndteres lovligt: grunden gøres uinteressant, adgange sikres, og fredede arter henvises til myndighederne.",
  steps: [
    "Vi går grunden efter: hvor græver dyrene, hvor kommer de ind, og hvad får dem til at blive?",
    "Vi lægger en plan: det, der trækker dyrene, fjernes, åbningerne sikres, og i nogle tilfælde sættes hegn op.",
    "Er der tale om grævling, eller sidder et dyr fast i en bygning, henviser vi til kommunen eller en vildtkonsulent. Det må vi ikke selv tage os af.",
  ],
};

const haven: TreatmentDetails = {
  // DRAFT: no owner treatment article; drafted from the service page's own processNote.
  intro:
    "I haven starter vi altid med at fastslå, hvad der laver skaden — før der overhovedet tales om en behandling.",
  steps: [
    "Vi går haven og køkkenhaven igennem og identificerer skadedyret.",
    "Finder vi kartoffelbiller, hjælper vi dig også med at melde fundet til kommunen eller Plantetilsynet.",
    "Vi behandler målrettet, hvor det kan betale sig, og så lidt andet som muligt — haven sprøjtes aldrig ud i ét.",
  ],
};

const TREATMENTS: Record<string, TreatmentDetails> = {
  gaasebiller,
  moel,
  myg,
  klannere,
  snegle,
  muldvarpe,
  myrer,
  hvepse,
  vaeggelus,
  // Sølvfisk/skægkræ: the service page covers both; the ordinary silverfish
  // gets its own override below.
  soelvfisk: skaegkrae,
  borebiller,
  kakerlakker,
  fluer,
  edderkopper,
  "mus-og-rotter": musOgRotter,
  lopper,
  flaater,
  lus,
  maar,
  fugle,
  vildedyr,
  haven,
};

/**
 * Species whose treatment differs from the parent service's. Keyed
 * "<service>/<slug>". Protected or harmless species lead with an assessment
 * instead of a method.
 */
const SPECIES_TREATMENT_OVERRIDES: Record<string, TreatmentDetails> = {
  // Stankelbenslarver sidder i jorden som gåsebillelarver, men metoden er en anden:
  // først fastslås det, hvad der faktisk ligger i plænen.
  "gaasebiller/stankelbenslarve": {
    intro:
      "Skaden ligner gåsebillens, men stankelbenslarven behandles ikke på samme måde. Derfor starter vi med at sikre os, hvad der ligger i plænen.",
    steps: [
      "Vi undersøger de angrebne områder og fastslår, om der er tale om stankelbenslarver, gåsebillelarver eller noget helt fjerde.",
      "Først når arten er sikker, vælger vi metode og tidspunkt — en behandling lagt på den forkerte art er spildt arbejde.",
    ],
  },
  // Almindelige sølvfisk er et fugtproblem, ikke et sprøjteproblem.
  "soelvfisk/soelvfisk": soelvfiskArt,
  // Gul engmyre er ufarlig og skal som udgangspunkt ikke bekæmpes.
  "myrer/gul-engmyre": {
    assessmentOnly: true,
    intro:
      "De små jordhøje i plænen er gul engmyre, og den er ufarlig. Den skal som udgangspunkt ikke bekæmpes.",
    steps: [
      "Vi kigger på højene og bekræfter, at det er engmyre og ikke en art, der faktisk gør skade.",
      "Sker det indendørs, eller er du i tvivl om arten, vurderer vi det på stedet og siger dig ligeud, om der er behov for en behandling.",
    ],
  },
  // Rød skovmyre hører til i haven og behandles kun, hvis den er rykket indendørs.
  "myrer/roed-skovmyre": {
    assessmentOnly: true,
    intro:
      "Den røde skovmyre bygger bo af grannåle i haven og skal normalt ikke bekæmpes, medmindre den optræder inde i huset.",
    steps: [
      "Vi vurderer boets placering og aktiviteten omkring huset.",
      "Holder myrerne sig udenfor, er der som regel ingen behandling at lave — det siger vi ligeud.",
      "Er de rykket indendørs, behandler vi efter samme metode som andre indeværende myrer.",
    ],
  },
  // Honningbien stikker kun én gang og bør ikke bekæmpes; bisværme samles ind af en biavler.
  "hvepse/honningbi": {
    assessmentOnly: true,
    intro:
      "Bier er ikke skadedyr. De stikker kun én gang, og de bør ikke bekæmpes — en bisværm skal samles ind af en biavler.",
    steps: [
      "Vi kigger på sværmen eller kolonien og bekræfter, at der er tale om honningbier og ikke hvepse.",
      "Sidder der en bisværm, henviser vi til en biavler, der henter den gratis.",
      "Sidder et fast etableret bibo i en mur eller skorsten, hjælper vi med den professionelle løsning, lovgivningen kræver.",
    ],
  },
  // Vinbjergsneglen er delvist fredet og gør ingen skade.
  "snegle/vinbjergsnegl": {
    assessmentOnly: true,
    intro:
      "Den store snegl med huset er vinbjergsneglen. Den er delvist fredet, må ikke indsamles til salg, og den gør ingen skade i haven.",
    steps: [
      "Vi bekræfter, at det er vinbjergsneglen og ikke dræbersneglen, du har set.",
      "Skaderne i bedene kommer næsten altid fra dræbersnegle og agersnegle — dem behandler vi gerne.",
    ],
  },
  // Skovmåren er totalfredet.
  "maar/skovmaar": {
    assessmentOnly: true,
    intro:
      "Skovmåren er totalfredet i Danmark. Den må hverken jages, fanges eller generes — heller ikke med fælder.",
    steps: [
      "Vi ser på spor og skader og fastslår, om der er tale om skovmår eller husmår.",
      "Er det en skovmår, henviser vi til den rette myndighed, så sagen håndteres lovligt.",
      "Er det en husmår, går behandlingen i gang efter lovgivningen for den art.",
    ],
  },
  // Halsbåndsmusen er fredet og må kun fanges levende.
  "mus-og-rotter/halsbaandsmus": {
    assessmentOnly: true,
    intro:
      "Halsbåndsmusen er fredet og må ikke bekæmpes. Den ligner en lille mus, men den skader ikke og må højst fjernes levende.",
    steps: [
      "Vi fastslår, om der er tale om halsbåndsmus, husmus eller rotte — det afgør, hvad der må gøres.",
      "Sidder der en fredet mus i husets konstruktion, finder vi en løsning, der overholder loven.",
    ],
  },
  // Grævlingen er totalfredet og hører til hos kommunen eller en vildtkonsulent.
  "vildedyr/graevling": {
    assessmentOnly: true,
    intro:
      "Grævlingen er totalfredet i Danmark. Den må hverken jages, fanges eller generes, og dens gange må ikke ødelægges, mens dyrene er i dem.",
    steps: [
      "Vi bekræfter, at det er grævling, der graver i plænen.",
      "Sidder der et sæt under huset, er det kommunen eller en vildtkonsulent, der skal kontaktes — det må en skadedyrsbekæmper ikke selv tage sig af. Vi siger dig, hvem du skal ringe til.",
    ],
  },
};

/** The treatment section for a service, or for one of its species. */
export function treatmentFor(service: string, speciesSlug?: string): TreatmentDetails | undefined {
  if (speciesSlug) {
    const override = SPECIES_TREATMENT_OVERRIDES[`${service}/${speciesSlug}`];
    if (override) return override;
  }
  return TREATMENTS[service];
}
