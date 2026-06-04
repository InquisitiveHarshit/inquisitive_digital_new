"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import {
  Search,
  Share2,
  TrendingUp,
  Code,
  FileText,
  Award,
  Megaphone,
} from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  spanClass: string;
  slug: string;
}

export const Services: React.FC = () => {
  const router = useRouter();
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "SEO / AEO / GEO",
      shortDesc: "Rank higher on Google and AI search with advanced optimization strategies.",
      detailedDesc: "Our strategic SEO campaigns target lucrative, high-intent keywords that drive immediate transactions and revenue. We completely optimize your site architecture, fix technical elements, and build high-quality authority backlinks. By structuring your content for maximum relevance, we ensure your business dominates organic search results. Our ultimate goal is to secure permanent, long-term market share for your brand across all traditional search networks as well as the latest AI-driven discovery engines.",
      icon: Search,
      spanClass: "lg:col-span-2",
      slug: "seo"
    },
    {
      id: 3,
      title: "Social Media Marketing",
      shortDesc: "Build brand awareness and engagement across all major platforms.",
      detailedDesc: "We create cohesive content strategies across platforms that turn casual followers into passionate brand evangelists and high-value customers.",
      icon: Share2,
      spanClass: "lg:col-span-1",
      slug: "social-media"
    },
    {
      id: 4,
      title: "Performance Marketing",
      shortDesc: "Data-driven campaigns focused on ROI and measurable growth.",
      detailedDesc: "Using structured funnels, pixel tracking, and predictive analytics, we scale paid advertising across social and search platforms to achieve optimal CAC/ROAS.",
      icon: TrendingUp,
      spanClass: "lg:col-span-1",
      slug: "performance-marketing"
    },
    {
      id: 5,
      title: "Web Design & Development",
      shortDesc: "Modern, responsive, and conversion-focused websites.",
      detailedDesc: "We build blazing-fast React and Next.js websites that pass Core Web Vitals with flying colors, offering an uncompromising experience that ranks higher on search engines.",
      icon: Code,
      spanClass: "lg:col-span-1",
      slug: "web-development"
    },
    {
      id: 6,
      title: "Content Writing & Blogging",
      shortDesc: "SEO-optimized content that attracts and converts users.",
      detailedDesc: "We draft industry-leading educational blog series, whitepapers, and copy that establishes your brand as a primary source of authoritative knowledge.",
      icon: FileText,
      spanClass: "lg:col-span-1",
      slug: "content-writing"
    },
    {
      id: 7,
      title: "Graphic Design & Branding",
      shortDesc: "Create a strong visual identity that stands out.",
      detailedDesc: "Our premium graphic design services focus on creating high-impact visual assets that instantly capture customer attention and drive engagement. We design stunning, custom graphics that align with your brand identity, from social media creatives to professional website visuals. By balancing aesthetics with marketing psychology, we structure every design to convert viewers into clients. We build a powerful, permanent visual presence that makes your business stand out across digital platforms and print media.",
      icon: Award,
      spanClass: "lg:col-span-2",
      slug: "branding"
    },
    {
      id: 8,
      title: "Lead Generation",
      shortDesc: "Generate high-quality leads that convert into customers.",
      detailedDesc: "We build conversion paths, landing pages, and smart lead forms optimized for capture, bringing high-intent prospects straight to your pipeline.",
      icon: Megaphone,
      spanClass: "lg:col-span-1",
      slug: "lead-gen"
    },
  ];

  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-surface-container-low/30 relative border-b border-outline-variant/30" id="services">
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
              SERVICES <span className="text-brand-accent">THAT SCALE</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our full-suite digital marketing services are designed to help your business grow, scale, and dominate your industry.
            </motion.p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isExpanded = expandedIds[service.id] || false;
            return (
              <motion.div
                key={service.id}
                onClick={() => router.push(`/services/${service.slug}`)}
                className={`relative border-2 border-on-surface p-8 flex flex-col justify-between rounded-lg cursor-pointer bg-background transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 ${service.spanClass}`}
                style={{
                  boxShadow: "8px 8px 0px 0px #f5c200",
                }}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div>
                  {/* Icon */}
                  <div className="text-brand-accent mb-4 block">
                    <IconComponent className="w-8 h-8 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-on-surface uppercase mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Always visible description */}
                  <p className="font-body text-sm font-medium text-on-surface-variant mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Desktop detailed description / Mobile expandable detailed description */}
                  <div className="font-body text-sm text-on-surface-variant/80 leading-relaxed border-t border-outline-variant/30 pt-4 mt-4">
                    {/* On mobile, show toggleable behavior. On desktop, show full description. */}
                    <div className="hidden md:block">
                      {service.detailedDesc}
                    </div>
                    
                    <div className="block md:hidden">
                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <motion.div
                            key="expanded"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {service.detailedDesc}
                          </motion.div>
                        ) : (
                          <div className="line-clamp-2 text-on-surface-variant/60">
                            {service.detailedDesc}
                          </div>
                        )}
                      </AnimatePresence>
                      
                      <button
                        onClick={(e) => toggleExpand(service.id, e)}
                        className="text-xs font-bold text-brand-accent hover:underline mt-2 flex items-center gap-1 uppercase tracking-wider"
                      >
                        {isExpanded ? "Show Less ↑" : "Learn More →"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator bottom right */}
                <div className="flex justify-end mt-6">
                  <span className="text-xs font-bold tracking-wider uppercase text-brand-accent group-hover:underline flex items-center gap-1">
                    Go to Page →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services CTA Button */}
        <div className="flex justify-center">
          <Button href="/services" variant="outline" className="px-8 py-4">
            View All Services →
          </Button>
        </div>

      </div>
    </section>
  );
};
