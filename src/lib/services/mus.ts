import type { ServiceContent } from "../serviceContent";

const content: ServiceContent = {
  intro:
    "Mus i huset er som regel husmusen. Den kan presses igennem en sprække på kun 6-7 mm og yngler hele året " +
    "indendørs. Siden her viser, hvordan du kender de to arter fra hinanden, og hvad der virker mod dem.",
  whyProfessional: [
    "En mus presses igennem en sprække på 6-7 mm — findes og tættes adgangsvejen ikke, kommer der nye mus ind",
    "Fælder sat det forkerte sted fanger ingenting i uger; mus færdes op ad vægge, ikke midt på gulvet",
    "Gift indendørs giver døde mus på steder, du ikke kan nå — med lugt og spyfluer til følge",
    "Vi kigger på spor og skader, så du er sikker på, at det er mus — og ikke rotter, der skal anmeldes til kommunen",
    "Råd om, hvordan du holder mad og foder utilgængeligt bagefter",
  ],
  species: [
    { name: "Husmus", text: "Den lille, gråbrune mus, de fleste får indendørs. Krop på 7-10 cm og en hale, der er omtrent lige så lang som kroppen. Nysgerrig af natur og derfor relativt let at fange i fælde." },
    { name: "Halsbåndmus", text: "Større end husmusen og gulligbrun med en tydelig mørk pelskrave om halsen. Den anden art, man typisk får i huse i Danmark." },
  ],
  processNote:
    "Først kigger vi på spor og skader for at fastslå, at det er mus — og ikke rotter, som altid skal anmeldes " +
    "til kommunen. Derefter sættes der ind med fælder de rigtige steder, og vi peger på de sprækker, der skal " +
    "tættes. Du får skriftlig dokumentation for behandlingen.",
  faq: [
    { q: "Hvordan ved jeg, om det er mus eller rotter?", a: "Mus har en krop på 7-10 cm og en hale, der er omtrent lige så lang som kroppen. Rotter er 18-25 cm i kroppen med kortere hale i forhold til kroppen. Mus er nysgerrige og går i fælder; rotter er sky over for nye ting og holder sig væk fra dem i dagevis. Rotter skal altid anmeldes til kommunen." },
    { q: "Kan jeg selv sætte musefælder op?", a: "Ja. Brug lokkemad som rosiner, nødder eller gryn, og sæt fælderne vinkelret op ad vægge, hvor musene færdes — ikke midt på gulvet. Husk at finde og tætte de sprækker, de kommer ind gennem, ellers kommer der nye." },
    { q: "Skal jeg bruge gift mod mus indendørs?", a: "Brug normalt ikke gift indendørs. Mus dør på steder, du ikke kan nå — bag skabe, i væggen eller under gulvet — og så lugter det, mens liget tiltrækker spyfluer. Fælder er at foretrække inde i huset." },
    { q: "Hvor små huller kan en mus komme igennem?", a: "En mus kan presses igennem en sprække på kun 6-7 mm. Derfor skal rørgennemføringer, ventilationsåbninger og sprækker ved soklen tættes med metalnet, ståluld eller hård mørtel." },
    { q: "Er mus farlige?", a: "Mus gnaver i emballage, træ, plast, isolering og el-ledninger, hvor der opstår risiko for kortslutning. Deres ekskrementer og urin forurener madvarer, og museurin kan overføre sygdomme som leptospirose og toxoplasmose." },
    { q: "Hvornår er mus aktive?", a: "Mus er aktive hele året, mest om aftenen og natten. Indendørs yngler de ca. 4 gange årligt med 4-8 unger pr. kuld, så et lille fund kan blive til mange på kort tid." },
    { q: "Hvordan holder jeg mus ude?", a: "Tæt sokkel, rørgennemføringer og ventilationsåbninger, opbevar mad og dyrefoder tætsluttende, og hold kældervinduer og udhuse intakte. Fjern også rodebunker tæt på huset, hvor musene kan skjule sig." },
  ],
};

export default content;
