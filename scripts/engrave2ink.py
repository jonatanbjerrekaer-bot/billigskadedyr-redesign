# Vintage engraving -> the site's ink drawing. The PD plates (Wikimedia
# Commons, BHL, archive.org) are line art on paper: paper tone becomes
# transparency, line tone becomes the theme ink with a luminance ramp, so a
# scanned engraving reads like the hand-drawn set. For CC0 photos use
# photo2ink.py instead (needs cv2). Pure Pillow + numpy, no cv2.
#
#   python3 scripts/engrave2ink.py <src> <dst.webp> [--crop x,y,w,h] [--max N]
#
# --crop   pixel rect to cut to one specimen BEFORE the tone ramp; plates
#          often carry several figures and a caption.
# --max    longest output side in px (default 480, the size of the set).
import argparse
import numpy as np
from PIL import Image

INK = (27, 43, 35)  # RGB, the theme's --color-ink, as in photo2ink.py

p = argparse.ArgumentParser()
p.add_argument("src")
p.add_argument("dst")
p.add_argument("--crop", help="x,y,w,h in pixels")
p.add_argument("--max", type=int, default=480)
a = p.parse_args()

im = Image.open(a.src).convert("L")
if a.crop:
    x, y, w, h = (int(v) for v in a.crop.split(","))
    im = im.crop((x, y, x + w, y + h))
g = np.asarray(im, np.float32)

# Paper tone: the plate's own background, measured at the borders (p97 of the
# whole plate is no good — some plates carry a broad grey vignette around the
# figure that p97 then treats as line). Plates come two ways: dark lines on
# light paper, and white lines on a dark field — detect which from the border.
border = np.concatenate([g[:8].ravel(), g[-8:].ravel(), g[:, :8].ravel(), g[:, -8:].ravel()])
bg = np.median(border)
if bg >= 127:
    paper, dark = bg, min(np.percentile(g, 1), bg - 50)
    alpha = np.clip((paper - g) / max(paper - dark, 1), 0, 1)
else:
    dark, paper = bg, max(np.percentile(g, 99), bg + 50)
    alpha = np.clip((g - dark) / max(paper - dark, 1), 0, 1)
if paper - dark < 40:
    # Probably a photo or an inverted scan, not line art — say so instead of
    # shipping a muddy drawing; photo2ink.py is the tool for photos.
    raise SystemExit(f"{a.src}: kun {paper - dark:.0f} niveauer mellem papir og linje — "
                     "er det et foto? Brug scripts/photo2ink.py i stedet.")

# Film grain and foxing sit in the bottom of the ramp: cut them away, then
# gamma so stipple stays airy and only real lines read as solid ink.
alpha[alpha < 0.08] = 0
alpha = alpha ** 1.5

ys, xs = np.where(alpha > 0.25)
if len(ys) == 0:
    raise SystemExit(f"{a.src}: ingen linjer fundet i udskæringen")
pad = 6
y0, y1 = max(0, ys.min() - pad), min(alpha.shape[0], ys.max() + 1 + pad)
x0, x1 = max(0, xs.min() - pad), min(alpha.shape[1], xs.max() + 1 + pad)
alpha = alpha[y0:y1, x0:x1]

rgba = np.dstack([
    np.full_like(alpha, INK[0]),
    np.full_like(alpha, INK[1]),
    np.full_like(alpha, INK[2]),
    alpha * 255,
]).astype(np.uint8)
out = Image.fromarray(rgba, "RGBA")
s = a.max / max(out.size)
if s < 1:
    out = out.resize((max(1, round(out.size[0] * s)), max(1, round(out.size[1] * s))), Image.LANCZOS)
out.save(a.dst, "WEBP", quality=85)
print(a.dst, out.size[0], out.size[1])
