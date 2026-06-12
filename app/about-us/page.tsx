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
    { value: "100+", label: "Brands Scaled", icon: TrendingUp },
    { value: "Clutch", label: "Top Marketing Partner", icon: Award },
    { value: "4+ Yrs", label: "Strategic Experience", icon: Sparkles },
  ];

  const timelineData = [
    {
      year: "2022",
      title: "Dehradun Chapter",
      desc: "Inquisitive Digital started with a simple thought: good marketing should help businesses grow. After working with brands for years, Riddhi saw that many businesses were overwhelmed by online mess. What they really needed was clarity. That's why Inquisitive Digital was created in 2022, to help businesses make smarter marketing decisions and grow with confidence. Today, that same approach continues to guide everything we do.",
      img: "https://res.cloudinary.com/dch9wvp1k/image/upload/v1780655760/uq7izq7a7flbiprana87.png",
      reverse: false,
    },
    {
      year: "2024",
      title: "Noida Chapter",
      desc: "In 2024, Krishana Maheshwari joined Inquisitive Digital as Co-founder after spending 7 years working in technology and growth at companies like Slice and Blinkit. He spent time understanding why so many businesses struggle to grow and realized that great products alone aren't enough. Businesses also need the right marketing, systems, and technology to scale. That perspective led him to Inquisitive Digital, where he now helps businesses grow through tech and bit of craziness.",
      img: "https://res.cloudinary.com/dch9wvp1k/image/upload/v1780655759/jutjeuen61pqcb1csqht.jpg",
      reverse: true,
    },
    {
      year: "2026",
      title: "Fresh Chapter",
      desc: "By 2026, Inquisitive Digital had grown and changed in many ways. We felt it was the right time for our brand to reflect that growth, so we introduced a new identity and a new logo. The new look represents who we are today, a team that believes in clear thinking, thoughtful strategy, and helping businesses find the right path to growth. While our look changed, our purpose stayed the same: helping businesses grow through creativity, curiosity, and meaningful work.",
      img: isLight ? "/logo_black_name.png" : "/logo_white_name.png",
      reverse: false,
    },
  ];

  const foundersData = [
    {
      name: "Riddhi Mehta",
      role: "FOUNDER",
      bio: "Creative strategist with 8+ years of experience",
      quote: "MARKETING NARRATES, CONVERSION DELIVERS.",
      image: "https://res.cloudinary.com/dch9wvp1k/image/upload/v1780655758/da7gk6ye6fd6ponbjbge.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/riddhimehta11/",
        email: "mailto:riddhi@inquisitivedigital.co"
      }
    },
    {
      name: "Krishana Raj Maheshwari",
      role: "CO-FOUNDER & COO",
      bio: "Digital marketing expert & serial entrepreneur",
      quote: "MARKETING IS NO LONGER ABOUT THE STUFF YOU MAKE, BUT ABOUT THE STORIES YOU TELL.",
      image: "https://res.cloudinary.com/dvdfhripy/image/upload/v1755608915/IMG_7488_louka3.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/krishana-maheshwari-404184178",
        email: "mailto:krishana@inquisitivedigital.co"
      }
    }
  ];

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={18} height={18} fill="currentColor">
      <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
        <path d="M2680 3551 c-73 -38 -103 -137 -65 -211 8 -16 166 -161 351 -322 l337 -293 -986 -5c-980 -5 -986 -5 -1014 -26 -98 -73 -98 -195 0 -268 28 -21 34 -21 1014 -26 l986 -5 -337 -293c-185 -161 -343 -306 -351 -322 -23 -44 -19 -121 8 -160 44 -65 138 -89 204 -52 50 27 1023 881 1044 916 11 18 19 49 19 76 0 27 -8 58 -19 76 -21 35 -994 889 -1044 917 -41 22 -103 22 -147 -2z" />
      </g>
    </svg>
  );

  return (
    <>
      <Header />
      <main className={`flex-grow w-full pt-32 pb-24 min-h-[90vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-start ${isLight ? "bg-white text-slate-900" : isDarkSingular ? "bg-[#0a0a0a] text-white" : "bg-[#0f0e0e] text-white"}`}>
        
        {/* Hero Section */}
        <div className="max-w-container-max w-full mx-auto px-6 md:px-margin-desktop relative text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-xs font-bold tracking-widest text-brand-accent uppercase"
          >
            OUR STORY
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 ${isLight ? "text-slate-900" : "text-white"}`}
          >
            WHAT DRIVES <span className="text-brand-accent">US?</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`font-body text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto font-medium text-center ${isLight ? "text-slate-600" : "text-slate-300"}`}
          >
            <p>
              Curiosity drives everything we do. Before we build campaigns, launch ads, or redesign websites, we take the time to understand what makes your business tick. What's working? What's not? Where are the opportunities? We don't believe in copy-paste strategies or chasing every new trend but in asking the right questions, digging into the data, and finding solutions that make sense for your business. At the end of the day, our goal is simple: help you grow with marketing that actually works.
            </p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="w-full py-16 mb-24 relative">
          <div className="max-w-7xl w-full mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-display text-4xl font-bold uppercase mb-16"
            >
              Story of Inquisitive Digital
            </motion.h2>
            
            <div className="flex flex-col gap-12 md:gap-0">
              {timelineData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-center py-8 md:py-12 w-full ${item.reverse ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 w-full max-w-[420px] flex justify-center px-4 md:px-8 mb-8 md:mb-0">
                    <img src={item.img} alt={item.title} className="w-full h-auto rounded-xl object-cover" style={{ boxShadow: `6px 6px 0px 0px ${isLight ? "#000" : "#f5c200"}` }} />
                  </div>

                  {/* Divider for desktop */}
                  <div className="hidden md:block w-[2px] h-64 bg-brand-accent/60 mx-4 shrink-0 rounded-full" />

                  <div className={`flex-1 w-full max-w-[480px] px-4 md:px-8 flex flex-col gap-6 ${item.reverse ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-center`}>
                    <span className={`font-display text-7xl md:text-8xl italic font-black text-transparent [-webkit-text-stroke:1px_#f5c200] leading-none ${item.reverse ? 'self-end' : 'self-start'}`} style={{ letterSpacing: "-3px" }}>
                      {item.year}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">{item.title}</h3>
                      <p className={`text-[15px] leading-relaxed opacity-90 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <div className="max-w-container-max w-full mx-auto px-6 md:px-margin-desktop relative z-10 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold uppercase mb-4">Founders</h2>
            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Two minds, one shared belief. <br/>
              That marketing works best when thinking and making moves together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {foundersData.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                whileHover={{ y: -4 }}
                className={`relative flex flex-col md:flex-row gap-8 p-8 border-2 rounded-xl backdrop-blur-sm overflow-hidden ${
                  isLight
                    ? "border-slate-200 bg-gradient-to-br from-[#fffef5] via-white to-[#fff9e0]"
                    : "border-slate-800 bg-surface-container-low/50"
                }`}
                style={{ boxShadow: isLight ? "8px 8px 0px 0px #f5c200" : `8px 8px 0px 0px #f5c200` }}
              >
                {/* Subtle golden top sheen for light mode */}
                {isLight && (
                  <>
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, rgba(245,194,0,0.8) 40%, rgba(255,220,50,1) 60%, rgba(245,194,0,0.8) 80%, transparent)" }} />
                    <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,194,0,0.18) 0%, transparent 70%)" }} />
                    <div className="pointer-events-none absolute -bottom-12 -left-12 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(245,194,0,0.12) 0%, transparent 70%)" }} />
                  </>
                )}
                {!isLight && (
                  <>
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(245,194,0,0.5) 50%, transparent)" }} />
                    <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(245,194,0,0.6) 0%, transparent 70%)" }} />
                  </>
                )}
                {/* Photo */}
                <div className="w-full md:w-48 h-48 flex-shrink-0 relative rounded-lg overflow-hidden border border-brand-accent/20 bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 flex flex-col items-center justify-center text-center p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,194,0,0.15)_0,transparent_70%)] pointer-events-none" />
                  <img src={founder.image} alt={founder.name} className="absolute inset-0 w-full h-full object-cover z-10 rounded-lg" />
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
                  <div className="flex gap-4 mt-6 pt-4 border-t border-brand-accent/10 relative z-20">
                    <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-brand-accent/80 transition-colors p-1.5 rounded-full hover:bg-brand-accent/10" aria-label={`${founder.name} LinkedIn`}>
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
