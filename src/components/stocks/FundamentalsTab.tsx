import { ExternalLink, Info, TrendingUp, Building2 } from 'lucide-react';

interface FundamentalsData {
  description: string;
  website: string;
  employees: string;
  founded: string;
  headquarters: string;
  peRatio: string;
  pegRatio: string;
  eps: string;
  dividendYield: string;
  roe: string;
  roa: string;
  debtToEquity: string;
  bookValue: string;
  profitMargin: string;
  operatingMargin: string;
}

interface FundamentalsTabProps {
  symbol: string;
  name: string;
  data: FundamentalsData;
}

export function FundamentalsTab({ symbol, name, data }: FundamentalsTabProps) {
  return (
    <div className="space-y-6">
      {/* Company Snapshot */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{symbol}</span>
              <span>·</span>
              <span>Founded {data.founded}</span>
              <span>·</span>
              <span>{data.employees} employees</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">{data.headquarters}</span>
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-[#00FF88] hover:text-[#00FF88]/80"
              >
                Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{data.description}</p>
      </div>

      {/* Key Fundamental Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Key Fundamental Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            label="P/E Ratio"
            value={data.peRatio}
            tooltip="Price-to-Earnings ratio. Lower is generally better."
          />
          <MetricCard
            label="PEG Ratio"
            value={data.pegRatio}
            tooltip="Price/Earnings to Growth ratio. Below 1 suggests undervalued."
          />
          <MetricCard
            label="EPS (TTM)"
            value={data.eps}
            tooltip="Earnings Per Share over last 12 months"
          />
          <MetricCard
            label="Dividend Yield"
            value={data.dividendYield}
            tooltip="Annual dividend as % of stock price"
          />
          <MetricCard
            label="ROE"
            value={data.roe}
            tooltip="Return on Equity. Higher is better."
            highlight={parseFloat(data.roe) > 15}
          />
          <MetricCard
            label="ROA"
            value={data.roa}
            tooltip="Return on Assets. Measures profitability."
          />
          <MetricCard
            label="Debt-to-Equity"
            value={data.debtToEquity}
            tooltip="Total debt / Total equity. Lower is less risky."
          />
          <MetricCard
            label="Book Value"
            value={data.bookValue}
            tooltip="Net asset value per share"
          />
          <MetricCard
            label="Profit Margin"
            value={data.profitMargin}
            tooltip="Net income / Revenue"
            highlight={parseFloat(data.profitMargin) > 20}
          />
        </div>
      </div>

      {/* Valuation Summary */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Valuation Summary</h3>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                Fairly Valued
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Based on P/E ratio comparison with sector average and historical valuations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Current P/E</div>
                <div className="text-lg font-bold text-white">{data.peRatio}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Sector Avg P/E</div>
                <div className="text-lg font-bold text-white">28.5</div>
              </div>
            </div>
          </div>
          <div className="w-px bg-gray-800" />
          <div className="flex-1">
            <div className="text-sm text-gray-400 mb-3">Valuation Metrics</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">P/B Ratio</span>
                <span className="text-white font-semibold">3.2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">P/S Ratio</span>
                <span className="text-white font-semibold">7.8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">EV/EBITDA</span>
                <span className="text-white font-semibold">22.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  tooltip?: string;
  highlight?: boolean;
}

function MetricCard({ label, value, tooltip, highlight }: MetricCardProps) {
  return (
    <div className="group relative p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="text-xs text-gray-500">{label}</div>
        {tooltip && (
          <button className="text-gray-600 hover:text-gray-400">
            <Info className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div
        className={`text-lg font-bold ${
          highlight ? 'text-[#00FF88]' : 'text-white'
        }`}
      >
        {value !== '—' ? value : <span className="text-gray-600">—</span>}
      </div>
      {tooltip && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity w-48 z-10">
          {tooltip}
        </div>
      )}
    </div>
  );
}
