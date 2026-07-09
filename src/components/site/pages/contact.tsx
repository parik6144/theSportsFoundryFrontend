"use client";

import { Mail, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { PageHeader } from "../ui-primitives";
import { EnquiryForm } from "../enquiry-form";
import { CONTACT_EMAIL } from "@/lib/site-contact";

export function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact Us"
        title="We'd love to hear from you."
        subtitle="Send an enquiry and our team will connect with you by email — no account or profile needed."
      />

      <section className="py-8 md:py-12 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glossy-card p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-1 text-gradient-gold">Send us a message</h2>
                <p className="text-xs text-muted-foreground mb-6">We typically respond within 24 hours.</p>
                <EnquiryForm subject="Contact page enquiry" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="glossy-card p-6">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-4">Reach us</div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Email</div>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs text-muted-foreground hover:text-[#f4d35e]">{CONTACT_EMAIL}</a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="glossy-card p-6">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-4">Follow us</div>
                <div className="grid grid-cols-4 gap-2">
                  {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="h-10 rounded-lg glass flex items-center justify-center text-foreground/70 hover:text-[#f4d35e] hover:border-[#d4af37]/50 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glossy-card p-6">
                <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">Office Hours</div>
                <div className="text-xs text-muted-foreground space-y-1.5">
                  <div className="flex justify-between"><span>Mon – Fri</span><span className="text-foreground/80">9:00 – 19:00</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="text-foreground/80">10:00 – 16:00</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="text-foreground/80">Closed</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
