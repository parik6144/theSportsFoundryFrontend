"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, Card, Badge } from "../admin-shell";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-400 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[10px] text-gray-600 mt-1">{hint}</span>}
    </label>
  );
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors";

function SaveBar() {
  return (
    <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/5">
      <button className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5">Cancel</button>
      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#f4d35e] to-[#b8860b] text-[#0a1128] text-sm font-semibold hover:shadow-lg hover:shadow-[#d4af37]/30"><Save className="h-4 w-4" /> Save Changes</button>
    </div>
  );
}

export function GeneralSettingsPage() {
  const [form, setForm] = useState({ siteName: "SportSphere", tagline: "Where every sport connects.", email: "hello@sportsphere.app", phone: "+91 22 4000 4000", address: "SportSphere Tower, BKC, Mumbai 400051, India", maintenance: false });
  return (
    <div>
      <PageHeader title="General Settings" subtitle="Site identity, branding, contact info" />
      <div className="space-y-4 max-w-3xl">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Site Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Site Name"><input className={inputCls} value={form.siteName} onChange={e => setForm({...form, siteName: e.target.value})} /></Field>
            <Field label="Site Tagline"><input className={inputCls} value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} /></Field>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Contact Email"><input className={inputCls} value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></Field>
            <Field label="Contact Phone"><input className={inputCls} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></Field>
            <div className="md:col-span-2"><Field label="Office Address"><textarea className={inputCls} rows={2} value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></Field></div>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Maintenance Mode</h2>
          <label className="flex items-center gap-3 mb-3">
            <input type="checkbox" checked={form.maintenance} onChange={e => setForm({...form, maintenance: e.target.checked})} className="h-4 w-4 accent-[#d4af37]" />
            <span className="text-sm text-gray-300">Enable maintenance mode</span>
            <Badge color={form.maintenance ? "red" : "green"}>{form.maintenance ? "ON" : "OFF"}</Badge>
          </label>
        </Card>
        <SaveBar />
      </div>
    </div>
  );
}

export function HomeSettingsPage() {
  const [form, setForm] = useState({ heroLine1: "Where every", heroLine2: "sport connects.", ctaPrimary: "Join as Athlete / Team", athletes: 12500, teams: 850, events: 320, academies: 140 });
  return (
    <div>
      <PageHeader title="Home Page Settings" subtitle="Edit hero section, CTAs, impact stats" />
      <div className="space-y-4 max-w-3xl">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Headline Line 1"><input className={inputCls} value={form.heroLine1} onChange={e => setForm({...form, heroLine1: e.target.value})} /></Field>
            <Field label="Headline Line 2"><input className={inputCls} value={form.heroLine2} onChange={e => setForm({...form, heroLine2: e.target.value})} /></Field>
            <Field label="Primary CTA Label"><input className={inputCls} value={form.ctaPrimary} onChange={e => setForm({...form, ctaPrimary: e.target.value})} /></Field>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Impact Stats (Numbers)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Athletes"><input type="number" className={inputCls} value={form.athletes} onChange={e => setForm({...form, athletes: +e.target.value})} /></Field>
            <Field label="Teams"><input type="number" className={inputCls} value={form.teams} onChange={e => setForm({...form, teams: +e.target.value})} /></Field>
            <Field label="Events"><input type="number" className={inputCls} value={form.events} onChange={e => setForm({...form, events: +e.target.value})} /></Field>
            <Field label="Academies"><input type="number" className={inputCls} value={form.academies} onChange={e => setForm({...form, academies: +e.target.value})} /></Field>
          </div>
        </Card>
        <SaveBar />
      </div>
    </div>
  );
}

export function SeoSettingsPage() {
  const [form, setForm] = useState({ title: "SportSphere — Sports Ecosystem Platform", desc: "A single digital sports ecosystem", keywords: "sports, athletes, teams", ga: "", robots: "User-agent: *\nDisallow:" });
  return (
    <div>
      <PageHeader title="SEO Settings" subtitle="Meta tags, analytics, robots.txt" />
      <div className="space-y-4 max-w-3xl">
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Meta Tags</h2>
          <div className="space-y-4">
            <Field label="Meta Title"><input className={inputCls} value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></Field>
            <Field label="Meta Description"><textarea className={inputCls} rows={2} value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} /></Field>
            <Field label="Meta Keywords"><textarea className={inputCls} rows={2} value={form.keywords} onChange={e => setForm({...form, keywords: e.target.value})} /></Field>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Analytics</h2>
          <Field label="Google Analytics ID"><input className={inputCls} value={form.ga} onChange={e => setForm({...form, ga: e.target.value})} placeholder="G-XXXXXXXXXX" /></Field>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-white mb-4">robots.txt</h2>
          <Field label="Robots.txt Content"><textarea className={`${inputCls} font-mono`} rows={6} value={form.robots} onChange={e => setForm({...form, robots: e.target.value})} /></Field>
        </Card>
        <SaveBar />
      </div>
    </div>
  );
}
