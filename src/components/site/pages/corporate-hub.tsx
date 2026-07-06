"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Trophy, Users, Heart } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { EnquiryForm } from "../enquiry-form";
import { CONTACT_EMAIL } from "@/lib/site-contact";
import { useNav } from "../nav-context";

const OFFERINGS = [
  { icon: Trophy, title: "Inter-Company Leagues", body: "Multi-sport leagues across departments or companies — scheduled, officiated, and managed end-to-end." },
  { icon: Heart, title: "Wellness Challenges", body: "Step, fitness, and wellbeing challenges with leaderboards, milestones, and rewards." },
  { icon: Users, title: "Team-Building Sports Days", body: "Off-site sports days designed to break silos and build cross-functional trust." },
  { icon: Building2, title: "Employee Engagement", body: "Year-round engagement calendar with live events, content, and recognition programs." },
];

export function CorporateHubPage() {
  const { navigate } = useNav();

  return (
    <div>
      <PageHeader
        eyebrow="Corporate Sports"
        title="Build culture through sport."
        subtitle="Professionally managed sporting experiences for your workplace — send an enquiry and our team designs a program around your goals."
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle eyebrow="What We Offer" title="Four ways to bring sport to your workplace" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFERINGS.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glossy-card p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20 mb-4">
                  <o.icon className="h-5 w-5 text-[#f4d35e]" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{o.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{o.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionTitle eyebrow="How It Works" title="Consultation → Design → Execution" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Send an enquiry", body: "Tell us your company size, goals, and timeline — attrition, engagement, culture, or wellness." },
              { step: "02", title: "Custom program design", body: "We design a multi-sport or single-sport program around your geography, headcount, and budget." },
              { step: "03", title: "End-to-end execution", body: "Scheduling, venues, officiating, scoring, and reporting — handled by our team." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glossy-card p-6"
              >
                <div className="text-3xl font-bold text-gradient-gold mb-3">{s.step}</div>
                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            eyebrow="Plan Your Program"
            title="Tell us about your company"
            subtitle={`We reply at ${CONTACT_EMAIL} with next steps.`}
          />
          <div className="glossy-card p-6 md:p-8 mt-10">
            <EnquiryForm
              defaultType="Corporate"
              subject="Corporate sports enquiry"
              messagePlaceholder="Company name, employee count, program type (league, wellness, team-building), and timeline."
            />
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("corporate")}
              className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              Back to Service
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to bring sport to your workplace?"
        subtitle="From a single team-building day to a year-round engagement calendar — send an enquiry to get started."
        primaryLabel="Send Enquiry"
        primaryPage="contact"
      />
    </div>
  );
}
