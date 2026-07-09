import nodemailer from "nodemailer";
import path from "path";
import { existsSync } from "fs";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-contact";
import { DEFAULT_THEME, resolveTheme, type ThemeData } from "@/lib/theme-store";

export type EnquiryEmailPayload = {
  name: string;
  email: string;
  type: string;
  subject?: string | null;
  message: string;
};

const EMAIL_LOGO_CID = "brand-logo";
const EMAIL_LOGO_PATH = path.join(process.cwd(), "public", "brand", "client-logo-email.png");

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textToHtmlWithBreaks(text: string) {
  return escapeHtml(text).replace(/\r?\n/g, "<br/>");
}

function getSiteUrl() {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://13.50.4.113"
  ).replace(/\/$/, "");
}

function getLogoAttachment() {
  if (!existsSync(EMAIL_LOGO_PATH)) return null;
  return {
    filename: "client-logo-email.png",
    path: EMAIL_LOGO_PATH,
    cid: EMAIL_LOGO_CID,
  };
}

function logoImgHtml(theme: ThemeData) {
  const hasFile = existsSync(EMAIL_LOGO_PATH);
  if (hasFile) {
    return `<img src="cid:${EMAIL_LOGO_CID}" alt="${escapeHtml(SITE_NAME)}" width="260" height="auto" style="display:block;margin:0 auto;max-width:260px;height:auto;border:0;outline:none;text-decoration:none;" />`;
  }
  const siteUrl = getSiteUrl();
  return `<img src="${siteUrl}/brand/client-logo-email.png" alt="${escapeHtml(SITE_NAME)}" width="260" style="display:block;margin:0 auto;max-width:260px;height:auto;border:0;" />`;
}

