import { AlertCircle, ExternalLink, FileCode2 } from "lucide-react";
import { useState, useEffect } from "react";
import { isSupabaseConfigured } from "../lib/supabase.config";

/**
 * SupabaseSetupWarning Component
 * 
 * Shows a dismissible warning when Supabase is not configured.
 * Helps developers quickly set up authentication.
 */

export function SupabaseSetupWarning() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    // Check if user has dismissed the warning
    const dismissed = localStorage.getItem('supabase-setup-warning-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('supabase-setup-warning-dismissed', 'true');
  };

  // Don't show if configured or dismissed
  if (isConfigured || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <AlertCircle className="text-yellow-500" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              Supabase Setup Required
            </h3>
            <p className="text-sm text-gray-300">
              Authentication is not configured yet
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400">1.</span>
            <span className="text-gray-300">
              Create account at{" "}
              <a 
                href="https://supabase.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00FF88] hover:text-[#00C8FF] transition-colors inline-flex items-center gap-1"
              >
                supabase.com
                <ExternalLink size={12} />
              </a>
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400">2.</span>
            <span className="text-gray-300">Copy credentials from Settings → API</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400">3.</span>
            <span className="text-gray-300">
              Update{" "}
              <code className="px-1 py-0.5 bg-white/10 rounded text-[#00FF88]">
                /lib/supabase.config.ts
              </code>
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400">4.</span>
            <span className="text-gray-300">Save the file</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href="https://app.supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-[#00FF88] text-black rounded-lg hover:bg-[#00C8FF] transition-colors text-sm font-medium text-center"
          >
            Go to Supabase
          </a>
          <button
            onClick={() => {
              // Try to open the implementation steps file
              console.log('📖 Setup Instructions: See /IMPLEMENTATION_STEPS.md');
              alert('Setup instructions are in:\n\n/IMPLEMENTATION_STEPS.md\n/docs/SUPABASE_INTEGRATION_GUIDE.md\n\nCheck your project files or console for details.');
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
          >
            View Docs
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400">
            Edit <code className="text-[#00FF88]">/lib/supabase.config.ts</code> with your credentials
          </p>
        </div>
      </div>
    </div>
  );
}
