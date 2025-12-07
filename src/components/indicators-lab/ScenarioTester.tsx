import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ScenarioTesterProps {
  activeScenario: string | null;
  onScenarioChange: (scenario: string) => void;
}

const scenarios = [
  { id: 'uptrend', label: 'Strong Uptrend', icon: TrendingUp, color: '#00FF88' },
  { id: 'sideways', label: 'Sideways Market', icon: Activity, color: '#FFA500' },
  { id: 'volatility', label: 'High Volatility', icon: Zap, color: '#FF00FF' },
  { id: 'crash', label: 'Market Crash', icon: TrendingDown, color: '#FF4444' },
];

export function ScenarioTester({ activeScenario, onScenarioChange }: ScenarioTesterProps) {
  return (
    <div className="px-4 py-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-y border-purple-500/30">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-white whitespace-nowrap">Test in Scenarios:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onScenarioChange(scenario.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                activeScenario === scenario.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              )}
              style={activeScenario === scenario.id ? { backgroundColor: scenario.color } : {}}
            >
              <scenario.icon className="w-4 h-4" />
              {scenario.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
