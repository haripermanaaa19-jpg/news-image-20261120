// Entry program for make.fun's "Sum up 20 November's world news in one
// image" (Node 22, standard library only).
//
// The picture itself ships beside this file as entry.png — a front page
// composed for Friday 20 November 2026. Running the program delivers that
// picture to the grader: it copies entry.png into the output directory
// (MAKEFUN_OUTPUT_DIR when set, otherwise /output) and then reads the copy
// back and compares hashes, so a truncated or corrupted delivery fails
// loudly instead of being scored as a broken image.

import { copyFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const sourcePath = new URL("./entry.png", import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(outputDir, "entry.png");

function digest(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// Sanity-check the picture before delivering it. The contest caps the file
// at 1 MiB and accepts only a PNG or a JPEG (told apart by their first
// bytes), so a truncated download or a mislabelled file should stop the run
// here with a clear reason rather than reach the grader as a broken entry.
const MAX_BYTES = 1_048_576;
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const original = readFileSync(sourcePath);
const looksPng = PNG_SIGNATURE.every((byte, i) => original[i] === byte);
const looksJpeg = original[0] === 0xff && original[1] === 0xd8;
if (original.length === 0 || original.length > MAX_BYTES || (!looksPng && !looksJpeg)) {
  console.error(
    `entry.png failed the sanity check (${original.length} bytes, ` +
      `recognised image header: ${looksPng || looksJpeg}); refusing to deliver it`,
  );
  process.exit(1);
}

copyFileSync(sourcePath, targetPath);

const delivered = readFileSync(targetPath);
if (original.length !== delivered.length || digest(original) !== digest(delivered)) {
  console.error("entry.png did not survive the copy intact; refusing to report success");
  process.exit(1);
}

console.log(`delivered entry.png (${delivered.length} bytes, sha256 ${digest(delivered)})`);
