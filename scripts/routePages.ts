import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createServer, type Plugin } from "vite";

/**
 * Writes one HTML file per page after the build, from the built index.html.
 *
 * A static host (GitHub Pages) can only answer /service/myrer/ with a file at
 * that path, and a crawler that does not run scripts reads nothing else. These
 * files used to be committed by hand, ~230 near-empty copies. They are now
 * output: the page list comes from src/lib/routes.ts, the same list the app
 * uses for its tab titles. Also writes sitemap.xml from that list.
 */
const SITE = "https://jonatanbjerrekaer-bot.github.io/billigskadedyr-redesign/";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function routePages(): Plugin {
  let root = "";
  let outDir = "";
  return {
    name: "route-pages",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = join(config.root, config.build.outDir);
    },
    async closeBundle() {
      // Load the page list through Vite itself, so the TypeScript content
      // modules need no separate build step.
      const server = await createServer({
        root,
        configFile: false,
        appType: "custom",
        server: { middlewareMode: true },
        logLevel: "error",
      });
      let pages: { path: string; title: string; description: string; pest: string }[];
      try {
        pages = (await server.ssrLoadModule("/src/lib/routes.ts")).allPages();
      } finally {
        await server.close();
      }

      const home = readFileSync(join(outDir, "index.html"), "utf8");
      // The front page's own canonical, social tags and business data must not
      // be inherited by the other pages.
      const shell = home
        .replace(/\s*<link rel="canonical"[^>]*>/, "")
        .replace(/\s*<meta property="og:[^>]*>/g, "")
        .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

      for (const p of pages) {
        const url = SITE + p.path;
        const html = shell
          .replace(/<html lang="da"/, `<html lang="da" data-pest="${esc(p.pest)}"`)
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`)
          .replace(
            /<meta name="description"[^>]*>/,
            `<meta name="description" content="${esc(p.description)}" />\n    <link rel="canonical" href="${url}" />\n` +
              `    <meta property="og:type" content="website" />\n` +
              `    <meta property="og:title" content="${esc(p.title)}" />\n` +
              `    <meta property="og:description" content="${esc(p.description)}" />\n` +
              `    <meta property="og:url" content="${url}" />\n` +
              `    <meta property="og:image" content="${SITE}og-image.png" />\n` +
              `    <meta property="og:locale" content="da_DK" />`,
          );
        mkdirSync(join(outDir, p.path), { recursive: true });
        writeFileSync(join(outDir, p.path, "index.html"), html);
      }

      const urls = [SITE, ...pages.map((p) => SITE + p.path)];
      writeFileSync(
        join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/sitemaps/0.9/">\n` +
          urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
          `\n</urlset>\n`,
      );
      console.log(`route-pages: ${pages.length} pages and sitemap written`);
    },
  };
}
