import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { LegalHero } from "../components/legal/LegalHero";
import { LegalSection } from "../components/legal/LegalSection";
import { RefundTable } from "../components/legal/RefundTable";
import { ContactCTA } from "../components/legal/ContactCTA";
import { SITE_CONFIG } from "../config/site";

export function RefundPolicy() {
  const refundTableData = [
    {
      situation: "First-time purchase (within 7 days)",
      eligibility: "Eligible for a full refund",
      isEligible: true,
    },
    {
      situation: "Renewal charges",
      eligibility: "Non-refundable",
      isEligible: false,
    },
    {
      situation: "Annual plans billed upfront",
      eligibility: "Prorated refund available only if cancellation occurs within 14 days",
      isEligible: true,
    },
    {
      situation: "Upgrades (mid-cycle)",
      eligibility: "No refund — upgrade takes effect immediately",
      isEligible: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <LegalHero title="Refund Policy" lastUpdated="January 2025" />

      <LegalSection>
        {/* Introduction */}
        <LegalSection title="Introduction" id="introduction">
          <p>
            At {SITE_CONFIG.name}, we aim to ensure a positive experience with our platform
            and subscription plans. This Refund Policy describes the terms under
            which refunds are granted for paid services.
          </p>
          <ContactCTA
            email={`billing@${SITE_CONFIG.url.replace('https://', '')}`}
            title="Have a billing concern?"
            description="We're here to help. Contact our billing support team for assistance with refunds, cancellations, or payment issues."
          />
        </LegalSection>

        {/* 1. Free Plan */}
        <LegalSection title="1. Free Plan" id="free-plan">
          <p>
            The Free Plan does not require payment and therefore is not eligible
            for refunds.
          </p>
        </LegalSection>

        {/* 2. Subscription Payments */}
        <LegalSection
          title="2. Subscription Payments (Monthly / Yearly)"
          id="subscription-payments"
        >
          <p>Paid subscription plans renew automatically until cancelled.</p>

          <div className="mt-6">
            <h3 className="text-xl text-[#00C8FF] mb-4">Refund eligibility:</h3>
            <RefundTable rows={refundTableData} />
          </div>

          <p className="mt-6 text-gray-300">
            Refund requests must be submitted from the registered email account.
          </p>
        </LegalSection>

        {/* 3. Cancellations */}
        <LegalSection title="3. Cancellations" id="cancellations">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Users may cancel subscriptions anytime from the Billing Dashboard.
            </li>
            <li>
              Cancellation stops future charges but does not automatically
              trigger refunds.
            </li>
            <li>
              Access to premium features continues until the end of the billing
              period.
            </li>
          </ul>
        </LegalSection>

        {/* 4. Exceptional Refund Situations */}
        <LegalSection
          title="4. Exceptional Refund Situations"
          id="exceptional-situations"
        >
          <p>
            Refunds may be issued outside standard terms in the following rare
            cases:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Duplicate charges</li>
            <li>Service disruption exceeding 72 hours of downtime</li>
            <li>Misbilling due to system error</li>
          </ul>
          <p className="mt-4 text-gray-300">
            All exceptions are reviewed manually by the Billing Team.
          </p>
        </LegalSection>

        {/* 5. Marketplace Transactions */}
        <LegalSection
          title="5. Marketplace Transactions"
          id="marketplace-transactions"
        >
          <p>
            Purchases made through the Strategy Marketplace (buying third-party
            strategies) are:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Non-refundable</li>
            <li>Between the buyer & strategy publisher</li>
            <li>Handled via internal dispute system if needed</li>
          </ul>
        </LegalSection>

        {/* 6. Payment Disputes / Chargebacks */}
        <LegalSection
          title="6. Payment Disputes / Chargebacks"
          id="payment-disputes"
        >
          <p>
            If a chargeback is raised with a bank or card issuer before
            contacting us, the account may be:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Temporarily suspended</li>
            <li>Permanently closed for misuse of chargeback processes</li>
          </ul>
          <p className="mt-4 text-[#00FF88]">
            We strongly encourage contacting our Billing Team first.
          </p>
        </LegalSection>

        {/* 7. How to Request a Refund */}
        <LegalSection
          title="7. How to Request a Refund"
          id="request-refund"
        >
          <p>
            Send a request to{" "}
            <a
              href={`mailto:billing@${SITE_CONFIG.url.replace('https://', '')}`}
              className="text-[#00FF88] hover:underline"
            >
              billing@{SITE_CONFIG.url.replace('https://', '')}
            </a>{" "}
            with:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Full name</li>
            <li>Account email</li>
            <li>Invoice ID</li>
            <li>Reason for refund request</li>
          </ul>
          <p className="mt-4 text-gray-300">
            Refund evaluations may require 5–10 business days.
          </p>
        </LegalSection>

        {/* Closing Note */}
        <LegalSection title="Closing Note" id="closing">
          <p>
            We are committed to fairness and transparency. If you believe you
            were charged incorrectly or need assistance, please reach out —
            we're happy to help.
          </p>
        </LegalSection>
      </LegalSection>

      <Footer />
    </div>
  );
}