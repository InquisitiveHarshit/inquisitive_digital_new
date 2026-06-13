export interface BlogImage {
  url: string;
  alt: string;
  filename?: string;
}

export interface BlogSubsection {
  subheading: string;
  text: string;
  listItems: string[];
  metaLinking?: string;
  image?: BlogImage;
}

export interface BlogSection {
  heading: string;
  subheading?: string;
  text: string;
  listItems: string[];
  metaLinking?: string;
  image?: BlogImage;
  subsections: BlogSubsection[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
  tag?: string;
}

export interface BlogPost {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  intro?: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
  heroImage?: BlogImage;
  sections?: BlogSection[];
  faqs?: BlogFAQ[];
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  script?: string;
  isActive?: boolean;
  priority?: number;
}

export const blogs: BlogPost[] = [];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find(blog => blog.slug === slug);
}
