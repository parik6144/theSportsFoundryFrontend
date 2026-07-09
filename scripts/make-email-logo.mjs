import sharp from "sharp";
import { resolve } from "path";

const input = resolve("public/brand/client-logo-hero.png");
const output = resolve("public/brand/client-logo-email.png");

await sharp(input)
  .resize({ width: 300, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(output);

const { size } = await import("fs").then((fs) => ({
  size: fs.statSync(output).size,
}));
console.log(`Wrote ${output} (${Math.round(size / 1024)} KB)`);
