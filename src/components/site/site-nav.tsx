"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_GROUPS, SERVICES, type PageId } from "@/lib/site-data";
import { useNav } from "./nav-context";
import { BrandMark, useSiteTheme } from "./site-theme";


export function SiteNav() {
  const { page, navigate, isOpen } = useNav();
  const { theme } = useSiteTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);



  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (p: PageId) => {
    navigate(p);
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-1.5" : "py-2.5 md:py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center gap-2.5 md:gap-4">
            {/* Logo outside glass bar — compact on mobile so it never covers hero */}
            <button
              onClick={() => go("home")}
              className="flex items-center shrink-0 group"
              aria-label={`${theme.siteName} Home`}
            >
              <span className="md:hidden">
                <BrandMark height={scrolled ? 34 : 38} />
              </span>
              <span className="hidden md:inline-flex">
                <BrandMark height={scrolled ? 46 : 52} className="transition-all duration-300" />
              </span>
            </button>


            <div
              className={`flex flex-1 items-center justify-between rounded-2xl px-4 md:px-6 transition-all duration-300 min-w-0 ${
                scrolled
                  ? "glass-strong shadow-2xl py-2 md:py-2.5"
                  : "glass py-3 md:py-3.5"
              }`}
            >
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">

              {NAV_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(group.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    onClick={() => setOpenMenu(openMenu === group.label ? null : group.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      openMenu === group.label
                        ? "text-[#f4d35e]"
                        : "text-foreground/80 hover:text-[#f4d35e]"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu === group.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openMenu === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 pt-2 min-w-[240px]"
                      >
                        <div className="glass-strong rounded-xl p-2 shadow-2xl border border-white/10">
                          {group.items.map((item) => {
                            const open = isOpen(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => open && go(item.id)}
                                disabled={!open}
                                title={open ? item.label : "Coming soon"}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                  !open
                                    ? "text-foreground/35 cursor-not-allowed line-through decoration-white/20"
                                    : page === item.id
                                      ? "bg-[#d4af37]/15 text-[#f4d35e]"
                                      : "text-foreground/80 hover:bg-white/5 hover:text-[#f4d35e]"
                                }`}
                              >
                                {item.label}
                                {!open && (
                                  <span className="ml-2 text-[10px] no-underline text-muted-foreground/60 not-italic">
                                    soon
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => go("contact")}
                className="btn-outline-gold rounded-full px-4 py-2 text-sm font-medium"
              >
                Contact
              </button>
              <button
                onClick={() => go("contact")}
                className="btn-gold rounded-full px-4 py-2 text-sm font-semibold"
              >
                Send Enquiry
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[88%] max-w-md lg:hidden overflow-y-auto"
              style={{
                background: `linear-gradient(180deg, ${theme.backgroundLight} 0%, ${theme.backgroundColor} 100%)`,
                borderLeft: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <BrandMark height={48} />
                </div>


                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 space-y-6">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div className="text-xs uppercase tracking-wider text-[#f4d35e] font-semibold mb-2">
                      {group.label}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const open = isOpen(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => open && go(item.id)}
                            disabled={!open}
                            title={open ? item.label : "Coming soon"}
                            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                              !open
                                ? "text-foreground/35 cursor-not-allowed line-through decoration-white/20"
                                : page === item.id
                                  ? "bg-[#d4af37]/15 text-[#f4d35e]"
                                  : "text-foreground/80 hover:bg-white/5 hover:text-[#f4d35e]"
                            }`}
                          >
                            {item.label}
                            {!open && (
                              <span className="ml-2 text-[10px] text-muted-foreground/60">soon</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                  </div>
                ))}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button
                    onClick={() => go("contact")}
                    className="w-full btn-outline-gold rounded-full px-4 py-2.5 text-sm font-medium"
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => go("contact")}
                    className="w-full btn-gold rounded-full px-4 py-2.5 text-sm font-semibold"
                  >
                    Send Enquiry
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* Helper to flatten the services for re-use */
export function serviceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}
