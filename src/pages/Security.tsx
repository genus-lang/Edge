import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { SecurityHero } from "../components/security/SecurityHero";
import { SecurityFeature } from "../components/security/SecurityFeature";
import { BugBountyCard } from "../components/security/BugBountyCard";
import { Shield, Lock, Eye, Server, RefreshCw, Bug } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function Security() {
  const handleNavigation = (page: "compliance") => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <SecurityHero />

      {/* Data Encryption Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <SecurityFeature
            icon={Lock}
            title="Data Encryption — End-to-End Protection"
            description="All sensitive information is encrypted both at rest and in transit using modern cryptography protocols."
            features={[
              "AES-256 encryption for stored data",
              "TLS 1.2+ for encrypted network connections",
              "Secure key vault storage with role-based access control",
              "Automatic encryption of logs containing sensitive info",
            ]}
            trustNote={
              <>
                <strong>No sensitive data</strong> — including API keys — is ever
                stored in plain text.
              </>
            }
          />
        </div>
      </section>

      {/* DDoS Protection Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SecurityFeature
            icon={Shield}
            title="Resilience Against Attacks"
            description={`${SITE_CONFIG.name} infrastructure is designed for high availability and protection against malicious traffic.`}
            features={[
              "Multi-layer DDoS mitigation",
              "Real-time anomaly detection",
              "Bot traffic filtering & rate limiting",
              "Global CDN edge protection",
            ]}
            link={{
              text: "📈 View System Status",
              href: "#status",
            }}
          />
        </div>
      </section>

      {/* API Key Safety Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-5xl mx-auto">
          <SecurityFeature
            icon={Lock}
            title="Your Keys, Your Control"
            description="Trading keys remain fully in your control — you can revoke them anytime directly from your broker/exchange."
            features={[
              "API keys are encrypted using hardware-backed key vaults",
              "Never exposed in logs or internal dashboards",
              "No withdrawal permissions required — trade only",
              "Automatic detection of expired or compromised keys",
            ]}
            trustNote={
              <>
                You maintain <strong>100% ownership</strong> of your brokerage
                accounts.
              </>
            }
          />
        </div>
      </section>

      {/* Multi-Factor Authentication Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SecurityFeature
            icon={Eye}
            title="Account Security You Control"
            description="Add an extra layer of protection using 2-Factor Authentication (2FA) with authenticator apps."
            features={[
              "One-tap enable/disable from Security Settings",
              "Compatible with Google Authenticator & Authy",
              "Device management & login history dashboard",
            ]}
          />
        </div>
      </section>

      {/* Bug Bounty Section */}
      <BugBountyCard />

      {/* Final Reassurance Statement */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-2xl p-12">
            <Lock size={48} className="text-[#00FF88] mx-auto mb-6" />
            
            <p className="text-3xl md:text-4xl mb-8 leading-relaxed">
              Security is not a feature —{" "}
              <span className="text-[#00FF88]">it's the foundation</span> of {SITE_CONFIG.name}.
            </p>

            <button
              onClick={() => handleNavigation("compliance")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 group"
            >
              View Legal & Compliance Page
              <RefreshCw
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}