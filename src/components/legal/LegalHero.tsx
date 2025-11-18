interface LegalHeroProps {
  title: string;
  lastUpdated: string;
}

export function LegalHero({ title, lastUpdated }: LegalHeroProps) {
  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-gray-400 text-lg">
          Last Updated: <span className="text-[#00FF88]">{lastUpdated}</span>
        </p>
      </div>
    </section>
  );
}
