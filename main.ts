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

copyFileSync(sourcePath, targetPath);

const original = readFileSync(sourcePath);
const delivered = readFileSync(targetPath);
if (original.length !== delivered.length || digest(original) !== digest(delivered)) {
  console.error("entry.png did not survive the copy intact; refusing to report success");
  process.exit(1);
}

console.log(`delivered entry.png (${delivered.length} bytes, sha256 ${digest(delivered)})`);
