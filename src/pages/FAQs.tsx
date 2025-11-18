import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { FAQsHero } from "../components/faqs/FAQsHero";
import { FAQCategory } from "../components/faqs/FAQCategory";
import { FAQsCTA } from "../components/faqs/FAQsCTA";
import { SITE_CONFIG } from "../config/site";

export function FAQs() {
  const faqCategories = [
    {
      category: "General",
      faqs: [
        {
          question: `What is ${SITE_CONFIG.name}?`,
          answer:
            `${SITE_CONFIG.name} is an AI-powered platform for building, backtesting, and deploying automated trading strategies.`,
        },
        {
          question: "Do I need coding skills to use the platform?",
          answer:
            "No — we offer visual builders and low-code editors, but advanced users can write custom Python/JS code.",
        },
        {
          question: `Which markets does ${SITE_CONFIG.name} support?`,
          answer:
            "Stocks, crypto, forex, futures, and commodities — based on available broker integrations.",
        },
        {
          question: `Can I use ${SITE_CONFIG.name} worldwide?`,
          answer:
            `Yes — ${SITE_CONFIG.name} supports traders across 50+ countries (regional broker availability may vary).`,
        },
      ],
    },
    {
      category: "Billing / Payments",
      faqs: [
        {
          question: "Is there a free plan?",
          answer: "Yes — start for free, no credit card required.",
        },
        {
          question: "Can I cancel anytime?",
          answer: "Absolutely. There are no contracts or cancellation fees.",
        },
        {
          question: "Do you offer student / startup discounts?",
          answer:
            "Yes — apply via the support team. We offer special pricing for students and early-stage startups.",
        },
        {
          question: "What payment methods are supported?",
          answer:
            "Credit/debit cards, PayPal, and corporate invoicing for Enterprise users.",
        },
      ],
    },
    {
      category: "Strategies",
      faqs: [
        {
          question: "How many strategies can I build?",
          answer:
            "Unlimited strategies on all plans (live trading limit applies to Free plan only).",
        },
        {
          question: "Can I share my strategies?",
          answer:
            "Yes — via the Strategy Marketplace (available on Pro & Enterprise plans).",
        },
        {
          question: "Are strategies private and secure?",
          answer:
            "Yes — strategies are encrypted and never shared without your consent. We use bank-grade security.",
        },
      ],
    },
    {
      category: "Backtesting",
      faqs: [
        {
          question: "What data sources are used for backtesting?",
          answer:
            "Institutional-grade historical market data from premium financial data providers.",
        },
        {
          question: "How accurate is the backtest engine?",
          answer:
            "Backtests include slippage, transaction costs, and execution delay simulation for realistic results.",
        },
        {
          question: "How long does a backtest take?",
          answer:
            "Usually between 1–10 seconds depending on strategy complexity and time period analyzed.",
        },
      ],
    },
    {
      category: "Trading APIs",
      faqs: [
        {
          question: "Which brokers and exchanges are supported?",
          answer:
            "More than 30 including Binance, Coinbase, Interactive Brokers, Alpaca, and Zerodha.",
        },
        {
          question: "Can I trade using my own broker API key?",
          answer:
            `Yes — ${SITE_CONFIG.name} connects via secure encrypted tokens. You maintain full control of your API keys.`,
        },
        {
          question: "Is my API key safe?",
          answer:
            "Absolutely — API keys are stored securely using industry-standard encryption and never shared or exposed.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <FAQsHero />

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {faqCategories.map((category, index) => (
            <FAQCategory
              key={index}
              title={category.category}
              faqs={category.faqs}
            />
          ))}
        </div>
      </section>

      <FAQsCTA />
      <Footer />
    </div>
  );
}