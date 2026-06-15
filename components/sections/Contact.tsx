"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "@/components/ThemeProvider";

const SERVICES = [
  "Performance Marketing",
  "Search Engine Optimization",
  "Social Media Management",
  "Web Development",
  "Creative Services",
  "Content Marketing",
  "Other",
];

// ─── Reusable animated form field ────────────────────────────────────────────
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
        } ${isLight ? "text-slate-900 placeholder-shown:border-slate-300" : "text-on-surface placeholder-shown:border-outline-variant/40"}`}
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

export const Contact: React.FC = () => {
  const pathname = usePathname();
  const { themeMode } = useTheme();

  const isHome = pathname === "/";
  const isLight = themeMode === "singular-light";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "", // For Audit Form
    service: "", // For Contact Form
    subject: "", // For Contact Form
    message: "", // For both
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const isFormActive =
    Object.values(formData).some((v) => v.length > 0) || activeField !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isHome) {
        // Submit Audit Form
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
      } else {
        // Submit Contact Form
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            service: formData.service,
            subject: formData.subject,
            message: formData.message,
          }),
        });
        if (!res.ok) throw new Error("Failed to send message");
      }
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", website: "", service: "", subject: "", message: "" });
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

  if (pathname === "/about-us" || pathname === "/careers" || pathname === "/contact-us") {
    return null;
  }

  // --- Dynamic Content based on path ---
  const headerText = isHome ? (
    <>CLAIM YOUR <span className="text-brand-accent">FREE AUDIT.</span></>
  ) : (
    <>GET IN <span className="text-brand-accent">TOUCH.</span></>
  );

  const descriptionText = isHome
    ? "Enter your business details below. We'll run a manual, comprehensive growth audit and send you the custom roadmap in 48 hours. No commitments."
    : "Have a project in mind? Fill in your details and our team will get back to you within 24 hours. No commitments.";

  const btnText = isHome ? "Get Audit Now" : "Send Message";
  const successHeading = isHome ? "Request Received." : "Message Sent!";
  const successText = isHome
    ? "Thank you! Our growth engineers are already reviewing your website. We'll email your custom strategy document within 48 hours."
    : "Thanks for reaching out! We've received your message and will get back to you shortly.";

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

      <div className={`max-w-${isHome ? '4xl' : '3xl'} mx-auto relative z-10`}>
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
            {headerText}
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
            {descriptionText}
          </motion.p>
        </div>

        {/* Form Card */}
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
          {/* Top sheen */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: isLight
                ? "linear-gradient(90deg, transparent 0%, rgba(245,194,0,0.5) 50%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(245,194,0,0.6) 40%, rgba(255,255,255,0.3) 60%, rgba(245,194,0,0.6) 80%, transparent 100%)",
            }}
          />
          {/* Corner glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(245,194,0,0.5) 0%, transparent 70%)",
            }}
          />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                className="relative space-y-8 z-10"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FormField
                    id="name"
                    label={isHome ? "Your Name" : "Full Name"}
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    isActive={activeField === "name"}
                    isLight={isLight}
                  />
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

                {isHome ? (
                  // AUDIT FORM FIELDS
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
                ) : (
                  // CONTACT FORM FIELDS
                  <>
                    <div className="relative group">
                      <label
                        htmlFor="contact-service"
                        className="absolute left-0 -top-4 uppercase tracking-widest text-xs text-brand-accent pointer-events-none"
                      >
                        Interested Service
                      </label>
                      <motion.div
                        animate={
                          activeField === "service"
                            ? { scaleX: 1, opacity: 1 }
                            : { scaleX: 0, opacity: 0 }
                        }
                        style={{ originX: 0 }}
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-yellow-300 to-brand-accent rounded-full"
                      />
                      <select
                        id="contact-service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setActiveField("service")}
                        onBlur={() => setActiveField(null)}
                        className={`w-full bg-transparent border-b py-3 focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
                          activeField === "service"
                            ? "border-brand-accent"
                            : isLight
                            ? "border-slate-300 hover:border-brand-accent/50"
                            : "border-outline-variant/40 hover:border-brand-accent/50"
                        } ${isLight ? "text-slate-900" : "text-on-surface"}`}
                      >
                        <option value="" disabled className={isLight ? "text-slate-500 bg-white" : "text-slate-400 bg-[#1a1a1a]"}>
                          Select a Service
                        </option>
                        {SERVICES.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className={isLight ? "text-slate-900 bg-white" : "text-white bg-[#1a1a1a]"}
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <motion.svg
                          animate={{ rotate: activeField === "service" ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`w-4 h-4 ${isLight ? "text-slate-500" : "text-on-surface-variant"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                    </div>
                    
                    <FormField
                      id="subject"
                      label="Subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === "subject"}
                      isLight={isLight}
                    />
                  </>
                )}

                {/* Message / Primary Goal */}
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
                    id="contact-message"
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
                    htmlFor="contact-message"
                    className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${
                      isLight ? "text-slate-500" : "text-on-surface-variant"
                    }`}
                  >
                    {isHome ? "Growth Bottleneck / Primary Goal" : "Your Message"}
                  </label>
                </div>

                {/* Submit */}
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
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          {btnText} <Send className="w-4 h-4" />
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
                  {successHeading}
                </h3>
                <p className={`font-body text-base max-w-md ${isLight ? "text-slate-600" : "text-on-surface-variant"}`}>
                  {successText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
