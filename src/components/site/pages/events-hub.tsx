"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Calendar, MapPin, Trophy, ArrowRight, Users, Clock } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { FEATURED_EVENTS } from "@/lib/site-data";
import { useNav } from "../nav-context";

const SPORTS = ["All", "Football", "Cricket", "Badminton", "Basketball", "Volleyball", "Golf"];
const STATUSES = ["All", "Open", "Closed"];

export function EventsHubPage() {
  const { navigate } = useNav();
  const [sport, setSport] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return FEATURED_EVENTS.filter((e) => {
      if (sport !== "All" && e.sport !== sport) return false;
      if (status === "Open" && !e.registrationOpen) return false;
      if (status === "Closed" && e.registrationOpen) return false;
      return true;
    });
  }, [sport, status]);

  return (
    <div>
      <PageHeader
        eyebrow="Events & Tournaments"
        title="Tournaments, leagues, and competitions — seamlessly delivered."
        subtitle="Browse upcoming and past events. Register solo, with your team, or as a corporate squad."
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="glossy-card p-4 md:p-5 mb-8">
            <div className="flex flex-col md:flex-row gap-3">
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#d4af37]"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-[#0d1b3d]">{s}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Showing <span className="text-[#f4d35e] font-medium">{filtered.length}</span> of {FEATURED_EVENTS.length} events
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((evt, i) => (
              <motion.button
                key={evt.id}
                onClick={() => navigate("auth")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glossy-card overflow-hidden text-left group"
              >
                <div className={`relative h-40 bg-gradient-to-br ${evt.accent} flex items-center justify-center`}>
                  <Trophy className="h-16 w-16 text-white/40" strokeWidth={1.2} />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-wide glass-strong px-2 py-1 rounded-full">
                      {evt.sport}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border ${
                      evt.registrationOpen
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-white/5 text-muted-foreground border-white/10"
                    }`}>
                      {evt.registrationOpen ? "Registration Open" : "Closed"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-base mb-3 group-hover:text-[#f4d35e] transition-colors">
                    {evt.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-[#f4d35e]" />{evt.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#f4d35e]" />{evt.location}</div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#f4d35e]">
                    {evt.registrationOpen ? "Quick Register" : "View Details"}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionTitle eyebrow="How We Deliver" title="Plan → Organise → Execute → Report" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Calendar, step: "Plan", body: "Format, budget, calendar, broadcast plan, sponsor pack — locked in a single kickoff." },
              { icon: Users, step: "Organise", body: "Venues, officials, registrations, scheduling, hospitality — all under one roof." },
              { icon: Trophy, step: "Execute", body: "On-ground operations, live scoring, broadcast, content capture — seamless for participants." },
              { icon: Clock, step: "Report", body: "Full post-event report with stats, engagement, content library, and sponsor ROI." },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glossy-card p-6 text-center"
              >
                <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20 mb-4">
                  <s.icon className="h-6 w-6 text-[#f4d35e]" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-1">Step {i + 1}</div>
                <h3 className="font-semibold text-base mb-2">{s.step}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to host an event with us?"
        subtitle="From a single tournament to a multi-month league — we'll plan, organise, execute, and report on it end-to-end."
        primaryLabel="Host an Event"
        primaryPage="contact"
        secondaryLabel="Learn More"
        secondaryPage="events"
      />
    </div>
  );
}
