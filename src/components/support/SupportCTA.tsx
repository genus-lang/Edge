import { Mail, MessageCircle } from "lucide-react";

export function SupportCTA() {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-2xl p-12 text-center">
          {/* Title */}
          <h2 className="text-4xl mb-4">Still need help?</h2>
          
          {/* Description */}
          <p className="text-gray-400 text-lg mb-8">
            Our support team is here to assist you with any questions or issues.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105">
              <Mail size={20} />
              Create Support Ticket
            </button>

            <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/20 text-white rounded-lg hover:border-[#00C8FF]/50 hover:bg-white/10 transition-all duration-300">
              <MessageCircle size={20} className="text-[#00C8FF]" />
              Chat with Support
            </button>
          </div>

          {/* Response Time */}
          <p className="text-sm text-gray-500">
            Average response time: <span className="text-[#00FF88]">within 24 hours</span>
          </p>
        </div>
      </div>
    </section>
  );
}
