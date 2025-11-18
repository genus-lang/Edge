import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutHeader() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              We're Building the Future of Algorithmic Trading
            </h1>
            <p className="text-lg text-gray-400 max-w-xl">
              Quant is on a mission to make institutional-grade algorithmic trading accessible
              to every trader — from retail to professional hedge funds.
            </p>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00FF88]/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/20 via-transparent to-[#00C8FF]/20 opacity-50" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759844197486-5b3612c7d534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3NwYWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM0MDUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Quant Team"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
