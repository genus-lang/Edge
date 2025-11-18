import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function PricingFAQ() {
  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer:
        "Yes — upgrades and downgrades are instant and pro-rated. You'll only pay for what you use.",
    },
    {
      question: "Is there a free trial for Pro?",
      answer:
        "Yes — we offer a 7-day free trial for the Pro plan with no credit card required. Cancel anytime during the trial period.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. There are no contracts or hidden fees. You can cancel your subscription at any time from your account settings.",
    },
    {
      question: "Do you offer discounts for students or startups?",
      answer:
        "Yes — we offer special pricing for students and early-stage startups. Contact our support team to verify your eligibility.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, AmEx), PayPal, and bank transfers for Enterprise plans.",
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer:
        "We'll notify you when you're approaching your limits. You can upgrade anytime, or we'll automatically pause non-critical features until the next billing cycle.",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about pricing</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl border border-white/10 px-6 data-[state=open]:border-[#00FF88]/30"
            >
              <AccordionTrigger className="text-left hover:text-[#00FF88] transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
