"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does it take to build a website?",
      a: "A standard business website typically takes 3–4 weeks. An e-commerce store or custom web application may take 6–12 weeks depending on complexity. We share a detailed timeline at the start of every project."
    },
    {
      q: "How much does a website cost?",
      a: "Pricing depends on project scope — we provide a detailed itemized quote after our discovery phase, with completely transparent pricing and zero hidden charges."
    },
    {
      q: "Will I be able to update the website myself after launch?",
      a: "Yes, absolutely. We build most sites on a CMS (like Sanity, WordPress, or custom dashboard) that allows you to edit text, upload images, and manage content without touching code."
    },
    {
      q: "Do you help with domain and hosting setup too?",
      a: "Yes. We handle domain registration guidance, hosting setup, DNS configuration, SSL certificate, and full deployment. You don't need to deal with any technical setup yourself."
    },
    {
      q: "What if I need changes after the website is launched?",
      a: "We provide 30 days of free support after launch to fix any bugs or make minor adjustments. Beyond that, we offer affordable monthly maintenance packages and also work on a per-change basis."
    },
    {
      q: "Will my website rank on Google?",
      a: "Every website we build is technically SEO-ready — proper heading structure, meta tags, schema markup, and speed optimization. For competitive keyword ranking, we offer ongoing SEO strategies as a separate service."
    }
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30 relative" id="faq">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold text-on-surface uppercase tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FREQUENTLY ASKED <span className="text-brand-accent">QUESTIONS</span>
          </motion.h2>
          <motion.p
            className="font-body text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you want to know before partnering with us for your web development or growth project.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`border transition-colors duration-300 ${isOpen ? 'border-brand-accent/50 bg-surface-container-low/30' : 'border-outline-variant/30 bg-surface'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-display text-lg font-bold text-on-surface tracking-tight pr-8">
                    {faq.q}
                  </span>
                  <span className="text-on-surface-variant flex-shrink-0">
                    {isOpen ? <Minus className="w-5 h-5 text-brand-accent" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 font-body text-[15px] text-on-surface-variant leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
