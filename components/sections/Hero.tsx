"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "brutalist" | "singular-light" | "singular-dark";

export const Hero: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("singular-light");

  // Sync the theme class with body element
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.remove("singular-theme", "singular-dark-theme");
      if (themeMode === "singular-light") {
        document.body.classList.add("singular-theme");
      } else if (themeMode === "singular-dark") {
        document.body.classList.add("singular-dark-theme");
      }
      window.dispatchEvent(new CustomEvent("theme-change", { detail: themeMode }));
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.classList.remove("singular-theme", "singular-dark-theme");
      }
    };
  }, [themeMode]);

  // Listen to external theme changes (like from the Header)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleExternalThemeChange = (e: any) => {
        if (e.detail !== themeMode) {
          setThemeMode(e.detail);
        }
      };
      window.addEventListener("theme-change" as any, handleExternalThemeChange);
      return () => {
        window.removeEventListener("theme-change" as any, handleExternalThemeChange);
      };
    }
  }, [themeMode]);

  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-margin-desktop transition-colors duration-700 overflow-hidden border-b ${themeMode === "singular-light"
        ? "bg-white border-slate-100"
        : themeMode === "singular-dark"
          ? "bg-[#0a0a0a] border-white/10"
          : "bg-[#0f0e0e] border-outline-variant/30"
        }`}
      id="hero"
    >
      {/* ----------------- BACKGROUND VISUAL LAYERS ----------------- */}
      <AnimatePresence mode="wait">
        {themeMode === "brutalist" ? (
          /* Brutalist Dark Background Elements */
          <motion.div
            key="brutalist-bg"
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Left concrete texture overlay */}
            <svg className="absolute top-0 left-0 w-full md:w-1/2 h-full opacity-[0.06] pointer-events-none" style={{ maskImage: "linear-gradient(to right, black 70%, transparent)", WebkitMaskImage: "linear-gradient(to right, black 70%, transparent)" }}>
              <filter id="concreteNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#concreteNoise)" />
            </svg>

            {/* Right Digital Network Visualization Layer */}
            <div className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-30 pointer-events-none md:block hidden">
              <svg className="w-full h-full" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="glow-node" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="net-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5c200" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffd84d" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Network Lines */}
                <path d="M 500 150 L 650 250 L 580 400 L 700 500 L 520 620 L 400 480 Z" stroke="url(#net-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 650 250 L 750 180 L 700 500 M 580 400 L 450 320 L 500 150 M 520 620 L 600 720 L 700 500" stroke="rgba(245, 194, 0, 0.2)" strokeWidth="1" />
                <path d="M 400 480 L 320 580 L 520 620 M 450 320 L 400 480" stroke="rgba(245, 194, 0, 0.1)" strokeWidth="1" />

                {/* Connected Data Lines */}
                <line x1="500" y1="150" x2="580" y2="400" stroke="#f5c200" strokeWidth="1.2" strokeOpacity="0.3" />
                <line x1="580" y1="400" x2="520" y2="620" stroke="#f5c200" strokeWidth="1.2" strokeOpacity="0.3" />
                <line x1="650" y1="250" x2="700" y2="500" stroke="#f5c200" strokeWidth="1.2" strokeOpacity="0.3" />

                {/* Glowing Nodes */}
                <circle cx="500" cy="150" r="5" fill="#f5c200" filter="url(#glow-node)" />
                <circle cx="650" cy="250" r="4" fill="#ffd84d" filter="url(#glow-node)" />
                <circle cx="580" cy="400" r="7" fill="#f5c200" filter="url(#glow-node)" />
                <circle cx="700" cy="500" r="6" fill="#ffd84d" filter="url(#glow-node)" />
                <circle cx="520" cy="620" r="5" fill="#f5c200" filter="url(#glow-node)" />
                <circle cx="400" cy="480" r="4" fill="#f5c200" filter="url(#glow-node)" />

                {/* Floating Data Points */}
                <circle cx="530" cy="220" r="2" fill="#ffd84d" className="animate-ping" style={{ animationDuration: '4s' }} />
                <circle cx="610" cy="310" r="2" fill="#ffd84d" className="animate-ping" style={{ animationDuration: '6s' }} />
                <circle cx="640" cy="460" r="1.5" fill="#ffffff" opacity="0.6" />
                <circle cx="490" cy="530" r="2" fill="#ffd84d" className="animate-ping" style={{ animationDuration: '5s' }} />
              </svg>
            </div>

            {/* Background Decorative Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/2 blur-[150px] pointer-events-none" />
          </motion.div>
        ) : (
          /* Singular Theme Background Elements (Light & Dark Variants) */
          <motion.div
            key="singular-bg"
            className="absolute inset-0 w-[100vw] h-[100vh] z-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top-Right Yellow Brand Fluid Blob */}
            <div className="hidden md:block absolute top-0 right-0 w-[35%] h-[70%] pointer-events-none opacity-90">
              <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMaxYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 500 0 C 400 0, 310 80, 310 200 C 310 330, 430 380, 500 320 Z"
                  fill="#f5c200"
                  animate={{
                    d: [
                      "M 500 0 C 400 0, 310 80, 310 200 C 310 330, 430 380, 500 320 Z",
                      "M 500 0 C 380 30, 290 120, 300 240 C 310 360, 440 350, 500 350 Z",
                      "M 500 0 C 400 0, 310 80, 310 200 C 310 330, 430 380, 500 320 Z"
                    ]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* Bottom-Left Overlapping Blobs (Black/Grey and Gold-Yellow) */}
            <div className="absolute bottom-0 left-0 w-[90%] md:w-[48%] h-[60%] pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dark Base Blob */}
                <motion.path
                  d="M 0 500 C 0 350, 90 350, 110 500 Z"
                  fill={themeMode === "singular-dark" ? "#1a1a1a" : "#111111"}
                  animate={{
                    d: [
                      "M 0 500 C 0 350, 90 350, 110 500 Z",
                      "M 0 500 C 0 370, 120 330, 130 500 Z",
                      "M 0 500 C 0 350, 90 350, 110 500 Z"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Gold-Yellow Brand Blob */}
                <motion.path
                  d="M 0 500 C 80 460, 240 450, 280 400 C 320 340, 190 350, 0 500 Z"
                  fill="#f5c200"
                  animate={{
                    d: [
                      "M 0 500 C 80 460, 240 450, 280 400 C 320 340, 190 350, 0 500 Z",
                      "M 0 500 C 100 480, 220 420, 260 380 C 300 340, 150 380, 0 500 Z",
                      "M 0 500 C 80 460, 240 450, 280 400 C 320 340, 190 350, 0 500 Z"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* Sweep curved lines */}
            <svg className="absolute inset-0 w-full h-full opacity-35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M -50 200 C 150 180, 250 380, 500 280 C 750 180, 600 450, 900 400" stroke={themeMode === "singular-dark" ? "#333" : "#e2e8f0"} strokeWidth="2" />
              <path d="M 100 -50 C 200 150, 180 350, 450 300 C 720 250, 800 650, 1100 500" stroke={themeMode === "singular-dark" ? "#222" : "#f1f5f9"} strokeWidth="1.5" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- FOREGROUND MAIN CONTENT (FULL WIDTH) ----------------- */}
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10 w-full">
        <div className="md:col-span-12 flex flex-col items-center text-center">

          {/* Trust Badge Banner / Subheader */}
          {/* <AnimatePresence mode="wait">
            {themeMode === "brutalist" ? (
              <motion.div
                key="dark-badge"
                className="inline-flex items-center gap-2 border-2 border-brand-accent/80 bg-surface/80 backdrop-blur-md px-6 py-2.5 mb-8 rounded-full text-xs font-body font-bold tracking-wider uppercase text-brand-accent shadow-[0_0_20px_rgba(245,194,0,0.2)]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                ⭐ 500+ Clients Served | 8+ Years of Excellence
              </motion.div>
            ) : (
              <motion.div
                key="light-badge"
                className={`inline-flex items-center gap-2 px-6 py-2.5 mb-8 rounded-full text-xs font-body font-bold tracking-wider uppercase shadow-sm ${themeMode === "singular-dark"
                  ? "bg-[#f5c200]/10 border border-[#f5c200]/30 text-brand-accent"
                  : "bg-[#f5c200]/10 border border-[#f5c200]/30 text-slate-700"
                  }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                ⭐ 500+ Clients Served | 8+ Years of Excellence
              </motion.div>
            )}
          </AnimatePresence> */}

          {/* Animated Headline with Custom Copy & Black-Yellow styling */}
          <AnimatePresence mode="wait">
            {themeMode === "brutalist" ? (
              <motion.h1
                key="brutalist-headline"
                className="font-display text-[32px] sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold uppercase mb-6 leading-[1.1] sm:leading-[1.05] tracking-tighter w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bg-gradient-to-b from-white via-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent drop-shadow-sm select-none">
                  DIGITAL MARKETING
                </span> <br />
                <span className="relative inline-block select-none mt-2">
                  <span className="bg-gradient-to-r from-[#ffe47e] via-[#f5c200] to-[#b38600] bg-clip-text text-transparent font-extrabold gold-glow-pulse">
                    THAT DELIVERS.
                  </span>
                </span>
              </motion.h1>
            ) : (
              <motion.h1
                key="singular-headline"
                className={`font-body text-[32px] sm:text-6xl md:text-7xl lg:text-[82px] font-black leading-[1.1] sm:leading-[1.05] tracking-tight w-full uppercase mb-6 sm:mb-8 select-none ${themeMode === "singular-dark" ? "text-white" : "text-[#111111]"
                  }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Digital Marketing <br />
                <span className={`relative inline-block mt-3 px-4 sm:px-6 py-1.5 sm:py-2 rounded-sm transform -rotate-1 select-none ${themeMode === "singular-dark"
                  ? "bg-brand-accent text-[#111111] border-2 border-brand-accent shadow-[4px_4px_0px_rgba(255,255,255,0.1)] sm:shadow-[6px_6px_0px_rgba(255,255,255,0.1)]"
                  : "bg-[#111111] text-brand-accent border-2 border-black shadow-[4px_4px_0px_rgba(245,194,0,1)] sm:shadow-[6px_6px_0px_rgba(245,194,0,1)]"
                  }`}>
                  That Delivers.
                </span>
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Animated Description */}
          <motion.p
            key={`desc-${themeMode}`}
            className={`font-body text-sm sm:text-lg md:text-xl max-w-4xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4 sm:px-0 ${themeMode === "singular-light"
              ? "text-slate-700 font-medium"
              : themeMode === "singular-dark"
                ? "text-slate-300 font-medium"
                : "text-on-surface-variant"
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We help startups, SMEs, and enterprises scale faster with data-driven SEO, paid ads, and performance marketing strategies that generate measurable results.
          </motion.p>

          {/* Animated Call-to-Actions */}
          <AnimatePresence mode="wait">
            {themeMode === "brutalist" ? (
              <motion.div
                key="dark-ctas"
                className="flex flex-row gap-3 sm:gap-6 justify-center w-full sm:w-auto px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href="#contact"
                  className="bg-brand-accent text-background hover:bg-white border-2 border-brand-accent hover:border-white font-body font-bold text-[10px] sm:text-xs py-3 sm:py-4.5 px-3 sm:px-10 rounded-sm transition-all duration-300 shadow-[0_6px_24px_rgba(245,194,0,0.22)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.25)] select-none uppercase flex items-center justify-center flex-1 sm:flex-none"
                >
                  Get Free Consultation
                </a>
                <a
                  href="#contact"
                  className="bg-transparent text-brand-accent border-2 border-brand-accent/60 hover:border-brand-accent hover:bg-brand-accent/5 font-body font-bold text-[10px] sm:text-xs py-3 sm:py-4.5 px-3 sm:px-10 rounded-sm transition-all duration-300 select-none uppercase flex items-center justify-center flex-1 sm:flex-none"
                >
                  Free Website Audit
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="light-ctas"
                className="flex flex-row gap-3 sm:gap-6 justify-center w-full sm:w-auto z-10 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Primary Button */}
                <a
                  href="#contact"
                  className={`font-body font-extrabold text-[10px] sm:text-sm py-3 sm:py-4 px-3 sm:px-10 rounded-full transition-all duration-300 select-none cursor-pointer flex items-center justify-center border-2 flex-1 sm:flex-none hover:scale-[1.02] ${themeMode === "singular-dark"
                    ? "bg-brand-accent text-black border-brand-accent hover:bg-white hover:text-black hover:border-white shadow-[3px_3px_0px_rgba(255,255,255,0.2)] sm:shadow-[4px_4px_0px_rgba(255,255,255,0.2)]"
                    : "bg-brand-accent text-black border-black hover:bg-black hover:text-brand-accent hover:border-brand-accent shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    }`}
                >
                  Get Free Consultation
                </a>
                {/* Secondary Button */}
                <a
                  href="#contact"
                  className={`font-body font-extrabold text-[10px] sm:text-sm py-3 sm:py-4 px-3 sm:px-10 rounded-full transition-all duration-300 select-none cursor-pointer flex items-center justify-center border-2 flex-1 sm:flex-none hover:scale-[1.02] ${themeMode === "singular-dark"
                    ? "bg-transparent text-white border-white hover:bg-brand-accent hover:text-black hover:border-brand-accent shadow-[3px_3px_0px_rgba(245,194,0,0.5)] sm:shadow-[4px_4px_0px_rgba(245,194,0,0.5)]"
                    : "bg-black text-white border-black hover:bg-white hover:text-black shadow-[3px_3px_0px_rgba(245,194,0,1)] sm:shadow-[4px_4px_0px_rgba(245,194,0,1)]"
                    }`}
                >
                  Free Website Audit
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dual Stat Trust Pill (High-Fidelity) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mt-12 w-full max-w-lg mx-auto p-4 sm:p-5 rounded-2xl border flex items-center justify-between shadow-lg transition-colors duration-500 z-10 relative ${
              themeMode === "singular-dark"
                ? "bg-[#141414] border-white/10 text-white shadow-black/40"
                : themeMode === "singular-light"
                  ? "bg-white border-slate-100 text-[#111111] shadow-slate-100/50"
                  : "bg-surface border-outline-variant text-on-surface shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {/* Stat 1 */}
            <div className="flex-1 flex items-center gap-3 justify-center pr-3 sm:pr-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                themeMode === "singular-dark" ? "bg-brand-accent/20" : "bg-[#f5c200]/10"
              }`}>
                <svg className="w-5 h-5 text-brand-accent stroke-[2.5]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-display font-black text-base sm:text-xl leading-none">
                  ₹50Cr+
                </div>
                <div className={`font-body text-[10px] sm:text-xs mt-1 font-semibold ${
                  themeMode === "singular-dark" ? "text-slate-400" : "text-slate-500"
                }`}>
                  Ad Spend Managed
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={`h-8 w-[1px] shrink-0 ${
              themeMode === "singular-dark" ? "bg-white/10" : "bg-slate-200"
            }`} />

            {/* Stat 2 */}
            <div className="flex-1 flex items-center gap-3 justify-center pl-3 sm:pl-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                themeMode === "singular-dark" ? "bg-brand-accent/20" : "bg-[#f5c200]/10"
              }`}>
                <svg className="w-5 h-5 text-brand-accent stroke-[2.5]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-display font-black text-base sm:text-xl leading-none">
                  100+
                </div>
                <div className={`font-body text-[10px] sm:text-xs mt-1 font-semibold ${
                  themeMode === "singular-dark" ? "text-slate-400" : "text-slate-500"
                }`}>
                  Brands Scaled
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
