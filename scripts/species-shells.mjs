#!/usr/bin/env node
/**
 * Writes one HTML shell per species article and lists them in the sitemap.
 *
 * Each species page needs a real file at its own URL, for the same reason the
 * service pages do: a cold arrival from a search result, and any crawler that
 * does not run JavaScript, gets that file and nothing else. The shells are
 * copies of their service page's shell with the species' own title and
 * description, so the right words are in the source before the prerender has
 * even run.
 *
 * The articles are the source of truth. Add or rename one in
 * src/lib/species/<service>.ts and run this again; shells whose article is
 * gone are left for you to delete by hand, because deleting files from a
 * script that misparsed something is the worse failure.
 *
 * Run: node --experimental-strip-types scripts/species-shells.mjs
 * (The species files only import a type, which stripping removes, so each one
 * loads on its own without a bundler.)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://jonatanbjerrekaer-bot.github.io/billigskadedyr-redesign/";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Keep in step with speciesTitle() in src/main.tsx, which sets the same title
// once the page is running.
const titleOf = (a) => `${a.title ?? a.name}: kendetegn og bekæmpelse | Billigskadedyr.dk`;

const dir = join(ROOT, "src/lib/species");
const urls = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts")).sort()) {
  const service = file.replace(/\.ts$/, "");
  const { default: articles } = await import(pathToFileURL(join(dir, file)).href);
  const template = readFileSync(join(ROOT, "service", service, "index.html"), "utf8");
  for (const a of articles) {
    const html = template
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(titleOf(a))}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(a.description)}" />`);
    const out = join(ROOT, "service", service, a.slug);
    mkdirSync(out, { recursive: true });
    writeFileSync(join(out, "index.html"), html);
    urls.push(`${SITE}service/${service}/${a.slug}/`);
  }
}

// Replace only the species lines, so hand-kept entries stay where they are.
const sitemapPath = join(ROOT, "public/sitemap.xml");
const kept = readFileSync(sitemapPath, "utf8")
  .split("\n")
  .filter((l) => !/\/service\/[^/]+\/[^/]+\/<\/loc>/.test(l));
const end = kept.findIndex((l) => l.includes("</urlset>"));
kept.splice(end, 0, ...urls.map((u) => `  <url><loc>${u}</loc></url>`));
writeFileSync(sitemapPath, kept.join("\n"));

console.log(`${urls.length} species shells written, sitemap updated`);
