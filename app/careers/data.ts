export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Remote";
  salary: string;
  description: string;
  requirements: string[];
  is_active?: boolean;
  applications_count?: number;
}

export interface Application {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url: string;
  resume_original_name: string;
  status: "pending" | "shortlisted" | "rejected";
  applied_at: string;
}

export const mockJobs: Job[] = [
  {
    id: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Noida / Remote",
    type: "Remote",
    salary: "₹18L - ₹24L",
    description: "We are looking for a Senior Frontend Developer with deep expertise in Next.js, React, and TypeScript. You will be responsible for building blazing fast user interfaces, implementing cutting-edge visual experiences, and mentoring junior engineers.",
    requirements: [
      "5+ years of experience with modern React, TypeScript, and state management libraries",
      "Proven track record of building production-grade Next.js applications (App Router preferred)",
      "Strong understanding of CSS-in-JS, Tailwind CSS, and animation libraries like Framer Motion",
      "Experience optimizing web vitals, performance, and SEO best practices",
      "Excellent communication and collaboration skills in a remote environment"
    ],
    is_active: true,
    applications_count: 5
  },
  {
    id: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Noida",
    type: "Full-time",
    salary: "₹12L - ₹16L",
    description: "As our Growth Marketing Manager, you will drive customer acquisition across search, social, and programmatics. You will engineer and run high-budget PPC campaigns, coordinate SEO/AEO optimizations, and analyze attribution data to maximize ROI for client brands.",
    requirements: [
      "3+ years of experience in growth marketing or performance ads (Google, Meta, LinkedIn)",
      "Deep analytical skills with Google Analytics, SEMrush, and custom attribution models",
      "Experience working in a fast-paced agency environment with multiple client portfolios",
      "Understanding of landing page optimization, A/B testing, and conversion rate optimization (CRO)",
      "Strong copywriting skills for high-converting ad copy"
    ],
    is_active: true,
    applications_count: 3
  },
  {
    id: "seo-aeo-specialist",
    title: "SEO / AEO Specialist",
    department: "Marketing",
    location: "Noida / Remote",
    type: "Full-time",
    salary: "₹8L - ₹12L",
    description: "We are hiring an SEO & AEO (Answer Engine Optimization) Specialist to optimize content for both traditional search engines (Google) and AI-driven search engines (ChatGPT Search, Perplexity, Google Gemini). You will lead schema markup execution, entity linking, and content authority mapping.",
    requirements: [
      "2+ years of hands-on SEO experience focusing on technical SEO, site speed, and structured data",
      "Familiarity with AEO concepts: optimizing for voice assistants, LLMs, and conversational search platforms",
      "Proficient with SEO tools like Google Search Console, Ahrefs, Screaming Frog, and Schema App",
      "Basic understanding of HTML/JS to coordinate with the engineering team for structured data injection",
      "Data-driven mindset with weekly reporting on organic traffic and keyword visibility"
    ],
    is_active: true,
    applications_count: 2
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Noida",
    type: "Full-time",
    salary: "₹10L - ₹14L",
    description: "We are seeking a UI/UX Designer to craft premium, interactive digital experiences. You will design web layout systems, custom icons, branding collateral, and motion graphics that wow clients and visitors. You will work closely with frontend developers to ensure pixel-perfect deployment.",
    requirements: [
      "3+ years of experience as a UI/UX designer with a strong, diverse portfolio (Figma is a must)",
      "Deep understanding of design systems, typography, color theory, and micro-interactions",
      "Ability to translate complex user flows into clean, elegant, and modern wireframes and prototypes",
      "Familiarity with web standards, responsive design, and basic frontend constraints",
      "Experience with Framer, Webflow, or UI animation prototypes is a big plus"
    ],
    is_active: false,
    applications_count: 0
  }
];

export const mockApplications: Application[] = [
  {
    id: "app-1",
    job_id: "senior-frontend-developer",
    full_name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+91 98765 43210",
    cover_letter: "I am a passionate frontend developer with 6 years of experience working with React and Next.js. I love crafting premium, visual, animated experiences and optimizing web performance. I would love to join Inquisitive Digital and help engineer growth.",
    resume_url: "/uploads/resumes/sample-resume.pdf",
    resume_original_name: "jane_doe_resume.pdf",
    status: "shortlisted",
    applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: "app-2",
    job_id: "senior-frontend-developer",
    full_name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 019-2834",
    cover_letter: "Hi team, I specialize in design-to-code implementations using Next.js and Tailwind CSS. Looking forward to discussing the role.",
    resume_url: "/uploads/resumes/sample-resume.pdf",
    resume_original_name: "john_smith_cv.pdf",
    status: "pending",
    applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: "app-3",
    job_id: "growth-marketing-manager",
    full_name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "+91 99999 88888",
    cover_letter: "I have managed ad spend budgets exceeding $50k/month on Google and Meta, generating 3.5x average ROAS. I would love to drive performance ads at Inquisitive.",
    resume_url: "/uploads/resumes/sample-resume.pdf",
    resume_original_name: "alice_johnson_portfolio.docx",
    status: "pending",
    applied_at: new Date().toISOString() // today
  },
  {
    id: "app-4",
    job_id: "seo-aeo-specialist",
    full_name: "Bob Wilson",
    email: "bob.wilson@example.com",
    phone: "+91 88888 77777",
    cover_letter: "SEO is shifting towards answer engine optimization. I have hands-on experience optimizing content structure to trigger Perplexity and ChatGPT search citations. Let's build the future of organic search visibility.",
    resume_url: "/uploads/resumes/sample-resume.pdf",
    resume_original_name: "bob_wilson_seo.pdf",
    status: "rejected",
    applied_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
];

export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id);
}
