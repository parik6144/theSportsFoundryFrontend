"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Users,
  Sparkles,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Target,
  UserCheck,
  Building2,
  GraduationCap,
  Mail,
} from "lucide-react";

import { useNav } from "../nav-context";
import { BrandMark, resolveDisplayLogoUrl, useSiteTheme } from "../site-theme";
import { EnquiryForm } from "../enquiry-form";
import { SERVICES } from "@/lib/site-data";
import { CONTACT_EMAIL } from "@/lib/site-contact";
import { SectionTitle } from "../ui-primitives";

export function HomePage() {
  const { navigate } = useNav();
  const { theme } = useSiteTheme();
  const [enquiryType, setEnquiryType] = useState("General");

  const openEnquiry = (type: string) => {
    setEnquiryType(type);
    requestAnimationFrame(() => {
      document.getElementById("enquire-form")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const purposePaths = [
    {
      id: "athlete",
      icon: Trophy,
      title: "I am an Athlete",
      goal: "Find trials, scholarships, academies, and sponsorship opportunities.",
      enquiryType: "Athlete",
      cta: "Send athlete enquiry",
    },
    {
      id: "academy",
      icon: GraduationCap,
      title: "I run an Academy",
      goal: "List programs, attract talent, and partner on events.",
      enquiryType: "Academy",
      cta: "Send academy enquiry",
    },
    {
      id: "corporate",
      icon: Sparkles,
      title: "I am Corporate",
      goal: "Run leagues, wellness programs, and team-building sports days.",
      enquiryType: "Corporate",
      cta: "Plan a program",
    },
    {
      id: "team",
      icon: Users,
      title: "I run a Team",
      goal: "Recruit players, manage rosters, and register for leagues & tournaments.",
      enquiryType: "Team",
      cta: "Send team enquiry",
      featured: true,
    },
    {
      id: "events",
      icon: Calendar,
      title: "I host Events",
      goal: "Launch tournaments and leagues with end-to-end support.",
      enquiryType: "Event",
      cta: "Host an event",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative min-h-[92vh] flex items-center pt-28 sm:pt-32 md:pt-36 pb-12">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/20 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#4a90e2]/15 blur-3xl animate-float pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="pt-2 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium mb-6">
                <Mail className="h-4 w-4 text-[#f4d35e] shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#f4d35e] font-semibold hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>



              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4d35e] mb-3">
                What we do
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-gradient-white">We connect every part of</span>
                <br />
                <span className="text-gradient-gold">Indian sport — in one place.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {theme.siteName} is a sports ecosystem platform. Athletes get opportunities.
                Teams recruit talent. Academies grow programs. Brands sponsor. Corporates run leagues.
                Events get delivered end-to-end.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                Tell us who you are and what you need — our team connects with you directly by email. No sign-up required.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openEnquiry("Team")}
                  className="btn-gold rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  I run a Team — enquire now
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => document.getElementById("start-here")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-outline-gold rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  See all paths
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2 flex items-center justify-center min-h-[50vh] lg:min-h-[78vh]"
            >
              <div className="relative w-full max-w-[min(100%,720px)] mx-auto aspect-square">
                {/* Logo — half-page centerpiece */}
                <div className="absolute inset-[6%] z-10 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="relative w-full flex justify-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35 }}
                  >
                    <BrandMark
                      emphasis="hero-half"
                      showNameFallback={false}
                    />
                  </motion.div>
                </div>

                <div className="absolute inset-0 orbit-ring scale-110 hidden lg:block">
                  {SERVICES.slice(0, 6).map((s, i) => {
                    const positions = [
                      { top: "0%", left: "50%" },
                      { top: "25%", left: "100%" },
                      { top: "75%", left: "100%" },
                      { top: "100%", left: "50%" },
                      { top: "75%", left: "0%" },
                      { top: "25%", left: "0%" },
                    ];
                    const pos = positions[i];
                    return (
                      <div
                        key={s.id}
                        className={`absolute orbit-chip orbit-chip-${i + 1}`}
                        style={{ top: pos.top, left: pos.left }}
                      >
                        <button
                          onClick={() => navigate(s.id)}
                          className="glossy-card hero-orbit-chip p-3 w-[116px] text-center cursor-pointer transition-transform hover:scale-105"
                        >
                          <s.icon className="h-5 w-5 text-[#f4d35e] mx-auto mb-1.5" />
                          <div className="text-[10px] font-medium leading-tight text-foreground/90">{s.title}</div>
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground flex flex-col items-center gap-1">
          <span>Scroll to choose your path</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronRight className="h-4 w-4 rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* ============ START HERE — purpose navigation ============ */}
      <section id="start-here" className="py-16 md:py-20 border-y border-white/10 bg-white/[0.02] scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Start Here"
            title="What brings you to The Sports Foundry?"
            subtitle="Choose your role — where you used to see brand partnerships, teams can enquire directly. We reply by email."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {purposePaths.map((path, i) => (
              <motion.button
                key={path.id}
                onClick={() => openEnquiry(path.enquiryType)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.06 }}
                className={`glossy-card p-5 md:p-6 text-left group ${
                  path.featured ? "ring-1 ring-[#d4af37]/45 shadow-lg shadow-[#d4af37]/10" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                    <path.icon className="h-6 w-6 text-[#f4d35e]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold group-hover:text-[#f4d35e] transition-colors">{path.title}</h3>
                    <p className="mt-1.5 text-sm md:text-base text-muted-foreground leading-relaxed">{path.goal}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4d35e]">
                      {path.cta}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.button>

            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("contact")}
              className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Not sure? Contact us directly
            </button>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO — 8 services grid ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="What We Do"
            title="One platform. Eight ways to grow."
            subtitle={`From discovering athletes to delivering marquee events, ${theme.siteName} powers every part of the sports ecosystem.`}
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {s.short}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#f4d35e] opacity-0 group-hover:opacity-100 transition-opacity">


                  Explore
                  <ArrowRight className="h-3 w-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="How It Works"
            title={`Work with ${theme.siteName} in four steps`}
            subtitle="No accounts or profiles to create — just send an enquiry and our team takes it from there."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", icon: Mail, title: "Send your enquiry", body: "Tell us who you are — team, athlete, academy, or event host — and what you need." },
              { step: "02", icon: UserCheck, title: "We review & connect", body: "Our team reads every message and reaches out by email within one business day." },
              { step: "03", icon: Target, title: "We match the right path", body: "Trials, registrations, partnerships, or events — we route you to the right solution." },
              { step: "04", icon: ShieldCheck, title: "You move forward", body: "Clear next steps, direct communication, and support until your goal is in motion." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glossy-card p-6 relative"
              >
                <div className="text-4xl font-bold text-gradient-gold absolute top-4 right-5 opacity-30">
                  {item.step}
                </div>

                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--primary)]/5 border border-[var(--primary)]/20 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-[#f4d35e]" />
                </div>
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>


              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Built For Everyone In Sport"
            title="One ecosystem. Every stakeholder."
            subtitle="Whether you compete, coach, recruit, sponsor, or cheer — there is a place for you here."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Users, title: "Teams", body: "Recruit players, manage registrations, and grow your team presence.", enquiryType: "Team" },
              { icon: Trophy, title: "Athletes", body: "Find trials, scholarships, academies, and sponsorship opportunities.", enquiryType: "Athlete" },
              { icon: GraduationCap, title: "Academies", body: "List programs, attract athletes, and partner on events.", enquiryType: "Academy" },
              { icon: Building2, title: "Brands", body: "Find endorsement partners and sponsor teams or tournaments.", enquiryType: "Brand" },
              { icon: Sparkles, title: "Corporates", body: "Run leagues, wellness challenges, and team-building sports days.", enquiryType: "Corporate" },
              { icon: Calendar, title: "Event Hosts", body: "Launch tournaments and leagues with end-to-end delivery support.", enquiryType: "Event" },
            ].map((card, i) => (
              <motion.button
                key={card.title}
                onClick={() => openEnquiry(card.enquiryType)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="glossy-card p-6 text-left group"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--primary)]/25 to-[var(--primary)]/5 border border-[var(--primary)]/20 flex items-center justify-center mb-4">
                  <card.icon className="h-5 w-5 text-[#f4d35e]" />
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-[#f4d35e] transition-colors">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{card.body}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#f4d35e]">
                  Send enquiry <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <SectionTitle
            eyebrow="Why Choose Us"
            title={`The ${theme.siteName} difference`}
            subtitle="Direct support for teams, athletes, academies, and event hosts — without inflated claims or fake numbers."
          />
          <div className="mt-10 space-y-4">
            {[
              { title: "Honest & direct", body: "Tell us what you need. We reply by email with clear next steps — no sign-up walls." },
              { title: "End-to-end support", body: "Recruitment, registrations, academies, partnerships, and events — one team to talk to." },
              { title: "Built for Indian sport", body: "Designed around how teams, academies, and events actually work in India." },
            ].map((row) => (
              <div key={row.title} className="flex gap-3 glossy-card p-5">
                <div className="h-9 w-9 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/25 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4 text-[#f4d35e]" />
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">{row.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ENQUIRY FORM ============ */}
      <section id="enquire-form" className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10 scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
              <SectionTitle
                align="left"
                eyebrow="Get in touch"
                title="Send us an enquiry"
                subtitle="Same form as Contact Us — your details go straight to our team. We reply by email, usually within 24 hours."
              />
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-[#f4d35e] mt-0.5 shrink-0" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#f4d35e] transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#f4d35e] mt-0.5 shrink-0" />
                  <span>No login or profile needed — just your message and we take it from there.</span>
                </li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 glossy-card p-6 md:p-8"
            >
              <h3 className="text-lg font-semibold mb-1 text-gradient-gold">Tell us what you need</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Running a team? Choose &quot;Team&quot; below and share your sport, city, and roster needs.
              </p>
              <EnquiryForm
                key={enquiryType}
                defaultType={enquiryType}
                subject="Homepage enquiry"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl glass-strong gold-border-glow p-8 md:p-14 text-center"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#4a90e2]/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <img
                src={`${resolveDisplayLogoUrl(theme.logoUrl)}?t=cta`}
                alt={theme.siteName}
                className="h-14 md:h-16 mx-auto mb-5 object-contain"
                style={{ mixBlendMode: "screen" }}
              />

              <h2 className="text-2xl md:text-4xl font-bold text-gradient-gold mb-3">
                Ready to connect with {theme.siteName}?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-7">
                Whether you run a team, host events, or need a sports partner — send an enquiry and our team will reach out directly. No sign-up required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => openEnquiry("Team")}
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  I run a Team — enquire now
                </button>
                <button
                  onClick={() => navigate("contact")}
                  className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

