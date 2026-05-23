"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Sparkles, Sun, Moon, Search, Share2, TrendingUp, Code, FileText, Award, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "brutalist" | "singular-light" | "singular-dark";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("singular-light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const handleThemeSwitch = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (typeof window !== "undefined") {
      document.body.classList.remove("singular-theme", "singular-dark-theme");
      if (mode === "singular-light") {
        document.body.classList.add("singular-theme");
      } else if (mode === "singular-dark") {
        document.body.classList.add("singular-dark-theme");
      }
      window.dispatchEvent(new CustomEvent("theme-change", { detail: mode }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

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
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("theme-change" as any, handleThemeChange);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const dropdownServices = [
    { 
      title: "SEO / AEO / GEO", 
      desc: "Rank higher on Google and AI search", 
      href: "/services/seo",
      icon: Search 
    },
    { 
      title: "Social Media", 
      desc: "Build brand awareness & engagement", 
      href: "/services/social-media",
      icon: Share2 
    },
    { 
      title: "Performance Ads", 
      desc: "Data-driven ROI campaigns", 
      href: "/services/performance-marketing",
      icon: TrendingUp 
    },
    { 
      title: "Web Development", 
      desc: "Blazing fast Next.js & React sites", 
      href: "/services/web-development",
      icon: Code 
    },
    { 
      title: "Content & Blogs", 
      desc: "SEO optimized authoritative copy", 
      href: "/services/content-writing",
      icon: FileText 
    },
    { 
      title: "Branding & Design", 
      desc: "Premium visual identity ecosystems", 
      href: "/services/branding",
      icon: Award 
    },
    { 
      title: "Lead Generation", 
      desc: "High quality transactional leads", 
      href: "/services/lead-gen",
      icon: Megaphone 
    },
  ];

  const isLight = themeMode === "singular-light";
  const isDarkSingular = themeMode === "singular-dark";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isLight
        ? scrolled
          ? "bg-white/95 backdrop-blur-md border-slate-200/60 py-4 shadow-md"
          : "bg-white/90 backdrop-blur-sm border-transparent py-6"
        : isDarkSingular
          ? scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-white/10 py-4 shadow-lg"
            : "bg-[#0a0a0a]/90 backdrop-blur-sm border-transparent py-6"
          : scrolled
            ? "bg-background/95 backdrop-blur-md border-outline-variant/30 py-4 shadow-lg"
            : "bg-background/90 backdrop-blur-sm border-transparent py-6"
        }`}
    >
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop flex justify-between items-center">
        <a href="/" className="flex items-center group cursor-pointer relative z-10">
          <Image
            alt="Inquisitive Digital Logo"
            className={`h-14 w-auto aspect-[1080/480] object-cover transition-transform duration-300 ${isLight ? "scale-[1.15]" : ""}`}
            src={isLight ? "/logo_black_name.png" : "/logo_white_name.png"}
            width={240}
            height={64}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Home Link */}
          <a
            className={`font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${isLight
              ? "text-slate-700 hover:text-brand-accent after:bg-brand-accent"
              : isDarkSingular
                ? "text-slate-300 hover:text-brand-accent after:bg-brand-accent"
                : "text-on-surface-variant hover:text-brand-accent after:bg-brand-accent"
              }`}
            href="/"
          >
            Home
          </a>

          {/* Services Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="/services"
              className={`font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative flex items-center gap-1.5 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${
                isLight
                  ? "text-slate-700 hover:text-brand-accent after:bg-brand-accent"
                  : isDarkSingular
                    ? "text-slate-300 hover:text-brand-accent after:bg-brand-accent"
                    : "text-on-surface-variant hover:text-brand-accent after:bg-brand-accent"
              }`}
            >
              Services
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl border p-2 shadow-2xl z-50 transition-colors duration-300 ${
                    isLight
                      ? "bg-white border-slate-100 text-slate-800"
                      : isDarkSingular
                        ? "bg-[#141414] border-white/10 text-white"
                        : "bg-surface border-outline-variant text-on-surface shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {dropdownServices.map((service) => {
                      const Icon = service.icon;
                      return (
                        <a
                          key={service.title}
                          href={service.href}
                          className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all duration-200 ${
                            isLight
                              ? "hover:bg-slate-50 hover:text-brand-accent"
                              : isDarkSingular
                                ? "hover:bg-white/5 hover:text-brand-accent"
                                : "hover:bg-brand-accent hover:text-black"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isLight ? "bg-slate-100 text-brand-accent" : "bg-white/5 text-brand-accent"
                          }`}>
                            <Icon className="w-4 h-4 stroke-[2]" />
                          </div>
                          <div>
                            <div className="text-[11px] font-display font-extrabold uppercase tracking-wider leading-none">
                              {service.title}
                            </div>
                            <div className={`text-[9px] mt-1 font-body font-medium line-clamp-1 ${
                              isLight ? "text-slate-400" : "text-slate-500"
                            }`}>
                              {service.desc}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Nav Links */}
          {navLinks.filter(link => link.label !== "Services" && link.label !== "Home").map((link) => (
            <a
              key={link.label}
              className={`font-body text-xs uppercase tracking-wider font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${isLight
                ? "text-slate-700 hover:text-brand-accent after:bg-brand-accent"
                : isDarkSingular
                  ? "text-slate-300 hover:text-brand-accent after:bg-brand-accent"
                  : "text-on-surface-variant hover:text-brand-accent after:bg-brand-accent"
                }`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Theme Switcher */}
        <div className="flex items-center gap-4 relative z-20">
          {/* Dynamic Theme Switcher (Icon-only) */}
          <div className={`flex items-center rounded-full p-0.5 border transition-all duration-300 ${
            isLight
              ? "bg-slate-100 border-slate-200"
              : "bg-black/40 backdrop-blur-md border-white/10"
          }`}>
            <button
              onClick={() => handleThemeSwitch("brutalist")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                themeMode === "brutalist"
                  ? "bg-[#1c1b1b] text-brand-accent border border-outline-variant/40 shadow-sm"
                  : isLight
                    ? "text-slate-400 hover:text-slate-700"
                    : "text-white/50 hover:text-white"
              }`}
              title="Brutalist Mode"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeSwitch("singular-light")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                themeMode === "singular-light"
                  ? "bg-white text-black border border-slate-200 shadow-sm"
                  : isLight
                    ? "text-slate-400 hover:text-slate-700"
                    : "text-white/50 hover:text-white"
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleThemeSwitch("singular-dark")}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                themeMode === "singular-dark"
                  ? "bg-brand-accent text-black border border-brand-accent shadow-sm"
                  : isLight
                    ? "text-slate-400 hover:text-slate-700"
                    : "text-white/50 hover:text-white"
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audit Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className={`inline-flex items-center justify-center font-body font-extrabold uppercase tracking-wider text-[11px] py-2.5 px-6 transition-all duration-300 select-none cursor-pointer border-2 hover:scale-[1.03] ${
                isLight
                  ? "bg-brand-accent text-black border-black hover:bg-black hover:text-brand-accent hover:border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-full"
                  : isDarkSingular
                    ? "bg-brand-accent text-black border-brand-accent hover:bg-white hover:text-black hover:border-white shadow-[3px_3px_0px_rgba(255,255,255,0.2)] rounded-full"
                    : "bg-brand-accent text-background hover:bg-white border-brand-accent hover:border-white rounded-sm shadow-[0_4px_16px_rgba(245,194,0,0.18)]"
              }`}
            >
              Get a Free Audit
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors focus:outline-none ${isLight
              ? "text-slate-800 hover:text-brand-accent"
              : isDarkSingular
                ? "text-white hover:text-brand-accent"
                : "text-on-surface hover:text-brand-accent"
              }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div
          className={`md:hidden fixed top-[81px] left-0 w-full h-[calc(100vh-81px)] z-40 flex flex-col items-center justify-center gap-8 py-12 transition-all duration-300 border-t ${isLight
            ? "bg-white/98 backdrop-blur-lg border-slate-100"
            : isDarkSingular
              ? "bg-[#0a0a0a]/98 backdrop-blur-lg border-white/10"
              : "bg-background/98 backdrop-blur-lg border-outline-variant/30"
            }`}
        >
          {/* Home Link */}
          <a
            className={`font-body text-lg uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight
              ? "text-slate-800 hover:text-brand-accent"
              : isDarkSingular
                ? "text-white hover:text-brand-accent"
                : "text-on-surface hover:text-brand-accent"
              }`}
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>

          {/* Services Accordion */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`flex items-center gap-2 font-body text-lg uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight
                ? "text-slate-800 hover:text-brand-accent"
                : isDarkSingular
                  ? "text-white hover:text-brand-accent"
                  : "text-on-surface hover:text-brand-accent"
                }`}
            >
              Services
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Collapsible Mobile Sub-Services */}
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col gap-2.5 mt-3 w-full items-center overflow-hidden"
                >
                  {dropdownServices.map((service) => (
                    <a
                      key={service.title}
                      href={service.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-xs font-body font-bold uppercase tracking-wide transition-colors ${
                        isLight ? "text-slate-500 hover:text-brand-accent" : "text-slate-400 hover:text-brand-accent"
                      }`}
                    >
                      {service.title}
                    </a>
                  ))}
                  <a
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-body uppercase tracking-wide font-extrabold text-brand-accent mt-1"
                  >
                    View All Services →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Nav links */}
          {navLinks.filter(link => link.label !== "Services" && link.label !== "Home").map((link) => (
            <a
              key={link.label}
              className={`font-body text-lg uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight
                ? "text-slate-800 hover:text-brand-accent"
                : isDarkSingular
                  ? "text-white hover:text-brand-accent"
                  : "text-on-surface hover:text-brand-accent"
                }`}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className={`inline-flex items-center justify-center font-body font-extrabold uppercase tracking-wider text-xs py-3.5 px-8 transition-all duration-300 select-none cursor-pointer border-2 hover:scale-[1.02] ${
                isLight
                  ? "bg-brand-accent text-black border-black hover:bg-black hover:text-brand-accent hover:border-brand-accent shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-full"
                  : isDarkSingular
                    ? "bg-brand-accent text-black border-brand-accent hover:bg-white hover:text-black hover:border-white shadow-[4px_4px_0px_rgba(255,255,255,0.2)] rounded-full"
                    : "bg-brand-accent text-background hover:bg-white border-brand-accent hover:border-white rounded-sm shadow-[0_6px_20px_rgba(245,194,0,0.2)]"
              }`}
            >
              Get a Free Audit
            </a>
          </div>

          {/* Mobile Theme Switcher inside Navigation Drawer */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className={`font-body text-[10px] uppercase tracking-widest font-bold ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}>
              Select Mode
            </span>
            <div className={`flex items-center rounded-full p-0.5 border transition-all duration-300 ${
              isLight
                ? "bg-slate-100 border-slate-200"
                : "bg-black/40 backdrop-blur-md border-white/10"
            }`}>
              <button
                onClick={() => handleThemeSwitch("brutalist")}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                  themeMode === "brutalist"
                    ? "bg-[#1c1b1b] text-brand-accent border border-outline-variant/40 shadow-sm"
                    : isLight
                      ? "text-slate-400 hover:text-slate-700"
                      : "text-white/50 hover:text-white"
                }`}
                title="Brutalist Mode"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleThemeSwitch("singular-light")}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                  themeMode === "singular-light"
                    ? "bg-white text-black border border-slate-200 shadow-sm"
                    : isLight
                      ? "text-slate-400 hover:text-slate-700"
                      : "text-white/50 hover:text-white"
                }`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleThemeSwitch("singular-dark")}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                  themeMode === "singular-dark"
                    ? "bg-brand-accent text-black border border-brand-accent shadow-sm"
                    : isLight
                      ? "text-slate-400 hover:text-slate-700"
                      : "text-white/50 hover:text-white"
                }`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
