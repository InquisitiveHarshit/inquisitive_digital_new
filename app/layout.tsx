import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "Inquisitive Digital | Engineered Growth",
  description: "No fluff. No vanity metrics. Just measurable growth for ambitious brands. We engineer digital marketing strategies built on hard data and absolute transparency.",
  metadataBase: new URL("https://inquisitivedigital.com"),
  openGraph: {
    title: "Inquisitive Digital | Engineered Growth",
    description: "No fluff. No vanity metrics. Just measurable growth for ambitious brands.",
    type: "website",
    locale: "en_US",
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
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-mode') || 'singular-light';
                  document.body.setAttribute('data-theme', theme);
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
