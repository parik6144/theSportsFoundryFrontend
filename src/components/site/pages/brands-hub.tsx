"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Target, Eye } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { BRANDS } from "@/lib/site-data";
import { useState } from "react";
import { useNav } from "../nav-context";

export function BrandsHubPage() {
  const { navigate } = useNav();
  const [form, setForm] = useState({ company: "", industry: "", name: "", email: "", objective: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const partnershipTypes = [
    { icon: Target, title: "Athlete Endorsements", body: "Partner with verified athletes whose audience and values align with your brand." },
    { icon: TrendingUp, title: "Team & League Sponsorships", body: "Sponsor teams, leagues, and tournaments with package templates and ROI tracking." },
    { icon: Sparkles, title: "Event Title Partnerships", body: "Title-partner marquee events with full branding, hospitality, and content rights." },
    { icon: Eye, title: "Content Collaborations", body: "Co-create content with athletes and teams — from social-first to long-form storytelling." },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Brands & Partners"
        title="Strategic partnerships. Measurable returns."
        subtitle="Discover and partner with athletes, teams, leagues, and events — designed to maximise engagement, with full campaign analytics."
      />

      {/* Partner showcase */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            align="left"
            eyebrow="Current Partners"
            title="Brands already building with SportSphere"
          />
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glossy-card p-5 text-center"
              >
                <div className={`h-14 w-14 mx-auto rounded-xl bg-gradient-to-br ${b.accent} flex items-center justify-center font-bold text-white mb-3 shadow-lg`}>
                  {b.initials}
                </div>
                <div className="text-sm font-semibold truncate">{b.name}</div>
                <div className="text-[10px] text-muted-foreground">{b.industry}</div>
                <div className="text-[10px] text-[#f4d35e] mt-1.5">{b.partnership}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership types */}
      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Partnership Types"
            title="Four ways to activate your brand through sport"
            subtitle="Every partnership is built around your objective — awareness, engagement, conversion, or long-term brand building."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnershipTypes.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glossy-card p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20 mb-4">
                  <p.icon className="h-5 w-5 text-[#f4d35e]" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership enquiry form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            eyebrow="Partnership Enquiry"
            title="Tell us about your brand"
            subtitle="Share your objectives and we'll come back within 48 hours with partnership options tailored to your goals."
          />
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glossy-card p-10 text-center mt-10"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7 text-emerald-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enquiry received.</h3>
              <p className="text-sm text-muted-foreground">
                Thanks, {form.name || "there"} — our partnerships team will be in touch within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="glossy-card p-6 md:p-8 mt-10 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Company Name" required>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="brand-input"
                    placeholder="Acme Sports"
                  />
                </Field>
                <Field label="Industry" required>
                  <input
                    required
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="brand-input"
                    placeholder="Apparel / Beverages / Media"
                  />
                </Field>
                <Field label="Your Name" required>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="brand-input"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Work Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="brand-input"
                    placeholder="jane@acme.com"
                  />
                </Field>
              </div>
              <Field label="Primary Objective">
                <select
                  value={form.objective}
                  onChange={(e) => setForm({ ...form, objective: e.target.value })}
                  className="brand-input"
                >
                  <option value="" className="bg-[#0d1b3d]">Select an objective</option>
                  <option value="awareness" className="bg-[#0d1b3d]">Awareness</option>
                  <option value="engagement" className="bg-[#0d1b3d]">Engagement</option>
                  <option value="conversion" className="bg-[#0d1b3d]">Conversion</option>
                  <option value="long-term" className="bg-[#0d1b3d]">Long-term brand building</option>
                </select>
              </Field>
              <Field label="Tell us more">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="brand-input resize-none"
                  placeholder="What are you looking to achieve? Any specific athletes, teams, or events in mind?"
                />
              </Field>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
                  Submit Enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("brands")}
                  className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Back to Service
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .brand-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .brand-input::placeholder { color: var(--muted-foreground); }
        .brand-input:focus { outline: none; border-color: #d4af37; }
      `}</style>

      <CTASection
        title="Want a custom campaign?"
        subtitle="From a single athlete post to a 12-city activation, we'll design and execute it end-to-end."
        primaryLabel="Talk to Us"
        primaryPage="contact"
        secondaryLabel="Explore Services"
        secondaryPage="services"
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
