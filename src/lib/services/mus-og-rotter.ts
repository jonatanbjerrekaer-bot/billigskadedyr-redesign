import type { ServiceContent } from "../serviceContent";

const content: ServiceContent = {
  intro:
    "Mus og rotter er de gnavere, danske huse og haver oftest får besøg af. Her kan du se, hvordan du kender " +
    "de fire arter fra hinanden, og hvad loven siger: rotter skal altid anmeldes til kommunen, og bekæmpelse " +
    "af rotter må kun udføres af autoriserede rottebekæmpere.",
  whyProfessional: [
    "En mus presses igennem en sprække på 6-7 mm. Et enkelt hul i plænen kan dække over et helt jordgangsystem. Findes og tættes adgangsvejen ikke, kommer der nye dyr",
    "Bekæmpelse af rotter må kun udføres af autoriserede rottebekæmpere, og rottegift må kun udlægges i aflåste foderstationer",
    "Fælder sat det forkerte sted fanger ingenting i uger; mus færdes op ad vægge, ikke midt på gulvet",
    "Gift indendørs giver døde mus på steder, du ikke kan nå. Så lugter det, og spyfluer kommer til",
    "Vi går huset og grunden efter og finder ud af, hvor dyrene kommer ind, og hvad der trækker dem",
    "Vi giver dig råd om at holde mad og foder utilgængeligt, så de ikke vender tilbage",
  ],
  species: [
    { name: "Brun rotte", text: "Den langt dominerende rotte i Danmark. Butt snude, små ører og en hale, der er kortere end kroppen. Lever typisk i kloakker, kældre og jordgangsystemer." },
    { name: "Sort rotte", text: "Sjælden i Danmark og ses mest ved havne og på lofter. Slankere med spids snude, store nøgne ører og en hale, der er længere end kroppen." },
    { name: "Husmus", text: "Den lille, gråbrune mus, de fleste får indendørs. Krop på 7-10 cm og en hale, der er omtrent lige så lang som kroppen. Nysgerrig af natur og derfor relativt let at fange i fælde." },
    { name: "Halsbåndmus", text: "Større end husmusen og gulligbrun med en tydelig mørk pelskrave om halsen. Den anden mus, du typisk kan få i huset i Danmark." },
  ],
  processNote:
    "Først fastslår vi, hvilket dyr du har med at gøre — og om der er tale om rotter, som altid skal anmeldes " +
    "til kommunen. Derefter sætter vi fælder de rigtige steder og tætter de sprækker, der skal tættes. " +
    "Du får skriftlig dokumentation for behandlingen.",
  faq: [
    { q: "Hvordan ved jeg, om det er mus eller rotter?", a: "Mus har en krop på 7-10 cm og en hale, der er omtrent lige så lang som kroppen. Brune rotter er 18-25 cm i kroppen med en hale på 15-21 cm, og deres ekskrementer er sorte, ca. 6 mm tykke og op til 17 mm lange. Gnavmærker på ca. 4 mm og cirkelrunde huller på ca. 2 cm peger på rotter. Mus er nysgerrige og går i fælder; rotter er sky over for nye ting og holder sig væk fra dem i dagevis. Rotter skal altid anmeldes til kommunen." },
    { q: "Skal jeg anmelde rotter til kommunen?", a: "Ja. Der er pligt til at anmelde rotter til kommunen, uanset hvor du ser dem — i haven, på vejen eller indendørs. Det er strafbart at undlade anmeldelse." },
    { q: "Kan jeg selv bekæmpe rotterne?", a: "Nej. Bekæmpelse af rotter må kun udføres af autoriserede rottebekæmpere — det gælder også selve giftudlægningen." },
    { q: "Må jeg selv lægge rottegift ud i haven?", a: "Nej. Rottegift må kun udlægges i aflåste foderstationer, og det må kun gøres af autoriserede rottebekæmpere. Ligger giften frit fremme, kan den forgifte rovfugle, katte og hunde." },
    { q: "Kan jeg selv sætte musefælder op?", a: "Ja. Brug lokkemad som rosiner, nødder eller gryn, og sæt fælderne vinkelret op ad vægge, hvor musene færdes — ikke midt på gulvet. Husk at finde og tætte de sprækker, de kommer ind gennem, ellers kommer der nye." },
    { q: "Skal jeg bruge gift mod mus indendørs?", a: "Nej, brug helst ikke gift indendørs. Mus dør på steder, du ikke kan nå — bag skabe, i væggen eller under gulvet — og så lugter det, mens liget tiltrækker spyfluer. Fælder er bedre inde i huset." },
    { q: "Hvor små huller kan en mus komme igennem?", a: "En mus kan presses igennem en sprække på kun 6-7 mm. Rotter skal bruge ca. 2 cm. Tæt rørgennemføringer, ventilationsåbninger og sprækker ved soklen med metalnet, ståluld eller hård mørtel." },
    { q: "Hvor kommer rotterne ind i huset?", a: "De skal bruge et hul på ca. 2 cm — fx ved sokkel, rørgennemføringer eller faldstammeudluftningen. De er glimrende svømmere, gode klatrere og kan springe ca. 90 cm lodret, så også højere åbninger kan bruges." },
    { q: "Er mus og rotter farlige?", a: "Mus gnaver i emballage, træ, plast, isolering og el-ledninger, hvor der opstår risiko for kortslutning, og deres ekskrementer og urin forurener madvarer. Rotter overfører bl.a. salmonella, leptospirose (Weils sygdom) og E. coli via urin, ekskrementer og bid og ødelægger ledninger, rør, isolering og fødevarer. Museurin kan overføre leptospirose og toxoplasmose." },
    { q: "Hvordan holder jeg mus og rotter ude?", a: "Tæt sokkel, rørgennemføringer og ventilationsåbninger, sikr faldstammeudluftningen, opbevar mad og dyrefoder tætsluttende, fjern rodebunker tæt på huset, og beskær træer væk fra tagrenden, så rotterne ikke kan springe eller klappe over på taget." },
  ],
};

export default content;
