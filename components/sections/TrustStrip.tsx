"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const items = [
    { icon: Star, text: "4.8/5 Google Rating" },
    { icon: ShieldCheck, text: "Verified by Clutch & DesignRush" },
    { icon: CheckCircle2, text: "Trusted Growth Partner for Startups & Enterprises" }
  ];

  return (
    <section className="w-full bg-[#1c1b1b] py-8 px-6 md:px-margin-desktop border-b border-outline-variant/30 overflow-hidden relative">
      <div className="max-w-container-max mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Label */}
        <div className="flex-shrink-0">
          <p className="font-display text-sm font-bold text-on-surface-variant tracking-wider uppercase">
            Trusted by <span className="text-brand-accent">500+ businesses</span> across India & globally
          </p>
        </div>

        {/* Strips */}
        <div className="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                className="flex items-center gap-3 bg-background border border-outline-variant/20 px-5 py-3 rounded-sm shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Icon className="w-4 h-4 text-brand-accent shrink-0" />
                <span className="font-body text-xs font-semibold text-on-surface tracking-wide uppercase">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
