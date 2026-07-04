"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { PageId, ServiceId } from "@/lib/site-data";
import { isPageOpen } from "@/lib/site-data";

interface NavState {
  page: PageId;
  serviceId?: ServiceId;
  navigate: (page: PageId, serviceId?: ServiceId) => void;
  isOpen: (page: PageId) => boolean;
}

const NavContext = createContext<NavState | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>("home");
  const [serviceId, setServiceId] = useState<ServiceId | undefined>(undefined);

  const navigate = useCallback((next: PageId, svc?: ServiceId) => {
    // Client preview lock: only landing, about, login/register are open
    if (!isPageOpen(next)) {
      return;
    }
    setPage(next);
    setServiceId(svc);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <NavContext.Provider value={{ page, serviceId, navigate, isOpen: isPageOpen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
