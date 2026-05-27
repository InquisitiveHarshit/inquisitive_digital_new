"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "brutalist" | "singular-light" | "singular-dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "singular-light",
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("singular-light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme-mode") as ThemeMode | null;
      if (savedTheme) {
        setThemeMode(savedTheme);
      } else {
        const currentTheme = document.body.getAttribute("data-theme") as ThemeMode | null;
        if (currentTheme) {
          setThemeMode(currentTheme);
        } else {
          setThemeMode("singular-light");
        }
      }

      // Listen to theme-change event from other sources if any
      const handleThemeChange = (e: any) => {
        setThemeMode(e.detail);
      };
      window.addEventListener("theme-change" as any, handleThemeChange);
      return () => {
        window.removeEventListener("theme-change" as any, handleThemeChange);
      };
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-mode", mode);
      document.body.setAttribute("data-theme", mode);
      window.dispatchEvent(new CustomEvent("theme-change", { detail: mode }));
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
