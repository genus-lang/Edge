export function TrustLogos() {
  const logos = [
    { name: "Binance", width: "w-24" },
    { name: "KuCoin", width: "w-24" },
    { name: "Alpaca", width: "w-24" },
    { name: "Zerodha", width: "w-28" },
    { name: "Coinbase", width: "w-28" },
    { name: "Interactive Brokers", width: "w-32" },
  ];

  return (
    <section className="py-16 px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-500 text-sm mb-8">
          Trusted by traders from 50+ countries
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} h-8 bg-white/10 rounded flex items-center justify-center hover:opacity-80 transition-opacity`}
            >
              <span className="text-xs text-gray-400">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
