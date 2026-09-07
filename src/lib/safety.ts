/*
 * Faremærkning fra de officielle sikkerhedsdatablade.
 *
 * Kilderne er de to PDF'er, han sendte, læst med markitdown:
 *
 *   A-Tox              Tanaco (Trading as Pelsis Denmark) AS, Esbjerg.
 *                      Sikkerhedsdatablad revideret 17/05/2023, version 1.0.
 *   Insekt Koncentrat  Protox ApS, Kolding. Sikkerhedsdatablad revideret
 *                      03.07.2025, version 9.0, UFI 0DXE-A079-A005-343R.
 *
 * Sætningerne står ordret, som de står på etiketten i punkt 2.2. De er
 * hverken omskrevet eller forkortet, for det er præcis den slags tekst, man
 * ikke omskriver: H410 betyder noget bestemt, og "meget giftig med
 * langvarige virkninger for vandlevende organismer" er den formulering, der
 * er godkendt til at sige det.
 *
 * Det er også det ærligste argument, siden har. Man behøver ikke skrive, at
 * en opgave er farlig, når man kan skrive, hvad der står på dunken.
 */

export type Safety = {
  /** Handelsnavnet på databladet, hvis det afviger fra varenavnet. */
  productName: string;
  signal: "Fare" | "Advarsel";
  /** GHS-piktogrammer på etiketten. */
  pictograms: string[];
  /** Aktivstoffet, når databladet navngiver det. */
  active?: string;
  /** Faresætninger, ordret. */
  hazards: string[];
  /** Sikkerhedssætninger, ordret. */
  precautions: string[];
  /** Hvem der har udgivet databladet, og hvornår. */
  source: string;
  /** Salgsbegrænsning, når databladet fastslår en. */
  restriction?: string;
};

export const POISON_LINE =
  "Giftlinjen: 82 12 12 12, døgnet rundt. Ved ulykke: ring 112.";

export const SAFETY: Record<string, Safety> = {
  "a-tox-25ltr": {
    productName: "A-Tox",
    signal: "Advarsel",
    pictograms: ["GHS05", "GHS07", "GHS09"],
    active: "Permethrin (ISO)",
    hazards: [
      "H290 - Kan ætse metaller.",
      "H315 - Forårsager hudirritation.",
      "H317 - Kan forårsage allergisk hudreaktion.",
      "H319 - Forårsager alvorlig øjenirritation.",
      "H410 - Meget giftig med langvarige virkninger for vandlevende organismer.",
    ],
    precautions: [
      "P261 - Undgå indånding af damp, gas, pulver, røg, spray, tåge.",
      "P264 - Vask hænder, underarme og ansigt grundigt efter brug.",
      "P272 - Tilsmudset arbejdstøj bør ikke fjernes fra arbejdspladsen.",
      "P273 - Undgå udledning til miljøet.",
      "P280 - Bær beskyttelseshandsker.",
      "P501 - Indholdet og beholderen bortskaffes på et indsamlingssted for farligt affald.",
    ],
    source:
      "Sikkerhedsdatablad fra Tanaco (Pelsis Denmark) AS, Esbjerg, revideret 17. maj 2023, version 1.0.",
    restriction: "Kun til professionel brug. Sælges til erhvervskunder med gyldigt CVR-nr.",
  },

  "protox-insekt": {
    productName: "Insekt Koncentrat",
    signal: "Advarsel",
    pictograms: ["GHS05", "GHS07", "GHS09"],
    hazards: [
      "H290 - Kan ætse metaller.",
      "H315 - Forårsager hudirritation.",
      "H317 - Kan forårsage allergisk hudreaktion.",
      "H319 - Forårsager alvorlig øjenirritation.",
      "H410 - Meget giftig med langvarige virkninger for vandlevende organismer.",
    ],
    precautions: [
      "P261 - Undgå indånding af tåge og damp.",
      "P280 - Bær øjenbeskyttelse, beskyttelseshandsker og beskyttelsestøj.",
      "P333+P313 - Ved hudirritation eller udslæt: søg lægehjælp.",
      "P390 - Absorbér udslip for at undgå materielskade.",
      "P406 - Opbevares i beholder med modstandsdygtig foring.",
    ],
    source:
      "Sikkerhedsdatablad fra Protox ApS, Kolding, revideret 3. juli 2025, version 9.0.",
    restriction: "Udelukkende til erhvervsmæssig brug.",
  },
};
