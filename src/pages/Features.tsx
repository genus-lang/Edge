import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { FeaturesHero } from "../components/features/FeaturesHero";
import { FeatureSection } from "../components/features/FeatureSection";
import { FeaturesCTA } from "../components/features/FeaturesCTA";
import { Brain, Zap, Shield, TrendingUp, Code2, Clock, Boxes, Settings } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function Features() {
  const features = [
    {
      title: "Backtesting Engine — Built for Speed",
      description:
        "Run simulations across 10+ years of historical market data and instantly see how your strategy would have performed.",
      bullets: [
        "Tick & minute-level granularity",
        "Market regimes & volatility analysis",
        "Equity, crypto, forex, futures & more",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXRhfGVufDF8fHx8MTc2MzQxOTQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      imageAlt: "Backtesting Dashboard",
      reverse: false,
    },
    {
      title: "Live Trading — Fully Automated Execution",
      description:
        "Connect brokers & exchanges to execute trades automatically with smart routing, safety checks, and real-time reporting.",
      bullets: [
        "Supports 30+ global brokers & CEX/DEX",
        "Smart position sizing & order splitting",
        "Auto–stop execution on risk triggers",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1619886943257-c85eedd51cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwZXhjaGFuZ2V8ZW58MXx8fHwxNzYzNDE1NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      imageAlt: "Live Trading Dashboard",
      reverse: true,
    },
    {
      title: "Build Strategies Visually — or with Python/JS",
      description:
        "Create rule-based strategies using drag-and-drop or write custom indicators & scripts with full flexibility.",
      bullets: [
        "Drag-and-drop blocks with 100+ indicators",
        "Python & JavaScript editor",
        "Debug with metrics in real-time",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1625459201773-9b2386f53ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwc29mdHdhcmV8ZW58MXx8fHwxNzYzNDQ5NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      imageAlt: "Strategy Builder Interface",
      reverse: false,
    },
    {
      title: "Risk Analytics — Trade With Confidence",
      description:
        `${SITE_CONFIG.name} helps you monitor risk and protect capital using institutional-grade controls and portfolio safeguards.`,
      bullets: [
        "Drawdown & VaR tracking",
        "Volatility & stress testing",
        "Smart stop-loss & trailing logic",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1762884613665-43e760bb15b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNrJTIwZmluYW5jZXxlbnwxfHx8fDE3NjM0NDk2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      imageAlt: "Risk Analytics Dashboard",
      reverse: true,
    },
    {
      title: "AI Optimization — Let AI Search the Best Parameters",
      description:
        `Stop guessing parameters — ${SITE_CONFIG.name} automatically finds high-performance configurations using hyperparameter optimization.`,
      bullets: [
        "Genetic & Bayesian search",
        "Multi-metric fitness scoring",
        "Fully automated optimization loops",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2MzQyOTc2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      imageAlt: "AI Optimization Interface",
      reverse: false,
    },
    {
      title: "Portfolio Tracking — All Markets, One Dashboard",
      description:
        "Track P&L, asset allocation, exposure, and risk across all strategies and accounts in one unified dashboard.",
      bullets: [
        "Advanced analytics & heatmaps",
        "Broker/exchange sync",
        "Real-time profit tracking",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1618044733300-9472054094ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYzNDQ5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      imageAlt: "Portfolio Dashboard",
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <FeaturesHero />
      
      {/* Feature Sections */}
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          title={feature.title}
          description={feature.description}
          bullets={feature.bullets}
          imageUrl={feature.imageUrl}
          imageAlt={feature.imageAlt}
          reverse={feature.reverse}
        />
      ))}

      <FeaturesCTA />
      <Footer />
    </div>
  );
}