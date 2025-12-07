import { Sparkles, Calendar, TrendingUp, Filter } from 'lucide-react';

interface NewsAIInsightsProps {
  onFilterPreset?: (preset: string) => void;
}

export function NewsAIInsights({ onFilterPreset }: NewsAIInsightsProps) {
  const highlights = [
    {
      title: 'High impact news on your holding',
      subtitle: 'AAPL: New product launch announced',
      action: 'View details',
    },
    {
      title: 'Crypto regulation proposal',
      subtitle: 'Impacting BTC and ETH',
      action: 'View impacted assets',
    },
    {
      title: 'Fed rate decision imminent',
      subtitle: 'Expected to affect tech stocks',
      action: 'See analysis',
    },
  ];

  const upcomingEvents = [
    { event: 'Fed interest rate decision', time: 'in 2 days', impact: 'High' },
    { event: 'TCS earnings call', time: 'tomorrow', impact: 'Medium' },
    { event: 'OPEC+ meeting', time: 'in 5 days', impact: 'High' },
  ];

  const filterPresets = [
    { id: 'my-stocks', label: 'Only my stocks', icon: TrendingUp },
    { id: 'high-impact', label: 'Only high-impact', icon: Sparkles },
    { id: 'crypto', label: 'Only crypto', icon: Filter },
  ];

  return (
    <div className="w-80 space-y-6">
      {/* AI Highlights */}
      <div className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">Today&apos;s Top Highlights</h3>
        </div>

        <div className="space-y-3">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00C8FF]/50 transition-colors cursor-pointer"
            >
              <h4 className="text-sm font-semibold text-white mb-1">{highlight.title}</h4>
              <p className="text-xs text-gray-400 mb-2">{highlight.subtitle}</p>
              <button className="text-xs text-[#00C8FF] hover:underline">
                {highlight.action} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Macro Timeline / Event Calendar */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-sm font-semibold text-white">Upcoming Events</h3>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="text-sm text-white font-medium mb-1">{event.event}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{event.time}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      event.impact === 'High'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {event.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          View Full Calendar
        </button>
      </div>

      {/* Quick Filter Presets */}
      <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#00C8FF]" />
          <h3 className="text-sm font-semibold text-white">Quick Filters</h3>
        </div>

        <div className="space-y-2">
          {filterPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onFilterPreset?.(preset.id)}
              className="w-full flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-left text-sm text-gray-300 hover:bg-gray-800 hover:border-[#00FF88]/50 hover:text-white transition-colors"
            >
              <preset.icon className="w-4 h-4" />
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
