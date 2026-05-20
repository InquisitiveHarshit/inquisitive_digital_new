"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Settings, 
  BadgeDollarSign, 
  MessageSquare, 
  Clock, 
  Award 
} from "lucide-react";

interface ReasonItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WhyChooseUs: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      id: 1,
      title: "Proven Track Record",
      desc: "Trusted by 500+ clients with consistent growth results.",
      icon: Trophy,
    },
    {
      id: 2,
      title: "Customized Strategies",
      desc: "Every business is unique — we create tailored marketing plans.",
      icon: Settings,
    },
    {
      id: 3,
      title: "High Ad Spend Expertise",
      desc: "Managed over $2M in ad budgets across platforms.",
      icon: BadgeDollarSign,
    },
    {
      id: 4,
      title: "Quick Response Support",
      desc: "We stay connected with fast communication and support.",
      icon: MessageSquare,
    },
    {
      id: 5,
      title: "On-Time Delivery",
      desc: "We meet deadlines without compromising quality.",
      icon: Clock,
    },
    {
      id: 6,
      title: "Certified Experts",
      desc: "Google & Meta certified professionals handling your campaigns.",
      icon: Award,
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30 border-b border-outline-variant/30 relative overflow-hidden" id="why-choose-us">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto relative z-10">
        
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
              WHY <span className="text-brand-accent">CHOOSE US</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We bring strategy, integrity, and certified technical skill to scale your customer acquisition pipelines.
            </motion.p>
          </div>
        </div>

        {/* Reason Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.id}
                className="relative border-2 border-on-surface p-8 flex flex-col justify-start rounded-lg cursor-pointer bg-background transition-transform duration-300 hover:-translate-y-1 hover:-translate-x-1"
                style={{ boxShadow: "8px 8px 0px 0px #f5c200" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div>
                  {/* Icon */}
                  <div className="text-brand-accent mb-6 block">
                    <Icon className="w-8 h-8 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-on-surface uppercase mb-3 tracking-tight">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
