import React from "react";

export interface ServiceFullDetail {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  ctaText: string;
  painPoints: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  heroSection?: {
    ctaText1: string;
    ctaText2: string;
  };
  approachSection?: {
    tag: string;
    heading: string;
    mainDescription: string;
    secondaryDescription: string;
    pills: { title: string; desc: string }[];
  };
  deliverablesSection?: {
    tag: string;
    heading: string;
    items: string[];
    itemSubtext: string;
    guaranteeText: string;
    guaranteeCtaText: string;
  };
  inactionSection?: {
    tag: string;
    heading: string;
    painPoints: { title: string; desc: string }[];
  };
  leadFormSection?: {
    tag: string;
    heading: string;
    benefits: { title: string; desc: string }[];
  };
  statsSection?: {
    tag: string;
    heading: string;
    stats: { value: string; label: string; source?: string }[];
  };
  whatIsSection?: {
    tag: string;
    heading: string;
    description: string;
    secondaryDescription: string;
  };
  whyMattersSection?: {
    tag: string;
    heading: string;
    intro: string;
    benefits: { title: string; desc: string }[];
  };
  servicesSection?: {
    tag: string;
    heading: string;
    services: { title: string; desc: string }[];
    aeo?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
    geo?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
    // Content Marketing sub-sections
    seoContent?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
    thoughtLeadership?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
    // Creative Services sub-sections
    branding?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
    marketingCreative?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
    motionGraphics?: {
      tag: string;
      heading: string;
      subheading: string;
      description: string;
      services: string[];
    };
  };
  processSection?: {
    tag: string;
    heading: string;
    steps: { number: string; title: string; desc: string }[];
  };
  whyUsSection?: {
    tag: string;
    heading: string;
    items: { title: string; desc: string }[];
  };
  resultsSection?: {
    tag: string;
    heading: string;
    description: string;
    outcomes: { title: string; desc: string }[];
  };
}
