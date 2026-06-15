"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Metrics } from "@/components/sections/Metrics";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Deliverables } from "@/components/sections/Deliverables";
import { PainPoints } from "@/components/sections/PainPoints";
import { Process } from "@/components/sections/Process";
import { BookingSteps } from "@/components/sections/BookingSteps";
import { Industries } from "@/components/sections/Industries";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/blogSection";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { TrustBar } from "@/components/ui/TrustBar";
import { ChevronUp } from "lucide-react";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Header Navigation */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

        {/* Brands Marquee Section */}
        <BrandsMarquee />

        {/* Trust Strip / Social Proof Ribbon
        <TrustStrip /> */}

        {/* About the Agency & Stats Counter Section */}
        <Metrics />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Services Overview Section */}
        <Services />

        {/* Deliverables Checklist Section */}
        <Deliverables />

        {/* Pain Points Section */}
        <PainPoints />

        {/* Process Flow Section */}
        <Process />

        {/* Booking Steps Section */}
        <BookingSteps />

        {/* Industries We Serve Grid */}
        <Industries />

        {/* Case Studies / Portfolio Section */}
        {/* <CaseStudies /> */}

        {/* Client Testimonials Carousel/Grid */}
        <Testimonials />

        {/* Insights & Blog Preview Section */}
        <Insights />

        {/* Final Call to Action Section */}
        <CTA />

        {/* Frequently Asked Questions Section */}
        <FAQ />

      </main>


      {/* Interactive WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Floating Bottom Left Trust & Social Bar */}
      {/* <TrustBar /> */}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-[110px] right-8 z-50 w-14 h-14 rounded-full bg-brand-accent text-background flex items-center justify-center shadow-lg hover:shadow-[0_8px_24px_rgba(245,194,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-brand-accent/30"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </>
  );
}
