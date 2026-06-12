"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, PhoneCall, Compass, Sliders, Zap } from "lucide-react";
import { Button } from "../ui/Button";

interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const BookingSteps: React.FC = () => {
  const steps: StepItem[] = [
    {
      id: "01",
      title: "Book an Appointment",
      description: "Schedule a quick strategy session via our booking form or calendar in less than 2 minutes.",
      icon: Calendar,
    },
    {
      id: "02",
      title: "We Connect with you",
      description: "We'll reach out to discuss your goals, review your acquisition channels, and map out bottlenecks.",
      icon: PhoneCall,
    },
    {
      id: "03",
      title: "Experts craft a personalized strategy",
      description: "Our senior growth engineering team designs a custom, data-backed roadmap built to hit your KPIs.",
      icon: Compass,
    },
    {
      id: "04",
      title: "We review and refine your strategy",
      description: "We walk you through the custom blueprint, gather feedback, and finalize the perfect execution plan.",
      icon: Sliders,
    },
    {
      id: "05",
      title: "Execution begins!",
      description: "We launch your high-converting funnels, deploy ad strategies, and begin scaling your bottom-line.",
      icon: Zap,
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-background border-b border-outline-variant/30 relative overflow-hidden" id="how-to-book">
      {/* Background glow orb */}
      <div className="absolute -bottom-20 left-1/4 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-container-max mx-auto relative">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 relative z-10">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-brand-accent font-display font-bold text-[10px] uppercase tracking-widest mb-4 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            GET STARTED
          </motion.span>
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How to Book an <span className="text-brand-accent">Appointment</span>
          </motion.h2>
          <motion.p
            className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mt-4 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Follow these 5 simple steps to partner with Inquisitive Digital and start accelerating your digital growth.
          </motion.p>
        </div>

        {/* Steps Grid with animated background wave */}
        <div className="relative mb-16">
          {/* Animated Background Wave Line */}
          <div className="absolute top-[35%] left-0 w-full h-[80px] hidden lg:block pointer-events-none z-0">
            <svg
              viewBox="0 0 1000 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="yellow-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background faint guide line */}
              <path
                d="M 100 50 C 150 20, 250 20, 300 50 C 350 80, 450 80, 500 50 C 550 20, 650 20, 700 50 C 750 80, 850 80, 900 50"
                fill="none"
                stroke="#f5c200"
                strokeWidth="2"
                className="opacity-15"
              />

              {/* Drawing progress line */}
              <motion.path
                d="M 100 50 C 150 20, 250 20, 300 50 C 350 80, 450 80, 500 50 C 550 20, 650 20, 700 50 C 750 80, 850 80, 900 50"
                fill="none"
                stroke="#f5c200"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />

              {/* Continuous running pulse/dash */}
              <motion.path
                d="M 100 50 C 150 20, 250 20, 300 50 C 350 80, 450 80, 500 50 C 550 20, 650 20, 700 50 C 750 80, 850 80, 900 50"
                fill="none"
                stroke="#f5c200"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#yellow-glow)"
                strokeDasharray="40 300"
                animate={{ strokeDashoffset: [0, -340] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                }}
              />

              {/* Start Node Circle */}
              <motion.circle
                cx="100"
                cy="50"
                r="5"
                fill="#f5c200"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <circle
                cx="100"
                cy="50"
                r="10"
                fill="none"
                stroke="#f5c200"
                strokeWidth="1.5"
                className="opacity-40"
              />
            </svg>
          </div>

          {/* 5-Column Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="relative border-2 border-on-surface p-6 flex flex-col justify-between rounded-lg bg-surface-container-low cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:-translate-x-1.5 h-full"
                  style={{ boxShadow: "6px 6px 0px 0px #f5c200" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-brand-accent p-2 rounded-md bg-background border border-outline-variant/30">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>
                      <span className="font-display text-3xl font-black text-brand-accent/30 tracking-tight leading-none">
                        {step.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base font-bold text-on-surface uppercase mb-3 tracking-tight leading-snug">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button href="/contact-us" variant="primary" className="px-12 py-5 text-sm shadow-[0_6px_24px_rgba(245,194,0,0.3)]">
            Book An Appointment Now
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
