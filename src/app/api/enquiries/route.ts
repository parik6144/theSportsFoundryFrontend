import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

function mapEnquiryTypeToDb(type: string): string {
  const normalized = type.trim().toLowerCase();

  switch (normalized) {
    case "general":
      return "general";
    case "brand":
      // Admin/DB enum expects partnership
      return "partnership";
    case "corporate":
      return "corporate";
    case "event":
      return "event_hosting";
    case "academy":
      return "academy_partner";
    // Team/Athlete are both stored as support enquiries
    case "team":
    case "athlete":
      return "support";
    default:
      // Fallback to support so enquiries still get saved
      return "support";
  }
}

export async function GET() {
  try {
    const records = await db.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiError(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date();

    const enquiryType = String(body.type || "General").trim();
    const dbType = mapEnquiryTypeToDb(enquiryType);

    const data = {
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      phone: body.phone ? String(body.phone).trim() : null,
      type: dbType,
      subject: body.subject ? String(body.subject).trim() : null,
      message: String(body.message || "").trim(),
      status: body.status || "new",
      createdAt: now,
      updatedAt: now,
    };

    const record = await db.enquiry.create({ data });

    try {
      // Keep the original type for email wording/templates (Team/Athlete/etc.)
      await sendEnquiryEmail({
        name: data.name,
        email: data.email,
        type: enquiryType,
        subject: data.subject,
        message: data.message,
      });
    } catch (mailErr) {
      console.error("[enquiry] email failed:", mailErr);
    }

    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
