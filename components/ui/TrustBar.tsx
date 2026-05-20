"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

type ThemeMode = "brutalist" | "singular-light" | "singular-dark";

export const TrustBar: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("brutalist");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.body.classList.contains("singular-theme")) {
        setThemeMode("singular-light");
      } else if (document.body.classList.contains("singular-dark-theme")) {
        setThemeMode("singular-dark");
      }

      const handleThemeChange = (e: any) => {
        setThemeMode(e.detail);
      };
      
      window.addEventListener("theme-change" as any, handleThemeChange);
      return () => {
        window.removeEventListener("theme-change" as any, handleThemeChange);
      };
    }
  }, []);

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <motion.div
      className={`fixed bottom-6 left-6 z-40 backdrop-blur-md py-2.5 px-6 rounded-full flex items-center gap-5 select-none pointer-events-auto transition-all duration-500 hover:scale-[1.02] border ${
        isLight
          ? "bg-white/85 border-slate-200/60 text-slate-800 shadow-[0_12_32px_rgba(0,0,0,0.08)] hover:border-brand-accent/60"
          : isDarkSingular
          ? "bg-[#0a0a0a]/85 border-white/10 text-white shadow-[0_12_32px_rgba(0,0,0,0.6)] hover:border-brand-accent/50"
          : "bg-[#161515]/85 border-outline-variant/40 text-on-surface hover:border-brand-accent/50 shadow-[0_12_32px_rgba(0,0,0,0.6)]"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Styled N Badge */}
      <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-black font-display font-extrabold text-sm shadow-[0_0_12px_rgba(245,194,0,0.35)] select-none">
        N
      </div>

      {/* Divider */}
      <div className={`w-[1px] h-4 transition-colors duration-500 ${isLight ? "bg-slate-200" : isDarkSingular ? "bg-white/20" : "bg-outline-variant/40"}`} />

      {/* Trust Text with Icon */}
      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-body font-bold uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-brand-accent stroke-[2.2]" />
        <span className={`transition-colors duration-500 ${isLight ? "text-slate-800 font-bold" : "text-white opacity-95 font-semibold"}`}>
          Brevet Trust Badge
        </span>
      </div>

      {/* Divider */}
      <div className={`w-[1px] h-4 transition-colors duration-500 ${isLight ? "bg-slate-200" : isDarkSingular ? "bg-white/20" : "bg-outline-variant/40"}`} />

      {/* Social Media Links using Inline SVGs */}
      <div className="flex items-center gap-4">
        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors duration-300 flex items-center justify-center ${
            isLight ? "text-slate-400 hover:text-brand-accent" : isDarkSingular ? "text-slate-400 hover:text-brand-accent" : "text-on-surface-variant hover:text-brand-accent"
          }`}
          aria-label="LinkedIn"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        {/* Twitter / X */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors duration-300 flex items-center justify-center ${
            isLight ? "text-slate-400 hover:text-brand-accent" : isDarkSingular ? "text-slate-400 hover:text-brand-accent" : "text-on-surface-variant hover:text-brand-accent"
          }`}
          aria-label="Twitter"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};
