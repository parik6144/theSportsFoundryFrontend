"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { PageHeader, SectionTitle } from "../ui-primitives";
import { useState } from "react";

const USER_TYPES = ["Athlete", "Team", "Academy", "Brand", "Corporate", "General"];

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "General", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="Contact Us"
        title="We'd love to hear from you."
        subtitle="General enquiries, partnership questions, support tickets — whatever you need, we're here."
      />

      <section className="py-8 md:py-12 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glossy-card p-6 md:p-8"
              >
                <h2 className="text-lg font-semibold mb-1 text-gradient-gold">Send us a message</h2>
                <p className="text-xs text-muted-foreground mb-6">We typically respond within 24 hours.</p>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <Send className="h-7 w-7 text-emerald-300" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Message sent!</h3>
                    <p className="text-sm text-muted-foreground">Thanks, {form.name || "there"}. We'll be in touch shortly.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", type: "General", message: "" }); }}
                      className="mt-5 btn-outline-gold rounded-full px-5 py-2 text-xs font-medium"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Full Name" required>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="contact-input" placeholder="Jane Doe" />
                      </Field>
                      <Field label="Email" required>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="contact-input" placeholder="jane@example.com" />
                      </Field>
                      <Field label="Phone">
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="contact-input" placeholder="+91 98765 43210" />
                      </Field>
                      <Field label="I am a...">
                        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="contact-input">
                          {USER_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-[#0d1b3d]">{t}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="Message" required>
                      <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} className="contact-input resize-none" placeholder="How can we help?" />
                    </Field>
                    <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                      Send Message
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="glossy-card p-6">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-4">Reach us</div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Office</div>
                      <div className="text-xs text-muted-foreground">SportSphere Tower, BKC<br />Mumbai 400051, IN</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Email</div>
                      <a href="mailto:hello@sportsphere.app" className="text-xs text-muted-foreground hover:text-[#f4d35e]">hello@sportsphere.app</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Phone</div>
                      <div className="text-xs text-muted-foreground">+91 22 4000 4000</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="glossy-card p-6">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-4">Follow us</div>
                <div className="grid grid-cols-4 gap-2">
                  {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="h-10 rounded-lg glass flex items-center justify-center text-foreground/70 hover:text-[#f4d35e] hover:border-[#d4af37]/50 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glossy-card p-6">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">Office Hours</div>
                <div className="text-xs text-muted-foreground space-y-1.5">
                  <div className="flex justify-between"><span>Mon – Fri</span><span className="text-foreground/80">9:00 – 19:00</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="text-foreground/80">10:00 – 16:00</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-foreground/80">Closed</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle eyebrow="Find Us" title="Mumbai · Bengaluru · Delhi" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 glossy-card overflow-hidden h-72 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b3d] to-[#0a1128] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#d4af37]/60 mx-auto mb-3" />
                <div className="text-sm font-medium">SportSphere Tower, BKC</div>
                <div className="text-xs text-muted-foreground">Mumbai 400051, India</div>
              </div>
            </div>
            {/* decorative grid lines */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          </motion.div>
        </div>
      </section>

      <style>{`
        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
        }
        .contact-input::placeholder { color: var(--muted-foreground); }
        .contact-input:focus { outline: none; border-color: #d4af37; }
      `}</style>
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
