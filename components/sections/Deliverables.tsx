"use client";

import React from "react";
import { motion } from "framer-motion";

export const Deliverables: React.FC = () => {
  const checklists = [
    {
      title: "Design & Frontend",
      items: [
        "Custom UI design (no templates) in Figma",
        "Fully mobile-responsive design (all screen sizes)",
        "Cross-browser compatibility (Chrome, Safari, Firefox)",
        "Optimized images and media for fast loading",
        "Micro-animations and smooth transitions",
        "Contact forms with email notification integration",
      ]
    },
    {
      title: "SEO & Performance",
      items: [
        "On-page SEO setup (meta tags, headings, schema)",
        "Google Analytics 4 and Search Console setup",
        "XML sitemap and robots.txt configuration",
        "Page speed optimization (target 90+ Google score)",
      ]
    },
    {
      title: "Backend & Technical",
      items: [
        "CMS integration (custom or headless)",
        "SSL certificate setup and HTTPS configuration",
        "Hosting setup and deployment pipeline",
        "Database design and API integration",
        "WhatsApp chat button and lead capture setup",
      ]
    },
    {
      title: "Post-Launch",
      items: [
        "30 days of free bug fixing and support",
        "CMS training video / walkthrough session",
        "Handover documentation for your team",
        "Post-launch performance report",
      ]
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 px-6 md:px-margin-desktop relative overflow-hidden" id="deliverables">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-container-max mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-[1px] bg-brand-accent"></div>
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">
              Deliverables
            </span>
          </motion.div>
          
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl text-on-surface tracking-tight mb-5 font-light leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Included in <span className="font-medium italic text-on-surface/90">every project.</span>
          </motion.h2>
          
          <motion.p
            className="font-body text-base md:text-lg text-on-surface-variant/80 max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            No hidden surprises. Uncompromising execution. Here's exactly what you get when you work with Inquisitive Digital.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {checklists.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              className="flex flex-col p-6 sm:p-8 rounded-2xl bg-surface border border-brand-accent/40 shadow-[0_12px_40px_rgba(245,194,0,0.18)] transition-all duration-300 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            >
              <div className="flex items-baseline gap-3 mb-6 relative z-10">
                <span className="text-[10px] sm:text-xs font-display font-bold tracking-widest text-brand-accent">
                  0{groupIdx + 1}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-medium text-on-surface tracking-wide">
                  {group.title}
                </h3>
              </div>
              
              <ul className="flex flex-col gap-4 relative z-10 ml-1.5">
                {group.items.map((item, itemIdx) => (
                  <li 
                    key={itemIdx} 
                    className="pl-6 sm:pl-7 font-body text-sm sm:text-[15px] text-on-surface-variant/90 leading-relaxed font-light relative hover:text-on-surface transition-colors cursor-default"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full bg-brand-accent z-10" />
                    
                    {/* Connecting Line (except for the last item) */}
                    {itemIdx !== group.items.length - 1 && (
                      <div className="absolute left-[2.5px] top-[14px] w-[1px] h-[calc(100%+10px)] bg-brand-accent/50" />
                    )}
                    
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
