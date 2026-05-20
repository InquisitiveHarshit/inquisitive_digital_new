"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

interface StatItem {
  id: number;
  value: string;
  label: string;
  delay: number;
}

export const Metrics: React.FC = () => {
  const stats: StatItem[] = [
    { id: 1, value: "500+", label: "Happy Clients", delay: 0.1 },
    { id: 2, value: "8+", label: "Years in Business", delay: 0.2 },
    { id: 3, value: "1000+", label: "Projects Completed", delay: 0.3 },
    { id: 4, value: "$2M+", label: "Ad Spend Managed", delay: 0.4 },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop border-y border-outline-variant/30 bg-background relative overflow-hidden" id="about">
      {/* Subtle background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          
          {/* Headline & Paragraph Column */}
          <div className="md:col-span-5 mb-16 md:mb-0 pr-0 md:pr-10">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ABOUT <br />
              <span className="text-brand-accent">THE AGENCY</span>
            </motion.h2>
            <motion.p
              className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We are a results-driven digital marketing agency focused on helping businesses grow online through strategic planning, creativity, and performance tracking. Our team blends innovation with proven marketing techniques to deliver consistent and scalable growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button href="#contact" variant="outline" className="px-6 py-3 text-sm">
                Read More About Us →
              </Button>
            </motion.div>
          </div>

          {/* Stats Grid Column */}
          <div className="md:col-span-7 grid grid-cols-2 gap-x-8 gap-y-12">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                className="border-l-[3px] border-outline-variant/30 pl-8 transition-colors duration-500 hover:border-brand-accent group py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
              >
                <motion.div
                  className="font-display text-5xl sm:text-[64px] font-extrabold text-brand-accent leading-none mb-4 tracking-tighter"
                  whileHover={{ scale: 1.03, x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-display text-xs text-on-surface uppercase tracking-widest group-hover:text-brand-accent transition-colors duration-300 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
