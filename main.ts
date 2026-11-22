import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Copy VIDEO.json from the repository root to the output directory.
// The grader reads the video address from there; nothing else is written.
// Before copying, validate that the address is a full public TikTok video
// URL: a short link or the <id> placeholder would pass silently here and
// only fail the entry_link check downstream, so refuse it up front.
const botDir = process.env.MAKEFUN_BOT_DIR || "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(botDir, "VIDEO.json");
const dst = join(outDir, "VIDEO.json");

if (!existsSync(src)) {
  throw new Error(`VIDEO.json not found at ${src}`);
}
const videoUrl = JSON.parse(readFileSync(src, "utf8")).url;
if (
  typeof videoUrl !== "string" ||
  !/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/\d+(\?.*)?$/.test(videoUrl)
) {
  throw new Error(
    `VIDEO.json url ${JSON.stringify(videoUrl)} is not a full www.tiktok.com video URL: it must be https://www.tiktok.com/@<handle>/video/<id>`
  );
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
