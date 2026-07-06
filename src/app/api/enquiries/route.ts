import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

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
    const data = {
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      phone: body.phone ? String(body.phone).trim() : null,
      type: String(body.type || "General").trim(),
      subject: body.subject ? String(body.subject).trim() : null,
      message: String(body.message || "").trim(),
      status: body.status || "new",
      createdAt: now,
      updatedAt: now,
    };

    const record = await db.enquiry.create({ data });

    try {
      await sendEnquiryEmail(data);
    } catch (mailErr) {
      console.error("[enquiry] email failed:", mailErr);
    }

    return apiSuccess(record, 201);
  } catch (err: any) {
    return apiError(err.message);
  }
}
