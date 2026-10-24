import type { ReactNode } from "react";
import { allSpeciesRoutes, speciesBySlug } from "./speciesContent";
import { servicePest } from "./serviceContent";

const B = import.meta.env.BASE_URL;

// The everyday singular of each pest, so "en hveps" or "myren" links too,
// not only the plural on the service page.
const SINGULAR: Record<string, string> = {
  myre: "myrer", edderkop: "edderkopper", hveps: "hvepse", kakerlak: "kakerlakker", flue: "fluer",
  "møl": "moel", snegl: "snegle", klanner: "klannere", borebille: "borebiller", "væggelus": "vaeggelus",
  rotte: "rotter", mus: "mus", loppe: "lopper", lus: "lus", "flåt": "flaater", "tæge": "flaater",
  "mår": "maar", due: "fugle", fugl: "fugle", "ræv": "vildedyr", "grævling": "vildedyr", hare: "vildedyr",
};

/**
 * Wiki links: every species or pest named in an article's text links to its
 * own page, so a reader can wander from one to the next. Built from the
 * article index, so a new species is linked everywhere without touching text.
 */
function targets(): Map<string, string> {
  const out = new Map<string, string>();
  const services = new Set<string>();
  for (const [service, slug] of allSpeciesRoutes()) {
    services.add(service);
    const a = speciesBySlug(service, slug)!;
    // "Gul engmyre (ænsmyren)" -> "Gul engmyre"; "Muldvarpeskud eller mosegris?" -> "Muldvarpeskud".
    const term = (a.title ?? a.name).replace(/\s*\(.*\)$/, "").replace(/ eller .*$/, "");
    out.set(term.toLowerCase(), `${B}service/${service}/${slug}/`);
  }
  for (const service of services) {
    const label = servicePest(service)?.label;
    if (label && !out.has(label.toLowerCase())) out.set(label.toLowerCase(), `${B}service/${service}/`);
  }
  for (const [word, service] of Object.entries(SINGULAR)) {
    if (services.has(service) && !out.has(word)) out.set(word, `${B}service/${service}/`);
  }
  return out;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Longest first, so "sort havemyre" wins over a shorter name inside it. The
// optional ending catches the usual Danish inflections: myren, myrer, myrernes.
// Built on first use, not at import, so the content modules are loaded by then.
let HREF: Map<string, string> | undefined;
let PATTERN: RegExp | undefined;

/**
 * The text with its first mention of each other page turned into a link.
 * `used` is shared across one page's paragraphs (seed it with the page's own
 * URL), so each target is linked once per page and a page never links itself.
 */
export function linkify(text: string, used: Set<string>): ReactNode[] {
  HREF ??= targets();
  PATTERN ??= new RegExp(
    `(?<!\\p{L})(${[...HREF.keys()].map(escape).sort((a, b) => b.length - a.length).join("|")})(?:erne|ens|en|er|et|ne|s|n|e|r)?(?!\\p{L})`,
    "giu",
  );
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const href = HREF.get(m[1].toLowerCase());
    if (!href || used.has(href)) continue;
    used.add(href);
    out.push(text.slice(last, m.index), <a key={m.index} href={href} className="link wiki-link">{m[0]}</a>);
    last = m.index! + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}
