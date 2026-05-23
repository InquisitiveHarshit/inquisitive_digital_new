"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactUsPage() {
  const [themeMode, setThemeMode] = useState<"brutalist" | "singular-light" | "singular-dark">("singular-light");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.body.classList.contains("singular-theme")) {
        setThemeMode("singular-light");
      } else if (document.body.classList.contains("singular-dark-theme")) {
        setThemeMode("singular-dark");
      }

      const handleThemeChange = (e: any) => {
        setThemeMode(e.detail);
      };

      window.addEventListener("theme-change" as any, handleThemeChange);
      return () => {
        window.removeEventListener("theme-change" as any, handleThemeChange);
      };
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <>
      <Header />
      <main className={`flex-grow w-full pt-28 pb-24 transition-colors duration-500 overflow-hidden ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"}`}>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 mt-16 ${isLight ? "text-slate-900" : "text-white"}`}
          >
            CONTACT <span className="text-brand-accent">US</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-16 ${isLight ? "text-slate-600" : "text-slate-400"}`}
          >
            Get in touch with our team to start scaling your brand today. You can email us at <a href="mailto:hello@inquisitivedigital.com" className="text-brand-accent font-bold hover:underline">hello@inquisitivedigital.com</a> or use the form below.
          </motion.p>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <motion.div
            className={`border p-8 sm:p-12 rounded-sm relative transition-colors duration-300 ${isLight ? "bg-slate-50 border-slate-200" : "bg-surface-container-low/30 border-outline-variant/30"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <div className="relative group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-brand-accent transition-colors peer ${isLight ? "text-slate-900 border-slate-300 placeholder-shown:border-slate-300" : "text-on-surface border-outline-variant/40 placeholder-shown:border-outline-variant/40"}`}
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${isLight ? "text-slate-500" : "text-on-surface-variant"}`}
                      >
                        Full Name
                      </label>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-brand-accent transition-colors peer ${isLight ? "text-slate-900 border-slate-300 placeholder-shown:border-slate-300" : "text-on-surface border-outline-variant/40 placeholder-shown:border-outline-variant/40"}`}
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${isLight ? "text-slate-500" : "text-on-surface-variant"}`}
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder=" "
                      className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-brand-accent transition-colors peer ${isLight ? "text-slate-900 border-slate-300 placeholder-shown:border-slate-300" : "text-on-surface border-outline-variant/40 placeholder-shown:border-outline-variant/40"}`}
                    />
                    <label
                      htmlFor="subject"
                      className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${isLight ? "text-slate-500" : "text-on-surface-variant"}`}
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-brand-accent transition-colors peer resize-none ${isLight ? "text-slate-900 border-slate-300 placeholder-shown:border-slate-300" : "text-on-surface border-outline-variant/40 placeholder-shown:border-outline-variant/40"}`}
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-0 top-3 uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent ${isLight ? "text-slate-500" : "text-on-surface-variant"}`}
                    >
                      Your Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-center">
                    <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full sm:w-auto px-12 py-4 shadow-xl">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-brand-accent mb-6" />
                  <h3 className={`font-display text-2xl font-bold uppercase tracking-tight mb-4 ${isLight ? "text-slate-900" : "text-on-surface"}`}>
                    Message Sent!
                  </h3>
                  <p className={`font-body text-base max-w-md ${isLight ? "text-slate-600" : "text-on-surface-variant"}`}>
                    Thanks for reaching out! We've received your message and will get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
