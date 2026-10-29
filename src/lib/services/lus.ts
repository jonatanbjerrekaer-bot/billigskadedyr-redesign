import type { ServiceContent } from "../serviceContent";

const content: ServiceContent = {
  intro:
    "Hovedlus og fladlus behandles hos apoteket — det er den lige besked. Vores rolle er at finde kilden, behandle hjemmet, når der er brug for det, og sige det ærligt, hvis du ikke har brug for os.",
  whyProfessional: [
    "Vi finder kilden og tjekker, om hele husstanden er ramt, så den ikke går i ring",
    "Når fnatmiden alene ikke er nok, behandler vi hjemmet: støvsuger, vasker ved 60 °C og behandler opholdsstederne",
    "Vi siger det ligeud, hvis opgaven hører til hos apoteket og ikke hos os",
    "Kløen kan vare flere uger, efter behandlingen har virket — vi hjælper dig med at vurdere, om det er restkløe eller et nyt angreb",
  ],
  species: [
    { name: "Hovedlus", text: "2-3 mm gråbrune insekter, der lever helt nede ved hovedbunden. Rammer oftest børn og smitter ved direkte kontakt — hue, kam og sove tæt sammen." },
    { name: "Fladlus", text: "Kønslus, der sidder i kønsbehåringen og smitter ved tæt kropskontakt. Behandles med kam og apotekets midler, ligesom hovedlus." },
    { name: "Fnat", text: "En mikroskopisk mide, der graver gange i huden og giver intens kløe, værst om natten. Hele husstanden skal behandles samtidigt, og hjemmet vaskes og støvsuges." },
  ],
  processNote:
    "Vi starter med at finde ud af, hvad du står med: hovedlus, fladlus eller fnat. Hovedlus og fladlus behandles hos apoteket — der er som regel ingen grund til at betale os for det, og det siger vi ligeud. Ved fnat behandler lægen huden, og så hjælper vi med hjemmet: vi støvsuger grundigt, får vasket tøj og sengetøj ved 60 °C og isolerer det, der ikke kan vaskes. Er du i tvivl om, hvad kløen kommer af, så skriv til os, så siger vi, om det er noget, vi skal se på.",
  faq: [
    { q: "Kan I ikke bare behandle lusene for mig?", a: "Hovedlus behandles hos apoteket — ofte samme aften — og det er sjældent nødvendigt at behandle boligen. Vores rolle er at hjælpe, når problemet sidder i hjemmet, som ved fnat, eller når kilden er svær at finde. Så siger vi det hellere, end vi sælger dig en behandling, du ikke har brug for." },
    { q: "Hvordan smitter lus?", a: "Hovedlus kan hverken hoppe eller flyve. De smitter næsten udelukkende ved direkte kontakt: sove tæt sammen, dele hue, hjelm, kam eller hårbørste. Derfor rammer de oftest børn, og derfor skal kun de smittede behandles — ikke hele klassen eller hele husstanden." },
    { q: "Hvor lang tid kan lus overleve væk fra hovedet?", a: "Højst 48 timer. Derfor er det nok at vaske huer, kamme og sengetøj, fryse dem eller lægge dem væk i et døgn — og derfor er behandling af selve boligen sjældent nødvendig ved hovedlus." },
    { q: "Klør det stadig, selvom lusene er væk?", a: "Ja. Kløen kommer af overfølsomhed over for lusenes affaldsstoffer, og den kan godt blive ved i flere uger, efter lusene er væk. Det er også derfor symptomerne først viser sig 2-4 uger efter, man er blevet smittet. Tænk derfor ikke automatisk, at behandlingen har slået fejl, fordi der stadig klør." },
    { q: "Hvad er forskellen på fnat og lus?", a: "Lus er insekter, der sidder i hår og på hudoverfladen. Fnat er en mikroskopisk mide, der graver gange ned i huden og lægger æg der. Fnat giver intens kløe, der er værst om natten, og udslæt mellem fingre, ved håndled, albuer, bryst og skridt. Fnat behandles i hele husstanden samtidigt — det gør hovedlus ikke." },
    { q: "Hvordan behandles fnat?", a: "Hele husstanden behandles samtidigt med permethrin-creme to gange med en uges mellemrum eller med tabletter efter lægens ordination. Tøj, sengetøj og håndklæder vaskes ved 60 °C eller lægges i en lukket pose i 3-7 dage. Man er smittefri 8-12 timer efter første behandling, men kløen kan vare flere uger." },
    { q: "Skal huset behandles ved fnat?", a: "Midlet sidder på huden, ikke i boligen, men det hjælper at støvsuge grundigt og vaske tekstiler ved 60 °C, fordi miden kan overleve op til 36 timer uden for kroppen på tøj og sengetøj. Er husstanden stor, eller gentager angrebet sig, hjælper vi med at få hjemmet gjort grundigt rent." },
    { q: "Skal mit barn blive hjemme fra skole eller institution?", a: "Nej. Når behandlingen er sat i gang, og der er kæmmet grundigt, kan barnet gå i skole eller institution igen. Spørg institutionen om deres retningslinjer, men hold barnet ikke hjemme i flere dage — det hjælper ikke på smitten." },
  ],
};

export default content;
