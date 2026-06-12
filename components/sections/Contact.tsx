"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "@/components/ThemeProvider";

export const Contact: React.FC = () => {
  const pathname = usePathname();
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

  const isLight = themeMode === "singular-light";

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

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit audit request");
      }

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (pathname === "/about-us" || pathname === "/careers" || pathname === "/contact-us") {
    return null;
  }

  // Per-field class helpers
  const inputClass = (field: string) =>
    `w-full bg-transparent border-b py-3 focus:outline-none transition-all duration-300 peer ${
      activeField === field
        ? "border-brand-accent"
        : isLight
        ? "border-slate-300 hover:border-brand-accent/50"
        : "border-outline-variant/40 hover:border-brand-accent/50"
    } ${isLight ? "text-slate-900 placeholder-shown:border-slate-300" : "text-on-surface placeholder-shown:border-outline-variant/40"}`;

  const labelClass = isLight
    ? "absolute left-0 top-3 text-slate-500 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent"
    : "absolute left-0 top-3 text-on-surface-variant uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent";

  return (
    <section
      className={`w-full py-section-gap px-6 md:px-margin-desktop relative overflow-hidden ${
        isLight ? "bg-[#fafafa]" : "bg-surface-container-low/30"
      }`}
      id="contact"
    >
      {/* Ambient glow dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 left-1/4 w-80 h-80 rounded-full"
          style={{
            background: isLight
              ? "radial-gradient(circle, rgba(245,194,0,0.10) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(245,194,0,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: isLight
              ? "radial-gradient(circle, rgba(245,194,0,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(245,194,0,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight mb-6 ${
              isLight ? "text-slate-900" : "text-on-surface"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CLAIM YOUR <span className="text-brand-accent">FREE AUDIT.</span>
          </motion.h2>
          <motion.p
            className={`font-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
              isLight ? "text-slate-600" : "text-on-surface-variant"
            }`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Enter your business details below. We'll run a manual, comprehensive
            growth audit and send you the custom roadmap in 48 hours. No
            commitments.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          className={`relative border p-8 sm:p-12 rounded-2xl overflow-hidden transition-all duration-300 ${
            isLight
              ? "bg-white border-slate-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
              : "border-brand-accent/20 bg-gradient-to-br from-[#1c1b1b]/90 to-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative top sheen */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: isLight
                ? "linear-gradient(90deg, transparent, rgba(245,194,0,0.7) 40%, rgba(255,220,50,1) 60%, rgba(245,194,0,0.7) 80%, transparent)"
                : "linear-gradient(90deg, transparent, rgba(245,194,0,0.5) 50%, transparent)",
            }}
          />
          {/* Corner glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full"
            style={{
              background: isLight
                ? "radial-gradient(circle, rgba(245,194,0,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(245,194,0,0.12) 0%, transparent 70%)",
            }}
          />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                className="space-y-8 relative z-10"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="relative group">
                    <motion.div
                      animate={activeField === "name" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
                    />
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      placeholder=" "
                      className={inputClass("name")}
                    />
                    <label htmlFor="contact-name" className={labelClass}>
                      Your Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <motion.div
                      animate={activeField === "email" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
                    />
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      placeholder=" "
                      className={inputClass("email")}
                    />
                    <label htmlFor="contact-email" className={labelClass}>
                      Business Email
                    </label>
                  </div>
                </div>

                {/* Website Input */}
                <div className="relative group">
                  <motion.div
                    animate={activeField === "website" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
                  />
                  <input
                    type="url"
                    id="contact-website"
                    name="website"
                    required
                    value={formData.website}
                    onChange={handleChange}
                    onFocus={() => setActiveField("website")}
                    onBlur={() => setActiveField(null)}
                    placeholder=" "
                    className={inputClass("website")}
                  />
                  <label htmlFor="contact-website" className={labelClass}>
                    Website URL (e.g. www.brand.com)
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <motion.div
                    animate={activeField === "message" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
                  />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    placeholder=" "
                    className={`${inputClass("message")} resize-none`}
                  />
                  <label htmlFor="contact-message" className={labelClass}>
                    Growth Bottleneck / Primary Goal
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-6 flex justify-center">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="w-full sm:w-auto px-12 py-5 shadow-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Analyzing...
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
                className="flex flex-col items-center justify-center py-12 text-center relative z-10"
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
                  <CheckCircle2 className="w-16 h-16 text-brand-accent mb-6" />
                </motion.div>
                <h3 className={`font-display text-2xl font-bold uppercase tracking-tight mb-4 ${isLight ? "text-slate-900" : "text-on-surface"}`}>
                  Request Received.
                </h3>
                <p className={`font-body text-base max-w-md ${isLight ? "text-slate-600" : "text-on-surface-variant"}`}>
                  Thank you! Our growth engineers are already reviewing your
                  website. We'll email your custom strategy document within 48
                  hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
