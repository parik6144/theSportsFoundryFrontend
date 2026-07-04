"use client";

import { motion } from "framer-motion";
import { Heart, HandHeart, Users, Building, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { CSR_STORIES } from "@/lib/site-data";
import { useState } from "react";
import { useNav } from "../nav-context";

const PILLARS = [
  { icon: Sparkles, title: "Coaching Access", body: "Free and subsidised coaching camps in underserved communities, run by verified coaches." },
  { icon: Heart, title: "Equipment Support", body: "Equipment banks that lend, donate, and recycle kit — so cost never blocks a child's path." },
  { icon: Building, title: "Competition Exposure", body: "Pathway tournaments that identify talent and route it into structured academies." },
  { icon: HandHeart, title: "Mentorship", body: "Each supported child is paired with a mentor — an athlete, coach, or community leader." },
];

export function UnderprivilegedHubPage() {
  const { navigate } = useNav();
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="CSR Initiative"
        title="Using sport to inspire and build brighter futures."
        subtitle="Through partnerships and community initiatives, we use sport as a tool to inspire, develop talent, and create brighter futures for underprivileged children."
      />

      {/* Hero stat band */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(244,211,94,0.05) 50%, rgba(74,144,226,0.1) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "1,200+", label: "Children Coached" },
                { value: "48", label: "Coaching Camps" },
                { value: "8,000+", label: "Equipment Donated" },
                { value: "320+", label: "Mentor Pairs" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-gradient-gold">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Program Pillars"
            title="Four ways we make access real"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, i) => (
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

      {/* Impact stories */}
      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Impact Stories"
            title="Real numbers. Real kids."
            subtitle="Every number below is a child whose life touched sport for the first time."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {CSR_STORIES.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glossy-card p-6 flex flex-col"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${story.accent} flex items-center justify-center font-bold text-white mb-4`}>
                  {story.initials}
                </div>
                <h3 className="font-semibold text-base mb-2">{story.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{story.body}</p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="text-2xl font-bold text-gradient-gold">{story.stat}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{story.statLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            eyebrow="Get Involved"
            title="Help us scale this."
            subtitle="Partner, volunteer, sponsor, or donate — every contribution is tracked with transparent impact reporting."
          />
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glossy-card p-10 text-center mt-10"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 text-emerald-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Thank you.</h3>
              <p className="text-sm text-muted-foreground">
                We'll be in touch within 24 hours, {form.name || "friend"}.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="glossy-card p-6 md:p-8 mt-10 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Your Name" required>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="csr-input" placeholder="Your name" />
                </Field>
                <Field label="Email" required>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="csr-input" placeholder="you@example.com" />
                </Field>
              </div>
              <Field label="How would you like to help?">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="csr-input">
                  <option value="" className="bg-[#0d1b3d]">Select an option</option>
                  <option className="bg-[#0d1b3d]">Partner (organisation)</option>
                  <option className="bg-[#0d1b3d]">Volunteer (coach / mentor)</option>
                  <option className="bg-[#0d1b3d]">Sponsor (brand)</option>
                  <option className="bg-[#0d1b3d]">Donate (individual)</option>
                </select>
              </Field>
              <Field label="Anything else?">
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="csr-input resize-none" placeholder="Tell us more about your interest." />
              </Field>
              <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                Submit
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .csr-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .csr-input::placeholder { color: var(--muted-foreground); }
        .csr-input:focus { outline: none; border-color: #d4af37; }
      `}</style>

      <CTASection
        title="Sport changes lives. Help us change more."
        subtitle="Every rupee, every hour, every connection helps another child pick up a ball, a bat, or a pair of boots for the first time."
        primaryLabel="Support the Initiative"
        primaryPage="contact"
        secondaryLabel="Learn More"
        secondaryPage="underprivileged"
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
