import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ArrowRight, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { useState } from "react";
import { signUp } from "../lib/auth";
import { useRedirectIfAuthenticated } from "../hooks/useAuth";

export function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!agreedToTerms) {
      setError("Please accept the Terms & Conditions");
      return;
    }

    setIsLoading(true);

    // Call Supabase signup
    const result = await signUp({
      email: email.trim(),
      password,
      fullName: fullName.trim(),
    });

    if (!result.success) {
      setError(result.error || "Signup failed");
      setIsLoading(false);
      return;
    }

    // Store email for verification page
    sessionStorage.setItem('pendingVerificationEmail', email);
    
    // Navigate to email verification
    handleNavigation("email-verification");
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
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                />
              </div>

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
                  minLength={8}
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm mb-2 text-gray-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00FF88]/50 transition-colors text-white"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 rounded border-white/10 bg-white/5 text-[#00FF88] focus:ring-[#00FF88]/50"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => handleNavigation("terms")}
                    className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                    disabled={isLoading}
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => handleNavigation("privacy")}
                    className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                    disabled={isLoading}
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => handleNavigation("login")}
                  className="text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                  disabled={isLoading}
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