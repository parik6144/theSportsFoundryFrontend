import { apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { isJsonStoreEnabled, jsonCount, jsonStoreBackend } from "@/lib/json-store";
import { db } from "@/lib/db";

export async function GET() {
  try {
    if (isJsonStoreEnabled()) {
      const [services, partners, testimonials, athletes, users, roles, enquiries, teams] =
        await Promise.all([
          jsonCount("services"),
          jsonCount("partners"),
          jsonCount("testimonials"),
          jsonCount("athletes"),
          jsonCount("users"),
          jsonCount("roles"),
          jsonCount("enquiries"),
          jsonCount("teams"),
        ]);
      return apiSuccess({
        services,
        partners,
        testimonials,
        athletes,
        users,
        roles,
        enquiries,
        teams,
        store: jsonStoreBackend(),
      });
    }

    const [services, partners, testimonials, athletes, users, roles] = await Promise.all([
      db.service.count(),
      db.partner.count(),
      db.testimonial.count(),
      db.athlete.count(),
      db.user.count(),
      db.role.count(),
    ]);
    return apiSuccess({ services, partners, testimonials, athletes, users, roles, store: "mysql" });
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST() {
  return GET();
}
