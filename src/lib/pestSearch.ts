/**
 * How customers describe pests, as opposed to how a pest controller names
 * them. This is the one file to edit when a word is missing or a description
 * reads wrong: nothing else needs touching, and nothing here affects prices,
 * URLs or page content.
 *
 * Each pest has two things.
 *
 *   tell   One line saying what you would actually notice in your own home.
 *          Shown under the name in search results, so somebody who searched
 *          "bille" and got four of them can tell which is his. Keep it to
 *          what a person sees, not what we do about it.
 *
 *   words  What people type. Include the species and its variants, the
 *          everyday word, the symptom rather than the animal, where it was
 *          seen, and the English and misspelled forms. A word that fits two
 *          pests belongs on both. Matching is substring based and folds the
 *          Danish letters, so "stankel" already finds "stankelben" and
 *          gåsebiller, gaasebiller and gasebiller are the same search. There
 *          is no need to list plurals that only add letters to the end.
 */
export type PestSearch = { tell: string; words: string[] };

export const PEST_SEARCH: Record<string, PestSearch> = {
  myrer: {
    tell: "Stier af små myrer inde i køkkenet eller ude på terrassen",
    words: ["myre", "myrer", "myretue", "myrebo", "ants", "ant", "sorte myrer", "røde myrer",
      "små sorte insekter", "kryb i køkkenet", "myrer på terrassen", "myrer under fliser",
      "myrestier", "sukkermyre", "pharaomyre", "skovmyre", "havemyre", "engmyre",
      "myrer i huset", "kravl", "krible krable"],
  },
  edderkopper: {
    tell: "Spind i hjørner og vindueskarme, eller langbenede edderkopper i kælderen",
    words: ["stankelben", "stankelbenslarve", "edderkop", "edderkopper", "spider", "spindelvæv",
      "spind", "otte ben", "langbenet", "korsedderkop", "husedderkop", "kælderedderkop",
      "vandredderkop", "store edderkopper", "edderkopper i kælderen", "stankelbensedderkop",
      "mange ben"],
  },
  hvepse: {
    tell: "Et bo, og hvepse der flyver ind og ud det samme sted hele dagen",
    words: ["hveps", "hvepse", "hvepsebo", "bi", "bier", "gedehams", "gedehamse", "bo", "rede",
      "sværm", "stik", "stukket", "wasp", "bee", "hornet", "bo under tagsten", "bo på loftet",
      "bo i hækken", "jordbi", "murbi", "honningbi", "humlebi", "hvepse i skunken",
      "flyvende insekter der stikker"],
  },
  vaeggelus: {
    tell: "Stik på række om natten, og små blodpletter på lagenet",
    words: ["væggelus", "veggelus", "bedbugs", "bed bugs", "bedbug", "stik i sengen",
      "bid om natten", "bidt om natten", "seng", "madras", "sengekant", "blodpletter på lagen",
      "kløe om natten", "utøj i sengen", "hotel", "rejse", "små brune insekter i sengen"],
  },
  soelvfisk: {
    tell: "Hurtige sølvgrå insekter på gulvet i badeværelset eller bryggerset",
    words: ["sølvfisk", "solvfisk", "skægkræ", "skaegkrae", "sølvkræ", "sølvfisk i badeværelset",
      "hurtige insekter", "hurtigt kryb", "fugt", "badeværelse", "bryggers", "kælder",
      "under vasken", "silverfish", "sølvgrå insekter", "papirfisk", "insekter ved afløb",
      "lange følehorn", "insekter om natten på gulvet"],
  },
  borebiller: {
    tell: "Små runde huller i træværk eller møbler, med fint lyst støv under",
    words: ["bille", "biller", "beetle", "borebille", "borebiller", "træorm", "orm i træ",
      "huller i træ", "huller i møbler", "bjælker", "spær", "gammelt træ", "boremel",
      "træstøv", "savsmuld", "møbelangreb", "husbukke", "træskadedyr", "loftsbjælker",
      "trægulv", "woodworm", "orm"],
  },
  kakerlakker: {
    tell: "Brune insekter i køkkenet, der løber i skjul når du tænder lyset",
    words: ["kakerlak", "kakerlakker", "kakkerlak", "kakkerlakker", "cockroach", "roach",
      "brune biller", "biller i køkkenet", "natdyr", "insekter bag komfuret", "bag køleskabet",
      "køkken", "restaurant", "storkøkken", "tyskere", "brune insekter der løber",
      "insekter om natten i køkkenet", "hurtige brune biller"],
  },
  fluer: {
    tell: "Mange fluer på én gang, tit ved vinduet eller oppe på loftet",
    words: ["flue", "fluer", "flies", "fly", "spyflue", "kødflue", "stueflue", "bananflue",
      "frugtflue", "eddikeflue", "summen", "mange fluer", "fluer i vindueskarmen",
      "fluer på loftet", "klyngeflue", "fluer om efteråret", "maddiker",
      "larver i skraldespanden", "insekter omkring frugt"],
  },
  gaasebiller: {
    tell: "Gule pletter i plænen, hvor græsset kan rulles op uden rødder",
    words: ["bille", "biller", "beetle", "gåsebille", "gaasebille", "gåsebiller", "stankelben",
      "stankelbenslarver", "stankelbenslarve", "oldenborre", "oldenborrer", "engerling",
      "engerlinger", "larver i plænen", "larver i græsset", "larver", "hvide larver",
      "krumme larver", "død plæne", "gule pletter", "brune pletter i plænen", "plænen slipper",
      "græsset ruller op", "fugle hakker i plænen", "krager i plænen", "råger", "plæne",
      "græsplæne", "græs der dør"],
  },
  moel: {
    tell: "Huller i uldtøjet, eller spind og klumper i mel og gryn",
    words: ["møl", "moel", "mol", "moth", "huller i tøjet", "huller i trøjen", "tøj", "uld",
      "uldtøj", "uldtæppe", "melmøl", "klædemøl", "pelsmøl", "rugmøl", "larver i skabet",
      "møl i mel", "spind i mel", "spind i posen", "klædeskab", "garderobe",
      "sommerfugle indendørs", "små sommerfugle", "insekter i melposen", "genbrugstøj"],
  },
  myg: {
    tell: "Stik og kløende buler om aftenen, og sværme ude omkring huset",
    words: ["myg", "mosquito", "moskito", "stikmyg", "dansemyg", "kvægmyg", "mitter", "stik",
      "myggestik", "sværm", "sværme", "stikkende insekter", "myg i haven", "myg på terrassen",
      "myg i soveværelset", "regnvandstønde", "stillestående vand", "vandtønde", "sø",
      "insekter der stikker om aftenen", "kløende buler"],
  },
  klannere: {
    tell: "Små biller i vindueskarmen, og skader i tæpper, uldtøj eller dyner",
    words: ["bille", "biller", "beetle", "klanner", "klannere", "pelsklanner", "museumsbille",
      "tæppebille", "små biller i vindueskarmen", "biller i vindueskarmen", "behåret larve",
      "hårede larver", "larvehuder", "huller i tøjet", "huller i tæppet", "tæppe", "uld",
      "pels", "fjer", "dyner", "puder", "polstrede møbler", "udstoppede dyr", "carpet beetle",
      "små runde biller", "larver under fodlisten"],
  },
  snegle: {
    tell: "Afgnavede blade i bedene, og blanke slimspor om morgenen",
    words: ["snegl", "snegle", "dræbersnegl", "dræbersnegle", "draebersnegl",
      "iberisk skovsnegl", "agersnegl", "vinbjergsnegl", "slug", "snail", "slim", "slimspor",
      "æder mine planter", "spist salat", "huller i bladene", "bed", "køkkenhave", "have",
      "planter ædt", "røde snegle", "sorte snegle", "snegle i bedet"],
  },
  muldvarpe: {
    tell: "Bunker af jord i plænen, og gange der giver efter under foden",
    words: ["muldvarp", "muldvarpe", "mole", "muldskud", "muldvarpeskud", "skud i plænen",
      "jordbunker", "bunker af jord", "mosegris", "vandrotte", "gange i plænen",
      "huller i plænen", "ujævn plæne", "plæne", "græsplæne", "gnavet rødder",
      "planter visner", "løg ædt", "gulerødder ædt", "dyr under jorden", "gravende dyr"],
  },
};
