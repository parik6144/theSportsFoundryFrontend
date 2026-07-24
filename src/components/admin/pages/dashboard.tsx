"use client";

import { useMemo } from "react";
import {
  Users,
  UserCircle,
  UsersRound,
  GraduationCap,
  Trophy,
  Inbox,
  FileText,
  Building,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useAdmin, PageHeader, Card, Badge } from "../admin-shell";
import { useTheme } from "../theme-context";

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

function fmt(n: number | undefined) {
  return (n ?? 0).toLocaleString("en-IN");
}

function monthPercent(value: number, maxHint = 20) {
  if (value <= 0) return 4;
  return Math.min(100, Math.round((value / Math.max(maxHint, value)) * 100));
}

export function DashboardPage() {
  const { setPage, stats, statsLoading, refreshStats } = useAdmin();
  const { theme } = useTheme();
  const counts = stats?.counts || {};
  const meta = stats?.meta || {};
  const month = stats?.month || {};
  const recent = stats?.recentEnquiries || [];

  const cards = useMemo(
    () => [
      {
        label: "Total Users",
        value: fmt(counts.users),
        change: statsLoading ? "…" : `${fmt(month.newSignups)} this month`,
        icon: Users,
        color: "emerald",
      },
      {
        label: "Athletes",
        value: fmt(counts.athletes),
        change: statsLoading ? "…" : `${fmt(meta.athletesVerified)} verified`,
        icon: UserCircle,
        color: "amber",
      },
      {
        label: "Teams",
        value: fmt(counts.teams),
        change: "live",
        icon: UsersRound,
        color: "rose",
      },
      {
        label: "Academies",
        value: fmt(counts.academies),
        change: "live",
        icon: GraduationCap,
        color: "sky",
      },
      {
        label: "Upcoming Events",
        value: fmt(counts.events),
        change: statsLoading ? "…" : `${fmt(meta.eventsLive)} live`,
        icon: Trophy,
        color: "violet",
      },
      {
        label: "New Enquiries",
        value: fmt(counts.enquiries),
        change: statsLoading ? "…" : `${fmt(meta.enquiriesToday)} today`,
        icon: Inbox,
        color: "red",
      },
      {
        label: "Blog Posts",
        value: fmt(counts["blog-posts"]),
        change: statsLoading ? "…" : `${fmt(meta.blogPublished)} published`,
        icon: FileText,
        color: "gray",
      },
      {
        label: "Brands",
        value: fmt(counts.brands),
        change: "live",
        icon: Building,
        color: "teal",
      },
    ],
    [counts, meta, month, statsLoading]
  );

  const monthRows = [
    { label: "New Signups", value: fmt(month.newSignups), percent: monthPercent(month.newSignups ?? 0) },
    {
      label: "Events added",
      value: fmt(month.eventRegistrations),
      percent: monthPercent(month.eventRegistrations ?? 0, 10),
    },
    {
      label: "Enquiries Received",
      value: fmt(month.enquiriesReceived),
      percent: monthPercent(month.enquiriesReceived ?? 0),
    },
    {
      label: "Blog Posts Published",
      value: fmt(month.blogPostsPublished),
      percent: monthPercent(month.blogPostsPublished ?? 0, 10),
    },
    {
      label: "Athletes Verified",
      value: fmt(month.athletesVerified),
      percent: monthPercent(month.athletesVerified ?? 0),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back. Here's what's on ${theme.siteName || "The Sports Foundry"} right now.`}
        action={
          <button
            onClick={() => refreshStats()}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
          >
            Refresh
          </button>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-5 relative overflow-hidden">
              <div
                className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${colorMap[stat.color]} blur-2xl opacity-50`}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} border flex items-center justify-center`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{statsLoading ? "…" : stat.value}</div>
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
            <button
              onClick={() => setPage("enquiries")}
              className="text-xs text-[#f4d35e] hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2">
            {statsLoading ? (
              <p className="text-sm text-gray-500 py-6 text-center">Loading enquiries…</p>
            ) : recent.length === 0 ? (
              <p className="text-sm text-gray-500 py-6 text-center">
                No enquiries yet — form submissions will show up here.
              </p>
            ) : (
              recent.slice(0, 6).map((e) => (
                <div
                  key={String(e.id)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                  onClick={() => setPage("enquiries")}
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/5 flex items-center justify-center text-xs font-bold text-[#f4d35e]">
                    {e.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{e.name}</div>
                    <div className="text-xs text-gray-500 truncate">{e.subject}</div>
                  </div>
                  <div className="hidden sm:block">
                    <Badge
                      color={
                        e.type.toLowerCase().includes("corporate")
                          ? "blue"
                          : e.type.toLowerCase().includes("partner")
                            ? "gold"
                            : "gray"
                      }
                    >
                      {e.type}
                    </Badge>
                  </div>
                  <div>
                    <Badge
                      color={
                        e.status === "new" ? "red" : e.status === "in_progress" ? "yellow" : "green"
                      }
                    >
                      {e.status === "new"
                        ? "New"
                        : e.status === "in_progress"
                          ? "In Progress"
                          : e.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 whitespace-nowrap hidden md:block">
                    {e.created}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-white mb-4">This Month</h2>
          <div className="space-y-4">
            {monthRows.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-400">{s.label}</span>
                  <span className="font-semibold text-white">{statsLoading ? "…" : s.value}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f4d35e] to-[#b8860b] rounded-full"
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="text-xs text-gray-500 mb-2">Data store</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-emerald-400 font-medium">
                {stats?.store === "blob"
                  ? "Vercel Blob (JSON)"
                  : stats?.store === "local"
                    ? "Local JSON"
                    : stats?.store || "JSON store"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
