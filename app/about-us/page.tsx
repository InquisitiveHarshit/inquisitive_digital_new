"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";

import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Quote, Sparkles, TrendingUp, Award, Mail } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function AboutUsPage() {
  const { themeMode } = useTheme();

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  const stats = [
    {
      value: "100+",
      label: "Brands Scaled",
      icon: TrendingUp,
    },
    {
      value: "Clutch",
      label: "Top Marketing Partner",
      icon: Award,
    },
    {
      value: "8+ Yrs",
      label: "Strategic Experience",
      icon: Sparkles,
    },
  ];

  const founders = [
    {
      name: "Riddhi Mehta",
      role: "FOUNDER",
      bio: "Creative strategist with 8+ years of experience",
      quote: "MARKETING NARRATES, CONVERSION DELIVERS.",
      image: "/riddhi.jpg", // placeholder path for user to upload later
      socials: {
        linkedin: "#",
        email: "mailto:riddhi@inquisitivedigital.co"
      }
    },
    {
      name: "Krishana Raj Maheshwari",
      role: "CO-FOUNDER & COO",
      bio: "Digital marketing expert & serial entrepreneur",
      quote: "MARKETING IS NO LONGER ABOUT THE STUFF YOU MAKE, BUT ABOUT THE STORIES YOU TELL.",
      image: "/krishana.jpg", // placeholder path for user to upload later
      socials: {
        linkedin: "#",
        email: "mailto:krishana@inquisitivedigital.co"
      }
    }
  ];

  return (
    <>
      <Header />
      <main className={`flex-grow w-full pt-32 pb-24 min-h-[90vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start ${isLight ? "bg-white text-slate-900" : isDarkSingular ? "bg-[#0a0a0a] text-white" : "bg-[#0f0e0e] text-white"}`}>
        
        {/* Hero Section */}
        <div className="max-w-container-max w-full mx-auto px-6 md:px-margin-desktop relative text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-xs font-bold tracking-widest text-brand-accent uppercase"
          >
            MEET THE MINDS BEHIND
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 ${isLight ? "text-slate-900" : "text-white"}`}
          >
            INQUISITIVE <span className="text-brand-accent">DIGITAL</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`font-body text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-medium ${isLight ? "text-slate-600" : "text-slate-400"}`}
          >
            We scale brands with creative that sells — <span className="underline decoration-brand-accent decoration-2 underline-offset-4 font-bold">minus the fluff</span>.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="max-w-container-max w-full mx-auto px-6 md:px-margin-desktop mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className={`p-6 border-2 flex items-center justify-between rounded-lg bg-surface-container-low transition-transform hover:-translate-y-1 ${isLight ? "border-slate-900" : "border-white"}`}
                  style={{ boxShadow: `6px 6px 0px 0px ${isLight ? "#000" : "#f5c200"}` }}
                >
                  <div>
                    <p className="text-3xl md:text-4xl font-display font-black text-brand-accent">{stat.value}</p>
                    <p className={`text-sm font-bold uppercase mt-1 tracking-wider ${isLight ? "text-slate-700" : "text-slate-300"}`}>{stat.label}</p>
                  </div>
                  <Icon className="w-10 h-10 text-brand-accent stroke-[1.5]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Founders Grid Section */}
        <div className="max-w-container-max w-full mx-auto px-6 md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 p-8 border-2 rounded-xl bg-surface-container-low/50 backdrop-blur-sm ${isLight ? "border-slate-900" : "border-slate-800"}`}
                style={{ boxShadow: `8px 8px 0px 0px ${isLight ? "#000" : "#f5c200"}` }}
              >
                {/* Photo Placeholder */}
                <div className="w-full md:w-48 h-48 flex-shrink-0 relative rounded-lg overflow-hidden border border-brand-accent/20 bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 flex flex-col items-center justify-center text-center p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,194,0,0.15)_0,transparent_70%)] pointer-events-none" />
                  <div className="w-16 h-16 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-3 font-display font-black text-2xl border border-brand-accent/40">
                    {founder.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <p className="text-xs font-bold tracking-wider uppercase text-brand-accent mb-1">{founder.name}</p>
                  <p className={`text-[10px] uppercase font-semibold ${isLight ? "text-slate-500" : "text-slate-400"}`}>Avatar Placeholder</p>
                  <p className={`text-[9px] mt-1 ${isLight ? "text-slate-400" : "text-slate-500"}`}>Upload {founder.image} to replace</p>
                </div>

                {/* Info & Quote details */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    {/* Role Tag */}
                    <div className="inline-block mb-3 px-3 py-1 rounded bg-brand-accent text-[11px] font-black tracking-wider text-slate-900 uppercase">
                      {founder.role}
                    </div>
                    {/* Name */}
                    <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                      {founder.name}
                    </h2>
                    {/* Bio */}
                    <p className={`font-body text-sm font-semibold mb-6 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                      {founder.bio}
                    </p>

                    {/* Quote */}
                    <div className={`relative p-5 rounded-lg border border-brand-accent/15 bg-brand-accent/5 italic ${isLight ? "text-slate-700" : "text-slate-200"}`}>
                      <Quote className="absolute top-2 left-2 w-4 h-4 text-brand-accent/40" />
                      <p className="font-body text-xs sm:text-sm font-medium pl-4 leading-relaxed">
                        "{founder.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="flex gap-4 mt-6 pt-4 border-t border-brand-accent/10">
                    <a href={founder.socials.linkedin} className="text-brand-accent hover:text-brand-accent/80 transition-colors p-1.5 rounded-full hover:bg-brand-accent/10" aria-label={`${founder.name} LinkedIn`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href={founder.socials.email} className="text-brand-accent hover:text-brand-accent/80 transition-colors p-1.5 rounded-full hover:bg-brand-accent/10" aria-label={`Email ${founder.name}`}>
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
      <FloatingWhatsApp />
    </>
  );
}
