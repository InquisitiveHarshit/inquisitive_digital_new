export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    slug: "seo-strategies-2026",
    title: "Top SEO Strategies for 2026: Dominating Search with AI",
    excerpt: "Learn how to optimize your content for both traditional search engines and emerging AI discovery platforms.",
    content: `The SEO landscape is rapidly changing. In this comprehensive guide, we cover the top strategies to ensure your brand stays ahead of the curve.
    
    ## 1. Content is Still King
    But it's not just any content. You need highly authoritative, original content that provides unique value. AI models are getting better at identifying fluff.
    
    ### Quality Over Quantity
    Publishing 100 mediocre articles won't cut it anymore. Focus on long-form, deeply researched pieces.
    
    - In-depth topic coverage
    - Original data and primary research
    - Expert interviews and quotes
    
    ## 2. AEO (Answer Engine Optimization)
    With AI platforms giving direct answers, optimizing for 'zero-click' searches and becoming the source of truth is critical. Make sure your data is structured properly.
    
    ## 3. Technical SEO
    Core Web Vitals and site speed matter more than ever. Ensure your Next.js applications are fully optimized for performance.`,
    date: "May 10, 2026",
    readTime: "5 min read",
    category: "SEO",
  },
  {
    id: "2",
    slug: "maximizing-social-media-roi",
    title: "Maximizing Your Social Media ROI in a Crowded Market",
    excerpt: "Stop wasting ad spend. Here is a data-driven approach to targeting and converting your ideal audience.",
    content: `Social media marketing isn't about being everywhere; it's about being where your customers are and speaking their language.
    
    ## The Multi-Touch Attribution Problem
    Many brands struggle to measure social ROI because they look at last-click attribution. We need a holistic view.
    
    ### Building Custom Attribution Models
    Relying solely on platform data is a mistake. Implement third-party tracking to see the full customer journey.
    
    - First-click tracking
    - Linear attribution weighting
    - Time-decay models
    
    ## Creative That Converts
    In a world of infinite scroll, your creative needs to stop thumbs. We'll discuss the anatomy of high-converting social creative.
    
    ## Scaling Winning Campaigns
    Once you find a winner, how do you scale without diminishing returns? We cover advanced audience expansion techniques.`,
    date: "May 15, 2026",
    readTime: "7 min read",
    category: "Performance Marketing",
  },
  {
    id: "3",
    slug: "the-power-of-brutalist-design",
    title: "The Power of Brutalist Web Design in B2B SaaS",
    excerpt: "Why some of the fastest-growing startups are ditching safe, corporate designs for bold, brutalist aesthetics.",
    content: `Web design goes through trends, and right now, brutalism is having a moment, especially in B2B SaaS.
    
    ## What is Brutalist Design?
    It's characterized by raw, unpolished aesthetics, high-contrast colors, large typography, and a deliberate breaking of conventional UI rules.
    
    ### Core Elements of Brutalism
    To truly pull off this aesthetic, you need to commit to the core principles:
    
    - High-contrast, stark palettes (often black, white, and a single neon accent)
    - Exposed grid structures and harsh, visible borders
    - Deliberately large, uncompromising typography
    - Lack of traditional drop shadows or soft gradients
    
    ## Why it Works
    In a sea of generic, template-driven websites, a brutalist design stands out. It signals confidence and disruption.
    
    ## Implementing Brutalism Safely
    You don't want to sacrifice usability. We discuss how to balance brutalist aesthetics with strong UX principles.`,
    date: "May 20, 2026",
    readTime: "4 min read",
    category: "Web Design",
  }
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find(blog => blog.slug === slug);
}
