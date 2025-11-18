import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ArrowRight, Eye, EyeOff, CheckCircle2, Lock, Check, X } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleNavigation = (page: string) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  // Password strength calculation
  const calculatePasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength++;

    if (strength <= 2) return { strength: 33, label: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { strength: 66, label: "Medium", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-[#00FF88]" };
  };

  const passwordStrength = calculatePasswordStrength(password);

  // Password validation rules
  const validationRules = [
    { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { label: "1 uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: "1 lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: "1 number", test: (pwd: string) => /\d/.test(pwd) },
    { label: "1 special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (password && value !== password) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (passwordStrength.strength < 100) {
      setPasswordError("Password is not strong enough");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      // Shake animation
      const confirmInput = document.getElementById("confirm-password");
      confirmInput?.classList.add("animate-shake");
      setTimeout(() => confirmInput?.classList.remove("animate-shake"), 500);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const isFormValid = 
    password &&
    confirmPassword &&
    password === confirmPassword &&
    passwordStrength.strength === 100 &&
    !confirmError;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-[400px]">
          {!isSuccess ? (
            // Form State
            <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 shadow-2xl shadow-[#00FF88]/10">
              {/* Lock Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center">
                  <Lock size={24} className="text-[#00FF88]" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl mb-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                  Reset Password
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter your new password below
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2 text-gray-300">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none transition-all text-white ${
                        passwordError
                          ? "border-red-500/50"
                          : "border-white/10 focus:border-[#00FF88]/50"
                      }`}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Password Strength</span>
                        <span className={`font-medium ${
                          passwordStrength.label === "Weak" ? "text-red-400" :
                          passwordStrength.label === "Medium" ? "text-yellow-400" :
                          "text-[#00FF88]"
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Validation Rules */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      {validationRules.map((rule, index) => {
                        const isValid = rule.test(password);
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs transition-colors"
                          >
                            {isValid ? (
                              <Check size={14} className="text-[#00FF88]" />
                            ) : (
                              <X size={14} className="text-gray-600" />
                            )}
                            <span className={isValid ? "text-gray-300" : "text-gray-500"}>
                              {rule.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirm-password" className="block text-sm mb-2 text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className={`w-full px-4 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none transition-all text-white ${
                        confirmError
                          ? "border-red-500/50"
                          : "border-white/10 focus:border-[#00FF88]/50"
                      }`}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {confirmError && (
                    <p className="mt-2 text-sm text-red-400 animate-in slide-in-from-top-1 duration-200">
                      {confirmError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Security Note */}
              <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-xs text-gray-400 text-center">
                  🔒 Your password is encrypted and secure. Reset link expires after 15 minutes.
                </p>
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
                Password Reset Successfully
              </h2>
              <p className="text-gray-300 mb-8">
                You can now log in with your new password.
              </p>

              {/* Go to Login Button */}
              <button
                onClick={() => handleNavigation("login")}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Go to Login
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>

      <Footer />
    </div>
  );
}
