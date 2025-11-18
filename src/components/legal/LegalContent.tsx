import { ReactNode } from "react";

interface LegalContentProps {
  children: ReactNode;
}

export function LegalContent({ children }: LegalContentProps) {
  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-2xl p-8 md:p-12 hover:border-[#00FF88]/30 transition-all duration-300 shadow-2xl">
          {/* Scrollable Container */}
          <div className="max-h-[680px] overflow-y-auto pr-4 custom-scrollbar">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00FF88, #00C8FF);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00FF88, #00C8FF);
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
}
