/**
 * node --experimental-strip-types scripts/upload.check.ts
 *
 * The magic-byte check is the one piece of the upload path with real logic in
 * it, and it is the piece that fails silently: get it wrong and everything
 * still looks fine until the wrong file gets through. So it gets a check.
 */
import assert from "node:assert";
import { sniff, encodedSize, LIMITS } from "../src/lib/imageUpload.ts";

const bytes = (...v: number[]) => new Uint8Array([...v, ...Array(16 - v.length).fill(0)]);
const ftyp = (brand: string) =>
  new Uint8Array([0, 0, 0, 0x20, 0x66, 0x74, 0x79, 0x70, ...[...brand].map((c) => c.charCodeAt(0)), 0, 0, 0, 0]);

// the formats a phone or a laptop actually produces
assert.equal(sniff(bytes(0xff, 0xd8, 0xff, 0xe0)), "image/jpeg");
assert.equal(sniff(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)), "image/png");
assert.equal(
  sniff(new Uint8Array([0x52, 0x49, 0x46, 0x46, 1, 2, 3, 4, 0x57, 0x45, 0x42, 0x50, 0, 0, 0, 0])),
  "image/webp",
);
assert.equal(sniff(ftyp("heic")), "image/heic");
assert.equal(sniff(ftyp("mif1")), "image/heic");

// and the things that must not pass, whatever they are named
assert.equal(sniff(bytes(0x4d, 0x5a)), null, "MZ: a Windows executable");
assert.equal(sniff(bytes(0x50, 0x4b, 0x03, 0x04)), null, "PK: a zip, and every zip-based format");
assert.equal(sniff(bytes(0x7f, 0x45, 0x4c, 0x46)), null, "ELF binary");
assert.equal(sniff(bytes(0x25, 0x50, 0x44, 0x46)), null, "PDF");
assert.equal(
  sniff(new Uint8Array([...[..."<svg xmlns="].map((c) => c.charCodeAt(0))])),
  null,
  "SVG must never be accepted: it is XML and it can carry script",
);
assert.equal(
  sniff(new Uint8Array([...[..."<!DOCTYPE html"].map((c) => c.charCodeAt(0))])),
  null,
  "HTML",
);
// a real one: RIFF that is not WEBP (a wav, say) must not read as an image
assert.equal(
  sniff(new Uint8Array([0x52, 0x49, 0x46, 0x46, 1, 2, 3, 4, 0x57, 0x41, 0x56, 0x45, 0, 0, 0, 0])),
  null,
  "RIFF/WAVE is not WEBP",
);

// the email arithmetic that set the total limit
assert.ok(encodedSize(LIMITS.maxTotalBytes) < 25 * 1024 * 1024, "must fit a 25 MB mail server");
assert.ok(
  encodedSize(LIMITS.maxTotalBytes) > LIMITS.maxTotalBytes,
  "base64 must be accounted as larger, not smaller",
);
assert.ok(LIMITS.maxFileBytes <= LIMITS.maxTotalBytes, "one file cannot exceed the total");

console.log(
  `OK upload  (${LIMITS.maxFiles} files, ${LIMITS.maxTotalBytes / 1024 / 1024} MB total ` +
    `= ~${(encodedSize(LIMITS.maxTotalBytes) / 1024 / 1024).toFixed(1)} MB once base64 encoded)`,
);
