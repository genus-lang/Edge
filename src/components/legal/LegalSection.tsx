import { ReactNode } from "react";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
}

export function LegalSection({ title, children, id }: LegalSectionProps) {
  return (
    <div id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl md:text-3xl mb-4 text-[#00FF88]">{title}</h2>
      <div className="text-gray-300 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}
