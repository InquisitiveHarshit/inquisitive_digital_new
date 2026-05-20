"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProcessItem {
  id: string;
  title: string;
  description: string;
  delay: number;
}

export const Process: React.FC = () => {
  const steps: ProcessItem[] = [
    {
      id: "01",
      title: "Audit & Strategy",
      description: "Deep-dive analysis of your current digital footprint and development of a custom, data-backed growth roadmap.",
      delay: 0.1,
    },
    {
      id: "02",
      title: "Relentless Execution",
      description: "Deploying high-impact campaigns across targeted channels with uncompromising attention to detail.",
      delay: 0.2,
    },
    {
      id: "03",
      title: "Scale & Optimize",
      description: "Continuous monitoring, A/B testing, and refining to maximize ROI and scale what works.",
      delay: 0.3,
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30" id="process">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-8">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              OUR PROCESS.
            </motion.h2>
          </div>
        </div>

        {/* 3-Column Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="border-t-[3px] border-brand-accent pt-8 group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
            >
              <div className="text-brand-accent font-display text-[48px] font-extrabold opacity-50 mb-4 group-hover:opacity-100 transition-opacity duration-300">
                {step.id}
              </div>
              <h3 className="font-display text-2xl font-bold text-on-surface uppercase mb-4 tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-body text-base text-on-surface-variant group-hover:text-on-surface transition-colors duration-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
