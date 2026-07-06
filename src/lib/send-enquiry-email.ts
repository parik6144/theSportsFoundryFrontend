import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/site-contact";

export type EnquiryEmailPayload = {
  name: string;
  email: string;
  phone?: string | null;
  type: string;
  subject?: string | null;
  message: string;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendEnquiryEmail(payload: EnquiryEmailPayload) {
  const transport = getTransport();
  if (!transport) {
    console.warn("[enquiry] SMTP not configured — saved to database only.");
    return { sent: false as const };
  }

  const to = process.env.ENQUIRY_TO_EMAIL || CONTACT_EMAIL;
  const from = process.env.SMTP_FROM || `The Sports Foundry <${process.env.SMTP_USER}>`;
  const subject = payload.subject
    ? `[${payload.type}] ${payload.subject}`
    : `[${payload.type}] New enquiry from ${payload.name}`;

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Type: ${payload.type}`,
    "",
    payload.message,
  ];

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text: lines.join("\n"),
  });

  return { sent: true as const };
}
