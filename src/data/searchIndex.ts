// Comprehensive search index for all website content
export interface SearchItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: "Blog" | "Features" | "Docs" | "FAQs" | "Support" | "Pricing" | "Legal" | "Company" | "Product";
  url: string;
  page: string;
  keywords: string[];
  priority: number; // Higher = more important (1-10)
}

export const SEARCH_INDEX: SearchItem[] = [
  // Home & Product
  {
    id: "home",
    title: "Quant Edge - AI-Powered Trading Platform",
    description: "Build, backtest & deploy AI-powered trading strategies with institutional-grade tools",
    content: "Quant Edge empowers traders to automate strategies using AI, run lightning-fast backtests on historical data, and deploy live trades with confidence",
    category: "Product",
    url: "home",
    page: "Home",
    keywords: ["home", "trading", "AI", "strategies", "backtesting", "automated trading"],
    priority: 10,
  },
  
  // Features
  {
    id: "features-overview",
    title: "Features - Powerful Trading Tools",
    description: "Explore all features of Quant Edge including backtesting, AI optimization, and risk analytics",
    content: "Lightning-fast backtesting engine, AI hyperparameter optimization, risk analytics, portfolio management, live trading, broker integrations",
    category: "Features",
    url: "features",
    page: "Features",
    keywords: ["features", "tools", "backtesting", "AI", "optimization", "risk", "analytics"],
    priority: 9,
  },
  {
    id: "feature-backtesting",
    title: "Lightning-Fast Backtesting Engine",
    description: "Test strategies on years of historical data in seconds",
    content: "Multi-asset support, tick-level precision, slippage modeling, commission simulation, concurrent testing",
    category: "Features",
    url: "features",
    page: "Features",
    keywords: ["backtesting", "historical data", "testing", "simulation", "performance"],
    priority: 8,
  },
  {
    id: "feature-ai-optimization",
    title: "AI Hyperparameter Optimization",
    description: "Let AI automatically find the best strategy parameters",
    content: "Genetic algorithms, Bayesian search, grid search, parameter tuning, optimization",
    category: "Features",
    url: "features",
    page: "Features",
    keywords: ["AI", "optimization", "hyperparameter", "genetic algorithm", "tuning"],
    priority: 8,
  },
  {
    id: "feature-risk-analytics",
    title: "Risk Analytics & Portfolio Protection",
    description: "Monitor risk and protect capital with institutional-grade controls",
    content: "Drawdown tracking, VaR, position limits, auto-cutoff, portfolio safeguards, risk management",
    category: "Features",
    url: "features",
    page: "Features",
    keywords: ["risk", "analytics", "drawdown", "VaR", "protection", "limits"],
    priority: 8,
  },
  {
    id: "feature-live-trading",
    title: "Live Trading & Execution",
    description: "Deploy strategies to live markets with real-time execution",
    content: "Real-time execution, broker API integration, order management, live monitoring, trade automation",
    category: "Features",
    url: "features",
    page: "Features",
    keywords: ["live trading", "execution", "broker", "API", "real-time", "orders"],
    priority: 8,
  },

  // Pricing
  {
    id: "pricing",
    title: "Pricing Plans - Free to Enterprise",
    description: "Choose the perfect plan for your trading needs",
    content: "Free plan with 10,000 backtests, Starter at $29/mo, Professional at $99/mo, Enterprise custom pricing",
    category: "Pricing",
    url: "pricing",
    page: "Pricing",
    keywords: ["pricing", "plans", "free", "starter", "professional", "enterprise", "cost", "subscription"],
    priority: 9,
  },

  // API Docs
  {
    id: "api-docs",
    title: "API Documentation",
    description: "Build custom integrations with the Quant Edge API",
    content: "REST API, WebSocket support, Python SDK, JavaScript SDK, authentication, rate limits, endpoints",
    category: "Docs",
    url: "api-docs",
    page: "API Documentation",
    keywords: ["API", "documentation", "SDK", "integration", "developer", "REST", "WebSocket"],
    priority: 7,
  },
  {
    id: "api-authentication",
    title: "API Authentication",
    description: "Secure your API requests with API keys and OAuth",
    content: "API key authentication, OAuth 2.0, bearer tokens, security best practices",
    category: "Docs",
    url: "api-docs",
    page: "API Documentation",
    keywords: ["authentication", "API key", "OAuth", "security", "token"],
    priority: 6,
  },

  // Support & FAQs
  {
    id: "faq-what-is-quant-edge",
    title: "What is Quant Edge?",
    description: "Learn about our AI-powered trading platform",
    content: "Quant Edge is an AI-powered platform for building, backtesting, and deploying automated trading strategies",
    category: "FAQs",
    url: "faqs",
    page: "FAQs",
    keywords: ["what is", "platform", "about", "overview"],
    priority: 9,
  },
  {
    id: "faq-coding-required",
    title: "Do I need coding skills?",
    description: "Find out if you need programming knowledge to use Quant Edge",
    content: "No coding required. Visual builders and low-code editors available. Advanced users can write custom Python/JS code",
    category: "FAQs",
    url: "faqs",
    page: "FAQs",
    keywords: ["coding", "programming", "skills", "requirements", "technical"],
    priority: 8,
  },
  {
    id: "faq-markets",
    title: "Which markets are supported?",
    description: "Supported trading markets and asset classes",
    content: "Stocks, crypto, forex, futures, commodities - based on available broker integrations",
    category: "FAQs",
    url: "faqs",
    page: "FAQs",
    keywords: ["markets", "assets", "stocks", "crypto", "forex", "futures", "commodities"],
    priority: 7,
  },
  {
    id: "faq-worldwide",
    title: "Can I use Quant Edge worldwide?",
    description: "Geographic availability and regional support",
    content: "Yes, Quant Edge supports traders across 50+ countries. Regional broker availability may vary",
    category: "FAQs",
    url: "faqs",
    page: "FAQs",
    keywords: ["worldwide", "global", "countries", "region", "availability"],
    priority: 7,
  },
  {
    id: "faq-refund",
    title: "What is your refund policy?",
    description: "Information about refunds and cancellations",
    content: "14-day money-back guarantee on first subscription. Cancel anytime",
    category: "FAQs",
    url: "refund",
    page: "Refund Policy",
    keywords: ["refund", "money back", "guarantee", "cancel", "cancellation"],
    priority: 7,
  },

  // Support
  {
    id: "support-help-center",
    title: "Support & Help Center",
    description: "Get help with Quant Edge",
    content: "Tutorials, guides, troubleshooting, contact support, knowledge base",
    category: "Support",
    url: "support",
    page: "Support",
    keywords: ["support", "help", "assistance", "contact", "troubleshooting"],
    priority: 8,
  },

  // Company
  {
    id: "about",
    title: "About Us - Our Mission",
    description: "Learn about the team behind Quant Edge",
    content: "Our mission is to democratize quantitative trading by providing institutional-grade tools to everyone",
    category: "Company",
    url: "about",
    page: "About",
    keywords: ["about", "mission", "team", "company", "vision"],
    priority: 7,
  },
  {
    id: "careers",
    title: "Careers - Join Our Team",
    description: "Explore career opportunities at Quant Edge",
    content: "Join our team of engineers, traders, and designers. Remote positions available",
    category: "Company",
    url: "careers",
    page: "Careers",
    keywords: ["careers", "jobs", "hiring", "positions", "work", "employment"],
    priority: 6,
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with our team",
    content: "Email, phone, live chat support. Response within 24 hours",
    category: "Company",
    url: "contact",
    page: "Contact",
    keywords: ["contact", "email", "phone", "support", "reach"],
    priority: 7,
  },

  // Legal
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Platform terms of service and user agreement",
    content: "Terms of service, user agreement, acceptable use policy, platform rules",
    category: "Legal",
    url: "terms",
    page: "Terms & Conditions",
    keywords: ["terms", "conditions", "legal", "agreement", "policy"],
    priority: 5,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    content: "Data collection, usage, storage, protection, GDPR compliance, user rights",
    category: "Legal",
    url: "privacy",
    page: "Privacy Policy",
    keywords: ["privacy", "data", "GDPR", "protection", "personal information"],
    priority: 6,
  },
  {
    id: "security",
    title: "Security - Enterprise-Grade Protection",
    description: "Learn about our security infrastructure",
    content: "256-bit encryption, SOC 2 compliance, penetration testing, DDoS protection, security audits",
    category: "Legal",
    url: "security",
    page: "Security",
    keywords: ["security", "encryption", "SOC 2", "compliance", "protection"],
    priority: 7,
  },

  // Product Updates
  {
    id: "roadmap",
    title: "Product Roadmap",
    description: "See what we're building next",
    content: "Upcoming features, community requests, feature voting, development timeline",
    category: "Product",
    url: "roadmap",
    page: "Roadmap",
    keywords: ["roadmap", "upcoming", "features", "future", "plans"],
    priority: 7,
  },
  {
    id: "release-notes",
    title: "Release Notes & Changelog",
    description: "Latest platform updates and improvements",
    content: "Version history, new features, improvements, bug fixes, platform updates",
    category: "Product",
    url: "release-notes",
    page: "Release Notes",
    keywords: ["release notes", "changelog", "updates", "versions", "new features"],
    priority: 6,
  },

  // Blog (Sample posts - expand with actual blog data)
  {
    id: "blog",
    title: "Blog - Trading Insights & Updates",
    description: "Latest articles on algorithmic trading and market analysis",
    content: "Trading strategies, market insights, platform updates, tutorials, case studies",
    category: "Blog",
    url: "blog",
    page: "Blog",
    keywords: ["blog", "articles", "insights", "news", "updates"],
    priority: 7,
  },
  {
    id: "testimonials",
    title: "Customer Testimonials",
    description: "See what our users say about Quant Edge",
    content: "User reviews, success stories, case studies, customer feedback",
    category: "Company",
    url: "testimonials",
    page: "Testimonials",
    keywords: ["testimonials", "reviews", "feedback", "customers", "success"],
    priority: 6,
  },
];

// Helper function to get all unique categories
export const getSearchCategories = (): string[] => {
  return Array.from(new Set(SEARCH_INDEX.map(item => item.category)));
};

// Helper function to get items by category
export const getItemsByCategory = (category: string): SearchItem[] => {
  return SEARCH_INDEX.filter(item => item.category === category);
};
