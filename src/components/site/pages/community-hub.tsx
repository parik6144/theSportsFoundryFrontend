"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Sparkles, ArrowRight } from "lucide-react";
import { PageHeader, CTASection, SectionTitle } from "../ui-primitives";
import { COMMUNITY_POSTS } from "@/lib/site-data";
import { useNav } from "../nav-context";

export function CommunityHubPage() {
  const { navigate } = useNav();

  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="One platform. Every stakeholder."
        subtitle="Athletes, fans, coaches, academies, and brands — all in one feed. Discussion, spotlights, opportunities, and shared experiences."
      />

      <section className="py-8 md:py-12 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed */}
            <div className="lg:col-span-2 space-y-5">
              {COMMUNITY_POSTS.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glossy-card p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${post.accent} flex items-center justify-center font-bold text-sm text-white shrink-0`}>
                      {post.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{post.author}</span>
                        <span className="text-xs text-muted-foreground">{post.handle}</span>
                        <span className="text-xs text-muted-foreground">· {post.time}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wide text-[#f4d35e]">{post.role}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide glass px-2 py-1 rounded-full text-[#f4d35e]">
                      {post.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-5 pt-3 border-t border-white/10 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-[#f4d35e] transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-[#f4d35e] transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="glossy-card p-5">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">Trending Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {["#AthleteSpotlight", "#ProContract", "#AcademyTrials", "#BrandCampaign", "#UnderprivilegedSport", "#CricketTrials", "#MetroCup", "#CoachQ&A"].map((tag) => (
                    <button key={tag} className="text-xs glass px-2.5 py-1 rounded-full text-foreground/80 hover:text-[#f4d35e] hover:border-[#d4af37]/40 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glossy-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-[#f4d35e]" />
                  <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold">Athlete Spotlight</div>
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  Diya Sharma — 19, Hyderabad. Badminton. ITF rank climbing fast. Watch this space.
                </p>
                <button
                  onClick={() => navigate("athletes-hub")}
                  className="w-full btn-outline-gold rounded-lg px-4 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-2"
                >
                  View Profile
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="glossy-card p-5">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">Active Now</div>
                <div className="space-y-3">
                  {[
                    { name: "Aarav Mehta", role: "Athlete", initials: "AM", accent: "from-emerald-400 to-emerald-700" },
                    { name: "Coach Vikram", role: "Academy", initials: "VR", accent: "from-amber-400 to-amber-700" },
                    { name: "Sanjana G.", role: "Brand", initials: "SG", accent: "from-violet-400 to-violet-700" },
                  ].map((u) => (
                    <div key={u.name} className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${u.accent} flex items-center justify-center font-bold text-xs text-white`}>
                          {u.initials}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#0a1128]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{u.name}</div>
                        <div className="text-[10px] text-[#f4d35e]">{u.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Join the conversation."
        subtitle="Follow your favourite athletes, discover events, and connect with the wider sports community — free for everyone."
        primaryLabel="Join the Community"
        primaryPage="auth"
        secondaryLabel="Learn More"
        secondaryPage="community"
      />
    </div>
  );
}
