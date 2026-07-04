"use client";

import { Twitter, Instagram, Linkedin, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { SERVICES, type PageId } from "@/lib/site-data";
import { useNav } from "./nav-context";
import { BrandMark, useSiteTheme } from "./site-theme";

export function SiteFooter() {
  const { navigate, isOpen } = useNav();
  const { theme } = useSiteTheme();



  const quickLinks: { label: string; page: PageId }[] = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about" },
    { label: "All Services", page: "services" },
    { label: "Blog / News", page: "blog" },
    { label: "Success Stories", page: "success-stories" },
    { label: "Contact", page: "contact" },
    { label: "Login / Register", page: "auth" },
  ];

  const hubLinks: { label: string; page: PageId }[] = [
    { label: "Athletes Hub", page: "athletes-hub" },
    { label: "Teams Hub", page: "teams-hub" },
    { label: "Academies Hub", page: "academies-hub" },
    { label: "Brands & Partners", page: "brands-hub" },
    { label: "Corporate Sports", page: "corporate-hub" },
    { label: "Events & Tournaments", page: "events-hub" },
    { label: "Community", page: "community-hub" },
    { label: "Underprivileged Initiative", page: "underprivileged-hub" },
  ];

  return (
    <footer
      className="relative mt-auto border-t border-white/10 backdrop-blur-xl"
      style={{ backgroundColor: `${theme.backgroundColor}99` }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12 md:py-16">
        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrandMark height={56} />
            </div>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {theme.tagline} A single digital sports ecosystem that connects athletes, teams, academies, brands, corporates, and the wider sports community.
            </p>

            <div className="flex items-center gap-2 mt-5">
              {[Twitter, Instagram, Linkedin, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="h-9 w-9 rounded-lg glass flex items-center justify-center text-foreground/70 hover:text-[#f4d35e] hover:border-[#d4af37]/50 transition-all"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-sm font-semibold text-gradient-gold uppercase tracking-wider mb-3">
              Stay in the game
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get tournament announcements, athlete spotlights, and platform updates — straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />
              <button
                type="submit"
                className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-white/10">
          <div>
            <h5 className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">
              Company
            </h5>
            <ul className="space-y-2">
              {quickLinks.map((l) => {
                const open = isOpen(l.page);
                return (
                  <li key={l.page}>
                    <button
                      type="button"
                      onClick={() => open && navigate(l.page)}
                      disabled={!open}
                      title={open ? l.label : "Coming soon"}
                      className={`text-sm text-left transition-colors ${
                        open
                          ? "text-muted-foreground hover:text-[#f4d35e]"
                          : "text-muted-foreground/40 cursor-not-allowed line-through decoration-white/15"
                      }`}
                    >
                      {l.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">
              Services
            </h5>
            <ul className="space-y-2">
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    disabled
                    title="Coming soon"
                    className="text-sm text-muted-foreground/40 cursor-not-allowed line-through decoration-white/15 text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">
              Hubs
            </h5>
            <ul className="space-y-2">
              {hubLinks.map((l) => (
                <li key={l.page}>
                  <button
                    type="button"
                    disabled
                    title="Coming soon"
                    className="text-sm text-muted-foreground/40 cursor-not-allowed line-through decoration-white/15 text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

          </div>
          <div>
            <h5 className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-3">
              Contact
            </h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#f4d35e] mt-0.5 shrink-0" />
                <span>Mumbai, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-[#f4d35e] shrink-0" />
                <a href="mailto:hello@thesportsfoundry.com" className="hover:text-[#f4d35e]">hello@thesportsfoundry.com</a>
              </li>

              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-[#f4d35e] shrink-0" />
                <span>+91 22 4000 4000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {theme.siteName}. All rights reserved.

          </div>
          <div className="flex items-center gap-4">
            <button onClick={(e) => e.preventDefault()} className="hover:text-[#f4d35e] transition-colors">
              Terms of Use
            </button>
            <button onClick={(e) => e.preventDefault()} className="hover:text-[#f4d35e] transition-colors">
              Privacy Policy
            </button>
            <button onClick={(e) => e.preventDefault()} className="hover:text-[#f4d35e] transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
