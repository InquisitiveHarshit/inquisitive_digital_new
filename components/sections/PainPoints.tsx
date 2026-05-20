"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Smartphone, SearchX, Frown, ShieldAlert, Check } from "lucide-react";

export const PainPoints: React.FC = () => {
  const painPoints = [
    {
      id: 1,
      icon: Clock,
      title: "Website Loads Too Slowly",
      desc: "53% of visitors leave if a page takes more than 3 seconds to load. A slow site kills conversions and tanks your Google ranking.",
      solve: "We optimize for sub-3s load times",
    },
    {
      id: 2,
      icon: Smartphone,
      title: "Looks Broken on Mobile",
      desc: "Over 65% of web traffic is mobile. If your site isn't mobile-first, you're losing more than half your potential customers.",
      solve: "We build mobile-first, always",
    },
    {
      id: 3,
      icon: SearchX,
      title: "Nowhere to Be Found on Google",
      desc: "A beautiful website that no one finds is useless. Most cheap builders produce code that Google struggles to read and rank.",
      solve: "Every site is built SEO-ready",
    },
    {
      id: 4,
      icon: Frown,
      title: "Visitors Don't Convert to Leads",
      desc: "People visit your site but don't call, message, or buy. Poor UX, missing CTAs, and confusing layouts are invisible sales killers.",
      solve: "CRO-focused design on every page",
    },
    {
      id: 5,
      icon: ShieldAlert,
      title: "Security Vulnerabilities",
      desc: "Outdated plugins, weak hosting, and no SSL certificate put your business and your customers' data at risk every single day.",
      solve: "SSL + security hardening included",
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30 relative" id="pain-points">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-8">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              IS YOUR WEBSITE <br className="hidden sm:block" />
              <span className="text-brand-accent">COSTING YOU BUSINESS?</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Most businesses lose customers because of these common website problems — here's how we fix them with uncompromising precision.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className="border border-outline-variant/30 p-8 flex flex-col justify-start rounded-sm group bg-gradient-to-br from-[#201f1f]/40 to-[#1c1b1b]/10 backdrop-blur-md transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(245, 194, 0, 0.8)",
                }}
              >
                {/* Icon */}
                <div className="text-brand-accent mb-6">
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>

                {/* Title */}
                <h4 className="font-display text-xl font-bold text-on-surface uppercase mb-3 tracking-tight">
                  {item.title}
                </h4>

                {/* Desc */}
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>

                {/* Solve Tag */}
                <div className="inline-flex items-center gap-2 font-display text-[11px] font-bold tracking-widest uppercase text-black bg-brand-accent px-4 py-2 self-start rounded-sm">
                  <Check className="w-3.5 h-3.5" />
                  {item.solve}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
