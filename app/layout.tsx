import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { AdminExclusionWrapper } from "@/components/layout/AdminExclusionWrapper";

const beVietnam = localFont({
  src: [
    { path: "../assets/fonts/BeVietnam-Thin.ttf", weight: "100", style: "normal" },
    { path: "../assets/fonts/BeVietnam-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../assets/fonts/BeVietnam-Light.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/BeVietnam-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../assets/fonts/BeVietnam-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/BeVietnam-Italic.ttf", weight: "400", style: "italic" },
    { path: "../assets/fonts/BeVietnam-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/BeVietnam-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../assets/fonts/BeVietnam-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/BeVietnam-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../assets/fonts/BeVietnam-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/BeVietnam-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../assets/fonts/BeVietnam-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../assets/fonts/BeVietnam-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
  ],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "Digital Marketing Agency in India | SEO, PPC & Social Media",
  description: "Looking for a top digital marketing agency in India? Inquisitive Digital delivers expert SEO, Google Ads, social media & performance marketing. 100+ brands scaled. Get a free consultation today!",
  metadataBase: new URL("https://www.inquisitivedigital.com"),
  alternates: {
    canonical: "https://www.inquisitivedigital.com/",
  },
  authors: [{ name: "Inquisitive Digital" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo-3.png',
    apple: '/logo-3.png',
  },
  openGraph: {
    title: "Digital Marketing Agency in India | SEO, PPC & Social Media",
    description: "Looking for a top digital marketing agency in India? Inquisitive Digital delivers expert SEO, Google Ads, social media & performance marketing. 100+ brands scaled. Get a free consultation today!",
    type: "website",
    locale: "en_US",
    url: "https://www.inquisitivedigital.com/",
    images: [
      {
        url: '/logo-3.png',
        width: 1200,
        height: 630,
        alt: 'Inquisitive Digital Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Digital Marketing Agency in India | SEO, PPC & Social Media",
    description: "Looking for a top digital marketing agency in India? Inquisitive Digital delivers expert SEO, Google Ads, social media & performance marketing. 100+ brands scaled. Get a free consultation today!",
    images: ['/logo-3.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${beVietnam.variable} h-full antialiased scroll-smooth dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface" suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme-mode') || 'singular-light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `
          }}
        />
        <ThemeProvider>
          <div className="noise-overlay" />
          {children}
          <AdminExclusionWrapper>
            <Contact />
            <Footer />
          </AdminExclusionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
