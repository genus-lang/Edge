import { Mail, HelpCircle } from "lucide-react";

interface ContactCTAProps {
  email: string;
  title: string;
  description: string;
}

export function ContactCTA({ email, title, description }: ContactCTAProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#00FF88] to-[#00C8FF] rounded-lg flex items-center justify-center flex-shrink-0">
          <HelpCircle size={24} className="text-black" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-lg hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105"
          >
            <Mail size={18} />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
