"use client";

import type { ComponentType } from "react";
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
import { AthletesHubPage } from "@/components/site/pages/athletes-hub";
import { TeamsHubPage } from "@/components/site/pages/teams-hub";
import { AcademiesHubPage } from "@/components/site/pages/academies-hub";
import { BrandsHubPage } from "@/components/site/pages/brands-hub";
import { CorporateHubPage } from "@/components/site/pages/corporate-hub";
import { EventsHubPage } from "@/components/site/pages/events-hub";
import { CommunityHubPage } from "@/components/site/pages/community-hub";
import { UnderprivilegedHubPage } from "@/components/site/pages/underprivileged-hub";
import { LegalPage } from "@/components/site/pages/legal";
import { isHubPage, isServicePage } from "@/lib/site-data";
import type { HUB_PAGE_IDS } from "@/lib/site-data";

const HUB_PAGES: Record<(typeof HUB_PAGE_IDS)[number], ComponentType> = {
  "underprivileged-hub": UnderprivilegedHubPage,
  "athletes-hub": AthletesHubPage,
  "teams-hub": TeamsHubPage,
  "academies-hub": AcademiesHubPage,
  "brands-hub": BrandsHubPage,
  "corporate-hub": CorporateHubPage,
  "events-hub": EventsHubPage,
  "community-hub": CommunityHubPage,
};

function PageRouter() {
  const { page, isOpen } = useNav();

  const renderPage = () => {
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
      case "terms":
        return <LegalPage kind="terms" />;
      case "privacy":
        return <LegalPage kind="privacy" />;
      case "cookies":
        return <LegalPage kind="cookies" />;
      case "services":
        return <ServicesLandingPage />;
      default:
        if (isServicePage(page)) {
          return <ServiceDetailPage serviceId={page} />;
        }
        if (isHubPage(page)) {
          const HubPage = HUB_PAGES[page];
          return HubPage ? <HubPage /> : <HomePage />;
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
