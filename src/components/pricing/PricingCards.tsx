import { PricingCard } from "./PricingCard";

interface PricingCardsProps {
  billingCycle: "monthly" | "yearly";
}

export function PricingCards({ billingCycle }: PricingCardsProps) {
  const plans = [
    {
      name: "Free",
      description: "Perfect for beginners exploring automated trading.",
      price: "$0",
      period: "month",
      features: [
        "200 backtests / month",
        "3 live strategies",
        "3 broker/exchange connections",
        "Community support",
      ],
      buttonText: "Start Free →",
      buttonVariant: "default" as const,
      isPopular: false,
      trustTag: "No credit card required",
    },
    {
      name: "Pro",
      description: "Designed for active traders building and deploying strategies full-time.",
      price: billingCycle === "monthly" ? "$49" : "$39",
      period: "month",
      features: [
        "Everything in Free, plus:",
        "Unlimited backtests",
        "20 live strategies",
        "AI optimization & risk analytics",
        "Priority customer support",
        "Strategy Marketplace access",
      ],
      buttonText: "Upgrade to Pro →",
      buttonVariant: "popular" as const,
      isPopular: true,
      yearlyNote: billingCycle === "yearly" ? "Billed annually ($468/year)" : undefined,
    },
    {
      name: "Enterprise",
      description: "Built for proprietary firms, hedge funds & trading businesses.",
      price: "Custom",
      features: [
        "Everything in Pro, plus:",
        "Unlimited strategies & execution",
        "Multi-team access",
        "Custom broker integrations",
        "SLA contract & dedicated support",
        "On-premise or hybrid deployment",
      ],
      buttonText: "Contact Sales →",
      buttonVariant: "outline" as const,
      isPopular: false,
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              buttonText={plan.buttonText}
              buttonVariant={plan.buttonVariant}
              isPopular={plan.isPopular}
              trustTag={plan.trustTag}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
