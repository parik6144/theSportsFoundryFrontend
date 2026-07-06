"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Target, Eye } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { EnquiryForm } from "../enquiry-form";
import { CONTACT_EMAIL } from "@/lib/site-contact";
import { useNav } from "../nav-context";

export function BrandsHubPage() {
  const { navigate } = useNav();

  const partnershipTypes = [
    { icon: Target, title: "Athlete Endorsements", body: "Partner with athletes whose audience and values align with your brand." },
    { icon: TrendingUp, title: "Team & League Sponsorships", body: "Sponsor teams, leagues, and tournaments with clear objectives." },
    { icon: Sparkles, title: "Event Title Partnerships", body: "Title-partner events with branding, hospitality, and content rights." },
    { icon: Eye, title: "Content Collaborations", body: "Co-create content with athletes and teams — social-first to long-form." },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Brands & Partners"
        title="Strategic partnerships. Measurable returns."
        subtitle="Partner with athletes, teams, leagues, and events — send an enquiry and our team will connect with you by email."
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            align="left"
            eyebrow="Partnership Types"
            title="Four ways to activate your brand through sport"
            subtitle="Every partnership is built around your objective — awareness, engagement, conversion, or long-term brand building."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnershipTypes.map((p, i) => (
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

      <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle
            eyebrow="Partnership Enquiry"
            title="Tell us about your brand"
            subtitle={`We reply at ${CONTACT_EMAIL} with partnership options tailored to your goals.`}
          />
          <div className="glossy-card p-6 md:p-8 mt-10">
            <EnquiryForm
              defaultType="Brand"
              subject="Brand partnership enquiry"
              messagePlaceholder="Share your objectives, target audience, and any athletes, teams, or events you have in mind."
            />
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("brands")}
              className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              Back to Service
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <CTASection
        title="Want a custom campaign?"
        subtitle="From a single athlete collaboration to a multi-city activation — send an enquiry and we will take it from there."
        primaryLabel="Send Enquiry"
        primaryPage="contact"
        secondaryLabel="Explore Services"
        secondaryPage="services"
      />
    </div>
  );
}
