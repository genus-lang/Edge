// Global site configuration
export const SITE_CONFIG = {
  name: "Quant Edge",
  description: "Build, backtest & deploy AI-powered trading strategies with institutional-grade tools",
  url: "https://quantedge.com",
  email: "support@quantedge.com",
  twitter: "@quantedge",
  currentYear: new Date().getFullYear(),
};

// Navigation routes
export const ROUTES = {
  home: "/",
  features: "/features",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  blogPost: "/blog/:slug",
  faqs: "/faqs",
  testimonials: "/testimonials",
  roadmap: "/roadmap",
  releaseNotes: "/release-notes",
  apiDocs: "/api-docs",
  support: "/support",
  careers: "/careers",
  terms: "/terms",
  privacy: "/privacy",
  refund: "/refund",
  security: "/security",
  compliance: "/compliance",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;
