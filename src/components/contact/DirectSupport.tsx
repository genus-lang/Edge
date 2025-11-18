import { Mail, Phone, Clock, MessageCircle } from "lucide-react";

export function DirectSupport() {
  const supportDetails = [
    {
      icon: Mail,
      label: "Support Email",
      value: "support@quant.com",
      href: "mailto:support@quant.com",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (800) 456-9903",
      href: "tel:+18004569903",
      gradient: "from-[#00C8FF] to-[#1EFCBD]",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday – Saturday · 9:00 AM – 7:00 PM",
      gradient: "from-[#1EFCBD] to-[#00FF88]",
    },
    {
      icon: MessageCircle,
      label: "Response Time",
      value: "Within 24 hours",
      gradient: "from-[#00FF88] to-[#00C8FF]",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">
            Prefer direct support?
          </h2>
          <p className="text-gray-400">
            Reach out to us through any of these channels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportDetails.map((detail, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Icon */}
              <div className="mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${detail.gradient} p-0.5`}
                >
                  <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                    <detail.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>

              {/* Label */}
              <h3 className="text-sm text-gray-400 mb-2">{detail.label}</h3>

              {/* Value */}
              {detail.href ? (
                <a
                  href={detail.href}
                  className="text-white hover:text-[#00FF88] transition-colors break-words"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-white break-words">{detail.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
