"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ArrowRight,
  CheckCircle2,
  Users,
  Trophy,
  GraduationCap,
  Building2,
  Sparkles,
  Handshake,
  Compass,
} from "lucide-react";
import { SectionTitle } from "../ui-primitives";
import { LEADERS } from "@/lib/site-data";
import { useNav } from "../nav-context";
import { useSiteTheme } from "../site-theme";

const WHO_WE_HELP = [
  {
    icon: Users,
    title: "Teams",
    body: "Recruit players, manage registrations, and get support for leagues and tournaments.",
  },
  {
    icon: Trophy,
    title: "Athletes",
    body: "Find trials, academies, and sponsorship opportunities through direct team support.",
  },
  {
    icon: GraduationCap,
    title: "Academies",
    body: "List your programs, attract talent, and partner on events and camps.",
  },
  {
    icon: Building2,
    title: "Brands",
    body: "Sponsor athletes, teams, and events with clear reach and real outcomes.",
  },
  {
    icon: Sparkles,
    title: "Corporates",
    body: "Run company leagues, wellness challenges, and sports team-building days.",
  },
];

const HOW_WE_WORK = [
  {
    step: "01",
    title: "You send an enquiry",
    body: "Tell us who you are — team, athlete, academy, brand, or company — and what you need.",
  },
  {
    step: "02",
    title: "We review your message",
    body: "Our team reads every enquiry and reaches out by email, usually within one business day.",
  },
  {
    step: "03",
    title: "We match the right path",
    body: "Trials, registrations, partnerships, academies, or events — we route you to the right solution.",
  },
  {
    step: "04",
    title: "You move forward",
    body: "Clear next steps and direct communication until your goal is in motion.",
  },
];

const VALUES = [
  {
    title: "Talent over contacts",
    body: "Great players should not need the “right uncle” to get a chance.",
  },
  {
    title: "Clear and honest",
    body: "We keep processes simple, so you always know what to do next.",
  },
  {
    title: "Direct support",
    body: "No complicated sign-ups — just send a message and our team connects with you.",
  },
];

export function AboutPage() {
  const { navigate } = useNav();
  const { theme } = useSiteTheme();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" />
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-10 -left-20 w-72 h-72 rounded-full bg-[#4a90e2]/10 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-sm font-medium text-[#f4d35e] mb-5">
              <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
              About {theme.siteName}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="text-gradient-white">We help every part of sport</span>
              <br />
              <span className="text-gradient-gold">find each other — and grow.</span>
            </h1>
            <p className="mt-5 text-base md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {theme.siteName} is a simple sports platform for India. Athletes, teams, academies,
              brands, and companies meet here. You get a clear path — not a confusing maze.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("contact")}
                className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                Send an enquiry
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate("home")}
                className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                Back to home
              </button>
              <button
                onClick={() =>
                  document.getElementById("who-we-help")?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full px-6 py-3 text-sm font-semibold text-[#f4d35e] hover:bg-white/5 transition-colors inline-flex items-center gap-2"
              >
                <Compass className="h-4 w-4" />
                See who we help
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK NAV PILLS */}
      <section className="pb-10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "our-story", label: "Our story" },
              { id: "who-we-help", label: "Who we help" },
              { id: "how-it-works", label: "How it works" },
              { id: "mission", label: "Mission & vision" },
              { id: "team", label: "Team" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                }
                className="glass rounded-full px-4 py-2 text-sm text-foreground/80 hover:text-[#f4d35e] hover:border-[#d4af37]/40 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="our-story" className="py-14 md:py-20 scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">
              Our story
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gradient-white mb-5 leading-tight">
              Too much talent. Too few open doors.
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                India loves sport. But many good athletes still get missed — not because they lack
                skill, but because they lack a path.
              </p>
              <p>
                Teams know a few coaches. Coaches know a few academies. Brands know a few names.
                Everyone else waits.
              </p>
              <p>
                We built {theme.siteName} to connect those separate worlds. An athlete in a small
                town can be found by a team in another city, supported by a brand, and trained by
                an academy — without needing “the right contacts.”
              </p>
              <p>
                Today we help thousands of athletes, teams, academies, and partners work together.
                And every year, part of our work supports children who would otherwise never get a
                chance.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section
        id="who-we-help"
        className="py-14 md:py-20 bg-white/[0.02] border-y border-white/10 scroll-mt-28"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Who we help"
            title="One platform. Many goals."
            subtitle="Pick your role. We make the next step clear — so you always know where to go."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_WE_HELP.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="glossy-card p-6"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-[#f4d35e]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("contact")}
              className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              Send us an enquiry
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-14 md:py-20 scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="How it works"
            title="Four simple steps"
            subtitle="No accounts or profiles — just send an enquiry and our team takes it from there."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_WE_WORK.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glossy-card p-6 relative"
              >
                <div className="text-3xl font-bold text-gradient-gold opacity-30 absolute top-4 right-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 pr-10">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section
        id="mission"
        className="py-14 md:py-20 bg-white/[0.02] border-y border-white/10 scroll-mt-28"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Mission & vision"
            title="What we stand for"
            subtitle="Simple goals. Big impact."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glossy-card p-7 md:p-9"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20 mb-4">
                <Target className="h-6 w-6 text-[#f4d35e]" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gradient-gold">
                Our mission
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Give every person in sport — athlete, team, academy, brand, company, or fan — one
                place to find opportunities and grow. Access should come from talent and effort, not
                only from who you know.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="glossy-card p-7 md:p-9"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#4a90e2]/25 to-[#4a90e2]/5 flex items-center justify-center border border-[#4a90e2]/20 mb-4">
                <Eye className="h-6 w-6 text-sky-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gradient-gold">
                Our vision
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                A sports future where every talented kid has a visible path — no matter their city,
                income, or background. We want to be the platform that opens that path and helps the
                whole ecosystem make better choices.
              </p>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glossy-card p-6"
              >
                <CheckCircle2 className="h-6 w-6 text-[#f4d35e] mb-3" />
                <h4 className="text-base md:text-lg font-semibold mb-2">{v.title}</h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
        id="team"
        className="py-14 md:py-20 bg-white/[0.02] border-y border-white/10 scroll-mt-28"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Our team"
            title={`The people behind ${theme.siteName}`}
            subtitle="Athletes, operators, and builders who have lived this problem — and care about fixing it."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEADERS.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glossy-card p-6 text-center"
              >
                <div
                  className={`h-20 w-20 mx-auto rounded-full bg-gradient-to-br ${leader.accent} flex items-center justify-center font-bold text-2xl text-white mb-4 shadow-lg`}
                >
                  {leader.initials}
                </div>
                <h3 className="font-semibold text-base md:text-lg">{leader.name}</h3>
                <div className="text-sm text-[#f4d35e] mt-1 mb-3">{leader.role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl glass-strong gold-border-glow p-8 md:p-14 text-center"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#4a90e2]/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-sm text-[#f4d35e] mb-4">
                <Handshake className="h-4 w-4" />
                Ready when you are
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-gradient-gold mb-3">
                Connect with {theme.siteName}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Send an enquiry and tell us who you are — we help teams, athletes, academies, and
                event hosts take the next step by email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("contact")}
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  Send an enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("home")}
                  className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Explore homepage
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
