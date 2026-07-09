import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const text = readFileSync(resolve(process.cwd(), file), "utf8");
      for (const line of text.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    } catch {
      /* ignore */
    }
  }
}

loadEnv();

const testEmail = process.argv[2] || "parikachhevier2013@gmail.com";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const payload = {
  name: "Test User",
  email: testEmail,
  type: "General",
  subject: "SMTP test — The Sports Foundry",
  message: "This is a test enquiry to confirm forms and email delivery are working.",
};

async function main() {
  await transport.verify();
  console.log("SMTP connection OK");

  const receiver = process.env.ENQUIRY_TO_EMAIL || "info@sportsfoundry.in";
  const from = process.env.SMTP_FROM || `The Sports Foundry <${process.env.SMTP_USER}>`;

  await transport.sendMail({
    from,
    to: receiver,
    replyTo: payload.email,
    subject: `[${payload.type}] ${payload.subject} — ${payload.name}`,
    text: `Test admin notification\n\nName: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  });
  console.log(`Admin copy sent to ${receiver}`);

  await transport.sendMail({
    from,
    to: payload.email,
    replyTo: receiver,
    subject: `We received your enquiry — The Sports Foundry`,
    text: `Hi ${payload.name},\n\nThank you for contacting The Sports Foundry. This is your test confirmation email.\n\n${payload.message}`,
  });
  console.log(`Confirmation sent to ${payload.email}`);
}

main().catch((err) => {
  console.error("SMTP test failed:", err.message);
  process.exit(1);
});
