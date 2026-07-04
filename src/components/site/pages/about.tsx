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
  Heart,
  Sparkles,
  Handshake,
  Compass,
} from "lucide-react";
import { SectionTitle } from "../ui-primitives";
import { LEADERS, MILESTONES } from "@/lib/site-data";
import { useNav } from "../nav-context";
import { BrandMark, useSiteTheme } from "../site-theme";

const WHO_WE_HELP = [
  {
    icon: Trophy,
    title: "Athletes",
    body: "Build a profile, get seen by teams and brands, and find trials, camps, and deals.",
  },
  {
    icon: Users,
    title: "Teams",
    body: "Find the right players faster, manage sign-ups, and grow your team presence.",
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
  {
    icon: Heart,
    title: "Community & CSR",
    body: "Support kids who need a fair chance — coaching, gear, and mentorship.",
  },
];

const HOW_WE_WORK = [
  {
    step: "01",
    title: "You join free",
    body: "Create an account and tell us who you are — athlete, team, academy, brand, or company.",
  },
  {
    step: "02",
    title: "You build your profile",
    body: "Add your story, stats, programs, or goals so the right people can find you.",
  },
  {
    step: "03",
    title: "You get matched",
    body: "We connect you with opportunities — trials, sponsors, academies, events, and partners.",
  },
  {
    step: "04",
    title: "You grow",
    body: "Message, register, partner, and track progress — all in one place.",
  },
];

const VALUES = [
  {
    title: "Talent over contacts",
    body: "Great players should not need the “right uncle” to get a chance.",
  },
  {
    title: "Clear and honest",
    body: "We keep profiles verified and paths simple, so you always know what to do next.",
  },
  {
    title: "Sport for everyone",
    body: "Part of our work always goes to children who would otherwise never get a shot.",
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
                onClick={() => navigate("auth")}
                className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                Join free
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
              { id: "journey", label: "Our journey" },
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
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

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative"
            >
              <div className="glossy-card p-6 md:p-8">
                {theme.logoUrl && (
                  <div className="mb-6 flex justify-center">
                    <BrandMark height={52} />
                  </div>
                )}
                <div className="space-y-4">
                  {[
                    { stat: "12,500+", label: "Athletes on the platform" },
                    { stat: "850+", label: "Teams across sports" },
                    { stat: "140+", label: "Partner academies" },
                    { stat: "320+", label: "Events organised" },
                    { stat: "1,200+", label: "Children coached through CSR" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <span className="text-sm md:text-base text-muted-foreground">{row.label}</span>
                      <span className="text-xl md:text-2xl font-bold text-gradient-gold shrink-0">
                        {row.stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
              onClick={() => navigate("auth")}
              className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
            >
              Create your free account
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
            subtitle="No long forms. No confusion. Just a clear path from join to grow."
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

      {/* JOURNEY */}
      <section id="journey" className="py-14 md:py-20 scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <SectionTitle
            eyebrow="Our journey"
            title="How we got here"
            subtitle="A few big steps. Many more to come."
          />
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/20 to-transparent" />
            <div className="space-y-8 md:space-y-12">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#d4af37] border-2 border-[#0a1128] z-10 mt-1" />
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div className="glossy-card p-5 md:p-6">
                      <div className="text-2xl font-bold text-gradient-gold mb-1">{m.year}</div>
                      <h4 className="font-semibold text-base md:text-lg mb-2">{m.title}</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {m.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Start your journey with {theme.siteName}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Join free. Tell us who you are. We will help you take the next step — whether you
                play, recruit, train, sponsor, or support sport.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("auth")}
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  Create free account
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
