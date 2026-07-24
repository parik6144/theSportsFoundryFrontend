"use client";

import { motion } from "framer-motion";
import { Search, ArrowRight, GraduationCap } from "lucide-react";
import { PageHeader, CTASection } from "../ui-primitives";
import { useState, useMemo } from "react";
import { useNav } from "../nav-context";
import { useJsonCollection } from "@/hooks/use-json-collection";
import { mapAcademies, uniqueSorted } from "@/lib/hub-mappers";

export function AcademiesHubPage() {
  const { navigate } = useNav();
  const { data: raw, loading, error } = useJsonCollection("academies");
  const academies = useMemo(() => mapAcademies(raw as Record<string, unknown>[]), [raw]);
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All");

  const sports = useMemo(
    () => ["All", ...uniqueSorted(academies.map((a) => a.sport))],
    [academies]
  );

  const filtered = useMemo(() => {
    return academies.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (sport !== "All" && a.sport !== sport) return false;
      return true;
    });
  }, [academies, search, sport]);

  return (
    <div>
      <PageHeader
        eyebrow="Academies Hub"
        title="Browse partner academies & their programs."
        subtitle="Browse partner academies — send an enquiry and we will connect you by email."
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
                  placeholder="Search academy name..."
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
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {loading ? (
                "Loading academies…"
              ) : (
                <>
                  Showing <span className="text-[#f4d35e] font-medium">{filtered.length}</span> of{" "}
                  {academies.length} academies
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
              {filtered.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glossy-card p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${a.accent} flex items-center justify-center shadow-lg shrink-0`}
                    >
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base truncate">{a.name}</h3>
                      <div className="text-xs text-[#f4d35e]">{a.sport}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wider text-[#f4d35e] font-semibold mb-2">
                      Programs
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {a.programs.map((p) => (
                        <span key={p} className="text-[10px] glass px-2 py-1 rounded-full text-foreground/80">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("contact")}
                    className="mt-auto w-full btn-outline-gold rounded-lg px-4 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-2"
                  >
                    Enquire
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glossy-card p-10 text-center">
              <p className="text-sm text-muted-foreground">
                {academies.length === 0
                  ? "No academies listed yet. Add academies from the admin panel."
                  : "No academies match your filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Run an academy? Partner with us."
        subtitle="List programs, attract talent, and unlock partnerships — send an enquiry to get started."
        primaryLabel="Send Academy Enquiry"
        primaryPage="contact"
        secondaryLabel="Learn More"
        secondaryPage="academies"
      />
    </div>
  );
}
