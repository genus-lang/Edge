import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ApiCard } from "../components/api/ApiCard";
import { CodeBlock } from "../components/api/CodeBlock";
import { LanguageBadge } from "../components/api/LanguageBadge";
import { Book, Zap, Globe, Key, Shield } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function ApiDocs() {
  const apis = [
    {
      icon: "📊",
      title: "Market Data API",
      description: "Real-time & historical price data",
    },
    {
      icon: "🔄",
      title: "Backtesting API",
      description: "Run strategy simulations via API",
    },
    {
      icon: "⚙️",
      title: "Trading Execution API",
      description: "Send & manage live orders securely",
    },
    {
      icon: "💼",
      title: "Portfolio API",
      description: "Positions, P&L, exposure & analytics",
    },
    {
      icon: "📢",
      title: "Webhooks API",
      description: "Receive trade + signal notifications",
    },
  ];

  const languages = [
    { name: "Python", icon: "🐍" },
    { name: "JavaScript / TypeScript", icon: "📜" },
    { name: "Go", icon: "🔷" },
    { name: "Java", icon: "☕" },
    { name: "C#", icon: "💠" },
  ];

  const pythonExample = `import quantedge

client = quantedge.Client(api_key="YOUR_API_KEY")

result = client.market.get_price(symbol="AAPL")
print(result)`;

  const jsExample = `const QuantEdge = require('quantedge-sdk');

const client = new QuantEdge.Client({
  apiKey: 'YOUR_API_KEY'
});

const result = await client.market.getPrice({ symbol: 'AAPL' });
console.log(result);`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Build Anything With the {SITE_CONFIG.name} API
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-10">
            Access market data, execute trades, manage portfolios, run backtests,
            and build automated systems — all with one secure API.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Book size={20} />
              View Full API Docs (Login Required)
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-[#00FF88]/50 text-white rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto group">
              <Key size={20} />
              Get API Key
              <Zap
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Available APIs Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            What You Can Build
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Five powerful APIs to build any trading or analytics application
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {apis.map((api, index) => (
              <ApiCard key={index} {...api} />
            ))}
          </div>

          <p className="text-sm text-gray-500 text-center italic flex items-center justify-center gap-2">
            <Shield size={14} />
            All endpoints use encrypted HTTPS + token-based authentication.
          </p>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Works With Your Tech Stack
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Official client libraries for popular programming languages
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {languages.map((lang, index) => (
              <LanguageBadge key={index} {...lang} />
            ))}
          </div>

          <p className="text-sm text-gray-500 text-center italic">
            SDK downloads available after login
          </p>
        </div>
      </section>

      {/* Example API Request/Response - Python */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Example API Request
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Get market data with a simple API call
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request */}
            <div>
              <h3 className="text-xl mb-4 text-[#00FF88]">Request</h3>
              <CodeBlock code={pythonExample} language="Python" />
            </div>
          </div>
        </div>
      </section>

      {/* Example API Request/Response - JavaScript */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Place Orders via API
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Execute trades programmatically with the Trading Execution API
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request */}
            <div>
              <h3 className="text-xl mb-4 text-[#00FF88]">Request</h3>
              <CodeBlock code={jsExample} language="JavaScript" />
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Summary Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-4">
            Simple, Secure Authentication
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Token-based authentication without OAuth complexity
          </p>

          <div className="bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="space-y-6">
              {/* Authentication Details */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield size={16} className="text-[#00FF88]" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">Bearer Token Access</h3>
                  <code className="text-sm text-gray-400 bg-black/50 px-3 py-1 rounded border border-white/10">
                    Authorization: Bearer &lt;API_KEY&gt;
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg mb-1">No OAuth Complexity</h3>
                  <p className="text-gray-400 text-sm">
                    Simple token-based authentication without complex OAuth flows
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  🔑
                </div>
                <div>
                  <h3 className="text-lg mb-1">Scoped Permissions</h3>
                  <p className="text-gray-400 text-sm">
                    Different permissions for different APIs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88]/20 to-[#00C8FF]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  🔄
                </div>
                <div>
                  <h3 className="text-lg mb-1">Revocable Anytime</h3>
                  <p className="text-gray-400 text-sm">
                    API keys can be revoked any time from your dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 group">
                <Key size={20} />
                Generate API Key (Login Required)
                <Zap
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Link to Full Docs Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#00FF88]/10 to-[#00C8FF]/10 border border-[#00FF88]/30 rounded-2xl p-12">
            <Book size={48} className="text-[#00FF88] mx-auto mb-6" />

            <h2 className="text-3xl md:text-4xl mb-4">
              Ready for Full Technical Docs?
            </h2>

            <p className="text-gray-400 mb-8">
              Access complete API reference, sandbox environment, and SDK
              documentation
            </p>

            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:shadow-2xl hover:shadow-[#00FF88]/50 transition-all duration-300 hover:scale-105 group">
              📄 Open Full API Documentation
              <Zap
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <p className="text-sm text-gray-500 mt-4 italic">
              Requires login to access sandbox keys & SDK reference
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}