import { Search, LogIn, LogOut, TrendingUp, Gauge, DollarSign, Clock, Zap, GripVertical, Info } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

interface Block {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
}

const blocks: Block[] = [
  // Entry Blocks
  { id: 'price-cross-indicator', name: 'Price Crosses Indicator', description: 'Enter when price crosses MA, RSI, etc.', category: 'entry', icon: LogIn, color: 'from-[#00FF88] to-[#00C8FF]' },
  { id: 'breakout-high-low', name: 'Breakout of High/Low', description: 'Enter on breakout above/below key levels', category: 'entry', icon: LogIn, color: 'from-[#00FF88] to-[#00C8FF]' },
  { id: 'trend-filter', name: 'Trend Filter (MA/EMA Cross)', description: 'Enter only when in trending market', category: 'entry', icon: LogIn, color: 'from-[#00FF88] to-[#00C8FF]' },
  
  // Exit Blocks
  { id: 'take-profit', name: 'Take Profit', description: 'Exit at target profit level', category: 'exit', icon: LogOut, color: 'from-red-500 to-orange-500' },
  { id: 'stop-loss', name: 'Stop Loss', description: 'Exit at maximum loss level', category: 'exit', icon: LogOut, color: 'from-red-500 to-orange-500' },
  { id: 'trailing-stop', name: 'Trailing Stop', description: 'Dynamic stop that follows price', category: 'exit', icon: LogOut, color: 'from-red-500 to-orange-500' },
  { id: 'exit-opposite-signal', name: 'Exit on Opposite Signal', description: 'Exit when reverse condition triggers', category: 'exit', icon: LogOut, color: 'from-red-500 to-orange-500' },
  
  // Indicator Blocks
  { id: 'moving-average', name: 'Moving Average', description: 'SMA, EMA, WMA, HMA', category: 'indicators', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  { id: 'rsi', name: 'RSI', description: 'Relative Strength Index', category: 'indicators', icon: Gauge, color: 'from-purple-500 to-pink-500' },
  { id: 'macd', name: 'MACD', description: 'Moving Average Convergence Divergence', category: 'indicators', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  { id: 'bollinger-bands', name: 'Bollinger Bands', description: 'Volatility bands around price', category: 'indicators', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  { id: 'volume-spike', name: 'Volume Spike', description: 'Detect unusual volume', category: 'indicators', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  
  // Risk/Money Management
  { id: 'fixed-position-size', name: 'Fixed Position Size', description: 'Trade fixed quantity/contracts', category: 'risk', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
  { id: 'percent-equity', name: '% of Equity', description: 'Risk percentage of account', category: 'risk', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
  { id: 'max-daily-drawdown', name: 'Max Daily Drawdown', description: 'Stop trading after X% daily loss', category: 'risk', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
  { id: 'max-concurrent-positions', name: 'Max Concurrent Positions', description: 'Limit open positions', category: 'risk', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
  
  // Time & Session
  { id: 'trading-session', name: 'Trading Session Filter', description: 'Only trade between specific hours', category: 'time', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  { id: 'day-of-week', name: 'Day of Week Filter', description: 'Trade only on specific days', category: 'time', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  { id: 'news-avoidance', name: 'News Avoidance Window', description: 'Avoid trading around news events', category: 'time', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  
  // Helpers
  { id: 'if-else', name: 'IF / ELSE', description: 'Conditional logic branching', category: 'helpers', icon: Zap, color: 'from-gray-500 to-gray-600' },
  { id: 'and-or-group', name: 'AND / OR Group', description: 'Combine multiple conditions', category: 'helpers', icon: Zap, color: 'from-gray-500 to-gray-600' },
  { id: 'math-expression', name: 'Math Expression', description: 'Custom calculations', category: 'helpers', icon: Zap, color: 'from-gray-500 to-gray-600' },
];

interface BlockPaletteProps {
  onDragStart: (block: Block) => void;
}

export function BlockPalette({ onDragStart }: BlockPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'entry', label: 'Entry' },
    { id: 'exit', label: 'Exit' },
    { id: 'indicators', label: 'Indicators' },
    { id: 'risk', label: 'Risk / Money Mgmt' },
    { id: 'time', label: 'Time & Session' },
    { id: 'helpers', label: 'Helpers' },
  ];

  const filteredBlocks = blocks.filter((block) => {
    const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || block.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-80 h-full overflow-y-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-r border-gray-800 p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">Blocks</h3>
        <p className="text-xs text-gray-500">Drag blocks to canvas</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search indicators, conditions..."
          className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50"
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-4 space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-all',
              activeCategory === cat.id
                ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Blocks List */}
      <div className="space-y-2">
        {filteredBlocks.length > 0 ? (
          filteredBlocks.map((block) => (
            <div
              key={block.id}
              draggable
              onDragStart={() => onDragStart(block)}
              onMouseEnter={() => setHoveredBlock(block.id)}
              onMouseLeave={() => setHoveredBlock(null)}
              className={cn(
                'relative p-3 bg-gray-800/50 border border-gray-700 rounded-lg cursor-move hover:border-[#00FF88]/50 transition-all group',
                hoveredBlock === block.id && 'shadow-lg shadow-[#00FF88]/20'
              )}
            >
              <div className="flex items-start gap-3">
                {/* Drag Handle */}
                <div className="text-gray-600 group-hover:text-[#00FF88] transition-colors mt-0.5">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Icon */}
                <div className={cn('p-2 rounded-lg bg-gradient-to-br shrink-0', block.color)}>
                  <block.icon className="w-4 h-4 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white truncate">{block.name}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{block.description}</p>
                </div>

                {/* Info Icon */}
                <button
                  className="text-gray-600 hover:text-[#00C8FF] transition-colors"
                  title="More info"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Extended Tooltip on Hover */}
              {hoveredBlock === block.id && (
                <div className="absolute left-full top-0 ml-2 w-64 p-3 bg-gray-900 border border-[#00FF88]/30 rounded-lg shadow-xl z-50 pointer-events-none">
                  <h4 className="text-sm font-bold text-white mb-1">{block.name}</h4>
                  <p className="text-xs text-gray-400">{block.description}</p>
                  <div className="mt-2 pt-2 border-t border-gray-800 text-xs text-gray-500">
                    Category: <span className="text-[#00C8FF]">{block.category}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No blocks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
