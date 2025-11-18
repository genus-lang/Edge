import { useState, useRef, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      setError("");
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate validation (in real app, check with backend)
      if (otpValue === "123456") {
        setIsSuccess(true);
      } else {
        setError("Invalid code. Please try again.");
        // Shake animation
        const container = document.getElementById("otp-container");
        container?.classList.add("animate-shake");
        setTimeout(() => container?.classList.remove("animate-shake"), 500);
        // Clear OTP
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setResendTimer(60);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
    
    // Show success toast (you can implement a toast component)
    console.log("OTP resent successfully");
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-[420px]">
          {!isSuccess ? (
            // OTP Form State
            <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 shadow-2xl shadow-[#00FF88]/10">
              {/* Shield Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30 flex items-center justify-center">
                  <Shield size={24} className="text-[#00C8FF]" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl mb-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                  Verify your identity
                </h1>
                <p className="text-gray-400 text-sm mb-2">
                  We've sent a 6-digit code to
                </p>
                <p className="text-white text-sm">
                  jo***@example.com
                </p>
              </div>

              {/* OTP Input Boxes */}
              <div id="otp-container" className="mb-6">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className={`w-12 h-14 text-center text-2xl bg-white/5 border rounded-lg focus:outline-none transition-all ${
                        error
                          ? "border-red-500/50"
                          : digit
                          ? "border-[#00FF88]/50 bg-[#00FF88]/5"
                          : "border-white/10 focus:border-[#00C8FF]/50"
                      }`}
                      autoComplete="off"
                    />
                  ))}
                </div>

                {error && (
                  <p className="mt-3 text-sm text-red-400 text-center animate-in slide-in-from-top-1 duration-200">
                    {error}
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!isOtpComplete || isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center space-y-3">
                {!canResend ? (
                  <p className="text-sm text-gray-400">
                    Resend OTP in{" "}
                    <span className="text-[#00C8FF] font-mono">{formatTime(resendTimer)}</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-[#00FF88] hover:text-[#00C8FF] transition-colors"
                  >
                    Resend OTP
                  </button>
                )}

                <button
                  onClick={() => handleNavigation("signup")}
                  className="block text-xs text-gray-500 hover:text-gray-400 transition-colors"
                >
                  Incorrect email/phone? Change
                </button>
              </div>

              {/* Helper Text */}
              <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-xs text-gray-400 text-center">
                  💡 Tip: You can paste the entire 6-digit code
                </p>
              </div>
            </div>
          ) : (
            // Success State
            <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 shadow-2xl shadow-[#00FF88]/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Success Icon with animation */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 animate-in zoom-in duration-500">
                <CheckCircle2 size={32} className="text-[#00FF88]" />
              </div>

              {/* Success Message */}
              <h2 className="text-2xl mb-3 text-white">
                Verification Successful
              </h2>
              <p className="text-gray-300 mb-8">
                Your identity has been verified successfully.
              </p>

              {/* Continue Button */}
              <button
                onClick={() => handleNavigation("onboarding")}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Shake Animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>

      <Footer />
    </div>
  );
}
