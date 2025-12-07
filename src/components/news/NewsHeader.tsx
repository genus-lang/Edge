import { Info, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewsHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NewsHeader({ activeTab, onTabChange }: NewsHeaderProps) {
  const tabs = [
    { id: 'all', label: 'All Markets' },
    { id: 'portfolio', label: 'My Portfolio' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'macro', label: 'Macro & Economy' },
    { id: 'earnings', label: 'Earnings & Results' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'saved', label: 'Saved Articles' },
  ];

  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">News Feed</h1>
            <button
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
              title="News is aggregated from multiple sources; always verify before trading."
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
              title="News Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Real-time financial news tailored for your portfolio and strategies
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              activeTab === tab.id
                ? 'bg-[#00FF88] text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
