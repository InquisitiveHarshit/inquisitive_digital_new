"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const CTA: React.FC = () => {
  return (
    <section className="w-full py-section-gap px-6 md:px-margin-desktop bg-brand-accent text-black text-center relative overflow-hidden">
      {/* Decorative vector shape background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase mb-8 leading-none tracking-tighter"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          READY TO GROW YOUR BUSINESS ONLINE?
        </motion.h2>
        <motion.p
          className="font-body text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-semibold leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let’s build a strategy that delivers real, measurable results for your business.
        </motion.p>
        <motion.div
          className="flex justify-center items-center w-full"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button href="#contact" variant="secondary" className="px-10 py-5 text-sm hover:!bg-[#111111] hover:!text-brand-accent hover:!border-[#111111]">
            Get Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
