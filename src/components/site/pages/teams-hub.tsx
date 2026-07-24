"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader, CTASection } from "../ui-primitives";
import { useNav } from "../nav-context";
import { useJsonCollection } from "@/hooks/use-json-collection";
import { mapTeams, uniqueSorted } from "@/lib/hub-mappers";

export function TeamsHubPage() {
  const { navigate } = useNav();
  const { data: raw, loading, error } = useJsonCollection("teams");
  const teams = useMemo(() => mapTeams(raw as Record<string, unknown>[]), [raw]);
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All");
  const [openTrialsOnly, setOpenTrialsOnly] = useState(false);

  const sports = useMemo(() => ["All", ...uniqueSorted(teams.map((t) => t.sport))], [teams]);

  const filtered = useMemo(() => {
    return teams.filter((t) => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (sport !== "All" && t.sport !== sport) return false;
      if (openTrialsOnly && !t.openTrials) return false;
      return true;
    });
  }, [teams, search, sport, openTrialsOnly]);

  return (
    <div>
      <PageHeader
        eyebrow="Teams Hub"
        title="Find teams, clubs & franchises."
        subtitle="From grassroots clubs to professional franchises — send an enquiry to connect about recruitment and registrations."
      />

      <section className="py-8 md:py-12 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="glossy-card p-4 md:p-5 mb-8">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search team name..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
              >
                {sports.map((s) => (
                  <option key={s} value={s} className="bg-[#0d1b3d]">
                    {s}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg glass cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={openTrialsOnly}
                  onChange={(e) => setOpenTrialsOnly(e.target.checked)}
                  className="accent-[#d4af37]"
                />
                Open trials only
              </label>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {loading ? (
                "Loading teams…"
              ) : (
                <>
                  Showing <span className="text-[#f4d35e] font-medium">{filtered.length}</span> of{" "}
                  {teams.length} teams
                </>
              )}
            </div>
          </div>

          {error ? (
            <div className="glossy-card p-10 text-center">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          ) : loading ? (
            <div className="glossy-card p-10 text-center">
              <p className="text-sm text-muted-foreground">Loading from data store…</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glossy-card p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center font-bold text-white shadow-lg shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base truncate">{t.name}</h3>
                      <div className="text-xs text-[#f4d35e]">
                        {t.sport} · {t.level}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-[#f4d35e]" />
                      Active roster & recruiting
                    </div>
                  </div>
                  {t.openTrials ? (
                    <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/15 px-3 py-1.5 rounded-full border border-emerald-500/30 w-fit">
                      <CheckCircle2 className="h-3 w-3" />
                      Open Trials
                    </div>
                  ) : (
                    <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full w-fit">
                      Trials Closed
                    </div>
                  )}
                  <button
                    onClick={() => navigate("contact")}
                    className="mt-auto w-full btn-outline-gold rounded-lg px-4 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-2"
                  >
                    Enquire About Team
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glossy-card p-10 text-center">
              <p className="text-sm text-muted-foreground">
                {teams.length === 0
                  ? "No teams listed yet. Add teams from the admin panel."
                  : "No teams match your filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="I run a team — let's talk."
        subtitle="Recruit players, manage registrations, and get support for leagues and tournaments via direct enquiry."
        primaryLabel="Send Team Enquiry"
        primaryPage="contact"
        secondaryLabel="Learn More"
        secondaryPage="teams"
      />
    </div>
  );
}
