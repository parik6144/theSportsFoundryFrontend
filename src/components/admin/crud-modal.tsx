"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Trash2, AlertTriangle, Info, HelpCircle, Lightbulb } from "lucide-react";

export interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "email" | "toggle" | "color" | "date";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  description?: string;       // small helper text below the field
  hint?: string;              // example / format hint
  tooltip?: string;           // info icon with tooltip
  section?: string;           // group fields into sections
  defaultValue?: any;
}

export interface FormSection {
  title?: string;             // optional section title above form
  description?: string;       // intro paragraph shown at top of form
  tip?: string;               // highlighted tip box
}

interface CRUDModalProps {
  open: boolean;
  mode: "create" | "edit" | "delete";
  title: string;
  fields?: Field[];
  initialData?: Record<string, any>;
  formMeta?: FormSection;
  onSave: (data: Record<string, any>) => void;
  onClose: () => void;
}

export function CRUDModal({ open, mode, title, fields = [], initialData = {}, formMeta, onSave, onClose }: CRUDModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Reset form when initialData changes
  useState(() => {
    setFormData(initialData);
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const updateField = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  if (!open) return null;

  // Group fields by section
  const sections: Record<string, Field[]> = {};
  fields.forEach((field) => {
    const sectionName = field.section || "General";
    if (!sections[sectionName]) sections[sectionName] = [];
    sections[sectionName].push(field);
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0d1b3d] border border-white/10 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {mode === "delete" && <AlertTriangle className="h-5 w-5 text-red-400" />}
                {title}
              </h2>
              {formMeta?.description && mode !== "delete" && (
                <p className="text-xs text-gray-400 mt-1 max-w-xl">{formMeta.description}</p>
              )}
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {mode === "delete" ? (
              <div className="text-center py-6">
                <div className="h-16 w-16 mx-auto rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mb-4">
                  <Trash2 className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-white font-medium mb-1">Are you sure?</p>
                <p className="text-sm text-gray-400">This action cannot be undone. The record will be permanently deleted from the database.</p>
              </div>
            ) : (
              <>
                {/* Tip box */}
                {formMeta?.tip && (
                  <div className="mb-5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 p-3 flex items-start gap-2.5">
                    <Lightbulb className="h-4 w-4 text-[#f4d35e] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-[#f4d35e] mb-0.5">Pro Tip</div>
                      <p className="text-xs text-gray-300 leading-relaxed">{formMeta.tip}</p>
                    </div>
                  </div>
                )}

                {/* Sections */}
                {Object.entries(sections).map(([sectionName, sectionFields]) => (
                  <div key={sectionName} className="mb-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#f4d35e] mb-3 pb-2 border-b border-white/5">
                      {sectionName}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sectionFields.map((field) => (
                        <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-300 mb-1.5">
                            {field.label}
                            {field.required && <span className="text-[#f4d35e]">*</span>}
                            {field.tooltip && (
                              <div className="relative">
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveTooltip(field.key)}
                                  onMouseLeave={() => setActiveTooltip(null)}
                                  onClick={() => setActiveTooltip(activeTooltip === field.key ? null : field.key)}
                                  className="text-gray-500 hover:text-[#f4d35e]"
                                >
                                  <HelpCircle className="h-3.5 w-3.5" />
                                </button>
                                {activeTooltip === field.key && (
                                  <div className="absolute z-10 top-6 left-0 w-64 rounded-lg bg-[#0a1128] border border-white/10 p-2.5 text-[11px] text-gray-300 shadow-xl">
                                    {field.tooltip}
                                  </div>
                                )}
                              </div>
                            )}
                          </label>

                          {field.type === "text" || field.type === "email" || field.type === "number" || field.type === "date" ? (
                            <input
                              type={field.type}
                              required={field.required}
                              placeholder={field.placeholder}
                              value={formData[field.key] ?? field.defaultValue ?? ""}
                              onChange={(e) => updateField(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30"
                            />
                          ) : field.type === "textarea" ? (
                            <textarea
                              required={field.required}
                              placeholder={field.placeholder}
                              rows={3}
                              value={formData[field.key] ?? field.defaultValue ?? ""}
                              onChange={(e) => updateField(field.key, e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 resize-none"
                            />
                          ) : field.type === "select" ? (
                            <select
                              required={field.required}
                              value={formData[field.key] ?? field.defaultValue ?? ""}
                              onChange={(e) => updateField(field.key, e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30"
                            >
                              <option value="" className="bg-[#0d1b3d]">— Select {field.label} —</option>
                              {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-[#0d1b3d]">{opt.label}</option>
                              ))}
                            </select>
                          ) : field.type === "color" ? (
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={formData[field.key] ?? field.defaultValue ?? "#d4af37"}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                className="h-10 w-16 rounded bg-transparent border border-white/10"
                              />
                              <input
                                type="text"
                                value={formData[field.key] ?? field.defaultValue ?? ""}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#d4af37]"
                              />
                            </div>
                          ) : field.type === "toggle" ? (
                            <label className="flex items-center gap-2.5 mt-1 cursor-pointer">
                              <button
                                type="button"
                                onClick={() => updateField(field.key, !(formData[field.key] ?? field.defaultValue ?? false))}
                                className={`relative h-6 w-11 rounded-full transition-colors ${(formData[field.key] ?? field.defaultValue ?? false) ? "bg-[#d4af37]" : "bg-white/10"}`}
                              >
                                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${(formData[field.key] ?? field.defaultValue ?? false) ? "translate-x-5" : ""}`} />
                              </button>
                              <span className="text-sm text-gray-300">
                                {(formData[field.key] ?? field.defaultValue ?? false) ? "Enabled" : "Disabled"}
                              </span>
                            </label>
                          ) : null}

                          {/* Field description */}
                          {field.description && (
                            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed flex items-start gap-1">
                              <Info className="h-3 w-3 mt-0.5 shrink-0 text-gray-600" />
                              {field.description}
                            </p>
                          )}
                          {/* Hint */}
                          {field.hint && !field.description && (
                            <p className="text-[11px] text-gray-600 mt-1 italic">
                              Example: {field.hint}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 p-5 border-t border-white/10 shrink-0 bg-[#0a1128]/50">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5"
            >
              Cancel
            </button>
            {mode === "delete" ? (
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
              >
                <Trash2 className="h-4 w-4" /> Delete Permanently
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#f4d35e] to-[#b8860b] text-[#0a1128] text-sm font-semibold hover:shadow-lg hover:shadow-[#d4af37]/30"
              >
                <Save className="h-4 w-4" /> {mode === "create" ? "Create & Save" : "Save Changes"}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export type { FormSection };
