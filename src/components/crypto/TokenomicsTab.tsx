import { ExternalLink, FileText, Github, Globe } from 'lucide-react';

export function TokenomicsTab() {
  const distribution = [
    { label: 'Public Sale', value: 35, color: '#00FF88' },
    { label: 'Team & Advisors', value: 20, color: '#00C8FF' },
    { label: 'Ecosystem', value: 25, color: '#8B5CF6' },
    { label: 'Treasury', value: 10, color: '#F59E0B' },
    { label: 'Investors', value: 10, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Project Basics */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Project Information</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xs text-gray-500 mb-1">Category</div>
            <div className="text-sm font-semibold text-white">Store of Value, Layer 1</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Launch Date</div>
            <div className="text-sm font-semibold text-white">January 3, 2009</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Consensus</div>
            <div className="text-sm font-semibold text-white">Proof of Work (PoW)</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Block Time</div>
            <div className="text-sm font-semibold text-white">~10 minutes</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          <a
            href="https://bitcoin.org/bitcoin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Whitepaper
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://bitcoin.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            Website
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/bitcoin/bitcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Supply Schedule */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Supply Schedule</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Circulating Supply</div>
            <div className="text-lg font-bold text-white">19.5M BTC</div>
            <div className="text-xs text-gray-500 mt-1">92.9% of max</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Total Supply</div>
            <div className="text-lg font-bold text-white">19.5M BTC</div>
            <div className="text-xs text-[#00FF88] mt-1">Currently mined</div>
          </div>
          <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Max Supply</div>
            <div className="text-lg font-bold text-white">21M BTC</div>
            <div className="text-xs text-gray-500 mt-1">Hard cap</div>
          </div>
        </div>

        {/* Emission Chart (simplified) */}
        <div>
          <div className="text-sm text-gray-400 mb-3">Emission Progress</div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00FF88] to-[#00C8FF]" style={{ width: '92.9%' }} />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>0 BTC</span>
            <span>19.5M BTC mined</span>
            <span>21M BTC (max)</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm text-yellow-500">
          Next halving estimated in April 2024 (~150 days)
        </div>
      </div>

      {/* Initial Distribution (for other tokens, BTC doesn't have this) */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Token Distribution</h3>
        <p className="text-sm text-gray-400 mb-4">
          Bitcoin has no pre-mine or initial distribution. All coins are created through mining rewards following a predictable emission schedule.
        </p>
        
        {/* Example distribution for reference (not applicable to BTC) */}
        <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-600 mb-2">Decentralized Mining</div>
          <div className="text-sm text-gray-500">
            100% of Bitcoin is distributed through mining rewards, with no team allocation, ICO, or pre-mine. This ensures maximum decentralization and fair distribution.
          </div>
        </div>
      </div>

      {/* Team & Backers */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Community & Development</h3>
        <div className="space-y-3 text-sm text-gray-400">
          <p>
            Bitcoin is developed and maintained by a decentralized community of contributors worldwide. No single entity controls the network.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">GitHub Contributors</div>
              <div className="text-lg font-bold text-white">800+</div>
            </div>
            <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Active Nodes</div>
              <div className="text-lg font-bold text-white">16,000+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
