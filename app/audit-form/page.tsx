"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/ThemeProvider";

export default function AuditFormPage() {
  const { themeMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Detect if ANY field has a value (form is being filled)
  const isFormActive =
    Object.values(formData).some((v) => v.length > 0) || activeField !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("website", formData.website);
      payload.append("message", formData.message);

      const res = await fetch("/api/audit", {
        method: "POST",
        body: payload,
      });
      if (!res.ok) throw new Error("Failed to submit audit request");
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", website: "", message: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />
      <main
        className={`relative flex-grow w-full pt-28 pb-32 overflow-hidden transition-colors duration-500 ${
          isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0a0909]"
        }`}
      >
        {/* ── Ambient Background Gradient Blobs ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-left gold glow */}
          <motion.div
            className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full"
            style={{
              background: isLight
                ? "radial-gradient(circle, rgba(245,194,0,0.12) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(245,194,0,0.10) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Center-right warm pink glow */}
          <motion.div
            className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full"
            style={{
              background: isLight
                ? "radial-gradient(circle, rgba(255,100,50,0.06) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,80,60,0.08) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          {/* Bottom-center accent glow */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
            style={{
              background: isLight
                ? "radial-gradient(ellipse, rgba(245,194,0,0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse, rgba(245,194,0,0.07) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
          {/* Subtle grid lines overlay */}
          {!isLight && (
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(245,194,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,194,0,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          )}
        </div>

        {/* ── Hero Text ── */}
        <div className="relative max-w-container-max mx-auto px-6 md:px-margin-desktop text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-body font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Free Digital Growth Audit
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            CLAIM YOUR{" "}
            <span className="text-brand-accent relative">
              FREE AUDIT
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] bg-brand-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-16 ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Enter your business details below. We'll run a manual, comprehensive growth audit and send you the custom roadmap in 48 hours. No commitments.
          </motion.p>
        </div>

        {/* ── Contact Form ── */}
        <div className="relative max-w-3xl mx-auto px-6 z-10">
          <motion.div
            animate={
              isFormActive
                ? {
                    scale: 1.015,
                    boxShadow: isLight
                      ? "0 0 60px rgba(245,194,0,0.18), 0 20px 60px rgba(0,0,0,0.12)"
                      : "0 0 80px rgba(245,194,0,0.22), 0 20px 60px rgba(0,0,0,0.6)",
                  }
                : {
                    scale: 1,
                    boxShadow: isLight
                      ? "0 8px 30px rgba(0,0,0,0.08)"
                      : "0 8px 40px rgba(0,0,0,0.5)",
                  }
            }
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative rounded-2xl overflow-hidden border p-8 sm:p-12 transition-colors duration-300 ${
              isLight
                ? "bg-white border-slate-200"
                : "border-brand-accent/25 bg-[#121212]"
            }`}
          >
            {/* Shiny gradient overlay on form card */}
            {!isLight && (
              <>
                {/* Top sheen */}
                <div
                  className="pointer-events-none absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(245,194,0,0.6) 40%, rgba(255,255,255,0.3) 60%, rgba(245,194,0,0.6) 80%, transparent 100%)",
                  }}
                />
                {/* Corner glow */}
                <div
                  className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(245,194,0,0.5) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(245,194,0,0.4) 0%, transparent 70%)",
                  }}
                />
              </>
            )}
            {isLight && (
              <>
                <div
                  className="pointer-events-none absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(245,194,0,0.5) 50%, transparent 100%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(245,194,0,0.6) 0%, transparent 70%)",
                  }}
                />
              </>
            )}

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="audit-form"
                  onSubmit={handleSubmit}
                  className="relative space-y-8 z-10"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Name */}
                    <FormField
                      id="name"
                      label="Your Name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === "name"}
                      isLight={isLight}
                    />
                    {/* Email */}
                    <FormField
                      id="email"
                      label="Business Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === "email"}
                      isLight={isLight}
                    />
                  </div>

                  {/* Website */}
                  <FormField
                    id="website"
                    label="Website URL (e.g. www.brand.com)"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    onFocus={() => setActiveField("website")}
                    onBlur={() => setActiveField(null)}
                    isActive={activeField === "website"}
                    isLight={isLight}
                  />

                  {/* Message Textarea */}
                  <div className="relative group">
                    <motion.div
                      animate={
                        activeField === "message"
                          ? { scaleX: 1, opacity: 1 }
                          : { scaleX: 0, opacity: 0 }
                      }
                      style={{ originX: 0 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
                    />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      placeholder=" "
                      className={`w-full bg-transparent border-b py-3 focus:outline-none transition-all duration-300 peer resize-none ${
                        activeField === "message"
                          ? "border-brand-accent"
                          : isLight
                          ? "border-slate-300 hover:border-brand-accent/50"
                          : "border-outline-variant/40 hover:border-brand-accent/50"
                      } ${isLight ? "text-slate-900" : "text-on-surface"}`}
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${
                        isLight ? "text-slate-500" : "text-on-surface-variant"
                      }`}
                    >
                      Growth Bottleneck / Primary Goal
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-6 flex justify-center">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="primary"
                        className="w-full sm:w-auto px-14 py-4 shadow-xl"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-current"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Get Audit Now <Send className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  className="flex flex-col items-center justify-center py-16 text-center relative z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-brand-accent mb-6" />
                  </motion.div>
                  <h3 className={`font-display text-2xl font-bold uppercase tracking-tight mb-4 ${isLight ? "text-slate-900" : "text-on-surface"}`}>
                    Request Received.
                  </h3>
                  <p className={`font-body text-base max-w-md ${isLight ? "text-slate-600" : "text-on-surface-variant"}`}>
                    Thank you! Our growth engineers are already reviewing your website. We'll email your custom strategy document within 48 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <FloatingWhatsApp />
    </>
  );
}

// ─── Reusable animated form field ───────────────────────────────────────────
interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  isActive: boolean;
  isLight: boolean;
}

function FormField({ id, label, type, value, onChange, onFocus, onBlur, isActive, isLight }: FormFieldProps) {
  return (
    <div className="relative group">
      {/* animated underline gradient */}
      <motion.div
        animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
      />
      <input
        type={type}
        id={id}
        name={id}
        required
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=" "
        className={`w-full bg-transparent border-b py-3 focus:outline-none transition-all duration-300 peer ${
          isActive
            ? "border-brand-accent"
            : isLight
            ? "border-slate-300 hover:border-brand-accent/50"
            : "border-outline-variant/40 hover:border-brand-accent/50"
        } ${isLight ? "text-slate-900" : "text-on-surface"}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${
          isLight ? "text-slate-500" : "text-on-surface-variant"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
