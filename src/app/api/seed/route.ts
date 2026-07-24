import { db, apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";

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
    return apiSuccess({ services, partners, testimonials, athletes, users, roles });
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST() {
  return GET();
}
