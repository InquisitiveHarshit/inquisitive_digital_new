import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
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
import { Insights } from "@/components/sections/Insights";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { TrustBar } from "@/components/ui/TrustBar";

export default function Home() {
  return (
    <>
      {/* Header Navigation */}
      <Header />

      {/* Main Sections */}
      <main className="flex-grow flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

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
        <CaseStudies />

        {/* Client Testimonials Carousel/Grid */}
        <Testimonials />

        {/* Insights & Blog Preview Section */}
        <Insights />

        {/* Final Call to Action Section */}
        <CTA />

        {/* Frequently Asked Questions Section */}
        <FAQ />

        {/* Free Audit & General Contact Form Section */}
        <Contact />
      </main>

      {/* Footer Navigation */}
      <Footer />

      {/* Interactive WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Floating Bottom Left Trust & Social Bar */}
      {/* <TrustBar /> */}
    </>
  );
}
