#!/usr/bin/env python3
"""Hvert produktbillede skal kunne vises i en browser.

Én af hans varer, "Smækfælde inkl. lokkemad", har et billede, der er
uploadet direkte fra en iPhone og stadig er en HEIC-fil, selvom den hedder
.heic i URL'en. Chrome, Firefox og Edge viser den ikke; Safari gør. Den
slags går ubemærket hen, indtil en kunde på Windows ser et tomt felt der,
hvor varen skulle være, og det er værd at fange her i stedet.

Kør: python3 scripts/images.check.py
"""
import pathlib
import sys

SHOP = pathlib.Path(__file__).resolve().parent.parent / "public/shop"
OK = {"jpeg", "png", "webp", "gif"}


def kind(b: bytes) -> str:
    if b[:3] == b"\xff\xd8\xff":
        return "jpeg"
    if b[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if b[:4] == b"RIFF" and b[8:12] == b"WEBP":
        return "webp"
    if b[:6] in (b"GIF87a", b"GIF89a"):
        return "gif"
    if b[4:8] == b"ftyp":
        return "heic/heif"
    return "ukendt"


bad = []
n = 0
for f in sorted(SHOP.iterdir()):
    if not f.is_file():
        continue
    n += 1
    k = kind(f.read_bytes()[:16])
    if k not in OK:
        bad.append((f.name, k))
    if f.stat().st_size < 1024:
        bad.append((f.name, "under 1 kB, sandsynligvis tom"))

if bad:
    print("BILLEDER DER IKKE KAN VISES")
    for name, why in bad:
        print(f"  - {name}: {why}")
    sys.exit(1)

print(f"OK billeder  ({n} filer, alle jpeg/png/webp)")
