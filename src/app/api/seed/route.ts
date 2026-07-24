import { apiDbError } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import {
  isJsonStoreEnabled,
  jsonCounts,
  jsonList,
  jsonStoreBackend,
} from "@/lib/json-store";
import { db } from "@/lib/db";

function startOfMonth() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isThisMonth(value: unknown) {
  if (!value) return false;
  const t = new Date(String(value)).getTime();
  if (Number.isNaN(t)) return false;
  return t >= startOfMonth().getTime();
}

function isToday(value: unknown) {
  if (!value) return false;
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function relativeTime(value: unknown) {
  const t = new Date(String(value || "")).getTime();
  if (Number.isNaN(t)) return "—";
  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export async function GET() {
  try {
    if (isJsonStoreEnabled()) {
      const counts = await jsonCounts();
      const [enquiries, athletes, blogPosts, users, events] = await Promise.all([
        jsonList("enquiries"),
        jsonList("athletes"),
        jsonList("blog-posts"),
        jsonList("users"),
        jsonList("events"),
      ]);

      const recentEnquiries = enquiries.slice(0, 8).map((e) => ({
        id: e.id,
        name: String(e.name || "Unknown"),
        email: String(e.email || ""),
        type: String(e.type || "General"),
        subject: String(e.subject || e.message || ""),
        status: String(e.status || "new"),
        created: relativeTime(e.createdAt),
        createdAt: e.createdAt,
      }));

      const month = {
        newSignups: users.filter((u) => isThisMonth(u.createdAt)).length,
        eventRegistrations: events.filter((e) => isThisMonth(e.createdAt)).length,
        enquiriesReceived: enquiries.filter((e) => isThisMonth(e.createdAt)).length,
        blogPostsPublished: blogPosts.filter(
          (b) =>
            (String(b.status || "published").toLowerCase() === "published" || !b.status) &&
            isThisMonth(b.createdAt)
        ).length,
        athletesVerified: athletes.filter(
          (a) => Boolean(a.isVerified) && isThisMonth(a.verifiedAt || a.updatedAt || a.createdAt)
        ).length,
      };

      return apiSuccess({
        ...counts,
        counts,
        store: jsonStoreBackend(),
        recentEnquiries,
        month,
        meta: {
          enquiriesNew: enquiries.filter((e) => String(e.status || "").toLowerCase() === "new")
            .length,
          enquiriesToday: enquiries.filter((e) => isToday(e.createdAt)).length,
          athletesVerified: athletes.filter((a) => Boolean(a.isVerified)).length,
          blogPublished: blogPosts.filter(
            (b) => String(b.status || "published").toLowerCase() === "published" || !b.status
          ).length,
          eventsLive: events.filter((e) =>
            ["live", "ongoing"].includes(String(e.status || "").toLowerCase())
          ).length,
        },
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
    return apiSuccess({
      services,
      partners,
      testimonials,
      athletes,
      users,
      roles,
      store: "mysql",
      recentEnquiries: [],
      month: {},
      meta: {},
    });
  } catch (err: any) {
    return apiDbError(err);
  }
}

export async function POST() {
  return GET();
}
