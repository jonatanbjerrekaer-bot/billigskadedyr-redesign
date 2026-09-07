/**
 * Preparing a visitor's photo for sending.
 *
 * None of this is security. Everything here runs in the visitor's browser and
 * an attacker simply does not use the form: they POST at the endpoint with
 * whatever bytes they like. What this file buys is that honest people cannot
 * accidentally send something the owner's mailbox will reject, that the
 * obvious wrong file is caught before it is uploaded, and that a photo does
 * not carry the sender's home address in it. The controls that actually
 * defend the mailbox are listed in SERVER_CONTRACT below and none of them can
 * live here.
 */

export const LIMITS = {
  /** Per file, before we re-encode it. A phone photo is well under this. */
  maxFileBytes: 8 * 1024 * 1024,
  /**
   * All files together, after re-encoding. This is the number that matters,
   * because the destination is an email: attachments are base64 encoded, which
   * costs about 37% on top, so 10 MB here arrives as roughly 13.7 MB. Many
   * mail servers refuse a message over 25 MB and some over 10, and a bounce
   * means the enquiry is silently lost rather than merely large.
   */
  maxTotalBytes: 10 * 1024 * 1024,
  /** Three photos of one wasp nest is already generous. */
  maxFiles: 3,
  /** Longest edge after downscaling. Plenty to identify an insect by. */
  maxEdge: 1600,
  quality: 0.82,
} as const;

/** Base64 costs 4 bytes per 3, plus header overhead. */
export const encodedSize = (bytes: number) => Math.ceil(bytes * 4 / 3) + 512;

/**
 * What the file actually is, by its leading bytes, rather than by its name or
 * by the type the browser reports. Both of those come from the person sending
 * the file. Renaming exploit.exe to photo.jpg defeats an extension check and
 * defeats the accept attribute, and it does not defeat this.
 *
 * SVG is deliberately absent and must stay absent: it is XML, it can carry
 * script, and it is the one image format that is dangerous merely to display.
 */
export function sniff(head: Uint8Array): string | null {
  const b = head;
  const at = (i: number, ...sig: number[]) => sig.every((v, k) => b[i + k] === v);
  if (at(0, 0xff, 0xd8, 0xff)) return "image/jpeg";
  if (at(0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "image/png";
  // RIFF....WEBP
  if (at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return "image/webp";
  // ....ftyp{heic,heix,hevc,mif1,msf1}
  if (at(4, 0x66, 0x74, 0x79, 0x70)) {
    const brand = String.fromCharCode(...Array.from(b.slice(8, 12)));
    if (["heic", "heix", "hevc", "heim", "heis", "mif1", "msf1"].includes(brand)) {
      return "image/heic";
    }
  }
  return null;
}

export type Prepared = { name: string; blob: Blob; bytes: number };
export type Rejection = { name: string; reason: string };

/**
 * Re-encode through a canvas. This is here for size and for privacy, not for
 * safety: drawing to a canvas and reading it back keeps only pixels, so EXIF
 * goes with it, and EXIF on a phone photo of a wasp nest contains the GPS
 * coordinates of the sender's house. Sending those on to the owner is not
 * something anybody asked for.
 *
 * HEIC is the case this cannot always handle, because only Safari decodes it.
 * When decoding fails the original file is kept and the server re-encodes it,
 * which it has to do anyway.
 */
async function reencode(file: File): Promise<{ blob: Blob; name: string }> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("decode"));
      i.src = url;
    });
    const scale = Math.min(1, LIMITS.maxEdge / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", LIMITS.quality),
    );
    if (!blob) throw new Error("encode");
    return { blob, name: file.name.replace(/\.[^.]+$/, "") + ".jpg" };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function prepare(
  files: File[],
  already: Prepared[],
): Promise<{ accepted: Prepared[]; rejected: Rejection[] }> {
  const accepted: Prepared[] = [];
  const rejected: Rejection[] = [];
  let total = already.reduce((n, f) => n + f.bytes, 0);

  for (const file of files) {
    if (already.length + accepted.length >= LIMITS.maxFiles) {
      rejected.push({ name: file.name, reason: `Vi tager højst ${LIMITS.maxFiles} billeder.` });
      continue;
    }
    if (file.size > LIMITS.maxFileBytes) {
      rejected.push({
        name: file.name,
        reason: `Billedet fylder for meget. Højst ${LIMITS.maxFileBytes / 1024 / 1024} MB pr. billede.`,
      });
      continue;
    }
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (!sniff(head)) {
      rejected.push({
        name: file.name,
        reason: "Det ser ikke ud til at være et billede. Send en JPG, PNG, WebP eller et billede fra din telefon.",
      });
      continue;
    }

    let out: Prepared;
    try {
      const { blob, name } = await reencode(file);
      out = { name, blob, bytes: blob.size };
    } catch {
      // HEIC outside Safari lands here. The server re-encodes anyway.
      out = { name: file.name, blob: file, bytes: file.size };
    }

    if (total + out.bytes > LIMITS.maxTotalBytes) {
      rejected.push({
        name: file.name,
        reason: `Billederne fylder tilsammen for meget til at kunne sendes som mail. Højst ${LIMITS.maxTotalBytes / 1024 / 1024} MB i alt.`,
      });
      continue;
    }
    total += out.bytes;
    accepted.push(out);
  }
  return { accepted, rejected };
}

/**
 * The endpoint does not exist yet. When it does, these are the parts that
 * cannot be done in a browser, in the order they matter. Everything in this
 * file is a convenience on top of them, not a substitute for any of them.
 *
 *  1. Re-encode every image server side: decode it, then write a fresh file
 *     from the pixels. This is the one control that does the most work. It
 *     destroys polyglots (a file that is a valid JPEG and a valid archive or
 *     HTML at once), anything hidden after the image data, and every scrap of
 *     metadata. Anything that fails to decode is not an image: reject it.
 *  2. Trust the bytes, never the name or the Content-Type. Both are supplied
 *     by the sender. Sniff the magic bytes as above and reject on mismatch.
 *  3. Refuse SVG, and never serve an uploaded file from a domain that matters.
 *     SVG is XML that can carry script.
 *  4. Cap decoded dimensions and total pixels before decoding, not just the
 *     file size. A few hundred KB of PNG can expand into gigabytes of bitmap,
 *     which takes the server down without any exploit at all.
 *  5. Generate the stored filename yourself. Never reuse the client's: it can
 *     carry path traversal, CRLF that forges mail headers, or right to left
 *     override characters that make an executable look like a photo.
 *  6. Enforce the count and both size limits again. The values here are
 *     advisory; the sender chooses what to send.
 *  7. Rate limit by IP and by recipient, and keep the spam stack the form's
 *     header comment already describes.
 *  8. Prefer not to attach at all. Storing the image and mailing a link keeps
 *     hostile bytes out of the owner's mail client entirely, and sidesteps
 *     attachment size limits. If it must be attached, attach the re-encoded
 *     copy, never the original.
 *  9. Scan with an antivirus if one is available. Useful, but last: it catches
 *     known samples, and step 1 already removes the structure most of them
 *     rely on.
 */
export const SERVER_CONTRACT = true;
