#!/usr/bin/env python3
"""Regenerates src/lib/distances.json: postnummer -> { by, km, aarhus }.

km is the ONE-WAY driving distance from the base (Viengevej 6A, 8240 Risskov,
the controller address in lib/legal) to the postcode centroid. The calculator
doubles it and multiplies by 3 kr., so the file stays a plain distance table
and the owner's rate lives in one place (lib/pricing.ts).

Sources, in the order this script actually used them on 2026-10-24:
  postcodes, names, centroids, municipality: GeoNames DK.zip. DAWA
    (api.dataforsyningen.dk/postnumre), which the plan named first, answers
    410 Gone now, so GeoNames is the only live source.
  base point: one Nominatim lookup of the address (56.2076, 10.2249).
  driving km: OSRM `table` from the base to every centroid, <= 90 destinations
    per request, sequential, >= 1.5 s apart. A destination OSRM cannot reach by
    road (islands without a bridge) falls back to haversine x 1.3 and is
    marked "approx": true, so nobody mistakes a guess for a route.

Aarhus Kommune is municipality code 751 in GeoNames.

Run on a machine with network access:  python3 scripts/distances.py
"""
import io, json, math, time, urllib.request, zipfile
from pathlib import Path

BASE = (56.2076190, 10.2249490)  # lat, lon
OUT = Path(__file__).resolve().parent.parent / "src" / "lib" / "distances.json"
UA = {"User-Agent": "billigskadedyr-pricing/1.0 (one-off table build)"}
BATCH = 90
PAUSE = 1.6


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def haversine_km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))


def main():
    z = zipfile.ZipFile(io.BytesIO(get("https://download.geonames.org/export/zip/DK.zip")))
    places = {}
    for line in z.read("DK.txt").decode("utf-8").splitlines():
        c = line.split("\t")
        if len(c) < 11 or not c[1].isdigit() or len(c[1]) != 4:
            continue
        nr = c[1]
        if 3900 <= int(nr) <= 3999:  # Greenland; the Faroe Islands are not in the DK file
            continue
        if nr in places:
            continue
        places[nr] = {"by": c[2], "ll": (float(c[9]), float(c[10])), "aarhus": c[6] == "751"}

    nrs = sorted(places)
    out = {}
    for i in range(0, len(nrs), BATCH):
        chunk = nrs[i : i + BATCH]
        coords = [f"{BASE[1]},{BASE[0]}"] + [f"{places[n]['ll'][1]},{places[n]['ll'][0]}" for n in chunk]
        url = (
            "https://router.project-osrm.org/table/v1/driving/"
            + ";".join(coords)
            + "?sources=0&annotations=distance"
        )
        data = json.loads(get(url))
        row = data["distances"][0][1:]
        for n, d in zip(chunk, row):
            p = places[n]
            entry = {"by": p["by"], "aarhus": p["aarhus"]}
            if d is None:
                entry["km"] = round(haversine_km(BASE, p["ll"]) * 1.3)
                entry["approx"] = True
            else:
                entry["km"] = round(d / 1000)
            out[n] = entry
        print(f"{i + len(chunk)}/{len(nrs)}", flush=True)
        time.sleep(PAUSE)

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=0, sort_keys=True) + "\n", encoding="utf-8")
    approx = [n for n, e in out.items() if e.get("approx")]
    print(f"wrote {len(out)} postcodes to {OUT}; approx: {approx}")


main()
