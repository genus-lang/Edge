import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ComplianceHero } from "../components/compliance/ComplianceHero";
import { ComplianceBadge } from "../components/compliance/ComplianceBadge";
import { SecurityAuditTable } from "../components/compliance/SecurityAuditTable";
import { VendorLogos } from "../components/compliance/VendorLogos";
import { Shield, FileCheck, Lock, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function LegalCompliance() {
  const complianceItems = [
    {
      icon: "📌",
      title: "GDPR",
      description:
        "Fully compliant with EU General Data Protection Regulation",
    },
    {
      icon: "📌",
      title: "SOC 2",
      description: "Infrastructure and processes follow SOC 2 criteria",
    },
    {
      icon: "📌",
      title: "ISO 27001",
      description: "Platform built on ISO-certified cloud systems",
    },
    {
      icon: "📌",
      title: "PCI DSS",
      description: "Payment processing executed via PCI certified providers",
    },
    {
      icon: "📌",
      title: "KYC/AML",
      description:
        "Required identity checks applied for enterprise clients (where applicable)",
    },
  ];

  const securityAudits = [
    {
      system: "Penetration testing",
      status: "Performed annually by independent cybersecurity firms",
    },
    {
      system: "Vulnerability assessments",
      status: "Performed quarterly",
    },
    {
      system: "Security logging",
      status: "Real-time intrusion monitoring",
    },
    {
      system: "Cloud infrastructure",
      status: "Hosted on secure Tier-4 global datacenters",
    },
    {
      system: "Encryption",
      status: "AES-256 at rest · TLS 1.2+ in transit",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <ComplianceHero />

      {/* Regulatory Compliance Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Regulatory Frameworks We Align With
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
            Our platform adheres to globally recognized compliance standards to
            protect your data and ensure operational integrity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {complianceItems.map((item, index) => (
              <ComplianceBadge key={index} {...item} />
            ))}
          </div>

          <p className="text-sm text-gray-500 text-center italic">
            Certain compliance requirements may apply based on regional services
            and integrations.
          </p>
        </div>
      </section>

      {/* Licensing & Trading Disclaimer */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-8">
            Licensing for Brokerage & Trading Operations
          </h2>

          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {SITE_CONFIG.name} is a software platform providing tools for research,
              automation, and execution of strategies via broker and exchange
              integrations.{" "}
              <span className="text-[#00FF88]">
                {SITE_CONFIG.name} is not a licensed broker
              </span>{" "}
              and does not provide investment advice. Trading execution is
              handled exclusively by third-party brokers/exchanges connected via
              API.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#00C8FF] flex-shrink-0 mt-1"
                />
                <p className="text-gray-300">
                  Users maintain full ownership of brokerage accounts
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#00C8FF] flex-shrink-0 mt-1"
                />
                <p className="text-gray-300">
                  API usage is secure, encrypted, and revocable anytime
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[#00C8FF] flex-shrink-0 mt-1"
                />
                <p className="text-gray-300">
                  Order execution responsibility lies with the connected
                  broker/exchange
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Audits & Infrastructure */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Security, Testing & Audits
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Regular security assessments and enterprise-grade infrastructure
            protection
          </p>

          <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl overflow-hidden">
            <SecurityAuditTable audits={securityAudits} />
          </div>

          <p className="text-sm text-gray-500 text-center mt-8 italic">
            Security documentation available to enterprise clients under NDA.
          </p>
        </div>
      </section>

      {/* Vendor & Third-Party Certifications */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Our Trusted Service Providers
          </h2>
          <p className="text-center text-gray-400 mb-12">
            We verify compliance and security certifications of all external
            vendors we integrate with.
          </p>

          <VendorLogos />
        </div>
      </section>

      {/* Final Accountability Statement & CTA */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-2xl p-12">
            <Shield size={48} className="text-[#00FF88] mx-auto mb-6" />
            
            <p className="text-2xl md:text-3xl mb-8 leading-relaxed">
              Our goal is simple — to provide traders a{" "}
              <span className="text-[#00FF88]">secure and transparent</span>{" "}
              automation platform designed with{" "}
              <span className="text-[#00C8FF]">trust</span> at its center.
            </p>

            <a
              href="#security"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 group"
            >
              View Security Page
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}