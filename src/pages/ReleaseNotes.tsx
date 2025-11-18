import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { VersionCard } from "../components/release-notes/VersionCard";
import { Bell, FileText, ArrowRight, Rss, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function ReleaseNotes() {
  const versions = [
    {
      version: "1.2",
      date: "January 2025",
      newFeatures: [
        { text: "Added Live Trading Logs for open positions" },
        { text: "Introduced Smart Stop-Loss Trailing System" },
      ],
      improvements: [
        { text: "Enhanced Backtest Speed by 32%" },
        { text: "Improved performance for multi-chart dashboard" },
      ],
      fixes: [
        { text: "Resolved minor UI bugs in Strategy Builder" },
        { text: "Fixed login token expiration refresh issue" },
      ],
    },
    {
      version: "1.1",
      date: "November 2024",
      newFeatures: [
        { text: "Launched AI Hyperparameter Optimizer" },
      ],
      improvements: [
        { text: "Improved Portfolio Analytics Heatmap" },
      ],
      fixes: [
        { text: "Fixed strategy import bug for JS scripts" },
      ],
    },
    {
      version: "1.0",
      date: "September 2024",
      isLaunch: true,
      launchItems: [
        "Public release of platform",
        "Backtesting engine",
        "Paper trading mode",
        "Strategy Builder V1",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            {SITE_CONFIG.name} Release Notes & Platform Updates
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-10">
            Follow the latest improvements, fixes, and new features — updated
            continuously as the platform evolves.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Bell size={20} />
              Subscribe to Updates
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-[#00FF88]/50 text-white rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto group">
              <FileText size={20} />
              View API Changes
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF88]/50 via-[#00C8FF]/50 to-transparent" />

          {/* Version Cards */}
          <div className="space-y-12">
            {versions.map((versionData, index) => (
              <div
                key={index}
                className="opacity-0 animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <VersionCard {...versionData} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl mb-4 flex items-center gap-3">
              🚀 Upcoming Features
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Live paper trading simulator improvements and brokerage integrations
              coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Deprecations Notice */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl mb-4 flex items-center gap-3 text-yellow-400">
              ⚠️ Deprecations Notice
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              <strong className="text-yellow-400">Legacy API v0</strong> will
              sunset in June 2025 — migrate to API v1.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-8">
            Want to track updates automatically?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto group">
              <Rss size={20} />
              Subscribe to Changelog RSS
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-[#00C8FF]/50 text-white rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto group">
              <MessageCircle size={20} />
              Join Discord Community
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}