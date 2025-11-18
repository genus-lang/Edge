import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { LegalHero } from "../components/legal/LegalHero";
import { LegalSection } from "../components/legal/LegalSection";
import { LegalCTA } from "../components/legal/LegalCTA";
import { SITE_CONFIG } from "../config/site";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <LegalHero title="Privacy Policy" lastUpdated="January 2025" />

      <LegalContent>
        {/* Introduction */}
        <LegalSection title="Introduction" id="introduction">
          <p>
            This Privacy Policy explains how {SITE_CONFIG.name} ("the Platform", "we", "our",
            "us") collects, uses, stores, and protects personal data when you
            use our website, mobile apps, API services, and trading tools.
          </p>
          <p>
            By accessing the Platform, you agree to the practices described in
            this Policy.
          </p>
        </LegalSection>

        {/* 1. Information We Collect */}
        <LegalSection
          title="1. Information We Collect"
          id="information-we-collect"
        >
          <p>We may collect the following information:</p>

          <div className="mt-4">
            <h3 className="text-xl text-[#00C8FF] mb-2">
              a) Personal Information
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Account login credentials</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl text-[#00C8FF] mb-2">b) Trading Data</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Connected broker/exchange accounts</li>
              <li>Trading history & market execution data</li>
              <li>Strategy performance data</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl text-[#00C8FF] mb-2">
              c) Usage and Device Data
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Timezone & language settings</li>
              <li>App usage analytics</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl text-[#00C8FF] mb-2">
              d) Cookies & Tracking Technologies
            </h3>
            <p>We use cookies to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Maintain login sessions</li>
              <li>Improve platform experience</li>
              <li>Track performance and analytics</li>
            </ul>
            <p className="mt-4">
              You may disable cookies via browser settings but certain features
              may not work properly.
            </p>
          </div>
        </LegalSection>

        {/* 2. How We Use Your Data */}
        <LegalSection title="2. How We Use Your Data" id="how-we-use-data">
          <p>We use collected data to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide access to platform features</li>
            <li>Execute backtesting and live trading functions</li>
            <li>Improve security & fraud prevention</li>
            <li>Offer customer support</li>
            <li>Send product updates (optional)</li>
          </ul>
          <p className="mt-4 text-[#00FF88]">
            We do not sell your personal data under any circumstances.
          </p>
        </LegalSection>

        {/* 3. Legal Basis for Data Processing */}
        <LegalSection
          title="3. Legal Basis for Data Processing"
          id="legal-basis"
        >
          <p>Processing of personal information is based on:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>User consent</li>
            <li>Performance of service contract</li>
            <li>Compliance with financial regulations</li>
            <li>Legitimate interests in improving platform performance</li>
          </ul>
        </LegalSection>

        {/* 4. GDPR & Data Protection Rights */}
        <LegalSection
          title="4. GDPR & Data Protection Rights"
          id="gdpr-rights"
        >
          <p>
            For users in the European Economic Area (EEA), you have the right
            to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Restrict or object to processing</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-4">
            Requests can be submitted to:{" "}
            <a
              href={`mailto:privacy@${SITE_CONFIG.url.replace('https://', '')}`}
              className="text-[#00FF88] hover:underline"
            >
              privacy@{SITE_CONFIG.url.replace('https://', '')}
            </a>
          </p>
        </LegalSection>

        {/* 5. Data Storage & Security */}
        <LegalSection
          title="5. Data Storage & Security"
          id="data-security"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Data is encrypted at rest and in transit (TLS/SSL)</li>
            <li>
              API keys and trading credentials are encrypted using
              industry-grade security
            </li>
            <li>
              We implement access control and internal audits to prevent
              unauthorized access
            </li>
          </ul>
          <p className="mt-4">
            No data transmission method is 100% secure, but we take all
            reasonable measures to protect your information.
          </p>
        </LegalSection>

        {/* 6. Third-Party Services */}
        <LegalSection title="6. Third-Party Services" id="third-party">
          <p>We may share limited information with:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Cloud hosting providers</li>
            <li>Payment gateways</li>
            <li>Broker/exchange APIs (for trading)</li>
          </ul>
          <p className="mt-4">
            These services comply with security and privacy obligations.
          </p>
        </LegalSection>

        {/* 7. Data Retention */}
        <LegalSection title="7. Data Retention" id="data-retention">
          <p>
            Personal information is retained only as long as necessary to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide platform services</li>
            <li>Fulfill legal/regulatory obligations</li>
          </ul>
          <p className="mt-4">
            Users may request data deletion via support.
          </p>
        </LegalSection>

        {/* 8. Children's Privacy */}
        <LegalSection title="8. Children's Privacy" id="childrens-privacy">
          <p>
            {SITE_CONFIG.name} is not intended for individuals under 18 years of age. We do
            not knowingly collect minors' data.
          </p>
        </LegalSection>

        {/* 9. Changes to This Policy */}
        <LegalSection title="9. Changes to This Policy" id="changes">
          <p>
            We may update the Privacy Policy occasionally. Continued use of the
            Platform signifies acceptance of the updated terms.
          </p>
        </LegalSection>

        {/* 10. Contact */}
        <LegalSection title="10. Contact" id="contact">
          <p>For privacy-related questions or requests:</p>
          <p className="text-[#00FF88] mt-2">
            📩{" "}
            <a href={`mailto:privacy@${SITE_CONFIG.url.replace('https://', '')}`} className="hover:underline">
              privacy@{SITE_CONFIG.url.replace('https://', '')}
            </a>
          </p>
        </LegalSection>
      </LegalContent>

      <LegalCTA />
      <Footer />
    </div>
  );
}