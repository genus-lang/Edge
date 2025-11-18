import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function Signup() {
  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-20 pb-12">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Start Trading with {SITE_CONFIG.name}
            </h1>
            <p className="text-gray-400">Create your account and get started for free</p>
          </div>

          {/* Signup Form */}
          <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm mb-2 text-gray-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 rounded border-white/10 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/50"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => handleNavigation("terms")}
                    className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => handleNavigation("privacy")}
                    className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => handleNavigation("login")}
                  className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
