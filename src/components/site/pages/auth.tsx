"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Mail, Lock, User, Sparkles, Trophy } from "lucide-react";
import { PageHeader } from "../ui-primitives";
import { USER_ROLES, AI_QUESTIONS } from "@/lib/site-data";
import { useNav } from "../nav-context";
type Step = "mode" | "form" | "ai" | "done";

export function AuthPage() {
  const { navigate } = useNav();
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<"login" | "register">("register");
  const [roleId, setRoleId] = useState<string>("athlete");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const role = USER_ROLES.find((r) => r.id === roleId)!;
  const questions = AI_QUESTIONS[roleId] || [];

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("ai");
  };

  const onFinishAI = () => setStep("done");
  const onSkipAI = () => setStep("done");

  return (
    <div>
      <PageHeader
        eyebrow={mode === "register" ? "Create Your Account" : "Welcome Back"}
        title={mode === "register" ? "Join the The Sports Foundry ecosystem." : "Login to your account."}
        subtitle="The platform is free to use for everyone — athletes, teams, academies, brands, corporates, and fans."
      />

      <section className="py-8 md:py-12 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <AnimatePresence mode="wait">
            {/* ============ STEP: MODE / ROLE PICK ============ */}
            {step === "mode" && (
              <motion.div
                key="mode"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mode toggle */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <button
                    onClick={() => setMode("register")}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      mode === "register" ? "btn-gold" : "glass text-foreground/70"
                    }`}
                  >
                    Register
                  </button>
                  <button
                    onClick={() => setMode("login")}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      mode === "login" ? "btn-gold" : "glass text-foreground/70"
                    }`}
                  >
                    Login
                  </button>
                </div>

                {mode === "register" ? (
                  <>
                    <h2 className="text-center text-lg font-semibold mb-1">I am joining as a...</h2>
                    <p className="text-center text-xs text-muted-foreground mb-8">Pick the role that fits you best — you can always change it later.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {USER_ROLES.map((r) => {
                        const Icon = r.icon;
                        const active = roleId === r.id;
                        return (
                          <button
                            key={r.id}
                            onClick={() => setRoleId(r.id)}
                            className={`p-5 rounded-2xl text-left transition-all border ${
                              active
                                ? "bg-[#d4af37]/15 border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
                                : "glass border-white/10 hover:border-[#d4af37]/40"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                                active ? "bg-gradient-to-br from-[#f4d35e] to-[#b8860b]" : "bg-[#d4af37]/15"
                              }`}>
                                <Icon className={`h-5 w-5 ${active ? "text-[#0a1128]" : "text-[#f4d35e]"}`} />
                              </div>
                              {active && <Check className="h-4 w-4 text-[#f4d35e]" />}
                            </div>
                            <div className="font-semibold text-sm mb-1">{r.label}</div>
                            <div className="text-[11px] text-muted-foreground">{r.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setStep("form")}
                      className="mt-8 w-full btn-gold rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                    >
                      Continue as {role.label}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  /* Login form */
                  <form onSubmit={(e) => { e.preventDefault(); navigate("home"); }} className="glossy-card p-6 md:p-8 space-y-4 max-w-md mx-auto">
                    <Field label="Email" required>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input required type="email" className="auth-input pl-10" placeholder="you@example.com" />
                      </div>
                    </Field>
                    <Field label="Password" required>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input required type="password" className="auth-input pl-10" placeholder="••••••••" />
                      </div>
                    </Field>
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="accent-[#d4af37]" />
                        Remember me
                      </label>
                      <button type="button" className="text-[#f4d35e] hover:underline">Forgot password?</button>
                    </div>
                    <button type="submit" className="w-full btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
                      Login
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="text-center text-xs text-muted-foreground pt-2">
                      New to The Sports Foundry?{" "}
                      <button type="button" onClick={() => setMode("register")} className="text-[#f4d35e] hover:underline">Create an account</button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {/* ============ STEP: REGISTRATION FORM ============ */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setStep("mode")} className="p-2 rounded-lg glass hover:bg-white/10">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <div className="text-xs text-[#f4d35e] uppercase tracking-wider">{role.label} Registration</div>
                    <div className="text-lg font-semibold">Step 2 of 3 · Your details</div>
                  </div>
                </div>

                <form onSubmit={onSubmitForm} className="glossy-card p-6 md:p-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full Name" required>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input required className="auth-input pl-10" placeholder="Your name" />
                      </div>
                    </Field>
                    <Field label="Email" required>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input required type="email" className="auth-input pl-10" placeholder="you@example.com" />
                      </div>
                    </Field>
                    <Field label="Password" required>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input required type="password" className="auth-input pl-10" placeholder="••••••••" />
                      </div>
                    </Field>
                  </div>

                  {/* Role-specific fields */}
                  {roleId === "athlete" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <Field label="Primary Sport" required>
                        <select required className="auth-input">
                          <option value="" className="bg-[#0d1b3d]">Select sport</option>
                          {["Cricket", "Football", "Badminton", "Basketball", "Athletics", "Tennis", "Hockey", "Volleyball"].map((s) => (
                            <option key={s} className="bg-[#0d1b3d]">{s}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Current Level">
                        <select className="auth-input">
                          <option value="" className="bg-[#0d1b3d]">Select level</option>
                          {["Amateur", "College", "Semi-Pro", "Professional", "National"].map((s) => (
                            <option key={s} className="bg-[#0d1b3d]">{s}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}
                  {roleId === "team" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <Field label="Team / Club Name" required><input required className="auth-input" placeholder="e.g. Bengal Tigers FC" /></Field>
                      <Field label="Sport" required>
                        <select required className="auth-input">
                          <option value="" className="bg-[#0d1b3d]">Select sport</option>
                          {["Cricket", "Football", "Badminton", "Basketball", "Hockey", "Volleyball"].map((s) => (
                            <option key={s} className="bg-[#0d1b3d]">{s}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}
                  {roleId === "academy" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <Field label="Academy Name" required><input required className="auth-input" placeholder="e.g. Apex Cricket Academy" /></Field>
                      <Field label="Primary Sport" required>
                        <select required className="auth-input">
                          <option value="" className="bg-[#0d1b3d]">Select sport</option>
                          {["Cricket", "Football", "Badminton", "Basketball", "Athletics", "Tennis"].map((s) => (
                            <option key={s} className="bg-[#0d1b3d]">{s}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}
                  {roleId === "brand" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <Field label="Company Name" required><input required className="auth-input" placeholder="e.g. Velocity Sports" /></Field>
                      <Field label="Industry" required><input required className="auth-input" placeholder="Apparel / Beverages / Media" /></Field>
                    </div>
                  )}
                  {roleId === "corporate" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <Field label="Company Name" required><input required className="auth-input" placeholder="e.g. Strive Wellness" /></Field>
                      <Field label="Employee Count">
                        <select className="auth-input">
                          <option value="" className="bg-[#0d1b3d]">Select range</option>
                          {["50-200", "200-1000", "1000-5000", "5000+"].map((s) => (
                            <option key={s} className="bg-[#0d1b3d]">{s}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}
                  {roleId === "fan" && (
                    <div className="pt-2 border-t border-white/10">
                      <Field label="Favourite Sports (optional)">
                        <input className="auth-input" placeholder="Cricket, Football, Badminton..." />
                      </Field>
                    </div>
                  )}

                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" required className="accent-[#d4af37] mt-1" />
                    <span className="text-xs text-muted-foreground">
                      I agree to The Sports Foundry's <button type="button" className="text-[#f4d35e] hover:underline">Terms of Use</button>, <button type="button" className="text-[#f4d35e] hover:underline">Privacy Policy</button>, and <button type="button" className="text-[#f4d35e] hover:underline">Cookie Policy</button>.
                    </span>
                  </div>

                  <button type="submit" className="w-full btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ============ STEP: AI QUESTIONNAIRE ============ */}
            {step === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setStep("form")} className="p-2 rounded-lg glass hover:bg-white/10">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <div className="text-xs text-[#f4d35e] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> Optional · AI Questionnaire
                    </div>
                    <div className="text-lg font-semibold">Step 3 of 3 · Help us personalise</div>
                  </div>
                </div>

                <div className="glossy-card p-6 md:p-8">
                  <div className="mb-5 p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-xs text-foreground/80 leading-relaxed">
                    <Sparkles className="h-4 w-4 text-[#f4d35e] inline mr-1.5" />
                    These questions adapt to your role and help us surface more relevant opportunities, matches, and content over time. Fully optional — <strong className="text-[#f4d35e]">skip anytime</strong>, no impact on your account.
                  </div>

                  <div className="space-y-6">
                    {questions.map((q, qi) => (
                      <div key={qi}>
                        <div className="text-sm font-medium mb-3">
                          Q{qi + 1}. {q.q}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) => {
                            const selected = answers[`${qi}`] === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAnswers({ ...answers, [`${qi}`]: opt })}
                                className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
                                  selected
                                    ? "bg-[#d4af37] text-[#0a1128] border-[#d4af37] font-medium"
                                    : "glass border-white/10 text-foreground/80 hover:border-[#d4af37]/40"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                      onClick={onFinishAI}
                      className="flex-1 btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
                    >
                      Save & Finish
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={onSkipAI}
                      className="flex-1 btn-outline-gold rounded-full px-6 py-3 text-sm font-semibold"
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============ STEP: DONE ============ */}
            {step === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="glossy-card p-8 md:p-12 text-center max-w-lg mx-auto"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-[#f4d35e] to-[#b8860b] flex items-center justify-center mb-5 shadow-2xl shadow-[#d4af37]/40"
                >
                  <Trophy className="h-10 w-10 text-[#0a1128]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gradient-gold mb-2">Welcome to The Sports Foundry!</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Your account is being set up. We've sent a verification link to your email — please verify within 24 hours to unlock all features.
                </p>
                <div className="glass rounded-xl p-4 mb-6 text-left text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Check className="h-3.5 w-3.5" /> Account created
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" /> Verification email sent
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" /> {Object.keys(answers).length > 0 ? "AI preferences saved" : "AI questionnaire skipped (editable anytime)"}
                  </div>
                </div>
                <button
                  onClick={() => navigate("home")}
                  className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
                >
                  Explore the Platform
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <style>{`
            .auth-input {
              width: 100%;
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 0.5rem;
              padding: 0.625rem 0.875rem 0.625rem 2.25rem;
              font-size: 0.875rem;
              color: var(--foreground);
            }
            .auth-input::placeholder { color: var(--muted-foreground); }
            .auth-input:focus { outline: none; border-color: #d4af37; }
            /* For selects without icon */
            select.auth-input { padding-left: 0.875rem; }
          `}</style>
        </div>
      </section>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-foreground/80 mb-1.5">
        {label} {required && <span className="text-[#f4d35e]">*</span>}
      </span>
      {children}
    </label>
  );
}
