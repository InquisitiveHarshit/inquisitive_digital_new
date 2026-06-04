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
    <section className="w-full md:min-h-[80vh] flex items-center py-12 md:py-8 px-6 md:px-margin-desktop border-y border-outline-variant/30 bg-background relative overflow-hidden" id="about">
      {/* Subtle background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">

          {/* Headline & Paragraph Column */}
          <div className="md:col-span-7 mb-12 md:mb-0 pr-0 md:pr-10">
            <motion.h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface uppercase leading-tight tracking-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ABOUT <br />
              <span className="text-brand-accent">THE AGENCY</span>
            </motion.h2>
            <motion.p
              className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              At Inquisitive Digital, we help businesses grow through strategic digital marketing solutions that increase visibility, generate qualified leads, and drive measurable revenue growth. Our team combines data, creativity, and technology to create marketing strategies that deliver real business results.
              From SEO and Performance Marketing to Social Media Management and Content Strategy, we focus on helping brands connect with the right audience at the right time. Every campaign is built around your business goals, backed by data-driven insights, and optimized for long-term success.
              We believe great marketing isn't about vanity metrics—it's about creating meaningful growth. That's why we prioritize transparency, measurable outcomes, and strategies that turn traffic into customers and customers into loyal advocates.
              Your growth is our focus. Your success is our benchmark
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
          <div className="md:col-span-5 grid grid-cols-2 gap-x-8 gap-y-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                className="border-l-[3px] border-outline-variant/30 pl-6 transition-colors duration-500 hover:border-brand-accent group py-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay }}
              >
                <motion.div
                  className="font-display text-4xl sm:text-[48px] font-extrabold text-brand-accent leading-none mb-2 tracking-tighter"
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
