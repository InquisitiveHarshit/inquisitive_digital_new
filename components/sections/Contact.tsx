"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

export const Contact: React.FC = () => {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('website', formData.website);
      payload.append('message', formData.message);

      const res = await fetch('/api/audit', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to submit audit request');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", website: "", message: "" });
    } catch (error) {
      console.error(error);
      // For simplicity we reuse the error banner (could add a separate error state)
      console.error(error);
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (pathname === '/about-us' || pathname === '/careers' || pathname === '/contact-us') {
    return null;
  }

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30 relative" id="contact">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            CLAIM YOUR <span className="text-brand-accent">FREE AUDIT.</span>
          </motion.h2>
          <motion.p
            className="font-body text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Enter your business details below. We'll run a manual, comprehensive growth audit and send you the custom roadmap in 48 hours. No commitments.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          className="border border-outline-variant/30 p-8 sm:p-12 rounded-sm bg-gradient-to-br from-[#201f1f]/50 to-[#1c1b1b]/20 backdrop-blur-md relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                      className="w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-surface focus:outline-none focus:border-brand-accent transition-colors peer placeholder-shown:border-outline-variant/40"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 text-on-surface-variant uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent"
                    >
                      Your Name
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
                      className="w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-surface focus:outline-none focus:border-brand-accent transition-colors peer placeholder-shown:border-outline-variant/40"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-3 text-on-surface-variant uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent"
                    >
                      Business Email
                    </label>
                  </div>
                </div>

                {/* Website Input */}
                <div className="relative group">
                  <input
                    type="url"
                    id="website"
                    name="website"
                    required
                    value={formData.website}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-surface focus:outline-none focus:border-brand-accent transition-colors peer placeholder-shown:border-outline-variant/40"
                  />
                  <label
                    htmlFor="website"
                    className="absolute left-0 top-3 text-on-surface-variant uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent"
                  >
                    Website URL (e.g. www.brand.com)
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
                    className="w-full bg-transparent border-b border-outline-variant/40 py-3 text-on-surface focus:outline-none focus:border-brand-accent transition-colors peer placeholder-shown:border-outline-variant/40 resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-3 text-on-surface-variant uppercase tracking-widest text-xs transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-brand-accent"
                  >
                    Growth Bottleneck / Primary Goal
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-center">
                  <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full sm:w-auto px-12 py-5">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Get Audit Now <Send className="w-4 h-4" />
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
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-on-surface mb-4">
                  Request Received.
                </h3>
                <p className="font-body text-base text-on-surface-variant max-w-md">
                  Thank you! Our growth engineers are already reviewing your website. We'll email your custom strategy document within 48 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
