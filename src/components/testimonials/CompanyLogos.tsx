export function CompanyLogos() {
  const companies = [
    "Binance",
    "Coinbase",
    "Fidelity",
    "Zerodha",
    "Interactive Brokers",
    "KuCoin",
    "Robinhood",
    "TD Ameritrade",
  ];

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-xl text-gray-400 mb-12">
          Trusted by traders from companies like:
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group flex items-center justify-center p-4 border border-white/10 rounded-lg hover:border-[#00FF88]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-gray-500 group-hover:text-gray-300 transition-colors text-center text-sm">
                {company}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">
          (Not affiliated or endorsed — users are part of their trading communities)
        </p>
      </div>
    </section>
  );
}
