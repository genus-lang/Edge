import { Cloud, CreditCard, Lock, Database, TrendingUp } from "lucide-react";

export function VendorLogos() {
  const vendors = [
    { icon: Cloud, label: "Cloud Infrastructure Providers" },
    { icon: CreditCard, label: "Payment Gateways" },
    { icon: Lock, label: "Authentication & Identity" },
    { icon: Database, label: "Data & Market Providers" },
    { icon: TrendingUp, label: "Broker / Exchange Partners" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {vendors.map((vendor, index) => {
        const Icon = vendor.icon;
        return (
          <div
            key={index}
            className="group bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-6 hover:border-[#00C8FF]/50 hover:bg-white/15 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            <Icon size={32} className="text-[#00C8FF] mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              {vendor.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
