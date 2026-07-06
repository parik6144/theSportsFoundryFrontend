"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavProvider, useNav } from "@/components/site/nav-context";
import { SiteThemeProvider } from "@/components/site/site-theme";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

import { HomePage } from "@/components/site/pages/home";
import { AboutPage } from "@/components/site/pages/about";
import { ContactPage } from "@/components/site/pages/contact";
import { ServicesLandingPage } from "@/components/site/pages/services-landing";
import { ServiceDetailPage } from "@/components/site/pages/service-detail";
import { isServicePage } from "@/lib/site-data";

function PageRouter() {
  const { page, isOpen } = useNav();

  const renderPage = () => {
    // Only enabled pages are routed; others fall back to home
    if (!isOpen(page)) {
      return <HomePage />;
    }

    switch (page) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "services":
        return <ServicesLandingPage />;
      default:
        if (isServicePage(page)) {
          return <ServiceDetailPage serviceId={page} />;
        }
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function Home() {
  return (
    <SiteThemeProvider>
      <NavProvider>
        <PageRouter />
      </NavProvider>
    </SiteThemeProvider>
  );
}
