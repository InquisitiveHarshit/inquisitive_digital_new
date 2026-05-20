"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { Button } from "../ui/Button";

type ThemeMode = "brutalist" | "singular-light" | "singular-dark";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("brutalist");

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
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Insights", href: "#insights" },
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
        <a href="#" className="flex items-center group cursor-pointer">
          <Image
            alt="Inquisitive Digital Logo"
            className={`h-14 w-40 object-contain ${isLight ? "scale-[2.8]" : ""}   transition-transform duration-300
`} src={isLight ? "/logo_black_name.png" : "/logo_white_name.png"}
            width={240}
            height={64}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
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
        <div className="flex items-center gap-4">
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
            <Button
              href="#contact"
              variant="primary"
              className={
                isLight
                  ? "bg-brand-accent border-brand-accent text-black hover:bg-black hover:text-brand-accent hover:border-black rounded-full shadow-lg shadow-brand-accent/15 hover:shadow-black/10"
                  : isDarkSingular
                    ? "bg-brand-accent border-brand-accent text-black hover:bg-white hover:text-black hover:border-white rounded-full shadow-lg shadow-brand-accent/15 hover:shadow-white/10"
                    : ""
              }
            >
              Get a Free Audit
            </Button>
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
          {navLinks.map((link) => (
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
            <Button
              href="#contact"
              variant="primary"
              onClick={() => setIsOpen(false)}
              className={
                isLight
                  ? "bg-brand-accent border-brand-accent text-black hover:bg-black hover:text-brand-accent hover:border-black rounded-full shadow-lg shadow-brand-accent/15 hover:shadow-black/10"
                  : isDarkSingular
                    ? "bg-brand-accent border-brand-accent text-black hover:bg-white hover:text-black hover:border-white rounded-full shadow-lg shadow-brand-accent/15 hover:shadow-white/10"
                    : ""
              }
            >
              Get a Free Audit
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
