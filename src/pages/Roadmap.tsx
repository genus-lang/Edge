import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { RoadmapCard } from "../components/roadmap/RoadmapCard";
import { Lightbulb, Rocket, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function Roadmap() {
  const inProgress = [
    {
      title: "Strategy Marketplace",
      description: "Buy & sell strategies securely with escrow protection and verified seller badges.",
      eta: "Q1 2025",
      votes: 342,
    },
    {
      title: "Smart Drawdown Protection",
      description: "Auto risk limiter across strategies with real-time circuit breakers.",
      eta: "Q1 2025",
      votes: 287,
    },
    {
      title: "Broker Support: Interactive Brokers",
      description: "Full integration & portfolio sync with live order execution.",
      eta: "Q2 2025",
      votes: 521,
    },
  ];

  const comingSoon = [
    {
      title: "Paper Trading Mobile App",
      description: "Test strategies on the go with full mobile experience and push notifications.",
      eta: "Q2 2025",
      votes: 419,
    },
    {
      title: "Python Notebook Add-on",
      description: "Jupyter-style notebook environment for strategy development and analysis.",
      eta: "Q2 2025",
      votes: 358,
    },
    {
      title: "Multi-Asset Backtesting (Options + Futures)",
      description: "Expand backtesting engine to support derivatives and complex instruments.",
      eta: "Q3 2025",
      votes: 296,
    },
    {
      title: "AI Strategy Detection",
      description: "Auto insights & pattern recognition with machine learning-powered analysis.",
      eta: "Q3 2025",
      votes: 445,
    },
  ];

  const ideas = [
    {
      title: "Portfolio Social Sharing Feature",
      description: "Share your portfolio performance with privacy controls and anonymization options.",
      votes: 183,
      label: "Requested by users",
    },
    {
      title: "Community Backtest Leaderboards",
      description: "Compete with other traders and showcase top-performing strategies.",
      votes: 267,
      label: "Requested by users",
    },
    {
      title: "Auto-Hedging System",
      description: "Automated portfolio hedging based on market conditions and risk metrics.",
      votes: 312,
      label: "Requested by users",
    },
    {
      title: "Strategy Versioning & Git-Style History",
      description: "Track strategy changes over time with rollback and branching capabilities.",
      votes: 229,
      label: "Requested by users",
    },
  ];

  const recentlyLaunched = [
    "AI Hyperparameter Optimizer — Released Q1 2025",
    "Live Trading Logs — Released",
    "Backtest Engine v2 — Released",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            The Future of {SITE_CONFIG.name} — Built With You
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8">
            See what we're building, what's coming next, and what the community is
            requesting. Your ideas help shape the platform.
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 mb-4">
            <Lightbulb size={20} />
            Suggest a Feature
          </button>

          {/* Small Note */}
          <p className="text-sm text-gray-500 italic">
            Users can vote to influence priority — most upvoted items move to
            development faster.
          </p>
        </div>
      </section>

      {/* Roadmap Kanban Board */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: 3 Columns */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Column 1: In Progress */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-[#00FF88] rounded-full animate-pulse" />
                  <h2 className="text-2xl">In Progress</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Features the team is actively building now.
                </p>
              </div>
              <div className="space-y-4">
                {inProgress.map((item, index) => (
                  <RoadmapCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Column 2: Coming Soon */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-[#00C8FF] rounded-full animate-pulse" />
                  <h2 className="text-2xl">Coming Soon</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Approved items planned for upcoming releases.
                </p>
              </div>
              <div className="space-y-4">
                {comingSoon.map((item, index) => (
                  <RoadmapCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Column 3: Ideas / Suggestions */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <h2 className="text-2xl">Ideas / Suggestions</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Brainstorming box — newest proposals from the community.
                </p>
              </div>
              <div className="space-y-4">
                {ideas.map((item, index) => (
                  <RoadmapCard key={index} {...item} showComments />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-6 italic text-center">
                Most-voted ideas are promoted to "Coming Soon".
              </p>
            </div>
          </div>

          {/* Mobile/Tablet: Stacked Sections */}
          <div className="lg:hidden space-y-12">
            {/* In Progress */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-[#00FF88] rounded-full animate-pulse" />
                  <h2 className="text-2xl">In Progress</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Features the team is actively building now.
                </p>
              </div>
              <div className="space-y-4">
                {inProgress.map((item, index) => (
                  <RoadmapCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-[#00C8FF] rounded-full animate-pulse" />
                  <h2 className="text-2xl">Coming Soon</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Approved items planned for upcoming releases.
                </p>
              </div>
              <div className="space-y-4">
                {comingSoon.map((item, index) => (
                  <RoadmapCard key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Ideas */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <h2 className="text-2xl">Ideas / Suggestions</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Brainstorming box — newest proposals from the community.
                </p>
              </div>
              <div className="space-y-4">
                {ideas.map((item, index) => (
                  <RoadmapCard key={index} {...item} showComments />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-6 italic text-center">
                Most-voted ideas are promoted to "Coming Soon".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Suggestion Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-2xl p-10">
            <Lightbulb size={48} className="text-[#00FF88] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl mb-4">Got Something in Mind?</h2>
            <p className="text-gray-400 mb-6">
              Share your feature ideas and help shape the future of {SITE_CONFIG.name}
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105">
              <Lightbulb size={20} />
              Submit a Feature Request
            </button>
          </div>
        </div>
      </section>

      {/* Recently Launched Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12">
            Recently Launched
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyLaunched.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-[#00FF88]/30 transition-all duration-300"
              >
                <CheckCircle2
                  size={24}
                  className="text-[#00FF88] flex-shrink-0"
                />
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Beta Program */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#00C8FF]/10 to-purple-500/10 border border-[#00C8FF]/30 rounded-2xl p-12">
            <Rocket size={48} className="text-[#00C8FF] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl mb-4">
              Want Early Access to Beta Features?
            </h2>
            <p className="text-gray-400 mb-8">
              Join our beta program and get exclusive access to new features before
              they launch
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00C8FF] to-purple-500 text-black rounded-lg hover:shadow-2xl hover:shadow-[#00C8FF]/50 transition-all duration-300 hover:scale-105">
              <Rocket size={20} />
              Join the Beta Program
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}