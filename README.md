# billigskadedyr-redesign

Concept redesign of [billigskadedyr.dk](https://billigskadedyr.dk) — pest control in Jutland and Funen (Denmark). Static React/Vite site with prerendered service and species pages.

## Requirements

- Node.js 18+
- Python 3 (for the prerender step)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173/billigskadedyr-redesign/

## VS Code tasks

Open `Terminal > Run Task` to see the tasks:

- **dev: start dev server** — starts Vite (default build task, `Ctrl+Shift+B`)
- **install dependencies** — `npm install`
- **build: site (build + prerender)** — typecheck, build and prerender; runs install first
- **preview: serve production build** — serves `dist/` locally

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b` + `vite build` into `dist/` |
| `npm run preview` | Serves the built `dist/` |
| `npm run prerender` | Runs `scripts/prerender.py` (browser prerender via CDP) |
| `npm run build:site` | Build + prerender in one go |

## Structure

- `src/` — React app (components, themes, tokens)
- `service/` — service and species pages (`service/<slug>/index.html`), auto-discovered by the Vite config
- `shop/` — shop page
- `scripts/` — prerender, shells, and checks (pricing, routes, upload, etc.)
- `public/` — static assets (fonts, favicon, images)
- `docs/` — plans, reviews, and content notes
- `dist/` — build output (committed, deployed via GitHub Pages)

The base path is `/billigskadedyr-redesign/` (GitHub Pages), see `vite.config.ts`.
