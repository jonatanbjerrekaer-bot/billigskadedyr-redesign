# billigskadedyr-redesign

Concept redesign of [billigskadedyr.dk](https://billigskadedyr.dk), pest control in Jutland and Funen (Denmark): the front page, the pest guides (22 services with their species articles) and the privacy and cookie pages. The webshop is not part of this repo; it stays on the WordPress site.

React 19, TypeScript, Vite, HeroUI and Tailwind 4. One `index.html` and one entry, `src/main.tsx`.

## Requirements

- Node.js 22
- Python 3 and a Chromium with remote debugging on port 9222, only for `npm run prerender`

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173/billigskadedyr-redesign/. Every URL works there, because Vite falls back to `index.html`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b`, `vite build`, then one HTML file per page and `sitemap.xml` in `dist/` |
| `npm run preview` | Serves the built `dist/` |
| `npm run prerender` | Writes rendered markup into the built pages (`scripts/prerender.py`) |
| `npm run lint` / `npm run format:check` | ESLint and Prettier |
| `npm run check` | Lint, format check and build; run before every push |

## Pages and how they are built

GitHub Pages can only answer `/service/myrer/` with a file at that path, and a crawler that does not run scripts reads nothing else. So the build writes one HTML file per page from the built `index.html` (`scripts/routePages.ts`). The page list, with each page's title and description, is `src/lib/routes.ts`; the running app uses the same list for its tab titles. Add a service in `src/lib/serviceContent.ts` or an article in `src/lib/species/` and its page, title and sitemap entry follow. Nothing under `dist/` is committed.

`public/service/mus/` and `public/service/rotter/` are redirect pages for two merged services.

## Structure

- `src/` — the app: `components/`, `lib/` (content, router, pricing, `routes.ts`), `themes/`, `tokens.css`
- `scripts/` — `routePages.ts` (build plugin), `prerender.py`, and the pricing and content checks
- `public/` — static assets (fonts, favicons, images)
- `docs/` — plans, reviews and content notes

The base path is `/billigskadedyr-redesign/` (GitHub Pages), see `vite.config.ts`.
