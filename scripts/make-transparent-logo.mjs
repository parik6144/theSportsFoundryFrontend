import sharp from "sharp";
import { resolve } from "path";

const input = resolve("public/brand/client-logo.png");
const output = resolve("public/brand/client-logo-hero.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // Knock out near-black background so only the logo artwork remains
  if (r < 40 && g < 40 && b < 40) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log("Wrote", output, `(${info.width}x${info.height})`);
