"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Search, Server, Headset, CheckCircle2 } from "lucide-react";

export const Deliverables: React.FC = () => {
  const checklists = [
    {
      title: "Design & Frontend",
      icon: Layout,
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
      icon: Search,
      items: [
        "On-page SEO setup (meta tags, headings, schema)",
        "Google Analytics 4 and Search Console setup",
        "XML sitemap and robots.txt configuration",
        "Page speed optimization (target 90+ Google score)",
      ]
    },
    {
      title: "Backend & Technical",
      icon: Server,
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
      icon: Headset,
      items: [
        "30 days of free bug fixing and support",
        "CMS training video / walkthrough session",
        "Handover documentation for your team",
        "Post-launch performance report",
      ]
    }
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop relative" id="deliverables">
      <div className="max-w-container-max mx-auto">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-8">
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface uppercase tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              WHAT'S INCLUDED IN <br className="hidden sm:block" />
              <span className="text-brand-accent">EVERY PROJECT</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              No hidden surprises. Uncompromising execution. Here's exactly what you get when you work with Inquisitive Digital.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {checklists.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            return (
              <motion.div 
                key={groupIdx}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
                  <GroupIcon className="w-6 h-6 text-brand-accent" />
                  <h3 className="font-display text-xl font-bold text-on-surface uppercase tracking-wide">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <span className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
