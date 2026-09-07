import os, io

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "src", "lib", "serviceContent.ts")
NL = chr(10)
SP = chr(32)
LB = chr(123)
SEP = chr(58) + SP

body = io.open(CONTENT, encoding="utf-8").read()
lines = body.split(NL)
slugs = []
for _l in lines:
    if _l.startswith(SP + SP) and _l.endswith(LB) and (SEP in _l) and ("species" not in _l):
        slugs.append(_l.strip().split(SEP)[0])

assert len(slugs) == 9, f"expected 9, got {slugs}"

FAVICON = "/billigskadedyr-redesign/favicon.svg"
SCRIPT = "/src/service-entry.tsx"

def shell(slug):
    p = []
    p.append("<!doctype html>")
    p.append('<html lang="da" data-pest="' + slug + '">')
    p.append("  <head>")
    p.append('    <meta charset="UTF-8" />')
    p.append('    <meta name="viewport" content="width=device-width, initial-scale=1.0" />')
    p.append('    <link rel="icon" type="image/svg+xml" href="' + FAVICON + '" />')
    p.append("    <title>Professionel bekæmpelse af " + slug + " | Billigskadedyr.dk</title>")
    p.append('    <meta name="description" content="" />')
    p.append('    <script type="module" src="' + SCRIPT + '"></script>')
    p.append("  </head>")
    p.append("  <body>")
    p.append('    <div id="root"></div>')
    p.append("  </body>")
    p.append("</html>")
    p.append("")
    return NL.join(p)

for slug in slugs:
    d = os.path.join(ROOT, "service", slug)
    os.makedirs(d, exist_ok=True)
    io.open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(shell(slug))
    print("wrote", os.path.relpath(os.path.join(d, "index.html"), ROOT))

VITE = os.path.join(ROOT, "vite.config.ts")
cfg = io.open(VITE, encoding="utf-8").read()
if "rollupOptions" not in cfg:
    entries = ["    index: 'index.html'"]
    for s in slugs:
        key = "service/" + s + "/index.html"
        entries.append("    '" + key + "': '" + key + "'")
    build_block = (
        "  build: {" + NL
        + "    rollupOptions: {" + NL
        + "      input: {" + NL + ",".join(entries) + NL + "      }," + NL
        + "    }," + NL
        + "  }," + NL
    )
    anchor = "  plugins: [react(), tailwindcss()]," + NL
    assert anchor in cfg, "vite plugins anchor not found"
    cfg = cfg.replace(anchor, anchor + build_block, 1)
    io.open(VITE, "w", encoding="utf-8").write(cfg)
    print("patched vite.config.ts with", len(slugs) + 1, "inputs")
else:
    print("vite.config.ts already has rollupOptions; left alone")
print("DONE", slugs)
