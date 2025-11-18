import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ArrowRight, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  // Real-time email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const isValidEmail = email && validateEmail(email) && !emailError;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-[380px]">
          {!isSubmitted ? (
            // Form State
            <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 shadow-2xl shadow-[#00FF88]/10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl mb-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                  Forgot Password?
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter your email to reset password
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-all text-white ${
                        emailError 
                          ? "border-red-500/50 focus:border-red-500" 
                          : "border-white/10 focus:border-[#00FF88]/50"
                      }`}
                      placeholder="user@example.com"
                      autoFocus
                      required
                    />
                  </div>
                  {emailError && (
                    <p className="mt-2 text-sm text-red-400 animate-in slide-in-from-top-1 duration-200">
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValidEmail || isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => handleNavigation("login")}
                  className="text-sm text-gray-400 hover:text-[#00FF88] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            // Success State
            <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 shadow-2xl shadow-[#00FF88]/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Success Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30">
                <CheckCircle2 size={32} className="text-[#00FF88]" />
              </div>

              {/* Success Message */}
              <h2 className="text-2xl mb-3 text-white">
                Check your email
              </h2>
              <p className="text-gray-300 mb-2">
                If this email exists, we've sent reset instructions.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                The link will expire in 15 minutes.
              </p>

              {/* Additional Info */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
                <p className="text-xs text-gray-400">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#00FF88] hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>

              {/* Back to Login */}
              <button
                onClick={() => handleNavigation("login")}
                className="text-sm text-gray-400 hover:text-[#00FF88] transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}