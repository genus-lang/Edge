import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KPICardData {
  id: string;
  label: string;
  value: string;
  subtext: string;
  trend?: 'up' | 'down' | 'neutral';
  tooltip: string;
}

interface KPISummaryStripProps {
  kpis: KPICardData[];
  onCardClick?: (id: string) => void;
}

export function KPISummaryStrip({ kpis, onCardClick }: KPISummaryStripProps) {
  return (
    <div className="grid grid-cols-6 gap-4 px-6 py-6">
      {kpis.map((kpi) => (
        <button
          key={kpi.id}
          onClick={() => onCardClick?.(kpi.id)}
          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-[#00FF88]/30 transition-all cursor-pointer text-left"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-gray-400 font-medium">{kpi.label}</div>
            <div className="relative">
              <Info className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
              <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                {kpi.tooltip}
              </div>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 mb-1">
            <div
              className={cn(
                'text-2xl font-bold',
                kpi.trend === 'up'
                  ? 'text-[#00FF88]'
                  : kpi.trend === 'down'
                  ? 'text-red-400'
                  : 'text-white'
              )}
            >
              {kpi.value}
            </div>
            {kpi.trend && kpi.trend !== 'neutral' && (
              <div>
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#00FF88]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">{kpi.subtext}</div>
        </button>
      ))}
    </div>
  );
}
