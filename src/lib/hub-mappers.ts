const ACCENTS = [
  "from-emerald-400 to-emerald-700",
  "from-amber-400 to-amber-700",
  "from-rose-400 to-rose-700",
  "from-sky-400 to-sky-700",
  "from-violet-400 to-violet-700",
  "from-teal-400 to-teal-700",
];

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return (parts[0] || "?").slice(0, 2).toUpperCase();
}

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function parseStats(value: unknown): { label: string; value: string }[] {
  const raw = parseJsonArray(value);
  return raw
    .map((item) => {
      if (item && typeof item === "object") {
        const o = item as Record<string, unknown>;
        const label = String(o.label || o.name || "").trim();
        const val = String(o.value ?? o.stat ?? "").trim();
        if (!label && !val) return null;
        return { label: label || "Stat", value: val || "—" };
      }
      return null;
    })
    .filter(Boolean) as { label: string; value: string }[];
}

function accentFor(record: Record<string, unknown>, index: number) {
  const fromRecord = String(record.accentColor || record.accent || "").trim();
  if (fromRecord.includes("from-")) return fromRecord;
  return ACCENTS[index % ACCENTS.length];
}

function isListed(record: Record<string, unknown>) {
  if (record.isActive === false || record.active === false) return false;
  return true;
}

export type HubAthlete = {
  id: string;
  name: string;
  sport: string;
  level: string;
  location: string;
  age: number;
  initials: string;
  accent: string;
  stats: { label: string; value: string }[];
};

export function mapAthletes(records: Record<string, unknown>[]): HubAthlete[] {
  return records.filter(isListed).map((r, i) => {
    const name = String(r.name || "Athlete");
    const city = String(r.city || "");
    const country = String(r.country || "India");
    return {
      id: String(r.id),
      name,
      sport: String(r.sport || "—"),
      level: String(r.level || "—"),
      location: city ? `${city}${country ? `, ${country === "India" ? "IN" : country}` : ""}` : country,
      age: Number(r.age) || 0,
      initials: String(r.initials || initialsFromName(name)).slice(0, 3),
      accent: accentFor(r, i),
      stats: parseStats(r.stats).slice(0, 3),
    };
  });
}

export type HubTeam = {
  id: string;
  name: string;
  sport: string;
  level: string;
  initials: string;
  accent: string;
  openTrials: boolean;
};

export function mapTeams(records: Record<string, unknown>[]): HubTeam[] {
  return records.filter(isListed).map((r, i) => {
    const name = String(r.name || "Team");
    return {
      id: String(r.id),
      name,
      sport: String(r.sport || "—"),
      level: String(r.level || "—"),
      initials: String(r.initials || initialsFromName(name)).slice(0, 3),
      accent: accentFor(r, i),
      openTrials: Boolean(r.openTrials ?? r.open_trials ?? false),
    };
  });
}

export type HubAcademy = {
  id: string;
  name: string;
  sport: string;
  accent: string;
  programs: string[];
};

export function mapAcademies(records: Record<string, unknown>[]): HubAcademy[] {
  return records.filter(isListed).map((r, i) => {
    const programsRaw = parseJsonArray(r.programs);
    const programs = programsRaw
      .map((p) => {
        if (typeof p === "string") return p;
        if (p && typeof p === "object") {
          const o = p as Record<string, unknown>;
          return String(o.name || o.title || o.label || "").trim();
        }
        return "";
      })
      .filter(Boolean);

    return {
      id: String(r.id),
      name: String(r.name || "Academy"),
      sport: String(r.sport || "—"),
      accent: accentFor(r, i),
      programs: programs.length ? programs : ["Programs available — enquire for details"],
    };
  });
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}
