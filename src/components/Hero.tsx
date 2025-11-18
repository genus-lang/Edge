import { ArrowRight, Check, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE_CONFIG } from "../config/site";

export function Hero() {
  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Build, Test & Trade Smart Strategies
              </h1>
              <p className="text-lg text-gray-400 max-w-xl">
                {SITE_CONFIG.name} empowers traders to automate strategies using AI, run lightning-fast
                backtests on historical data, and deploy live trades with confidence — without
                writing complex code.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => handleNavigation("signup")}
                className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group"
              >
                🚀 Start Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavigation("features")}
                className="border-white/20 hover:border-[#00FF88] hover:bg-[#00FF88]/10 transition-all"
              >
                🔍 Explore Features
              </Button>
            </div>

            {/* Micro Badges */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Check size={16} className="text-[#00FF88]" />
                <span>Free 10,000 backtests</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Flame size={16} className="text-[#00C8FF]" />
                <span>No credit card required</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Check size={16} className="text-[#00FF88]" />
              <span>Connect 50+ brokers & exchanges</span>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00FF88]/10 bg-gradient-to-br from-[#0A0A0A] to-black p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/20 via-transparent to-[#00C8FF]/20 opacity-50" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761587941453-bd1790225d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwY2hhcnQlMjBmaW5hbmNpYWx8ZW58MXx8fHwxNzYzNDAzMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt={`${SITE_CONFIG.name} Trading Dashboard`}
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-4 top-1/4 bg-black/80 backdrop-blur-xl border border-[#00FF88]/30 rounded-xl p-4 shadow-xl hidden lg:block">
              <div className="text-xs text-gray-400">P&L Today</div>
              <div className="text-xl text-[#00FF88]">+$12,458</div>
              <div className="text-xs text-gray-400">+24.5%</div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-black/80 backdrop-blur-xl border border-[#00C8FF]/30 rounded-xl p-4 shadow-xl hidden lg:block">
              <div className="text-xs text-gray-400">Win Rate</div>
              <div className="text-xl text-[#00C8FF]">87.3%</div>
              <div className="text-xs text-gray-400">Last 30 days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}