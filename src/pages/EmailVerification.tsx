import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { resendVerificationEmail } from "../lib/auth";

export function EmailVerification() {
  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [error, setError] = useState("");

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  // Get email from sessionStorage (set during signup)
  useEffect(() => {
    const pendingEmail = sessionStorage.getItem('pendingVerificationEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = async () => {
    if (!email) {
      setError("Email not found. Please try signing up again.");
      return;
    }

    setIsResending(true);
    setError("");
    
    // Call Supabase resend verification
    const result = await resendVerificationEmail(email);

    setIsResending(false);

    if (!result.success) {
      setError(result.error || "Failed to resend email");
      return;
    }

    setCanResend(false);
    setResendTimer(60);
    setShowSuccessToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mask email for display
  const maskedEmail = email ? email.replace(/(.{2})(.*)(?=@)/, '$1***') : 'your email';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className="bg-[#00FF88]/10 border border-[#00FF88]/50 rounded-lg px-4 py-3 flex items-center gap-3 shadow-xl">
            <CheckCircle2 size={20} className="text-[#00FF88]" />
            <p className="text-sm text-white">Verification link sent again!</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-[420px]">
          <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 shadow-2xl shadow-[#00FF88]/10 text-center">
            {/* Email Icon Illustration */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                {/* Envelope */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 border border-[#00FF88]/30 flex items-center justify-center">
                  <Mail size={40} className="text-[#00FF88]" />
                </div>
                {/* Checkmark Badge */}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#00C8FF] flex items-center justify-center border-2 border-black">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl mb-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Verify your email
              </h1>
              <p className="text-gray-300 mb-2">
                We sent a verification link to
              </p>
              <p className="text-white mb-4">
                {maskedEmail}
              </p>
              <p className="text-sm text-gray-400">
                Click the link in the email to continue
              </p>
            </div>

            {/* Helper Message */}
            <div className="bg-[#00C8FF]/5 border border-[#00C8FF]/30 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-300">
                💡 Didn't receive the email? Check your <span className="text-[#00C8FF]">Promotions</span>, <span className="text-[#00C8FF]">Updates</span>, or <span className="text-[#00C8FF]">Spam</span> folder.
              </p>
            </div>

            {/* Resend Button */}
            {!canResend ? (
              <button
                disabled
                className="w-full px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-lg cursor-not-allowed mb-4 flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Resend available in{" "}
                <span className="font-mono text-[#00C8FF]">{formatTime(resendTimer)}</span>
              </button>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 mb-4"
              >
                {isResending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw size={18} />
                    Resend Verification Email
                  </>
                )}
              </button>
            )}

            {/* Change Email Link */}
            <button
              onClick={() => handleNavigation("signup")}
              className="text-sm text-gray-400 hover:text-[#00FF88] transition-colors mb-6"
            >
              Incorrect email? Change
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0A0A0A] px-3 text-gray-500">or</span>
              </div>
            </div>

            {/* Back to Login */}
            <button
              onClick={() => handleNavigation("login")}
              className="text-sm text-gray-400 hover:text-[#00C8FF] transition-colors"
            >
              Back to Login
            </button>

            {/* Security Note */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500">
                🔒 Your email is secure and will not be shared with third parties.
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Need help?{" "}
              <button
                onClick={() => handleNavigation("support")}
                className="text-[#00FF88] hover:underline"
              >
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
