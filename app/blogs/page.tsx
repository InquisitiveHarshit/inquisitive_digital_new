"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function BlogsPage() {
  const [themeMode, setThemeMode] = useState<"brutalist" | "singular-light" | "singular-dark">("singular-light");

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
    <>
      <Header />
      <main className={`flex-grow w-full pt-28 pb-24 min-h-[80vh] transition-colors duration-500 overflow-hidden flex flex-col items-center justify-center ${isLight ? "bg-white" : isDarkSingular ? "bg-[#0a0a0a]" : "bg-[#0f0e0e]"}`}>
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 mt-16 ${isLight ? "text-slate-900" : "text-white"}`}
          >
            OUR <span className="text-brand-accent">BLOGS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${isLight ? "text-slate-600" : "text-slate-400"}`}
          >
            Insights, strategies, and deep dives into the digital marketing landscape.
          </motion.p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
