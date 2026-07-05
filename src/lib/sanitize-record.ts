export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function sanitizeInitials(value: unknown, fallbackName?: string): string | null {
  if (typeof value === "string" && value.trim()) {
    const cleaned = value.trim().replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 3);
    if (cleaned) return cleaned;
  }

  if (fallbackName?.trim()) {
    const parts = fallbackName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase().slice(0, 3);
    }
    return parts[0].slice(0, 2).toUpperCase();
  }

  return null;
}

export function asJsonString(value: unknown, fallback = "[]"): string {
  if (typeof value === "string") return value;
  if (value === undefined || value === null) return fallback;
  return JSON.stringify(value);
}

export function stripMetaFields(body: Record<string, unknown>) {
  const { id, createdAt, updatedAt, deletedAt, ...rest } = body;
  return rest;
}

export function prepareAthleteBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const name = String(data.name || "").trim();
  return {
    ...data,
    name,
    slug: String(data.slug || slugify(name)),
    country: data.country ? String(data.country) : "India",
    age: Number(data.age),
    stats: asJsonString(data.stats),
    initials: sanitizeInitials(data.initials, name),
  };
}

export function prepareTeamBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const name = String(data.name || "").trim();
  return {
    ...data,
    name,
    slug: String(data.slug || slugify(name)),
    initials: sanitizeInitials(data.initials, name),
    roster: data.roster != null ? asJsonString(data.roster, "[]") : data.roster,
    achievements: data.achievements != null ? asJsonString(data.achievements) : data.achievements,
  };
}

export function prepareAcademyBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const name = String(data.name || "").trim();
  return {
    ...data,
    name,
    slug: String(data.slug || slugify(name)),
    initials: sanitizeInitials(data.initials, name),
    programs: asJsonString(data.programs, "[]"),
  };
}

export function prepareBrandBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const name = String(data.name || "").trim();
  return {
    ...data,
    name,
    slug: String(data.slug || slugify(name)),
    initials: sanitizeInitials(data.initials, name),
  };
}

export function prepareCommunityPostBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const authorName = String(data.authorName || "").trim();
  return {
    ...data,
    authorName,
    authorInitials: sanitizeInitials(data.authorInitials, authorName),
    media: data.media != null ? asJsonString(data.media) : data.media,
  };
}

export function prepareSuccessStoryBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const title = String(data.title || "").trim();
  return {
    ...data,
    title,
    slug: String(data.slug || slugify(title)),
    initials: sanitizeInitials(data.initials, String(data.subject || title)),
  };
}

export function prepareTestimonialBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const name = String(data.name || "").trim();
  return {
    ...data,
    name,
    initials: sanitizeInitials(data.initials, name),
  };
}

export function prepareBlogPostBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const title = String(data.title || "").trim();
  return {
    ...data,
    title,
    slug: String(data.slug || slugify(title)),
    tags: data.tags != null ? asJsonString(data.tags) : data.tags,
  };
}

export function prepareEventBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const title = String(data.title || "").trim();
  return {
    ...data,
    title,
    slug: String(data.slug || slugify(title)),
    schedule: data.schedule != null ? asJsonString(data.schedule) : data.schedule,
    results: data.results != null ? asJsonString(data.results) : data.results,
  };
}

export function prepareServiceBody(body: Record<string, unknown>) {
  const data = stripMetaFields(body);
  const title = String(data.title || "").trim();
  return {
    ...data,
    title,
    slug: String(data.slug || slugify(title)),
    bullets: asJsonString(data.bullets, "[]"),
    howItWorks: asJsonString(data.howItWorks, "[]"),
  };
}
