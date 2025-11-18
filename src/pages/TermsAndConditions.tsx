import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { LegalHero } from "../components/legal/LegalHero";
import { LegalSection } from "../components/legal/LegalSection";
import { LegalCTA } from "../components/legal/LegalCTA";
import { SITE_CONFIG } from "../config/site";

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <LegalHero title="Terms & Conditions" lastUpdated="January 2025" />

      <LegalContent>
        {/* Introduction */}
        <LegalSection title="Introduction" id="introduction">
          <p>
            Welcome to {SITE_CONFIG.name} ("the Platform", "we", "our", "us"). These Terms &
            Conditions govern your access to and use of our software, website,
            tools, mobile applications, and related services.
          </p>
          <p>
            By creating an account or accessing the Platform, you agree to these
            Terms. If you do not agree, you may not use the Platform.
          </p>
        </LegalSection>

        {/* 1. Eligibility */}
        <LegalSection title="1. Eligibility" id="eligibility">
          <ul className="list-disc list-inside space-y-2">
            <li>You must be at least 18 years old.</li>
            <li>
              You are responsible for ensuring compliance with local laws
              related to algorithmic trading and brokerage usage.
            </li>
          </ul>
        </LegalSection>

        {/* 2. Account Responsibilities */}
        <LegalSection
          title="2. Account Responsibilities"
          id="account-responsibilities"
        >
          <p>You agree to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide accurate registration information.</li>
            <li>Maintain confidentiality of your login details.</li>
            <li>Be responsible for activities performed under your account.</li>
          </ul>
          <p className="mt-4">
            We reserve the right to suspend or terminate accounts for policy
            violations.
          </p>
        </LegalSection>

        {/* 3. Platform Use */}
        <LegalSection title="3. Platform Use" id="platform-use">
          <p>
            The Platform provides tools for research, backtesting, and automated
            trading. You understand that:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Past results do not guarantee future returns.</li>
            <li>
              You are solely responsible for financial decisions and trade
              execution.
            </li>
            <li>{SITE_CONFIG.name} does not provide financial or investment advice.</li>
          </ul>
        </LegalSection>

        {/* 4. Third-Party Brokers & APIs */}
        <LegalSection
          title="4. Third-Party Brokers & APIs"
          id="third-party-brokers"
        >
          <p>
            {SITE_CONFIG.name} connects to third-party exchanges/brokers via secure API
            access. We are not liable for:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Trade execution errors</li>
            <li>Broker outages or liquidity issues</li>
            <li>API limitation / revocation by broker</li>
          </ul>
        </LegalSection>

        {/* 5. Payment & Subscription */}
        <LegalSection
          title="5. Payment & Subscription"
          id="payment-subscription"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Subscription fees renew automatically unless cancelled.</li>
            <li>Taxes may apply depending on jurisdiction.</li>
            <li>Refunds follow our Refund Policy.</li>
          </ul>
        </LegalSection>

        {/* 6. Prohibited Activities */}
        <LegalSection title="6. Prohibited Activities" id="prohibited-activities">
          <p>Users must not:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Reverse engineer, bypass security, or misuse the Platform
            </li>
            <li>Use bots for abuse, spam, or DDoS attacks</li>
            <li>Violate trading or financial regulations</li>
          </ul>
        </LegalSection>

        {/* 7. Intellectual Property */}
        <LegalSection
          title="7. Intellectual Property"
          id="intellectual-property"
        >
          <p>
            All trademarks, logos, UI designs, code, and instructional materials
            belong to {SITE_CONFIG.name}. You may not copy, distribute, or reproduce them
            without written permission.
          </p>
        </LegalSection>

        {/* 8. Limitation of Liability */}
        <LegalSection
          title="8. Limitation of Liability"
          id="limitation-of-liability"
        >
          <p>
            To the maximum extent permitted by law, {SITE_CONFIG.name} is not responsible for
            any trading losses, profit loss, or damages arising from:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use or inability to use the Platform</li>
            <li>Market volatility</li>
            <li>Technical failures</li>
          </ul>
        </LegalSection>

        {/* 9. Modifications to These Terms */}
        <LegalSection
          title="9. Modifications to These Terms"
          id="modifications"
        >
          <p>
            We may update these Terms from time to time. Continued use after
            changes constitutes acceptance.
          </p>
        </LegalSection>

        {/* 10. Contact */}
        <LegalSection title="10. Contact" id="contact">
          <p>For questions regarding these Terms, contact:</p>
          <p className="text-[#00FF88] mt-2">
            📩 <a href={`mailto:legal@${SITE_CONFIG.url.replace('https://', '')}`} className="hover:underline">legal@{SITE_CONFIG.url.replace('https://', '')}</a>
          </p>
        </LegalSection>
      </LegalContent>

      <LegalCTA />
      <Footer />
    </div>
  );
}