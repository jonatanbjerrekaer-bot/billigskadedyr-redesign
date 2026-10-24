# Photo -> the site's ink drawing. Cut the animal out (GrabCut from a centred
# rectangle), then turn tone into ink density and add edge lines on top, so a
# photo reads like the engraved plates. Run with the Hermes venv (cv2, numpy).
import sys, json, cv2, numpy as np
INK = np.array([27, 43, 35], np.float32)  # RGB, the theme's --color-ink

def cut(img, inset):
    h, w = img.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    rect = (int(w * inset), int(h * inset), int(w * (1 - 2 * inset)), int(h * (1 - 2 * inset)))
    cv2.grabCut(img, mask, rect, np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64), 6, cv2.GC_INIT_WITH_RECT)
    m = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    # keep the largest blob only, fill its holes
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
    if n > 1:
        m = np.where(lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    # On a light studio background GrabCut keeps the cast shadow: drop pixels that are
    # pale and colourless, i.e. background darkened by shadow rather than animal.
    border = np.concatenate([img[:4].reshape(-1, 3), img[-4:].reshape(-1, 3), img[:, :4].reshape(-1, 3), img[:, -4:].reshape(-1, 3)])
    if np.median(border.mean(1)) > 190:
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        shadow = (hsv[..., 1] < 45) & (hsv[..., 2] > 115)
        m[shadow] = 0
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
        if n > 1:
            m = np.where(lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
    return m

def ink(img, mask):
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    inside = mask > 0
    lo, hi = np.percentile(g[inside], [2, 98])
    g = np.clip((g - lo) / max(hi - lo, 1), 0, 1).astype(np.float32)                       # stretch tone over the animal only
    tone = (1 - g) ** 1.1                                               # dark = dense ink
    blur = cv2.GaussianBlur(g, (0, 0), 2.2)
    edges = np.clip(np.hypot(cv2.Sobel(blur, cv2.CV_32F, 1, 0), cv2.Sobel(blur, cv2.CV_32F, 0, 1)) * 2.4, 0, 1)
    # engraving grain: tone shown through fine diagonal lines, so flat areas read as hatching, not airbrush
    yy, xx = np.mgrid[0:g.shape[0], 0:g.shape[1]]
    hatch = (np.sin((xx + yy) * 0.9) * 0.5 + 0.5)
    dens = np.maximum(edges, np.clip(tone * 1.15 - hatch * 0.35, 0, 1))
    outline = cv2.morphologyEx(mask, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8)) > 0
    dens[outline] = np.maximum(dens[outline], 0.85)
    a = (dens * 255 * (mask / 255.0)).astype(np.uint8)
    y, x = np.where(mask > 0); y0, y1, x0, x1 = y.min(), y.max() + 1, x.min(), x.max() + 1
    out = np.dstack([np.full_like(a, INK[2]), np.full_like(a, INK[1]), np.full_like(a, INK[0]), a])[y0:y1, x0:x1]
    return out

src, dst, inset = sys.argv[1], sys.argv[2], float(sys.argv[3]) if len(sys.argv) > 3 else 0.04
img = cv2.imread(src)
s = 900 / max(img.shape[:2]); img = cv2.resize(img, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
out = ink(img, cut(img, inset))
h, w = out.shape[:2]; s = 480 / max(h, w)
out = cv2.resize(out, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
cv2.imwrite(dst, out, [cv2.IMWRITE_WEBP_QUALITY, 85])
print(dst, out.shape[1], out.shape[0])
