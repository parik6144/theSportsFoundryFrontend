"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Trophy,
  Users,
  TrendingUp,
  Sparkles,
  Calendar,
  MapPin,
  Quote,
  Heart,
  ChevronRight,
  Activity,
  ShieldCheck,
  Zap,
  Target,
  UserCheck,
  Building2,
  GraduationCap,
  Newspaper,
} from "lucide-react";

import { useNav } from "../nav-context";
import { BrandMark, useSiteTheme } from "../site-theme";
import {
  SERVICES,
  PARTNERS,
  FEATURED_EVENTS,
  IMPACT_STATS,
  TESTIMONIALS,
  COMMUNITY_POSTS,
} from "@/lib/site-data";
import { CountUp, SectionTitle } from "../ui-primitives";

export function HomePage() {
  const { navigate } = useNav();
  const { theme } = useSiteTheme();

  const purposePaths = [
    {
      id: "athlete",
      icon: Trophy,
      title: "I am an Athlete",
      goal: "Get trials, scholarships & brand deals",
      page: "athletes-hub" as const,
      cta: "Build my profile",
    },
    {
      id: "team",
      icon: Users,
      title: "I run a Team",
      goal: "Recruit players & manage registrations",
      page: "teams-hub" as const,
      cta: "Open Teams Hub",
    },
    {
      id: "academy",
      icon: GraduationCap,
      title: "I run an Academy",
      goal: "List programs & attract talent",
      page: "academies-hub" as const,
      cta: "List my academy",
    },
    {
      id: "brand",
      icon: Building2,
      title: "I am a Brand",
      goal: "Sponsor athletes, teams & events",
      page: "brands-hub" as const,
      cta: "Explore partnerships",
    },
    {
      id: "corporate",
      icon: Sparkles,
      title: "I am Corporate",
      goal: "Run leagues & wellness programs",
      page: "corporate-hub" as const,
      cta: "Plan a program",
    },
    {
      id: "events",
      icon: Calendar,
      title: "I host Events",
      goal: "Launch tournaments end-to-end",
      page: "events-hub" as const,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="pt-2"
            >
              <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full glass px-4 py-2 text-sm font-medium mb-6 max-w-full">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[#f4d35e] font-semibold">12,500+ athletes</span>
                <span className="text-muted-foreground">already on the platform</span>
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
                Pick who you are below — we will take you straight to the right path.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => document.getElementById("start-here")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-gold rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  Find my path
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("auth")}
                  className="btn-outline-gold rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  Create free account
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
                {[
                  { icon: Trophy, label: "Events", value: "320+" },
                  { icon: Users, label: "Teams", value: "850+" },
                  { icon: TrendingUp, label: "Match Rate", value: "94%" },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center">
                    <s.icon className="h-5 w-5 text-[#f4d35e] mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-gradient-gold">{s.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-[520px] mx-auto">
                <div
                  className="absolute inset-[18%] rounded-3xl border border-white/10 shadow-2xl animate-pulse-glow flex items-center justify-center p-6 overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${theme.primaryColor}33, transparent 55%), linear-gradient(160deg, ${theme.backgroundLight} 0%, ${theme.backgroundColor} 100%)`,
                    boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 40px ${theme.primaryColor}33`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                  {theme.logoUrl ? (
                    <img
                      src={`${theme.logoUrl.split("?")[0]}?t=hero`}
                      alt={theme.siteName}
                      className="relative w-full max-w-[280px] h-auto object-contain drop-shadow-2xl"
                      style={{ mixBlendMode: "screen" }}
                    />
                  ) : (
                    <BrandMark height={72} />
                  )}
                </div>

                <div className="absolute inset-0 orbit-ring">
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
                          className="glossy-card p-3 w-[110px] text-center cursor-pointer"
                        >
                          <s.icon className="h-5 w-5 text-[#f4d35e] mx-auto mb-1" />
                          <div className="text-[10px] font-medium leading-tight">{s.title}</div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                <motion.div
                  className="absolute top-6 right-2 glass-strong rounded-xl p-3 animate-float"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-medium">Live: Metro Cup</span>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute bottom-10 left-0 glass-strong rounded-xl p-3 animate-float-slow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#f4d35e]" />
                    <span className="text-xs font-medium">AI Match Found</span>
                  </div>
                </motion.div>
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
            subtitle="Choose your role. We will take you to the exact place where you can complete your goal — no guessing."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {purposePaths.map((path, i) => (
              <motion.button
                key={path.id}
                onClick={() => navigate(path.page)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.06 }}
                className="glossy-card p-5 md:p-6 text-left group"
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
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("auth")}
              className="btn-gold rounded-full px-6 py-3 text-sm font-semibold"
            >
              New here? Create free account
            </button>
            <button
              onClick={() => navigate("contact")}
              className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
            >
              Not sure? Talk to us
            </button>
          </div>
        </div>
      </section>


      {/* ============ TRUST BAR ============ */}
      <section className="py-10 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Trusted by teams, academies, and brands across India
          </p>


          <div className="relative overflow-hidden">
            <div className="flex gap-3 animate-marquee" style={{ width: "max-content" }}>
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                  key={i}
                  className="glossy-card px-5 py-3 flex items-center gap-3 shrink-0"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/5 flex items-center justify-center font-bold text-[#f4d35e] text-xs">
                    {p.name.charAt(0)}
                  </div>
                    <div>
                      <div className="text-sm font-medium whitespace-nowrap">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.tag}</div>
                    </div>


                </div>
              ))}
            </div>
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

      {/* ============ IMPACT STATS ============ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-14">
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#4a90e2]/15 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {IMPACT_STATS.map((stat, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-5xl font-bold text-gradient-gold">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED EVENTS ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <SectionTitle
              align="left"
              eyebrow="Featured Events"
              title="Upcoming tournaments & leagues"
              subtitle="Register solo, with your team, or as a corporate squad."
            />
            <button
              onClick={() => navigate("events-hub")}
              className="btn-outline-gold rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
            >
              View all events
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_EVENTS.slice(0, 3).map((evt, i) => (
              <motion.button
                key={evt.id}
                onClick={() => navigate("events-hub")}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glossy-card overflow-hidden text-left group"
              >
                <div className={`relative h-40 bg-gradient-to-br ${evt.accent} flex items-center justify-center`}>
                  <Trophy className="h-16 w-16 text-white/40" strokeWidth={1.2} />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-wide glass-strong px-2 py-1 rounded-full">
                      {evt.sport}
                    </span>
                  </div>
                  {evt.registrationOpen && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] uppercase tracking-wide bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-500/40">
                        Open
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-base mb-3 group-hover:text-[#f4d35e] transition-colors">
                    {evt.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#f4d35e]" />
                      {evt.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#f4d35e]" />
                      {evt.location}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#f4d35e]">
                    Quick Register
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMUNITY SPOTLIGHT ============ */}
      <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <SectionTitle
              align="left"
              eyebrow="Community Spotlight"
              title="What's happening on the platform"
              subtitle="Live posts from athletes, coaches, brands, and fans."
            />
            <button
              onClick={() => navigate("community-hub")}
              className="btn-outline-gold rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
            >
              Open Community
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMUNITY_POSTS.slice(0, 2).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glossy-card p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${post.accent} flex items-center justify-center font-bold text-sm text-white shrink-0`}>
                    {post.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{post.author}</span>
                      <span className="text-xs text-muted-foreground">{post.handle}</span>
                      <span className="text-xs text-muted-foreground">· {post.time}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-[#f4d35e]">{post.role}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wide glass px-2 py-1 rounded-full text-[#f4d35e]">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>❤ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ UNDERPRIVILEGED BANNER ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-14"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(244,211,94,0.05) 50%, rgba(74,144,226,0.1) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#4a90e2]/15 blur-3xl pointer-events-none" />


            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 text-xs font-medium mb-4">
                  <Heart className="h-3.5 w-3.5 text-rose-400" />
                  <span className="text-[#f4d35e]">CSR Initiative</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient-gold mb-4">
                  Sport is a right, not a privilege.
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-xl">
                  Through our Underprivileged Sports Initiative, we bring coaching, equipment, competitions, and mentorship to children who'd otherwise never get a chance. 1,200+ children coached in our first year — and we're just getting started.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("underprivileged-hub")}
                    className="btn-gold rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Support the Initiative
                  </button>
                  <button
                    onClick={() => navigate("underprivileged-hub")}
                    className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Get Involved
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "1,200+", label: "Children Coached" },
                  { value: "48", label: "Coaching Camps" },
                  { value: "8,000+", label: "Equipment Donated" },
                  { value: "320+", label: "Active Mentor Pairs" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="glass-strong rounded-2xl p-5 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient-gold">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="Testimonials"
            title="Loved by athletes, teams, academies & brands"
            subtitle="Real outcomes from real stakeholders across the platform."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glossy-card p-6 flex flex-col"
              >
                <Quote className="h-6 w-6 text-[#f4d35e]/60 mb-3" />
                <p className="text-sm leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.accent} flex items-center justify-center font-bold text-xs text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle
            eyebrow="How It Works"
            title={`Get started with ${theme.siteName} in minutes`}
            subtitle="A simple path from signup to real opportunities — whether you are an athlete, team, academy, or brand."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", icon: UserCheck, title: "Create your profile", body: "Sign up free and build a verified profile with stats, media, and goals." },
              { step: "02", icon: Target, title: "Get discovered", body: "Show up in smart matches for trials, sponsorships, camps, and events." },
              { step: "03", icon: Zap, title: "Connect & grow", body: "Message teams, brands, and academies. Track opportunities in one place." },
              { step: "04", icon: ShieldCheck, title: "Win with trust", body: "Verified badges, transparent processes, and outcomes you can measure." },
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
              { icon: Trophy, title: "Athletes", body: "Build a career profile, get trials, scholarships, and brand deals.", page: "athletes-hub" as const },
              { icon: Users, title: "Teams", body: "Recruit talent, manage registrations, and grow your fan presence.", page: "teams-hub" as const },
              { icon: GraduationCap, title: "Academies", body: "List programs, attract athletes, and partner on events.", page: "academies-hub" as const },
              { icon: Building2, title: "Brands", body: "Find endorsement partners and sponsor teams or tournaments.", page: "brands-hub" as const },
              { icon: Sparkles, title: "Corporates", body: "Run leagues, wellness challenges, and team-building sports days.", page: "corporate-hub" as const },
              { icon: Heart, title: "Community & CSR", body: "Engage fans and support underprivileged sports pathways.", page: "community-hub" as const },
            ].map((card, i) => (
              <motion.button
                key={card.title}
                onClick={() => navigate(card.page)}
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


                  Explore hub <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionTitle
                align="left"
                eyebrow="Why Choose Us"
                title={`The ${theme.siteName} difference`}
                subtitle="Premium sports infrastructure with the trust, reach, and tools modern stakeholders need."
              />
              <div className="mt-8 space-y-4">
                {[
                  { title: "Verified ecosystem", body: "Athletes, teams, and partners go through clear verification so every connection is credible." },
                  { title: "End-to-end opportunities", body: "Trials, sponsorships, academies, events, and CSR — not just another social feed." },
                  { title: "Built for India, ready to scale", body: "Designed around Indian sport pathways while staying ready for multi-city growth." },
                ].map((row) => (
                  <div key={row.title} className="flex gap-3 glossy-card p-4">
                    <div className="h-9 w-9 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/25 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-1">{row.title}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{row.body}</p>


                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "94%", label: "Match success rate" },
                { value: "48 hrs", label: "Avg. first opportunity" },
                { value: "20+", label: "Sports covered" },
                { value: "Free", label: "Core platform access" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="glass-strong rounded-2xl p-6 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient-gold">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-2">{stat.label}</div>


                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SUCCESS + NEWS ============ */}
      <section className="py-16 md:py-24 bg-white/[0.02] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="flex items-end justify-between gap-4 mb-6">
                <SectionTitle
                  align="left"
                  eyebrow="Success Stories"
                  title="Real outcomes"
                  subtitle="Athletes and partners already winning with the platform."
                />
              </div>
              <div className="space-y-4">
                {[
                  { title: "From district trials to pro contract", sport: "Football", outcome: "Signed in 90 days" },
                  { title: "Academy pipeline filled in one season", sport: "Cricket", outcome: "140+ enrollments" },
                  { title: "Brand campaign with verified athletes", sport: "Multi-sport", outcome: "5 endorsements" },
                ].map((story, i) => (
                  <motion.button
                    key={story.title}
                    onClick={() => navigate("success-stories")}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="w-full glossy-card p-4 text-left flex items-center gap-4 group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary)]/5 border border-[var(--primary)]/20 flex items-center justify-center shrink-0">
                      <Trophy className="h-5 w-5 text-[#f4d35e]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold group-hover:text-[#f4d35e] transition-colors">{story.title}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{story.sport}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-[#f4d35e] glass px-2 py-1 rounded-full shrink-0">
                      {story.outcome}
                    </span>
                  </motion.button>
                ))}
                <button
                  onClick={() => navigate("success-stories")}
                  className="btn-outline-gold rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
                >
                  All success stories <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-4 mb-6">
                <SectionTitle
                  align="left"
                  eyebrow="News & Insights"
                  title="From the foundry"
                  subtitle="Platform updates, sports news, and partner stories."
                />
              </div>
              <div className="space-y-4">
                {[
                  { category: "Platform", title: "New athlete verification badges are live", read: "3 min" },
                  { category: "Events", title: "Metro Cup registrations open across 6 cities", read: "4 min" },
                  { category: "CSR", title: "1,200 children coached in year one of our initiative", read: "5 min" },
                ].map((post, i) => (
                  <motion.button
                    key={post.title}
                    onClick={() => navigate("blog")}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="w-full glossy-card p-4 text-left flex items-center gap-4 group"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary)]/5 border border-[var(--primary)]/20 flex items-center justify-center shrink-0">
                      <Newspaper className="h-5 w-5 text-[#f4d35e]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wide text-[#f4d35e] mb-0.5">{post.category}</div>
                      <div className="text-sm font-semibold group-hover:text-[#f4d35e] transition-colors line-clamp-2">{post.title}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{post.read}</span>
                  </motion.button>
                ))}
                <button
                  onClick={() => navigate("blog")}
                  className="btn-outline-gold rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
                >
                  Read the blog <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
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
              {theme.logoUrl && (
                <img
                  src={`${theme.logoUrl.split("?")[0]}?t=cta`}
                  alt={theme.siteName}
                  className="h-14 md:h-16 mx-auto mb-5 object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              )}

              <h2 className="text-2xl md:text-4xl font-bold text-gradient-gold mb-3">
                Ready to step into the foundry?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-7">
                Join 12,500+ athletes, 850+ teams, 140+ academies, and the brands building the future of Indian sport with {theme.siteName}. Core access is free — for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("auth")}
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => navigate("contact")}
                  className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Talk to Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

