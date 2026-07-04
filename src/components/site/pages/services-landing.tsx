"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHeader, CTASection } from "../ui-primitives";
import { SERVICES } from "@/lib/site-data";
import { useNav } from "../nav-context";

export function ServicesLandingPage() {
  const { navigate } = useNav();
  return (
    <div>
      <PageHeader
        eyebrow="What We Do"
        title="Eight pillars. One platform."
        subtitle="Every service below is part of the same ecosystem — so an athlete's profile flows into a team's recruitment, which flows into a brand's campaign, which flows into an event's registrations."
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => navigate(s.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="glossy-card p-6 text-left group flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20">
                    <s.icon className="h-6 w-6 text-[#f4d35e]" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60">
                    {String(s.index).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-[#f4d35e] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs italic text-[#f4d35e]/80 mb-2">{s.tagline}</p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {s.short}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#f4d35e] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more
                  <ArrowRight className="h-3 w-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which fits you?"
        subtitle="Tell us what you're trying to do and we'll point you at the right service — or build a custom package."
        primaryLabel="Talk to Us"
        primaryPage="contact"
        secondaryLabel="View All Hubs"
        secondaryPage="athletes-hub"
      />
    </div>
  );
}
