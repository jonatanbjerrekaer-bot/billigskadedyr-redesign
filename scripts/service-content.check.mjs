// ponytail: one runnable check for the service/article rules, no framework.
//   node scripts/service-content.check.mjs   (loads the TS modules through vite)
// Guards the owner's 2026-10-29 decisions:
//   1. every service page has a treatment accordion with real content
//   2. every species page inherits or overrides one
//   3. no article text pushes a product/DIY route or cites external "competitor" sources
//   4. the calculator no longer prices a severity dimension
import { readFileSync } from "node:fs";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
const server = await createServer({
  root,
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "silent",
});
let failed = false;
const assert = (cond, msg) => {
  if (!cond) {
    console.error("FAIL " + msg);
    failed = true;
  }
};

try {
  const { SERVICE_CONTENT } = await server.ssrLoadModule("/src/lib/serviceContent.ts");
  const { speciesOf, allSpeciesRoutes } = await server.ssrLoadModule("/src/lib/speciesContent.ts");
  const { treatmentFor } = await server.ssrLoadModule("/src/lib/treatments.ts");

  // 1 + 2: treatment sections resolve everywhere.
  for (const slug of Object.keys(SERVICE_CONTENT)) {
    const t = treatmentFor(slug);
    assert(t, `service "${slug}" has a treatment section`);
    assert(t && t.intro.trim().length > 0, `"${slug}" treatment intro is not empty`);
    assert(t && t.steps.length >= 2, `"${slug}" treatment lists at least two steps`);
    for (const step of t?.steps ?? []) assert(step.trim().length > 0, `"${slug}" treatment has an empty step`);
  }
  const routes = allSpeciesRoutes();
  for (const [service, slug] of routes) {
    const t = treatmentFor(service, slug);
    assert(t, `species "${service}/${slug}" resolves a treatment section`);
    assert(t && t.intro.trim().length > 0 && t.steps.length >= 1, `species "${service}/${slug}" treatment is not empty`);
  }

  // 3: banned terms in rendered copy. `sources` arrays are provenance only and
  // never rendered, so they are not scanned.
  const BANNED = [/Nematoder/i, /Bolius/i, /49 kr/, /webshoppen/i, /Grad af angreb/];
  const hits = [];
  const scan = (where, text) => {
    for (const re of BANNED) {
      if (re.test(text)) hits.push(`${where}: matches ${re} -> "${text.slice(0, 80)}…"`);
    }
  };

  for (const [slug, c] of Object.entries(SERVICE_CONTENT)) {
    scan(`service ${slug} intro`, c.intro);
    if (c.processNote) scan(`service ${slug} processNote`, c.processNote);
    for (const item of c.whyProfessional) scan(`service ${slug} whyProfessional`, item);
    for (const f of c.faq) scan(`service ${slug} faq "${f.q}"`, f.a);
  }
  for (const [service] of routes) {
    for (const a of speciesOf(service)) {
      scan(`species ${service}/${a.slug} description`, a.description);
      for (const s of a.sections) {
        scan(`species ${service}/${a.slug} heading`, s.heading);
        for (const p of s.paragraphs) scan(`species ${service}/${a.slug} "${s.heading}"`, p);
      }
    }
  }
  assert(hits.length === 0, "banned terms in rendered copy:\n" + hits.join("\n"));

  // 4: no severity dimension may creep back into pricing.
  assert(
    !/Severity|EXTRA_VISIT_SHARE|severity/.test(readFileSync(new URL("../src/lib/pricing.ts", import.meta.url), "utf8")),
    "pricing.ts must not reintroduce a severity dimension or priced extra visits",
  );

  if (failed) process.exit(1);
  console.log(
    `OK service-content  (${Object.keys(SERVICE_CONTENT).length} services, ${routes.length} species, no banned terms)`,
  );
} finally {
  await server.close();
}
