"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { AdminShell, useAdmin } from "@/components/admin/admin-shell";
import { ThemeProvider, useTheme } from "@/components/admin/theme-context";
import { DashboardPage } from "@/components/admin/pages/dashboard";
import { UsersPage, AthletesPage, TeamsPage, AcademiesPage, BrandsPage, EventsPage, BlogPage, ServicesPage, SuccessStoriesPage, TestimonialsPage, PartnersPage, CommunityPage, EnquiriesPage, RolesPage } from "@/components/admin/pages/resources";
import { GeneralSettingsPage, HomeSettingsPage, SeoSettingsPage } from "@/components/admin/pages/settings";
import { BrandingPage } from "@/components/admin/pages/branding";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("admin@sportsphere.app");
  const [password, setPassword] = useState("Password#123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 700); };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: `linear-gradient(135deg, ${theme.backgroundColor}, ${theme.backgroundLight}, ${theme.backgroundColor})` }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.primaryColor + "30" }} />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: theme.primaryColor + "20" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="rounded-2xl p-8 backdrop-blur-xl border shadow-2xl" style={{ backgroundColor: theme.surfaceColor + "20", borderColor: theme.primaryColor + "30" }}>
          <div className="text-center mb-6">
            {theme.logoUrl ? (
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-3">
                <img src={theme.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-1.5" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl shadow-2xl mb-3" style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, boxShadow: `0 8px 24px ${theme.primaryColor}66` }}>
                <Trophy className="h-7 w-7" style={{ color: theme.backgroundColor }} />
              </div>
            )}
            <h1 className="text-2xl font-bold" style={{ color: theme.textColor }}>
              {theme.siteName}
            </h1>
            <p className="text-xs text-gray-500 mt-1">{theme.tagline}</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none" style={{ borderColor: theme.primaryColor + "30" }} onFocus={(e) => e.target.style.borderColor = theme.primaryColor} onBlur={(e) => e.target.style.borderColor = theme.primaryColor + "30"} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input type={showPass ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none" style={{ borderColor: theme.primaryColor + "30" }} onFocus={(e) => e.target.style.borderColor = theme.primaryColor} onBlur={(e) => e.target.style.borderColor = theme.primaryColor + "30"} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">{showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer"><input type="checkbox" style={{ accentColor: theme.primaryColor }} /> Remember me</label>
              <button type="button" className="text-[#f4d35e] hover:underline">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all disabled:opacity-50" style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, color: theme.backgroundColor, boxShadow: `0 4px 12px ${theme.primaryColor}40` }}>
              {loading ? "Signing in..." : <>Sign In <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <div className="mt-5 pt-4 border-t border-white/5 text-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-500"><ShieldCheck className="h-3 w-3 text-emerald-400" /> Demo credentials pre-filled — just click Sign In</div>
          </div>
        </div>
        <div className="text-center mt-4"><a href="/" className="text-xs text-gray-500 hover:text-[#f4d35e]">← Back to website</a></div>
      </motion.div>
    </div>
  );
}

function AdminContent() {
  const { page } = useAdmin();
  switch (page) {
    case "dashboard": return <DashboardPage />;
    case "users": return <UsersPage />;
    case "athletes": return <AthletesPage />;
    case "teams": return <TeamsPage />;
    case "academies": return <AcademiesPage />;
    case "brands": return <BrandsPage />;
    case "events": return <EventsPage />;
    case "blog": return <BlogPage />;
    case "services": return <ServicesPage />;
    case "success-stories": return <SuccessStoriesPage />;
    case "testimonials": return <TestimonialsPage />;
    case "partners": return <PartnersPage />;
    case "community": return <CommunityPage />;
    case "enquiries": return <EnquiriesPage />;
    case "roles": return <RolesPage />;
    case "branding": return <BrandingPage />;
    case "settings-general": return <GeneralSettingsPage />;
    case "settings-home": return <HomeSettingsPage />;
    case "settings-seo": return <SeoSettingsPage />;
    default: return <DashboardPage />;
  }
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check if user was previously logged in (persists across refresh)
    const saved = localStorage.getItem("sportsphere_admin_logged_in");
    if (saved === "true") setLoggedIn(true);
    setChecked(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("sportsphere_admin_logged_in", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("sportsphere_admin_logged_in");
  };

  // Avoid flash of login page during initial check
  if (!checked) return null;

  if (!loggedIn) return <ThemeProvider><AdminLogin onLogin={handleLogin} /></ThemeProvider>;
  return <ThemeProvider><AdminShell onLogout={handleLogout}><AdminContent /></AdminShell></ThemeProvider>;
}