function buildHtmlShell(theme: ThemeData, innerHtml: string) {
  const accent = theme.primaryColor;
  const card = theme.surfaceColor;
  const text = theme.textColor;
  const muted = theme.textMuted;
  const bgLight = theme.backgroundLight;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(SITE_NAME)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a1128;font-family:Arial,Helvetica,sans-serif;color:${text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a1128;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${card};border:1px solid ${accent};border-radius:12px;">
          <tr>
            <td align="center" style="padding:28px 24px 16px 24px;background-color:${bgLight};">
              ${logoImgHtml(theme)}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 28px 28px;">
              ${innerHtml}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;border-top:1px solid ${accent}33;">
                <tr>
                  <td style="padding-top:16px;color:${muted};font-size:12px;line-height:1.5;text-align:center;">
                    Automated message from <strong style="color:${text};">${escapeHtml(SITE_NAME)}</strong><br/>
                    <a href="mailto:${CONTACT_EMAIL}" style="color:${accent};text-decoration:none;">${CONTACT_EMAIL}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildAdminEmailHtml(payload: EnquiryEmailPayload, theme: ThemeData) {
  const accent = theme.primaryColor;
  const details: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Type", payload.type],
    ...(payload.subject ? [["Subject", payload.subject]] : []),
  ];

  const detailRows = details
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 12px;color:${theme.textMuted};font-size:13px;white-space:nowrap;border-bottom:1px solid ${accent}22;">${escapeHtml(k)}</td>
          <td style="padding:10px 12px;color:${theme.textColor};font-size:13px;border-bottom:1px solid ${accent}22;">${escapeHtml(v)}</td>
        </tr>
      `
    )
    .join("");

  const messageHtml = textToHtmlWithBreaks(payload.message);

  const innerHtml = `
    <h2 style="margin:0 0 12px 0;font-size:20px;color:${theme.textColor};font-weight:700;">New enquiry received</h2>
    <p style="margin:0 0 16px 0;color:${theme.textMuted};font-size:14px;line-height:1.6;">
      A new <strong style="color:${accent};">${escapeHtml(payload.type)}</strong> enquiry was submitted on your website.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${accent}33;border-radius:8px;margin-bottom:16px;">
      <tbody>${detailRows}</tbody>
    </table>
    <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:${theme.textColor};">Message</p>
    <div style="background-color:${theme.backgroundLight};border:1px solid ${accent}22;border-radius:8px;padding:14px;color:${theme.textColor};font-size:14px;line-height:1.6;">
      ${messageHtml}
    </div>
    <p style="margin:16px 0 0 0;font-size:12px;color:${theme.textMuted};">
      Reply to: <a href="mailto:${escapeHtml(payload.email)}" style="color:${accent};">${escapeHtml(payload.email)}</a>
    </p>
  `;

  return buildHtmlShell(theme, innerHtml);
}

function buildSenderEmailHtml(payload: EnquiryEmailPayload, theme: ThemeData) {
  const accent = theme.primaryColor;

  const innerHtml = `
    <h2 style="margin:0 0 12px 0;font-size:20px;color:${theme.textColor};font-weight:700;">Hi ${escapeHtml(payload.name)},</h2>
    <p style="margin:0 0 14px 0;color:${theme.textMuted};font-size:14px;line-height:1.6;">
      Thank you for contacting <strong style="color:${accent};">${escapeHtml(SITE_NAME)}</strong>.
    </p>
    <p style="margin:0 0 14px 0;color:${theme.textMuted};font-size:14px;line-height:1.6;">
      We have received your <strong style="color:${theme.textColor};">${escapeHtml(payload.type)}</strong> enquiry.
      Our team will reply to you at <strong style="color:${theme.textColor};">${escapeHtml(payload.email)}</strong> as soon as possible.
    </p>
    <div style="background-color:${theme.backgroundLight};border:1px solid ${accent}22;border-radius:8px;padding:14px;margin:16px 0;color:${theme.textColor};font-size:14px;line-height:1.7;">
      <div style="font-weight:700;color:${accent};margin-bottom:8px;">What happens next</div>
      <div>1. Our team reviews your enquiry.</div>
      <div>2. We may reach out from <strong>${escapeHtml(CONTACT_EMAIL)}</strong> for any follow-up.</div>
      <div>3. You will receive the next update on this same email address.</div>
    </div>
    <p style="margin:16px 0 0 0;font-size:13px;color:${theme.textMuted};line-height:1.6;">
      To add more details, simply reply to this email or write to
      <a href="mailto:${CONTACT_EMAIL}" style="color:${accent};text-decoration:none;">${CONTACT_EMAIL}</a>.
    </p>
  `;

  return buildHtmlShell(theme, innerHtml);
}

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

function adminSubject(payload: EnquiryEmailPayload) {
  const topic = payload.subject || `${payload.type} enquiry`;
  return `[${payload.type}] ${topic} — ${payload.name}`;
}

function adminBody(payload: EnquiryEmailPayload) {
  return [
    `New enquiry on ${SITE_NAME}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Type: ${payload.type}`,
    payload.subject ? `Subject: ${payload.subject}` : "",
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function senderSubject(payload: EnquiryEmailPayload) {
  const labels: Record<string, string> = {
    Team: "team enquiry",
    Athlete: "athlete enquiry",
    Academy: "academy enquiry",
    Brand: "brand partnership enquiry",
    Corporate: "corporate sports enquiry",
    Event: "event enquiry",
    General: "enquiry",
  };
  const label = labels[payload.type] || "enquiry";
  return `We received your ${label} — ${SITE_NAME}`;
}

function senderBody(payload: EnquiryEmailPayload) {
  return [
    `Hi ${payload.name},`,
    "",
    `Thank you for contacting ${SITE_NAME}.`,
    "",
    `We have received your ${payload.type.toLowerCase()} enquiry and our team will reply to you at ${payload.email} as soon as possible.`,
    "",
    "What happens next:",
    "1. Our team reviews your enquiry.",
    `2. We may contact you from ${CONTACT_EMAIL} for follow-up.`,
    "3. You will receive the next update on this same email address.",
    "",
    `If you need to add anything, reply to this email or contact us at ${CONTACT_EMAIL}.`,
    "",
    SITE_NAME,
    CONTACT_EMAIL,
  ].join("\n");
}

function mailOptions(base: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const logo = getLogoAttachment();
  return logo ? { ...base, attachments: [logo] } : base;
}

export async function sendEnquiryEmail(payload: EnquiryEmailPayload) {
  const transport = getTransport();
  if (!transport) {
    console.warn("[enquiry] SMTP not configured — saved to database only.");
    return { sent: false as const };
  }

  const receiver = process.env.ENQUIRY_TO_EMAIL || CONTACT_EMAIL;
  const from = process.env.SMTP_FROM || `${SITE_NAME} <${process.env.SMTP_USER}>`;

  const theme = await resolveTheme().catch(() => DEFAULT_THEME);
  const adminHtml = buildAdminEmailHtml(payload, theme);
  const senderHtml = buildSenderEmailHtml(payload, theme);

  await transport.sendMail(
    mailOptions({
      from,
      to: receiver,
      replyTo: payload.email,
      subject: adminSubject(payload),
      text: adminBody(payload),
      html: adminHtml,
    })
  );

  await transport.sendMail(
    mailOptions({
      from,
      to: payload.email,
      replyTo: receiver,
      subject: senderSubject(payload),
      text: senderBody(payload),
      html: senderHtml,
    })
  );

  return { sent: true as const };
}
