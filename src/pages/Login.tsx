import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ArrowRight, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { useState } from "react";
import { signIn } from "../lib/auth";
import { useRedirectIfAuthenticated } from "../hooks/useAuth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useRedirectIfAuthenticated();

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Call Supabase login
    const result = await signIn({
      email: email.trim(),
      password,
    });

    if (!result.success) {
      setError(result.error || "Invalid email or password");
      setIsLoading(false);
      return;
    }

    // Check if 2FA is enabled
    if (result.data.profile?.is_2fa_enabled) {
      // Navigate to OTP verification
      handleNavigation("otp-verification");
      return;
    }

    // Check if user needs onboarding
    if (!result.data.profile?.has_seen_onboarding) {
      handleNavigation("onboarding");
      return;
    }

    // Navigate to dashboard
    handleNavigation("home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-20">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Welcome Back to {SITE_CONFIG.name}
            </h1>
            <p className="text-gray-400">Sign in to continue to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/10 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/50"
                    disabled={isLoading}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => handleNavigation("forgot-password")}
                  className="text-sm text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => handleNavigation("signup")}
                  className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                  disabled={isLoading}
                >
                  Sign up
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
