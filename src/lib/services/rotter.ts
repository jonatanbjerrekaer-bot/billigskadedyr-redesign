import type { ServiceContent } from "../serviceContent";

const content: ServiceContent = {
  intro:
    "Ser du en rotte — i haven, på vejen eller indendørs — skal den anmeldes til kommunen. Det gælder uanset, " +
    "hvor du ser den. Siden her samler, hvordan du kender de to rottearter i Danmark fra hinanden, og hvad " +
    "loven siger om bekæmpelse.",
  whyProfessional: [
    "Et enkelt hul i plænen kan dække over et stort jordgangsystem, som gør-det-selv midler sjældent rammer",
    "Bekæmpelse af rotter må kun udføres af autoriserede rottebekæmpere, og rottegift må kun udlægges i aflåste foderstationer",
    "Vi undersøger, hvor rotterne kommer ind, og hvad der trækker dem til stedet",
    "Tætning af sokkel, rør og faldstammeudluftning er ofte en stor del af arbejdet",
    "Råd om, hvordan du holder dem væk bagefter, så de ikke vender tilbage",
  ],
  species: [
    { name: "Brun rotte", text: "Den langt dominerende rotte i Danmark. Butt snude, små ører og en hale, der er kortere end kroppen. Lever typisk i kloakker, kældre og jordgangsystemer." },
    { name: "Sort rotte", text: "Sjælden i Danmark og ses mest ved havne og på lofter. Slankere med spids snude, store nøgne ører og en hale, der er længere end kroppen." },
  ],
  processNote:
    "Først skal fundet anmeldes til kommunen — det er der pligt til, uanset hvor rotterne er set. Derefter kigger " +
    "vi på tegnene og på, hvor de kommer ind. Arbejdet udføres efter gældende regler for rottebekæmpelse, og du " +
    "får skriftlig dokumentation for behandlingen.",
  faq: [
    { q: "Skal jeg anmelde rotter til kommunen?", a: "Ja. Der er pligt til at anmelde rotter til kommunen, uanset hvor du ser dem — i haven, på vejen eller indendørs. Det er strafbart at undlade anmeldelse." },
    { q: "Kan jeg selv bekæmpe rotterne?", a: "Nej. Bekæmpelse af rotter må kun udføres af autoriserede rottebekæmpere. Det gælder både udlægning af gift og selve bekæmpelsen." },
    { q: "Må jeg selv lægge rottegift ud i haven?", a: "Nej. Rottegift må kun udlægges i aflåste foderstationer, og det må kun gøres af autoriserede rottebekæmpere. Ligger giften frit fremme, kan den forgifte rovfugle, katte og hunde." },
    { q: "Hvordan ved jeg, om det er rotter og ikke mus?", a: "Brune rotter er 18-25 cm lange i kroppen med en hale på 15-21 cm, og deres ekskrementer er sorte, ca. 6 mm tykke og op til 17 mm lange. Gnavmærker på ca. 4 mm og cirkelrunde huller på ca. 2 cm peger også på rotter. Mus er langt mindre og laver finere gnavspor." },
    { q: "Hvor kommer rotterne ind i huset?", a: "De skal bruge et hul på ca. 2 cm — fx ved sokkel, rørgennemføringer eller faldstammeudluftningen. De er glimrende svømmere, gode klatrere og kan springe ca. 90 cm lodret, så også højere åbninger kan bruges." },
    { q: "Er rotter farlige?", a: "Rotter overfører bl.a. salmonella, leptospirose (Weils sygdom) og E. coli via urin, ekskrementer og bid. De ødelægger desuden ledninger, rør, isolering og fødevarer." },
    { q: "Hvordan forebygger jeg rotter?", a: "Tæt huller ved sokkel og rør med metalrist, sikr faldstammeudluftningen, fjern foderrester og rodebunker, opbevar foder tæt, og beskær træer væk fra tagrenden, så der ikke er bro til taget." },
  ],
};

export default content;
