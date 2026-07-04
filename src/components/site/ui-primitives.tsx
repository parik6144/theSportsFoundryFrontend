"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNav } from "./nav-context";
import type { PageId } from "@/lib/site-data";

/* ---------------- Animated counter ---------------- */
export function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setValue(end);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ---------------- Page header (used on all sub-pages) ---------------- */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" />
      <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-[#d4af37]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-10 -left-20 w-72 h-72 rounded-full bg-[#4a90e2]/10 blur-3xl pointer-events-none" />
      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-[#f4d35e] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            {eyebrow}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Section title ---------------- */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-[#f4d35e] mb-3 ${align === "center" ? "" : ""}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gradient-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}


    </motion.div>
  );
}

/* ---------------- Breadcrumb link row ---------------- */
export function BreadcrumbRow({
  trail,
}: {
  trail: { label: string; page?: PageId }[];
}) {
  const { navigate } = useNav();
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
          {t.page ? (
            <button
              onClick={() => navigate(t.page!)}
              className="hover:text-[#f4d35e] transition-colors"
            >
              {t.label}
            </button>
          ) : (
            <span className="text-foreground/80">{t.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ---------------- CTA section ---------------- */
export function CTASection({
  title,
  subtitle,
  primaryLabel,
  primaryPage,
  secondaryLabel,
  secondaryPage,
}: {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryPage: PageId;
  secondaryLabel?: string;
  secondaryPage?: PageId;
}) {
  const { navigate } = useNav();
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-strong gold-border-glow p-8 md:p-14 text-center"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#4a90e2]/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-bold text-gradient-gold mb-3">
              {title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-7">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(primaryPage)}
                className="btn-gold rounded-full px-6 py-3 text-sm font-semibold"
              >
                {primaryLabel}
              </button>
              {secondaryLabel && secondaryPage && (
                <button
                  onClick={() => navigate(secondaryPage)}
                  className="btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                >
                  {secondaryLabel}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
