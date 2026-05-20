"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-body font-bold uppercase tracking-wider text-xs py-4.5 px-10 rounded-sm transition-all duration-300 select-none";

  const variants = {
    primary: "bg-brand-accent text-black hover:bg-white border-2 border-brand-accent hover:border-white shadow-[0_6px_24px_rgba(245,194,0,0.22)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.25)]",
    secondary: "bg-white text-black hover:bg-brand-accent border-2 border-white hover:border-brand-accent",
    outline: "bg-transparent text-brand-accent border-2 border-brand-accent/60 hover:border-brand-accent hover:bg-brand-accent/5",
  };

  const buttonContent = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return (
    <button {...props} className="focus:outline-none">
      {buttonContent}
    </button>
  );
};
