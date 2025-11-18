import { Star } from "lucide-react";

export function TestimonialsHero() {
  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Trusted by Traders Around the World
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          From beginners to hedge funds — Quant helps traders build smarter, data-driven strategies with confidence.
        </p>

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/20 rounded-full">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className="fill-[#00FF88] text-[#00FF88]"
              />
            ))}
          </div>
          <span className="text-white">Rated 4.9/5 based on 2,300+ verified reviews</span>
        </div>
      </div>
    </section>
  );
}
