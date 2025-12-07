import { Book, Variable, Database, Tag, ChevronDown, ChevronUp, Copy, Plus, Trash2, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface APIFunction {
  name: string;
  description: string;
  params: string;
  example: string;
}

interface Variable {
  id: string;
  name: string;
  type: 'int' | 'float' | 'bool' | 'string';
  defaultValue: string;
  min?: number;
  max?: number;
  exposeInUI: boolean;
}

interface Symbol {
  id: string;
  symbol: string;
  type: 'equity' | 'crypto' | 'forex';
}

interface RightSidebarPanelsProps {
  variables: Variable[];
  symbols: Symbol[];
  onVariableAdd: () => void;
  onVariableDelete: (id: string) => void;
  onVariableUpdate: (id: string, updates: Partial<Variable>) => void;
  onSymbolAdd: () => void;
  onSymbolDelete: (id: string) => void;
}

const apiCategories = [
  {
    name: 'Market Data',
    functions: [
      { name: 'get_price(symbol, timeframe)', description: 'Get current price', params: 'symbol: str, timeframe: str', example: 'get_price("AAPL", "1m")' },
      { name: 'get_historical_data(symbol, interval, limit)', description: 'Get historical OHLCV data', params: 'symbol: str, interval: str, limit: int', example: 'get_historical_data("BTCUSDT", "1h", 100)' },
      { name: 'get_order_book(symbol, depth)', description: 'Get order book data', params: 'symbol: str, depth: int', example: 'get_order_book("AAPL", 20)' },
    ],
  },
  {
    name: 'Orders',
    functions: [
      { name: 'place_order(symbol, side, qty, type)', description: 'Place a new order', params: 'symbol: str, side: "buy"|"sell", qty: float, type: "market"|"limit"', example: 'place_order("AAPL", "buy", 10, "market")' },
      { name: 'modify_order(order_id, qty, price)', description: 'Modify existing order', params: 'order_id: str, qty: float, price: float', example: 'modify_order("12345", 15, 150.50)' },
      { name: 'cancel_order(order_id)', description: 'Cancel an order', params: 'order_id: str', example: 'cancel_order("12345")' },
    ],
  },
  {
    name: 'Portfolio',
    functions: [
      { name: 'get_positions()', description: 'Get all open positions', params: 'None', example: 'positions = get_positions()' },
      { name: 'get_balance()', description: 'Get account balance', params: 'None', example: 'balance = get_balance()' },
      { name: 'get_pnl(symbol)', description: 'Get P&L for symbol', params: 'symbol: str', example: 'pnl = get_pnl("AAPL")' },
    ],
  },
];

export function RightSidebarPanels({
  variables,
  symbols,
  onVariableAdd,
  onVariableDelete,
  onVariableUpdate,
  onSymbolAdd,
  onSymbolDelete,
}: RightSidebarPanelsProps) {
  const [expandedPanel, setExpandedPanel] = useState<string>('api');
  const [apiSearchQuery, setApiSearchQuery] = useState('');
  const [copiedFunction, setCopiedFunction] = useState<string | null>(null);

  const togglePanel = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? '' : panel);
  };

  const handleCopyFunction = (example: string) => {
    navigator.clipboard.writeText(example);
    setCopiedFunction(example);
    setTimeout(() => setCopiedFunction(null), 2000);
  };

  const filteredAPIFunctions = apiCategories.map((category) => ({
    ...category,
    functions: category.functions.filter(
      (fn) =>
        fn.name.toLowerCase().includes(apiSearchQuery.toLowerCase()) ||
        fn.description.toLowerCase().includes(apiSearchQuery.toLowerCase())
    ),
  })).filter((category) => category.functions.length > 0);

  return (
    <div className="w-96 h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-l border-gray-800">
      {/* API Reference Panel */}
      <div className="border-b border-gray-800">
        <button
          onClick={() => togglePanel('api')}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-[#00FF88]" />
            <span className="text-sm font-semibold text-white">API Reference</span>
          </div>
          {expandedPanel === 'api' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {expandedPanel === 'api' && (
          <div className="p-4 space-y-4">
            {/* Search */}
            <input
              type="text"
              value={apiSearchQuery}
              onChange={(e) => setApiSearchQuery(e.target.value)}
              placeholder="Search API..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
            />

            {/* API Categories */}
            <div className="space-y-3">
              {filteredAPIFunctions.map((category) => (
                <div key={category.name}>
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">{category.name}</h4>
                  <div className="space-y-2">
                    {category.functions.map((fn) => (
                      <div
                        key={fn.name}
                        className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-[#00FF88]/30 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <code className="text-xs font-mono text-[#00C8FF]">{fn.name}</code>
                          <button
                            onClick={() => handleCopyFunction(fn.example)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copy example"
                          >
                            {copiedFunction === fn.example ? (
                              <Check className="w-3 h-3 text-[#00FF88]" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-400 hover:text-white" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{fn.description}</p>
                        <div className="text-xs text-gray-600 font-mono">{fn.params}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Variables & Inputs Panel */}
      <div className="border-b border-gray-800">
        <button
          onClick={() => togglePanel('variables')}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Variable className="w-4 h-4 text-[#00C8FF]" />
            <span className="text-sm font-semibold text-white">Variables & Inputs</span>
          </div>
          {expandedPanel === 'variables' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {expandedPanel === 'variables' && (
          <div className="p-4 space-y-3">
            {variables.map((variable) => (
              <div key={variable.id} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={variable.name}
                    onChange={(e) => onVariableUpdate(variable.id, { name: e.target.value })}
                    placeholder="Variable name"
                    className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-[#00FF88]/50"
                  />
                  <button
                    onClick={() => onVariableDelete(variable.id)}
                    className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <select
                    value={variable.type}
                    onChange={(e) => onVariableUpdate(variable.id, { type: e.target.value as any })}
                    className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-[#00FF88]/50"
                  >
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="bool">bool</option>
                    <option value="string">string</option>
                  </select>
                  <input
                    type="text"
                    value={variable.defaultValue}
                    onChange={(e) => onVariableUpdate(variable.id, { defaultValue: e.target.value })}
                    placeholder="Default"
                    className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-[#00FF88]/50"
                  />
                </div>
                {(variable.type === 'int' || variable.type === 'float') && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="number"
                      value={variable.min || ''}
                      onChange={(e) => onVariableUpdate(variable.id, { min: parseFloat(e.target.value) })}
                      placeholder="Min"
                      className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-[#00FF88]/50"
                    />
                    <input
                      type="number"
                      value={variable.max || ''}
                      onChange={(e) => onVariableUpdate(variable.id, { max: parseFloat(e.target.value) })}
                      placeholder="Max"
                      className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-[#00FF88]/50"
                    />
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={variable.exposeInUI}
                    onChange={(e) => onVariableUpdate(variable.id, { exposeInUI: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00FF88] focus:ring-[#00FF88] focus:ring-offset-0"
                  />
                  <span className="text-xs text-gray-400">Expose in UI</span>
                </label>
              </div>
            ))}
            <button
              onClick={onVariableAdd}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg hover:bg-[#00FF88]/20 transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Variable
            </button>
          </div>
        )}
      </div>

      {/* Datasets / Symbols Panel */}
      <div className="border-b border-gray-800">
        <button
          onClick={() => togglePanel('symbols')}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white">Datasets / Symbols</span>
          </div>
          {expandedPanel === 'symbols' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {expandedPanel === 'symbols' && (
          <div className="p-4 space-y-2">
            {symbols.map((symbol) => (
              <div key={symbol.id} className="flex items-center justify-between p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-white">{symbol.symbol}</span>
                  <span className={cn(
                    'px-2 py-0.5 rounded text-xs font-medium',
                    symbol.type === 'equity' && 'bg-blue-500/10 text-blue-400',
                    symbol.type === 'crypto' && 'bg-purple-500/10 text-purple-400',
                    symbol.type === 'forex' && 'bg-green-500/10 text-green-400'
                  )}>
                    {symbol.type}
                  </span>
                </div>
                <button
                  onClick={() => onSymbolDelete(symbol.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={onSymbolAdd}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Symbol
            </button>
          </div>
        )}
      </div>

      {/* Strategy Metadata Panel */}
      <div>
        <button
          onClick={() => togglePanel('metadata')}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Strategy Metadata</span>
          </div>
          {expandedPanel === 'metadata' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {expandedPanel === 'metadata' && (
          <div className="p-4 space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Risk Level</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Category</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>Trend-following</option>
                <option>Mean Reversion</option>
                <option>Scalping</option>
                <option>Arbitrage</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Timeframe</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#00FF88]/50">
                <option>Intraday</option>
                <option>Swing</option>
                <option>Long-term</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tags / Keywords</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {['momentum', 'crypto', 'volatility'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded text-xs font-medium text-[#00C8FF]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="text-xs text-[#00FF88] hover:text-[#00C8FF]">+ Add tag</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
