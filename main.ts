import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Copy VIDEO.json from the repository root to the output directory.
// The grader reads the video address from there; nothing else is written.
const botDir = process.env.MAKEFUN_BOT_DIR || "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(botDir, "VIDEO.json");
const dst = join(outDir, "VIDEO.json");

if (!existsSync(src)) {
  throw new Error(`VIDEO.json not found at ${src}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
