import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Inquisitive Digital | Get a Free Digital Marketing Consultation",
  description: "Ready to grow your business? Contact Inquisitive Digital for a free consultation. Our experts will craft a customized digital marketing strategy for your brand. Call +91 7310 777 430 or fill out our contact form today.",
  openGraph: {
    title: "Contact Inquisitive Digital | Get a Free Digital Marketing Consultation",
    description: "Ready to grow your business? Contact Inquisitive Digital for a free consultation. Our experts will craft a customized digital marketing strategy for your brand. Call +91 7310 777 430 or fill out our contact form today.",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
