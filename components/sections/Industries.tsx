"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Coins, 
  Building2, 
  Stethoscope, 
  ShoppingBag, 
  GraduationCap, 
  Laptop, 
  Factory, 
  Palmtree, 
  Scale, 
  Calendar 
} from "lucide-react";

interface IndustryItem {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const Industries: React.FC = () => {
  const industries: IndustryItem[] = [
    { id: 1, name: "Finance & Insurance", icon: Coins },
    { id: 2, name: "Real Estate", icon: Building2 },
    { id: 3, name: "Healthcare & Medical", icon: Stethoscope },
    { id: 4, name: "E-Commerce & Retail", icon: ShoppingBag },
    { id: 5, name: "Education & EdTech", icon: GraduationCap },
    { id: 6, name: "Technology & IT", icon: Laptop },
    { id: 7, name: "Manufacturing", icon: Factory },
    { id: 8, name: "Tourism & Hospitality", icon: Palmtree },
    { id: 9, name: "Legal & Law Firms", icon: Scale },
    { id: 10, name: "Event Management", icon: Calendar },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-background border-b border-outline-variant/30 relative" id="industries">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-16">
          <div className="md:col-span-8">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              INDUSTRIES <span className="text-brand-accent">WE SERVE</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We bring specialized strategy and execution formulas built specifically to scale businesses in these primary fields.
            </motion.p>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.id}
                className="border border-outline-variant/20 px-6 py-8 rounded-sm bg-gradient-to-br from-[#1c1b1b]/50 to-transparent hover:border-brand-accent hover:bg-[#1a1919] transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="text-brand-accent/70 group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300 mb-4">
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <span className="font-display text-sm font-bold text-on-surface uppercase tracking-wide group-hover:text-brand-accent transition-colors duration-300">
                  {ind.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
