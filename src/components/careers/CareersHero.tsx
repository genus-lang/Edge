import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function CareersHero() {
  const scrollToJobs = () => {
    const jobsSection = document.getElementById("open-positions");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Build the Future of Algorithmic Trading With Us
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              We're a team of engineers, product thinkers, quants, and creators — on a mission to make algorithmic trading accessible to everyone.
            </p>

            <Button
              size="lg"
              onClick={scrollToJobs}
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group text-lg px-8 py-6"
            >
              <Rocket className="mr-2 group-hover:scale-110 transition-transform" size={24} />
              View Open Positions
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-2xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
