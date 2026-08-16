"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader, BreadcrumbRow, CTASection } from "../ui-primitives";
import { SERVICES, type ServiceId } from "@/lib/site-data";
import { useNav } from "../nav-context";

export function ServiceDetailPage({ serviceId }: { serviceId?: ServiceId }) {
  const { navigate, isOpen } = useNav();
  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];
  const Icon = service.icon;
  const hubOpen = isOpen(service.hubId);

  return (
    <div>
      <PageHeader
        eyebrow={`Service ${String(service.index).padStart(2, "0")} of 08`}
        title={service.title}
        subtitle={service.tagline}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <BreadcrumbRow
            trail={[
              { label: "Home", page: "home" },
              { label: "Services", page: "services" },
              { label: service.title },
            ]}
          />

          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glossy-card p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20">
                    <Icon className="h-6 w-6 text-[#f4d35e]" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gradient-gold">Overview</h2>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {service.overview}
                </p>
              </motion.div>

              {/* For Whom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glossy-card p-6 md:p-8"
              >
                <h3 className="text-lg font-semibold mb-3 text-gradient-white">{service.forWhom.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.forWhom.body}</p>
              </motion.div>

              {/* Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="glossy-card p-5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#f4d35e] mb-2" />
                    <h4 className="font-semibold text-sm mb-1.5">{b.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* How it works */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glossy-card p-6 md:p-8"
              >
                <h3 className="text-lg font-semibold mb-5 text-gradient-white">How it works</h3>
                <div className="space-y-4">
                  {service.howItWorks.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#f4d35e] to-[#b8860b] flex items-center justify-center text-sm font-bold text-[#0a1128] shrink-0 shadow-lg shadow-[#d4af37]/30">
                        {i + 1}
                      </div>
                      <div className="pt-1.5">
                        <div className="text-sm font-medium">{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="glossy-card p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-[#f4d35e]" />
                  <span className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold">
                    Ready to start?
                  </span>
                </div>
                <h4 className="font-semibold text-base mb-2">{service.cta}</h4>
                <p className="text-xs text-muted-foreground mb-5">
                  Send an enquiry and our team will reach out by email with next steps.
                </p>
                <button
                  onClick={() => navigate("contact")}
                  className="w-full btn-gold rounded-full px-5 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 mb-3"
                >
                  Send Enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
                {hubOpen && (
                  <button
                    onClick={() => navigate(service.hubId)}
                    className="w-full btn-outline-gold rounded-full px-5 py-3 text-sm font-semibold"
                  >
                    Open Hub
                  </button>
                )}
              </div>

              {/* Other services */}
              <div className="glossy-card p-5">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">
                  Other services
                </div>
                <div className="space-y-1">
                  {SERVICES.filter((s) => s.id !== service.id).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigate(s.id)}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg text-foreground/80 hover:bg-white/5 hover:text-[#f4d35e] transition-colors flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <s.icon className="h-3.5 w-3.5" />
                        {s.title}
                      </span>
                      <ArrowRight className="h-3 w-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's build it together."
        subtitle="Send an enquiry and our team will connect with you about how this service fits your goals."
        primaryLabel="Send Enquiry"
        primaryPage="contact"
        secondaryLabel="All Services"
        secondaryPage="services"
      />
    </div>
  );
}
