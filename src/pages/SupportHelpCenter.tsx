import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { SupportHero } from "../components/support/SupportHero";
import { CategoryCard } from "../components/support/CategoryCard";
import { HelpArticleCard } from "../components/support/HelpArticleCard";
import { QuickHelpLinks } from "../components/support/QuickHelpLinks";
import { SupportCTA } from "../components/support/SupportCTA";
import {
  Rocket,
  Settings,
  BarChart3,
  Brain,
  CreditCard,
  Puzzle,
  Shield,
} from "lucide-react";

export function SupportHelpCenter() {
  const categories = [
    {
      icon: Rocket,
      title: "Getting Started",
      topics: ["Create account", "First backtest", "Dashboard walkthrough"],
    },
    {
      icon: Settings,
      title: "Live Trading & Brokers",
      topics: ["Connect broker", "API keys", "Order execution issues"],
    },
    {
      icon: BarChart3,
      title: "Backtesting & Data",
      topics: ["Timeframes", "Data quality", "Execution simulation"],
    },
    {
      icon: Brain,
      title: "AI & Optimization",
      topics: ["Auto-optimization", "Hyperparameters", "Fitness scoring"],
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      topics: ["Subscription plans", "Refunds", "Payment errors"],
    },
    {
      icon: Puzzle,
      title: "Strategy Tools",
      topics: ["Indicators", "Code editor", "Marketplace"],
    },
    {
      icon: Shield,
      title: "Security",
      topics: ["2FA", "API key encryption", "Account safety"],
    },
  ];

  const popularArticles = [
    {
      emoji: "🔹",
      title: "How to start backtesting",
      description:
        "Learn how to run your first strategy simulation in less than 2 minutes.",
    },
    {
      emoji: "🔹",
      title: "How to connect your broker",
      description:
        "Step-by-step walkthrough for linking API keys and enabling live trading.",
    },
    {
      emoji: "🔹",
      title: "How to resolve billing issues",
      description:
        "Update payment details, cancel plans, and request refunds.",
    },
    {
      emoji: "🔹",
      title: "How to use AI Optimization",
      description:
        "Guide to running hyperparameter optimization to improve strategy performance.",
    },
    {
      emoji: "🔹",
      title: "Understanding data quality",
      description:
        "Learn about historical data sources, accuracy, and how to validate your backtests.",
    },
    {
      emoji: "🔹",
      title: "Security best practices",
      description:
        "Protect your account with 2FA, secure API keys, and safe trading practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <SupportHero />

      {/* Categories Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16">
            Popular Help Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <HelpArticleCard key={index} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Links */}
      <QuickHelpLinks />

      {/* Support CTA */}
      <SupportCTA />

      <Footer />
    </div>
  );
}
