"use client";

import { useState, useEffect, createContext, useContext, type ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, LayoutGrid, FileText, Star, MessageCircle, Store,
  UserCircle, UsersRound, GraduationCap, Building, Trophy, MessagesSquare,
  Inbox, Users, ShieldCheck, Settings, Search as SearchIcon, Menu as MenuIcon, Bell, Search,
  LogOut, Menu, X, ExternalLink, Trophy as TrophyIcon, Image,
} from "lucide-react";
import { adminNavGroups } from "@/lib/admin-data";
import { useTheme } from "./theme-context";

const iconMap: Record<string, any> = {
  Home: Home, Squares2x2: LayoutGrid, DocumentText: FileText, Star: Star, ChatBubbleLeftRight: MessageCircle, BuildingStorefront: Store,
  UserCircle: UserCircle, UsersRound: UsersRound, AcademicCap: GraduationCap, BuildingOffice2: Building, Trophy: Trophy, ChatBubbleEllipsis: MessagesSquare,
  Inbox: Inbox, Users: Users, ShieldCheck: ShieldCheck, Cog6Tooth: Settings, MagnifyingGlass: SearchIcon, Bars3: MenuIcon, Image: Image,
};

/** Map sidebar page ids → JSON collection / seed keys */
const NAV_COUNT_KEY: Record<string, string> = {
  services: "services",
  blog: "blog-posts",
  "success-stories": "success-stories",
  testimonials: "testimonials",
  partners: "partners",
  athletes: "athletes",
  teams: "teams",
  academies: "academies",
  brands: "brands",
  events: "events",
  community: "community-posts",
  enquiries: "enquiries",
  users: "users",
};

export type AdminStatsPayload = {
  counts: Record<string, number>;
  recentEnquiries: Array<{
    id: string | number;
    name: string;
    email: string;
    type: string;
    subject: string;
    status: string;
    created: string;
    createdAt?: unknown;
  }>;
  month: Record<string, number>;
  meta: Record<string, number>;
  store?: string;
};

interface AdminCtx {
  page: string;
  setPage: (p: string) => void;
  stats: AdminStatsPayload | null;
  statsLoading: boolean;
  refreshStats: () => Promise<void>;
}
const Ctx = createContext<AdminCtx | null>(null);
export const useAdmin = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAdmin must be inside AdminShell");
  return c;
};

function formatCount(n: number | undefined) {
  if (n == null || Number.isNaN(n)) return "0";
  return n.toLocaleString("en-IN");
}

export function AdminShell({ children, onLogout }: { children: ReactNode; onLogout?: () => void }) {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState<AdminStatsPayload | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch("/api/seed", { cache: "no-store" });
      const json = await res.json();
      if (!json.success || !json.data) {
        setStats({ counts: {}, recentEnquiries: [], month: {}, meta: {} });
        return;
      }
      const data = json.data as Record<string, unknown>;
      const counts =
        (data.counts as Record<string, number> | undefined) ||
        Object.fromEntries(
          Object.entries(data).filter(([, v]) => typeof v === "number")
        ) as Record<string, number>;
      setStats({
        counts,
        recentEnquiries: Array.isArray(data.recentEnquiries) ? data.recentEnquiries : [],
        month: (data.month as Record<string, number>) || {},
        meta: (data.meta as Record<string, number>) || {},
        store: typeof data.store === "string" ? data.store : undefined,
      });
    } catch {
      setStats({ counts: {}, recentEnquiries: [], month: {}, meta: {} });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/settings/theme").catch(() => {});
    refreshStats();
  }, [refreshStats]);

  // Refresh sidebar counts when switching pages (after CRUD on resource pages)
  useEffect(() => {
    if (page !== "dashboard") {
      refreshStats();
    }
  }, [page, refreshStats]);

  const handleLogout = () => {
    localStorage.removeItem("sportsphere_admin_logged_in");
    onLogout?.();
    window.location.href = "/admin";
  };

  const counts = stats?.counts || {};

  return (
    <Ctx.Provider value={{ page, setPage, stats, statsLoading, refreshStats }}>
      <div className="min-h-screen flex bg-[#0a0e1a] text-gray-100">
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/70 z-40 lg:hidden" />
          )}
        </AnimatePresence>

        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-50 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
          style={{ background: "linear-gradient(180deg, #0d1b3d 0%, #0a1128 100%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <AdminBrandLogo />
              <div>
                <BrandName />
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Admin Panel</div>
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 rounded hover:bg-white/5"><X className="h-5 w-5" /></button>
          </div>

          <nav className="p-3 overflow-y-auto h-[calc(100vh-140px)] no-scrollbar">
            {adminNavGroups.map((group) => (
              <div key={group.label} className="mb-5">
                <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">{group.label}</div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon] || Home;
                    const active = page === item.id;
                    const countKey = NAV_COUNT_KEY[item.id];
                    const liveCount = countKey ? counts[countKey] : undefined;
                    const showCount = countKey != null;
                    return (
                      <button key={item.id} onClick={() => { setPage(item.id); setMobileOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${active ? "bg-gradient-to-r from-[#d4af37]/20 to-transparent text-[#f4d35e] border border-[#d4af37]/30" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"}`}>
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {showCount && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.badge === "new" && (stats?.meta?.enquiriesNew || 0) > 0 ? "bg-red-500/20 text-red-300 border border-red-500/40" : "bg-white/5 text-gray-500"}`}>
                            {statsLoading ? "…" : formatCount(liveCount ?? 0)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5 bg-[#0a1128]/80">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f4d35e] to-[#b8860b] flex items-center justify-center text-xs font-bold text-[#0a1128]">AD</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">Admin</div>
                <div className="text-[10px] text-gray-500">Super Admin</div>
              </div>
              <button onClick={handleLogout} className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-red-400" title="Logout"><LogOut className="h-4 w-4" /></button>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-4 md:px-6 py-3 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded hover:bg-white/5"><Menu className="h-5 w-5" /></button>
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-72">
                <Search className="h-4 w-4 text-gray-500" />
                <input placeholder="Search..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-gray-600" />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500">⌘K</kbd>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 relative"><Bell className="h-5 w-5 text-gray-400" />{(stats?.meta?.enquiriesNew || 0) > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />}</button>
              <a href="/" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300"><ExternalLink className="h-3.5 w-3.5" />View Site</a>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Ctx.Provider>
  );
}

function AdminBrandLogo() {
  const { theme } = useTheme();
  const src = theme.logoUrl || "/brand/client-logo.png";
  return (
    <img src={src} alt="" className="h-8 w-8 object-contain rounded" />
  );
}

function BrandName() {
  const { theme } = useTheme();
  return <div className="text-sm font-semibold text-white truncate max-w-[140px]">{theme.siteName || "Sports Foundry"}</div>;
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function NewButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0a1128] text-sm font-semibold hover:opacity-90"
    >
      {label}
    </button>
  );
}

export function Badge({
  children,
  color = "gray",
}: {
  children: ReactNode;
  color?: "gold" | "green" | "red" | "blue" | "purple" | "yellow" | "gray";
}) {
  const map: Record<string, string> = {
    gold: "bg-[#d4af37]/15 text-[#f4d35e] border-[#d4af37]/30",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    red: "bg-red-500/15 text-red-300 border-red-500/30",
    blue: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    purple: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    yellow: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    gray: "bg-white/5 text-gray-400 border-white/10",
  };
  return (
    <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border ${map[color]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/5 bg-white/[0.02] ${className}`}>{children}</div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/5">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-300 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
