import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getUserProfile } from "../lib/auth";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Auth Callback Page
 * 
 * This page handles:
 * 1. Email verification callbacks
 * 2. OAuth callbacks (Google, GitHub, etc.)
 * 3. Password reset callbacks
 * 
 * It processes the auth token from the URL and redirects appropriately
 */

type CallbackStatus = "loading" | "success" | "error";

export function AuthCallback() {
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          setStatus("error");
          setMessage("Failed to verify email. Please try again.");
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            if ((window as any).navigateTo) {
              (window as any).navigateTo('login');
            }
          }, 3000);
          return;
        }

        if (!session) {
          setStatus("error");
          setMessage("No session found. Please try signing in again.");
          
          setTimeout(() => {
            if ((window as any).navigateTo) {
              (window as any).navigateTo('login');
            }
          }, 3000);
          return;
        }

        // Email is now verified!
        setStatus("success");
        setMessage("Email verified successfully!");

        // Get user profile to check onboarding status
        const profile = await getUserProfile(session.user.id);

        // Wait 2 seconds to show success message
        setTimeout(() => {
          if (!profile) {
            // No profile yet - shouldn't happen, but handle gracefully
            if ((window as any).navigateTo) {
              (window as any).navigateTo('home');
            }
            return;
          }

          // Check if user needs onboarding
          if (!profile.has_seen_onboarding) {
            setMessage("Redirecting to onboarding...");
            setTimeout(() => {
              if ((window as any).navigateTo) {
                (window as any).navigateTo('onboarding');
              }
            }, 1000);
          } else {
            setMessage("Redirecting to dashboard...");
            setTimeout(() => {
              if ((window as any).navigateTo) {
                (window as any).navigateTo('home');
              }
            }, 1000);
          }
        }, 2000);

      } catch (error) {
        console.error('Error in auth callback:', error);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
        
        setTimeout(() => {
          if ((window as any).navigateTo) {
            (window as any).navigateTo('login');
          }
        }, 3000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md">
        {status === "loading" && (
          <>
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/30">
              <div className="w-8 h-8 border-4 border-[#00C8FF]/30 border-t-[#00C8FF] rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl mb-3 text-white">
              Verifying Email
            </h2>
            <p className="text-gray-400">
              {message}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 animate-in zoom-in duration-500">
              <CheckCircle2 size={32} className="text-[#00FF88]" />
            </div>
            <h2 className="text-2xl mb-3 text-white animate-in fade-in slide-in-from-bottom-4 duration-500">
              Success!
            </h2>
            <p className="text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: "100ms" }}>
              {message}
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-2xl mb-3 text-white">
              Verification Failed
            </h2>
            <p className="text-gray-400 mb-6">
              {message}
            </p>
            <button
              onClick={() => {
                if ((window as any).navigateTo) {
                  (window as any).navigateTo('login');
                }
              }}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
