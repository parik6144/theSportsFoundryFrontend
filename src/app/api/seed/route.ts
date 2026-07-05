import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [services, partners, testimonials, athletes, users, roles] = await Promise.all([
      db.service.count(),
      db.partner.count(),
      db.testimonial.count(),
      db.athlete.count(),
      db.user.count(),
      db.role.count(),
    ]);

    return NextResponse.json({
      success: true,
      message: "Next.js + Prisma database is connected",
      data: { services, partners, testimonials, athletes, users, roles },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
