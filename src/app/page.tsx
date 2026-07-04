"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavProvider, useNav } from "@/components/site/nav-context";
import { SiteThemeProvider } from "@/components/site/site-theme";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

import { HomePage } from "@/components/site/pages/home";
import { AboutPage } from "@/components/site/pages/about";
import { AuthPage } from "@/components/site/pages/auth";

function PageRouter() {
  const { page, isOpen } = useNav();

  const renderPage = () => {
    // Client preview: only home, about, auth are open
    if (!isOpen(page)) {
      return <HomePage />;
    }

    switch (page) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "auth":
        return <AuthPage />;
      default:
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
