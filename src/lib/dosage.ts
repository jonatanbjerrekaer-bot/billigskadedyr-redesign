/*
 * Hvor meget skal jeg bruge?
 *
 * Det er spørgsmålet, der står mellem en 55-årig husejer og en dunk til
 * 2.099 kr. Hans egne varetekster svarer faktisk på det, men de gør det inde
 * midt i et afsnit, i sætninger som "1 ltr rækker til ca. 50m2", og det
 * kræver, at man selv regner den anden vej. Her er tallene taget ud og lagt
 * i en tabel, så en beregner kan gøre regnestykket.
 *
 * KILDE er ikke pynt. "his" betyder, at tallet står ordret i hans egen
 * varetekst på billigskadedyr.dk. "ours" betyder, at vi har sat det, og at
 * han skal bekræfte det, før det må stå på en side, folk handler efter. En
 * beregner, der regner på et gætteri, er værre end ingen beregner.
 *
 * Varer uden en linje her får ingen beregner. Det er meningen.
 */

export type Rate = { key: string; label: string; perM2: number };

export type Dose = {
  /** Enheden på perM2 og på pakningerne. */
  unit: "l" | "ml" | "g" | "kg";
  /** Forbrug pr. m². Flere rækker, når behandlingstypen ændrer forbruget. */
  rates: Rate[];
  /**
   * Sat, når varen er et koncentrat: én del koncentrat giver `yield` dele
   * færdig blanding. Så regner beregneren både den færdige mængde og den
   * mængde koncentrat, man faktisk skal købe.
   */
  concentrate?: { yield: number; note: string };
  /** Hvor tallene stammer fra, og hvad der mangler. Vises på siden. */
  source: "his" | "ours";
  sourceNote: string;
  /** Over dette areal er opgaven ikke længere en lørdag med en sprøjte. */
  proAboveM2: number;
};

export const DOSAGE: Record<string, Dose> = {
  // Hans tekst: "5 L koncentrat – giver op til 50 L færdig blanding ved
  // forebyggende behandling", altså 1:9. Forbruget pr. m² oplyser han
  // derimod ikke for A-Tox+, og vi har sat det efter det forbrug, han selv
  // offentliggør for Protox Svamp på træværk. Det er et kvalificeret tal,
  // ikke hans tal, og det er derfor mærket, så han kan rette ét sted.
  "a-tox-25ltr": {
    unit: "l",
    rates: [
      { key: "forebyg", label: "Forebyggende, træet er sundt", perM2: 0.25 },
      { key: "bekaemp", label: "Bekæmpende, der er aktive huller", perM2: 0.5 },
    ],
    concentrate: {
      yield: 10,
      note: "5 liter koncentrat giver op til 50 liter færdig blanding ved forebyggende behandling",
    },
    source: "ours",
    sourceNote:
      "Fortyndingen er hans egen. Forbruget pr. m² oplyser A-Tox+ ikke, så det er sat efter det forbrug, han selv angiver for Protox Svamp på træværk. Tjek etiketten, før du bestiller.",
    proAboveM2: 60,
  },

  // "Træværk: Ved forebyggende behandlinger: 0,25ltr pr m2. Ved bekæmpende
  // behandlinger: 0,5ltr pr m2. Murværk: 0,5 / 0,75ltr pr m2." Hans egne ord.
  "protox-svamp": {
    unit: "l",
    rates: [
      { key: "trae-forebyg", label: "Træværk, forebyggende", perM2: 0.25 },
      { key: "trae-bekaemp", label: "Træværk, bekæmpende", perM2: 0.5 },
      { key: "mur-forebyg", label: "Murværk, forebyggende", perM2: 0.5 },
      { key: "mur-bekaemp", label: "Murværk, bekæmpende", perM2: 0.75 },
    ],
    source: "his",
    sourceNote: "Forbruget står i hans egen produkttekst.",
    proAboveM2: 50,
  },

  // "Dosering af Perma Forte B: 1 ltr rækker til ca. 50m2 behandlingsflade."
  // Og: skal anvendes ufortyndet.
  "perma-forte-b": {
    unit: "l",
    rates: [{ key: "std", label: "Bekæmpelse, ufortyndet", perM2: 0.02 }],
    source: "his",
    sourceNote: "1 liter rækker til ca. 50 m², ordret fra hans produkttekst. Bruges ufortyndet.",
    proAboveM2: 200,
  },

  // "50 ml Deltasect rækker til behandling af op til ca. 100 m² overflade."
  deltasect: {
    unit: "ml",
    rates: [{ key: "std", label: "Revner, sprækker og kanter", perM2: 0.5 }],
    source: "his",
    sourceNote: "50 ml til ca. 100 m², ordret fra hans produkttekst.",
    proAboveM2: 300,
  },

  // "Dosering: 1kg rækker til ca. 1200m2."
  "ironmax-pro": {
    unit: "g",
    rates: [{ key: "std", label: "Udstrøning mellem planterne", perM2: 0.83 }],
    source: "his",
    sourceNote: "1 kg rækker til ca. 1.200 m², ordret fra hans produkttekst.",
    proAboveM2: 5000,
  },

  // "500g rækker til ca. 200m2. 1kg rækker til ca. 400m2."
  "trinol-ferroslug": {
    unit: "g",
    rates: [{ key: "std", label: "Udstrøning i bede og køkkenhave", perM2: 2.5 }],
    source: "his",
    sourceNote: "500 g til ca. 200 m², ordret fra hans produkttekst.",
    proAboveM2: 2000,
  },

  // "Én pose på blot 100 g blandes med 10 liter vand og giver ca. 10-20 m²
  // behandling." Beregneren regner på 10 m², den forsigtige ende, fordi den
  // anden ende er den, man løber tør på.
  "myreudvanding-xtra": {
    unit: "g",
    rates: [{ key: "std", label: "Udvanding langs sokkel og fliser", perM2: 10 }],
    concentrate: {
      yield: 100,
      note: "100 g pulver blandes med 10 liter vand",
    },
    source: "his",
    sourceNote:
      "100 g til 10 liter vand og ca. 10-20 m², ordret fra hans produkttekst. Der regnes på 10 m², den forsigtige ende.",
    proAboveM2: 400,
  },
};
