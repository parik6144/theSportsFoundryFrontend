"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Filter, ArrowRight, MapPin, Award, Calendar } from "lucide-react";
import { PageHeader, CTASection } from "../ui-primitives";
import { ATHLETES, type Athlete } from "@/lib/site-data";
import { useNav } from "../nav-context";

const SPORTS = ["All", "Football", "Cricket", "Badminton", "Basketball", "Athletics", "Tennis"];
const LEVELS = ["All", "Amateur", "Semi-Pro", "National", "Pro League", "U-23 State", "ITF Circuit"];

export function AthletesHubPage() {
  const { navigate } = useNav();
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All");
  const [level, setLevel] = useState("All");

  const filtered = useMemo(() => {
    return ATHLETES.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.sport.toLowerCase().includes(search.toLowerCase())) return false;
      if (sport !== "All" && a.sport !== sport) return false;
      if (level !== "All" && a.level !== level) return false;
      return true;
    });
  }, [search, sport, level]);

  return (
    <div>
      <PageHeader
        eyebrow="Athletes Hub"
        title="Discover verified athletes across sports."
        subtitle="Search and filter our athlete network — send an enquiry and we will connect you directly by email."
      />

      <section className="py-8 md:py-12 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Filters */}
          <div className="glossy-card p-4 md:p-5 mb-8">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or sport..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                >
                  {SPORTS.map((s) => (
                    <option key={s} value={s} className="bg-[#0d1b3d]">{s}</option>
                  ))}
                </select>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l} className="bg-[#0d1b3d]">{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              Showing <span className="text-[#f4d35e] font-medium">{filtered.length}</span> of {ATHLETES.length} athletes
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a, i) => (
                <AthleteCard key={a.id} athlete={a} index={i} onView={() => navigate("contact")} />
              ))}
            </div>
          ) : (
            <div className="glossy-card p-10 text-center">
              <p className="text-sm text-muted-foreground">No athletes match your filters. Try widening the search.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Are you an athlete?"
        subtitle="Send an enquiry with your sport, level, and goals — our team replies at info@sportsfoundry.in."
        primaryLabel="Send Athlete Enquiry"
        primaryPage="contact"
        secondaryLabel="Learn More"
        secondaryPage="athletes"
      />
    </div>
  );
}

function AthleteCard({ athlete, index, onView }: { athlete: Athlete; index: number; onView: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glossy-card p-5 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${athlete.accent} flex items-center justify-center font-bold text-white shadow-lg shrink-0`}>
          {athlete.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-base truncate">{athlete.name}</h3>
          <div className="text-xs text-[#f4d35e]">{athlete.sport}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Award className="h-3.5 w-3.5 text-[#f4d35e]" />
          {athlete.level}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-[#f4d35e]" />
          {athlete.location}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-[#f4d35e]" />
          Age {athlete.age}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pb-4 border-b border-white/10 mb-4">
        {athlete.stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-base font-bold text-gradient-gold">{s.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
      <button
        onClick={onView}
        className="mt-auto w-full btn-outline-gold rounded-lg px-4 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-2"
      >
        View & Enquire
        <ArrowRight className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
