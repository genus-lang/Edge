export function ComplianceHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Security, Compliance & Trust — Built Into Quant
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-400 max-w-4xl mx-auto">
          We uphold industry-grade standards in data protection, brokerage integrations, 
          cybersecurity, and legal compliance to ensure safety for traders worldwide.
        </p>
      </div>
    </section>
  );
}
