import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Inquisitive Digital | Join Our Digital Marketing Team",
  description: "Passionate about digital marketing? Join Inquisitive Digital and work with a talented team on exciting campaigns for 100+ brands. Explore open positions in SEO, paid media, content, design & web development.",
  openGraph: {
    title: "Careers at Inquisitive Digital | Join Our Digital Marketing Team",
    description: "Passionate about digital marketing? Join Inquisitive Digital and work with a talented team on exciting campaigns for 100+ brands. Explore open positions in SEO, paid media, content, design & web development.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
