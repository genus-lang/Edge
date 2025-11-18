import { Check, X } from "lucide-react";

export function ComparisonTable() {
  const features = [
    { name: "Backtests", free: "200/month", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Live Strategies", free: "3", pro: "20", enterprise: "Unlimited" },
    {
      name: "AI Optimization",
      free: false,
      pro: true,
      enterprise: "Advanced",
    },
    {
      name: "Risk Analytics",
      free: false,
      pro: true,
      enterprise: "Advanced",
    },
    {
      name: "Strategy Marketplace",
      free: false,
      pro: true,
      enterprise: true,
    },
    {
      name: "Team Access",
      free: false,
      pro: false,
      enterprise: true,
    },
    {
      name: "Dedicated Support",
      free: false,
      pro: "Priority",
      enterprise: "24/7 Dedicated",
    },
  ];

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="text-[#00FF88] mx-auto" size={20} />
      ) : (
        <X className="text-gray-600 mx-auto" size={20} />
      );
    }
    return <span className="text-gray-300">{value}</span>;
  };

  return (
    <section className="py-16 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Compare Plans</h2>
          <p className="text-gray-400">See what's included in each plan</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-gray-400">Features</th>
                <th className="text-center py-4 px-6">Free</th>
                <th className="text-center py-4 px-6 bg-[#00FF88]/5">
                  <span className="text-[#00FF88]">Pro</span>
                </th>
                <th className="text-center py-4 px-6">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-300">{feature.name}</td>
                  <td className="py-4 px-6 text-center">{renderCell(feature.free)}</td>
                  <td className="py-4 px-6 text-center bg-[#00FF88]/5">
                    {renderCell(feature.pro)}
                  </td>
                  <td className="py-4 px-6 text-center">{renderCell(feature.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-lg mb-4">{feature.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-2">Free</p>
                  <div className="flex justify-center">{renderCell(feature.free)}</div>
                </div>
                <div className="text-center bg-[#00FF88]/5 rounded-lg py-2">
                  <p className="text-xs text-[#00FF88] mb-2">Pro</p>
                  <div className="flex justify-center">{renderCell(feature.pro)}</div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-2">Enterprise</p>
                  <div className="flex justify-center">{renderCell(feature.enterprise)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
