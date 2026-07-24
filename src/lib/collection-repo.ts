import { db } from "@/lib/db";
import {
  isJsonStoreEnabled,
  jsonCreate,
  jsonGetById,
  jsonList,
  jsonRemove,
  jsonUpdate,
  type CollectionName,
  type JsonRecord,
} from "@/lib/json-store";

type OrderOpt = { orderBy?: string; order?: "asc" | "desc" };

const prismaModelMap: Record<
  CollectionName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { delegate: () => any; defaultOrder?: OrderOpt; listSelect?: object; listInclude?: object }
> = {
  enquiries: { delegate: () => db.enquiry, defaultOrder: { orderBy: "createdAt", order: "desc" } },
  athletes: { delegate: () => db.athlete, defaultOrder: { orderBy: "createdAt", order: "desc" } },
  teams: { delegate: () => db.team, defaultOrder: { orderBy: "createdAt", order: "desc" } },
  academies: { delegate: () => db.academy, defaultOrder: { orderBy: "createdAt", order: "desc" } },
  brands: { delegate: () => db.brand, defaultOrder: { orderBy: "createdAt", order: "desc" } },
  events: { delegate: () => db.event, defaultOrder: { orderBy: "startDate", order: "asc" } },
  services: { delegate: () => db.service, defaultOrder: { orderBy: "sortOrder", order: "asc" } },
  "blog-posts": {
    delegate: () => db.blogPost,
    defaultOrder: { orderBy: "createdAt", order: "desc" },
    listInclude: { author: { select: { id: true, name: true } } },
  },
  testimonials: { delegate: () => db.testimonial, defaultOrder: { orderBy: "sortOrder", order: "asc" } },
  partners: { delegate: () => db.partner, defaultOrder: { orderBy: "sortOrder", order: "asc" } },
  "community-posts": {
    delegate: () => db.communityPost,
    defaultOrder: { orderBy: "createdAt", order: "desc" },
  },
  "success-stories": {
    delegate: () => db.successStory,
    defaultOrder: { orderBy: "createdAt", order: "desc" },
  },
  users: {
    delegate: () => db.user,
    defaultOrder: { orderBy: "createdAt", order: "desc" },
    listSelect: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      userType: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  roles: { delegate: () => db.role, defaultOrder: { orderBy: "name", order: "asc" } },
};

function toBigIntId(id: string): bigint | null {
  if (!/^\d+$/.test(id)) return null;
  return BigInt(id);
}

export async function repoList(
  collection: CollectionName,
  order?: OrderOpt
): Promise<unknown[]> {
  if (isJsonStoreEnabled()) {
    const meta = prismaModelMap[collection];
    const opt = order ?? meta.defaultOrder;
    return jsonList(collection, opt);
  }

  const meta = prismaModelMap[collection];
  const delegate = meta.delegate();
  const orderByField = (order ?? meta.defaultOrder)?.orderBy ?? "createdAt";
  const direction = (order ?? meta.defaultOrder)?.order ?? "desc";
  return delegate.findMany({
    orderBy: { [orderByField]: direction },
    ...(meta.listSelect ? { select: meta.listSelect } : {}),
    ...(meta.listInclude ? { include: meta.listInclude } : {}),
  });
}

export async function repoGet(
  collection: CollectionName,
  id: string
): Promise<unknown | null> {
  if (isJsonStoreEnabled()) {
    return jsonGetById(collection, id);
  }
  const recordId = toBigIntId(id);
  if (recordId == null) return null;
  return prismaModelMap[collection].delegate().findUnique({ where: { id: recordId } });
}

export async function repoCreate(
  collection: CollectionName,
  data: Record<string, unknown>
): Promise<unknown> {
  if (isJsonStoreEnabled()) {
    return jsonCreate(collection, data);
  }
  return prismaModelMap[collection].delegate().create({ data });
}

export async function repoUpdate(
  collection: CollectionName,
  id: string,
  data: Record<string, unknown>
): Promise<unknown | null> {
  if (isJsonStoreEnabled()) {
    return jsonUpdate(collection, id, data);
  }
  const recordId = toBigIntId(id);
  if (recordId == null) return null;
  try {
    return await prismaModelMap[collection].delegate().update({
      where: { id: recordId },
      data,
    });
  } catch {
    return null;
  }
}

export async function repoDelete(collection: CollectionName, id: string): Promise<boolean> {
  if (isJsonStoreEnabled()) {
    return jsonRemove(collection, id);
  }
  const recordId = toBigIntId(id);
  if (recordId == null) return false;
  try {
    await prismaModelMap[collection].delegate().delete({ where: { id: recordId } });
    return true;
  } catch {
    return false;
  }
}

export type { CollectionName, JsonRecord };
