export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  featured?: boolean;
  content?: BlogPostContent;
}

export interface BlogPostContent {
  heroImage: string;
  openingParagraph: string;
  sections: BlogSection[];
  quote?: string;
  closingParagraph: string;
}

export interface BlogSection {
  heading: string;
  content: string;
  bulletPoints?: string[];
}
