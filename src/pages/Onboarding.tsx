import { useState } from "react";
import { ArrowRight, ArrowLeft, TrendingUp, BarChart3, Activity, Zap, LayoutDashboard, X } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

const onboardingSteps = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Create a Strategy",
    subtitle: "Build your own trading strategy in minutes — no coding needed.",
    description: "Use our visual strategy builder or write custom code. Backtest on historical data instantly.",
    color: "from-[#00FF88] to-[#00C8FF]",
  },
  {
    id: 2,
    icon: BarChart3,
    title: "Run Backtest",
    subtitle: "Test your strategy on 10+ years of market data instantly.",
    description: "Analyze performance across different market conditions. Get detailed metrics and visualizations.",
    color: "from-[#00C8FF] to-purple-500",
  },
  {
    id: 3,
    icon: Activity,
    title: "Analyze Results",
    subtitle: "Review P&L, risk metrics, win rate, drawdown and KPIs.",
    description: "Understand your strategy's strengths and weaknesses. Optimize parameters for better performance.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    icon: Zap,
    title: "Deploy for Live Trading",
    subtitle: "Connect to your broker and trade securely — fully automated.",
    description: "Execute trades automatically based on your strategy. Monitor performance in real-time.",
    color: "from-pink-500 to-[#00FF88]",
  },
  {
    id: 5,
    icon: LayoutDashboard,
    title: "Start Exploring Dashboard",
    subtitle: "Get real-time data, AI predictions and sentiment in one place.",
    description: "Access powerful analytics, market insights, and portfolio management tools.",
    color: "from-[#00FF88] to-[#00C8FF]",
  },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  const goToNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setDirection("forward");
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - go to dashboard
      handleNavigation("dashboard");
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    handleNavigation("dashboard");
  };

  const step = onboardingSteps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00FF88]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00C8FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Skip Button */}
      <button
        onClick={skipOnboarding}
        className="absolute top-6 right-6 z-50 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
      >
        Skip
        <X size={16} className="group-hover:rotate-90 transition-transform" />
      </button>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 py-12">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88] to-[#00C8FF] rounded-lg flex items-center justify-center">
              <span className="text-black">Q</span>
            </div>
            <span className="text-xl">{SITE_CONFIG.name}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mb-12">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentStep ? "forward" : "backward");
                  setCurrentStep(index);
                }}
                className="group"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-12 bg-gradient-to-r " + step.color
                      : index < currentStep
                      ? "w-2 bg-[#00FF88]/50"
                      : "w-2 bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Step Content with Animation */}
          <div
            key={currentStep}
            className={`animate-in fade-in ${
              direction === "forward" ? "slide-in-from-right-10" : "slide-in-from-left-10"
            } duration-500`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 animate-in zoom-in duration-700`}>
                <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                  <StepIcon size={48} className="text-white" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {step.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {step.subtitle}
              </p>
              <p className="text-gray-400">
                {step.description}
              </p>
            </div>

            {/* Illustration Preview (Mock) */}
            <div className="mb-12">
              <div className="relative max-w-3xl mx-auto">
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${step.color} p-1`}>
                  <div className="w-full h-full bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <StepIcon size={64} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-600 text-sm">
                        {step.title} Preview
                      </p>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} blur-3xl opacity-20 -z-10`} />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Back Button */}
            <button
              onClick={goToPrevious}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-lg border transition-all flex items-center gap-2 ${
                currentStep === 0
                  ? "opacity-0 pointer-events-none"
                  : "border-white/20 hover:border-white/40 text-gray-300 hover:text-white"
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>

            {/* Step Counter */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {onboardingSteps.length}
              </p>
            </div>

            {/* Next/Finish Button */}
            <button
              onClick={goToNext}
              className="px-8 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
            >
              {isLastStep ? "Go to Dashboard" : "Next"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Skip Link (Mobile) */}
          <div className="mt-8 text-center lg:hidden">
            <button
              onClick={skipOnboarding}
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Skip tutorial
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">←</kbd>
              <span>Previous</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">→</kbd>
              <span>Next</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">Esc</kbd>
              <span>Skip</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowRight') document.querySelector('[data-next]')?.click();
              if (e.key === 'ArrowLeft') document.querySelector('[data-prev]')?.click();
              if (e.key === 'Escape') document.querySelector('[data-skip]')?.click();
            });
          `,
        }}
      />
    </div>
  );
}