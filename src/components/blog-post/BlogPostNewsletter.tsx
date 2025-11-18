import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";

export function BlogPostNewsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <section className="px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl border border-white/10 p-8 md:p-12">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88]/5 to-[#00C8FF]/5 rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-[#00FF88]" size={32} />
              <h3 className="text-2xl md:text-3xl">Stay Ahead of the Market</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Get weekly insights on algorithmic trading, AI strategies & market research.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="📧 Enter your email…"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
              />
              
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity group"
                >
                  Subscribe
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
