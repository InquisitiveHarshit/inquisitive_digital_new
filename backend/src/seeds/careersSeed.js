import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

dotenv.config();

const sampleJobs = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Noida / Remote",
    type: "remote",
    salary_range: "₹18L - ₹24L",
    description: "We are looking for a Senior Frontend Developer with deep expertise in Next.js, React, and TypeScript. You will be responsible for building blazing fast user interfaces, implementing cutting-edge visual experiences, and mentoring junior engineers.",
    requirements: [
      "5+ years of experience with modern React, TypeScript, and state management libraries",
      "Proven track record of building production-grade Next.js applications (App Router preferred)",
      "Strong understanding of CSS-in-JS, Tailwind CSS, and animation libraries like Framer Motion",
      "Experience optimizing web vitals, performance, and SEO best practices",
      "Excellent communication and collaboration skills in a remote environment"
    ]
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Noida",
    type: "full-time",
    salary_range: "₹12L - ₹16L",
    description: "As our Growth Marketing Manager, you will drive customer acquisition across search, social, and programmatics. You will engineer and run high-budget PPC campaigns, coordinate SEO/AEO optimizations, and analyze attribution data to maximize ROI for client brands.",
    requirements: [
      "3+ years of experience in growth marketing or performance ads (Google, Meta, LinkedIn)",
      "Deep analytical skills with Google Analytics, SEMrush, and custom attribution models",
      "Experience working in a fast-paced agency environment with multiple client portfolios",
      "Understanding of landing page optimization, A/B testing, and conversion rate optimization (CRO)",
      "Strong copywriting skills for high-converting ad copy"
    ]
  },
  {
    title: "SEO / AEO Specialist",
    department: "Marketing",
    location: "Noida / Remote",
    type: "full-time",
    salary_range: "₹8L - ₹12L",
    description: "We are hiring an SEO & AEO (Answer Engine Optimization) Specialist to optimize content for both traditional search engines (Google) and AI-driven search engines (ChatGPT Search, Perplexity, Google Gemini). You will lead schema markup execution, entity linking, and content authority mapping.",
    requirements: [
      "2+ years of hands-on SEO experience focusing on technical SEO, site speed, and structured data",
      "Familiarity with AEO concepts: optimizing for voice assistants, LLMs, and conversational search platforms",
      "Proficient with SEO tools like Google Search Console, Ahrefs, Screaming Frog, and Schema App",
      "Basic understanding of HTML/JS to coordinate with the engineering team for structured data injection",
      "Data-driven mindset with weekly reporting on organic traffic and keyword visibility"
    ]
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Noida",
    type: "full-time",
    salary_range: "₹10L - ₹14L",
    description: "We are seeking a UI/UX Designer to craft premium, interactive digital experiences. You will design web layout systems, custom icons, branding collateral, and motion graphics that wow clients and visitors. You will work closely with frontend developers to ensure pixel-perfect deployment.",
    requirements: [
      "3+ years of experience as a UI/UX designer with a strong, diverse portfolio (Figma is a must)",
      "Deep understanding of design systems, typography, color theory, and micro-interactions",
      "Ability to translate complex user flows into clean, elegant, and modern wireframes and prototypes",
      "Familiarity with web standards, responsive design, and basic frontend constraints",
      "Experience with Framer, Webflow, or UI animation prototypes is a big plus"
    ]
  },
  {
    title: "Content Writer",
    department: "Content",
    location: "Noida",
    type: "full-time",
    salary_range: "₹6L - ₹9L",
    description: "We are looking for a Content Writer who is passionate about storytelling and copywriting. You will write SEO-optimized blog posts, copy for performance ads, landing page content, and social media posts. You will work closely with SEO specialists and designers.",
    requirements: [
      "2+ years of content writing experience, preferably in an agency or fast-paced marketing environment",
      "Strong research skills and ability to write authoritative, engaging content on diverse niches",
      "Good understanding of SEO writing, keyword placement, and heading structure",
      "Impeccable grammar, spelling, and proofreading skills",
      "Portfolio of published writing samples (blogs, newsletters, or ad copy)"
    ]
  }
];

const run = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    
    console.log("Connecting to database...");
    await mongoose.connect(mongoUri);
    console.log("Connected successfully. Cleaning old collections...");

    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log("Seeding sample jobs...");
    const created = await Job.create(sampleJobs);
    console.log(`Success! Inserted ${created.length} jobs.`);

    await mongoose.disconnect();
    console.log("Disconnected. Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error(`Seeding failed: ${err.message}`);
    process.exit(1);
  }
};

run();
