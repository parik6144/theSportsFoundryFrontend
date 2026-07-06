"use client";

import { motion } from "framer-motion";
import { Heart, HandHeart, Sparkles, Building } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { EnquiryForm } from "../enquiry-form";
import { CONTACT_EMAIL } from "@/lib/site-contact";

const PILLARS = [
  { icon: Sparkles, title: "Coaching Access", body: "Free and subsidised coaching camps in underserved communities, run by verified coaches." },
  { icon: Heart, title: "Equipment Support", body: "Equipment banks that lend, donate, and recycle kit — so cost never blocks a child's path." },
  { icon: Building, title: "Competition Exposure", body: "Pathway tournaments that identify talent and route it into structured academies." },
  { icon: HandHeart, title: "Mentorship", body: "Supported children paired with mentors — athletes, coaches, or community leaders." },
];

export function UnderprivilegedHubPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Underprivileged Sports"
        title="Promotes Sports Among the Underprivileged"
        subtitle="We use sport as a tool to inspire, develop talent, and create brighter futures — through partnerships, volunteering, and community support."
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle eyebrow="Program Pillars" title="Four ways we make access real" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
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

      <section className="py-12 md:py-16 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            eyebrow="Get Involved"
            title="Partner, volunteer, or support"
            subtitle={`Send an enquiry and our team will reply at ${CONTACT_EMAIL}.`}
          />
          <div className="glossy-card p-6 md:p-8 mt-10">
            <EnquiryForm
              defaultType="General"
              subject="Underprivileged sports initiative"
              messagePlaceholder="Tell us if you want to partner, volunteer, sponsor, or support — and how you'd like to help."
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Sport changes lives."
        subtitle="Every partnership and enquiry helps us reach more children who deserve a fair shot at sport."
        primaryLabel="Send Enquiry"
        primaryPage="contact"
        secondaryLabel="All Services"
        secondaryPage="underprivileged"
      />
    </div>
  );
}
