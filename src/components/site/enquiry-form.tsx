"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/submit-enquiry";

export const ENQUIRY_USER_TYPES = [
  "Team",
  "Athlete",
  "Academy",
  "Brand",
  "Corporate",
  "Event",
  "General",
] as const;

type EnquiryFormProps = {
  defaultType?: string;
  subject?: string;
  messagePlaceholder?: string;
  className?: string;
};

export function EnquiryForm({
  defaultType = "General",
  subject,
  messagePlaceholder = "Tell us what you need — team setup, registrations, partnerships, or events.",
  className = "",
}: EnquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: defaultType,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitEnquiry({ ...form, subject });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`py-10 text-center ${className}`}>
        <div className="h-14 w-14 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <Send className="h-7 w-7 text-emerald-300" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Enquiry received</h3>
        <p className="text-sm text-muted-foreground">
          Thanks, {form.name || "there"}. Our team will connect with you by email shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", type: defaultType, message: "" });
          }}
          className="mt-5 btn-outline-gold rounded-full px-5 py-2 text-xs font-medium"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="enquiry-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="enquiry-input"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="enquiry-input"
            placeholder="+91 98765 43210"
          />
        </Field>
        <Field label="I am a...">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="enquiry-input"
          >
            {ENQUIRY_USER_TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#0d1b3d]">
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Message" required>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          className="enquiry-input resize-none"
          placeholder={messagePlaceholder}
        />
      </Field>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Enquiry
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-foreground/80 mb-1.5">
        {label} {required && <span className="text-[#f4d35e]">*</span>}
      </span>
      {children}
    </label>
  );
}
