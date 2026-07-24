import { NextRequest } from "next/server";
import { db, apiDbError } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

function mapEnquiryTypeToDb(type: string): string {
  const normalized = type.trim().toLowerCase();

  switch (normalized) {
    case "general":
      return "general";
    case "brand":
      return "partnership";
    case "corporate":
      return "corporate";
    case "event":
      return "event_hosting";
    case "academy":
      return "academy_partner";
    case "team":
    case "athlete":
      return "support";
    default:
      return "support";
  }
}

function parseEnquiryBody(body: Record<string, unknown>) {
  const enquiryType = String(body.type || "General").trim();
  return {
    enquiryType,
    payload: {
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      type: enquiryType,
      subject: body.subject ? String(body.subject).trim() : null,
      message: String(body.message || "").trim(),
    },
  };
}

export async function GET() {
  try {
    const records = await db.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    return apiSuccess(records);
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { enquiryType, payload } = parseEnquiryBody(body);

    if (!payload.name || !payload.email || !payload.message) {
      return apiError("Name, email and message are required.", 400);
    }

    const mailResult = await sendEnquiryEmail(payload);
    if (!mailResult.sent) {
      return apiError("Could not send your message. Please try again.", 500);
    }

    // Optional DB save — only when DATABASE_URL is configured (e.g. EC2 admin setup)
    if (process.env.DATABASE_URL) {
      try {
        const now = new Date();
        const record = await db.enquiry.create({
          data: {
            name: payload.name,
            email: payload.email,
            phone: body.phone ? String(body.phone).trim() : null,
            type: mapEnquiryTypeToDb(enquiryType),
            subject: payload.subject,
            message: payload.message,
            status: "new",
            createdAt: now,
            updatedAt: now,
          },
        });
        return apiSuccess(record, 201);
      } catch (dbErr) {
        console.warn("[enquiry] saved via email only; database write failed:", dbErr);
      }
    }

    return apiSuccess(
      {
        id: `email-${Date.now()}`,
        ...payload,
        status: "sent",
        createdAt: new Date().toISOString(),
      },
      201
    );
  } catch (err: any) {
    console.error("[enquiry] submit failed:", err);
    return apiError(err.message || "Could not send your message. Please try again.");
  }
}
