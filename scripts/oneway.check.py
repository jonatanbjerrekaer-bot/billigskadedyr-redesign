#!/usr/bin/env python3
"""Butikken må linke til fagmanden. Fagmanden må ikke linke til butikken.

Reglen er en forretningsbeslutning, ikke en smagssag: en kunde, der er på
vej til at bede om en fast pris, skal ikke tilbydes en spray til 140 kr. på
vejen. Den slags regler holder ikke af sig selv, når to sites ligger i samme
repo, så den bliver tjekket her.

Kontrollen gør to ting. Den følger importgrafen fra servicesitets entrypoint
og kræver, at butikkens moduler ikke er i den. Og den læser hver eneste af
servicesitets kildefiler igennem for en adresse, der peger ind i butikken.

Kør: python3 scripts/oneway.check.py
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

SHOP_ONLY = {"shop-entry.tsx", "lib/shop.ts", "lib/shopContent.ts",
             "lib/shopRouter.tsx", "lib/cart.ts"}


def is_shop(rel: str) -> bool:
    return rel.startswith("components/shop/") or rel in SHOP_ONLY


def resolve(importer: pathlib.Path, spec: str):
    """Kun relative imports; pakker er ikke vores problem her."""
    if not spec.startswith("."):
        return None
    p = (importer.parent / spec).resolve()
    for cand in (p, p.with_suffix(".ts"), p.with_suffix(".tsx"),
                 p / "index.ts", p / "index.tsx"):
        if cand.is_file():
            return cand
    # ".tsx" står allerede i specen i dette repo
    return p if p.is_file() else None


def graph(entry: pathlib.Path) -> set[pathlib.Path]:
    seen, stack = set(), [entry]
    while stack:
        f = stack.pop()
        if f in seen or not f.is_file():
            continue
        seen.add(f)
        for spec in re.findall(r'from\s+"([^"]+)"', f.read_text(encoding="utf-8")):
            nxt = resolve(f, spec)
            if nxt:
                stack.append(nxt)
    return seen


fails = []

pro = graph(SRC / "main.tsx")
for f in sorted(pro):
    rel = f.relative_to(SRC).as_posix()
    if is_shop(rel):
        fails.append(f"servicesitet importerer butiksmodulet {rel}")

pro_files = {f.relative_to(SRC).as_posix() for f in pro}
for rel in sorted(pro_files):
    text = (SRC / rel).read_text(encoding="utf-8")
    for m in re.finditer(r'["\'`][^"\'`]*?/shop/[^"\'`]*["\'`]', text):
        fails.append(f"{rel} indeholder en butiks-adresse: {m.group(0)}")
    if re.search(r'\{BASE\}shop/', text):
        fails.append(f"{rel} bygger en butiks-adresse med BASE")

# Og den anden vej skal virke: butikken SKAL linke til fagmanden.
shop_text = "".join(
    p.read_text(encoding="utf-8")
    for p in [SRC / "lib/shopContent.ts", *sorted((SRC / "components/shop").glob("*.tsx"))]
)
if "service/hvepse/" not in shop_text:
    fails.append("butikken linker ikke til nogen serviceside")

if fails:
    print("ENVEJS-REGLEN ER BRUDT")
    for f in fails:
        print("  -", f)
    sys.exit(1)

print(f"OK envejs  ({len(pro)} moduler i servicesitet, ingen af dem butik; "
      "butikken linker til fagmanden)")
