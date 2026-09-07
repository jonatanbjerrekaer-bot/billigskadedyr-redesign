/*
 * Hans egne faneblade fra produktsiden, ordret.
 *
 * A-Tox-siden på billigskadedyr.dk har seks foldeafsnit: Anvendelse,
 * Beskrivelse, Yderligere information, Sikkerhed & forholdsregler, FAQ og
 * Fragt information. Alt herunder er hentet derfra 2026-09-07 og er hans
 * tekst, ikke vores. Der er hverken skrevet om eller lagt til.
 *
 * Det er også her, forbruget står. Vi gættede tidligere 0,25 og 0,50 liter
 * pr. m² ud fra hans tal for Protox Svamp. Det viser sig at være præcis de
 * tal, han selv oplyser for A-Tox+, så gætteriet er væk igen, og
 * src/lib/dosage.ts er rettet til at citere ham i stedet.
 */

export type Tab = { title: string; body: string[]; list?: string[] };

export const TABS: Record<string, Tab[]> = {
  "a-tox-25ltr": [
    {
      title: "Anvendelse",
      body: [
        "A-Tox+ 25 L er færdigblandet og klar til brug. Produktet påføres træværket grundigt efter den relevante behandlingsmetode.",
        "Forbrug: nyt træ minimum 0,25 liter pr. m², gammelt træ minimum 0,50 liter pr. m². En 25 liters beholder rækker derfor teoretisk til omkring 100 m² nyt træ eller 50 m² gammelt træ, afhængigt af træets sugeevne og den konkrete behandling.",
        "Ved forebyggende behandling med koncentratet blandes 1 liter A-Tox+ med 9 liter rent vand. Det giver 10 liter færdig behandlingsvæske. Den fortyndede blanding anvendes i forholdet cirka 1 liter pr. 5 m² træoverflade, og der påføres 2 lag, svarende til 2 × 100 g/m².",
        "5 liter koncentrat plus 45 liter vand giver 50 liter færdig blanding, altså teoretisk op til omkring 250 m² træoverflade.",
        "Ved eksisterende angreb af husbukke eller borebiller anvendes en stærkere blanding: 1 liter koncentrat med 5 liter rent vand giver 6 liter færdig væske. Edialux angiver et forbrug på omkring 1 liter pr. 3 m², med 3 påføringer svarende til 3 × 100 g/m². 5 liter koncentrat giver ved denne fortynding op til 30 liter færdig behandlingsvæske.",
        "Ved kurativ behandling kan koncentratet også injiceres i større træelementer og bjælker. Koncentratet blandes 1:5 med rent vand, der bores huller efter den gældende brugsanvisning, og blandingen injiceres dybt i træet.",
      ],
      list: [
        "Kan påføres med lavtrykssprøjte, pensel, rulle, neddypning eller flow coating",
        "Undersøg først træværket for flyvehuller, boremel, svækket træ og synlig aktivitet",
        "Ved omfattende konstruktionsskader bør træets bæreevne vurderes særskilt",
      ],
    },
    {
      title: "Beskrivelse",
      body: [
        "Små huller i træværket og fint boremel på gulvet kan være de første synlige tegn på, at træødelæggende insekter har etableret sig i konstruktionen.",
        "Borebiller og husbukke kan leve skjult inde i træet, hvor larverne over længere tid gnaver gange gennem træværket. Derfor opdages et angreb ofte først, når der kommer flyvehuller eller boremel.",
        "A-Tox+ er udviklet specifikt til behandling af træ mod træødelæggende insekter og kan anvendes på både nyt og gammelt træværk indendørs. Produktet kan bruges både forebyggende og ved eksisterende angreb.",
        "A-Tox+ er vandbaseret, transparent og lugtsvag, hvilket gør det velegnet til behandling af træværk, hvor man samtidig ønsker at bevare træets naturlige udseende.",
        "Almindelig borebille kaldes ofte blot borebille eller træorm. Det er ikke den voksne bille, der laver størstedelen af skaden. Larverne lever inde i træet og gnaver gange gennem materialet under deres udvikling.",
        "Husbukken er blandt de mere alvorlige træødelæggende insekter, fordi larverne kan leve inde i konstruktionstræ og over længere tid forårsage omfattende skader.",
      ],
      list: [
        "Små runde flyvehuller",
        "Fint boremel omkring træværket",
        "Nye huller i tidligere intakte områder",
        "Svækket eller porøst træ",
      ],
    },
    {
      title: "Sikkerhed og forholdsregler",
      body: [
        "Kun til professionel brug. Produktet sælges til erhvervskunder med gyldigt CVR-nr.",
        "Læs altid produktets etiket og gældende brugsanvisning før anvendelse.",
        "A-Tox+ anvendes til behandling af træværk indendørs og har en godkendelse, som gør anvendelse mulig i boliger, hvor mennesker kun kortvarigt kommer i kontakt med det behandlede område.",
        "Anvend egnede personlige værnemidler efter etikettens og sikkerhedsdatabladets anvisninger. Undgå unødig kontakt med produktet, og sørg for korrekt ventilation under og efter behandling.",
      ],
      list: [
        "Produkttype: træbeskyttelsesmiddel mod træødelæggende insekter",
        "Mod: borebiller og husbukke. Anvendelse: træværk indendørs",
        "Formulering: vandbaseret. Udseende: transparent. Lugt: lugtsvag",
        "Tørretid og overmalbar: ca. 2 døgn ved 23 °C og 60 % relativ luftfugtighed",
        "Licenskrav: ingen. Varenumre hos Edialux: 23018 (25 L) og 1203001023 (5 L koncentrat)",
      ],
    },
    {
      title: "Ofte stillede spørgsmål",
      body: [
        "Hvilke insekter virker A-Tox+ mod? Produktet er specifikt beregnet til husbuk (Hylotrupes bajulus) og almindelig borebille (Anobium punctatum).",
        "Hvad er forskellen på 25 L og 5 L koncentrat? 25 L er færdigblandet og klar til brug. Koncentratet skal fortyndes med vand, og blandingsforholdet afhænger af, om behandlingen er forebyggende eller mod et eksisterende angreb. Koncentratet er derfor særligt interessant ved større opgaver.",
        "Hvor meget færdig blanding giver 5 liter koncentrat? Forebyggende, 1:9, op til 50 liter. Kurativt, 1:5, op til 30 liter.",
        "Hvor langt rækker 25 liter? Ud fra Edialux' minimumsforbrug op til ca. 100 m² nyt træ ved 0,25 L/m², eller ca. 50 m² gammelt træ ved 0,50 L/m². Den faktiske rækkeevne afhænger af træets sugeevne, overflade og behandlingsmetode.",
        "Kan det bruges indendørs? Ja. Produktet har en udvidet godkendelse, som tillader anvendelse i boliger, hvor mennesker kun kortvarigt kommer i kontakt med det behandlede område.",
        "Er A-Tox+ farvet? Nej, produktet er transparent, og træets eksisterende udseende bevares.",
      ],
    },
    {
      title: "Fragt og levering",
      body: [
        "Fragtpriser fra 59 kr. Gratis afhentning i Risskov.",
        "Vi gør alt, hvad vi kan, for at du har din pakke allerede i morgen.",
      ],
    },
  ],
};
