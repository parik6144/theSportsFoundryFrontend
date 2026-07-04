"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, TrendingUp, Award } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { SUCCESS_STORIES } from "@/lib/site-data";
import { useNav } from "../nav-context";

export function SuccessStoriesPage() {
  const { navigate } = useNav();

  return (
    <div>
      <PageHeader
        eyebrow="Success Stories"
        title="Real outcomes. Real stakeholders."
        subtitle="Athlete journeys, brand ROI, academy growth, corporate engagement — long-form features on what's actually working across the platform."
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="space-y-6">
            {SUCCESS_STORIES.map((story, i) => (
              <motion.button
                key={story.id}
                onClick={() => navigate("auth")}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="glossy-card overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0 text-left group"
              >
                {/* Visual */}
                <div className={`relative h-48 md:h-auto bg-gradient-to-br ${story.accent} flex items-center justify-center p-8`}>
                  <div className="text-6xl font-bold text-white/30">{story.initials}</div>
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-wide glass-strong px-2 py-1 rounded-full">{story.sport}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="h-4 w-4 text-[#f4d35e]" />
                    <span className="text-xs text-[#f4d35e] uppercase tracking-wider font-semibold">{story.subject}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold mb-2 group-hover:text-[#f4d35e] transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{story.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#f4d35e]" />
                      <span className="text-sm font-bold text-gradient-gold">{story.outcome}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-[#f4d35e]">
                      Read full story
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle eyebrow="Outcomes at scale" title="What success looks like across the platform" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, value: "94%", label: "Match rate for athletes & teams" },
              { icon: Trophy, value: "320+", label: "Events organised to date" },
              { icon: Award, value: "₹48Cr+", label: "Brand investments facilitated" },
              { icon: TrendingUp, value: "+104%", label: "Avg academy enrolment growth" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glossy-card p-5 text-center"
              >
                <s.icon className="h-5 w-5 text-[#f4d35e] mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-gradient-gold">{s.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to be our next success story?"
        subtitle="Join the platform and let us help you write the next chapter — for your career, your team, your brand, or your community."
        primaryLabel="Get Started"
        primaryPage="auth"
        secondaryLabel="Talk to Us"
        secondaryPage="contact"
      />
    </div>
  );
}
