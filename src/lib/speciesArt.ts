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
  Dræbersnegl: "draebersnegl",
  Agersnegl: "agersnegl",
  Vinbjergsnegl: "vinbjergsnegl",
};
