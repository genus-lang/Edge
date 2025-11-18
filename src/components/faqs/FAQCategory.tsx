import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategoryProps {
  title: string;
  icon: string;
  faqs: FAQ[];
}

export function FAQCategory({ title, icon, faqs }: FAQCategoryProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl md:text-3xl">{title}</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl border border-white/10 px-6 data-[state=open]:border-[#00FF88]/30 data-[state=open]:shadow-lg data-[state=open]:shadow-[#00FF88]/10 transition-all"
          >
            <AccordionTrigger className="text-left hover:text-[#00FF88] transition-colors py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 pb-6 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
