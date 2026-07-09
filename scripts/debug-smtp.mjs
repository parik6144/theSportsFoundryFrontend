import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

for (const file of [".env.local", ".env"]) {
  try {
    for (const line of readFileSync(resolve(process.cwd(), file), "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  } catch {
    /* ignore */
  }
}

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

console.log("SMTP_USER:", user);
console.log("SMTP_PASS length:", pass?.length, "(expected 16 for app password)");
console.log("SMTP_PASS:", pass);

const configs = [
  { label: "587 STARTTLS", host: "smtp.gmail.com", port: 587, secure: false },
  { label: "465 SSL", host: "smtp.gmail.com", port: 465, secure: true },
  { label: "587 smtp.google.com", host: "smtp.google.com", port: 587, secure: false },
];

for (const cfg of configs) {
  const transport = nodemailer.createTransport({
    ...cfg,
    auth: { user, pass },
  });
  try {
    await transport.verify();
    console.log(`${cfg.label}: OK`);
  } catch (err) {
    console.log(`${cfg.label}: FAIL`);
    console.log(" ", err.message.split("\n")[0]);
  }
}
