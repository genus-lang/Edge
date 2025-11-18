import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00C8FF]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <Mail className="mx-auto mb-6 text-[#00FF88]" size={48} />
            <h2 className="text-3xl md:text-4xl mb-4">
              Want trading insights delivered weekly?
            </h2>
            <p className="text-gray-400 mb-8">
              Join 10,000+ traders getting expert analysis, strategy breakdowns, and platform
              updates every week.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-lg shadow-[#00FF88]/30"
                >
                  📩 Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
