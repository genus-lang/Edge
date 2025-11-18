import { ArrowRight, BookOpen, Rocket } from "lucide-react";
import { Button } from "../ui/button";

export function TrustSection() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-8">
          We're committed to traders, technology, and transparency.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-2xl shadow-[#00FF88]/30 group"
          >
            <BookOpen className="mr-2" size={20} />
            Read Our Blog
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 hover:border-[#00FF88] hover:bg-[#00FF88]/10 transition-all group"
          >
            <Rocket className="mr-2" size={20} />
            Explore the Platform
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Join 50,000+ traders building the future of algorithmic trading
        </p>
      </div>
    </section>
  );
}
