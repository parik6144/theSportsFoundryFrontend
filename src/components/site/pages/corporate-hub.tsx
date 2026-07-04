"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Trophy, Users, Heart, CheckCircle2 } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { useState } from "react";
import { useNav } from "../nav-context";

const OFFERINGS = [
  { icon: Trophy, title: "Inter-Company Leagues", body: "Multi-sport leagues across departments or companies — fully scheduled, officiated, and broadcast-ready." },
  { icon: Heart, title: "Wellness Challenges", body: "Step, fitness, and wellbeing challenges with leaderboards, milestones, and rewards." },
  { icon: Users, title: "Team-Building Sports Days", body: "Off-site sports days designed to break silos and build cross-functional trust." },
  { icon: Building2, title: "Employee Engagement", body: "Year-round engagement calendar with live events, content, and recognition programs." },
];

const CASE_STUDIES = [
  { company: "Strive Wellness", outcome: "-18% Attrition", body: "A 4-month multi-sport corporate league for Strive's 6,000 employees measurably improved retention and engagement scores." },
  { company: "Nova Tech", outcome: "+22 NPS", body: "Inter-department cricket + football league across 4 offices — boosting internal NPS by 22 points in one quarter." },
  { company: "Apex Banking", outcome: "4,200 Participants", body: "A nationwide step challenge spanning 1,200 branches — gamified wellness with measurable participation." },
];

export function CorporateHubPage() {
  const { navigate } = useNav();
  const [form, setForm] = useState({ company: "", size: "", name: "", email: "", program: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="Corporate Sports"
        title="Build culture through sport."
        subtitle="Professionally managed sporting experiences that build culture, teamwork, and employee wellbeing — without lifting internal bandwidth."
      />

      {/* Offerings */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="What We Offer"
            title="Four ways to bring sport to your workplace"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFERINGS.map((o, i) => (
              <motion.div
                key={i}
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

      {/* Case studies */}
      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Case Studies"
            title="Outcomes, not just events"
            subtitle="We measure what matters — attrition, NPS, participation, and culture."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {CASE_STUDIES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glossy-card p-6"
              >
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] mb-2">{c.company}</div>
                <div className="text-3xl font-bold text-gradient-gold mb-3">{c.outcome}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionTitle eyebrow="How It Works" title="Consultation → Design → Execution" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Consultation", body: "We sit down with your HR, culture, and operations leads to understand what you're trying to fix — attrition, engagement, or just culture." },
              { step: "02", title: "Custom Program Design", body: "We design a multi-sport or single-sport program around your constraints — geography, headcount, budget, calendar." },
              { step: "03", title: "End-to-End Execution", body: "Scheduling, venues, officiating, scoring, broadcast, content, and reporting — all run by SportSphere. You just show up." },
            ].map((s, i) => (
              <motion.div
                key={i}
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

      {/* Enquiry form */}
      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            eyebrow="Plan Your Program"
            title="Tell us about your company"
            subtitle="We'll come back within 48 hours with a custom program proposal."
          />
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glossy-card p-10 text-center mt-10"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-7 w-7 text-emerald-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enquiry received.</h3>
              <p className="text-sm text-muted-foreground">
                Thanks, {form.name || "there"} — our corporate team will be in touch within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="glossy-card p-6 md:p-8 mt-10 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="corp-input" placeholder="Acme Corp" />
                </Field>
                <Field label="Employee Count" required>
                  <select required value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="corp-input">
                    <option value="" className="bg-[#0d1b3d]">Select size</option>
                    <option className="bg-[#0d1b3d]">50-200</option>
                    <option className="bg-[#0d1b3d]">200-1000</option>
                    <option className="bg-[#0d1b3d]">1000-5000</option>
                    <option className="bg-[#0d1b3d]">5000+</option>
                  </select>
                </Field>
                <Field label="Your Name" required>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="corp-input" placeholder="Jane Doe" />
                </Field>
                <Field label="Work Email" required>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="corp-input" placeholder="jane@acme.com" />
                </Field>
              </div>
              <Field label="Program of Interest">
                <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} className="corp-input">
                  <option value="" className="bg-[#0d1b3d]">Select a program</option>
                  <option className="bg-[#0d1b3d]">Inter-company league</option>
                  <option className="bg-[#0d1b3d]">Wellness challenge</option>
                  <option className="bg-[#0d1b3d]">Team-building day</option>
                  <option className="bg-[#0d1b3d]">Year-round engagement</option>
                </select>
              </Field>
              <Field label="Anything else?">
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="corp-input resize-none" placeholder="Tell us about your goals, timeline, and any constraints." />
              </Field>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
                  Submit Enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => navigate("corporate")} className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold">Back to Service</button>
              </div>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .corp-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .corp-input::placeholder { color: var(--muted-foreground); }
        .corp-input:focus { outline: none; border-color: #d4af37; }
      `}</style>

      <CTASection
        title="Ready to bring sport to your workplace?"
        subtitle="From a single team-building day to a year-round engagement calendar — we'll handle the rest."
        primaryLabel="Talk to Us"
        primaryPage="contact"
      />
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-foreground/80 mb-1.5">
        {label} {required && <span className="text-[#f4d35e]">*</span>}
      </span>
      {children}
    </label>
  );
}
