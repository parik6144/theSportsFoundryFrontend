"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { PageHeader, CTASection } from "../ui-primitives";
import { BLOG_POSTS } from "@/lib/site-data";
import { useState, useMemo } from "react";
import { useNav } from "../nav-context";

const CATEGORIES = ["All", "Platform Updates", "Sports News", "Press Releases", "Insights", "CSR"];

export function BlogPage() {
  const { navigate } = useNav();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, search]);

  return (
    <div>
      <PageHeader
        eyebrow="Blog / News"
        title="Articles, press releases, and sports news."
        subtitle="Platform updates, sports news, brand insights, and our CSR chronicles — all in one place."
      />

      <section className="py-8 md:py-12 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Filters */}
          <div className="glossy-card p-4 md:p-5 mb-8">
            <div className="flex flex-col lg:flex-row gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    category === c
                      ? "btn-gold"
                      : "glass text-foreground/70 hover:text-[#f4d35e]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Featured post (first) */}
          {filtered[0] && (
            <motion.button
              onClick={() => navigate("auth")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glossy-card overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 mb-8 text-left group"
            >
              <div className={`relative h-56 md:h-auto bg-gradient-to-br ${filtered[0].accent} flex items-center justify-center`}>
                <div className="text-5xl font-bold text-white/30">{filtered[0].initials}</div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-wide glass-strong px-2 py-1 rounded-full">Featured</span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="text-[#f4d35e]">{filtered[0].category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{filtered[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{filtered[0].readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#f4d35e] transition-colors">
                  {filtered[0].title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{filtered[0].excerpt}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[#f4d35e]">
                  Read article
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(1).map((post, i) => (
              <motion.button
                key={post.id}
                onClick={() => navigate("auth")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glossy-card overflow-hidden text-left group flex flex-col"
              >
                <div className={`relative h-40 bg-gradient-to-br ${post.accent} flex items-center justify-center`}>
                  <div className="text-4xl font-bold text-white/30">{post.initials}</div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-wide glass-strong px-2 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-[#f4d35e] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#f4d35e]">
                    Read more
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="glossy-card p-10 text-center">
              <p className="text-sm text-muted-foreground">No articles match your filters.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Never miss an update."
        subtitle="Subscribe to our newsletter for tournament announcements, athlete spotlights, and platform updates."
        primaryLabel="Subscribe"
        primaryPage="contact"
        secondaryLabel="Read Success Stories"
        secondaryPage="success-stories"
      />
    </div>
  );
}
