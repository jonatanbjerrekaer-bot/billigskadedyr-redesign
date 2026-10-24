#!/usr/bin/env node
/**
 * Every service and species article must have a shell on disk, and every
 * shell must be a vite input, or its URL serves a directory listing that
 * looks like a blank page to a crawler. The nine wiki services added in
 * October 2026 all built this way: the species shells were discovered from
 * disk, but the service shells were a hardcoded list in vite.config.ts, so
 * /service/rotter/ 200'd as an auto-generated listing and nobody noticed.
 *
 * Run: node --experimental-strip-types scripts/routes.check.mjs
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
let bad = 0;
const fail = (msg) => {
  console.error(`  FEJL ${msg}`);
  bad++;
};

// 1. every service dir has a shell, and every shell is a vite input
const services = readdirSync(join(ROOT, "service"), { withFileTypes: true }).filter((d) => d.isDirectory());
const viteConfig = readFileSync(join(ROOT, "vite.config.ts"), "utf8");
const serviceInputsDynamic = viteConfig.includes("const serviceInputs");
for (const svc of services) {
  const shell = join(ROOT, "service", svc.name, "index.html");
  if (!existsSync(shell)) fail(`service/${svc.name}/ mangler index.html`);
  if (!serviceInputsDynamic && !viteConfig.includes(`'service/${svc.name}/index.html'`)) {
    fail(`service/${svc.name}/ er ikke en vite input — /service/${svc.name}/ bliver en directory listing`);
  }
}

// 2. every article in src/lib/species/<service>.ts has a shell and a sitemap line
const sitemap = readFileSync(join(ROOT, "public/sitemap.xml"), "utf8");
const dir = join(ROOT, "src/lib/species");
let articles = 0;
for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts")).sort()) {
  const service = file.replace(/\.ts$/, "");
  const { default: list } = await import(pathToFileURL(join(dir, file)).href);
  if (!services.some((s) => s.name === service)) fail(`src/lib/species/${file} uden tilhørende service-mappe`);
  for (const a of list) {
    articles++;
    if (!existsSync(join(ROOT, "service", service, a.slug, "index.html"))) {
      fail(`service/${service}/${a.slug}/ mangler shell — kør scripts/species-shells.mjs`);
    }
    if (!sitemap.includes(`/service/${service}/${a.slug}/`)) {
      fail(`sitemap.xml mangler service/${service}/${a.slug}/`);
    }
  }
}

// 3. every service shell is in the sitemap
for (const svc of services) {
  if (!sitemap.includes(`/service/${svc.name}/</loc>`) && !sitemap.includes(`/service/${svc.name}/<`)) {
    if (!sitemap.includes(`service/${svc.name}/`)) fail(`sitemap.xml mangler service/${svc.name}/`);
  }
}

if (bad) {
  console.error(`routes.check: ${bad} problem(er)`);
  process.exit(1);
}
console.log(`routes.check OK: ${services.length} services, ${articles} arter, alle med shell + sitemap + vite input`);
