"use client";

import { Users, UserCircle, UsersRound, GraduationCap, Trophy, Inbox, FileText, Building, TrendingUp, ArrowUpRight } from "lucide-react";
import { adminStats, recentEnquiries } from "@/lib/admin-data";
import { useAdmin, PageHeader, Card, Badge } from "../admin-shell";

const iconMap: Record<string, any> = {
  users: Users, "user-circle": UserCircle, "user-group": UsersRound,
  "academic-cap": GraduationCap, trophy: Trophy, inbox: Inbox,
  "document-text": FileText, "building-office": Building,
};

const colorMap: Record<string, string> = {
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20",
  rose: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/20",
  sky: "from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/20",
  violet: "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/20",
  red: "from-red-500/20 to-red-500/5 text-red-400 border-red-500/20",
  gray: "from-gray-500/20 to-gray-500/5 text-gray-400 border-gray-500/20",
  teal: "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/20",
};

export function DashboardPage() {
  const { setPage } = useAdmin();
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Welcome back, Rajat. Here's what's happening on SportSphere today." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {adminStats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Users;
          return (
            <Card key={i} className="p-5 relative overflow-hidden">
              <div className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${colorMap[stat.color]} blur-2xl opacity-50`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} border flex items-center justify-center`}><Icon className="h-5 w-5" /></div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><TrendingUp className="h-2.5 w-2.5" />{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Enquiries</h2>
            <button onClick={() => setPage("enquiries")} className="text-xs text-[#f4d35e] hover:underline flex items-center gap-1">View all <ArrowUpRight className="h-3 w-3" /></button>
          </div>
          <div className="space-y-2">
            {recentEnquiries.slice(0, 6).map((e) => (
              <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/5 flex items-center justify-center text-xs font-bold text-[#f4d35e]">{e.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{e.name}</div>
                  <div className="text-xs text-gray-500 truncate">{e.subject}</div>
                </div>
                <div className="hidden sm:block"><Badge color={e.type === "Corporate" ? "blue" : e.type === "Partnership" ? "gold" : e.type === "CSR" ? "purple" : "gray"}>{e.type}</Badge></div>
                <div><Badge color={e.status === "new" ? "red" : e.status === "in_progress" ? "yellow" : "green"}>{e.status === "new" ? "New" : e.status === "in_progress" ? "In Progress" : "Resolved"}</Badge></div>
                <div className="text-xs text-gray-600 whitespace-nowrap hidden md:block">{e.created}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-white mb-4">This Month</h2>
          <div className="space-y-4">
            {[
              { label: "New Signups", value: "847", percent: 78 },
              { label: "Event Registrations", value: "342", percent: 62 },
              { label: "Enquiries Received", value: "128", percent: 45 },
              { label: "Blog Posts Published", value: "12", percent: 30 },
              { label: "Athletes Verified", value: "94", percent: 88 },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1.5"><span className="text-gray-400">{s.label}</span><span className="font-semibold text-white">{s.value}</span></div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#f4d35e] to-[#b8860b] rounded-full" style={{ width: `${s.percent}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="text-xs text-gray-500 mb-2">Platform Health</div>
            <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-sm text-emerald-400 font-medium">All Systems Operational</span></div>
          </div>
        </Card>
      </div>
      <Card className="p-5 mt-4">
        <h2 className="font-semibold text-white mb-4">User Signups (Last 30 Days)</h2>
        <div className="h-40 flex items-end gap-1">
          {Array.from({ length: 30 }, (_, i) => {
            const height = 30 + Math.sin(i * 0.5) * 25 + Math.random() * 30;
            return <div key={i} className="flex-1 bg-gradient-to-t from-[#d4af37]/40 to-[#f4d35e]/80 rounded-t hover:from-[#d4af37] hover:to-[#f4d35e] transition-all cursor-pointer" style={{ height: `${height}%` }} title={`Day ${i + 1}`} />;
          })}
        </div>
        <div className="flex justify-between text-[10px] text-gray-600 mt-2"><span>30 days ago</span><span>Today</span></div>
      </Card>
    </div>
  );
}
