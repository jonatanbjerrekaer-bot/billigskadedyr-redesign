/**
 * Species name (as written in serviceContent) → drawing in public/species.
 * Public-domain natural-history drawings from Wikimedia Commons, cut out of
 * their pages and redrawn in the site's ink so they read as one set; the
 * source page for each file is in public/species/SOURCES.md.
 *
 * A page shows drawings only when every species on it has one, so a drawing
 * never sits next to an icon. Pages missing even one are left out here.
 */
export const SPECIES_ART: Record<string, string> = {
  Husflue: "husflue",
  Kloakflue: "kloakflue",
  Bananflue: "bananflue",
  Klædemøl: "klaedemoel",
  Melmøl: "melmoel",
  Pelsmøl: "pelsmoel",
  Stikmyg: "stikmyg",
  Dansemyg: "dansemyg",
  Kvægmyg: "kvaegmyg",
  Muldvarp: "muldvarp",
  Mosegris: "mosegris",
  Skuddene: "muldvarpeskud",
  Skægkræ: "skaegkrae",
  Sølvfisk: "soelvfisk",
  Husedderkop: "husedderkop",
  Vinduesedderkop: "vinduesedderkop",
  Korsedderkop: "korsedderkop",
  "Tysk kakerlak": "tysk-kakerlak",
  "Orientalisk kakerlak": "orientalsk-kakerlak",
  "Amerikansk kakerlak": "amerikansk-kakerlak",
  "Rød skovmyre": "roed-skovmyre",
  "Sort havemyre": "sort-havemyre",
  Pharaomyre: "pharaomyre",
  "Gul engmyre (ænsmyren)": "gul-engmyre",
  Dræbersnegl: "draebersnegl",
  Agersnegl: "agersnegl",
  Vinbjergsnegl: "vinbjergsnegl",
  // Pelsklanner, Tysk hveps and Borebille had no usable drawing, so these three
  // are public-domain photos redrawn as ink (photo2ink, see SOURCES.md).
  Pelsklanner: "pelsklanner",
  Museumsbille: "museumsbille",
  Larven: "klannerlarve",
  "Tysk hveps": "tysk-hveps",
  "Almindelig hveps": "almindelig-hveps",
  Jordhveps: "jordhveps",
  Husbuk: "husbuk",
  Løvtræborebille: "loevtraeborebille",
  "Borebille i møbler og gulve": "borebille",
  Stankelbenslarve: "stankelbenslarve",
  Gåsebille: "gaasebille",
  Oldenborre: "oldenborre",
  "Almindelig væggelus": "almindelig-vaeggelus",
  // Hand-traced from a CC0 Naturalis slide specimen (see SOURCES.md); the only verified image of the species.
  Vingetæge: "vingetaege",
};
