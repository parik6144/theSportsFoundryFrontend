"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Trash2, Check, Eye, RotateCcw, Sparkles, RefreshCw, Palette, Save, Type, Image as ImageIcon } from "lucide-react";
import { PageHeader, Card } from "../admin-shell";
import { useTheme } from "../theme-context";

interface ThemeData {
  logoUrl: string | null;
  siteName: string;
  tagline: string;
  primaryColor: string;
  primaryLight: string;
  primaryDark: string;
  backgroundColor: string;
  backgroundLight: string;
  surfaceColor: string;
  textColor: string;
  textMuted: string;
  accentColor: string;
}

const DEFAULT_THEME: ThemeData = {
  logoUrl: null,
  siteName: "The Sports Foundry",
  tagline: "Where every sport connects.",
  primaryColor: "#d4af37",
  primaryLight: "#f4d35e",
  primaryDark: "#b8860b",
  backgroundColor: "#0a1128",
  backgroundLight: "#0d1b3d",
  surfaceColor: "#161a26",
  textColor: "#e8edf5",
  textMuted: "#9aa5ba",
  accentColor: "#d4af37",
};



export function BrandingPage() {
  const { refresh } = useTheme();
  const [theme, setTheme] = useState<ThemeData>(DEFAULT_THEME);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"logo" | "colors" | "text">("logo");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings/theme")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data) {
          setTheme({ ...DEFAULT_THEME, ...data.data });
        }
      })
      .catch(() => {});
  }, []);

  const handleLogoUpload = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, SVG)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Max 5MB.");
      return;
    }
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch("/api/upload-logo", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Upload failed. Please try again.");
        return;
      }

      const logoUrl = `${data.url}?t=${Date.now()}`;
      const newTheme = { ...theme, logoUrl };
      setTheme(newTheme);
      await saveTheme({ ...newTheme, logoUrl: data.url });
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const saveTheme = async (themeData: ThemeData) => {
    try {
      const res = await fetch("/api/settings/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...themeData,
          logoUrl: themeData.logoUrl ? themeData.logoUrl.split("?")[0] : null,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Save failed");
      }

      if (data.data) {
        setTheme({ ...DEFAULT_THEME, ...data.data, logoUrl: data.data.logoUrl ? `${data.data.logoUrl}?t=${Date.now()}` : null });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      refresh();
    } catch (err: any) {
      setError(err.message || "Could not save theme. Please try again.");
    }
  };


  const updateColor = (key: keyof ThemeData, value: string) => {
    setTheme({ ...theme, [key]: value });
  };

  const removeLogo = () => {
    const newTheme = { ...theme, logoUrl: null };
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleLogoUpload(file);
  };

  const colorFields = [
    { key: "primaryColor" as const, label: "Primary Color (Main Accent)", desc: "Main brand color used for buttons, links, highlights." },
    { key: "primaryLight" as const, label: "Primary Light", desc: "Lighter shade for gradients and hover states." },
    { key: "primaryDark" as const, label: "Primary Dark", desc: "Darker shade for borders and pressed states." },
    { key: "backgroundColor" as const, label: "Background (Base)", desc: "Main page background color." },
    { key: "backgroundLight" as const, label: "Background Light", desc: "Used for cards, panels, sidebars." },
    { key: "surfaceColor" as const, label: "Surface Color", desc: "Used for elevated cards and inputs." },
    { key: "textColor" as const, label: "Text Color", desc: "Main body text color." },
    { key: "textMuted" as const, label: "Text Muted", desc: "Secondary/helper text color." },
    { key: "accentColor" as const, label: "Accent Color", desc: "Additional accent for badges and highlights." },
  ];

  return (
    <div>
      <PageHeader title="Branding & Theme" subtitle="Upload your logo and customize colors. Changes apply instantly across the entire admin panel and website." />

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">⚠ {error}</div>
      )}

      {saved && (
        <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-400 flex items-center gap-2">
          <Check className="h-4 w-4" /> Theme saved! Changes applied across the platform.
        </div>
      )}

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 border-b border-white/10">
        {[
          { id: "logo" as const, label: "Logo", icon: ImageIcon },
          { id: "colors" as const, label: "Theme Colors", icon: Palette },
          { id: "text" as const, label: "Site Name & Text", icon: Type },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#d4af37] text-[#f4d35e]"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* LOGO TAB */}
          {activeTab === "logo" && (
            <Card className="p-6">
              <h2 className="text-sm font-semibold text-white mb-1">Upload Your Logo</h2>
              <p className="text-xs text-gray-500 mb-4">PNG, JPG, or SVG · Max 5MB · Recommended: 400×120px (horizontal) or 100×100px (square icon)</p>

              {!theme.logoUrl ? (
                <div
                  onClick={() => fileInput.current?.click()}
                  onDrop={onDrop}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                  className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                    dragOver ? "border-[#d4af37] bg-[#d4af37]/5" : "border-white/15 hover:border-[#d4af37]/50 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center mb-4">
                    {uploading ? <RefreshCw className="h-6 w-6 text-[#f4d35e] animate-spin" /> : <Upload className="h-6 w-6 text-[#f4d35e]" />}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">
                    {uploading ? "Uploading to server..." : "Click to upload or drag & drop your logo"}
                  </div>
                  <div className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</div>
                  <input ref={fileInput} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} className="hidden" />
                </div>
              ) : (
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={theme.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">Your logo is live</div>
                      <div className="text-xs text-gray-500 mt-0.5">Applied to navbar, login page, and admin sidebar</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => fileInput.current?.click()} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-sky-400" title="Replace">
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button onClick={removeLogo} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400" title="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input ref={fileInput} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} className="hidden" />
                  </div>
                </div>
              )}

              {/* Live preview */}
              {theme.logoUrl && (
                <div className="mt-5">
                  <h3 className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2"><Eye className="h-3.5 w-3.5 text-[#f4d35e]" />Live Preview on Different Backgrounds</h3>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-white p-4 flex items-center justify-center min-h-[80px]">
                      <img src={theme.logoUrl} alt="On white" className="max-h-12 max-w-full object-contain" />
                    </div>
                    <div className="rounded-lg p-4 flex items-center justify-center min-h-[80px] relative overflow-hidden" style={{ backgroundColor: theme.backgroundColor }}>
                      <img src={theme.logoUrl} alt="On theme bg" className="max-h-12 max-w-full object-contain relative" />
                    </div>
                    <div className="rounded-lg p-4 flex items-center justify-center min-h-[80px]" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryDark})` }}>
                      <img src={theme.logoUrl} alt="On primary" className="max-h-12 max-w-full object-contain" />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* COLORS TAB */}
          {activeTab === "colors" && (
            <Card className="p-6">
              <h2 className="text-sm font-semibold text-white mb-1">Theme Colors</h2>
              <p className="text-xs text-gray-500 mb-4">Pick colors that match your brand. Changes apply instantly via CSS variables.</p>

              <div className="space-y-4">
                {colorFields.map((field) => (
                  <div key={field.key} className="flex items-start gap-4">
                    <div className="flex gap-2 shrink-0">
                      <input
                        type="color"
                        value={theme[field.key]}
                        onChange={(e) => updateColor(field.key, e.target.value)}
                        className="h-10 w-16 rounded bg-transparent border border-white/10 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme[field.key]}
                        onChange={(e) => updateColor(field.key, e.target.value)}
                        className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="text-sm font-medium text-white">{field.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{field.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => setTheme(DEFAULT_THEME)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={() => saveTheme(theme)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#f4d35e] to-[#b8860b] text-[#0a1128] text-sm font-semibold hover:shadow-lg hover:shadow-[#d4af37]/30"
                >
                  <Save className="h-4 w-4" /> Save Theme
                </button>
              </div>
            </Card>
          )}

          {/* TEXT TAB */}
          {activeTab === "text" && (
            <Card className="p-6">
              <h2 className="text-sm font-semibold text-white mb-1">Site Name & Tagline</h2>
              <p className="text-xs text-gray-500 mb-4">These appear in the browser title, login page, and admin sidebar.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Site Name</label>
                  <input
                    type="text"
                    value={theme.siteName}
                    onChange={(e) => updateColor("siteName", e.target.value)}
                    placeholder="e.g. SportSphere"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#d4af37]"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Shown in browser tab and admin sidebar.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Tagline</label>
                  <input
                    type="text"
                    value={theme.tagline}
                    onChange={(e) => updateColor("tagline", e.target.value)}
                    placeholder="e.g. Where every sport connects."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#d4af37]"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">Short phrase shown on login page and hero section.</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => saveTheme(theme)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#f4d35e] to-[#b8860b] text-[#0a1128] text-sm font-semibold hover:shadow-lg hover:shadow-[#d4af37]/30"
                >
                  <Save className="h-4 w-4" /> Save Text
                </button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar — info */}
        <div className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#f4d35e]" />
              <h3 className="text-sm font-semibold text-white">Where it applies</h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              {[
                "Admin panel sidebar (top-left)",
                "Admin login page",
                "Browser title bar",
                "All admin pages (via CSS variables)",
                "Website navbar & footer (when integrated)",
                "Email templates (future)",
              ].map((loc, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  {loc}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Tips</h3>
            <div className="space-y-2 text-xs text-gray-400">
              <p>• Upload logo first — transparent PNG/SVG works best on all backgrounds</p>
              <p>• Pick a primary color that contrasts with background</p>
              <p>• Test colors on dark AND light backgrounds</p>
              <p>• Save after each section — changes apply instantly</p>
              <p>• Use color picker for precision, or paste hex codes</p>
            </div>
          </Card>

          {/* Live theme preview */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Theme Preview</h3>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <div className="p-4" style={{ background: `linear-gradient(135deg, ${theme.backgroundColor}, ${theme.backgroundLight})` }}>
                {theme.logoUrl ? (
                  <img src={theme.logoUrl} alt="Logo" className="h-8 mb-2 object-contain" />
                ) : (
                  <div className="text-sm font-bold mb-2" style={{ color: theme.textColor }}>{theme.siteName}</div>
                )}
                <div className="text-xs mb-3" style={{ color: theme.textMuted }}>{theme.tagline}</div>
                <button
                  className="px-3 py-1.5 rounded text-xs font-semibold"
                  style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryDark})`, color: theme.backgroundColor }}
                >
                  Sample Button
                </button>
              </div>
              <div className="p-3 flex gap-2" style={{ backgroundColor: theme.surfaceColor }}>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.primaryColor + "30", color: theme.primaryLight }}>Badge</span>
                <span className="text-[10px]" style={{ color: theme.textMuted }}>Text</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
