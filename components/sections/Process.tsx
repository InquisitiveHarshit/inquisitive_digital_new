"use client";

import React from "react";
import { motion } from "framer-motion";

export const Process: React.FC = () => {
  const steps = [
    {
      title: "PREPARE",
      subtitle: "DISCOVER | MODEL",
      desc: "Understand the business and its revenue funnel."
    },
    {
      title: "ACT",
      subtitle: "PLAN | EXECUTE",
      desc: "Identify opportunities and attack leverage points within that funnel."
    },
    {
      title: "CALIBRATE",
      subtitle: "MEASURE | ADAPT",
      desc: "Make necessary course corrections to further align actions with the desired results."
    },
    {
      title: "EVOLVE",
      subtitle: "ITERATE | OPTIMIZE",
      desc: "Constantly measure, adapt, and improve results at each identified lever in the funnel."
    }
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30" id="process">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-8">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              OUR PROCESS.
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The PACE Approach
            </motion.p>
          </div>
        </div>

        {/* PACE Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center bg-surface-container-low p-6 rounded-2xl border border-outline-variant hover:bg-surface-container-high transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4 transition-colors duration-300 bg-background border border-outline-variant shadow-sm ${idx === 0 || idx === 3 ? 'text-brand-accent bg-brand-accent/5' : 'text-on-surface-variant'}`}>
                  0{idx + 1}
                </div>
                <h3 className="font-display text-base font-bold text-on-surface tracking-wide mb-1">{step.title}</h3>
                <div className="text-[9px] font-display font-extrabold uppercase tracking-wider text-brand-accent mb-3">
                  {step.subtitle}
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-90">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
