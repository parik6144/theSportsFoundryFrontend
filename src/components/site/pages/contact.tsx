"use client";

import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { PageHeader, SectionTitle } from "../ui-primitives";
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
                      <MapPin className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Office</div>
                      <div className="text-xs text-muted-foreground">SportSphere Tower, BKC<br />Mumbai 400051, IN</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Email</div>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-xs text-muted-foreground hover:text-[#f4d35e]">{CONTACT_EMAIL}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#d4af37]/15 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-[#f4d35e]" />
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-0.5">Phone</div>
                      <div className="text-xs text-muted-foreground">+91 22 4000 4000</div>
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

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionTitle eyebrow="Find Us" title="Mumbai · Bengaluru · Delhi" />
          <div className="mt-8 glossy-card overflow-hidden h-72 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b3d] to-[#0a1128] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#d4af37]/60 mx-auto mb-3" />
                <div className="text-sm font-medium">SportSphere Tower, BKC</div>
                <div className="text-xs text-muted-foreground">Mumbai 400051, India</div>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
