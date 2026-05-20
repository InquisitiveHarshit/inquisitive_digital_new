"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CaseStudy {
  id: number;
  client: string;
  category: string;
  title: string;
  stat: string;
  statLabel: string;
  desc: string;
  delay: number;
}

export const CaseStudies: React.FC = () => {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      client: "AEROFLOW GLOBAL",
      category: "B2B SaaS / SEO & SEM",
      title: "Engineering a 300% Pipeline Growth from High-Intent Organic Traffic",
      stat: "+312%",
      statLabel: "Organic Pipeline Value",
      desc: "We completely restructured Aeroflow's technical SEO architecture and deployed highly focused SEM campaigns capturing bottom-of-funnel decision makers.",
      delay: 0.1,
    },
    {
      id: 2,
      client: "VEXA HEALTH",
      category: "E-Commerce / Performance Marketing",
      title: "Scaling Direct-to-Consumer Sales with High-Efficiency Paid Ad Strategies",
      stat: "8.4x",
      statLabel: "Blended Ad ROAS",
      desc: "By designing custom high-converting landing pages and leveraging predictive custom audiences, we scaled monthly spend while dropping customer acquisition costs by 40%.",
      delay: 0.2,
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-background" id="work">
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
              CASE STUDIES.
            </motion.h2>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              className="border border-outline-variant/30 p-10 rounded-sm flex flex-col justify-between group bg-gradient-to-br from-[#201f1f]/30 to-[#1c1b1b]/10 hover:border-brand-accent transition-colors duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: study.delay }}
            >
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8 border-b border-outline-variant/20 pb-4">
                  <span className="font-display text-xs text-brand-accent uppercase tracking-widest font-bold">
                    {study.client}
                  </span>
                  <span className="font-body text-xs text-on-surface-variant whitespace-nowrap">
                    {study.category}
                  </span>
                </div>

                {/* Big Stat Highlight */}
                <div className="flex items-baseline gap-4 mb-6">
                  <div className="font-display text-5xl sm:text-6xl font-extrabold text-on-surface tracking-tighter">
                    {study.stat}
                  </div>
                  <div className="font-display text-xs text-on-surface-variant uppercase tracking-widest font-medium">
                    {study.statLabel}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold text-on-surface uppercase mb-4 leading-tight tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                  {study.title}
                </h3>

                {/* Desc */}
                <p className="font-body text-base text-on-surface-variant group-hover:text-on-surface transition-colors duration-300 leading-relaxed mb-8">
                  {study.desc}
                </p>
              </div>

              {/* Link Indicator */}
              <div className="flex items-center gap-2 font-display text-xs text-on-surface uppercase tracking-widest font-bold group-hover:text-brand-accent transition-colors duration-300 cursor-pointer pt-4">
                Read Case Study <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
